import { Link } from "react-router-dom";
import { FaRobot, FaHospital, FaVideo, FaStethoscope } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";

const OurSpecialService = () => {
    const services = [
        {
            id: 1,
            icon: <FaRobot />,
            title: "AI Doctor Chatbot",
            subtitle: "Sehaat Saathi",
            description: "Instant one-on-one health chat. Ask symptoms, get diet advice and medical guidance powered by AI.",
            badge: "AI Powered",
            link: "/doctor-ai",
            iconColor: "text-blue-600",
            iconBg: "bg-blue-50",
            badgeColor: "bg-blue-100 text-blue-700",
            titleGradient: "from-blue-600 to-indigo-700",
            borderHover: "hover:border-blue-400",
            shadowHover: "hover:shadow-blue-100",
            btnGradient: "from-blue-600 to-indigo-600",
            number: "01",
        },
        {
            id: 2,
            icon: <FaHospital />,
            title: "Offline Doctor Booking",
            subtitle: "Sehaat Saathi",
            description: "Book visits to the best doctors and hospitals. See wait times and get ready before you arrive.",
            badge: "New & Premier",
            link: "/offline-consultation",
            iconColor: "text-orange-600",
            iconBg: "bg-orange-50",
            badgeColor: "bg-orange-100 text-orange-700",
            titleGradient: "from-orange-500 to-red-600",
            borderHover: "hover:border-orange-400",
            shadowHover: "hover:shadow-orange-100",
            btnGradient: "from-orange-500 to-red-500",
            number: "02",
        },
        {
            id: 3,
            icon: <FaVideo />,
            title: "Online Instant Video Consultation",
            subtitle: "Sehaat Saathi",
            description: "Talk to top specialist doctors instantly via private video calls. Get prescriptions in minutes.",
            badge: "Live & Premium",
            link: "/tele-consult",
            iconColor: "text-emerald-600",
            iconBg: "bg-emerald-50",
            badgeColor: "bg-emerald-100 text-emerald-700",
            titleGradient: "from-emerald-500 to-teal-600",
            borderHover: "hover:border-emerald-400",
            shadowHover: "hover:shadow-emerald-100",
            btnGradient: "from-emerald-500 to-teal-500",
            number: "03",
        },
        {
            id: 4,
            icon: <FaStethoscope />,
            title: "AI Symptom Checker",
            subtitle: "Sehaat Saathi",
            description: "Type your symptoms and get instant possible diagnosis with personalized health reports.",
            badge: "AI Intelligence",
            link: "/symptom-checker",
            iconColor: "text-violet-600",
            iconBg: "bg-violet-50",
            badgeColor: "bg-violet-100 text-violet-700",
            titleGradient: "from-violet-600 to-purple-700",
            borderHover: "hover:border-violet-400",
            shadowHover: "hover:shadow-violet-100",
            btnGradient: "from-violet-600 to-purple-600",
            number: "04",
        },
        {
            id: 5,
            icon: <BsCartCheck />,
            title: "Pharmacy Hub",
            subtitle: "Sehaat Saathi",
            description: "India's AI-Powered Pharmacy. Order 10000+ medicines, wellness gear with 45-min express delivery.",
            badge: "Fast Delivery",
            link: "/pharmacy-hub",
            iconColor: "text-teal-600",
            iconBg: "bg-teal-50",
            badgeColor: "bg-teal-100 text-teal-700",
            titleGradient: "from-teal-500 to-cyan-600",
            borderHover: "hover:border-teal-400",
            shadowHover: "hover:shadow-teal-100",
            btnGradient: "from-teal-500 to-cyan-500",
            number: "05",
        },
    ];

    return (
        <section className="container mx-auto px-4 lg:px-16 py-20 mb-20 relative overflow-hidden tri-color-mesh rounded-[3rem] sm:rounded-[80px] border border-white/40 shadow-2xl backdrop-blur-md">
            {/* Background Decorative Aura */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] -z-10"></div>

            {/* ECG Heartbeat Line */}
            <div className="absolute top-1/3 left-0 w-full h-24 opacity-15 pointer-events-none overflow-hidden -z-10 hidden md:block">
                <svg className="w-full h-full animate-ecg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                    <path d="M0,50 L150,50 L160,20 L170,80 L180,50 L250,50 L260,10 L270,90 L280,50 L450,50 L460,30 L470,70 L480,50 L1000,50"
                        stroke="url(#featuresEcgGradient2)" strokeWidth="2.5" fill="none" vectorEffect="non-scaling-stroke" strokeDasharray="1000" strokeDashoffset="1000" />
                    <defs>
                        <linearGradient id="featuresEcgGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="20%" stopColor="#FF9933" />
                            <stop offset="50%" stopColor="#138808" />
                            <stop offset="80%" stopColor="#000080" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* DNA Helix Strands */}
            <div className="absolute top-10 left-5 opacity-8 pointer-events-none animate-float-dna hidden xl:block" style={{ animationDelay: '1s' }}>
                <svg width="120" height="250" viewBox="0 0 100 200" fill="none">
                    <path d="M30 10 Q 70 35, 30 60 T 30 110 T 30 160" stroke="#000080" strokeWidth="3" />
                    <path d="M70 10 Q 30 35, 70 60 T 70 110 T 70 160" stroke="#FF9933" strokeWidth="3" />
                    <line x1="30" y1="35" x2="70" y2="35" stroke="#138808" strokeWidth="1.5" opacity="0.5" />
                    <line x1="30" y1="85" x2="70" y2="85" stroke="#138808" strokeWidth="1.5" opacity="0.5" />
                    <line x1="30" y1="135" x2="70" y2="135" stroke="#138808" strokeWidth="1.5" opacity="0.5" />
                </svg>
            </div>

            <div className="absolute bottom-10 right-5 opacity-8 pointer-events-none animate-float-dna hidden xl:block" style={{ animationDelay: '3s' }}>
                <svg width="100" height="220" viewBox="0 0 100 200" fill="none">
                    <path d="M30 10 Q 70 35, 30 60 T 30 110 T 30 160" stroke="#138808" strokeWidth="3" />
                    <path d="M70 10 Q 30 35, 70 60 T 70 110 T 70 160" stroke="#000080" strokeWidth="3" />
                    <line x1="30" y1="35" x2="70" y2="35" stroke="#FF9933" strokeWidth="1.5" opacity="0.5" />
                    <line x1="30" y1="85" x2="70" y2="85" stroke="#FF9933" strokeWidth="1.5" opacity="0.5" />
                    <line x1="30" y1="135" x2="70" y2="135" stroke="#FF9933" strokeWidth="1.5" opacity="0.5" />
                </svg>
            </div>

            {/* Shimmer */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5 -z-10">
                <div className="absolute w-[150%] h-[150%] bg-gradient-to-r from-transparent via-orange-300/30 to-transparent animate-shimmer"></div>
            </div>

            {/* Header Section */}
            <div className="flex flex-col items-center justify-center mb-16 gap-6 relative z-10 text-center max-w-5xl mx-auto">
                <div className="w-full">
                    <h2 className="text-[clamp(32px,8vw,80px)] font-black text-slate-900 mb-6 tracking-tighter uppercase leading-[0.85]">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-green-600 drop-shadow-[0_0_15px_rgba(255,153,51,0.3)] animate-pulse">Smart Hub</span> Portal
                    </h2>
                    <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs opacity-80">
                        World-Class Healthcare for Everyone, Made Simple with AI
                    </p>
                </div>
                <Link to="/smarthub" className="tri-btn group relative overflow-hidden">
                    <span className="relative z-10">Explore All Services</span>
                    <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </Link>
            </div>

            {/* ====== REDESIGNED CARDS ====== */}
            <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                    {services.map((service) => (
                        <Link
                            key={service.id}
                            to={service.link}
                            className={`group relative bg-white rounded-3xl border-2 border-slate-100 ${service.borderHover} shadow-md hover:shadow-xl ${service.shadowHover} transition-all duration-500 hover:-translate-y-2 flex flex-col overflow-hidden`}
                        >
                            {/* Number tag top-right */}
                            <div className="absolute top-4 right-4 text-[11px] font-black text-slate-200 group-hover:text-slate-300 transition-colors duration-300 select-none">
                                {service.number}
                            </div>

                            {/* Top color bar */}
                            <div className={`h-1.5 w-full bg-gradient-to-r ${service.btnGradient} group-hover:h-2 transition-all duration-500`}></div>

                            <div className="p-6 flex flex-col h-full">
                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-400`}>
                                    <span className={`text-3xl ${service.iconColor}`}>
                                        {service.icon}
                                    </span>
                                </div>

                                {/* Badge */}
                                <span className={`inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${service.badgeColor} mb-4 w-fit`}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-current inline-block animate-pulse"></span>
                                    {service.badge}
                                </span>

                                {/* Subtitle (Sehaat Saathi) */}
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
                                    {service.subtitle}
                                </p>

                                {/* HIGHLIGHTED Feature Title */}
                                <h3 className={`text-base md:text-lg font-black bg-gradient-to-br ${service.titleGradient} bg-clip-text text-transparent uppercase tracking-tight leading-tight mb-4 group-hover:scale-105 origin-left transition-transform duration-300`}>
                                    {service.title}
                                </h3>

                                {/* Separator */}
                                <div className={`w-8 h-0.5 bg-gradient-to-r ${service.btnGradient} rounded-full mb-4 group-hover:w-14 transition-all duration-500`}></div>

                                {/* Description */}
                                <p className="text-slate-500 text-[11px] md:text-xs leading-relaxed mb-6 flex-1">
                                    {service.description}
                                </p>

                                {/* CTA */}
                                <div className={`flex items-center justify-between py-2.5 px-4 rounded-xl bg-gradient-to-r ${service.btnGradient} text-white text-[10px] font-black uppercase tracking-wider mt-auto shadow-sm group-hover:shadow-md transition-shadow duration-300`}>
                                    <span>Explore Hub</span>
                                    <span className="group-hover:translate-x-1 transition-transform duration-300 text-sm">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurSpecialService;

