import {
  AiFillGithub,
  AiOutlineInstagram,
} from "react-icons/ai";
import { RiLinkedinBoxFill, RiBriefcase4Fill, RiGlobalLine } from "react-icons/ri";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const aboutLinks = [
  { path: "/", display: "Home" },
  { path: "/about", display: "About Us" },
  { path: "/work-with-us", display: "Work With Us" },
  { path: "/blog", display: "Our Blog" },
  { path: "/terms", display: "Terms & Conditions" },
];

const serviceLinks = [
  { path: "/search-terms", display: "Search Terms" },
  { path: "/advance-search", display: "Advance Search" },
  { path: "/privacy", display: "Privacy Policy" },
  { path: "/suppliers", display: "Suppliers" },
  { path: "/stores", display: "Our Stores" },
];

export const socialLinks = [
  {
    id: "01",
    path: "https://abhi-yadav.vercel.app/",
    icon: <RiBriefcase4Fill className="group-hover:text-red-600 w-7 h-7" />,
  },
  {
    id: "02",
    path: "https://techseva-it-solutions.vercel.app/",
    icon: <RiGlobalLine className="group-hover:text-blue-500 w-7 h-7" />,
  },
  {
    id: "03",
    path: "https://github.com/abhishekkumar62000",
    icon: <AiFillGithub className="group-hover:text-black w-7 h-7" />,
  },
  {
    id: "04",
    path: "https://www.instagram.com/developer__abhiii/",
    icon: <AiOutlineInstagram className="group-hover:text-pink-600 w-8 h-8" />,
  },
  {
    id: "05",
    path: "https://www.linkedin.com/in/abhishek-kumar-807853375/",
    icon: <RiLinkedinBoxFill className="group-hover:text-blue-600 w-8 h-8" />,
  },
];

