import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about booking, pricing, cancellations, and more.",
};

const FAQS: { question: string; answer: string }[] = [
  {
    question: "How does pricing work?",
    answer:
      "Every cleaning level has a starting price that adjusts for bedrooms, bathrooms, home size, and any extras you add. You'll see the exact total before you book, and it's recalculated and confirmed again at checkout.",
  },
  {
    question: "When am I charged?",
    answer:
      "We save your card when you book, but you're not charged until your cleaning is marked complete.",
  },
  {
    question: "Can I cancel or reschedule?",
    answer:
      "Yes. Cancelling or rescheduling more than 24 hours before your visit is free. Inside 24 hours, a late cancellation fee may apply — see our cancellation policy for details.",
  },
  {
    question: "What if I'm not happy with the clean?",
    answer:
      "Our re-clean guarantee means we'll send someone back within 24 hours at no extra cost, or offer a partial refund — see the re-clean guarantee page for details.",
  },
  {
    question: "Are cleaners background-checked?",
    answer: "Yes, every independent cleaning professional on Neatly is vetted before their first clean.",
  },
  {
    question: "Which areas do you serve?",
    answer:
      "We currently serve West Hartford, Hartford, Farmington, Bloomfield, and Newington, CT, with more towns on the way. Enter your ZIP code on the homepage to check.",
  },
];

export default function FaqPage() {
  return (
    <div className="max-w-[760px] mx-auto px-4 py-16">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Frequently asked questions</h1>
      <div className="mt-10 divide-y divide-line border border-line rounded-card overflow-hidden">
        {FAQS.map((faq) => (
          <details key={faq.question} className="group bg-white px-5 py-4">
            <summary className="font-medium cursor-pointer list-none flex items-center justify-between gap-4">
              {faq.question}
              <span aria-hidden="true" className="text-mute group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <p className="text-sm text-mute mt-3">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
