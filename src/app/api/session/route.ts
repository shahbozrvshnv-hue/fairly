import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const authed = await isAuthed();
  return NextResponse.json({ authed });
}
