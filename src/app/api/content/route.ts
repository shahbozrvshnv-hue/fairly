import { NextResponse } from "next/server";
import { getAllContent, saveScope, type ContentScope } from "@/lib/content";
import { isAuthed } from "@/lib/auth";
import { isLocale } from "@/lib/locales";

export const dynamic = "force-dynamic";

/** Public merged content (marketing copy only, no secrets). */
export async function GET() {
  return NextResponse.json(getAllContent());
}

/** Admin-only: persist an edited scope. body: { scope: "site" | "locale" | "all", locale?, value } */
export async function PUT(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const scope = (body.scope ?? "all") as ContentScope;
  if (!["site", "locale", "all"].includes(scope)) {
    return NextResponse.json({ error: "Invalid scope" }, { status: 400 });
  }
  if (scope === "locale" && !isLocale(body.locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }
  try {
    saveScope(scope, scope === "locale" ? body.locale : null, body.value ?? null);
  } catch (e) {
    console.error("saveScope failed", e);
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
