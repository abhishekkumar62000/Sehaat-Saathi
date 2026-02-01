import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const OurLocation = () => {
  return (
    <section className="w-full flex flex-col lg:flex-row items-center justify-center py-6 bg-gray-50 container mb-10">
      <div className="text-center lg:text-left lg:w-3/12 mb-4 lg:mb-0">
        <h2 className="heading mb-2">Our Location</h2>
        <div className="text-gray-700">
          <p className="text-[14px] lg:text-[18px] font-semibold text-gray-700 my-6 mt-0">
            Visit us at our regional diagnostic excellence center in Bihar.
          </p>
          <div className="my-4 space-y-2">
            <p className="font-bold text-violet-700 flex items-center gap-2">
              📍 Bara Bazar, Madhubani
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Bihar, India - 847211 <br />
              Asia
            </p>
            <p className="text-gray-500 text-xs italic mt-4">
              Our state-of-the-art facility is centrally located to serve you with
              the best diagnostic services in the region.
            </p>
          </div>
          <Link
            to="/contact"
            className="flex justify-center lg:block animate-bounce mt-6"
          >
            <button className="customBtn flex items-center bg-gradient-to-r from-violet-600 to-indigo-700 hover:shadow-lg transition-all">
              Get Directions{" "}
              <BsArrowRight className="group-hover:text-white w-6 h-6 ml-2" />
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-9/12 h-64 lg:h-96 lg:pl-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14332.1462057373!2d86.0694158!3d26.3578768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39edcd0f8c36869b%3A0xc3f17387cc07b46d!2sBara%20Bazar%2C%20Madhubani%2C%20Bihar%20847211!5e0!3m2!1sen!2sin!4v1706424456789!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: '24px' }}
          allowFullScreen=""
          loading="lazy"
          className="shadow-2xl"
        ></iframe>
      </div>
    </section>
  );
};

export default OurLocation;
