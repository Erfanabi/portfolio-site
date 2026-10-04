import { about } from "@/lib/site";
import { Eyebrow, Panel, SectionTitle } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-28 px-4 py-6 sm:px-6">
      <Reveal className="mx-auto max-w-[1140px]">
        <Panel>
          <Eyebrow>دربارهٔ من</Eyebrow>
          <SectionTitle>مهندسی با دقت، ساختن با هدف</SectionTitle>

          {/* روایت اصلی */}
          <div className="mt-4">
            {about.intro.map((para) => (
              <p
                key={para}
                className="mt-3 text-[0.95rem] leading-8 text-ink-2 first:mt-0"
              >
                {para}
              </p>
            ))}
          </div>
        </Panel>
      </Reveal>
    </section>
  );
}
