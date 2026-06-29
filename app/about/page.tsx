import { Award, HeartHandshake, ShieldCheck, Users } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPageHero } from "@/lib/api";

export const metadata = { title: "About" };

export default async function AboutPage() {
  const hero = await getPageHero("about");
  const values = [
    { title: "Do the right work", icon: ShieldCheck },
    { title: "Respect the home", icon: HeartHandshake },
    { title: "Keep learning", icon: Award },
    { title: "Serve locally", icon: Users },
  ];
  return (
    <>
      <HeroSection {...hero} />
      <section className="py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Our story"
              title="Comfort service with a calmer process."
            />
            <p className="mt-6 leading-8 text-graphite-600">
              Apex Comfort HVAC was built for homeowners and property managers
              who want expert recommendations without confusion. Our team
              handles repair, replacement, maintenance, and indoor air upgrades
              with a consistent service model.
            </p>
          </div>
          <div className="rounded-brand bg-graphite-50 p-8">
            <h3 className="text-2xl font-bold text-navy-900">Mission</h3>
            <p className="mt-4 leading-8 text-graphite-600">
              Deliver durable heating and cooling outcomes through honest
              diagnostics, thoughtful system design, and support after
              installation.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-graphite-50 py-20">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Core values"
            title="How we show up."
            align="center"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <article
                  key={value.title}
                  className="rounded-brand bg-white p-6 text-center shadow-sm"
                >
                  <Icon className="mx-auto text-orange-500" />
                  <h3 className="mt-4 font-bold text-navy-900">
                    {value.title}
                  </h3>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
