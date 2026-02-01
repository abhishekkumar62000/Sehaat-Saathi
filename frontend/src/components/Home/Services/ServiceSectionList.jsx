import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { services } from "../../../assets/data/servicesData";
import ServiceSectionCard from "./ServiceSectionCard";

const ServiceSectionList = () => {
  return (
    <div>
      {/* Services Grid with Enhanced Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
        {services.slice(0, 12).map((service, index) => (
          <div
            key={service.id}
            className="animate-fade-in"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: "both",
            }}
          >
            <ServiceSectionCard service={service} index={index} />
          </div>
        ))}
      </div>

      {/* Enhanced Call-to-Action Button */}
      <div className="text-center">
        <Link to="/services" className="inline-block group">
          <button className="relative px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 overflow-hidden">
            {/* Animated background */}
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

            {/* Button content */}
            <span className="relative z-10">See All Services</span>
            <BsArrowRight className="relative z-10 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />

            {/* Ripple effect */}
            <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-700"></span>
          </button>
        </Link>

        {/* Additional Info */}
        <p className="text-gray-500 text-sm mt-4">
          Explore our complete range of medical specialties
        </p>
      </div>

      {/* Custom Animation Keyframes */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ServiceSectionList;
