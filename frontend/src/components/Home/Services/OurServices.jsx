import ServiceSectionList from "./ServiceSectionList";

const OurServices = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-16 py-12 mb-10">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header with Background */}
        <div className="text-center mb-12">
          <div className="inline-block relative">
            <span className="text-orange-600 font-black uppercase tracking-[0.4em] text-xs mb-4 block animate-pulse">
              WORLD-CLASS CARE
            </span>
            <h2 className="text-[clamp(32px,8vw,80px)] font-black text-slate-900 mb-8 tracking-tighter uppercase leading-[0.85] drop-shadow-sm">
              Our <span style={{ color: "#FF9933" }}>Care</span> <span style={{ color: "#138808" }}>Sectors</span>
            </h2>
            <div className="h-1.5 sm:h-2 w-32 sm:w-48 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] mx-auto rounded-full shadow-[0_0_15px_rgba(255,153,51,0.3)] animate-pulse"></div>
          </div>
          <p className="text-gray-600 mt-6 max-w-3xl mx-auto text-lg font-medium leading-relaxed">
            We use smart technology and top doctors to look after your health.
            From finding the problem to helping you get well, we are here for you 24/7. 🩺
          </p>
        </div>

        {/* Service Section List */}
        <ServiceSectionList />
      </div>
    </section>
  );
};

export default OurServices;
