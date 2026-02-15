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
          <button className="tri-btn flex items-center gap-4">
            <span className="relative z-10">Expand Global Network</span>
            <BsArrowRight className="relative z-10 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </Link>

        {/* Additional Info */}
        <p className="text-gray-500 text-sm mt-4">
          Explore our complete range of medical specialties
        </p>
      </div>

      {/* Custom Animation Keyframes */}
      {/* Custom Animation Keyframes */}
    </div>
  );
};

export default ServiceSectionList;
