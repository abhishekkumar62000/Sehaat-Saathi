import { Link } from "react-router-dom";
import { FaRobot, FaUserMd, FaAmbulance } from "react-icons/fa";
import { BsCapsule } from "react-icons/bs";

const OurSpecialService = () => {
    const services = [
        {
            id: 1,
            icon: <FaRobot className="text-5xl text-orange-600" />,
            title: "Sentient AI Diagnostics",
            description:
                "Pulse-speed symptom analysis and hyper-accurate treatment path suggestions.",
            link: "/services",
        },
        {
            id: 2,
            icon: <FaUserMd className="text-5xl text-blue-800" />,
            title: "Elite Doctor Network",
            description:
                "Sovereign encrypted video calls and offline slot booking with India's finest.",
            link: "/doctors",
        },
        {
            id: 3,
            icon: <FaAmbulance className="text-5xl text-green-700" />,
            title: "Patriotic SOS Dispatch",
            description: "Instant access to a unified emergency ambulance tracking network.",
            link: "/contact",
        },
        {
            id: 4,
            icon: <BsCapsule className="text-5xl text-orange-500" />,
            title: "Smart Pharmacy Hub",
            description: "Interactive AI-guided OTC suggestions and SOS first-aid protocols.",
            link: "#medicine-hub",
        },
    ];

    return (
        <section className="container mx-auto px-4 lg:px-16 py-20 mb-20 relative overflow-hidden tri-color-mesh rounded-[3rem] sm:rounded-[80px] border border-white/40 shadow-2xl backdrop-blur-3xl">
            {/* Background Decorative Aura - Preserved */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] -z-10"></div>

            {/* ECG Heartbeat Line */}
            <div className="absolute top-1/3 left-0 w-full h-24 opacity-15 pointer-events-none overflow-hidden -z-10 hidden md:block">
                <svg className="w-full h-full animate-ecg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                    <path d="M0,50 L150,50 L160,20 L170,80 L180,50 L250,50 L260,10 L270,90 L280,50 L450,50 L460,30 L470,70 L480,50 L1000,50"
                        stroke="url(#featuresEcgGradient)" strokeWidth="2.5" fill="none" vectorEffect="non-scaling-stroke" strokeDasharray="1000" strokeDashoffset="1000" />
                    <defs>
                        <linearGradient id="featuresEcgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="20%" stopColor="#FF9933" />
                            <stop offset="50%" stopColor="#138808" />
                            <stop offset="80%" stopColor="#000080" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Floating Medical Icons */}
            {[
                { icon: '💊', top: '15%', left: '5%', delay: '0s', duration: '8s' },
                { icon: '🩺', top: '70%', left: '8%', delay: '2s', duration: '10s' },
                { icon: '💉', top: '25%', right: '10%', delay: '1s', duration: '9s' },
                { icon: '❤️', top: '80%', right: '5%', delay: '3s', duration: '11s' },
                { icon: '💊', top: '40%', left: '90%', delay: '4s', duration: '7s' },
                { icon: '🩺', top: '60%', right: '85%', delay: '1.5s', duration: '9.5s' }
            ].map((item, i) => (
                <div key={`med-icon-${i}`}
                    className="absolute opacity-10 pointer-events-none animate-float-dna text-4xl hidden lg:block"
                    style={{
                        top: item.top,
                        left: item.left,
                        right: item.right,
                        animationDelay: item.delay,
                        animationDuration: item.duration
                    }}>
                    {item.icon}
                </div>
            ))}

            {/* Pulse Wave Rings from Corners */}
            <div className="absolute top-0 left-0 w-32 h-32 border-4 border-blue-400/20 rounded-full animate-pulse-ring pointer-events-none -z-10" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-0 left-0 w-32 h-32 border-4 border-green-400/20 rounded-full animate-pulse-ring pointer-events-none -z-10" style={{ animationDelay: '1s' }}></div>

            <div className="absolute bottom-0 right-0 w-32 h-32 border-4 border-orange-400/20 rounded-full animate-pulse-ring pointer-events-none -z-10" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-4 border-blue-400/20 rounded-full animate-pulse-ring pointer-events-none -z-10" style={{ animationDelay: '1.5s' }}></div>

            {/* Medical Cross Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none -z-10 hidden lg:block">
                <div className="grid grid-cols-8 grid-rows-6 h-full w-full gap-16 p-16">
                    {[...Array(48)].map((_, i) => (
                        <div key={`cross-${i}`}
                            className="flex items-center justify-center text-slate-400 text-2xl font-bold animate-medical-cross"
                            style={{ animationDelay: `${Math.random() * 4}s` }}>
                            +
                        </div>
                    ))}
                </div>
            </div>

            {/* DNA Helix Strands - Smaller than Hero */}
            <div className="absolute top-10 left-5 opacity-8 pointer-events-none animate-float-dna hidden xl:block" style={{ animationDelay: '1s' }}>
                <svg width="120" height="250" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30 10 Q 70 35, 30 60 T 30 110 T 30 160" stroke="#000080" strokeWidth="3" />
                    <path d="M70 10 Q 30 35, 70 60 T 70 110 T 70 160" stroke="#FF9933" strokeWidth="3" />
                    <line x1="30" y1="35" x2="70" y2="35" stroke="#138808" strokeWidth="1.5" opacity="0.5" />
                    <line x1="30" y1="85" x2="70" y2="85" stroke="#138808" strokeWidth="1.5" opacity="0.5" />
                    <line x1="30" y1="135" x2="70" y2="135" stroke="#138808" strokeWidth="1.5" opacity="0.5" />
                </svg>
            </div>

            <div className="absolute bottom-10 right-5 opacity-8 pointer-events-none animate-float-dna hidden xl:block" style={{ animationDelay: '3s' }}>
                <svg width="100" height="220" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30 10 Q 70 35, 30 60 T 30 110 T 30 160" stroke="#138808" strokeWidth="3" />
                    <path d="M70 10 Q 30 35, 70 60 T 70 110 T 70 160" stroke="#000080" strokeWidth="3" />
                    <line x1="30" y1="35" x2="70" y2="35" stroke="#FF9933" strokeWidth="1.5" opacity="0.5" />
                    <line x1="30" y1="85" x2="70" y2="85" stroke="#FF9933" strokeWidth="1.5" opacity="0.5" />
                    <line x1="30" y1="135" x2="70" y2="135" stroke="#FF9933" strokeWidth="1.5" opacity="0.5" />
                </svg>
            </div>

            {/* Heartbeat Pulse Dots */}
            {[...Array(6)].map((_, i) => (
                <div key={`pulse-dot-${i}`}
                    className="absolute w-3 h-3 bg-red-400/40 rounded-full animate-heartbeat pointer-events-none -z-10"
                    style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${10 + Math.random() * 80}%`,
                        animationDelay: `${Math.random() * 2}s`
                    }}>
                </div>
            ))}

            {/* === PREMIUM ELEMENTS === */}

            {/* Glowing Circuit Nodes */}
            {[
                { x: '10%', y: '15%', size: 'w-3 h-3', delay: '0s' },
                { x: '90%', y: '20%', size: 'w-2 h-2', delay: '0.5s' },
                { x: '15%', y: '85%', size: 'w-4 h-4', delay: '1s' },
                { x: '85%', y: '80%', size: 'w-3 h-3', delay: '1.5s' },
            ].map((circuit, i) => (
                <div key={`circuit-${i}`}
                    className={`absolute ${circuit.size} rounded-full bg-gradient-to-r from-orange-400 to-green-400 opacity-25 pointer-events-none animate-neural-pulse -z-10`}
                    style={{ top: circuit.y, left: circuit.x, animationDelay: circuit.delay }}>
                    <div className="absolute inset-0 rounded-full bg-white/60 animate-ping" style={{ animationDuration: '3s' }}></div>
                </div>
            ))}

            {/* Subtle Shimmer Sweeps */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5 -z-10">
                <div className="absolute w-[150%] h-[150%] bg-gradient-to-r from-transparent via-orange-300/30 to-transparent animate-shimmer"></div>
            </div>

            {/* Medical Badge Constellation */}
            <div className="absolute top-5 left-5 opacity-15 pointer-events-none hidden lg:block">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-green-500/20 flex items-center justify-center animate-symbol-glow">
                    <div className="text-xl">🏥</div>
                </div>
            </div>

            <div className="absolute bottom-5 right-5 opacity-15 pointer-events-none hidden lg:block">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center animate-symbol-glow" style={{ animationDelay: '1.2s' }}>
                    <div className="text-lg">🔬</div>
                </div>
            </div>

            {/* Header Section */}
            <div className="flex flex-col items-center justify-center mb-20 gap-8 relative z-10 text-center max-w-5xl mx-auto">
                <div className="w-full">
                    <h2 className="text-[clamp(32px,8vw,80px)] font-black text-slate-900 mb-6 tracking-tighter uppercase leading-[0.85]">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-green-600">Smart Hub</span> Portal
                    </h2>
                    <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs opacity-80">
                        Democratizing Elite Medical Care Through Sentient AI Integration
                    </p>
                </div>
                <Link
                    to="/services"
                    className="tri-btn group relative overflow-hidden"
                >
                    <span className="relative z-10">Request Elite Service</span>
                    <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </Link>
            </div>

            {/* Service Cards Grid */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="tri-glass rounded-[2.5rem] p-8 sm:p-10 transition-all duration-700 hover:-translate-y-4 group flex flex-col items-center text-center shadow-xl border-t-8 border-t-[#FF9933] relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            {/* Icon with Background */}
                            <div className="bg-slate-50 w-24 h-24 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-white shadow-inner transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 border border-slate-100">
                                {service.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tighter leading-tight uppercase h-[60px] flex items-center">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                                {service.description}
                            </p>

                            {/* Learn More Link */}
                            {service.link.startsWith('#') ? (
                                <a
                                    href={service.link}
                                    className="text-orange-600 font-black uppercase tracking-widest text-xs hover:text-green-700 inline-flex items-center gap-2 transition-all duration-300"
                                >
                                    Explore Hub →
                                </a>
                            ) : (
                                <Link
                                    to={service.link}
                                    className="text-orange-600 font-black uppercase tracking-widest text-xs hover:text-green-700 inline-flex items-center gap-2 transition-all duration-300"
                                >
                                    Explore Hub →
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
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
