import { setRequestLocale } from 'next-intl/server';
import { HeroSection } from '../../components/heroSection';
import { AboutSection } from '../../components/aboutSection';
import { ProjectSection } from '../../components/projectSection';
import { TeamSection } from '../../components/teamSection';
import { ContactSection } from '../../components/contactSection';
import { Footer } from '../../components/footer';
import { RevealOnScroll } from '../../components/revealOnScroll';
import AboutStyles from '../../css/css_components/aboutSection.module.css';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LocalePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <RevealOnScroll>
        <HeroSection />
      </RevealOnScroll>
      <RevealOnScroll inViewClassName={AboutStyles.in_view}>
        <AboutSection />
      </RevealOnScroll>
      <RevealOnScroll>
        <ProjectSection />
      </RevealOnScroll>
      <RevealOnScroll>
        <TeamSection />
      </RevealOnScroll>
      <RevealOnScroll>
        <ContactSection />
      </RevealOnScroll>
      <Footer />
    </div>
  );
}
