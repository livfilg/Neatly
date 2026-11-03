import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { EXTRAS, LEVELS, DEFAULT_PRICING_SETTINGS, formatMoney } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Services",
  description: "Light Refresh, Standard Clean, Deep Clean, and Move-In/Move-Out cleaning in Greater Hartford, CT.",
};

export default function ServicesPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-16">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Services</h1>
      <p className="text-base text-mute mt-3 max-w-[560px]">
        Four cleaning levels, each built for a different need. Every price includes the first
        bedroom and bathroom — add rooms, size, and extras to get your exact total.
      </p>

      <div className="grid sm:grid-cols-2 gap-5 mt-10">
        {LEVELS.map((level) => (
          <Card key={level.id} className="p-6">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-xl font-semibold">{level.name}</h2>
              <span className="text-sm text-mute whitespace-nowrap">
                from {formatMoney(DEFAULT_PRICING_SETTINGS.levelBasePrice[level.id])}
              </span>
            </div>
            <p className="text-sm text-mute mt-1.5">{level.description}</p>
            <ul className="mt-4 space-y-1.5 text-sm">
              {level.included.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-deep">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={`/services/${level.id}`}
              className="text-sm font-semibold text-deep mt-5 inline-block hover:underline"
            >
              See details →
            </Link>
          </Card>
        ))}
      </div>

      <div className="mt-14">
        <h2 className="text-xl font-semibold">Popular extras</h2>
        <div className="flex flex-wrap gap-2 mt-4">
          {EXTRAS.map((extra) => (
            <span
              key={extra.id}
              className="h-9 px-3 rounded-full text-sm font-medium border border-line bg-white inline-flex items-center gap-1.5"
            >
              {extra.name}
              <span className="text-mute">
                +{formatMoney(DEFAULT_PRICING_SETTINGS.extraPrice[extra.id])}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
