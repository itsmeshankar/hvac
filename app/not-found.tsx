import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-shell flex min-h-[60vh] flex-col items-start justify-center gap-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Page not found</p>
      <h1 className="max-w-2xl text-4xl font-bold text-navy-900 md:text-6xl">This page is off the duct run.</h1>
      <p className="max-w-xl text-lg text-graphite-500">Head back home or book service and we will get you to the right place.</p>
      <Button asChild><Link href="/">Return home</Link></Button>
    </section>
  );
}
