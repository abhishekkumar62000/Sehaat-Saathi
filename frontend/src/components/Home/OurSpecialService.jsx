import { Link } from "react-router-dom";
import { FaRobot, FaUserMd, FaAmbulance } from "react-icons/fa";
import { BsCapsule } from "react-icons/bs";

const OurSpecialService = () => {
    const services = [
        {
            id: 1,
            icon: <FaRobot className="text-5xl text-teal-500" />,
            title: "AI-Powered Instant Diagnosis With Chatbot",
            description:
                "Accurate Diagnostics, Swift Results: Quick symptom analysis and treatment suggestions.",
            link: "/services",
        },
        {
            id: 2,
            icon: <FaUserMd className="text-5xl text-teal-500" />,
            title: "24/7 Doctor Consultation",
            description:
                "Video calls and offline slot booking with specialists..",
            link: "/doctors",
        },
        {
            id: 3,
            icon: <FaAmbulance className="text-5xl text-teal-500" />,
            title: "Emergency Ambulance Booking",
            description: "Immediate access to emergency medical services.",
            link: "/contact",
        },
        {
            id: 4,
            icon: <BsCapsule className="text-5xl text-teal-500" />,
            title: "Medicine & First-Aid Guide",
            description: "Interactive OTC suggestions and SOS first-aid protocols.",
            link: "#medicine-hub",
        },
    ];

    return (
        <section className="container mx-auto px-4 lg:px-16 py-12 mb-10">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                        Our Special service
                    </h2>
                    <p className="text-gray-600 lg:max-w-2xl">
                        Beyond simply providing medical care, our commitment lies in
                        delivering unparalleled service tailored to your unique needs.
                    </p>
                </div>
                <Link
                    to="/services"
                    className="hidden lg:block border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white px-6 py-2 rounded-md font-semibold transition-all duration-300"
                >
                    Ask A Service
                </Link>
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 group hover:-translate-y-2"
                    >
                        {/* Icon with Background */}
                        <div className="bg-teal-50 w-20 h-20 rounded-full flex items-center justify-center mb-6 group-hover:bg-teal-100 transition-colors duration-300">
                            {service.icon}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            {service.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            {service.description}
                        </p>

                        {/* Learn More Link */}
                        {service.link.startsWith('#') ? (
                            <a
                                href={service.link}
                                className="text-teal-500 font-semibold hover:text-teal-600 inline-flex items-center group-hover:gap-2 transition-all duration-300"
                            >
                                Learn More
                                <span className="ml-1 group-hover:ml-2 transition-all duration-300">
                                    →
                                </span>
                            </a>
                        ) : (
                            <Link
                                to={service.link}
                                className="text-teal-500 font-semibold hover:text-teal-600 inline-flex items-center group-hover:gap-2 transition-all duration-300"
                            >
                                Learn More
                                <span className="ml-1 group-hover:ml-2 transition-all duration-300">
                                    →
                                </span>
                            </Link>
                        )}
                    </div>
                ))}
            </div>

            {/* Mobile Ask A Service Button */}
            <div className="lg:hidden mt-8 text-center">
                <Link
                    to="/services"
                    className="inline-block border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white px-8 py-3 rounded-md font-semibold transition-all duration-300"
                >
                    Ask A Service
                </Link>
            </div>
        </section>
    );
};

export default OurSpecialService;
