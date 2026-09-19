import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { getDatabase } from "@/lib/mongodb";

const ENQUIRIES_FILE_PATH = path.join(process.cwd(), "src", "data", "enquiries.json");
const TMP_FILE_PATH = path.join("/tmp", "enquiries.json");

function getEnquiries(): any[] {
  try {
    if (fs.existsSync(ENQUIRIES_FILE_PATH)) {
      const raw = fs.readFileSync(ENQUIRIES_FILE_PATH, "utf-8");
      return JSON.parse(raw);
    }
  } catch (_) {}

  // Fallback to /tmp in Vercel serverless environment
  try {
    if (fs.existsSync(TMP_FILE_PATH)) {
      const raw = fs.readFileSync(TMP_FILE_PATH, "utf-8");
      return JSON.parse(raw);
    }
  } catch (_) {}

  return [];
}

function saveEnquiries(data: any[]) {
  const json = JSON.stringify(data, null, 2);
  let saved = false;

  try {
    const dir = path.dirname(ENQUIRIES_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(ENQUIRIES_FILE_PATH, json, "utf-8");
    saved = true;
  } catch (_) {}

  // Always write to /tmp as well in case of serverless read-only filesystem
  try {
    fs.writeFileSync(TMP_FILE_PATH, json, "utf-8");
    saved = true;
  } catch (_) {}

  return saved;
}

async function getNotificationRecipients(): Promise<{ recipient: string; cc: string }> {
  try {
    const db = await getDatabase();
    if (db) {
      const doc = (await db.collection("site_content").findOne({ key: "active_content" })) ||
                  (await db.collection("site_content").findOne({ _id: "current" as any }));
      const info = doc?.data?.companyInfo || doc?.content?.companyInfo;
      if (info?.inquiryRecipientEmail) {
        return {
          recipient: info.inquiryRecipientEmail.trim(),
          cc: info.inquiryCcEmail?.trim() || "supportkyorix@gmail.com",
        };
      }
    }
  } catch (_) {}

  try {
    const tmpContent = path.join("/tmp", "site-content.json");
    if (fs.existsSync(tmpContent)) {
      const parsed = JSON.parse(fs.readFileSync(tmpContent, "utf-8"));
      const r = parsed?.companyInfo?.inquiryRecipientEmail?.trim();
      const c = parsed?.companyInfo?.inquiryCcEmail?.trim();
      if (r) {
        return { recipient: r, cc: c || "supportkyorix@gmail.com" };
      }
    }
  } catch (_) {}

  try {
    const contentFile = path.join(process.cwd(), "src", "data", "site-content.json");
    if (fs.existsSync(contentFile)) {
      const parsed = JSON.parse(fs.readFileSync(contentFile, "utf-8"));
      const r = parsed?.companyInfo?.inquiryRecipientEmail?.trim();
      const c = parsed?.companyInfo?.inquiryCcEmail?.trim();
      if (r) {
        return { recipient: r, cc: c || "supportkyorix@gmail.com" };
      }
    }
  } catch (_) {}

  return {
    recipient: process.env.NOTIFICATION_EMAIL || "kyorixofficial@gmail.com",
    cc: "supportkyorix@gmail.com",
  };
}

export async function GET() {
  try {
    const db = await getDatabase();
    if (db) {
      try {
        const list = await db.collection("enquiries").find({}).sort({ createdAt: -1 }).toArray();
        const sanitized = list.map(({ _id, ...rest }) => rest);
        return NextResponse.json({ success: true, data: sanitized, source: "mongodb" });
      } catch (dbErr) {
        console.warn("MongoDB enquiries fetch failed, falling back to file:", dbErr);
      }
    }
    const enquiries = getEnquiries();
    return NextResponse.json({ success: true, data: enquiries, source: "file" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      organization,
      designation,
      email,
      phone,
      country,
      sport,
      category,
      interest,
      message,
    } = body;

    if (!fullName || !organization || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: fullName, organization, email, and message are required." },
        { status: 400 }
      );
    }

    const year = new Date().getFullYear();
    const docketSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const officialId = `KX-${year}-${docketSuffix}`;

    const newEnquiry = {
      id: officialId,
      fullName: String(fullName).trim(),
      organization: String(organization).trim(),
      designation: designation ? String(designation).trim() : "N/A",
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : "N/A",
      country: country ? String(country).trim() : "India",
      sport: sport ? String(sport).trim() : "Taekwondo",
      category: category ? String(category).trim() : "BUSINESS ENQUIRIES",
      interest: interest ? String(interest).trim() : "KYORIX ESS",
      message: String(message).trim(),
      status: "NEW", // "NEW" | "READ" | "RESPONDED"
      createdAt: new Date().toISOString(),
    };

    // User requested not to save form submission data to database - only dispatch directly via email

    // 1. Fetch live recipient routing from database or config
    const { recipient: targetEmail, cc: ccEmail } = await getNotificationRecipients();
    const emailsToDispatch = Array.from(new Set([targetEmail, ccEmail].filter(Boolean)));

    // 2. Check for SMTP credentials in MongoDB Atlas site_content, local file, or environment
    let activeSmtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    let activeSmtpUser = process.env.SMTP_USER;
    let activeSmtpPass = process.env.SMTP_PASS;
    let activeSmtpPort = Number(process.env.SMTP_PORT) || 465;

    try {
      const db = await getDatabase();
      if (db) {
        const doc = (await db.collection("site_content").findOne({ key: "active_content" })) ||
                    (await db.collection("site_content").findOne({ _id: "current" as any }));
        const info = doc?.data?.companyInfo || doc?.content?.companyInfo;
        const smtpU = info?.smtpUser || info?.emailSettings?.smtpUser;
        const smtpP = info?.smtpPass || info?.emailSettings?.smtpPass;
        if (smtpU && smtpP) {
          activeSmtpHost = info.smtpHost || "smtp.gmail.com";
          activeSmtpUser = smtpU.trim();
          activeSmtpPass = smtpP.trim().replace(/\s+/g, "");
          activeSmtpPort = Number(info.smtpPort) || 465;
        }
      }
    } catch (_) {}

    // Also check local site-content.json if not resolved from DB
    if (!activeSmtpUser || !activeSmtpPass) {
      try {
        const contentFile = path.join(process.cwd(), "src", "data", "site-content.json");
        if (fs.existsSync(contentFile)) {
          const parsed = JSON.parse(fs.readFileSync(contentFile, "utf-8"));
          const info = parsed?.companyInfo;
          const smtpU = info?.smtpUser || info?.emailSettings?.smtpUser;
          const smtpP = info?.smtpPass || info?.emailSettings?.smtpPass;
          if (smtpU && smtpP) {
            activeSmtpHost = info.smtpHost || "smtp.gmail.com";
            activeSmtpUser = smtpU.trim();
            activeSmtpPass = smtpP.trim().replace(/\s+/g, "");
            activeSmtpPort = Number(info.smtpPort) || 465;
          }
        }
      } catch (_) {}
    }

    let emailSentViaSmtp = false;

    // 3. If SMTP credentials exist, send directly via Nodemailer (Guaranteed Primary Inbox delivery)
    if (activeSmtpUser && activeSmtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: activeSmtpHost,
          port: activeSmtpPort,
          secure: activeSmtpPort === 465,
          auth: {
            user: activeSmtpUser,
            pass: activeSmtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Kyorix Sport Technology" <${activeSmtpUser}>`,
          to: emailsToDispatch.join(", "),
          replyTo: newEnquiry.email,
          subject: `[New Inquiry] ${newEnquiry.interest} - ${newEnquiry.fullName} (${newEnquiry.organization})`,
          text: `
New Inquiry Received on Kyorix Website:

Name: ${newEnquiry.fullName}
Organization: ${newEnquiry.organization}
Designation: ${newEnquiry.designation}
Email: ${newEnquiry.email}
Phone: ${newEnquiry.phone}
Country: ${newEnquiry.country}
Discipline: ${newEnquiry.sport}
Interest: ${newEnquiry.interest}
Desk: ${newEnquiry.category}

Message:
${newEnquiry.message}

Date: ${newEnquiry.createdAt}
Inquiry ID: ${newEnquiry.id}
          `,
          html: `
            <div style="font-family: Arial, sans-serif; background-color: #0d1117; color: #ffffff; padding: 24px; border-radius: 8px;">
              <h2 style="color: #00F0FF; margin-top: 0;">⚡ New Competition Inquiry Received</h2>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
                <tr><td style="padding: 6px 0; color: #8b949e; width: 140px;">Full Name:</td><td style="font-weight: bold;">${newEnquiry.fullName}</td></tr>
                <tr><td style="padding: 6px 0; color: #8b949e;">Organization:</td><td>${newEnquiry.organization}</td></tr>
                <tr><td style="padding: 6px 0; color: #8b949e;">Designation:</td><td>${newEnquiry.designation}</td></tr>
                <tr><td style="padding: 6px 0; color: #8b949e;">Email:</td><td><a href="mailto:${newEnquiry.email}" style="color: #00F0FF;">${newEnquiry.email}</a></td></tr>
                <tr><td style="padding: 6px 0; color: #8b949e;">Phone:</td><td><a href="tel:${newEnquiry.phone}" style="color: #00F0FF;">${newEnquiry.phone}</a></td></tr>
                <tr><td style="padding: 6px 0; color: #8b949e;">Country:</td><td>${newEnquiry.country}</td></tr>
                <tr><td style="padding: 6px 0; color: #8b949e;">Sport:</td><td>${newEnquiry.sport}</td></tr>
                <tr><td style="padding: 6px 0; color: #8b949e;">Interest:</td><td style="color: #00F0FF; font-weight: bold;">${newEnquiry.interest}</td></tr>
              </table>
              <div style="background-color: #161b22; border-left: 4px solid #00F0FF; padding: 14px; border-radius: 4px; margin-bottom: 20px;">
                <strong style="color: #8b949e; display: block; margin-bottom: 6px;">Message / Requirements:</strong>
                <p style="white-space: pre-wrap; margin: 0; line-height: 1.5;">${newEnquiry.message}</p>
              </div>
              <p style="font-size: 11px; color: #8b949e; margin-bottom: 0;">Inquiry ID: ${newEnquiry.id} • Received at ${new Date().toLocaleString()}</p>
            </div>
          `,
        });
        emailSentViaSmtp = true;
        console.log("SMTP direct email dispatched successfully to", emailsToDispatch);
      } catch (mailErr) {
        console.error("Failed to send SMTP email notification:", mailErr);
      }
    }

    // 4. Dispatch via FormSubmit as robust secondary channel (or primary if SMTP not configured)
    try {
      const formParams = new URLSearchParams();
      formParams.append("_captcha", "false");
      formParams.append("_template", "table");
      formParams.append("_subject", `⚡ [New Inquiry] ${newEnquiry.interest} - ${newEnquiry.fullName} (${newEnquiry.organization})`);
      formParams.append("_replyto", newEnquiry.email);
      if (ccEmail && ccEmail !== targetEmail) {
        formParams.append("_cc", ccEmail);
      }
      formParams.append("Inquiry_ID", newEnquiry.id);
      formParams.append("Full_Name", newEnquiry.fullName);
      formParams.append("Organization", newEnquiry.organization);
      formParams.append("Designation", newEnquiry.designation);
      formParams.append("Email", newEnquiry.email);
      formParams.append("Phone", newEnquiry.phone);
      formParams.append("Country", newEnquiry.country);
      formParams.append("Sport", newEnquiry.sport);
      formParams.append("Interest", newEnquiry.interest);
      formParams.append("Communication_Desk", newEnquiry.category);
      formParams.append("Message", newEnquiry.message);
      formParams.append("Submitted_At", new Date().toLocaleString());

      await fetch(`https://formsubmit.co/${encodeURIComponent(targetEmail)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Referer: "https://kyorixsport.in/contact",
          Origin: "https://kyorixsport.in",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        body: formParams.toString(),
      });
      console.log("FormSubmit dispatched cleanly to", targetEmail);
    } catch (fsErr) {
      console.error("FormSubmit dispatch error:", fsErr);
    }

    // Optional Web3Forms instant email dispatch
    const web3formsKey = process.env.WEB3FORMS_KEY;
    if (web3formsKey) {
      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: web3formsKey,
            subject: `⚡ [New Inquiry] ${newEnquiry.interest} - ${newEnquiry.fullName} (${newEnquiry.organization})`,
            from_name: "Kyorix Competition Website",
            name: newEnquiry.fullName,
            email: newEnquiry.email,
            phone: newEnquiry.phone,
            organization: newEnquiry.organization,
            designation: newEnquiry.designation,
            sport: newEnquiry.sport,
            interest: newEnquiry.interest,
            category: newEnquiry.category,
            message: newEnquiry.message,
            ticket_id: newEnquiry.id,
          }),
        });
      } catch (wErr) {
        console.error("Failed to dispatch via Web3Forms:", wErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry logged successfully",
      enquiryId: newEnquiry.id,
      data: newEnquiry,
    });
  } catch (error: any) {
    console.error("Error processing enquiry:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to process inquiry" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Missing id or status" }, { status: 400 });
    }

    const currentList = getEnquiries();
    const index = currentList.findIndex((item) => item.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, error: "Enquiry not found" }, { status: 404 });
    }

    currentList[index].status = status;
    saveEnquiries(currentList);

    const db = await getDatabase();
    if (db) {
      try {
        await db.collection("enquiries").updateOne({ id }, { $set: { status } });
      } catch (dbErr) {
        console.error("Failed to update status in MongoDB:", dbErr);
      }
    }

    return NextResponse.json({ success: true, message: "Status updated successfully", data: currentList[index] });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update status" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing id parameter" }, { status: 400 });
    }

    // 1. Delete from MongoDB
    const db = await getDatabase();
    if (db) {
      try {
        if (id === "all") {
          await db.collection("enquiries").deleteMany({});
        } else {
          await db.collection("enquiries").deleteOne({ id });
        }
      } catch (dbErr) {
        console.error("Failed to delete enquiry from MongoDB:", dbErr);
      }
    }

    // 2. Delete from local file/tmp
    try {
      let currentList = getEnquiries();
      if (id === "all") {
        saveEnquiries([]);
      } else {
        currentList = currentList.filter((item) => item.id !== id);
        saveEnquiries(currentList);
      }
    } catch (_) {}

    return NextResponse.json({ success: true, message: id === "all" ? "All enquiries deleted successfully" : "Enquiry deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to delete enquiry" },
      { status: 500 }
    );
  }
}
