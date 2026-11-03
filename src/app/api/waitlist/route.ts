import { NextResponse } from "next/server";
import { z } from "zod";
import { checkZip } from "@/lib/service-areas";

/**
 * Stores waitlist signups in memory for now — this resets whenever the
 * server restarts. Once Supabase is connected (see NEATLY_SPEC.md section
 * 13, the `waitlist` table), this should write there instead so signups
 * survive deploys and the "ZIP opened" automation (section 14) can read
 * from it.
 */
const waitlist: { email: string; zip: string; createdAt: string }[] = [];

const waitlistSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  zip: z.string().regex(/^\d{5}$/, "Enter a 5-digit ZIP code."),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = waitlistSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request." },
      { status: 400 }
    );
  }

  const { email, zip } = parsed.data;
  const zipCheck = checkZip(zip);
  if (zipCheck.status === "open") {
    return NextResponse.json(
      { error: "That ZIP code is already open — you can book now." },
      { status: 400 }
    );
  }

  if (!waitlist.some((entry) => entry.email === email && entry.zip === zip)) {
    waitlist.push({ email, zip, createdAt: new Date().toISOString() });
  }

  return NextResponse.json({ ok: true });
}
