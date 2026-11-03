import { describe, expect, it } from "vitest";
import { calculateQuote, DEFAULT_PRICING_SETTINGS, type QuoteInput } from "./pricing";

const base: QuoteInput = {
  level: "standard",
  bedrooms: 1,
  bathrooms: 1,
  size: "under_750",
  extras: [],
  frequency: "once",
};

describe("calculateQuote", () => {
  it("starts from the level's base price with no add-ons", () => {
    const quote = calculateQuote(base);
    expect(quote.base).toBe(109);
    expect(quote.serviceAmount).toBe(109);
  });

  it("charges the correct starting price for every level", () => {
    expect(calculateQuote({ ...base, level: "light" }).base).toBe(79);
    expect(calculateQuote({ ...base, level: "standard" }).base).toBe(109);
    expect(calculateQuote({ ...base, level: "deep" }).base).toBe(189);
    expect(calculateQuote({ ...base, level: "move" }).base).toBe(169);
  });

  it("adds $15 per bedroom beyond the first", () => {
    const quote = calculateQuote({ ...base, bedrooms: 3 });
    expect(quote.base).toBe(109 + 2 * 15);
  });

  it("adds $20 per bathroom beyond the first", () => {
    const quote = calculateQuote({ ...base, bathrooms: 3 });
    expect(quote.base).toBe(109 + 2 * 20);
  });

  it("applies the size adjustment tiers", () => {
    expect(calculateQuote({ ...base, size: "under_750" }).base).toBe(109);
    expect(calculateQuote({ ...base, size: "750_1500" }).base).toBe(109);
    expect(calculateQuote({ ...base, size: "1500_2500" }).base).toBe(129);
    expect(calculateQuote({ ...base, size: "2500_plus" }).base).toBe(154);
  });

  it("prices each extra correctly and sums them", () => {
    const quote = calculateQuote({ ...base, extras: ["fridge", "oven", "windows", "laundry", "dishes", "cabinets"] });
    expect(quote.extrasTotal).toBe(25 + 30 + 20 + 15 + 15 + 20);
  });

  it("applies the frequency discount to cleaning + extras only", () => {
    const quote = calculateQuote({ ...base, extras: ["fridge"], frequency: "weekly" });
    const expectedDiscount = Math.round((109 + 25) * 0.15);
    expect(quote.discount).toBe(expectedDiscount);
    expect(quote.serviceAmount).toBe(109 + 25 - expectedDiscount);
  });

  it("charges an 8% service fee on the discounted service amount", () => {
    const quote = calculateQuote(base);
    expect(quote.fee).toBe(Math.round(109 * (DEFAULT_PRICING_SETTINGS.serviceFeePct / 100)));
  });

  it("subtracts credit before promo, and never goes below $0", () => {
    const quote = calculateQuote({ ...base, credit: 1000, promoOff: 1000 });
    expect(quote.total).toBe(0);
    expect(quote.creditApplied).toBeGreaterThan(0);
  });

  it("computes estimated hours with the bedroom/bathroom/extras rules, rounded to the nearest half hour", () => {
    const quote = calculateQuote({
      level: "standard",
      bedrooms: 4,
      bathrooms: 3,
      size: "under_750",
      extras: ["fridge", "oven"],
      frequency: "once",
    });
    // 3 (base) + 0.5*(4-3) + 0.5*(3-2) + 0.3*2 = 4.6 -> rounds to 4.5
    expect(quote.estimatedHours).toBe(4.5);
  });

  it("never estimates fewer than 1.5 hours", () => {
    const quote = calculateQuote({ ...base, level: "light", bedrooms: 1, bathrooms: 1 });
    expect(quote.estimatedHours).toBeGreaterThanOrEqual(1.5);
  });
});
