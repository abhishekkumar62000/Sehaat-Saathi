import { Link } from "react-router-dom";
import { socialLinks } from "../Footer/Footer";
import founderImg from "../../assets/images/about/Founder.png";

const AboutChairman = () => {
  return (
    <section className="animate-in fade-in zoom-in duration-700">
      <h2 className="lg:text-[32px] text-[24px] text-[#2eb8a6] font-black text-center mb-10 tracking-tighter">
        Our Founder&apos;s Message
      </h2>
      <div className="lg:flex justify-center items-center gap-16 w-full px-4">
        {/* Founder Image */}
        <div className="text-center w-full lg:w-5/12 mb-12 lg:mb-0">
          <div className="relative group inline-block">
            <div className="absolute -inset-4 bg-teal-100 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <img
              className="relative mx-auto rounded-full shadow-2xl w-56 md:w-64 lg:w-72 border-8 border-white object-cover aspect-square transform group-hover:scale-105 transition-transform duration-700"
              src={founderImg}
              alt="Abhishek Kumar - Founder"
            />
            <div className="absolute bottom-4 right-4 w-12 h-12 bg-[#2eb8a6] rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white">
              <span className="text-xl font-black">AK</span>
            </div>
          </div>

          <div className="mt-8 space-y-2">
            <h1 className="text-2xl lg:text-3xl font-black text-gray-800 tracking-tight">
              Abhishek Kumar
            </h1>
            <p className="text-lg text-teal-600 font-bold uppercase tracking-widest text-sm">
              Founder Sehaat Saathi, TechSeva
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-4 mt-6">
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

        {/* ===Founder's Message==== */}
        <div className="w-full lg:w-7/12">
          <div className="relative">
            <div className="absolute -top-10 -left-10 text-9xl text-teal-100/50 font-serif -z-10">“</div>
            <div className="text-left text-gray-700 text-lg lg:text-xl leading-relaxed space-y-6">
              <p className="text-justify font-medium italic text-gray-600 border-l-4 border-teal-100 pl-6 py-2">
                As the Founder of Sehaat Saathi and TechSeva, I am honored to lead
                a mission that impacts the health and well-being of our
                community through technology and compassion.
              </p>
              <p className="text-justify font-medium">
                Our vision is to bridge the gap in healthcare accessibility using AI and
                smart diagnostic solutions. We believe that top-tier medical assistance
                shouldn't just be a luxury, but a reality for everyone, everywhere.
                Every decision we make at Sehaat Saathi is driven by our commitment to
                excellence, innovation, and digital-first care.
              </p>
              <p className="text-justify font-medium">
                Together with my dedicated team, I look forward to
                redefining the healthcare landscape and reaching new milestones in
                digital diagnostics.
              </p>
              <div className="pt-6">
                <p className="text-2xl font-black text-gray-900 tracking-tighter">- Abhishek Kumar</p>
                <p className="text-sm font-black text-teal-500 uppercase tracking-[0.3em]">Founder & CEO</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutChairman;
