import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

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

export async function GET() {
  try {
    const enquiries = getEnquiries();
    return NextResponse.json({ success: true, data: enquiries });
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

    const newEnquiry = {
      id: `ENQ-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      fullName: String(fullName).trim(),
      organization: String(organization).trim(),
      designation: designation ? String(designation).trim() : "N/A",
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : "N/A",
      country: country ? String(country).trim() : "India",
      sport: sport ? String(sport).trim() : "Taekwondo",
      category: category ? String(category).trim() : "BUSINESS ENQUIRIES",
      interest: interest ? String(interest).trim() : "KYORIX SCORE",
      message: String(message).trim(),
      status: "NEW", // "NEW" | "READ" | "RESPONDED"
      createdAt: new Date().toISOString(),
    };

    const currentList = getEnquiries();
    currentList.unshift(newEnquiry); // Prepend so newest is first
    saveEnquiries(currentList);

    // Optional email dispatch via SMTP if environment variables are provided
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const notifyEmail = process.env.NOTIFICATION_EMAIL || "contact@kyorixsport.in";

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Kyorix Portal" <${smtpUser}>`,
          to: notifyEmail,
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
      } catch (mailErr) {
        console.error("Failed to send SMTP email notification:", mailErr);
      }
    }

    // Direct zero-config email dispatch via FormSubmit to admin email
    const targetEmail = process.env.NOTIFICATION_EMAIL || "sameerr1205@gmail.com";
    try {
      await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Referer: "https://kyorixsport.in/contact",
          Origin: "https://kyorixsport.in",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        body: JSON.stringify({
          _subject: `⚡ [New Inquiry] ${newEnquiry.interest} - ${newEnquiry.fullName} (${newEnquiry.organization})`,
          _replyto: newEnquiry.email,
          _cc: "contact@kyorixsport.in",
          Inquiry_ID: newEnquiry.id,
          Full_Name: newEnquiry.fullName,
          Organization: newEnquiry.organization,
          Designation: newEnquiry.designation,
          Email: newEnquiry.email,
          Phone: newEnquiry.phone,
          Country: newEnquiry.country,
          Sport: newEnquiry.sport,
          Product_Interest: newEnquiry.interest,
          Communication_Desk: newEnquiry.category,
          Message: newEnquiry.message,
          Received_At: newEnquiry.createdAt,
        }),
      });
    } catch (fsErr) {
      console.error("Failed to dispatch via FormSubmit:", fsErr);
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

    let currentList = getEnquiries();
    const initialLen = currentList.length;
    currentList = currentList.filter((item) => item.id !== id);

    if (currentList.length === initialLen) {
      return NextResponse.json({ success: false, error: "Enquiry not found" }, { status: 404 });
    }

    saveEnquiries(currentList);
    return NextResponse.json({ success: true, message: "Enquiry deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to delete enquiry" },
      { status: 500 }
    );
  }
}
