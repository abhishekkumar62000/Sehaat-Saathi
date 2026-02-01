/* eslint-disable react/prop-types */
import { BsArrowRight, BsCheckCircleFill } from "react-icons/bs";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import starIcon from "../../assets/images/icons/Star.png";

const DoctorCard = ({ doctor }) => {
  const { name, specialization, avgRating, totalRating, photo, experiences } =
    doctor;

  return (
    <div className="group relative bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-10px_rgba(0,158,96,0.2)] transition-all duration-500 hover:-translate-y-2">

      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#009E60] to-[#FF8C00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

      {/* RATING BADGE */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-slate-100 group-hover:bg-[#FF8C00] group-hover:text-white transition-colors duration-300">
          <img src={starIcon} alt="" className="w-3.5 h-3.5" />
          <span className="text-xs font-black">{avgRating}</span>
          <span className="text-[10px] font-medium opacity-70">({totalRating})</span>
        </div>
      </div>

      {/* IMAGE SECTION */}
      <div className="relative pt-8 pb-4 flex justify-center bg-gradient-to-b from-slate-50 to-white">
        <div className="relative">
          {/* Animated Background Blob */}
          <div className="absolute inset-0 bg-[#009E60]/10 rounded-full blur-2xl transform scale-0 group-hover:scale-150 transition-transform duration-700"></div>

          <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full p-1 bg-gradient-to-tr from-[#009E60] to-[#FF8C00] relative z-10">
            <img
              src={photo}
              alt={name}
              className="w-full h-full object-cover rounded-full border-4 border-white shadow-md transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full text-[#009E60] text-sm shadow-md">
              <BsCheckCircleFill />
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="px-6 pb-6 text-center">
        <h2 className="text-xl lg:text-2xl font-black text-slate-800 mb-1 group-hover:text-[#009E60] transition-colors">{name}</h2>

        <div className="inline-block px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider mb-4 border border-slate-200">
          {specialization || <span className="text-red-400">Not Updated</span>}
        </div>

        <p className="text-sm text-slate-500 font-medium mb-6 line-clamp-1 min-h-[1.25rem]">
          {doctor.hospital || experiences && experiences[0]?.hospital || "Hospital Info Unavailable"}
        </p>

        {/* SOCIAL ICONS (Slide Up on Hover) */}
        <div className="flex justify-center gap-3 mb-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          {[FaLinkedinIn, FaInstagram, FaFacebookF, FaTwitter].map((Icon, i) => (
            <a key={i} href="#" className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-gradient-to-br hover:from-[#009E60] hover:to-[#007F4D] hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-300 shadow-sm border border-slate-100">
              <Icon className="text-sm" />
            </a>
          ))}
        </div>

        {/* DETAILS BUTTON */}
        <Link to={`/doctors/${doctor.id || doctor._id}`} className="block">
          <button className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-[#009E60] group-hover:to-[#007F4D] transition-all duration-300 shadow-lg group-hover:shadow-[#009E60]/30 hover:scale-[1.02]">
            View Profile <BsArrowRight />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
