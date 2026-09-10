import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File too large (max 5 MB)" }, { status: 413 });
  }
  const name = (file.name || "").toLowerCase();
  let ext: string | null = null;
  if (name.endsWith(".png")) ext = ".png";
  else if (name.endsWith(".webp")) ext = ".webp";
  else if (name.endsWith(".svg")) ext = ".svg";
  else if (name.endsWith(".jpg") || name.endsWith(".jpeg")) ext = ".jpg";
  else if (name.endsWith(".gif")) ext = ".gif";
  if (!ext) {
    return NextResponse.json({ error: "Only image files are allowed" }, { status: 415 });
  }

  const dir = path.join(process.cwd(), "public", "uploads");
  fs.mkdirSync(dir, { recursive: true });
  const data = Buffer.from(await file.arrayBuffer());
  const fname = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}${ext}`;
  fs.writeFileSync(path.join(dir, fname), data);
  return NextResponse.json({ url: `/uploads/${fname}` });
}
