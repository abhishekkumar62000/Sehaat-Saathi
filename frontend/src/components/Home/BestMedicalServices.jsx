import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import icon01 from "../../assets/images/icons/icon01.png";
import icon02 from "../../assets/images/icons/icon02.png";
import icon03 from "../../assets/images/icons/icon03.png";

const BestMedicalServices = () => {
  const providingData = [
    {
      id: "pD1",
      title: "Find a Doctor",
      link: "/doctors",
      icon: icon01,
      desc: "Connect with world-class specialists. Our network includes top-rated experts dedicated to your health.",
      color: "from-teal-400 to-teal-600",
    },
    {
      id: "pD2",
      title: "Find a Location",
      link: "/contact",
      icon: icon02,
      desc: "Locate our state-of-the-art diagnostic centers near you for convenient and accurate testing.",
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "pD3",
      title: "Book Appointment",
      link: "https://calendly.com/codewithabhi5/sehaat-saathi-app-booking",
      icon: icon03,
      desc: "Schedule your visit seamlessly online. Get instant confirmation and proactive care reminders.",
      color: "from-violet-400 to-violet-600",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16 mb-20 overflow-hidden">
      {/* Enhanced Header Section */}
      <div className="text-center mb-16 relative">
        <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest text-teal-600 uppercase bg-teal-100 rounded-full animate-pulse">
          Proactive Care
        </span>
        <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Medical Services</span>
        </h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto rounded-full mb-6"></div>
        <p className="max-w-2xl mx-auto text-gray-500 text-lg">
          Empowering your health journey with cutting-edge technology and
          pioneering medical expertise. Excellence in every diagnosis.
        </p>

        {/* Background decorative element */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-teal-50 rounded-full blur-3xl -z-10 opacity-60"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl -z-10 opacity-60"></div>
      </div>

      {/* Services Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {providingData.map((item) => (
          <div
            key={item.id}
            className="group relative h-full"
          >
            {/* Hover Background Accent */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500`}></div>

            {/* Card Content */}
            <div className="relative h-full bg-white/70 backdrop-blur-xl border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center transform group-hover:-translate-y-3">

              {/* Icon Container with Floating Animation */}
              <div className="mb-8 relative transition-transform duration-500 group-hover:scale-110">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity`}></div>
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-24 h-24 object-contain relative z-10 animate-float"
                />
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-300 group-hover:from-teal-600 group-hover:to-blue-600">
                {item.title}
              </h3>

              <p className="text-gray-500 leading-relaxed mb-8 flex-grow">
                {item.desc}
              </p>

              {/* Enhanced Interactive Link */}
              {item.link.startsWith("http") ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn flex items-center justify-center gap-3 w-full py-4 rounded-2xl border-2 border-gray-50 text-slate-700 font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 overflow-hidden relative"
                >
                  <span className="relative z-10">Book Now</span>
                  <BsArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-2" />
                  <div className="absolute inset-0 bg-slate-900 transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out"></div>
                </a>
              ) : (
                <Link
                  to={item.link}
                  className="group/btn flex items-center justify-center gap-3 w-full py-4 rounded-2xl border-2 border-gray-50 text-slate-700 font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 overflow-hidden relative"
                >
                  <span className="relative z-10">Learn More</span>
                  <BsArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-2" />
                  <div className="absolute inset-0 bg-slate-900 transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out"></div>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Global CSS for custom animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default BestMedicalServices;
