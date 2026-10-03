import Link from 'next/link';
import Image from 'next/image';
import { Badge, Tag } from '@/components/ui';
import { categoryLabel } from '@/lib/site';
import { parseList } from '@/lib/utils';

type ProjectCardData = {
  slug: string;
  title: string;
  summary: string;
  coverImage?: string | null;
  category: string;
  stack: string;
  year?: string | null;
  client?: string | null;
  featured?: boolean;
};

export function ProjectCard({ project }: { project: ProjectCardData }) {
  const stack = parseList(project.stack).slice(0, 4);

  return (
    <article className="glass-soft group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-md)] transition-all duration-300 hover:-translate-y-1 hover:border-brand/35 focus-within:border-brand/50">
      {project.coverImage ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-brand-soft">
          <Image
            src={project.coverImage}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      ) : (
        <div
          aria-hidden
          className="grid aspect-[16/10] place-items-center bg-gradient-to-br from-brand-soft to-transparent text-3xl text-brand/40"
        >
          ◫
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge tone="brand">{categoryLabel(project.category)}</Badge>
          {project.featured && <Badge tone="warning">شاخص</Badge>}
          {project.year && <span className="num text-[0.7rem] text-muted">{project.year}</span>}
        </div>

        <h3 className="text-[1rem] font-bold leading-7 text-ink">
          <Link href={`/projects/${project.slug}`} className="transition-colors hover:text-brand">
            <span className="absolute inset-0 z-10" aria-hidden />
            {project.title}
          </Link>
        </h3>

        {project.client && (
          <p className="mt-1 text-[0.75rem] text-muted">کارفرما: {project.client}</p>
        )}

        <p className="mt-2.5 line-clamp-3 text-[0.85rem] leading-7 text-muted">
          {project.summary}
        </p>

        {stack.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {stack.map((item) => (
              <li key={item}>
                <Tag>{item}</Tag>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
