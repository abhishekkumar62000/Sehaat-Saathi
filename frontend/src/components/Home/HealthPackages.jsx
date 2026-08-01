import { IoMdCheckmarkCircle } from "react-icons/io";
import { packages } from "../../assets/data/packagesData";

const HealthPackages = () => {
  return (
    <section className="container mx-auto px-4 py-16 mb-10">
      {/* Enhanced Section Header */}
      <div className="text-center mb-16 relative">
        <span className="inline-block px-4 py-1 mb-4 text-[10px] sm:text-xs font-black tracking-widest text-[#6a2fed] uppercase bg-violet-50 rounded-full animate-pulse">
          Elite Wellness
        </span>
        <h2 className="text-[clamp(28px,6vw,56px)] font-black text-slate-900 mb-4 tracking-tighter uppercase leading-none">
          Our Health <span className="text-[#6a2fed]">Packages</span>
        </h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-[#6a2fed] to-[#1a237e] mx-auto rounded-full mb-6 shadow-lg shadow-violet-200"></div>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">
          Choose from our carefully curated health checkup packages designed to suit your lifestyle and health needs.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="group relative bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden border border-white/60 flex flex-col hover:-translate-y-4"
          >
            {/* Glowing Border Card Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-violet-500/5 group-hover:from-violet-500/5 transition-all duration-700"></div>
            {/* Price Tag - Premium Glassmorphic Badge */}
            <div className="absolute top-4 right-4 bg-white/40 backdrop-blur-xl text-slate-900 px-5 py-2 rounded-2xl text-xl sm:text-2xl font-black shadow-[0_10px_30px_rgba(0,0,0,0.1)] z-20 border border-white/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 flex items-center gap-1">
              <span className="text-sm font-bold opacity-60">₹</span>
              {pkg.price.replace('₹', '')}
              <span className="absolute -inset-1 bg-violet-500/10 rounded-2xl animate-pulse -z-10"></span>
            </div>

            {/* Image Container with Zoom Effect */}
            <div className="relative overflow-hidden h-[240px]">
              <img src={pkg.image}
                alt={pkg.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
               loading="lazy" />
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
            </div>

            <div className="px-6 py-6 flex flex-col flex-grow relative z-10">
              {/* Package Title */}
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 text-center group-hover:text-[#6a2fed] transition-colors tracking-tight uppercase">
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

