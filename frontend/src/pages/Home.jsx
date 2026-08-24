import BestCard from "../components/Home/BestCard";
import BestMedicalServices from "../components/Home/BestMedicalServices";
import HealthCalculators from "../components/Home/Calculators/HealthCalculators";
import CallToActionBanner from "../components/Home/CallToActionBanner";
import ContactSection from "../components/Home/ContactSection";
import Countdown from "../components/Home/Countdown";
import DownloadApp from "../components/Home/DownloadApp";
import FaqSection from "../components/Home/FaqSection";
import HeroSection from "../components/Home/HeroSection";
import InfiniteScrollBar from "../components/Home/InfiniteScrollBar";
import OurLocation from "../components/Home/OurLocation";
import OurServices from "../components/Home/Services/OurServices";
import OurSpecialService from "../components/Home/OurSpecialService";
import AboutSection from "../components/Home/AboutSection";
import WebsiteShowcase from "../components/Home/WebsiteShowcase";
import Testimonial from "../components/Home/Testimonial";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import Articles from "../components/Home/Articles";
import MetaHead from "../components/SEO/MetaHead";
import SEOKeywordIsland from "../components/SEO/SEOKeywordIsland";

const Home = () => {
  return (
    <>
      <MetaHead
        title="Sehaat Saathi | India's #1 AI Healthcare Platform & Instant OPD Booking"
        description="Sehaat Saathi (Sehat Sathi) is India's premier AI-powered healthcare platform. Book instant hospital OPD token passes, consult top specialist doctors, track live bed availability, book emergency 24/7 ambulances, and receive AI-driven diagnosis across India. Founded by Abhishek Kumar."
        keywords="Sehaat Saathi, Sehat Sathi, Sehaat Sathi, Sehat Saathi, SehaatSaathi, SehatSathi, Sehhat Sathi, Sehhat Saathi, Sehaat Saathi App, Sehat Sathi App, Sehaat Saathi Healthcare Platform, Sehaat Saathi HealthCarePlatform, Sehaat Saathi Bihar, Sehaat Saathi India, Sehaat Saathi Founder, Abhishek Kumar Sehaat Saathi, Sehaat Saathi OPD Booking, Sehaat Saathi Doctor Booking, Sehaat Saathi Hospital, Sehaat Saathi Ambulance, Sehaat Saathi Blood Bank, Sehaat Saathi Gigs, Online Doctor Consultation India, Best Health App India, AI Doctor Assistant, Digital OPD Pass Bihar, TechSeva IT Solutions"
        canonicalUrl="https://sehaatsaathi.com/"
      />
      <SEOKeywordIsland />
      <InfiniteScrollBar />
      <HeroSection />
      <OurSpecialService />
      <AboutSection />
      <BestCard />

      <OurServices />
      <Countdown />

      <WhyChooseUs />
      <BestMedicalServices />
      <FaqSection />

      <HealthCalculators />

      <WebsiteShowcase />
      <DownloadApp />
      <Articles />

      <CallToActionBanner />
      <Testimonial />
      <OurLocation />
      <ContactSection />
    </>
  );
};

export default Home;
