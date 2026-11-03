export function Logo({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="var(--color-soft)" />
      <path
        d="M10.5 19.5 19 12.4l8.5 7.1V28.5a1.2 1.2 0 0 1-1.2 1.2h-4.6v-5.6h-5.4v5.6h-4.6a1.2 1.2 0 0 1-1.2-1.2z"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M29.5 6.5l1.05 2.7 2.7 1.05-2.7 1.05-1.05 2.7-1.05-2.7-2.7-1.05 2.7-1.05z"
        fill="var(--color-deep)"
      />
      <path
        d="M33 15.5l.5 1.2 1.2.5-1.2.5-.5 1.2-.5-1.2-1.2-.5 1.2-.5z"
        fill="var(--color-sky)"
      />
    </svg>
  );
}
