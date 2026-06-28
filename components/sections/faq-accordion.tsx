import { SectionHeading } from "@/components/ui/section-heading";
import { faqs as fallbackFaqs } from "@/lib/site";
import type { FaqItem } from "@/types/content";

export function FaqAccordion({
  limit,
  items = fallbackFaqs,
}: {
  limit?: number;
  items?: FaqItem[];
}) {
  const visible = typeof limit === "number" ? items.slice(0, limit) : items;
  return (
    <section className="py-20">
      <div className="container-shell">
        <SectionHeading
          eyebrow="FAQ"
          title="Straight answers before you book."
          align="center"
        />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-graphite-100 rounded-brand border border-graphite-100 bg-white shadow-sm">
          {visible.map((faq) => (
            <details key={faq.id} className="group p-6">
              <summary className="cursor-pointer list-none font-bold text-navy-900">
                {faq.question}
              </summary>
              <p className="mt-3 leading-7 text-graphite-500">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
