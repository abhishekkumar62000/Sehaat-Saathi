import { BsTelephone, BsEnvelope, BsGeoAlt, BsClock, BsSend } from "react-icons/bs";
import bgImg from "../assets/images/bgImg.png";
import contactImg from "../assets/images/home/contactImg.svg";

const Contact = () => {
  const contactInfo = [
    {
      icon: <BsTelephone />,
      title: "Call Us",
      details: ["(+91) 6200087830", "9470074183"],
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: <BsEnvelope />,
      title: "Email Us",
      details: ["support@sehaatsaathi.com"],
      color: "text-teal-500",
      bg: "bg-teal-50"
    },
    {
      icon: <BsGeoAlt />,
      title: "Visit Us",
      details: ["Bara Bazar Madhubani", "Bihar, India - 847211"],
      color: "text-red-500",
      bg: "bg-red-50"
    },
    {
      icon: <BsClock />,
      title: "Open Hours",
      details: ["Mon - Sat: 8AM - 8PM", "Sunday: Emergency Only"],
      color: "text-amber-500",
      bg: "bg-amber-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Header */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-[#1d7a6e] text-white">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover' }}></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl font-black mb-6">Contact Us</h1>
          <p className="text-xl text-teal-100 max-w-2xl mx-auto">
            We are here to support your health journey. Reach out anytime via the form below or our direct contact channels.
          </p>
        </div>
      </section>

      {/* Contact Cards Grid */}
      <section className="container mx-auto px-6 -translate-y-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[32px] shadow-xl border border-white hover:-translate-y-2 transition-all duration-500 group">
              <div className={`w-14 h-14 ${info.bg} ${info.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                {info.icon}
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-3">{info.title}</h3>
              {info.details.map((detail, i) => (
                <p key={i} className="text-gray-500 font-medium">{detail}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="container mx-auto px-6 pb-24">
        <div className="lg:flex gap-16 items-center">
          {/* Left Side Illustration */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:flex hidden justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-teal-200 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <img src={contactImg} alt="Contact Us" className="relative w-full max-w-md animate-float" />
            </div>
          </div>

          {/* Right Side Form */}
          <div className="lg:w-1/2">
            <div className="bg-white/80 backdrop-blur-xl p-10 lg:p-12 rounded-[48px] shadow-2xl border border-white">
              <h2 className="text-3xl font-black text-gray-800 mb-8">Send a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" placeholder="Full Name" className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-100 transition-all font-medium" />
                  <input type="email" placeholder="Email Address" className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-100 transition-all font-medium" />
                </div>
                <input type="text" placeholder="Subject" className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-100 transition-all font-medium" />
                <textarea rows="5" placeholder="Your Message" className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-100 transition-all font-medium resize-none"></textarea>

                <button className="w-full py-5 bg-gradient-to-r from-[#2eb8a6] to-[#1d7a6e] text-white font-black text-xl rounded-2xl shadow-xl hover:shadow-teal-100 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group">
                  Send Message
                  <BsSend className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Contact;
