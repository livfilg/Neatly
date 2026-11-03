import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <p>
        These terms govern your use of Neatly’s website and booking service. By creating an
        account or booking a cleaning, you agree to these terms.
      </p>
      <h2>Using Neatly</h2>
      <p>
        Neatly connects customers with independent cleaning professionals. Cleaners are
        independent contractors, not Neatly employees.
      </p>
      <h2>Bookings and payment</h2>
      <p>
        You authorize Neatly to save a payment method and charge it for the price shown at
        booking, confirmed again at checkout, once your cleaning is marked complete.
      </p>
      <h2>Account responsibilities</h2>
      <p>
        You’re responsible for keeping your account information accurate and your login
        credentials secure.
      </p>
      <h2>Changes to these terms</h2>
      <p>We may update these terms from time to time. We’ll notify you of material changes.</p>
    </LegalPage>
  );
}
