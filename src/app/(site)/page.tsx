import { Hero } from '@/components/home/Hero';
import { About, Services } from '@/components/home/AboutServices';
import { Automation } from '@/components/home/Automation';
import { Tech } from '@/components/home/Tech';
import { Education, Impact, Timeline } from '@/components/home/Timeline';
import { Contact } from '@/components/home/Contact';
import { Reveal } from '@/components/Reveal';
import { Arrow, ButtonLink, Eyebrow, Panel, SectionTitle } from '@/components/ui';
import { PostCard } from '@/components/PostCard';
import { ProjectCard } from '@/components/ProjectCard';
import { getFeaturedPosts, getFeaturedProjects } from '@/lib/queries';
import { site } from '@/lib/site';

/* صفحهٔ اصلی هر ساعت بازسازی می‌شود، پس مقالهٔ تازه خودش ظاهر می‌شود */
export const revalidate = 3600;

export default async function HomePage() {
  const [projects, posts] = await Promise.all([getFeaturedProjects(3), getFeaturedPosts(3)]);

  /* داده‌های ساخت‌یافته برای گوگل */
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: site.role,
    email: site.email,
    url: site.url,
    address: { '@type': 'PostalAddress', addressLocality: 'مشهد', addressCountry: 'IR' },
    sameAs: [site.github, site.linkedin],
  };

  return (
    <>

      <main id="main">
        <Hero />
        <About />
        <Services />
        <Automation />

        {/* نمونه‌کارهای شاخص */}
        {projects.length > 0 && (
          <section className="px-4 py-8 sm:px-6">
            <Reveal className="mx-auto max-w-[1140px]">
              <Panel>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <Eyebrow>کارهای منتخب</Eyebrow>
                    <SectionTitle>نمونه‌کارها</SectionTitle>
                  </div>
                  <ButtonLink href="/projects" variant="light" size="sm">
                    همهٔ نمونه‌کارها <Arrow />
                  </ButtonLink>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {projects.map((p) => (
                    <ProjectCard key={p.slug} project={p} />
                  ))}
                </div>
              </Panel>
            </Reveal>
          </section>
        )}

        <Tech />
        <Timeline />
        <Impact />

        {/* تازه‌های بلاگ */}
        {posts.length > 0 && (
          <section className="px-4 py-8 sm:px-6">
            <Reveal className="mx-auto max-w-[1140px]">
              <Panel>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <Eyebrow>یادداشت‌ها</Eyebrow>
                    <SectionTitle>تازه‌های بلاگ</SectionTitle>
                  </div>
                  <ButtonLink href="/blog" variant="light" size="sm">
                    همهٔ مقاله‌ها <Arrow />
                  </ButtonLink>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {posts.map((p) => (
                    <PostCard key={p.slug} post={p} />
                  ))}
                </div>
              </Panel>
            </Reveal>
          </section>
        )}

        <Education />
        <Contact />
      </main>


      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </>
  );
}
