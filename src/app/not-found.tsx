import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="max-w-[560px] mx-auto px-4 py-24 text-center">
      <span className="text-xs font-semibold tracking-wider uppercase text-deep">404</span>
      <h1 className="text-3xl font-semibold tracking-tight mt-2">Page not found</h1>
      <p className="text-base text-mute mt-3">
        We couldn’t find the page you’re looking for. It may have moved, or the link might be
        incorrect.
      </p>
      <div className="mt-8">
        <Button href="/" variant="primary">
          Back to home
        </Button>
      </div>
    </div>
  );
}
