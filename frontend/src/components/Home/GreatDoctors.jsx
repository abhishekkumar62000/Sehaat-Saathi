import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { doctors } from "../../assets/data/doctors";
import DoctorCard from "../../pages/Doctors/DoctorCard";

import logo from "../../assets/images/brand-logo/SehaatSaathi Logo.png";

const GreatDoctors = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-slate-800 leading-tight inline-flex items-center justify-center gap-3">
            Our <span className="text-[#009E60]">Experts</span> <span className="text-[#FF8C00]">Doctors</span>
            <img src={logo} alt="Logo" className="w-8 h-8 lg:w-10 lg:h-10 animate-bounce" />
          </h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-lg">
            Meet our world-class medical specialists dedicated to providing top-notch healthcare services.
          </p>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-8">
          {doctors.slice(0, 8).map((doctor, index) => (
            <DoctorCard doctor={doctor} key={index} />
          ))}
        </div>

        <Link to="/doctors" className="flex justify-center animate-bounce mt-8">
          <button className="customBtn bg-green-600 flex items-center text-white">
            All Expert Doctors{" "}
            <BsArrowRight className="group-hover:text-white w-6 h-6 ml-2" />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default GreatDoctors;
