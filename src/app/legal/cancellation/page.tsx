import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { DEFAULT_PRICING_SETTINGS, formatMoney } from "@/lib/pricing";

export const metadata: Metadata = { title: "Cancellation Policy" };

export default function CancellationPage() {
  return (
    <LegalPage title="Cancellation Policy">
      <p>You can cancel or reschedule any booking from your Bookings page.</p>
      <h2>Free cancellation</h2>
      <p>
        Cancelling or rescheduling more than {DEFAULT_PRICING_SETTINGS.cancellationWindowHours}{" "}
        hours before your scheduled visit is always free.
      </p>
      <h2>Late cancellation</h2>
      <p>
        Cancelling less than {DEFAULT_PRICING_SETTINGS.cancellationWindowHours} hours before your
        visit may incur a {formatMoney(DEFAULT_PRICING_SETTINGS.lateCancellationFee)} late
        cancellation fee, charged to your saved payment method.
      </p>
      <h2>Recurring plans</h2>
      <p>
        You can skip a single visit, pause, or end a recurring plan at any time from your account.
      </p>
    </LegalPage>
  );
}
