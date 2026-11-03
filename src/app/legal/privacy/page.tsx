import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This policy describes what information Neatly collects, how we use it, and the choices
        you have.
      </p>
      <h2>Information we collect</h2>
      <p>
        Account details you provide (name, email, phone, address), booking history, and payment
        information handled by our payment processor. We never store your full card number.
      </p>
      <h2>How we use it</h2>
      <p>
        To provide the service: matching you with a cleaner, processing payment, sending booking
        updates, and improving Neatly.
      </p>
      <h2>Your choices</h2>
      <p>
        You can download a copy of your data or delete your account at any time from Account →
        Privacy.
      </p>
    </LegalPage>
  );
}
