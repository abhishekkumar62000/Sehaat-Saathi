import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import aboutImage from "../../assets/images/About.png";

const AboutSection = () => {
    const features = [
        "AI-Powered Virtual Doctor Chatbot",
        "AI Symptom Checker & Instant Diagnosis",
        "Medicine Suggestions & First-Aid Guidance",
        "Emergency Ambulance Booking",
        "Instant Video Call Doctor Consultation",
        "Offline Doctor Slot Booking (All Specialties)",
        "Medicine Ordering & Lab Test Booking",
        "Health Records & Reminders",
    ];

    return (
        <section className="container mx-auto px-4 lg:px-16 py-16 mb-20 relative overflow-hidden tri-color-mesh rounded-[2.5rem] sm:rounded-[60px] shadow-2xl border border-white/40 backdrop-blur-3xl">
            {/* Decorative Background Ashoka Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-blue-500/5 rounded-full blur-[80px] sm:blur-[120px] -z-10 animate-pulse"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left Content */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-[clamp(28px,8vw,80px)] font-black text-slate-900 mb-8 leading-[0.9] tracking-tighter uppercase">
                            Our <span style={{ color: "#FF9933" }}>Legacy</span> & <span style={{ color: "#138808" }}>Vision</span>
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            <span className="font-bold">
                                <span style={{ color: "#FF9933" }}>Sehaat</span> <span style={{ color: "#138808" }}>Saathi</span> is India's 1st AI Powered Virtual HealthCare Platform
                            </span> designed for
                            remote consultations, emergency healthcare, and personalized
                            treatment. It provides AI-based symptom checking, instant diagnosis,
                            and medicine suggestions.
                        </p>
                    </div>

                    <div className="tri-glass p-6 rounded-[30px] border-l-8 border-l-[#FF9933]">
                        <p className="text-slate-800 font-black text-xl leading-relaxed italic">
                            "Democratizing elite healthcare for every corner of Bharat, powered by Sentient AI and Patriotic Dedication."
                        </p>
                    </div>

                    {/* Features List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-4 group">
                                <div className="w-8 h-8 rounded-xl bg-white shadow-md flex items-center justify-center group-hover:bg-green-600 transition-all duration-300">
                                    <FaCheckCircle className="text-[#138808] text-lg group-hover:text-white transition-colors" />
                                </div>
                                <p className="text-gray-800 font-black text-sm uppercase tracking-tighter">{feature}</p>
                            </div>
                        ))}
                    </div>

                    <div className="pt-8">
                        <Link
                            to="/about"
                            className="tri-btn inline-block"
                        >
                            Explore Our Mission
                        </Link>
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative group w-full max-w-lg mx-auto lg:max-w-none">
                    <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-[#FF9933] via-white to-[#138808] rounded-[2rem] sm:rounded-[50px] blur-2xl sm:blur-3xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
                    <div className="relative rounded-[2rem] sm:rounded-[50px] overflow-hidden shadow-2xl border-[6px] sm:border-[12px] border-white/80 backdrop-blur-md">
                        <img
                            src={aboutImage}
                            alt="Sehaat Saathi Medical Team"
                            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-1000"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
