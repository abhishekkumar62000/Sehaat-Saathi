/* eslint-disable react/prop-types */
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";

const ServiceSectionCard = ({ service, index }) => {
  const { name, desc, serviceImg } = service;
  const [isHovered, setIsHovered] = useState(false);

  // Define Tri-color Theme Logic
  const getTheme = (idx) => {
    const remainder = idx % 3;
    if (remainder === 0) {
      // Saffron Theme
      return {
        bg: "bg-gradient-to-br from-[#FF9933]/5 to-[#FF9933]/20",
        border: "border-[#FF9933]",
        text: "text-[#FF9933]",
        accent: "bg-[#FF9933]",
        shadow: "hover:shadow-orange-200",
        overlay: "from-[#FF9933]/10 to-[#FF9933]/20",
      };
    } else if (remainder === 1) {
      // White/Navy Blue Theme (Ashoka Chakra)
      return {
        bg: "bg-white",
        border: "border-[#000080]",
        text: "text-[#000080]",
        accent: "bg-[#000080]",
        shadow: "hover:shadow-blue-200",
        overlay: "from-[#000080]/5 to-[#000080]/10",
      };
    } else {
      // Green Theme
      return {
        bg: "bg-gradient-to-br from-[#138808]/5 to-[#138808]/20",
        border: "border-[#138808]",
        text: "text-[#138808]",
        accent: "bg-[#138808]",
        shadow: "hover:shadow-green-200",
        overlay: "from-[#138808]/10 to-[#138808]/20",
      };
    }
  };

  const theme = getTheme(index);

  return (
    <div
      className={`group relative rounded-[2rem] sm:rounded-[32px] transform transition-all duration-500 hover:-translate-y-3 overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl ${theme.shadow} border-b-4 ${theme.border} ${theme.bg}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Overlay on Hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${theme.overlay} opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0`}
      ></div>

      {/* Image Container */}
      <div className="relative overflow-hidden h-40 sm:h-52 bg-white/50 backdrop-blur-sm m-2 rounded-[1.5rem] sm:rounded-[28px]">
        <img src={serviceImg}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
         loading="lazy" />
        {/* Overlay Icon */}
        <div className={`absolute top-4 right-4 bg-white/90 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0`}>
          <FaArrowRight className={`${theme.text} text-lg`} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-4 pb-8 px-8">
        {/* Service Name */}
        <h2
          className={`text-[clamp(20px,4vw,28px)] font-black mb-4 group-hover:scale-105 transition-transform duration-300 tracking-tighter uppercase leading-none ${theme.text}`}
        >
          {name}
        </h2>

        {/* Description */}
        <p className="text-slate-600 text-sm font-black uppercase tracking-tight leading-snug mb-8 opacity-80">
          {desc}
        </p>

        {/* Animated Learn More Link */}
        <div className={`flex items-center gap-3 ${theme.text} font-black uppercase tracking-[0.2em] text-[10px] sm:text-[11px] group-hover:gap-4 transition-all duration-300`}>
          <span className="relative">
            Sovereign Access
            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${theme.accent} group-hover:w-full transition-all duration-500`}></span>
          </span>
          <FaArrowRight
            className={`transform transition-transform duration-300 ${isHovered ? "translate-x-2" : ""}`}
          />
        </div>
      </div>

      {/* Decorative Chakra Element for Middle Card */}
      {index % 3 === 1 && (
        <div className="absolute -bottom-10 -right-10 w-24 h-24 border-4 border-[#000080]/10 rounded-full animate-spin-slow pointer-events-none"></div>
      )}
    </div>
  );
};

export default ServiceSectionCard;
