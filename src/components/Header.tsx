import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="border-b border-line bg-white">
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Logo size={30} />
          <span className="font-semibold text-[17px] tracking-tight">Neatly</span>
        </Link>
        <nav
          aria-label="Main"
          className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-ink/80"
        >
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto">
          <Button href="/#calculator" variant="primary">
            Check your price
          </Button>
        </div>
      </div>
    </header>
  );
}
