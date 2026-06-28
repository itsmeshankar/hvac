import type { Project } from "@/types/content";

export function ProjectCard({ project }: { project: Project }) {
  return <article className="overflow-hidden rounded-brand border border-graphite-100 bg-white shadow-sm"><div className="grid sm:grid-cols-2"><Panel label="Before" text={project.before} image={project.beforeImage} muted /><Panel label="After" text={project.after} image={project.afterImage} /></div><div className="p-6"><p className="text-sm font-bold text-orange-600">{project.service} in {project.location}</p><h3 className="mt-2 text-xl font-bold text-navy-900">{project.title}</h3><p className="mt-3 text-sm leading-6 text-graphite-500">{project.summary}</p>{project.customerReview ? <p className="mt-4 rounded-brand bg-graphite-50 p-4 text-sm italic text-graphite-700">{project.customerReview}</p> : null}</div></article>;
}

function Panel({ label, text, image, muted = false }: { label: string; text: string; image?: string | null; muted?: boolean }) {
  if (image) {
    return <div className="relative min-h-56"><img src={image} alt={`${label}: ${text}`} className="h-full min-h-56 w-full object-cover" /><div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-navy-900">{label}</div></div>;
  }
  return <div className={muted ? "bg-graphite-100 p-6" : "bg-sky-100 p-6"}><p className={muted ? "text-xs font-bold uppercase tracking-[0.18em] text-graphite-500" : "text-xs font-bold uppercase tracking-[0.18em] text-sky-600"}>{label}</p><p className="mt-16 text-lg font-bold text-navy-900">{text}</p></div>;
}
