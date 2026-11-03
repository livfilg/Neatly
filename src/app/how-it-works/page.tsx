import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "How it works",
  description: "Book a vetted cleaning professional in minutes, track your clean live, and pay after it's done.",
};

const STEPS = [
  {
    title: "Book in 60 seconds",
    body: "Tell us about your home and pick a time. No account needed to see your price.",
  },
  {
    title: "Get matched with a vetted pro",
    body: "Every cleaner is background-checked and vetted before they ever enter a home.",
  },
  {
    title: "Track it live",
    body: "See your cleaner confirmed, on the way, and cleaning — right from your booking.",
  },
  {
    title: "Pay after it's done",
    body: "We save your card at booking but only charge once the clean is marked complete.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="max-w-[760px] mx-auto px-4 py-16">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">How Neatly works</h1>
      <p className="text-base text-mute mt-3">
        From booking to a spotless home, here’s what to expect.
      </p>

      <ol className="mt-10 space-y-8">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span className="shrink-0 w-9 h-9 rounded-full bg-soft text-deep font-semibold grid place-items-center">
              {i + 1}
            </span>
            <div>
              <h2 className="font-semibold">{step.title}</h2>
              <p className="text-sm text-mute mt-1">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12">
        <Button href="/#calculator" variant="primary">
          Get your instant price
        </Button>
      </div>
    </div>
  );
}
