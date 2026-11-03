import Link from "next/link";
import { Logo } from "@/components/Logo";
import { TOWNS } from "@/lib/service-areas";

const COPYRIGHT_YEAR = 2026;

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Company",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/pricing", label: "Pricing" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Service areas",
    links: TOWNS.map((town) => ({ href: `/cleaning/${town.slug}`, label: town.name })),
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/terms", label: "Terms of service" },
      { href: "/legal/privacy", label: "Privacy policy" },
      { href: "/legal/cancellation", label: "Cancellation policy" },
      { href: "/legal/re-clean-guarantee", label: "Re-clean guarantee" },
      { href: "/accessibility", label: "Accessibility" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-mist">
      <div className="max-w-[1200px] mx-auto px-4 py-12 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Logo size={28} />
            <span className="font-semibold text-[16px] tracking-tight">Neatly</span>
          </Link>
          <p className="text-sm text-mute mt-3 max-w-[220px]">
            On-demand house cleaning with vetted, independent pros in Greater Hartford, CT.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <div className="text-xs font-semibold tracking-wider uppercase text-mute">{col.title}</div>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink/80 hover:text-deep">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="max-w-[1200px] mx-auto px-4 py-5 text-xs text-mute">
          © {COPYRIGHT_YEAR} Neatly. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
