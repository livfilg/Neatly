import { HTMLAttributes, ReactNode } from "react";

export function Card({
  children,
  className = "",
  lift = false,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode; lift?: boolean }) {
  return (
    <div
      className={`bg-white border border-line rounded-card ${
        lift ? "shadow-[0_1px_2px_rgba(23,43,58,0.04),0_10px_24px_-14px_rgba(23,43,58,0.18)]" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