const Footer = () => {
  return (
    <footer className="relative bg-white pt-24 pb-12 overflow-hidden">
      {/* Premium SVG Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[80px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-[#f0f9f9]"
          ></path>
        </svg>
      </div>

      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-[#f0f9f9]/50">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-200/20 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-100/30 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-50/40 rounded-full blur-[150px] animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Medical-Themed Decorative Shapes */}
      <div className="absolute top-20 left-10 opacity-10 animate-float">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-[#2eb8a6]">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
        </svg>
      </div>
      <div className="absolute bottom-40 right-20 opacity-10 animate-float-delayed">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="text-[#fca311]">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand & Mission with Shine Effect */}
          <div className="flex flex-col group">
            <h2 className="text-5xl font-black mb-10 flex items-center tracking-tighter transition-all duration-700 group-hover:tracking-normal group-hover:scale-105 origin-left">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#009E60] to-[#007F4D] relative overflow-hidden">
                Sehaat
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shine"></span>
              </span>
              <span className="text-[#FF8C00] ml-1">Saathi</span>
            </h2>

            <p className="text-gray-600 leading-relaxed text-[16px] mb-10 font-medium border-l-4 border-[#2eb8a6] pl-6 py-2 bg-white/30 rounded-r-xl">
              We are honored to be a part of your healthcare journey and committed to delivering <span className="text-[#2eb8a6] font-extrabold underline decoration-yellow-400/50 underline-offset-4">compassionate, personalized</span>, and Top-Notch Care Every step of the way.
            </p>

            <div className="relative group/tagline bg-gradient-to-br from-white/80 to-teal-50/50 p-6 rounded-3xl border border-white shadow-xl backdrop-blur-md transition-all duration-500 hover:shadow-teal-100/50 hover:-translate-y-2">
              <p className="text-gray-700 leading-relaxed text-[15px] font-semibold italic flex items-center gap-3">
                <span className="text-2xl">👩‍⚕️</span>
                Stay Healthy, Anytime, Anywhere!
              </p>
              <div className="absolute inset-0 bg-white/20 rounded-3xl -z-10 blur-xl opacity-0 group-hover/tagline:opacity-100 transition-opacity"></div>
            </div>
          </div>

          {/* About Us Links with Advanced Hover */}
          <div className="lg:pl-10">
            <h3 className="text-2xl font-black mb-10 text-gray-800 relative group/title inline-block">
              About Us
              <span className="absolute -bottom-3 left-0 w-16 h-1.5 bg-gradient-to-r from-[#2eb8a6] to-transparent rounded-full transition-all duration-500 group-hover/title:w-full"></span>
            </h3>
            <ul className="space-y-5">
              {aboutLinks.map((link) => (
                <li key={link.display}>
                  <Link
                    to={link.path}
                    className="group flex items-center text-[16px] font-[700] text-gray-500 hover:text-[#2eb8a6] transition-all duration-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#fca311] mr-0 opacity-0 transition-all duration-300 group-hover:mr-4 group-hover:opacity-100 group-hover:scale-125"></div>
                    <span className="relative overflow-hidden">
                      {link.display}
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2eb8a6] -translate-x-full transition-transform duration-300 group-hover:translate-x-0"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links with Advanced Hover */}
          <div className="lg:pl-10">
            <h3 className="text-2xl font-black mb-10 text-gray-800 relative group/title inline-block">
              Services
              <span className="absolute -bottom-3 left-0 w-16 h-1.5 bg-gradient-to-r from-[#2eb8a6] to-transparent rounded-full transition-all duration-500 group-hover/title:w-full"></span>
            </h3>
            <ul className="space-y-5">
              {serviceLinks.map((link) => (
                <li key={link.display}>
                  <Link
                    to={link.path}
                    className="group flex items-center text-[16px] font-[700] text-gray-500 hover:text-[#2eb8a6] transition-all duration-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#fca311] mr-0 opacity-0 transition-all duration-300 group-hover:mr-4 group-hover:opacity-100 group-hover:scale-125"></div>
                    <span className="relative overflow-hidden">
                      {link.display}
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2eb8a6] -translate-x-full transition-transform duration-300 group-hover:translate-x-0"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Contact Cluster */}
          <div>
            <h3 className="text-2xl font-black mb-10 text-gray-800 relative group/title inline-block">
              Connect
              <span className="absolute -bottom-3 left-0 w-16 h-1.5 bg-gradient-to-r from-[#2eb8a6] to-transparent rounded-full transition-all duration-500 group-hover/title:w-full"></span>
            </h3>
            <ul className="space-y-8">
              <li className="flex items-center gap-5 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-50 to-white border border-teal-100 flex items-center justify-center shadow-lg group-hover:from-[#2eb8a6] group-hover:to-[#1d7a6e] group-hover:text-white group-hover:rotate-12 transition-all duration-500">
                  <FaMapMarkerAlt className="shrink-0 text-xl" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] uppercase tracking-widest text-[#2eb8a6] font-bold">Location</span>
                  <span className="text-[15px] font-bold text-gray-700 group-hover:text-gray-900">Bara Bazar Madhubani, Bihar</span>
                </div>
              </li>
              <li className="flex items-center gap-5 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-50 to-white border border-teal-100 flex items-center justify-center shadow-lg group-hover:from-[#2eb8a6] group-hover:to-[#1d7a6e] group-hover:text-white group-hover:rotate-12 transition-all duration-500">
                  <FaEnvelope className="shrink-0 text-xl" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] uppercase tracking-widest text-[#2eb8a6] font-bold">Email Us</span>
                  <a href="mailto:support@sehaatsaathi.com" className="text-[15px] font-bold text-gray-700 group-hover:text-[#2eb8a6]">support@sehaatsaathi.com</a>
                </div>
              </li>
              <li className="flex items-center gap-5 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-50 to-white border border-teal-100 flex items-center justify-center shadow-lg group-hover:from-[#2eb8a6] group-hover:to-[#1d7a6e] group-hover:text-white group-hover:rotate-12 transition-all duration-500">
                  <FaPhoneAlt className="shrink-0 text-xl" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] uppercase tracking-widest text-[#2eb8a6] font-bold">Call Anytime</span>
                  <div className="text-[15px] font-bold text-gray-700">
                    <a href="tel:+916200087830" className="group-hover:text-[#2eb8a6] block">(+91) 6200087830</a>
                    <a href="tel:9470074183" className="group-hover:text-[#2eb8a6] block">9470074183</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Dynamic Socials & Glass Bottom */}
        <div className="pt-12 border-t border-teal-200/40 flex flex-col md:flex-row justify-between items-center gap-8 bg-white/20 backdrop-blur-sm p-8 rounded-[40px] shadow-inner mb-4">
          <div className="flex items-center space-x-8">
            {socialLinks.map((socialLink) => (
              <Link
                key={socialLink.id}
                to={socialLink.path}
                className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-xl border border-teal-50 transition-all duration-500 hover:-translate-y-4 hover:scale-110 hover:shadow-teal-200 group relative"
              >
                <div className="absolute inset-0 bg-teal-50 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-500 -z-10"></div>
                <span className="transition-transform duration-500 group-hover:rotate-[360deg]">
                  {socialLink.icon}
                </span>
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex gap-10 mb-3">
              <span className="text-[14px] font-bold text-teal-800 hover:text-[#fca311] cursor-pointer transition-colors relative group/link">
                Privacy Policy
                <span className="absolute bottom-[-2px] left-0 w-0 h-0.5 bg-[#fca311] transition-all group-hover/link:w-full"></span>
              </span>
              <span className="text-[14px] font-bold text-teal-800 hover:text-[#fca311] cursor-pointer transition-colors relative group/link">
                Terms of Service
                <span className="absolute bottom-[-2px] left-0 w-0 h-0.5 bg-[#fca311] transition-all group-hover/link:w-full"></span>
              </span>
            </div>
            <p className="text-gray-500 text-[14px] font-medium tracking-wide">
              &copy; {new Date().getFullYear()} <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2eb8a6] to-[#fca311] font-black">Sehaat Saathi</span>. Crafted with Excellence.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 7s ease-in-out infinite;
          animation-delay: 2s;
        }
        .animate-shine {
          animation: shine 1.5s infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
