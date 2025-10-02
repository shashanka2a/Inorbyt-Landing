import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { ProblemSolution } from '@/components/ProblemSolution';
import { HowItWorks } from '@/components/HowItWorks';
import { FeaturesCards } from '@/components/FeaturesCards';
import { TokensShowcase } from '@/components/TokensShowcase';
import { Testimonials } from '@/components/Testimonials';
import { Resources } from '@/components/Resources';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] relative">
      <Navigation />
      <HeroSection />
      <ProblemSolution />
      <HowItWorks />
      <FeaturesCards />
      <TokensShowcase />
      <Testimonials />
      <Resources />
      <Footer />
      <ScrollToTop />
    </div>
  );
}