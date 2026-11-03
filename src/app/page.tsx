import Link from "next/link";
import { PriceCalculator } from "@/components/PriceCalculator";
import { ZipCheck } from "@/components/ZipCheck";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { LEVELS } from "@/lib/pricing";
import { TOWNS } from "@/lib/service-areas";

const TRUST_ITEMS = [
  "Background-checked, vetted pros",
  "Book in 60 seconds",
  "Pay only after it's done",
  "Free re-clean guarantee",
];

export default function HomePage() {
  return (
    <div>
      <section className="bg-mist border-b border-line">
        <div className="max-w-[1200px] mx-auto px-4 py-16 sm:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-deep">
              Greater Hartford, CT
            </span>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mt-2">
              A clean home, booked in 60 seconds.
            </h1>
            <p className="text-base text-mute mt-4 max-w-[480px]">
              Neatly connects you with vetted, independent cleaning professionals. See your price
              instantly, book online, and pay only after the clean is done.
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <Button href="/#calculator" variant="primary">
                Get your instant price
              </Button>
              <Button href="/how-it-works" variant="ghost">
                How it works
              </Button>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm text-ink/80">
              {TRUST_ITEMS.map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <span aria-hidden="true" className="text-deep">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div id="zip-check">
            <ZipCheck />
          </div>
        </div>
      </section>

      <section id="calculator" className="max-w-[1200px] mx-auto px-4 py-16 sm:py-20 scroll-mt-20">
        <div className="max-w-[640px]">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">See your price now</h2>
          <p className="text-sm text-mute mt-2">
            No account needed. Tell us about your home and get an instant estimate.
          </p>
        </div>
        <div className="mt-8">
          <PriceCalculator />
        </div>
      </section>

      <section className="bg-mist border-y border-line">
        <div className="max-w-[1200px] mx-auto px-4 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Pick your clean</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {LEVELS.map((level) => (
              <Card key={level.id} className="p-5">
                <div className="font-semibold">{level.name}</div>
                <p className="text-sm text-mute mt-1.5">{level.description}</p>
                <Link
                  href={`/services/${level.id}`}
                  className="text-sm font-semibold text-deep mt-4 inline-block hover:underline"
                >
                  Learn more →
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 py-16 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Where we clean</h2>
        <p className="text-sm text-mute mt-2">
          Currently serving five towns in Greater Hartford, with more on the way.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {TOWNS.map((town) => (
            <Link key={town.slug} href={`/cleaning/${town.slug}`}>
              <Card className="p-5 h-full hover:border-sky transition">
                <div className="font-semibold">{town.name}, CT</div>
                <p className="text-sm text-mute mt-1.5">{town.blurb}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
