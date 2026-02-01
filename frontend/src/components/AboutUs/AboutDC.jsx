import {
  FaUserMd, FaStethoscope, FaPills, FaFirstAid, FaBell, FaHandHoldingHeart,
  FaRobot, FaMicroscope, FaHeartbeat, FaPrescriptionBottleAlt, FaBrain, FaBookMedical,
  FaFileInvoiceDollar, FaDumbbell, FaLanguage
} from "react-icons/fa";

const AboutDC = () => {
  const coreFeatures = [
    { icon: <FaRobot />, text: "AI-powered Virtual Doctor Chatbot" },
    { icon: <FaStethoscope />, text: "AI-Based Symptom Checker" },
    { icon: <FaPills />, text: "AI-Based Medicine Suggestion (General)" },
    { icon: <FaFirstAid />, text: "Emergency Protocols & First-Aid Assistance" },
    { icon: <FaBell />, text: "Follow-up Reminders & Symptom Monitoring" },
    { icon: <FaUserMd />, text: "Doctor Consultation Integration" },
  ];

  const advancedFeatures = [
    { icon: <FaHandHoldingHeart />, text: "AI-Based Personalized Health Recommendations" },
    { icon: <FaHeartbeat />, text: "Smart Wearable Integration (Heart, BP, O2)" },
    { icon: <FaMicroscope />, text: "AI Image Processing for Skin & Self-Diagnosis" },
    { icon: <FaPrescriptionBottleAlt />, text: "Pharmacy & Medicine Ordering Integration" },
    { icon: <FaBrain />, text: "AI-Based Mental Health Assistance" },
    { icon: <FaBookMedical />, text: "AI-Powered Health Education & Blogs" },
  ];

  const businessFeatures = [
    { icon: <FaFileInvoiceDollar />, text: "Health Insurance & Coverage Suggestion" },
    { icon: <FaDumbbell />, text: "AI-Generated Diet & Fitness Plans" },
    { icon: <FaLanguage />, text: "Multilingual AI Support (Regional Languages)" },
  ];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Header */}
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-teal-100 -z-10"></div>
        <h2 className="inline-block px-10 bg-white text-3xl lg:text-4xl font-black text-gray-900 tracking-tighter">
          Next-Gen <span className="text-[#2eb8a6]">Diagnostics Center</span>
        </h2>
      </div>

      <div className="space-y-16">
        {/* Intro */}
        <section className="bg-gradient-to-br from-teal-50/50 to-white p-8 lg:p-12 rounded-[40px] border border-teal-100">
          <p className="text-gray-700 text-lg lg:text-xl leading-relaxed text-center font-medium">
            Welcome to <span className="text-[#2eb8a6] font-black">Sehaat Saathi</span>, your premier AI-driven diagnostic hub.
            We are redefining healthcare by merging traditional diagnostic excellence with
            cutting-edge Artificial Intelligence to provide faster, smarter, and more accessible medical solutions.
          </p>
        </section>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Category A: Core AI */}
          <div className="group space-y-6">
            <div className="p-6 bg-white rounded-[32px] shadow-sm border border-gray-100 group-hover:border-teal-200 transition-all group-hover:shadow-xl group-hover:-translate-y-2 h-full">
              <div className="w-14 h-14 bg-teal-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-teal-100">
                <FaRobot size={28} />
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-6">Core AI Healthcare</h3>
              <ul className="space-y-4">
                {coreFeatures.map((f, i) => (
                  <li key={i} className="flex gap-3 items-center group/item">
                    <span className="text-teal-500 font-bold bg-teal-50 p-2 rounded-lg group-hover/item:bg-teal-500 group-hover/item:text-white transition-colors">
                      {f.icon}
                    </span>
                    <span className="text-sm font-bold text-gray-600 group-hover/item:text-gray-900 transition-colors">{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Category B: Advanced AI */}
          <div className="group space-y-6">
            <div className="p-6 bg-white rounded-[32px] shadow-sm border border-gray-100 group-hover:border-amber-200 transition-all group-hover:shadow-xl group-hover:-translate-y-2 h-full">
              <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-amber-100">
                <FaBrain size={28} />
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-6">Advanced AI (Expansion)</h3>
              <ul className="space-y-4">
                {advancedFeatures.map((f, i) => (
                  <li key={i} className="flex gap-3 items-center group/item">
                    <span className="text-amber-500 font-bold bg-amber-50 p-2 rounded-lg group-hover/item:bg-amber-500 group-hover/item:text-white transition-colors">
                      {f.icon}
                    </span>
                    <span className="text-sm font-bold text-gray-600 group-hover/item:text-gray-900 transition-colors">{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Category C: Business */}
          <div className="group space-y-6">
            <div className="p-6 bg-white rounded-[32px] shadow-sm border border-gray-100 group-hover:border-blue-200 transition-all group-hover:shadow-xl group-hover:-translate-y-2 h-full">
              <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-100">
                <FaFileInvoiceDollar size={28} />
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-6">Business & Monetization</h3>
              <ul className="space-y-4">
                {businessFeatures.map((f, i) => (
                  <li key={i} className="flex gap-3 items-center group/item">
                    <span className="text-blue-500 font-bold bg-blue-50 p-2 rounded-lg group-hover/item:bg-blue-500 group-hover/item:text-white transition-colors">
                      {f.icon}
                    </span>
                    <span className="text-sm font-bold text-gray-600 group-hover/item:text-gray-900 transition-colors">{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Vision/Values */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          <div className="p-10 bg-white rounded-[40px] shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
            <h4 className="text-[#2eb8a6] font-black text-2xl mb-4">Our Vision</h4>
            <p className="text-gray-600 font-medium leading-relaxed">
              To become the world's most trusted AI healthcare companion,
              making complex diagnostics as simple as a conversation.
            </p>
          </div>
          <div className="p-10 bg-white rounded-[40px] shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
            <h4 className="text-[#2eb8a6] font-black text-2xl mb-4">Core Values</h4>
            <p className="text-gray-600 font-medium leading-relaxed">
              Accuracy, Innovation, and Accessibility are the three pillars
              that drive every AI model we build for our community.
            </p>
          </div>
        </section>

        {/* Closing */}
        <div className="text-center pt-8">
          <p className="text-gray-400 font-black uppercase tracking-widest text-sm">Thank you for choosing Sehaat Saathi</p>
        </div>
      </div>
    </div>
  );
};

export default AboutDC;
