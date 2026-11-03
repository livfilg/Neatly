import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { LEVELS } from "@/lib/pricing";
import { TOWNS } from "@/lib/service-areas";

export function generateStaticParams() {
  return TOWNS.map((town) => ({ town: town.slug }));
}

function getTown(slug: string) {
  return TOWNS.find((town) => town.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ town: string }>;
}): Promise<Metadata> {
  const { town: slug } = await params;
  const town = getTown(slug);
  if (!town) return {};
  return {
    title: `House cleaning in ${town.name}, CT`,
    description: town.blurb,
  };
}

export default async function TownPage({ params }: { params: Promise<{ town: string }> }) {
  const { town: slug } = await params;
  const town = getTown(slug);
  if (!town) notFound();

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-16">
      <span className="text-xs font-semibold tracking-wider uppercase text-deep">
        Now serving {town.name}
      </span>
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-2">
        House cleaning in {town.name}, CT
      </h1>
      <p className="text-base text-mute mt-3 max-w-[560px]">{town.blurb}</p>

      <div className="mt-8">
        <Button href="/#calculator" variant="primary">
          Get your instant price
        </Button>
      </div>

      <h2 className="text-xl font-semibold mt-14">Available in {town.name}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {LEVELS.map((level) => (
          <Card key={level.id} className="p-5">
            <div className="font-semibold">{level.name}</div>
            <p className="text-sm text-mute mt-1.5">{level.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
