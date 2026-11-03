import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Re-Clean Guarantee" };

export default function ReCleanGuaranteePage() {
  return (
    <LegalPage title="Re-Clean Guarantee">
      <p>
        If your clean doesn’t meet our standard, we’ll make it right — free of charge.
      </p>
      <h2>What’s covered</h2>
      <p>
        Areas missed or poorly cleaned, reported within 24 hours of your visit, qualify for a
        free re-clean or a partial refund, whichever you prefer.
      </p>
      <h2>How to request one</h2>
      <p>
        Open your booking and select “Report a problem,” or request a re-clean directly from a
        low-star rating. Our team reviews every request.
      </p>
      <h2>Low ratings</h2>
      <p>
        A rating of 3 stars or lower automatically opens a re-clean ticket so we can follow up.
      </p>
    </LegalPage>
  );
}
