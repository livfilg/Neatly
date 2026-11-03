import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { DEFAULT_PRICING_SETTINGS, formatMoney, LEVELS, type CleaningLevel } from "@/lib/pricing";

export function generateStaticParams() {
  return LEVELS.map((level) => ({ slug: level.id }));
}

function getLevel(slug: string) {
  return LEVELS.find((level) => level.id === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const level = getLevel(slug);
  if (!level) return {};
  return { title: level.name, description: level.description };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const level = getLevel(slug);
  if (!level) notFound();

  const price = DEFAULT_PRICING_SETTINGS.levelBasePrice[level.id as CleaningLevel];
  const hours = DEFAULT_PRICING_SETTINGS.levelBaseHours[level.id as CleaningLevel];

  return (
    <div className="max-w-[760px] mx-auto px-4 py-16">
      <span className="text-xs font-semibold tracking-wider uppercase text-deep">
        from {formatMoney(price)} · about {hours} {hours === 1 ? "hour" : "hours"}
      </span>
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-2">{level.name}</h1>
      <p className="text-base text-mute mt-3">{level.description}</p>

      <h2 className="text-lg font-semibold mt-10">What’s included</h2>
      <ul className="mt-3 space-y-2">
        {level.included.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm">
            <span aria-hidden="true" className="text-deep">✓</span>
            {item}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3 mt-10">
        <Button href="/#calculator" variant="primary">
          Get your price
        </Button>
        <Button href="/services" variant="ghost">
          See all services
        </Button>
      </div>
    </div>
  );
}
