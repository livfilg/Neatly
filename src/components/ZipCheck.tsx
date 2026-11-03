"use client";

import { FormEvent, useId, useState } from "react";
import { checkZip, type ZipCheckResult } from "@/lib/service-areas";
import { Button } from "@/components/ui/Button";

export function ZipCheck() {
  const [zip, setZip] = useState("");
  const [result, setResult] = useState<ZipCheckResult | null>(null);
  const [email, setEmail] = useState("");
  const [waitlistState, setWaitlistState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [waitlistError, setWaitlistError] = useState<string | null>(null);
  const zipInputId = useId();
  const emailInputId = useId();

  const onCheck = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\d{5}$/.test(zip)) {
      setResult(null);
      return;
    }
    setResult(checkZip(zip));
    setWaitlistState("idle");
  };

  const onJoinWaitlist = async (e: FormEvent) => {
    e.preventDefault();
    setWaitlistState("saving");
    setWaitlistError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, zip }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setWaitlistState("saved");
    } catch (err) {
      setWaitlistState("error");
      setWaitlistError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <div className="bg-white border border-line rounded-card p-6 sm:p-8">
      <h2 className="text-xl font-semibold">Is Neatly in your area?</h2>
      <p className="text-sm text-mute mt-1">Enter your ZIP code to check.</p>

      <form onSubmit={onCheck} className="flex gap-2 mt-4 max-w-[320px]">
        <label htmlFor={zipInputId} className="sr-only">
          ZIP code
        </label>
        <input
          id={zipInputId}
          inputMode="numeric"
          maxLength={5}
          autoComplete="postal-code"
          placeholder="06107"
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
          className="h-11 border border-line rounded-xl px-3 text-sm w-full tabular-nums focus:outline-none focus:border-deep focus:ring-2 focus:ring-soft"
        />
        <Button type="submit" variant="dark">
          Check
        </Button>
      </form>

      {result?.status === "open" && (
        <p className="text-sm text-deep font-medium mt-3">
          Good news — we clean in {result.town}. You can book as soon as you&apos;re signed up.
        </p>
      )}

      {result?.status === "unknown" && (
        <p className="text-sm text-mute mt-3">
          We don&apos;t recognize that ZIP code yet. Double check it, or reach out and we&apos;ll
          take a look.
        </p>
      )}

      {result?.status === "waitlist" && (
        <div className="mt-4">
          <p className="text-sm text-warnink bg-warn rounded-xl px-3 py-2 inline-block">
            {result.town} isn&apos;t open yet — we&apos;ll email you the moment it is.
          </p>
          {waitlistState === "saved" ? (
            <p className="text-sm text-deep font-medium mt-3">
              You&apos;re on the list for {result.town}. We&apos;ll email you when we launch there.
            </p>
          ) : (
            <form onSubmit={onJoinWaitlist} className="flex gap-2 mt-3 max-w-[360px]">
              <label htmlFor={emailInputId} className="sr-only">
                Email address
              </label>
              <input
                id={emailInputId}
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 border border-line rounded-xl px-3 text-sm w-full focus:outline-none focus:border-deep focus:ring-2 focus:ring-soft"
              />
              <Button type="submit" variant="primary" disabled={waitlistState === "saving"}>
                {waitlistState === "saving" ? "Joining…" : "Join waitlist"}
              </Button>
            </form>
          )}
          {waitlistState === "error" && (
            <p className="text-sm text-badink mt-2">{waitlistError}</p>
          )}
        </div>
      )}
    </div>
  );
}
