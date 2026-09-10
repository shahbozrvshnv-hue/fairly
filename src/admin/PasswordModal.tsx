"use client";

import { useState } from "react";
import { IconX } from "@/components/Icons";

export function PasswordModal({
  onClose,
  onDone,
}: {
  onClose: () => void;
  onDone: (msg: string, ok: boolean) => void;
}) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (next !== confirm) {
      setErr("New passwords do not match.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current, next }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(j.error ?? "Failed to change password");
        return;
      }
      onDone("Password updated", true);
    } catch {
      setErr("Network error");
    }
    setBusy(false);
  };

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="anim-fade-up relative w-full max-w-sm rounded-[2rem] bg-cream-50 p-7 shadow-soft-lg">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-ink-900">Change password</h3>
          <button onClick={onClose} className="btn btn-soft h-9 w-9 rounded-full !px-0" aria-label="Close">
            <IconX size={15} />
          </button>
        </div>
        <form onSubmit={submit} className="mt-5 space-y-3.5">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-500">
              Current password
            </label>
            <input type="password" className="input-soft" value={current} onChange={(e) => setCurrent(e.target.value)} required />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-500">
              New password
            </label>
            <input type="password" className="input-soft" value={next} onChange={(e) => setNext(e.target.value)} required minLength={8} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-500">
              Confirm new password
            </label>
            <input type="password" className="input-soft" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
          </div>
          {err && <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-600">{err}</p>}
          <button type="submit" disabled={busy} className="btn btn-primary btn-lg w-full disabled:opacity-70">
            {busy ? "Updating…" : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
}
