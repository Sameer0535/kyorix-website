import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    if (!id) {
      return new NextResponse("Missing image ID", { status: 400 });
    }

    const db = await getDatabase();
    if (!db) {
      return new NextResponse("Database unavailable", { status: 503 });
    }

    const doc = await db.collection("media_uploads").findOne({ id });
    if (!doc || !doc.data) {
      return new NextResponse("Image not found", { status: 404 });
    }

    const buffer = Buffer.isBuffer(doc.data)
      ? doc.data
      : doc.data.buffer
      ? Buffer.from(doc.data.buffer)
      : Buffer.from(doc.data);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": doc.contentType || "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    console.error("Error serving uploaded image:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
