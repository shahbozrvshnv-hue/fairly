import { NextResponse } from "next/server";
import { addLead } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!name || !email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Valid name and email are required" }, { status: 400 });
  }
  const lead = {
    type: typeof body.type === "string" ? body.type.slice(0, 32) : "unknown",
    name: name.slice(0, 120),
    email: email.slice(0, 160),
    phone: typeof body.phone === "string" ? body.phone.slice(0, 40) : "",
    city: typeof body.city === "string" ? body.city.slice(0, 80) : "",
    message: typeof body.message === "string" ? body.message.slice(0, 2000) : "",
  };
  try {
    addLead(lead);
  } catch {
    /* storage failure should not break the visitor experience */
  }
  return NextResponse.json({ ok: true });
}
