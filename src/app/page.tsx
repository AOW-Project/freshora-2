import HeroSection from '@/component/HeroSection';
import LaundryExperience from '@/component/LaundryExperience';
import HowWeWorkSection from '@/component/HowweWork';
import LaundryService from '@/component/LaundryService';
import HomepagePricingCards from '@/component/HomePagePricingCard';
import HomepagePricePackages from '@/component/HomepagePricePackages';
import TestimonialsSection from '@/component/TestimonialsSection'; 
import HomepageServices from '@/component/HomepageService';
import MapSection from '@/component/map-section';


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LaundryExperience />
      <HowWeWorkSection />
      <LaundryService />
      <HomepageServices />
      <HomepagePricingCards />
      <TestimonialsSection />
      <HomepagePricePackages />
      <MapSection/>
    </>
  );
}