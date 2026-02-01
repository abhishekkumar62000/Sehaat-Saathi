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
        <section className="container mx-auto px-4 lg:px-16 py-16 mb-20 relative overflow-hidden">
            {/* Decorative Background Blob */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-50 rounded-full blur-[100px] -z-10 opacity-60"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left Content */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                            About <span className="text-[#2eb8a6]">Us</span>
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            <span className="font-bold text-[#009E60]">Sehaat Saathi is India's 1st AI Powered Virtual HealthCare Platform</span> designed for
                            remote consultations, emergency healthcare, and personalized
                            treatment. It provides AI-based symptom checking, instant diagnosis,
                            and medicine suggestions.
                        </p>
                    </div>

                    <p className="text-gray-800 font-bold text-xl border-l-4 border-[#2eb8a6] pl-4 py-2 bg-teal-50/50 rounded-r-xl">
                        Our mission is to provide quality healthcare services to all individuals.
                    </p>

                    {/* Features List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3 group">
                                <FaCheckCircle className="text-[#2eb8a6] text-xl flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <p className="text-gray-700 font-medium">{feature}</p>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4">
                        <Link
                            to="/about"
                            className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-[#2eb8a6] to-[#1d7a6e] text-white font-black text-lg rounded-2xl shadow-xl hover:shadow-teal-200 hover:-translate-y-1 transition-all"
                        >
                            Learn More About Us
                        </Link>
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-tr from-teal-100 to-transparent rounded-[40px] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                    <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
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
