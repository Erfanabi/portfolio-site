import Link from 'next/link';
import Image from 'next/image';
import { Tag } from '@/components/ui';
import { faDate, faNum, parseList } from '@/lib/utils';

type PostCardData = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string | null;
  readMinutes: number;
  tags: string;
  publishedAt: Date | null;
  createdAt?: Date;
};

export function PostCard({ post }: { post: PostCardData }) {
  const tags = parseList(post.tags).slice(0, 3);
  const date = post.publishedAt ?? post.createdAt ?? null;

  return (
    <article className="glass-soft group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-md)] transition-all duration-300 hover:-translate-y-1 hover:border-brand/35 focus-within:border-brand/50">
      {post.coverImage ? (
        <div className="relative aspect-[16/9] overflow-hidden bg-brand-soft">
          <Image
            src={post.coverImage}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      ) : (
        <div
          aria-hidden
          className="grid aspect-[16/9] place-items-center bg-gradient-to-br from-brand-soft to-transparent text-3xl text-brand/40"
        >
          ✦
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        {tags.length > 0 && (
          <ul className="mb-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>
        )}

        <h3 className="text-[1rem] font-bold leading-7 text-ink">
          {/* کل کارت کلیک‌پذیر است، ولی فقط عنوان لینک واقعی است
              تا صفحه‌خوان یک لینک معنادار اعلام کند */}
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-brand">
            <span className="absolute inset-0 z-10" aria-hidden />
            {post.title}
          </Link>
        </h3>

        <p className="mt-2.5 line-clamp-3 text-[0.85rem] leading-7 text-muted">{post.excerpt}</p>

        <p className="num mt-auto flex items-center gap-2 pt-4 text-[0.7rem] text-muted">
          {date && <time dateTime={new Date(date).toISOString()}>{faDate(date)}</time>}
          <span aria-hidden>·</span>
          <span>{faNum(post.readMinutes)} دقیقه مطالعه</span>
        </p>
      </div>
    </article>
  );
}
