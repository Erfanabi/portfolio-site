import { Badge } from '@/components/ui';
import { categoryLabel } from '@/lib/site';

type ProjectCardData = {
  slug: string;
  title: string;
  summary: string;
  coverImage?: string | null;
  category: string;
  stack: string;
  year?: string | null;
  liveUrl?: string | null;
  repoUrl?: string | null;
};

export function ProjectCard({ project }: { project: ProjectCardData }) {
  const href = project.liveUrl || project.repoUrl || null;

  return (
    <article className="glass-soft group relative flex h-full flex-col gap-2 rounded-[var(--radius-md)] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/35 focus-within:border-brand/50">
      <div className="flex items-center gap-2">
        <Badge tone="brand">{categoryLabel(project.category)}</Badge>
        {project.year && <span className="num text-[0.7rem] text-muted">{project.year}</span>}
      </div>

      <h3 className="text-[0.95rem] font-bold leading-6 text-ink">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-brand"
          >
            <span className="absolute inset-0 z-10" aria-hidden />
            {project.title}
            <span className="sr-only"> — باز کردن در زبانهٔ تازه</span>
          </a>
        ) : (
          project.title
        )}
      </h3>

      <p className="line-clamp-2 text-[0.8rem] leading-6 text-muted">{project.summary}</p>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
        {href && (
          <span className="text-[0.72rem] font-semibold text-brand">
            مشاهدهٔ سایت <span aria-hidden>↗</span>
          </span>
        )}
      </div>
    </article>
  );
}
