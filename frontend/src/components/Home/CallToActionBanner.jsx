import { FaCalendarAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const CallToActionBanner = () => {
  return (
    <section className="container mx-auto px-4 mb-20">
      <div className="relative overflow-hidden rounded-[40px] bg-slate-900 p-8 lg:p-20 shadow-2xl">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-[140px] opacity-20 -z-0 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-20 -z-0"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-cyan-400 uppercase bg-cyan-400/10 border border-cyan-400/20 rounded-full backdrop-blur-md">
            Your Health is Our Priority
          </span>

          <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight max-w-4xl">
            Schedule your appointment today and get{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
              Personalized Care
            </span>
          </h2>

          <p className="text-lg text-slate-400 mb-12 max-w-2xl font-medium">
            Join the <span className="text-white font-bold italic">2026 Health Revolution</span> with
            <span className="mx-2 px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg text-cyan-300 font-bold tracking-wide">
              Sehaat Saathi
            </span>
            Diagnostics.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-3xl">
            <a
              href="https://calendly.com/codewithabhi5/sehaat-saathi-app-booking"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center bg-white text-slate-900 font-bold py-5 px-10 rounded-[20px] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-1 w-full sm:w-auto"
            >
              <FaCalendarAlt className="mr-3 text-cyan-500 group-hover:scale-125 transition-transform" />
              Book Appointment
            </a>

            <a
              href="tel:+880123456789"
              className="group flex items-center justify-center bg-white/10 text-white border border-white/20 backdrop-blur-xl font-bold py-5 px-10 rounded-[20px] transition-all duration-300 hover:bg-white/20 hover:-translate-y-1 w-full sm:w-auto"
            >
              <FaPhoneAlt className="mr-3 text-cyan-400 group-hover:rotate-12 transition-transform" />
              +91 6200087830
            </a>

            <a
              href="mailto:info@sehaatsaathi.com"
              className="group flex items-center justify-center bg-transparent text-slate-400 font-bold py-5 px-8 rounded-[20px] transition-all duration-300 hover:text-white w-full sm:w-auto"
            >
              <FaEnvelope className="mr-3 opacity-60 group-hover:opacity-100 transition-opacity" />
              Email Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionBanner;
