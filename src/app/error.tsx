"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-[560px] mx-auto px-4 py-24 text-center">
      <span className="text-xs font-semibold tracking-wider uppercase text-badink">Error</span>
      <h1 className="text-3xl font-semibold tracking-tight mt-2">Something went wrong</h1>
      <p className="text-base text-mute mt-3">
        Sorry about that — something broke on our end. Try again, or head back to the homepage.
      </p>
      <div className="flex gap-3 justify-center mt-8">
        <Button onClick={() => reset()} variant="primary">
          Try again
        </Button>
        <Button href="/" variant="ghost">
          Back to home
        </Button>
      </div>
    </div>
  );
}
