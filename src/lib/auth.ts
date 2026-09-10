import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { cookies } from "next/headers";

const DATA_DIR = path.join(process.cwd(), "data");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");
export const COOKIE_NAME = "fg_admin";
export const DEFAULT_PASSWORD = "fairguide2026";
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export function sha256(value: string): string {
  return crypto.createHash("sha256").update(value, "utf8").digest("hex");
}

type Settings = { passwordHash: string; secret: string };

export function getSettings(): Settings {
  try {
    const raw = JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf8"));
    if (raw?.passwordHash && raw?.secret) return raw as Settings;
  } catch {
    /* create below */
  }
  const settings: Settings = {
    passwordHash: sha256(DEFAULT_PASSWORD),
    secret: crypto.randomBytes(24).toString("hex"),
  };
  persistSettings(settings);
  return settings;
}

function persistSettings(settings: Settings) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const tmp = `${SETTINGS_FILE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(settings, null, 2));
  fs.renameSync(tmp, SETTINGS_FILE);
}

export function changePassword(current: string, next: string): { ok: boolean; error?: string } {
  const s = getSettings();
  if (sha256(current) !== s.passwordHash) return { ok: false, error: "Current password is incorrect." };
  if (next.length < 8) return { ok: false, error: "New password must be at least 8 characters." };
  s.passwordHash = sha256(next);
  persistSettings(s);
  return { ok: true };
}

export function makeToken(secret: string, ttlMs: number = TOKEN_TTL_MS): string {
  const exp = Date.now() + ttlMs;
  const sig = crypto.createHmac("sha256", secret).update(`fgadmin:${exp}`).digest("hex");
  return `${exp}.${sig}`;
}

export function verifyToken(token: string | undefined | null, secret: string): boolean {
  if (!token) return false;
  const [expStr, sig] = token.split(".");
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  const expected = crypto.createHmac("sha256", secret).update(`fgadmin:${exp}`).digest("hex");
  if (!sig || sig.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(sig, "utf8"), Buffer.from(expected, "utf8"));
}

export async function readSessionToken(): Promise<string | undefined> {
  const jar = await cookies();
  return jar.get(COOKIE_NAME)?.value;
}

export async function isAuthed(): Promise<boolean> {
  const s = getSettings();
  const token = await readSessionToken();
  return verifyToken(token, s.secret);
}
