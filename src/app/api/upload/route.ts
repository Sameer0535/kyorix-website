import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { getDatabase } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    // Validate mime type
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Unsupported file type. Please upload PNG, JPG, WebP, or SVG." },
        { status: 400 }
      );
    }

    // Max 10MB limit
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File size exceeds 10MB limit. Please upload a smaller image." },
        { status: 400 }
      );
    }

    const ext = path.extname(file.name) || ".jpg";
    const baseName = path
      .basename(file.name, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .toLowerCase();
    const imageId = `${baseName}_${Date.now()}${ext}`;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Primary Strategy: Store in MongoDB (Cloud-persistent, zero filesystem dependencies)
    try {
      const db = await getDatabase();
      if (db) {
        await db.collection("media_uploads").updateOne(
          { id: imageId },
          {
            $set: {
              id: imageId,
              filename: file.name,
              contentType: file.type,
              data: buffer,
              size: file.size,
              createdAt: new Date(),
            },
          },
          { upsert: true }
        );

        const publicUrl = `/api/images/${imageId}`;
        return NextResponse.json({
          success: true,
          url: publicUrl,
          fileName: imageId,
          size: file.size,
          storage: "mongodb",
        });
      }
    } catch (dbErr) {
      console.warn("MongoDB image upload failed, falling back:", dbErr);
    }

    // 2. Secondary Strategy: Try local filesystem (for local dev environments)
    try {
      const localUploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(localUploadDir)) {
        fs.mkdirSync(localUploadDir, { recursive: true });
      }
      fs.writeFileSync(path.join(localUploadDir, imageId), buffer);
      return NextResponse.json({
        success: true,
        url: `/uploads/${imageId}`,
        fileName: imageId,
        size: file.size,
        storage: "local_disk",
      });
    } catch (_) {}

    // 3. Guaranteed Fallback: Base64 Data URL (Never fails on read-only serverless filesystems)
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${file.type};base64,${base64}`;

    return NextResponse.json({
      success: true,
      url: dataUrl,
      fileName: imageId,
      size: file.size,
      storage: "data_url",
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "File upload failed" },
      { status: 500 }
    );
  }
}
