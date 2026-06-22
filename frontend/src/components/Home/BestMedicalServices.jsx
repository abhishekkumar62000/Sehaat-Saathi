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
      accent: "teal"
    },
    {
      id: "pD2",
      title: "Find a Location",
      link: "/contact",
      icon: icon02,
      desc: "Locate our state-of-the-art diagnostic centers near you for convenient and accurate testing.",
      color: "from-blue-400 to-blue-600",
      accent: "blue"
    },
    {
      id: "pD3",
      title: "Book Appointment",
      link: "https://calendly.com/codewithabhi5/sehaat-saathi-app-booking",
      icon: icon03,
      desc: "Schedule your visit seamlessly online. Get instant confirmation and proactive care reminders.",
      color: "from-violet-400 to-violet-600",
      accent: "violet"
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16 mb-20 overflow-hidden relative">
      {/* Background decorative element */}
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-teal-50 rounded-full blur-3xl -z-10 opacity-40 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 opacity-40"></div>

      {/* Enhanced Header Section */}
      <div className="text-center mb-20 relative">
        <span className="inline-block px-4 py-1 mb-4 text-[10px] sm:text-xs font-black tracking-widest text-teal-600 uppercase bg-teal-50 rounded-full animate-pulse">
          Proactive Care
        </span>
        <h2 className="text-[clamp(28px,6vw,56px)] font-black text-slate-900 mb-4 tracking-tighter uppercase leading-none">
          Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Medical Services</span>
        </h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto rounded-full mb-6 shadow-lg shadow-teal-100"></div>
        <p className="max-w-2xl mx-auto text-gray-500 text-lg font-medium opacity-80 px-4 sm:px-0">
          Empowering your health journey with cutting-edge technology and
          pioneering medical expertise. Excellence in every diagnosis.
        </p>
      </div>

      {/* Services Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {providingData.map((item) => (
          <div
            key={item.id}
            className="group relative"
          >
            {/* Hover Background Accent */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${item.color} rounded-[2.5rem] blur opacity-0 group-hover:opacity-20 transition duration-700`}></div>

            {/* Card Content */}
            <div className="relative h-full bg-white/40 backdrop-blur-3xl border border-white rounded-[2.5rem] p-8 sm:p-10 shadow-sm hover:shadow-2xl transition-all duration-700 flex flex-col items-center text-center transform group-hover:-translate-y-4">

              {/* Icon Container with Floating Animation */}
              <div className="mb-8 relative transition-transform duration-700 group-hover:scale-110">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity`}></div>
                <img src={item.icon}
                  alt={item.title}
                  className="w-24 h-24 object-contain relative z-10 animate-float"
                 loading="lazy" />
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 tracking-tight uppercase group-hover:text-teal-600 transition-colors">
                {item.title}
              </h3>

              <p className="text-gray-500 leading-relaxed mb-8 flex-grow font-medium">
                {item.desc}
              </p>

              {/* Enhanced Interactive Link */}
              {item.link.startsWith("http") ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn flex items-center justify-center gap-3 w-full py-4 sm:py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)] transition-all duration-300 relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500`}></div>
                  <span className="relative z-10">Book Now</span>
                  <BsArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-2" />
                </a>
              ) : (
                <Link
                  to={item.link}
                  className="group/btn flex items-center justify-center gap-3 w-full py-4 sm:py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)] transition-all duration-300 relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500`}></div>
                  <span className="relative z-10">Learn More</span>
                  <BsArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-2" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

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
