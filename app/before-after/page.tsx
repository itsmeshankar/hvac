import { ProjectCard } from "@/components/cards/project-card";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPageHero, getProjects } from "@/lib/api";

export const metadata = { title: "Before & After" };
export default async function BeforeAfterPage() { const [hero, projectItems] = await Promise.all([getPageHero("before-after"), getProjects()]); return <><HeroSection {...hero} /><section className="py-20"><div className="container-shell"><SectionHeading title="Recent transformations" eyebrow="Projects" /><div className="mt-10 grid gap-6 lg:grid-cols-3">{projectItems.map((project) => <ProjectCard key={project.title} project={project} />)}</div></div></section></>; }
