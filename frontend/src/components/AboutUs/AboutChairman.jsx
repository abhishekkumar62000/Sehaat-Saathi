import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaLinkedin, FaGlobe, FaRocket, FaInstagram, FaFacebook, FaGithub,
  FaCheckCircle, FaQuoteLeft, FaHospital, FaVideo, FaAmbulance, 
  FaTint, FaBed, FaPills, FaHome, FaRobot, FaPhoneAlt, FaLaptopCode, FaHeartbeat
} from "react-icons/fa";
import { BsArrowRight, BsStars, BsShieldCheck } from "react-icons/bs";
import founderImg from "../../assets/images/about/Founder.png";

const AboutChairman = () => {
  const [activeTab, setActiveTab] = useState("vision");

  const corePillars = [
    {
      id: "opd",
      icon: <FaHospital className="text-2xl text-emerald-500" />,
      title: "Offline Doctor Booking & OPD Token Pass",
      shortDesc: "Bina kisi lambi line me khade hue, Sadar Hospital aur private clinics me direct OPD token pass payein. Saves 2 to 4 hours per visit with zero waiting.",
      actionUrl: "/offline-consultation",
      badge: "Zero Queue Waiting",
      badgeColor: "bg-emerald-100 text-emerald-800"
    },
    {
      id: "video",
      icon: <FaVideo className="text-2xl text-indigo-500" />,
      title: "Online Doctor Video Calling (Telemedicine)",
      shortDesc: "Ghar baithe 5 minute ke andar top specialist doctors se Google Meet, Zoom ya WhatsApp par video consult karein with digital e-prescription.",
      actionUrl: "/online-video-booking",
      badge: "Instant in 5 Mins",
      badgeColor: "bg-indigo-100 text-indigo-800"
    },
    {
      id: "ambulance",
      icon: <FaAmbulance className="text-2xl text-rose-500" />,
      title: "24/7 Rapid Emergency Ambulance Booking",
      shortDesc: "BLS, ALS, Portable ICU Ventilator aur Oxygen ambulances ka 2-minute instant dispatch network across Bihar highways & rural roads.",
      actionUrl: "/ambulance",
      badge: "2-Min SOS Dispatch",
      badgeColor: "bg-rose-100 text-rose-800"
    },
    {
      id: "blood",
      icon: <FaTint className="text-2xl text-red-500" />,
      title: "Live Blood Bank & Donor Network",
      shortDesc: "Sabhi 8 blood groups, Rare Bombay blood, Platelets (SDP/RDP), aur FFP ki 24/7 real-time verified coordination without hassle.",
      actionUrl: "/blood-bank-hub",
      badge: "24/7 Verified Supply",
      badgeColor: "bg-red-100 text-red-800"
    },
    {
      id: "icu",
      icon: <FaBed className="text-2xl text-blue-500" />,
      title: "Real-Time ICU Bed & Ventilator Tracker",
      shortDesc: "Bihar ke leading hospitals me ICU beds, Oxygen beds, aur Ventilators ki live availability status ek click par check karein.",
      actionUrl: "/hospital-availability",
      badge: "Live Bed Tracking",
      badgeColor: "bg-blue-100 text-blue-800"
    },
    {
      id: "pharmacy",
      icon: <FaPills className="text-2xl text-purple-500" />,
      title: "Pharmacy Hub & Medicine Price Compare",
      shortDesc: "Branded vs. Generic medicines ke prices compare karein aur 70% tak savings ke sath doorstep medicine delivery payein.",
      actionUrl: "/medicine-price-compare",
      badge: "Save Up to 70%",
      badgeColor: "bg-purple-100 text-purple-800"
    },
    {
      id: "homecare",
      icon: <FaHome className="text-2xl text-amber-500" />,
      title: "Home Healthcare & Nursing Visits",
      shortDesc: "Elderly care, dressing, saline drip, ECG, physiotherapy aur lab test blood collection seedhe apne ghar par book karein.",
      actionUrl: "/home-healthcare",
      badge: "Doorstep Care",
      badgeColor: "bg-amber-100 text-amber-800"
    },
    {
      id: "ai",
      icon: <FaRobot className="text-2xl text-teal-500" />,
      title: "AI Health Sentinel & Multilingual Chatbot",
      shortDesc: "Hindi, Maithili, Bhojpuri aur English me instant AI symptom analysis, first-aid advice, aur personalized health risk assessment.",
      actionUrl: "/doctor-ai",
      badge: "Multilingual AI",
      badgeColor: "bg-teal-100 text-teal-800"
    }
  ];

  return (
    <section 
      itemScope 
      itemType="https://schema.org/Person"
      className="animate-in fade-in zoom-in duration-700 max-w-6xl mx-auto space-y-12"
    >
      {/* Header Banner */}
      <div className="text-center">
        <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-[#138808] bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200 shadow-sm">
          <BsStars className="text-amber-500 animate-spin" /> Leadership &amp; Innovation Vision
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mt-4 tracking-tighter uppercase">
          Chairman &amp; Founder&apos;s <span className="text-[#FF9933]">Vision</span> &amp; <span className="text-[#138808]">Mission</span>
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto mt-3 leading-relaxed">
          &ldquo;Humara mission hai ki Bharat ke har gaon aur sheher tak AI-powered, affordable aur bina line wali elite healthcare services pahunche.&rdquo;
        </p>
      </div>

      {/* === FOUNDER HERO SPOTLIGHT CARD === */}
      <div className="bg-gradient-to-br from-slate-950 via-[#0B132B] to-slate-900 p-6 sm:p-10 rounded-[2.5rem] border border-indigo-500/30 text-white shadow-2xl relative overflow-hidden">
        {/* Background glow orb */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/15 via-emerald-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Avatar / Photo */}
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <div className="relative group inline-block">
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#FF9933] via-white to-[#138808] rounded-full blur-xl opacity-60 group-hover:opacity-90 transition-opacity"></div>
              <img
                className="relative mx-auto rounded-full shadow-2xl w-48 sm:w-56 border-4 border-white/90 object-cover aspect-square transform group-hover:scale-105 transition-transform duration-500"
                src={founderImg}
                alt="Abhishek Kumar - Founder & CEO Sehaat Saathi"
                itemProp="image"
                loading="lazy"
              />
              <div className="absolute bottom-2 right-3 w-12 h-12 bg-gradient-to-tr from-amber-500 to-emerald-500 rounded-full flex items-center justify-center text-white shadow-xl border-2 border-white">
                <span className="text-sm font-black">AK</span>
              </div>
            </div>

            <div className="mt-5">
              <h3 itemProp="name" className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Abhishek Kumar
              </h3>
              <p itemProp="jobTitle" className="text-xs text-amber-400 font-bold uppercase tracking-widest mt-1">
                Founder &amp; CEO — Sehaat Saathi App
              </p>
              <p className="text-xs text-indigo-300 font-semibold mt-1">
                Founder — TechSeva IT Solutions
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                AI/ML Engineer · Entrepreneur · Multiple Startup Founder
              </p>
            </div>
          </div>

          {/* Details & Ventures Showcase */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-wider">
                  🏆 Visionary Leadership
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black uppercase tracking-wider">
                  ⚡ AI &amp; Software Innovator
                </span>
              </div>

              <h4 className="text-xl sm:text-2xl font-black text-white leading-snug">
                Pioneering Next-Gen HealthTech &amp; Enterprise Software from Bihar to Global Horizon
              </h4>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
                <strong>Abhishek Kumar</strong> is an AI/ML Engineer, serial entrepreneur, and the visionary founder behind <strong>Sehaat Saathi App</strong> and <strong>TechSeva IT Solutions</strong>. Born with a drive to solve grassroots healthcare problems in Bihar, he engineered Sehaat Saathi to bridge the rural-urban medical divide using cutting-edge AI, digital OPD queues, and 24/7 rapid emergency dispatch systems.
              </p>
            </div>

            {/* Dual Venture Mini-Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm hover:border-emerald-500/50 transition-all">
                <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm mb-1">
                  <FaHeartbeat className="text-lg" />
                  <span>Sehaat Saathi App</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  India&apos;s #1 AI Healthcare platform for offline doctor booking, 5-min video calls, ambulances, blood bank &amp; pharmacy hubs.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm hover:border-blue-500/50 transition-all">
                <div className="flex items-center gap-2.5 text-blue-400 font-bold text-sm mb-1">
                  <FaLaptopCode className="text-lg" />
                  <span>TechSeva IT Solutions</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Full-cycle software development &amp; IT agency providing custom AI/ML systems, cloud architectures, mobile &amp; web apps for enterprises worldwide.
                </p>
              </div>
            </div>

            {/* Interactive Verified Links */}
            <div className="pt-4 border-t border-white/10">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-3">
                Official Profiles &amp; Direct Portals
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="https://www.linkedin.com/in/abhishek-kumar-807853375/"
                  target="_blank"
                  rel="noreferrer"
                  itemProp="sameAs"
                  className="flex items-center gap-2 px-3.5 py-2 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white rounded-xl border border-blue-400/30 text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  <FaLinkedin className="text-sm text-blue-400 group-hover:text-white" />
                  <span>LinkedIn Profile</span>
                </a>
                <a
                  href="https://github.com/abhishekkumar62000"
                  target="_blank"
                  rel="noreferrer"
                  itemProp="sameAs"
                  className="flex items-center gap-2 px-3.5 py-2 bg-slate-700/40 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl border border-slate-500/30 text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  <FaGithub className="text-sm text-slate-300 group-hover:text-white" />
                  <span>GitHub (@abhishekkumar62000)</span>
                </a>
                <a
                  href="https://abhi-yadav.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  itemProp="url"
                  className="flex items-center gap-2 px-3.5 py-2 bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white rounded-xl border border-purple-400/30 text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  <FaGlobe className="text-sm text-purple-400 group-hover:text-white" />
                  <span>Founder Portfolio</span>
                </a>
                <a
                  href="https://techseva-it-solutions.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-xl border border-emerald-400/30 text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  <FaRocket className="text-sm text-emerald-400 group-hover:text-white" />
                  <span>TechSeva IT Solutions Agency</span>
                </a>
                <a
                  href="https://www.instagram.com/developer__abhiii/"
                  target="_blank"
                  rel="noreferrer"
                  itemProp="sameAs"
                  className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 hover:from-purple-600 hover:to-pink-600 text-pink-300 hover:text-white rounded-xl border border-pink-400/30 text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  <FaInstagram className="text-sm text-pink-400 group-hover:text-white" />
                  <span>Founder Insta (@developer__abhiii)</span>
                </a>
                <a
                  href="https://www.instagram.com/sehaatsaathi/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white rounded-xl border border-rose-400/30 text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  <FaInstagram className="text-sm text-rose-400 group-hover:text-white" />
                  <span>Sehaat Saathi Official</span>
                </a>
                <a
                  href="https://www.facebook.com/people/Sehaat-Saathi-Healthcare-Platform/61592724564675/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 bg-blue-700/20 hover:bg-blue-700 text-blue-200 hover:text-white rounded-xl border border-blue-500/30 text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  <FaFacebook className="text-sm text-blue-400 group-hover:text-white" />
                  <span>Facebook Page</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === 8 CORE INNOVATIVE PILLARS OF SEHAAT SAATHI APP === */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-[#FF9933] bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
            Platform Capabilities
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
            How <span className="text-[#FF9933]">Sehaat</span> <span className="text-[#138808]">Saathi</span> Solves Every Healthcare Need
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            Humne har ek medical emergency aur daily health requirement ke liye dedicated digital solution banaya hai:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {corePillars.map((pillar) => (
            <div 
              key={pillar.id}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${pillar.badgeColor}`}>
                    {pillar.badge}
                  </span>
                </div>
                <h4 className="text-base font-black text-slate-900 leading-snug mb-2 group-hover:text-[#138808] transition-colors">
                  {pillar.title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {pillar.shortDesc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100">
                <Link
                  to={pillar.actionUrl}
                  className="inline-flex items-center gap-1.5 text-xs font-black text-slate-800 hover:text-[#138808] transition-colors"
                >
                  <span>Explore Service</span>
                  <BsArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === CHAIRMAN'S DETAILED ADDRESS IN EASY LANGUAGE === */}
      <div className="bg-white rounded-[2.5rem] p-6 sm:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
        <FaQuoteLeft className="text-6xl text-emerald-100/60 absolute top-8 left-8 -z-0" />
        <div className="relative z-10 space-y-6 text-gray-700 leading-relaxed">
          <p className="text-lg sm:text-xl font-bold italic text-slate-900 border-l-4 border-[#138808] pl-5 py-1">
            &ldquo;Mera sapna hai ki Bihar aur poore desh me kisi bhi mareez ko ilaaj ke liye line me na lagna pade aur emergency me har second ka sahi upayog ho.&rdquo;
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base">
            <div className="space-y-4">
              <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <FaCheckCircle className="text-[#FF9933]" />
                <span>Kyun Banaya Gaya Sehaat Saathi?</span>
              </h4>
              <p className="text-justify text-gray-600 leading-relaxed">
                Bihar ke gaon aur chhote shehron me jab koi bimaar padta hai, toh use hospital pahunchkar ghanto lambi OPD lines me khada hona padta hai. Emergency me ambulance ka pata nahi chalta aur khoon (blood) ke liye log yahan-wahan bhatakte hain.
              </p>
              <p className="text-justify text-gray-600 leading-relaxed">
                Is samasya ko jadd se khatam karne ke liye humne <strong>Sehaat Saathi App</strong> banaya — jahan smartphone se seedhe hospital ka <strong>OPD Token Pass</strong> mil jata hai aur ambulance 2 minute me dispatch hoti hai.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <FaRocket className="text-[#138808]" />
                <span>TechSeva IT Solutions ka Role</span>
              </h4>
              <p className="text-justify text-gray-600 leading-relaxed">
                <strong>TechSeva IT Solutions</strong> humari full-fledged software engineering aur IT agency hai jo advanced AI models, scalable mobile apps, aur enterprise web systems develop karti hai.
              </p>
              <p className="text-justify text-gray-600 leading-relaxed">
                TechSeva ki world-class technical expertise ke dam par hi Sehaat Saathi ka architecture itna fast, secure, aur 24/7 reliable ban paya hai.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-2xl font-black text-gray-900 tracking-tight">Abhishek Kumar</p>
              <p className="text-xs font-black text-[#138808] uppercase tracking-[0.25em] mt-0.5">
                Founder &amp; CEO — Sehaat Saathi App
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Founder — TechSeva IT Solutions · AI/ML Engineer
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="tel:+916200087830"
                className="flex items-center gap-2 text-xs font-black text-white bg-slate-900 hover:bg-[#138808] px-4 py-2.5 rounded-xl transition-all shadow-md"
              >
                <FaPhoneAlt className="text-amber-400" />
                <span>Direct Helpline: +91 6200087830</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutChairman;
