"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useContent } from "./ContentContext";
import { IconCheckCircle, IconX } from "./Icons";

export type LeadType = "join" | "guide" | "volunteer" | "host";

const LeadContext = createContext<{ openLead: (t: LeadType) => void }>({
  openLead: () => {},
});

export function useLead() {
  return useContext(LeadContext);
}

const EMPTY = { name: "", email: "", phone: "", city: "", message: "" };

export function LeadProvider({ children }: { children: ReactNode }) {
  const { content: c } = useContent();
  const [type, setType] = useState<LeadType | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");

  const close = () => {
    setType(null);
    setStatus("idle");
    setForm(EMPTY);
    setError("");
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (type) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [type]);

  const f = c.form;
  const titles: Record<LeadType, [string, string]> = {
    join: [f.joinTitle, f.joinSub],
    guide: [f.guideTitle, f.guideSub],
    volunteer: [f.volunteerTitle, f.volunteerSub],
    host: [f.hostTitle, f.hostSub],
  };

  const set = (k: keyof typeof EMPTY) => (e: any) => setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError("·");
      return;
    }
    setError("");
    setStatus("sending");
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, ...form }),
      });
    } catch {
      /* still show success for demo */
    }
    setStatus("done");
  };

  return (
    <LeadContext.Provider value={{ openLead: (t) => setType(t) }}>
      {children}
      {type && (
        <div
          className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={titles[type][0]}
        >
          <div className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm" onClick={close} />
          <div className="anim-fade-up no-scrollbar relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-[2rem] bg-cream-50 p-7 shadow-soft-lg sm:rounded-[2rem] sm:p-8">
            {status !== "done" ? (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink-900">{titles[type][0]}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{titles[type][1]}</p>
                  </div>
                  <button
                    type="button"
                    onClick={close}
                    className="btn btn-soft h-9 w-9 shrink-0 rounded-full !px-0"
                    aria-label="Close"
                  >
                    <IconX size={15} />
                  </button>
                </div>

                <form onSubmit={submit} className="mt-6 space-y-3.5">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-500">
                      {f.name} <span className="text-teal-600">*</span>
                    </label>
                    <input className="input-soft" value={form.name} onChange={set("name")} placeholder={f.namePh} required />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-500">
                      {f.email} <span className="text-teal-600">*</span>
                    </label>
                    <input className="input-soft" type="email" value={form.email} onChange={set("email")} placeholder={f.emailPh} required />
                  </div>
                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-500">
                        {f.phone}
                      </label>
                      <input className="input-soft" value={form.phone} onChange={set("phone")} placeholder={f.phonePh} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-500">
                        {f.city}
                      </label>
                      <input className="input-soft" value={form.city} onChange={set("city")} placeholder={f.cityPh} />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-500">
                      {f.message}
                    </label>
                    <textarea className="input-soft min-h-[84px] resize-none" value={form.message} onChange={set("message")} placeholder={f.messagePh} />
                  </div>
                  {error && (
                    <p className="rounded-xl bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
                      {f.error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn btn-primary btn-lg w-full disabled:opacity-70"
                  >
                    {status === "sending" ? f.sending : f.submit}
                  </button>
                </form>
              </>
            ) : (
              <div className="py-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-600 shadow-soft-inset">
                  <IconCheckCircle size={30} />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-ink-900">{f.successTitle}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-500">{f.successText}</p>
                <button type="button" onClick={close} className="btn btn-soft btn-md mt-7">
                  OK
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </LeadContext.Provider>
  );
}
