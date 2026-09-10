import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, getSettings, makeToken, sha256 } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const password = body?.password;
  if (typeof password !== "string" || !password) {
    return NextResponse.json({ error: "Password is required" }, { status: 400 });
  }
  const settings = getSettings();
  if (sha256(password) !== settings.passwordHash) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }
  const jar = await cookies();
  jar.set(COOKIE_NAME, makeToken(settings.secret), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
  return NextResponse.json({ ok: true });
}
