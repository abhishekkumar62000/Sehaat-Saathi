import call from "../../assets/images/home/card/call.png";
import clock from "../../assets/images/home/card/clock.png";
import location from "../../assets/images/home/card/location.png";

const BestCard = () => {
  const cardData = [
    {
      id: 1,
      title: "Our Location",
      desc: "Bara Bazar, Madhubani, Bihar, India",
      bgColor: "bg-gradient-to-br from-[#FF9933]/10 to-[#FF9933]/30",
      accentColor: "bg-[#FF9933]",
      textColor: "text-slate-800",
      icon: location,
      shadow: "shadow-orange-200/50"
    },
    {
      id: 2,
      title: "Opening Hours",
      desc: "24/7 Global Access",
      bgColor: "bg-white/40",
      accentColor: "bg-[#000080]",
      textColor: "text-slate-800",
      icon: clock,
      shadow: "shadow-blue-200/50",
      isChakra: true
    },
    {
      id: 3,
      title: "Contact Us",
      desc: "(+91) 6200087830",
      bgColor: "bg-gradient-to-br from-[#138808]/10 to-[#138808]/30",
      accentColor: "bg-[#138808]",
      textColor: "text-slate-800",
      icon: call,
      shadow: "shadow-green-200/50"
    },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cardData.map((data) => (
            <div
              key={data.id}
              className={`group relative p-8 rounded-[2.5rem] backdrop-blur-md border border-white/40 ${data.bgColor} ${data.shadow} hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 flex flex-col items-center text-center`}
            >
              {/* Top Accent Bar */}
              <div className={`absolute top-6 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full ${data.accentColor} opacity-50 group-hover:w-20 transition-all duration-500`}></div>

              <div className="mt-6 flex flex-col items-center gap-6">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center p-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                  <img src={data.icon}
                    alt={data.title}
                    className={`w-full h-full object-contain ${data.isChakra ? 'animate-ashok-chakra' : ''}`}
                   loading="lazy" />
                </div>
                <div>
                  <h3 className={`text-xl sm:text-2xl font-black ${data.textColor} tracking-tight leading-tight mb-2 uppercase`}>
                    {data.title}
                  </h3>
                  <p className="text-slate-500 font-bold text-sm tracking-wide">
                    {data.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Glow */}
              <div className={`absolute -bottom-10 -right-10 w-32 h-32 ${data.accentColor} opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-700`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestCard;

