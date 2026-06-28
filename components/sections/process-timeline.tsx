import { SectionHeading } from "@/components/ui/section-heading";

export function ProcessTimeline() {
  const steps = ["Schedule", "Diagnose", "Approve", "Restore"];
  return <section className="py-20"><div className="container-shell"><SectionHeading eyebrow="Process" title="A simple path back to comfort." align="center" /><div className="mt-10 grid gap-5 md:grid-cols-4">{steps.map((step, index) => <article key={step} className="rounded-brand border border-graphite-100 bg-white p-6 text-center shadow-sm"><p className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 font-black text-orange-600">{index + 1}</p><h3 className="mt-5 text-xl font-bold text-navy-900">{step}</h3><p className="mt-3 text-sm leading-6 text-graphite-500">Clear updates and practical recommendations at every step.</p></article>)}</div></div></section>;
}
