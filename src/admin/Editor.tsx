"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  IconArrowDown,
  IconArrowUp,
  IconChevronDown,
  IconImage,
  IconPlus,
  IconTrash,
  IconUpload,
} from "@/components/Icons";

type Path = (string | number)[];
type Updater = (path: Path, value: any) => void;

/* ---------- helpers ---------- */

const SPECIAL: Record<string, string> = {
  cta: "CTA",
  faq: "FAQ",
  nav: "Navigation",
  img: "Image",
  sub: "Subtitle",
  p1: "Paragraph 1",
  p2: "Paragraph 2",
  q: "Question",
  a: "Answer",
  v1: "Value 1",
  v2: "Value 2",
  v3: "Value 3",
  num: "Number",
  title: "Title",
  desc: "Description",
  tab1: "Tab 1",
  tab2: "Tab 2",
  tab3: "Tab 3",
  tab4: "Tab 4",
};

function humanize(key: string): string {
  if (SPECIAL[key]) return SPECIAL[key];
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/([A-Za-z])(\d)/g, "$1 $2")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

function isImageKey(key: string): boolean {
  return /^(.*)(image|img|logo|photo|avatar)$/i.test(key);
}

function itemTitle(obj: any, index: number): string {
  for (const k of ["name", "title", "q", "localName", "heading"]) {
    if (typeof obj?.[k] === "string" && obj[k]) return `${humanize(k)}: ${obj[k]}`;
  }
  return `Item ${index + 1}`;
}

function clearStrings(v: any): any {
  if (typeof v === "string") return "";
  if (Array.isArray(v)) return v.map(clearStrings);
  if (v && typeof v === "object") {
    const out: any = {};
    for (const k of Object.keys(v)) out[k] = clearStrings(v[k]);
    return out;
  }
  return v;
}

/* ---------- root editor ---------- */

export function Editor({ value, onChange }: { value: any; onChange: Updater }) {
  if (value === null || value === undefined) {
    return <p className="text-sm text-ink-400">Nothing to edit here.</p>;
  }
  const entries = Object.entries(value);
  const hasNested = entries.some(([, v]) => v !== null && typeof v === "object");

  if (!hasNested) {
    return (
      <div className="space-y-4">
        {entries.map(([k, v]) => (
          <EditorNode key={k} value={v} path={[k]} onChange={onChange} depth={0} keyName={k} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map(([k, v]) => (
        <details
          key={k}
          open={k === "site" || k === "hero" || k === "nav"}
          className="card-soft group rounded-2xl px-5 pb-2 pt-4"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-display text-[15px] font-bold text-ink-900">
            <span className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-teal-500" />
              {humanize(k)}
            </span>
            <IconChevronDown size={16} className="text-ink-400 transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <div className="mt-4 space-y-4 pb-4">
            {v !== null && typeof v === "object" && !Array.isArray(v)
              ? Object.entries(v).map(([k2, v2]) => (
                  <EditorNode key={k2} value={v2} path={[k, k2]} onChange={onChange} depth={1} keyName={k2} />
                ))
              : (
                  <EditorNode value={v} path={[k]} onChange={onChange} depth={1} keyName={k} />
                )}
          </div>
        </details>
      ))}
    </div>
  );
}

/* ---------- recursive node ---------- */

function EditorNode({
  value,
  path,
  onChange,
  depth,
  keyName,
}: {
  value: any;
  path: Path;
  onChange: Updater;
  depth: number;
  keyName?: string;
}) {
  const label = humanize(keyName ?? String(path[path.length - 1]));

  if (Array.isArray(value)) {
    return (
      <div>
        <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-ink-400">{label}</p>
        {value.every((v) => typeof v === "string") ? (
          <StringList value={value} path={path} onChange={onChange} />
        ) : (
          <ObjectList value={value} path={path} onChange={onChange} />
        )}
      </div>
    );
  }

  if (value !== null && typeof value === "object") {
    return (
      <div className="rounded-2xl bg-cream-100/70 p-4 shadow-soft-inset-sm">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-400">{label}</p>
        <div className="space-y-3.5">
          {Object.entries(value).map(([k, v]) => (
            <EditorNode key={k} value={v} path={[...path, k]} onChange={onChange} depth={depth + 1} keyName={k} />
          ))}
        </div>
      </div>
    );
  }

  return <ScalarField label={label} name={keyName ?? ""} value={value} path={path} onChange={onChange} />;
}

/* ---------- scalar fields ---------- */

function FieldShell({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-400">{label}</label>
      {children}
      {hint && <p className="mt-1.5 text-[11px] text-ink-300">{hint}</p>}
    </div>
  );
}

function ScalarField({
  label,
  name,
  value,
  path,
  onChange,
}: {
  label: string;
  name: string;
  value: any;
  path: Path;
  onChange: Updater;
}) {
  if (typeof value === "boolean") {
    return (
      <FieldShell label={label}>
        <button
          type="button"
          onClick={() => onChange(path, !value)}
          className={cn(
            "relative h-7 w-12 rounded-full transition-colors duration-300",
            value ? "bg-teal-600" : "bg-cream-300"
          )}
          aria-pressed={value}
        >
          <span
            className={cn(
              "absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-soft-sm transition-all duration-300",
              value ? "left-[22px]" : "left-0.5"
            )}
          />
        </button>
      </FieldShell>
    );
  }

  if (typeof value === "number") {
    return (
      <FieldShell label={label}>
        <input
          type="number"
          step="any"
          className="input-soft"
          value={value}
          onChange={(e) => onChange(path, e.target.value === "" ? 0 : Number(e.target.value))}
        />
      </FieldShell>
    );
  }

  const v = value ?? "";

  if (typeof v === "string" && isImageKey(name)) {
    return <ImageField label={label} value={v} path={path} onChange={onChange} />;
  }

  const multiLine = v.length > 100 || v.includes("\n");
  return (
    <FieldShell label={label}>
      {multiLine ? (
        <textarea
          className="input-soft min-h-[96px] resize-y leading-relaxed"
          value={v}
          onChange={(e) => onChange(path, e.target.value)}
        />
      ) : (
        <input
          className="input-soft"
          value={v}
          onChange={(e) => onChange(path, e.target.value)}
          placeholder={isImageKey(name) ? "/images/…" : ""}
        />
      )}
    </FieldShell>
  );
}

/* ---------- image field with upload ---------- */

function ImageField({
  label,
  value,
  path,
  onChange,
}: {
  label: string;
  value: string;
  path: Path;
  onChange: Updater;
}) {
  const [busy, setBusy] = useState(false);

  const upload = async (file: File) => {
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const j = await res.json().catch(() => ({}));
      if (j.url) onChange(path, j.url);
      else alert(j.error ?? "Upload failed");
    } catch {
      alert("Upload failed");
    }
    setBusy(false);
  };

  return (
    <FieldShell label={label} hint="Paste an image URL or upload a file (max 5 MB).">
      <div className="flex items-center gap-3">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt=""
            className="h-12 w-12 shrink-0 rounded-xl object-cover shadow-soft-sm"
          />
        ) : (
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cream-100 text-ink-300 shadow-soft-inset-sm">
            <IconImage size={18} />
          </span>
        )}
        <input
          className="input-soft flex-1"
          value={value}
          onChange={(e) => onChange(path, e.target.value)}
          placeholder="/images/hero.jpg or /uploads/logo.png"
        />
        <label className="btn btn-soft btn-md shrink-0 cursor-pointer">
          <IconUpload size={15} />
          {busy ? "…" : "Upload"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
              e.target.value = "";
            }}
          />
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange(path, "")}
            className="shrink-0 text-ink-300 transition-colors hover:text-red-500"
            aria-label={`Clear ${label}`}
          >
            <IconTrash size={16} />
          </button>
        )}
      </div>
    </FieldShell>
  );
}

