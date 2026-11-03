import { ReactNode } from "react";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="max-w-[720px] mx-auto px-4 py-16">
      <div className="bg-warn text-warnink text-sm rounded-xl px-4 py-3">
        Draft, pending attorney review. This page is placeholder text and is not final legal
        language.
      </div>
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-6">{title}</h1>
      <div className="prose-neatly mt-8 space-y-4 text-sm leading-relaxed text-ink/90 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-ink [&_h2]:mt-8 [&_h2]:mb-2">
        {children}
      </div>
    </div>
  );
}
