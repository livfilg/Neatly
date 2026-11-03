import { ButtonHTMLAttributes } from "react";

export function Chip({
  on = false,
  className = "",
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { on?: boolean }) {
  return (
    <button
      aria-pressed={on}
      className={`h-9 px-3 rounded-full text-[13px] font-medium border inline-flex items-center gap-1.5 transition whitespace-nowrap ${
        on ? "bg-soft border-sky text-ink" : "bg-white border-line text-ink/80 hover:border-sky"
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
