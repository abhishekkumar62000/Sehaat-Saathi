import { Link } from "react-router-dom";
import mdImg from "../../assets/images/about/Md.png";
import { socialLinks } from "../Footer/Footer";
import { FaLaptopCode, FaBriefcase } from "react-icons/fa";

const AboutMD = () => {
  return (
    <section className="animate-in fade-in zoom-in duration-700">
      <h2 className="lg:text-[32px] text-[24px] text-[#2eb8a6] font-black text-center mb-10 tracking-tighter">
        Managing Director&apos;s Message
      </h2>
      <div className="lg:flex justify-center items-center gap-16 w-full px-4">
        {/* MD Image */}
        <div className="text-center w-full lg:w-5/12 mb-12 lg:mb-0">
          <div className="relative group inline-block">
            <div className="absolute -inset-4 bg-teal-100 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <img
              className="relative mx-auto rounded-3xl shadow-2xl w-56 md:w-64 lg:w-72 border-8 border-white object-cover aspect-[4/5] transform group-hover:scale-105 transition-transform duration-700"
              src={mdImg}
              alt="Rahul & Supriya Yadav - MD"
            />
            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-teal-50 flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center text-white">
                <FaLaptopCode size={20} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest">Experience</p>
                <p className="text-sm font-bold text-gray-800">12+ Years IT</p>
              </div>
            </div>
          </div>

          <div className="mt-10 space-y-2">
            <h1 className="text-2xl lg:text-3xl font-black text-gray-800 tracking-tight leading-tight">
              Rahul Yadav & <span className="text-[#2eb8a6]">Supriya Yadav</span>
            </h1>
            <p className="text-teal-600 font-bold uppercase tracking-[0.2em] text-xs">
              Co-Founder Sehaat Saathi,Building Bihar
            </p>
          </div>

          <div className="flex justify-center space-x-4 mt-8">
            {socialLinks.map((link) => (
              <Link
                to={link.path}
                target="_blank"
                key={link.id}
                className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 shadow-sm hover:bg-[#2eb8a6] hover:text-white hover:-translate-y-1 transition-all group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">
                  {link.icon}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* ===MD's Message==== */}
        <div className="w-full lg:w-7/12">
          <div className="space-y-8">
            <div className="bg-teal-50/50 p-8 rounded-[40px] border border-teal-100/50 relative">
              <div className="absolute -top-4 left-8 px-4 py-1 bg-teal-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                Professional Background
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 p-3 bg-white rounded-xl shadow-sm text-teal-500">
                  <FaBriefcase size={24} />
                </div>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Rahul Yadav is a seasoned **IT Professional** with over **12 years of industry experience**.
                  His deep technical expertise in software architecture and systems design is the backbone
                  of Sehaat Saathi&apos;s digital infrastructure.
                </p>
              </div>
            </div>

            <div className="text-left text-gray-700 text-lg lg:text-xl leading-relaxed space-y-6">
              <p className="text-justify font-medium">
                Our mission at Sehaat Saathi is to ensure that each patient receives
                personalized care and accurate diagnostics through the power of
                modern technology. We are committed to maintaining the highest
                standards of quality and speed in every service we provide.
              </p>
              <p className="text-justify font-medium">
                By integrating smart software solutions with traditional medical care,
                we are evolving to meet the growing demands of modern healthcare.
                Thank you for placing your trust in our vision.
              </p>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-2xl font-black text-gray-900 tracking-tighter">- Rahul Yadav & Supriya Yadav</p>
                <p className="text-sm font-black text-teal-500 uppercase tracking-[0.3em]">Managing Directors</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMD;
