import AdsBanner from "../components/Home/AdsBanner";


import BestCard from "../components/Home/BestCard";
import BestMedicalServices from "../components/Home/BestMedicalServices";
import HealthCalculators from "../components/Home/Calculators/HealthCalculators";
import CallToActionBanner from "../components/Home/CallToActionBanner";
import ContactSection from "../components/Home/ContactSection";
import Countdown from "../components/Home/Countdown";
import DownloadApp from "../components/Home/DownloadApp";

import FaqSection from "../components/Home/FaqSection";

import GreatDoctors from "../components/Home/GreatDoctors";
import HealthPackages from "../components/Home/HealthPackages";
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
import InsurancePartners from "../components/Home/InsurancePartners";

const Home = () => {
  return (
    <>
      <InfiniteScrollBar />
      <HeroSection />
      <OurSpecialService />
      <AboutSection />
      <BestCard />

      <OurServices />
      <AdsBanner />
      <GreatDoctors />
      <Countdown />
      <HealthPackages />

      <WhyChooseUs />
      <BestMedicalServices />
      <FaqSection />

      <HealthCalculators />


      <WebsiteShowcase />
      <DownloadApp />
      <Articles />

      <CallToActionBanner />
      <Testimonial />
      <InsurancePartners />
      <OurLocation />
      <ContactSection />
    </>
  );
};

export default Home;
