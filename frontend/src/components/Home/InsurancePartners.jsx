const insurancePartnersData = [
  {
    name: "Pragati Life Insurance",
    website: "https://pragatilife.com",
    logo: "https://pragatilife.com/images/banners/pragati-Life-Ins-Logo-Eng.png",
  },
  {
    name: "Delta Life Insurance",
    website: "https://deltalife.org",
    logo: "https://www.deltalife.org/assets/site/img/logo.png",
  },
  {
    name: "Prime Islami Life Insurance",
    website: "https://primeislamilife.com",
    logo: "https://primeislamilife.com/image/Logo/primebaner.png",
  },

  {
    name: "Sonar Bangla Insurance",
    website: "https://sonarbangla.com.bd",
    logo: "https://www.sonarbanglainsurance.com/images/footer-logomj.jpg",
  },
  {
    name: "Asia Pacific General Insurance",
    website: "https://asiapacificgenins.com",
    logo: "https://www.apgicl.com/front/assets/images/logo.png",
  },

  {
    name: "Eastern Insurance Bangladesh",
    website: "https://easterninsbd.com",
    logo: "https://easterninsurancebd.com/wp-content/uploads/2019/08/LOGO-main.svg",
  },
  {
    name: "Central Insurance Bangladesh",
    website: "https://centralinsbd.com",
    logo: "https://cicl-bd.com/admin/uploads/banner/HNOIm6CJlteC.jpg",
  },
];

const InsurancePartners = () => {
  // Duplicate data for seamless loop
  const duplicatedData = [...insurancePartnersData, ...insurancePartnersData];

  return (
    <section className="py-20 mb-10 overflow-hidden relative bg-slate-50/50">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-[120px] -z-10 opacity-30"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-100 rounded-full blur-[120px] -z-10 opacity-30"></div>

      {/* Header Section */}
      <div className="container mx-auto px-4 text-center mb-16">
        <span className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full">
          Trusted Partners
        </span>
        <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Insurance & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Global Partners</span>
        </h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-blue-400 to-teal-400 mx-auto rounded-full mb-6"></div>
        <p className="max-w-2xl mx-auto text-gray-500 text-lg font-medium">
          Collaborating with industry leaders to provide you with seamless,
          cashless healthcare experiences across the globe.
        </p>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative flex overflow-hidden group">
        {/* Left/Right Fades for professional look */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10"></div>

        <div className="flex animate-marquee-fast pause-group">
          {duplicatedData.map((data, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-4"
            >
              <a
                href={data.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block group/item"
              >
                <div className="bg-white/40 backdrop-blur-md border border-white rounded-3xl p-8 h-[120px] w-[280px] flex items-center justify-center transition-all duration-500 group-hover/item:bg-white group-hover/item:shadow-xl group-hover/item:-translate-y-2">
                  <img
                    src={data.logo}
                    alt={data.name}
                    className="max-h-full max-w-full object-contain filter grayscale group-hover/item:grayscale-0 transition-all duration-500"
                  />
                </div>
                <p className="mt-3 text-center text-xs font-bold text-slate-400 uppercase tracking-widest opacity-0 group-hover/item:opacity-100 transition-opacity">
                  {data.name}
                </p>
              </a>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-fast {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-fast {
          animation: marquee-fast 40s linear infinite;
        }
        .pause-group:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default InsurancePartners;
