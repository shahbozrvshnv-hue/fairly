"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LogoMark } from "@/components/Logo";
import { cn } from "@/lib/cn";
import { LOCALES } from "@/lib/locales";
import { Editor } from "./Editor";
import { PasswordModal } from "./PasswordModal";
import {
  IconCheck,
  IconChevronDown,
  IconEye,
  IconLock,
  IconTrash,
  IconUser,
  IconX,
} from "@/components/Icons";

type Data = { site: Record<string, any>; locales: Record<string, Record<string, any>> };
type ActiveScope = "site" | (typeof LOCALES)[number]["code"];

const activePath = (active: ActiveScope): (string | number)[] =>
  active === "site" ? ["site"] : ["locales", active];

function getAtPath(obj: any, path: (string | number)[]) {
  return path.reduce((acc, k) => (acc == null ? acc : acc[k]), obj);
}

function setAtPath(obj: any, path: (string | number)[], value: any) {
  if (path.length === 0) return value;
  const next = Array.isArray(obj) ? [...obj] : { ...(obj ?? {}) };
  let cur = next;
  for (let i = 0; i < path.length - 1; i++) {
    const k = path[i];
    cur[k] = Array.isArray(cur[k]) ? [...cur[k]] : { ...(cur[k] ?? {}) };
    cur = cur[k];
  }
  cur[path[path.length - 1]] = value;
  return next;
}

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v));

