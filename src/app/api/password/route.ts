import { NextResponse } from "next/server";
import { changePassword, isAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const { current, next } = body ?? {};
  if (typeof current !== "string" || typeof next !== "string") {
    return NextResponse.json({ error: "Current and new password are required" }, { status: 400 });
  }
  const result = changePassword(current, next);
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
