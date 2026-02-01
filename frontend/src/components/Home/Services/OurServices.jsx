import ServiceSectionList from "./ServiceSectionList";

const OurServices = () => {
  return (
    <section className="container mx-auto px-4 lg:px-16 py-12 mb-10">
      {/* Enhanced Header with Background */}
      <div className="text-center mb-12">
        <div className="inline-block">
          <span className="text-teal-500 font-semibold text-lg mb-2 block">
            🏥 What We Offer
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Medical Services
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto rounded-full"></div>
        </div>
        <p className="text-gray-600 mt-6 max-w-3xl mx-auto text-lg">
          Experience comprehensive healthcare powered by AI technology and expert
          medical professionals. From diagnosis to treatment, we're here for you
          24/7.
        </p>
      </div>

      {/* Service Section List */}
      <ServiceSectionList />
    </section>
  );
};

export default OurServices;
