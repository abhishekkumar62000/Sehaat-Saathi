import { BsSend, BsTelephone, BsEnvelope, BsGeoAlt } from "react-icons/bs";
import contactImg from "../../assets/images/home/contact.gif";

const ContactSection = () => {
  return (
    <section className="container mb-24 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl -z-10 opacity-60 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-50 rounded-full blur-3xl -z-10 opacity-60 animate-pulse"></div>

      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800 relative inline-block">
          Get In Touch
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-gradient-to-r from-[#2eb8a6] to-[#fca311] rounded-full"></span>
        </h2>
        <p className="mt-6 text-gray-500 max-w-2xl mx-auto font-medium">
          Have questions or need assistance? Reach out to our team of experts. We are here to help you move towards a healthier life.
        </p>
      </div>

      <div className="lg:flex gap-16 items-start bg-white/40 backdrop-blur-xl p-8 lg:p-12 rounded-[40px] border border-white shadow-2xl">
        {/* Left Side: Visuals & Quick Info */}
        <div className="lg:w-5/12 hidden lg:flex flex-col gap-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-teal-100 rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700"></div>
            <img src={contactImg} alt="Contact Illustration" className="relative rounded-3xl transform group-hover:scale-105 transition-transform duration-700" />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-4 p-4 bg-white/60 rounded-2xl border border-teal-50 shadow-sm hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-[#2eb8a6] group-hover:bg-[#2eb8a6] group-hover:text-white transition-colors">
                <BsGeoAlt className="text-xl" />
              </div>
              <div>
                <p className="text-xs font-bold text-teal-600 uppercase tracking-widest">Our Center</p>
                <p className="text-sm font-bold text-gray-700">Bara Bazar, Madhubani, Bihar</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="w-full lg:w-7/12">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group relative">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  className="w-full px-6 py-4 bg-white/80 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-[#2eb8a6] transition-all text-gray-700 font-medium placeholder:text-gray-300"
                />
              </div>
              <div className="group relative">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-6 py-4 bg-white/80 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-[#2eb8a6] transition-all text-gray-700 font-medium placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="group relative">
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-6 py-4 bg-white/80 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-[#2eb8a6] transition-all text-gray-700 font-medium placeholder:text-gray-300"
              />
            </div>

            <div className="group relative">
              <textarea
                rows="4"
                placeholder="How can we help you?"
                className="w-full px-6 py-4 bg-white/80 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-[#2eb8a6] transition-all text-gray-700 font-medium placeholder:text-gray-300 resize-none"
              />
            </div>

            <button className="relative w-full lg:w-max px-12 py-4 bg-gradient-to-r from-[#2eb8a6] to-[#1d7a6e] text-white font-black text-lg rounded-2xl shadow-xl hover:shadow-teal-200 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3 overflow-hidden group">
              <span className="relative z-10 flex items-center gap-3">
                Send Message
                <BsSend className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
