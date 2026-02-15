import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";

const AdsBanner = () => {
  return (
    <section className="bg-green-500 py-12 text-white mb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12 text-center lg:text-left">
            <div className="flex-1 max-w-2xl">
              <h2 className="text-[35px] lg:text-[44px] leading-tight lg:leading-[54px] font-bold mb-3">
                How we can help...
              </h2>
              <p className="text-[14px] lg:text-[16px] leading-relaxed opacity-95">
                We offer a wide range of procedures to help you get the perfect smile.
              </p>
            </div>
            <Link to="/doctors" className="animate-bounce">
              <button className="customBtn bg-white text-green-600 hover:bg-green-600 hover:text-white flex items-center justify-center transition-colors duration-300">
                Book an Appointment{" "}
                <MdArrowOutward className="w-6 h-6 ml-2" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdsBanner;
