/* eslint-disable react/prop-types */
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";

const ServiceSectionCard = ({ service }) => {
  const { name, desc, textColor, serviceImg } = service;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-3 overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Overlay on Hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0`}
      ></div>

      {/* Image Container with Zoom Effect */}
      <div className="relative overflow-hidden h-48 bg-gray-50">
        <img
          src={serviceImg}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        {/* Overlay Icon */}
        <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FaArrowRight className="text-teal-500" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-5 pb-6 px-5">
        {/* Service Name with Color */}
        <h2
          className="text-2xl font-bold mb-3 group-hover:scale-105 transition-transform duration-300"
          style={{ color: `${textColor}` }}
        >
          {name}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {desc}
        </p>

        {/* Animated Learn More Link */}
        <div className="flex items-center gap-2 text-teal-500 font-semibold group-hover:gap-3 transition-all duration-300">
          <span className="text-sm">Learn More</span>
          <FaArrowRight
            className={`transform transition-transform duration-300 ${isHovered ? "translate-x-1" : ""
              }`}
          />
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div
        className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
        style={{ backgroundColor: textColor }}
      ></div>
    </div>
  );
};

export default ServiceSectionCard;
