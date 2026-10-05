import { Hero } from '@/components/home/Hero';
import { About } from '@/components/home/About';
import { Contact } from '@/components/home/Contact';
import { Reveal } from '@/components/Reveal';
import { Eyebrow, Panel, SectionTitle } from '@/components/ui';
import { ProjectCard } from '@/components/ProjectCard';
import { getFeaturedProjects } from '@/lib/queries';
import { site } from '@/lib/site';

/* داده‌ها استاتیک‌اند، پس صفحه در زمان بیلد یک‌بار ساخته می‌شود */
export default function HomePage() {
  const projects = getFeaturedProjects(6);

  /* داده‌های ساخت‌یافته برای گوگل */
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: site.role,
    email: site.email,
    telephone: site.phone,
    url: site.url,
    address: { '@type': 'PostalAddress', addressLocality: 'مشهد', addressCountry: 'IR' },
    sameAs: [site.github, site.linkedin].filter(Boolean),
  };

  return (
    <>

      <main id="main">
        <Hero />
        <About />

        {/* نمونه‌کارها — کارت‌ها به سایت واقعی لینک می‌شوند */}
        {projects.length > 0 && (
          <section id="projects" className="scroll-mt-28 px-4 py-6 sm:px-6">
            <Reveal className="mx-auto max-w-[1140px]">
              <Panel>
                <Eyebrow>کارهای منتخب</Eyebrow>
                <SectionTitle>نمونه‌کارها</SectionTitle>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {projects.map((p) => (
                    <ProjectCard key={p.slug} project={p} />
                  ))}
                </div>
              </Panel>
            </Reveal>
          </section>
        )}

        <Contact />
      </main>


      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </>
  );
}