/* ---------- string list ---------- */

function StringList({ value, path, onChange }: { value: string[]; path: Path; onChange: Updater }) {
  return (
    <div className="space-y-2.5">
      {value.map((item, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <input
            className="input-soft"
            value={item}
            onChange={(e) => onChange([...path, i], e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              const next = value.filter((_, j) => j !== i);
              onChange(path, next);
            }}
            className="shrink-0 text-ink-300 transition-colors hover:text-red-500"
            aria-label="Remove item"
          >
            <IconTrash size={15} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange(path, [...value, ""])}
        className="btn btn-outline btn-md !px-4"
      >
        <IconPlus size={14} />
        Add item
      </button>
    </div>
  );
}

/* ---------- object list ---------- */

function ObjectList({ value, path, onChange }: { value: any[]; path: Path; onChange: Updater }) {
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(path, next);
  };

  return (
    <div className="space-y-4">
      {value.map((item, i) => (
        <div key={i} className="rounded-2xl bg-cream-50 p-4 shadow-soft-sm">
          <div className="flex items-center justify-between gap-2 pb-3">
            <p className="truncate text-[13px] font-bold text-ink-800">{itemTitle(item, i)}</p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-400 transition-colors hover:bg-cream-100 hover:text-ink-700 disabled:opacity-30"
                aria-label="Move up"
              >
                <IconArrowUp size={14} />
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === value.length - 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-400 transition-colors hover:bg-cream-100 hover:text-ink-700 disabled:opacity-30"
                aria-label="Move down"
              >
                <IconArrowDown size={14} />
              </button>
              <button
                type="button"
                onClick={() => onChange(path, value.filter((_, j) => j !== i))}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-400 transition-colors hover:bg-red-50 hover:text-red-500"
                aria-label="Remove item"
              >
                <IconTrash size={14} />
              </button>
            </div>
          </div>
          <div className="space-y-3.5">
            {Object.entries(item).map(([k, v]) => (
              <EditorNode key={k} value={v} path={[...path, i, k]} onChange={onChange} depth={2} keyName={k} />
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange(path, [...value, clearStrings(value[0] ?? {})])}
        className="btn btn-outline btn-md"
      >
        <IconPlus size={14} />
        Add item
      </button>
    </div>
  );
}
