/**
 * Shared pricing engine — used by both the public price calculator and
 * (later) the real booking flow, so client and server always agree.
 *
 * These numbers mirror `pricing_settings` as described in NEATLY_SPEC.md
 * section 7. Once Supabase is connected, `DEFAULT_PRICING_SETTINGS` will be
 * replaced by the live row from that table instead of being hard-coded.
 */

export type CleaningLevel = "light" | "standard" | "deep" | "move";
export type Frequency = "once" | "weekly" | "biweekly" | "monthly";
export type SizeRange = "under_750" | "750_1500" | "1500_2500" | "2500_plus";
export type ExtraId = "fridge" | "oven" | "windows" | "laundry" | "dishes" | "cabinets";

export interface PricingSettings {
  levelBasePrice: Record<CleaningLevel, number>;
  levelBaseHours: Record<CleaningLevel, number>;
  perBedroom: number;
  perBathroom: number;
  sizeAdjustment: Record<SizeRange, number>;
  extraPrice: Record<ExtraId, number>;
  extraHours: number;
  frequencyDiscountPct: Record<Frequency, number>;
  serviceFeePct: number;
  cancellationWindowHours: number;
  lateCancellationFee: number;
  referralCredit: number;
  welcomeOffer: number;
}

export const DEFAULT_PRICING_SETTINGS: PricingSettings = {
  levelBasePrice: { light: 79, standard: 109, deep: 189, move: 169 },
  levelBaseHours: { light: 2, standard: 3, deep: 5, move: 4.5 },
  perBedroom: 15,
  perBathroom: 20,
  sizeAdjustment: { under_750: 0, "750_1500": 0, "1500_2500": 20, "2500_plus": 45 },
  extraPrice: { fridge: 25, oven: 30, windows: 20, laundry: 15, dishes: 15, cabinets: 20 },
  extraHours: 0.3,
  frequencyDiscountPct: { once: 0, weekly: 15, biweekly: 10, monthly: 5 },
  serviceFeePct: 8,
  cancellationWindowHours: 24,
  lateCancellationFee: 40,
  referralCredit: 25,
  welcomeOffer: 15,
};

export const LEVELS: { id: CleaningLevel; name: string; description: string; included: string[] }[] = [
  {
    id: "light",
    name: "Light Refresh",
    description: "Basic upkeep between deeper cleans.",
    included: ["Dusting", "Vacuuming", "Sweeping", "Surface wiping", "Bathroom refresh"],
  },
  {
    id: "standard",
    name: "Standard Clean",
    description: "Regular home maintenance, top to bottom.",
    included: [
      "Dust all surfaces",
      "Vacuum and mop",
      "Kitchen counters and stovetop",
      "Full bathrooms",
      "Trash out",
      "Tidy up",
    ],
  },
  {
    id: "deep",
    name: "Deep Clean",
    description: "Built-up grime, baseboards, inside appliances.",
    included: [
      "Everything in Standard",
      "Baseboards and doors",
      "Kitchen degreasing",
      "Tile and grout scrub",
      "Hard-to-reach areas",
    ],
  },
  {
    id: "move",
    name: "Move-In / Move-Out",
    description: "Empty home, inside cabinets and appliances.",
    included: [
      "Everything in Deep",
      "Inside cabinets and drawers",
      "Inside fridge and oven",
      "Wall spot cleaning",
    ],
  },
];

export const EXTRAS: { id: ExtraId; name: string }[] = [
  { id: "fridge", name: "Inside fridge" },
  { id: "oven", name: "Inside oven" },
  { id: "windows", name: "Interior windows" },
  { id: "laundry", name: "Laundry and folding" },
  { id: "dishes", name: "Dishes" },
  { id: "cabinets", name: "Inside cabinets" },
];

export const SIZE_RANGES: { id: SizeRange; label: string }[] = [
  { id: "under_750", label: "Under 750 sq ft" },
  { id: "750_1500", label: "750–1,500 sq ft" },
  { id: "1500_2500", label: "1,500–2,500 sq ft" },
  { id: "2500_plus", label: "2,500+ sq ft" },
];

export const FREQUENCY_LABELS: Record<Frequency, string> = {
  once: "One time",
  weekly: "Every week",
  biweekly: "Every 2 weeks",
  monthly: "Every 4 weeks",
};

export interface QuoteInput {
  level: CleaningLevel;
  bedrooms: number;
  bathrooms: number;
  size: SizeRange;
  extras: ExtraId[];
  frequency: Frequency;
  promoOff?: number;
  credit?: number;
}

export interface Quote {
  base: number;
  extrasTotal: number;
  discount: number;
  serviceAmount: number;
  fee: number;
  promoApplied: number;
  creditApplied: number;
  total: number;
  estimatedHours: number;
}

export function calculateQuote(
  input: QuoteInput,
  settings: PricingSettings = DEFAULT_PRICING_SETTINGS
): Quote {
  const base =
    settings.levelBasePrice[input.level] +
    Math.max(0, input.bedrooms - 1) * settings.perBedroom +
    Math.max(0, input.bathrooms - 1) * settings.perBathroom +
    settings.sizeAdjustment[input.size];

  const extrasTotal = input.extras.reduce(
    (total, id) => total + settings.extraPrice[id],
    0
  );

  const discountPct = settings.frequencyDiscountPct[input.frequency];
  const discount = Math.round(((base + extrasTotal) * discountPct) / 100);

  const serviceAmount = base + extrasTotal - discount;
  const fee = Math.round((serviceAmount * settings.serviceFeePct) / 100);

  const preDiscountTotal = serviceAmount + fee;
  const creditApplied = Math.min(input.credit ?? 0, preDiscountTotal);
  const promoApplied = Math.min(input.promoOff ?? 0, preDiscountTotal - creditApplied);
  const total = Math.max(0, preDiscountTotal - creditApplied - promoApplied);

  const rawHours =
    settings.levelBaseHours[input.level] +
    Math.max(0, input.bedrooms - 3) * 0.5 +
    Math.max(0, input.bathrooms - 2) * 0.5 +
    input.extras.length * settings.extraHours;
  const estimatedHours = Math.max(1.5, Math.round(rawHours * 2) / 2);

  return { base, extrasTotal, discount, serviceAmount, fee, promoApplied, creditApplied, total, estimatedHours };
}

export function formatMoney(amount: number): string {
  const rounded = Math.round(amount);
  return (rounded < 0 ? "−$" : "$") + Math.abs(rounded).toLocaleString("en-US");
}
