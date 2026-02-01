import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import aboutUsHero from "../assets/images/About.png";
import bgImg from "../assets/images/bgImg.png";
import AboutChairman from "../components/AboutUs/AboutChairman";
import AboutDC from "../components/AboutUs/AboutDC";
import AboutManagementTeam from "../components/AboutUs/AboutManagementTeam";
import AboutMD from "../components/AboutUs/AboutMD";

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("aboutDC");

  const features = [
    "AI-Powered Virtual Doctor Chatbot",
    "AI Symptom Checker & Instant Diagnosis",
    "Medicine Suggestions & First-Aid Guidance",
    "Emergency Ambulance Booking",
    "Instant Video Call Doctor Consultation",
    "Offline Doctor Slot Booking (All Specialties)",
    "Medicine Ordering & Lab Test Booking",
    "Health Records & Reminders",
  ];

  const tabs = [
    { id: "aboutDC", label: "Diagnostic Center" },
    { id: "aboutChairman", label: "Chairman's Message" },
    { id: "aboutMD", label: "MD's Message" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "aboutDC": return <AboutDC />;
      case "aboutChairman": return <AboutChairman />;
      case "aboutMD": return <AboutMD />;
      default: return <AboutDC />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24">
      {/* Premium Hero Section */}
      <section className="container mx-auto px-6 lg:px-16 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <div>
              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8 tracking-tighter">
                Discover <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2eb8a6] to-[#1d7a6e]">Sehaat Saathi</span>
              </h1>
              <p className="text-gray-600 text-xl leading-relaxed">
                Sehaatsaathi is an AI-powered virtual health assistant designed for remote consultations, emergency healthcare, and personalized treatment.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl border border-teal-100 p-8 rounded-[40px] shadow-sm">
              <p className="text-[#1d7a6e] font-black text-2xl mb-6">Our Mission</p>
              <p className="text-gray-700 font-medium text-lg leading-relaxed">
                To provide quality, affordable, and accessible healthcare services to every individual through cutting-edge AI technology and compassionate care.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <FaCheckCircle className="text-[#2eb8a6] text-xl flex-shrink-0" />
                  <span className="text-gray-700 font-bold text-sm tracking-tight">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group animate-in fade-in slide-in-from-right duration-700">
            <div className="absolute -inset-6 bg-teal-100/50 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity animate-pulse"></div>
            <div className="relative rounded-[60px] overflow-hidden shadow-2xl border-[12px] border-white ring-1 ring-gray-100">
              <img src={aboutUsHero} alt="About Sehaat Saathi" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* Modern Tabs Section */}
      <section className="container mx-auto px-6 lg:px-16 mt-12">
        <div className="bg-white/80 backdrop-blur-2xl rounded-[60px] p-8 lg:p-14 shadow-2xl border border-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: `url(${bgImg})` }}></div>

          <div className="flex flex-wrap justify-center gap-4 mb-16 relative z-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all duration-500 shadow-sm ${activeTab === tab.id
                  ? "bg-gradient-to-r from-[#2eb8a6] to-[#1d7a6e] text-white shadow-teal-200 scale-105"
                  : "bg-white text-gray-400 border border-gray-100 hover:border-teal-200 hover:text-teal-600"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative z-10 animate-in fade-in zoom-in-95 duration-500 min-h-[400px]">
            {renderTabContent()}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
