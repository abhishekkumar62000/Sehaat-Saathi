import { faqs } from "../../assets/data/faqs";
import faqBg from "../../assets/images/bgImg.png";
import faqImg from "../../assets/images/home/FAQ.png";
import FaqItem from "./FaqItem";

const FaqSection = () => {
  return (
    <section className="container mx-auto px-4 py-16 mb-20 overflow-hidden relative">
      {/* Background decorative element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl -z-10 opacity-40 animate-pulse"></div>

      {/* Title Section */}
      <div className="text-center mb-16 relative">
        <span className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
          Support Center
        </span>
        <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
          Frequently <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Asked Questions</span>
        </h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto rounded-full"></div>
      </div>

      <div
        style={{
          backgroundImage: `url(${faqBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-white/30 backdrop-blur-sm rounded-[32px] p-6 lg:p-12 shadow-inner border border-white/50"
      >
        {/* Image Section with Glass card effect */}
        <div className="hidden lg:block lg:w-1/2 relative group">
          <div className="absolute -inset-4 bg-gradient-to-tr from-teal-500/20 to-blue-500/20 rounded-[40px] blur-2xl group-hover:scale-105 transition-transform duration-700 opacity-60"></div>
          <div className="relative overflow-hidden rounded-[32px] shadow-2xl">
            <img
              src={faqImg}
              alt="Diagnostics Center FAQ"
              className="w-full h-auto transform group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
          </div>
        </div>

        {/* FAQ List Section */}
        <div className="w-full lg:w-1/2">
          <div className="space-y-2">
            {faqs.map((faq) => (
              <FaqItem key={faq.id} item={faq} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
