"use client";

import { useId, useMemo, useState } from "react";
import {
  calculateQuote,
  EXTRAS,
  formatMoney,
  LEVELS,
  SIZE_RANGES,
  type CleaningLevel,
  type ExtraId,
  type SizeRange,
} from "@/lib/pricing";
import { Chip } from "@/components/ui/Chip";

export function PriceCalculator() {
  const [level, setLevel] = useState<CleaningLevel>("standard");
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [size, setSize] = useState<SizeRange>("750_1500");
  const [extras, setExtras] = useState<ExtraId[]>([]);
  const bedroomsId = useId();
  const bathroomsId = useId();

  const quote = useMemo(
    () =>
      calculateQuote({
        level,
        bedrooms,
        bathrooms,
        size,
        extras,
        frequency: "once",
      }),
    [level, bedrooms, bathrooms, size, extras]
  );

  const toggleExtra = (id: ExtraId) =>
    setExtras((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]));

  return (
    <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-0 bg-white border border-line rounded-card overflow-hidden">
      <div className="p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-deep">Instant estimate</span>
          <h2 className="text-xl font-semibold mt-1">What does your home need?</h2>
        </div>

        <div>
          <span className="text-[11.5px] font-semibold tracking-wider uppercase text-mute">
            Cleaning level
          </span>
          <div className="grid sm:grid-cols-2 gap-2 mt-2">
            {LEVELS.map((l) => (
              <button
                key={l.id}
                type="button"
                aria-pressed={level === l.id}
                onClick={() => setLevel(l.id)}
                className={`text-left p-3 rounded-xl border transition ${
                  level === l.id ? "border-sky bg-soft" : "border-line hover:border-sky"
                }`}
              >
                <div className="font-semibold text-sm">{l.name}</div>
                <div className="text-xs text-mute mt-0.5">{l.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor={bedroomsId} className="text-[11.5px] font-semibold tracking-wider uppercase text-mute">
              Bedrooms
            </label>
            <div className="flex items-center gap-3 mt-2">
              <button
                type="button"
                aria-label="Fewer bedrooms"
                disabled={bedrooms <= 0}
                onClick={() => setBedrooms((b) => b - 1)}
                className="w-9 h-9 rounded-full border border-line grid place-items-center disabled:opacity-30 hover:bg-mist"
              >
                −
              </button>
              <span id={bedroomsId} className="w-5 text-center font-semibold">
                {bedrooms}
              </span>
              <button
                type="button"
                aria-label="More bedrooms"
                disabled={bedrooms >= 8}
                onClick={() => setBedrooms((b) => b + 1)}
                className="w-9 h-9 rounded-full border border-sky bg-soft grid place-items-center disabled:opacity-30 hover:bg-sky"
              >
                +
              </button>
            </div>
          </div>
          <div>
            <label htmlFor={bathroomsId} className="text-[11.5px] font-semibold tracking-wider uppercase text-mute">
              Bathrooms
            </label>
            <div className="flex items-center gap-3 mt-2">
              <button
                type="button"
                aria-label="Fewer bathrooms"
                disabled={bathrooms <= 1}
                onClick={() => setBathrooms((b) => b - 1)}
                className="w-9 h-9 rounded-full border border-line grid place-items-center disabled:opacity-30 hover:bg-mist"
              >
                −
              </button>
              <span id={bathroomsId} className="w-5 text-center font-semibold">
                {bathrooms}
              </span>
              <button
                type="button"
                aria-label="More bathrooms"
                disabled={bathrooms >= 6}
                onClick={() => setBathrooms((b) => b + 1)}
                className="w-9 h-9 rounded-full border border-sky bg-soft grid place-items-center disabled:opacity-30 hover:bg-sky"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div>
          <span className="text-[11.5px] font-semibold tracking-wider uppercase text-mute">Home size</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {SIZE_RANGES.map((s) => (
              <Chip key={s.id} on={size === s.id} onClick={() => setSize(s.id)}>
                {s.label}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <span className="text-[11.5px] font-semibold tracking-wider uppercase text-mute">Extras</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {EXTRAS.map((e) => (
              <Chip key={e.id} on={extras.includes(e.id)} onClick={() => toggleExtra(e.id)}>
                {e.name}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-mist border-t lg:border-t-0 lg:border-l border-line p-6 sm:p-8 flex flex-col justify-center">
        <span className="text-[11.5px] font-semibold tracking-wider uppercase text-mute">
          Estimated total
        </span>
        <div className="text-[40px] font-semibold tracking-tight mt-1 tabular-nums">
          {formatMoney(quote.total)}
        </div>
        <div className="text-sm text-mute mt-1">About {quote.estimatedHours} hours</div>

        <dl className="mt-6 space-y-1.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-mute">Cleaning + extras</dt>
            <dd>{formatMoney(quote.base + quote.extrasTotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-mute">Service fee</dt>
            <dd>{formatMoney(quote.fee)}</dd>
          </div>
        </dl>

        <p className="text-xs text-mute mt-6">
          Final price is confirmed at checkout and recurring plans get a discount. No charge until
          the clean is done.
        </p>
      </div>
    </div>
  );
}
