import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { ProblemSolution } from '@/components/ProblemSolution';
import { HowItWorks } from '@/components/HowItWorks';
import { RolesSection } from '@/components/RolesSection';
import { EcosystemSection } from '@/components/EcosystemSection';
import { Testimonials } from '@/components/Testimonials';
import { Resources } from '@/components/Resources';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] relative">
      <Navigation />
      <HeroSection />
      
      {/* Dashboard Preview */}
      <div className="py-16 bg-gradient-to-br from-[#151922] to-[#0f1218] border-y border-[#f9f4e1]/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-lora text-[#f9f4e1] text-3xl font-semibold mb-4">
            Experience the Full Platform
          </h2>
          <p className="text-[#f9f4e1]/70 mb-8 max-w-2xl mx-auto">
            See how creators, fans, and freelancers interact in our comprehensive dashboard. 
            Complete with onboarding flows, reward management, and real-time analytics.
          </p>
          <Link 
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
          >
            View Dashboard Demo
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
      
      <ProblemSolution />
      <HowItWorks />
      <RolesSection />
      <EcosystemSection />
      <Testimonials />
      <Resources />
      <Footer />
      <ScrollToTop />
    </div>
  );
}