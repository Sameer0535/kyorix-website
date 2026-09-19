import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getDatabase } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const targetEmail = (body.email || "kyorixofficial@gmail.com").trim();

    // Check for SMTP config in body, DB, or environment
    let smtpHost = body.smtpHost || process.env.SMTP_HOST || "smtp.gmail.com";
    let smtpUser = body.smtpUser || process.env.SMTP_USER;
    let smtpPass = body.smtpPass || process.env.SMTP_PASS;
    let smtpPort = Number(body.smtpPort || process.env.SMTP_PORT) || 465;

    if (!smtpUser || !smtpPass) {
      try {
        const db = await getDatabase();
        if (db) {
          const doc = await db.collection("site_content").findOne({ _id: "current" as any });
          const info = doc?.content?.companyInfo;
          const smtpU = info?.smtpUser || info?.emailSettings?.smtpUser;
          const smtpP = info?.smtpPass || info?.emailSettings?.smtpPass;
          if (smtpU && smtpP) {
            smtpHost = info.smtpHost || "smtp.gmail.com";
            smtpUser = smtpU.trim();
            smtpPass = smtpP.trim();
            smtpPort = Number(info.smtpPort) || 465;
          }
        }
      } catch (_) {}

      if (!smtpUser || !smtpPass) {
        try {
          const contentFile = require("path").join(process.cwd(), "src", "data", "site-content.json");
          const fs = require("fs");
          if (fs.existsSync(contentFile)) {
            const parsed = JSON.parse(fs.readFileSync(contentFile, "utf-8"));
            const info = parsed?.companyInfo;
            const smtpU = info?.smtpUser || info?.emailSettings?.smtpUser;
            const smtpP = info?.smtpPass || info?.emailSettings?.smtpPass;
            if (smtpU && smtpP) {
              smtpHost = info.smtpHost || "smtp.gmail.com";
              smtpUser = smtpU.trim();
              smtpPass = smtpP.trim();
              smtpPort = Number(info.smtpPort) || 465;
            }
          }
        } catch (_) {}
      }
    }

    const results: any = {
      targetEmail,
      timestamp: new Date().toISOString(),
    };

    // Test 1: Direct SMTP if credentials are provided
    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass.replace(/\s+/g, ""), // strip spaces often copied from Google UI
          },
        });

        await transporter.verify();

        const info = await transporter.sendMail({
          from: `"Kyorix Test Desk" <${smtpUser}>`,
          to: targetEmail,
          subject: "⚡ [Verified] Kyorix Inquiry Notification Test",
          text: `This is a verified test email sent directly through ${smtpHost} to confirm your inquiry notification delivery.\n\nTime: ${new Date().toLocaleString()}\nDestination: ${targetEmail}`,
          html: `
            <div style="font-family: Arial, sans-serif; background-color: #0d1117; color: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #1E2638;">
              <h2 style="color: #00F0FF; margin-top: 0;">⚡ Kyorix Test Notification Verified</h2>
              <p style="color: #c9d1d9; font-size: 14px;">This test confirms that your inquiry delivery pipeline is connected directly to Google SMTP.</p>
              <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #8b949e; margin-top: 15px;">
                <tr><td style="padding: 4px 0;">Destination:</td><td style="color: #fff; font-weight: bold;">${targetEmail}</td></tr>
                <tr><td style="padding: 4px 0;">Server:</td><td style="color: #fff;">${smtpHost}:${smtpPort}</td></tr>
                <tr><td style="padding: 4px 0;">Sender:</td><td style="color: #fff;">${smtpUser}</td></tr>
                <tr><td style="padding: 4px 0;">Status:</td><td style="color: #34d399; font-weight: bold;">Delivered</td></tr>
              </table>
            </div>
          `,
        });

        results.smtp = {
          success: true,
          messageId: info.messageId,
          host: smtpHost,
          user: smtpUser,
        };

        return NextResponse.json({
          success: true,
          method: "SMTP",
          message: `Test email successfully sent directly to ${targetEmail} via ${smtpHost}! Check your Primary inbox.`,
          details: results,
        });
      } catch (smtpErr: any) {
        results.smtp = {
          success: false,
          error: smtpErr.message || "Failed to authenticate with SMTP server",
        };
      }
    }

    // Test 2: FormSubmit dispatch
    try {
      const params = new URLSearchParams();
      params.append("_captcha", "false");
      params.append("_template", "table");
      params.append("_subject", "Kyorix Website FormSubmit Probe");
      params.append("Name", "Test Probe");
      params.append("Destination", targetEmail);
      params.append("Timestamp", new Date().toLocaleString());

      const fsRes = await fetch(`https://formsubmit.co/${encodeURIComponent(targetEmail)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Referer: "https://kyorixsport.in/",
          Origin: "https://kyorixsport.in",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        body: params.toString(),
      });

      const fsText = await fsRes.text();
      results.formSubmit = {
        status: fsRes.status,
        accepted: fsText.includes("Thanks!"),
      };
    } catch (fsErr: any) {
      results.formSubmit = {
        error: fsErr.message,
      };
    }

    return NextResponse.json({
      success: true,
      method: results.smtp ? "SMTP_FAILED_FALLBACK" : "FORMSUBMIT",
      message: results.smtp?.error
        ? `SMTP Error: ${results.smtp.error}. FormSubmit probe triggered.`
        : `Probe triggered to ${targetEmail}. Please check Inbox and Spam folders.`,
      details: results,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to execute email test" },
      { status: 500 }
    );
  }
}
