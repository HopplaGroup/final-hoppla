import HeroSection from "./_components/HeroSection";
import HowItWorks from "./_components/HowItWorksSection";
import PartnersSection from "./_components/PartnersSection";
import TestimonialsSection from "./_components/TestimonialsSection";
import UpcomingRidesSection from "./_components/UpcomingRidesSection";

export default function Home() {
    return (
        <>
            <HeroSection />
            <UpcomingRidesSection />
            <HowItWorks />
            <TestimonialsSection />
            <PartnersSection />
            <div className="mb-20"></div>
        </>
    );
}
