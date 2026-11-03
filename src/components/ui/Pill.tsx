import { ReactNode } from "react";

type Tone = "soft" | "mint" | "warn" | "bad" | "line";

const tones: Record<Tone, string> = {
  soft: "bg-soft text-deep",
  mint: "bg-mint text-ink",
  warn: "bg-warn text-warnink",
  bad: "bg-bad text-badink",
  line: "bg-mist text-mute border border-line",
};

export function Pill({ tone = "soft", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 h-6 px-[9px] rounded-full text-xs font-semibold whitespace-nowrap ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
