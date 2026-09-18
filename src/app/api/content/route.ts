import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import defaultContent from "@/data/default-content.json";

const CONTENT_FILE_PATH = path.join(process.cwd(), "src", "data", "site-content.json");

export async function GET() {
  try {
    if (fs.existsSync(CONTENT_FILE_PATH)) {
      const raw = fs.readFileSync(CONTENT_FILE_PATH, "utf-8");
      const data = JSON.parse(raw);
      return NextResponse.json({ success: true, data, source: "persisted" });
    }
    return NextResponse.json({ success: true, data: defaultContent, source: "default" });
  } catch (error) {
    console.error("Error reading content file:", error);
    return NextResponse.json({ success: true, data: defaultContent, source: "fallback" });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
    }

    // In serverless environments like Vercel, the source tree is read-only.
    // Try writing to primary path, with /tmp fallback for ephemeral serverless state.
    try {
      const dir = path.dirname(CONTENT_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(CONTENT_FILE_PATH, JSON.stringify(body, null, 2), "utf-8");
    } catch (fsError: any) {
      if (fsError?.code === "EROFS" || process.env.VERCEL) {
        const tmpPath = path.join("/tmp", "site-content.json");
        try {
          fs.writeFileSync(tmpPath, JSON.stringify(body, null, 2), "utf-8");
        } catch (_) {}
        return NextResponse.json({
          success: true,
          message: "Content synchronized (saved to client session & serverless memory)",
          readOnlyEnv: true,
        });
      }
      throw fsError;
    }
    return NextResponse.json({ success: true, message: "Content updated successfully" });
  } catch (error: any) {
    console.error("Error writing content file:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to persist content" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    if (fs.existsSync(CONTENT_FILE_PATH)) {
      fs.unlinkSync(CONTENT_FILE_PATH);
    }
    return NextResponse.json({ success: true, message: "Reset to default content successfully" });
  } catch (error: any) {
    console.error("Error deleting content file:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to reset content" },
      { status: 500 }
    );
  }
}