export function AdminApp() {
  const [phase, setPhase] = useState<"loading" | "login" | "ready">("loading");
  const [data, setData] = useState<Data | null>(null);
  const [draft, setDraft] = useState<Data | null>(null);
  const [active, setActive] = useState<ActiveScope>("site");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [pwOpen, setPwOpen] = useState(false);
  const [loginPw, setLoginPw] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [loginBusy, setLoginBusy] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string, ok = true) => {
    setToast({ msg, ok });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const load = useCallback(async () => {
    const res = await fetch("/api/content");
    const json = (await res.json()) as Data;
    const merged = clone(json);
    // For the editor we want full merged content per locale + raw site overrides as separate blocks.
    const editorData: Data = {
      site: merged.locales?.en?.site ?? merged.site ?? {},
      locales: merged.locales ?? {},
    };
    // Strip the per-locale `site` key (site is edited once, globally) to avoid duplicate editing.
    for (const code of Object.keys(editorData.locales)) {
      delete editorData.locales[code].site;
    }
    setData(merged);
    setDraft(editorData);
    setPhase("ready");
    return json;
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/session");
        const { authed } = await res.json();
        if (authed) await load();
        else setPhase("login");
      } catch {
        setPhase("login");
      }
    })();
  }, [load]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginBusy(true);
    setLoginErr("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: loginPw }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setLoginErr(j.error ?? "Login failed");
        return;
      }
      await load();
    } catch {
      setLoginErr("Network error");
    }
    setLoginBusy(false);
  };

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setPhase("login");
    setLoginPw("");
    setData(null);
    setDraft(null);
  };

  const dirty = useMemo(
    () => !!(draft && JSON.stringify(draft) !== JSON.stringify(editorBaseline(draft, data))),
    [draft, data]
  );

  const path = activePath(active);
  const activeValue = draft ? getAtPath(draft, path) : null;

  const onChange = useCallback(
    (sub: (string | number)[], value: any) => {
      setDraft((prev) => (prev ? setAtPath(prev, [...path, ...sub], value) : prev));
    },
    [path]
  );

  const switchActive = (next: ActiveScope) => {
    if (dirty && !window.confirm("You have unsaved changes. Discard them and switch?")) return;
    setActive(next);
  };

  const save = async () => {
    if (!draft) return;
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scope: active === "site" ? "site" : "locale",
          locale: active === "site" ? null : active,
          value: getAtPath(draft, path),
        }),
      });
      if (!res.ok) throw new Error("save failed");
      await load();
      showToast("Changes saved");
    } catch {
      showToast("Save failed — try again", false);
    }
    setSaving(false);
  };

  const reset = async () => {
    if (!window.confirm("Reset this section to its default content? Custom edits for this section will be removed."))
      return;
    try {
      await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scope: active === "site" ? "site" : "locale",
          locale: active === "site" ? null : active,
          value: null,
        }),
      });
      await load();
      showToast("Reset to defaults");
    } catch {
      showToast("Reset failed", false);
    }
  };

  const discard = () => {
    if (data) setDraft(clone(editorDataFrom(data)));
  };

  if (phase !== "ready" || !draft) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream-50 px-6">
        {phase === "loading" ? (
          <p className="text-sm font-medium text-ink-400">Loading…</p>
        ) : (
          <div className="card-soft w-full max-w-sm rounded-[2rem] p-9">
            <div className="flex flex-col items-center text-center">
              <LogoMark size={52} />
              <h1 className="mt-5 font-display text-xl font-bold text-ink-900">FairGuide Control Panel</h1>
              <p className="mt-2 text-sm text-ink-500">Sign in to manage all website content.</p>
            </div>
            <form onSubmit={login} className="mt-7 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-500">
                  Password
                </label>
                <input
                  type="password"
                  className="input-soft"
                  value={loginPw}
                  onChange={(e) => setLoginPw(e.target.value)}
                  placeholder="••••••••••"
                  autoFocus
                />
              </div>
              {loginErr && (
                <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-600">{loginErr}</p>
              )}
              <button type="submit" disabled={loginBusy} className="btn btn-primary btn-lg w-full disabled:opacity-70">
                Sign in
              </button>
            </form>
            <p className="mt-5 text-center text-[11px] leading-relaxed text-ink-400">
              Default password: <code className="rounded bg-cream-100 px-1.5 py-0.5 font-semibold">fairguide2026</code>
              <br />
              Change it after signing in.
            </p>
          </div>
        )}
      </div>
    );
  }

  const scopeName =
    active === "site" ? "Site & Branding" : `Content · ${LOCALES.find((l) => l.code === active)?.native ?? active}`;

  return (
    <div className="flex min-h-screen bg-cream-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-cream-200 bg-cream-100/70 p-5 backdrop-blur lg:flex">
        <div className="flex items-center gap-3">
          <LogoMark size={38} />
          <div>
            <p className="font-display text-[15px] font-bold leading-tight text-ink-900">FairGuide</p>
            <p className="text-[11px] font-medium uppercase tracking-wider text-ink-400">Control Panel</p>
          </div>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="btn btn-soft btn-md mt-6 w-full"
        >
          <IconEye size={15} />
          View live site
        </a>

        <nav className="mt-8 flex-1 space-y-1 overflow-y-auto no-scrollbar">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-400">Global</p>
          <SideItem
            active={active === "site"}
            onClick={() => switchActive("site")}
            icon={<IconUser size={16} />}
            label="Site & Branding"
            hint="Logo, contact, socials"
          />
          <p className="px-3 pb-2 pt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-400">
            Translations
          </p>
          {LOCALES.map((l) => (
            <SideItem
              key={l.code}
              active={active === l.code}
              onClick={() => switchActive(l.code as ActiveScope)}
              icon={<span className="text-[15px] leading-none">{l.flag}</span>}
              label={l.native}
              hint={l.label}
            />
          ))}
        </nav>

        <div className="mt-4 space-y-2 border-t border-cream-200 pt-4">
          <button onClick={() => setPwOpen(true)} className="btn btn-outline btn-md w-full">
            <IconLock size={15} />
            Change password
          </button>
          <button onClick={logout} className="btn btn-outline btn-md w-full text-red-500 hover:border-red-300 hover:text-red-600">
            <IconX size={15} />
            Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-cream-200 bg-cream-50/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 px-5 py-4 md:px-8">
            <div className="min-w-0">
              <h1 className="truncate font-display text-lg font-bold text-ink-900">{scopeName}</h1>
              <p className="text-xs text-ink-400">
                {dirty ? "Unsaved changes" : "All changes saved"}
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              {dirty && (
                <button onClick={discard} className="btn btn-outline btn-md hidden sm:inline-flex">
                  Discard
                </button>
              )}
              <button
                onClick={reset}
                className="btn btn-outline btn-md text-ink-500"
                title="Reset this section to defaults"
              >
                <IconTrash size={14} />
                <span className="hidden sm:inline">Reset</span>
              </button>
              <button
                onClick={save}
                disabled={!dirty || saving}
                className={cn("btn btn-md", dirty ? "btn-primary" : "btn-soft opacity-60")}
              >
                {saving ? "Saving…" : (
                  <>
                    <IconCheck size={15} />
                    Save changes
                  </>
                )}
              </button>
            </div>
          </div>
          {/* mobile scope switch */}
          <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-3 lg:hidden">
            {[{ code: "site", flag: "⚙️", native: "Site" }, ...LOCALES].map((s) => (
              <button
                key={s.code}
                onClick={() => switchActive(s.code as ActiveScope)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors",
                  active === s.code ? "bg-teal-600 text-white shadow-glow-teal" : "bg-cream-100 text-ink-700 shadow-soft-inset-sm"
                )}
              >
                {s.flag} {s.native}
              </button>
            ))}
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-5 py-8 md:px-8 md:py-10">
          <Editor value={activeValue} onChange={onChange} />
          <p className="mt-10 rounded-2xl bg-cream-100/80 p-4 text-xs leading-relaxed text-ink-400 shadow-soft-inset-sm">
            Tip: changes are stored per section. “Site &amp; Branding” applies to all languages at once — logo,
            contact details and socials. Everything else can be translated per language; missing values automatically
            fall back to English.
          </p>
        </main>
      </div>

      {toast && (
        <div
          className={cn(
            "anim-fade-up fixed bottom-6 right-6 z-[100] flex items-center gap-2.5 rounded-2xl px-5 py-3.5 text-sm font-semibold shadow-soft-lg",
            toast.ok ? "bg-teal-700 text-white" : "bg-red-600 text-white"
          )}
        >
          {toast.ok ? <IconCheck size={16} /> : <IconX size={16} />}
          {toast.msg}
        </div>
      )}

      {pwOpen && (
        <PasswordModal
          onClose={() => setPwOpen(false)}
          onDone={(msg, ok) => {
            setPwOpen(false);
            showToast(msg, ok);
          }}
        />
      )}
    </div>
  );
}

/** Baseline for dirty-checking: re-derive the editor shape from the last saved data. */
function editorBaseline(draft: Data, data: Data | null): Data {
  if (!data) return draft;
  return editorDataFrom(data);
}

function editorDataFrom(merged: Data): Data {
  const out: Data = {
    site: merged.locales?.en?.site ?? merged.site ?? {},
    locales: clone(merged.locales ?? {}),
  };
  for (const code of Object.keys(out.locales)) delete out.locales[code].site;
  return out;
}

function SideItem({
  active,
  onClick,
  icon,
  label,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  hint?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition-all",
        active ? "bg-cream-50 shadow-soft" : "hover:bg-cream-50/70"
      )}
    >
      <span
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-xl",
          active ? "bg-teal-600 text-white" : "bg-cream-50 text-ink-500 shadow-soft-inset-sm"
        )}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className={cn("block truncate text-[13px] font-semibold", active ? "text-teal-800" : "text-ink-800")}>
          {label}
        </span>
        {hint && <span className="block truncate text-[11px] text-ink-400">{hint}</span>}
      </span>
      <IconChevronDown size={13} className={cn("-rotate-90 text-ink-300", active && "text-teal-500")} />
    </button>
  );
}
