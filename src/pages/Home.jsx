import Navigation from './../components/universal/Navigation';
import HeroSection from './../components/homepage/HeroSection';
import FeaturesSection from './../components/homepage/FeaturesSection';
import ProcessSection from './../components/homepage/ProcessSection';
import StatsSection from './../components/homepage/StatsSection';
import TestimonialsSection from './../components/homepage/TestimonialsSection';
import CTASection from './../components/homepage/CTASection';
import ScrollToTop from './../components/universal/ScrollToTop';

const LandingPage = () => (
    <div className="min-h-screen bg-white">
        <Navigation />
        <HeroSection />
        <FeaturesSection />
        <ProcessSection />
        <StatsSection />
        <TestimonialsSection />
        <CTASection />
        <ScrollToTop />
    </div>
);

export default LandingPage;