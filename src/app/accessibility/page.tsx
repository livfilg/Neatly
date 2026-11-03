import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Accessibility" };

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility">
      <p>
        Neatly is committed to making our website usable by everyone, including people using
        assistive technology.
      </p>
      <h2>Our standard</h2>
      <p>
        We’re building Neatly to meet WCAG 2.1 Level AA, including keyboard navigation, screen
        reader support, sufficient color contrast, and support for browser zoom up to 200%.
      </p>
      <h2>Feedback</h2>
      <p>
        If you encounter an accessibility barrier anywhere on Neatly, please contact our support
        team so we can fix it.
      </p>
    </LegalPage>
  );
}
