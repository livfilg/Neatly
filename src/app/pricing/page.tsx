import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import {
  DEFAULT_PRICING_SETTINGS,
  EXTRAS,
  FREQUENCY_LABELS,
  LEVELS,
  SIZE_RANGES,
  formatMoney,
  type Frequency,
} from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent, upfront pricing for every cleaning level, extra, and plan.",
};

export default function PricingPage() {
  return (
    <div className="max-w-[840px] mx-auto px-4 py-16">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Pricing</h1>
      <p className="text-base text-mute mt-3">
        One upfront price, no surprises. Your exact total depends on your home’s size, bedrooms,
        bathrooms, and any extras you add.
      </p>

      <h2 className="text-xl font-semibold mt-12">Starting prices</h2>
      <div className="mt-4 divide-y divide-line border border-line rounded-card overflow-hidden">
        {LEVELS.map((level) => (
          <div key={level.id} className="flex items-center justify-between px-5 py-4 bg-white">
            <span className="font-medium">{level.name}</span>
            <span className="text-mute">
              from {formatMoney(DEFAULT_PRICING_SETTINGS.levelBasePrice[level.id])}
            </span>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-10">Home size</h2>
      <ul className="mt-4 space-y-2 text-sm">
        <li>Each bedroom beyond the first: +{formatMoney(DEFAULT_PRICING_SETTINGS.perBedroom)}</li>
        <li>Each bathroom beyond the first: +{formatMoney(DEFAULT_PRICING_SETTINGS.perBathroom)}</li>
        {SIZE_RANGES.filter((s) => DEFAULT_PRICING_SETTINGS.sizeAdjustment[s.id] > 0).map((s) => (
          <li key={s.id}>
            {s.label}: +{formatMoney(DEFAULT_PRICING_SETTINGS.sizeAdjustment[s.id])}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-10">Extras</h2>
      <div className="mt-4 divide-y divide-line border border-line rounded-card overflow-hidden">
        {EXTRAS.map((extra) => (
          <div key={extra.id} className="flex items-center justify-between px-5 py-4 bg-white">
            <span className="font-medium">{extra.name}</span>
            <span className="text-mute">
              +{formatMoney(DEFAULT_PRICING_SETTINGS.extraPrice[extra.id])}
            </span>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-10">Recurring plans</h2>
      <p className="text-sm text-mute mt-2">
        Book on a schedule and save on every visit.
      </p>
      <div className="mt-4 divide-y divide-line border border-line rounded-card overflow-hidden">
        {(Object.keys(FREQUENCY_LABELS) as Frequency[])
          .filter((f) => f !== "once")
          .map((f) => (
            <div key={f} className="flex items-center justify-between px-5 py-4 bg-white">
              <span className="font-medium">{FREQUENCY_LABELS[f]}</span>
              <span className="text-mute">
                −{DEFAULT_PRICING_SETTINGS.frequencyDiscountPct[f]}%
              </span>
            </div>
          ))}
      </div>

      <h2 className="text-xl font-semibold mt-10">Service fee</h2>
      <p className="text-sm text-mute mt-2">
        A {DEFAULT_PRICING_SETTINGS.serviceFeePct}% service fee applies to the cleaning and extras
        total (after any plan discount) on every booking.
      </p>

      <div className="mt-12">
        <Button href="/#calculator" variant="primary">
          Get your instant price
        </Button>
      </div>
    </div>
  );
}
