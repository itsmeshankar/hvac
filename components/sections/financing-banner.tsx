import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinancingBanner() {
  return <section className="bg-sky-100 py-16"><div className="container-shell flex flex-col items-start justify-between gap-6 md:flex-row md:items-center"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-600">Flexible financing</p><h2 className="mt-3 text-3xl font-black text-navy-900 md:text-4xl">Upgrade comfort now and pay over time.</h2><p className="mt-3 max-w-2xl text-graphite-700">Qualified homeowners can choose monthly payment options for replacements, repairs, and indoor air upgrades.</p></div><Button asChild><Link href="/financing">View Financing</Link></Button></div></section>;
}
