import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import defaultContent from "@/data/default-content.json";
import { getDatabase } from "@/lib/mongodb";

const CONTENT_FILE_PATH = path.join(process.cwd(), "src", "data", "site-content.json");
const TMP_CONTENT_PATH = path.join("/tmp", "site-content.json");

export async function GET() {
  try {
    // 1. Try MongoDB if configured
    const db = await getDatabase();
    if (db) {
      try {
        const doc = await db.collection("site_content").findOne({ key: "active_content" });
        if (doc && doc.data) {
          return NextResponse.json({ success: true, data: doc.data, source: "mongodb" });
        }
      } catch (dbErr) {
        console.warn("MongoDB read failed, falling back to file:", dbErr);
      }
    }

    // 2. Check /tmp if running in serverless / Vercel
    if (fs.existsSync(TMP_CONTENT_PATH)) {
      try {
        const raw = fs.readFileSync(TMP_CONTENT_PATH, "utf-8");
        const data = JSON.parse(raw);
        return NextResponse.json({ success: true, data, source: "tmp_persisted" });
      } catch (_) {}
    }

    // 3. Check source tree file
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

    const payload = {
      ...body,
      _lastSaved: body._lastSaved || Date.now(),
    };

    let savedToMongo = false;
    const db = await getDatabase();
    if (db) {
      try {
        await db.collection("site_content").updateOne(
          { key: "active_content" },
          { $set: { key: "active_content", data: payload, updatedAt: new Date() } },
          { upsert: true }
        );
        savedToMongo = true;
      } catch (dbErr) {
        console.error("Failed to write to MongoDB:", dbErr);
      }
    }

    let savedLocally = false;
    // Attempt writing to primary path
    try {
      const dir = path.dirname(CONTENT_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(CONTENT_FILE_PATH, JSON.stringify(payload, null, 2), "utf-8");
      savedLocally = true;
    } catch (_) {}

    // Always attempt writing to /tmp as well for serverless runtime
    try {
      fs.writeFileSync(TMP_CONTENT_PATH, JSON.stringify(payload, null, 2), "utf-8");
    } catch (_) {}

    return NextResponse.json({
      success: true,
      message: "Content updated successfully",
      savedToMongo,
      savedLocally,
      lastSaved: payload._lastSaved,
    });
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
    const db = await getDatabase();
    if (db) {
      try {
        await db.collection("site_content").deleteOne({ key: "active_content" });
      } catch (dbErr) {
        console.error("Failed to delete from MongoDB:", dbErr);
      }
    }
    if (fs.existsSync(CONTENT_FILE_PATH)) {
      fs.unlinkSync(CONTENT_FILE_PATH);
    }
    if (fs.existsSync(TMP_CONTENT_PATH)) {
      fs.unlinkSync(TMP_CONTENT_PATH);
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
