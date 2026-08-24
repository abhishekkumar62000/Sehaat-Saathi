import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import founderAdvImg from '../assets/offline_booking_adv.png';
import {
    BsStars, BsActivity, BsShieldCheck, BsTruck, BsHouseHeartFill,
    BsArrowRight, BsInfoCircle, BsChatDots, BsPhone, BsCapsule, BsShieldFillPlus, BsBellFill, BsCpuFill, BsCameraFill, BsCartCheck, BsPeopleFill, BsDropletFill, BsHeartPulse, BsFileEarmarkMedical, BsInboxesFill, BsGenderFemale, BsFlower1, BsTreeFill, BsCart4, BsHospital, BsShieldLockFill, BsGeoAltFill
} from "react-icons/bs";
import { MdFitnessCenter } from "react-icons/md";
import useRecordActivity from '../hooks/useRecordActivity';

const Smarthub = () => {
    const { recordActivity } = useRecordActivity();

    useEffect(() => {
        recordActivity("Smart Hub", "Visit", "/smarthub");
    }, []);

    // Analytics removed as per user request. Optimized for a single-view experience.

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <div
                className="text-gray-800 pt-3 sm:pt-14 pb-10 sm:pb-24 px-3 sm:px-10 mb-8 sm:mb-10 overflow-hidden relative tri-color-mesh rounded-b-[50px] sm:rounded-b-[80px] shadow-2xl"
            >
                {/* Decorative Ashoka Chakra Silhouette - PRESERVED & 100% RESPONSIVE */}
                <div className="absolute top-1/2 left-1/2 lg:left-auto lg:right-[4%] xl:right-[8%] -translate-x-1/2 lg:translate-x-0 -translate-y-1/2 opacity-[0.22] sm:opacity-[0.16] lg:opacity-[0.18] pointer-events-none transition-all duration-300">
                    <div className="w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] lg:w-[460px] lg:h-[460px] xl:w-[540px] xl:h-[540px] border-[14px] sm:border-[20px] border-blue-900/90 rounded-full flex items-center justify-center animate-spin-slow shadow-2xl">
                        {[...Array(24)].map((_, i) => (
                            <div key={i} className="absolute h-full w-[1.5px] sm:w-[2px] bg-blue-900/90" style={{ transform: `rotate(${i * 15}deg)` }}></div>
                        ))}
                    </div>
                </div>
                {/* Stars Icon - PRESERVED */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 opacity-10">
                    <BsStars className="w-96 h-96 animate-pulse text-orange-600" />
                </div>

                {/* ECG Heartbeat Grid - Multiple Lines */}
                <div className="absolute top-1/4 left-0 w-full h-20 opacity-10 pointer-events-none overflow-hidden hidden md:block">
                    <svg className="w-full h-full animate-ecg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                        <path d="M0,50 L100,50 L110,20 L120,80 L130,50 L200,50 L210,10 L220,90 L230,50 L1000,50"
                            stroke="url(#smarthubEcg1)" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" strokeDasharray="1000" strokeDashoffset="1000" />
                        <defs>
                            <linearGradient id="smarthubEcg1" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="transparent" />
                                <stop offset="20%" stopColor="#FF9933" />
                                <stop offset="50%" stopColor="#138808" />
                                <stop offset="80%" stopColor="#000080" />
                                <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                <div className="absolute bottom-1/4 left-0 w-full h-20 opacity-10 pointer-events-none overflow-hidden hidden md:block">
                    <svg className="w-full h-full animate-ecg" viewBox="0 0 1000 100" preserveAspectRatio="none" style={{ animationDelay: '1.5s' }}>
                        <path d="M0,50 L150,50 L160,30 L170,70 L180,50 L250,50 L260,20 L270,80 L280,50 L1000,50"
                            stroke="url(#smarthubEcg2)" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" strokeDasharray="1000" strokeDashoffset="1000" />
                        <defs>
                            <linearGradient id="smarthubEcg2" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="transparent" />
                                <stop offset="20%" stopColor="#000080" />
                                <stop offset="50%" stopColor="#FF9933" />
                                <stop offset="80%" stopColor="#138808" />
                                <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Stethoscope Pulse Waves from Corners */}
                <div className="absolute top-0 left-0 w-40 h-40 border-4 border-emerald-400/15 rounded-full animate-pulse-ring pointer-events-none" style={{ animationDelay: '0s' }}></div>
                <div className="absolute top-0 left-0 w-40 h-40 border-4 border-blue-400/15 rounded-full animate-pulse-ring pointer-events-none" style={{ animationDelay: '1s' }}></div>

                <div className="absolute top-0 right-0 w-40 h-40 border-4 border-orange-400/15 rounded-full animate-pulse-ring pointer-events-none" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-0 right-0 w-40 h-40 border-4 border-green-400/15 rounded-full animate-pulse-ring pointer-events-none" style={{ animationDelay: '1.5s' }}></div>

                {/* Health Data Streams - Vertical */}
                {[...Array(5)].map((_, i) => (
                    <div key={`stream-${i}`}
                        className="absolute top-0 h-full opacity-10 pointer-events-none animate-data-stream hidden lg:block"
                        style={{
                            left: `${20 + i * 15}%`,
                            animationDelay: `${i * 2}s`,
                            animationDuration: `${10 + i * 2}s`
                        }}>
                        <div className="flex flex-col gap-8 text-3xl">
                            <span>+</span>
                            <span>❤️</span>
                            <span>+</span>
                            <span>💊</span>
                            <span>+</span>
                            <span>🩺</span>
                        </div>
                    </div>
                ))}

                {/* Floating Medical Molecules - DNA */}
                <div className="absolute top-20 left-10 opacity-8 pointer-events-none animate-float-dna hidden xl:block">
                    <svg width="100" height="200" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30 10 Q 70 35, 30 60 T 30 110 T 30 160" stroke="#FF9933" strokeWidth="2.5" />
                        <path d="M70 10 Q 30 35, 70 60 T 70 110 T 70 160" stroke="#138808" strokeWidth="2.5" />
                        <line x1="30" y1="35" x2="70" y2="35" stroke="#000080" strokeWidth="1.5" opacity="0.4" />
                        <line x1="30" y1="85" x2="70" y2="85" stroke="#000080" strokeWidth="1.5" opacity="0.4" />
                        <line x1="30" y1="135" x2="70" y2="135" stroke="#000080" strokeWidth="1.5" opacity="0.4" />
                    </svg>
                </div>

                <div className="absolute bottom-20 left-[15%] opacity-8 pointer-events-none animate-float-dna hidden xl:block" style={{ animationDelay: '2s' }}>
                    <svg width="80" height="160" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30 10 Q 70 35, 30 60 T 30 110 T 30 160" stroke="#000080" strokeWidth="2.5" />
                        <path d="M70 10 Q 30 35, 70 60 T 70 110 T 70 160" stroke="#FF9933" strokeWidth="2.5" />
                        <line x1="30" y1="35" x2="70" y2="35" stroke="#138808" strokeWidth="1.5" opacity="0.4" />
                        <line x1="30" y1="85" x2="70" y2="85" stroke="#138808" strokeWidth="1.5" opacity="0.4" />
                        <line x1="30" y1="135" x2="70" y2="135" stroke="#138808" strokeWidth="1.5" opacity="0.4" />
                    </svg>
                </div>

                {/* Heartbeat Particles */}
                {[...Array(8)].map((_, i) => (
                    <div key={`beat-${i}`}
                        className="absolute w-4 h-4 bg-red-400/30 rounded-full animate-heartbeat pointer-events-none"
                        style={{
                            top: `${15 + Math.random() * 70}%`,
                            left: `${10 + Math.random() * 80}%`,
                            animationDelay: `${Math.random() * 2}s`
                        }}>
                    </div>
                ))}

                {/* Medical Network Connections - Subtle Lines */}
                <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none hidden lg:block" xmlns="http://www.w3.org/2000/svg">
                    <line x1="10%" y1="20%" x2="30%" y2="80%" stroke="#FF9933" strokeWidth="1.5" strokeDasharray="5,5" className="animate-pulse" />
                    <line x1="70%" y1="30%" x2="90%" y2="70%" stroke="#138808" strokeWidth="1.5" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '1s' }} />
                    <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="#000080" strokeWidth="1.5" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                </svg>

                {/* === PREMIUM ELEMENTS === */}

                {/* Shimmer Sweeps */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-8 -z-10">
                    <div className="absolute w-[200%] h-[200%] bg-gradient-to-r from-transparent via-orange-200/20 to-transparent animate-shimmer"></div>
                </div>

                {/* Glowing Tech Badges */}
                <div className="absolute top-16 left-[10%] opacity-18 pointer-events-none hidden lg:block">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/25 to-blue-500/25 flex items-center justify-center animate-symbol-glow rotate-6">
                        <div className="text-2xl">🔬</div>
                    </div>
                </div>

                <div className="absolute bottom-16 right-[12%] opacity-18 pointer-events-none hidden lg:block">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/25 to-orange-500/25 flex items-center justify-center animate-symbol-glow -rotate-6" style={{ animationDelay: '1.3s' }}>
                        <div className="text-xl">🧬</div>
                    </div>
                </div>

                {/* Pulsing Circuit Nodes */}
                {[
                    { x: '8%', y: '25%', delay: '0s' },
                    { x: '92%', y: '30%', delay: '0.7s' },
                    { x: '12%', y: '75%', delay: '1.4s' },
                ].map((node, i) => (
                    <div key={`smart-node-${i}`}
                        className="absolute w-5 h-5 rounded-full bg-gradient-to-r from-orange-400 to-green-400 opacity-20 pointer-events-none animate-neural-pulse"
                        style={{ top: node.y, left: node.x, animationDelay: node.delay }}>
                        <div className="absolute inset-0 rounded-full bg-white/50 animate-ping" style={{ animationDuration: '2.5s' }}></div>
                    </div>
                ))}

                <div className="container mx-auto relative z-10 px-2 sm:px-6">
                    <div className="max-w-4xl">
                        {/* State & National Sovereignty Badge - COMPACT MOBILE POSITIONING */}
                        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/85 backdrop-blur-md mb-4 sm:mb-6 border-2 border-orange-400/50 shadow-md animate-pulse">
                            <span className="text-sm sm:text-lg shrink-0">🇮🇳</span>
                            <span className="text-[11px] sm:text-sm font-black tracking-wide uppercase bg-gradient-to-r from-orange-600 via-slate-900 to-green-700 bg-clip-text text-transparent">
                                बिहार व भारत का #1 डिजिटल इमरजेंसी व 100% लाइफ-सेविंग स्मार्ट हेल्थ हब
                            </span>
                            <BsStars className="text-orange-500 text-xs sm:text-sm animate-spin-slow shrink-0" />
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight tracking-tight text-slate-900 drop-shadow-sm">
                            Your <span style={{ color: "#FF9933" }} className="drop-shadow-md">Smart</span>{" "}
                            <span style={{ color: "#138808" }} className="drop-shadow-md">Health</span> Hub
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xs sm:text-base md:text-lg lg:text-xl text-slate-800 font-bold leading-relaxed mb-4 sm:mb-6">
                            <span className="text-orange-600 font-black">बिहार (मधुबनी, दरभंगा, पटना)</span> से लेकर <span className="text-green-700 font-black">पूरे भारत</span> के लिए — <span className="text-blue-700 underline font-black">घर बैठे डॉक्टर बुकिंग</span>, <span className="text-violet-700 font-black">Emergency Doctor Video Calling</span>, <span className="text-red-600 font-black">24/7 लाइफलाइन एम्बुलेंस</span>, <span className="text-rose-600 font-black">इमरजेंसी ब्लड बैंक</span>, <span className="text-emerald-700 font-black">घर पर नर्सिंग व फिजियोथेरेपी</span> से लेकर <span className="text-cyan-700 font-black">लाइव ICU बेड, ऑक्सीजन व वेंटिलेटर ट्रैकिंग</span> तक!
                        </p>

                        {/* Quick Highlights Pills */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-black mb-4 sm:mb-6">
                            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-orange-500/10 text-orange-700 border border-orange-300 shadow-sm">
                                👨‍⚕️ घर बैठे डॉक्टर बुकिंग
                            </span>
                            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-blue-500/10 text-blue-700 border border-blue-300 shadow-sm">
                                📹 Emergency Doctor Video Calling
                            </span>
                            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-red-500/10 text-red-700 border border-red-300 shadow-sm">
                                🚑 24/7 एम्बुलेंस (50+ Fleet)
                            </span>
                            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-rose-500/10 text-rose-700 border border-rose-300 shadow-sm">
                                🩸 आपातकालीन ब्लड बैंक
                            </span>
                            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 border border-emerald-300 shadow-sm">
                                🩺 घर पर नर्सिंग व फिजियोथेरेपी
                            </span>
                            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-cyan-500/10 text-cyan-700 border border-cyan-300 shadow-sm">
                                🏥 रियल-टाइम ICU बेड व वेंटिलेटर
                            </span>
                        </div>

                        {/* Founder Advertisement Showcase Image Pose - VISIBLE ON MOBILE/TABLET, HIDDEN ON DESKTOP */}
                        <div className="mt-4 sm:mt-6 flex justify-center items-center lg:hidden">
                            <img
                                src={founderAdvImg}
                                alt="Sehaat Saathi Founder"
                                className="max-h-56 sm:max-h-72 md:max-h-88 w-auto object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-300 pointer-events-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-0">
                {/* Section Header */}
                <div className="flex flex-wrap gap-4 mb-10 sm:mb-16 tri-glass p-4 sm:p-6 md:p-8 rounded-3xl sm:rounded-[40px] static md:sticky top-24 z-40 items-center justify-between shadow-2xl border-2 border-orange-300/40">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="p-3.5 sm:p-4 bg-gradient-to-tr from-[#FF9933] via-white to-[#138808] rounded-2xl shadow-2xl">
                            <BsStars className="text-slate-900 text-2xl animate-spin-slow" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 uppercase tracking-tight">
                                <span style={{ color: "#FF9933" }}>Sehaat</span> <span style={{ color: "#138808" }}>Saathi</span> <span className="text-slate-900">Life-Saving Services</span>
                            </h2>
                            <p className="text-[10px] sm:text-xs font-black text-slate-600 uppercase tracking-wider">
                                🇮🇳 बिहार व पूरे भारत के लिए 100% सत्यापित डिजिटल स्वास्थ्य सेवाएं
                            </p>
                        </div>
                    </div>
                </div>

                {/* Feature Sections - Grid layout directly displayed */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 animate-slide-up">
                    <Link to="/doctor-ai">
                        <FeatureRoadmapCard
                            icon={<BsChatDots />}
                            title={
                                <span>
                                    <span style={{ color: "#FF9933" }}>Sehaat</span>{" "}
                                    <span style={{ color: "#138808" }}>Saathi</span> Doctor Chatbot
                                </span>
                            }
                            desc="Instant one-on-one health chat like Gemini. Ask symptoms, get diet advice and medical guidance."
                            color="blue"
                            status="Live"
                        />
                    </Link>
                    <Link to="/offline-consultation">
                        <FeatureRoadmapCard
                            icon={<BsHospital className="animate-pulse text-[#000080]" />}
                            title={
                                <span>
                                    <span style={{ color: "#FF9933" }}>Sehaat</span>{" "}
                                    <span style={{ color: "#138808" }}>Saathi</span> <span className="text-[#000080]">Offline Doctor Booking</span>
                                </span>
                            }
                            desc="Book a visit to the best doctors and hospitals. See wait times and get ready before you arrive."
                            color="tiranga"
                            status="New & Premier"
                            outstanding={true}
                            example={{
                                patient: "Need a Cardiologist in Madhubani for an offline visit.",
                                ai: "Found 3 verified Doctors. Dr. Jha (8.2km) has 'Low Rush' right now. Booking slot for 4:00 PM."
                            }}
                        />
                    </Link>
                    <Link to="/tele-consult">
                        <FeatureRoadmapCard
                            icon={<BsPhone className="animate-bounce-slow" />}
                            title={
                                <span>
                                    <span style={{ color: "#FF9933" }}>Sehaat</span>{" "}
                                    <span style={{ color: "#138808" }}>Saathi</span> Instant Video Consultations Hub
                                </span>
                            }
                            desc="Talk to top specialist doctors in seconds via private video calls. Includes instant prescriptions and health monitoring."
                            color="green"
                            status="Live & Premium"
                            outstanding={true}
                            example={{
                                patient: "I need an urgent cardiologist consult for chest tightness.",
                                ai: "Analyzing vitals... SpO2 98%, Pulse-Rate 82. Connecting you to Dr. Verma (Senior Cardiologist) in 15 seconds."
                            }}
                        />
                    </Link>
                    <Link to="/online-video-booking">
                        <FeatureRoadmapCard
                            icon={<BsCameraFill className="animate-pulse text-violet-600" />}
                            title={
                                <span>
                                    <span style={{ color: "#FF9933" }}>Sehaat</span>{" "}
                                    <span style={{ color: "#138808" }}>Saathi</span> <span className="text-violet-700">Online Video Call Doctor Booking</span>
                                </span>
                            }
                            desc="Book a scheduled video call with verified doctors. Choose your time slot, share symptoms, and consult via Google Meet or Zoom — pay online and get your meeting link instantly."
                            color="purple"
                            status="New Launch 🎥"
                            outstanding={true}
                            example={{
                                patient: "I need a Dermatologist for a skin issue. I am free at 5 PM tomorrow.",
                                ai: "Booking confirmed with Dr. Sharma for 5:00 PM. Google Meet link sent to your email. Fee: ₹499."
                            }}
                        />
                    </Link>
                    <Link to="/ambulance-booking">
                        <FeatureRoadmapCard
                            icon={<BsTruck className="animate-bounce-slow text-red-600" />}
                            title={
                                <span>
                                    <span style={{ color: "#FF9933" }}>Sehaat</span>{" "}
                                    <span style={{ color: "#138808" }}>Saathi</span> <span className="text-red-600">Ambulance Booking Services</span>
                                </span>
                            }
                            desc="Instant 2-Minute Emergency Ambulance Dispatch. Book BLS, ALS Cardiac, Portable ICU Ventilator, & Neonatal Ambulances with live GPS tracking and emergency hospital bed sync."
                            color="red"
                            status="24/7 Emergency 🚑"
                            outstanding={true}
                            example={{
                                patient: "Need an Urgent ICU Ventilator Ambulance in Madhubani for cardiac emergency.",
                                ai: "Dispatched ALS Ambulance (BR-32-PA-108). Driver Ramesh (4 mins away). Live GPS tracking & hospital ICU bed pre-booked."
                            }}
                        />
                    </Link>
                    <Link to="/blood-bank-hub">
                        <FeatureRoadmapCard
                            icon={<BsDropletFill className="animate-bounce text-rose-600" />}
                            title={
                                <span>
                                    <span style={{ color: "#FF9933" }}>Sehaat</span>{" "}
                                    <span style={{ color: "#138808" }}>Saathi</span> <span className="text-rose-600">Emergency Blood Bank Services</span>
                                </span>
                            }
                            desc="24/7 Emergency Blood Assistance Platform. Urgent blood coordination across Madhubani & Bihar for A+, B+, O+, AB+, O- & Rare Groups with verified blood banks & voluntary donors network."
                            color="red"
                            status="24/7 Emergency 🩸"
                            outstanding={true}
                            example={{
                                patient: "Need 2 Units of O Negative (O-) Blood Urgently for surgery at Madhubani Sadar Hospital.",
                                ai: "Request Received (BLD-882109). Sehaat Ground Team dispatched O- units from Red Cross Center. Attendant contacted."
                            }}
                        />
                    </Link>
                    <Link to="/home-healthcare">
                        <FeatureRoadmapCard
                            icon={<BsHouseHeartFill className="animate-pulse text-emerald-500" />}
                            title={
                                <span>
                                    <span style={{ color: "#FF9933" }}>Sehaat</span>{" "}
                                    <span style={{ color: "#138808" }}>Saathi</span> <span className="text-emerald-500">Home Healthcare Services</span>
                                </span>
                            }
                            desc="Book Certified Home Nurses, Elderly Care Attendants, Post-Surgery Caregivers, Home Physiotherapy & Lab Tests at Home across Madhubani & Bihar with Verified Medical Professionals."
                            color="green"
                            status="New Feature 🏠"
                            outstanding={true}
                            example={{
                                patient: "I need a trained home nurse for dressing and IV injections for my post-op father in Madhubani.",
                                ai: "Nurse Sunita Kumari (B.Sc Nursing, 8 Yrs Exp) assigned for 10:00 AM slot. Care Coordinator assigned."
                            }}
                        />
                    </Link>
                    <Link to="/symptom-checker">
                        <FeatureRoadmapCard
                            icon={<BsStars className="animate-spin-slow" />}
                            title={
                                <span>
                                    <span style={{ color: "#FF9933" }}>Sehaat</span>{" "}
                                    <span style={{ color: "#138808" }}>Saathi</span> AI Symptom Checker
                                </span>
                            }
                            desc="Type symptoms, e.g., 'Headache since morning'. Get instant possible diagnosis. Personalized reports based on your medical history."
                            color="purple"
                            status="In Beta"
                            example={{
                                patient: "I have a sore throat and fever.",
                                ai: "These symptoms indicate possible flu. Drink warm fluids and take rest."
                            }}
                        />
                    </Link>
                    <Link to="/hospital-availability">
                        <FeatureRoadmapCard
                            icon={<BsHeartPulse className="animate-pulse" />}
                            title={
                                <span>
                                    <span style={{ color: "#FF9933" }}>Sehaat</span>{" "}
                                    <span style={{ color: "#138808" }}>Saathi</span> Live Hospital OPD & Bed Availability System
                                </span>
                            }
                            desc="Real-time hospital discovery for emergencies. Find ICU beds, oxygen, ventilators, and OPD slots instantly. AI-powered priority sorting during critical situations. Life-saving system for India."
                            color="red"
                            status="Life-Saving"
                            example={{
                                patient: "Emergency! Need ICU bed with ventilator in 10km radius.",
                                ai: "AI Search Complete: 2 hospitals found. Apollo (3.2km): 5 ICU beds, 3 ventilators available. Fortis (7km): 12 ICU beds. Priority alert sent."
                            }}
                        />
                    </Link>
                    <Link to="/pharmacy-hub">
                        <FeatureRoadmapCard
                            icon={<BsCartCheck className="animate-bounce" />}
                            title={
                                <span>
                                    <span style={{ color: "#FF9933" }}>Sehaat</span>{" "}
                                    <span style={{ color: "#138808" }}>Saathi</span> Pharmacy-Hub
                                </span>
                            }
                            desc="India's Premiere AI-Powered Pharmacy. Order 10000+ medicines, wellness gear, and surgical kits with 45-min express delivery."
                            color="emerald"
                            status="Upcoming"
                            example={{
                                patient: "I need regular insulin and B12 supplements.",
                                ai: <>Found in stock! Added to your <span style={{ color: "#FF9933" }}>Sehaat</span> <span style={{ color: "#138808" }}>Saathi</span> Cart. Your 15% subscriber discount applied. Delivery in 38 mins.</>
                            }}
                        />
                    </Link>
                    <Link to="/medicine-suggestion">
                        <FeatureRoadmapCard
                            icon={<BsCapsule className="animate-bounce-slow" />}
                            title={
                                <span>
                                    <span style={{ color: "#FF9933" }}>Sehaat</span>{" "}
                                    <span style={{ color: "#138808" }}>Saathi</span> Allopathic medicine Hub
                                </span>
                            }
                            desc="Instant AI guidance on 10000+ medicines, dosage, and frequency. Sourced from WHO, FDA, and global medical databases."
                            color="rose"
                            status="Live"
                            example={{
                                patient: "I have a fever.",
                                ai: "If you have a fever, you can take Paracetamol 500mg every 6 hours."
                            }}
                        />
                    </Link>
                    <Link to="/homeopathy-hub">
                        <FeatureRoadmapCard
                            icon={<BsFlower1 className="animate-bounce-slow text-emerald-400" />}
                            title={
                                <span>
                                    <span style={{ color: "#FF9933" }}>Sehaat</span>{" "}
                                    <span style={{ color: "#138808" }}>Saathi</span> Homeopathy Hub
                                </span>
                            }
                            desc="Natural AI mapping for 1000+ homeopathic remedies. Guidance on dilutions (30C/200C), constitutional healing, and safe first-aid."
                            color="emerald"
                            status="Sovereign Elite v5.0"
                            example={{
                                patient: "I have a sudden high fever with a red face.",
                                ai: "Belladonna 30C is often used for sudden, intense fevers with redness. Dissolve pellets under the tongue."
                            }}
                        />
                    </Link>
                    <Link to="/ayurveda-hub">
                        <FeatureRoadmapCard
                            icon={<BsTreeFill className="animate-bounce-slow text-amber-500" />}
                            title={
                                <span>
                                    <span style={{ color: "#FF9933" }}>Sehaat</span>{" "}
                                    <span style={{ color: "#138808" }}>Saathi</span> Ayurveda Medicine Hub
                                </span>
                            }
                            desc="Ancient wisdom meets AI. 1000+ authentic Ayurvedic medicines with dosage, timing, and benefits in Hindi & English. Triphala, Ashwagandha, Brahmi, and more."
                            color="amber"
                            status="Sovereign Elite v5.0"
                            example={{
                                patient: "I have weak digestion and low energy.",
                                ai: "Triphala Churna (1 tsp with warm water at night) aids digestion. Ashwagandha (500mg twice daily) boosts energy naturally."
                            }}
                        />
                    </Link>
                    <Link to="/naturopathy-hub">
                        <FeatureRoadmapCard
                            icon={<BsFlower1 className="animate-bounce-slow text-green-500" />}
                            title={
                                <span>
                                    <span style={{ color: "#FF9933" }}>Sehaat</span>{" "}
                                    <span style={{ color: "#138808" }}>Saathi</span> Naturopathy & Lifestyle Hub 🌿
                                </span>
                            }
                            desc="Disease prevention & lifestyle correction. 700+ Natural remedies (no pills) using Diet, Mud, Water & Yoga. Zero side effects."
                            color="emerald"
                            status="Sovereign Elite v4.0"
                            example={{
                                patient: "I have high BP and need a natural cure.",
                                ai: "Mud Therapy coupled with DASH Diet can naturally lower BP. Try a Cold Spinal Bath for 20 mins."
                            }}
                        />
                    </Link>
                    <Link to="/nutrition-hub">
                        <FeatureRoadmapCard
                            icon={<BsCart4 className="animate-bounce-slow text-lime-500" />}
                            title={
                                <span>
                                    <span style={{ color: "#FF9933" }}>Sehaat</span>{" "}
                                    <span style={{ color: "#138808" }}>Saathi</span> Nutrition Hub 🥗
                                </span>
                            }
                            desc="India's 1st AI Kitchen. Multi-condition diet merging, Seasonal logic & ICMR-compliant guidance. World-class medical nutrition."
                            color="lime"
                            status="National Sovereign v4.0"
                            outstanding={true}
                            example={{
                                patient: "I have Diabetes + Hypertension. Suggest an Indian lunch.",
                                ai: "Analyzing Intersection: Selected Brown Rice + Spinach Dal (Low Salt). Added Turmeric booster for immunity."
                            }}
                        />
                    </Link>
                    <Link to="/emergency-protocols">
                        <FeatureRoadmapCard
                            icon={<BsShieldFillPlus className="animate-pulse" />}
                            title={
                                <span>
                                    <span style={{ color: "#FF9933" }}>Sehaat</span>{" "}
                                    <span style={{ color: "#138808" }}>Saathi</span> Emergency Protocols
                                </span>
                            }
                            desc="Critical AI guidance for chest pain, stroke, or bleeding. Step-by-step first-aid and instant ambulance linkage."
                            color="red"
                            status="New"
                            example={{
                                patient: "I have chest pain and breathing problems.",
                                ai: "These could be symptoms of a heart attack. Call 102 immediately and take Aspirin if safe."
                            }}
                        />
                    </Link>

                    <Link to="/personalized-health">
                        <FeatureRoadmapCard
                            icon={<BsCpuFill className="animate-spin-slow" />}
                            title={
                                <span>
                                    <span style={{ color: "#FF9933" }}>Sehaat</span>{" "}
                                    <span style={{ color: "#138808" }}>Saathi</span> Personalized Health AI
                                </span>
                            }
                            desc="Customized treatment advice, diet charts, and lifestyle changes based on your unique Health Twin profile."
                            color="cyan"
                            status="Beta"
                            example={{
                                patient: "I have a cough and I'm 30 years old.",
                                ai: "Since you have a cough, drinking warm tea with honey might help soothe your throat. Avoid cold drinks."
                            }}
                        />
                    </Link>
                    <Link to="/skin-diagnosis">
                        <FeatureRoadmapCard
                            icon={<BsCameraFill className="animate-pulse" />}
                            title={
                                <span>
                                    <span style={{ color: "#FF9933" }}>Sehaat</span>{" "}
                                    <span style={{ color: "#138808" }}>Saathi</span> AI Skin Diagnosis
                                </span>
                            }
                            desc="Detect skin conditions, rashes, and infections using advanced neural image processing via your device camera."
                            color="violet"
                            status="Upcoming"
                            example={{
                                patient: "[Uploads Image of a rash]",
                                ai: "Neural analysis suggests a 78% probability of a Heat Rash. Keep the area cool and use Calamine lotion."
                            }}
                        />
                    </Link>
                    <Link to="/express-track">
                        <FeatureRoadmapCard
                            icon={<BsTruck />}
                            title={
                                <span>
                                    <span style={{ color: "#FF9933" }}>Sehaat</span>{" "}
                                    <span style={{ color: "#138808" }}>Saathi</span> Express
                                </span>
                            }
                            desc="Real-time live tracking of home sample collection technicians. See them moving on the map!"
                            color="orange"
                            status="Live Demo"
                        />
                    </Link>


                    <Link to="/blood-bank">
                        <FeatureRoadmapCard
                            icon={<BsDropletFill className="animate-pulse text-red-500" />}
                            title={
                                <span>
                                    <span style={{ color: "#FF9933" }}>Sehaat</span>{" "}
                                    <span style={{ color: "#138808" }}>Saathi</span> BloodBank
                                </span>
                            }
                            desc="AI-Powered Life-Saving Network (Full Suite v6.0). Ek Call, Ek App, Ek Zindagi."
                            color="red"
                            status="Life-Saving"
                            example={{
                                patient: "Emergency! Need 2 units of O-negative blood.",
                                ai: "Searching 50km radius... 3 eligible donors found. Ambulance link & SOS alerts dispatched."
                            }}
                        />
                    </Link>


                    <Link to="/report-interpreter">
                        <FeatureRoadmapCard
                            icon={<BsFileEarmarkMedical className="animate-pulse" />}
                            title={
                                <span>
                                    <span style={{ color: "#FF9933" }}>Sehaat</span>{" "}
                                    <span style={{ color: "#138808" }}>Saathi</span> AI Medical Report Interpreter
                                </span>
                            }
                            desc="Upload any medical report (PDF/Image) and get an instant, easy-to-understand explanation in Hindi or English. AI extracts key values and explains what they mean."
                            color="emerald"
                            status="New"
                            example={{
                                patient: "[Uploads Blood Test Report]",
                                ai: "Your Hemoglobin is perfect (12.5), but Fasting Sugar (115) is slightly high. I suggest reducing sweets and increasing daily walk."
                            }}
                        />
                    </Link>
                    <Link to="/medicine-finder">
                        <FeatureRoadmapCard
                            icon={<BsInboxesFill className="animate-pulse" />}
                            title={
                                <span>
                                    <span style={{ color: "#FF9933" }}>Sehaat</span>{" "}
                                    <span style={{ color: "#138808" }}>Saathi</span> Medicine Shortage & Alternative Finder
                                </span>
                            }
                            desc="Can't find prescribed medicine? AI se safe doctor-approved alternatives dhundho aur nearby pharmacy stock live check karo."
                            color="indigo"
                            status="New"
                            example={{
                                patient: "Dolo 650 is not available anywhere.",
                                ai: "Don't worry. Calpol 650 or P-650 have the same Paracetamol salt. Apollo Pharmacy (0.8km) has 5 units in stock."
                            }}
                        />
                    </Link>
                    <Link to="/medicine-price-compare">
                        <FeatureRoadmapCard
                            icon={<BsCartCheck className="animate-bounce" />}
                            title={
                                <span>
                                    <span style={{ color: "#FF9933" }}>Sehaat</span>{" "}
                                    <span style={{ color: "#138808" }}>Saathi</span> Medicine Price Comparison Engine 💊
                                </span>
                            }
                            desc="India's first Neural Price Optimizer. Compare 1mg, PharmEasy, and local stores with OCR Prescription scanning."
                            color="emerald"
                            status="Sovereign Elite v8.0"
                            outstanding={true}
                            example={{
                                patient: "Upload prescription for my full month course.",
                                ai: "Prescription Scanned: 4 Meds found. Optimized Basket: 1mg (2) + PharmEasy (2) saves ₹450 total!"
                            }}
                        />
                    </Link>
                    <Link to="/ambulance-dispatch">
                        <FeatureRoadmapCard
                            icon={<BsTruck className="animate-bounce" />}
                            title={
                                <span>
                                    <span style={{ color: "#FF9933" }}>Sehaat</span>{" "}
                                    <span style={{ color: "#138808" }}>Saathi</span> Smart Ambulance Dispatch & Tracking System
                                </span>
                            }
                            desc="Emergency? Book nearest Basic/ICU ambulance with live GPS tracking and auto-priority assignment. Save lives with transparency."
                            color="red"
                            status="New"
                            example={{
                                patient: "Emergency! Accident at Sector 14. Need ambulance now.",
                                ai: "Priority: HIGH. Closest ICU Ambulance (Driver: Ramesh) assigned. ETA: 4 mins. Live tracking active."
                            }}
                        />
                    </Link>
                    <Link to="/women-care">
                        <FeatureRoadmapCard
                            icon={<BsGenderFemale className="animate-pulse" />}
                            title={
                                <span>
                                    <span style={{ color: "#FF9933" }}>Sehaat</span>{" "}
                                    <span style={{ color: "#138808" }}>Saathi</span> Women & Pregnancy Emergency Care Hub (+ Safe Haven)
                                </span>
                            }
                            desc="A complete maternal safety net & confidential sisterhood. Real-time pregnancy monitoring, danger sign alerts (bleeding/pain), and a 100% Private Safe Haven for sensitive health consultations free from judgment."
                            color="rose"
                            status="Guardian & Safe Space"
                            example={{
                                patient: "I missed my period and I'm scared to tell anyone at home.",
                                ai: <>I hear you. Enabling 'Ghost Mode' (No History). You are safe. Connecting you to a confidential, female gynecologist now. Your secret is safe with <span style={{ color: "#FF9933" }}>Sehaat</span> <span style={{ color: "#138808" }}>Saathi</span>.</>
                            }}
                        />
                    </Link>


                    {/* === SATELLITE AI HUB (STREAMLIT) === */}
                    <a href="https://sehaat-saathi-your-ai-doctor-chatbot.streamlit.app/" target="_blank" rel="noopener noreferrer">
                        <FeatureRoadmapCard
                            icon={<BsStars className="animate-spin-slow text-blue-500" />}
                            title={
                                <span>
                                    <span style={{ color: "#FF9933" }}>Satellite</span>{" "}
                                    <span style={{ color: "#138808" }}>Neural</span> Hub
                                </span>
                            }
                            desc="Access our powerful external Streamlit AI Engine for deep diagnostics and global health news insights. High-speed neural extension."
                            color="tiranga"
                            status="External AI"
                            outstanding={true}
                            example={{
                                patient: "Check latest global health news about new virus variants.",
                                ai: "Accessing Global Hub... Pulling real-time news data from verified medical sources. Analysis complete."
                            }}
                        />
                    </a>


                    <Link to="/health-copilot">
                        <FeatureRoadmapCard
                            icon={<BsShieldCheck className="animate-pulse text-blue-600" />}
                            title={
                                <span>
                                    <span style={{ color: "#FF9933" }}>AI Health</span>{" "}
                                    <span style={{ color: "#138808" }}>Copilot</span>
                                </span>
                            }
                            desc="India's first Neural Health Command Center. Track trends, calculate risk scores, and get daily AI health guidance."
                            color="tiranga"
                            status="National Sovereign Elite"
                            outstanding={true}
                            example={{
                                patient: "Log my BP: 140/90. How is my health today?",
                                ai: "Warning: Rising BP trend detected. Health Score: 68. Tip: Reduce salt intake and walk 20 mins."
                            }}
                        />
                    </Link>
                </div>
            </div>

        </div>
    );
};

const FeatureRoadmapCard = ({ icon, title, desc, color, status, example, outstanding }) => {
    const colorClasses = {
        orange: 'from-orange-400 to-orange-500 text-orange-500 bg-orange-50',
        blue: 'from-blue-400 to-blue-500 text-blue-500 bg-blue-50',
        green: 'from-green-400 to-green-500 text-green-500 bg-green-50',
        purple: 'from-purple-400 to-purple-600 text-purple-600 bg-purple-50',
        rose: 'from-rose-400 to-rose-500 text-rose-500 bg-rose-50',
        red: 'from-red-500 to-red-600 text-red-600 bg-red-50',
        emerald: 'from-emerald-400 to-emerald-600 text-emerald-600 bg-emerald-50',
        cyan: 'from-cyan-400 to-cyan-600 text-cyan-600 bg-cyan-50',
        violet: 'from-violet-400 to-violet-600 text-violet-600 bg-violet-50',
        indigo: 'from-indigo-400 to-indigo-600 text-indigo-600 bg-indigo-50',
        amber: 'from-amber-400 to-amber-600 text-amber-600 bg-amber-50',
        lime: 'from-lime-400 to-lime-600 text-lime-600 bg-lime-50',
        tiranga: 'from-[#FF9933] to-[#138808] text-[#000080] bg-white'
    };

    // Safety fallback to prevent crash if color is missing
    const safeColorClass = colorClasses[color] || colorClasses.emerald;

    return (
        <div className={`tri-glass rounded-[40px] p-4 sm:p-6 md:p-8 lg:p-10 transition-all hover:-translate-y-3 group h-full flex flex-col relative overflow-hidden ${outstanding ? 'ring-4 ring-[#FF9933]/20 shadow-2xl' : ''} ${color === 'tiranga' ? 'bg-gradient-to-br from-[#FF9933]/10 via-white to-[#138808]/10 border border-[#FF9933]/20' : ''}`}>
            {outstanding && (
                <div className={`absolute top-0 right-0 text-white text-[9px] font-black px-4 py-1 rounded-bl-2xl z-20 animate-pulse tracking-widest shadow-lg ${color === 'tiranga' ? 'bg-gradient-to-r from-[#FF9933] via-white to-[#138808] text-[#000080]' : 'bg-lime-500'}`}>
                    BEST CHOICE
                </div>
            )}
            <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 md:mb-8 transition-all group-hover:scale-110 group-hover:rotate-12 shadow-inner ${safeColorClass.split(' ').slice(2).join(' ')} ${color === 'tiranga' ? 'border-2 border-[#FF9933]/20 shadow-lg' : ''}`}>
                <span className="text-2xl sm:text-2xl md:text-3xl">{icon}</span>
            </div>

            <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gray-100 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest">
                    {status}
                </div>
                {status === 'In Beta' && (
                    <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-ping"></span>
                )}
            </div>

            <h3 className="text-lg sm:text-xl md:text-2xl font-black mb-3 sm:mb-4 text-gray-900 tracking-tighter leading-tight">{title}</h3>
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed mb-4 sm:mb-6 md:mb-8">
                {desc}
            </p>

            {/* Example Preview - Always visible on mobile, hover on desktop */}
            {example && (
                <div className="block sm:hidden sm:group-hover:block animate-fade-in mb-3 sm:mb-6 p-2.5 sm:p-4 bg-slate-50/90 rounded-xl sm:rounded-2xl border border-dashed border-slate-300">
                    <p className="text-[9px] sm:text-[10px] font-black uppercase text-slate-500 mb-1.5 tracking-tighter">Live Example:</p>
                    <div className="space-y-1.5">
                        <div className="flex gap-1.5">
                            <span className="text-[11px] sm:text-xs font-black text-slate-700 shrink-0">P:</span>
                            <span className="text-[11px] sm:text-xs text-slate-600 italic">"{example.patient}"</span>
                        </div>
                        <div className="flex gap-1.5">
                            <span className="text-[11px] sm:text-xs font-black text-purple-600 shrink-0">AI:</span>
                            <span className="text-[11px] sm:text-xs text-slate-700 font-medium">"{example.ai}"</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-auto pt-4 sm:pt-6 border-t border-gray-50 flex justify-between items-center bg-transparent">
                <span className="text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">Launch App</span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white bg-gradient-to-r ${safeColorClass.split(' ').slice(0, 2).join(' ')} shadow-lg`}>
                    <BsArrowRight />
                </div>
            </div>
        </div>
    );
};

export default Smarthub;
