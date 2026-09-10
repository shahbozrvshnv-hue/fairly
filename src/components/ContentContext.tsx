"use client";

import { createContext, useContext, type ReactNode } from "react";

type ContentCtx = {
  locale: string;
  content: Record<string, any>;
};

const ContentContext = createContext<ContentCtx | null>(null);

export function ContentProvider({
  locale,
  content,
  children,
}: ContentCtx & { children: ReactNode }) {
  return (
    <ContentContext.Provider value={{ locale, content }}>{children}</ContentContext.Provider>
  );
}

export function useContent(): ContentCtx {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
