/**
 * Service area data. This mirrors the `service_areas` table described in
 * NEATLY_SPEC.md section 13 — once Supabase is connected, this will be
 * read from that table (and editable by staff) instead of hard-coded here.
 */

export interface Town {
  slug: string;
  name: string;
  blurb: string;
}

export const TOWNS: Town[] = [
  {
    slug: "west-hartford",
    name: "West Hartford",
    blurb: "From Elmwood to Bishops Corner, we cover every neighborhood in West Hartford.",
  },
  {
    slug: "hartford",
    name: "Hartford",
    blurb: "Serving Hartford's West End, Blue Hills, Parkville, and the rest of the city.",
  },
  {
    slug: "farmington",
    name: "Farmington",
    blurb: "Covering Unionville and Farmington Village.",
  },
  {
    slug: "bloomfield",
    name: "Bloomfield",
    blurb: "Serving Bloomfield Center and the surrounding neighborhoods.",
  },
  {
    slug: "newington",
    name: "Newington",
    blurb: "Covering Newington Center and the rest of town.",
  },
];

/** ZIP → town name, for every ZIP we recognize (open or not). */
const ZIP_TO_TOWN: Record<string, string> = {
  "06107": "West Hartford",
  "06117": "West Hartford",
  "06119": "West Hartford",
  "06110": "West Hartford",
  "06105": "Hartford",
  "06106": "Hartford",
  "06112": "Hartford",
  "06114": "Hartford",
  "06032": "Farmington",
  "06002": "Bloomfield",
  "06111": "Newington",
  "06001": "Avon",
  "06033": "Glastonbury",
  "06109": "Wethersfield",
  "06070": "Simsbury",
  "06040": "Manchester",
};

/** ZIPs we currently serve. Everything else recognized goes on the waitlist. */
const OPEN_ZIPS = new Set([
  "06107",
  "06117",
  "06119",
  "06110",
  "06105",
  "06106",
  "06112",
  "06114",
  "06032",
  "06002",
  "06111",
]);

export type ZipCheckResult =
  | { status: "open"; town: string }
  | { status: "waitlist"; town: string }
  | { status: "unknown" };

export function checkZip(zip: string): ZipCheckResult {
  const town = ZIP_TO_TOWN[zip];
  if (!town) return { status: "unknown" };
  return OPEN_ZIPS.has(zip) ? { status: "open", town } : { status: "waitlist", town };
}
