import { IoMdCheckmarkCircle } from "react-icons/io";
import { packages } from "../../assets/data/packagesData";

const HealthPackages = () => {
  return (
    <section className="container mx-auto px-4 py-16 mb-10">
      {/* Enhanced Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1a237e] mb-2 relative inline-block group">
          Our Health Packages
          <span className="absolute bottom-[-8px] left-0 w-full h-[3px] bg-blue-600 scale-x-75 group-hover:scale-x-100 transition-transform duration-300"></span>
        </h2>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Choose from our carefully curated health checkup packages designed to suit your lifestyle and health needs.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden relative border border-gray-100 flex flex-col hover:-translate-y-2"
          >
            {/* Price Tag - Fixed to match image style */}
            <div className="absolute top-4 right-4 bg-[#23904a] text-white px-4 py-1 rounded text-2xl font-bold shadow-md z-10">
              {pkg.price}
            </div>

            {/* Image Container with Zoom Effect */}
            <div className="relative overflow-hidden h-[240px]">
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
            </div>

            <div className="px-6 py-6 flex flex-col flex-grow">
              {/* Package Title */}
              <h3 className="text-2xl font-bold text-[#1f267a] mb-2 text-center group-hover:text-blue-600 transition-colors">
                {pkg.name}
              </h3>

              {/* Description */}
              <p className="text-gray-500 mb-6 text-center leading-relaxed text-sm">
                {pkg.description}
              </p>

              {/* Facilities List */}
              <ul className="text-gray-600 space-y-3 mb-8 flex-grow">
                {pkg.facilities.map((facility, idx) => (
                  <li key={idx} className="flex items-start text-sm">
                    <IoMdCheckmarkCircle className="w-5 h-5 text-[#23a35b] mr-3 mt-0.5 flex-shrink-0" />
                    <span>{facility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Book Now Button - Full width like image */}
            <a
              href="https://calendly.com/codewithabhi5/sehaat-saathi-app-booking"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#6a2fed] hover:bg-[#5a24cc] text-white font-bold py-4 text-lg transition-colors duration-300 mt-auto flex justify-center items-center group/btn"
            >
              <span>Book Now</span>
              <span className="ml-2 group-hover/btn:translate-x-2 transition-transform duration-300">→</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HealthPackages;
