import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    BsTruck, BsGeoAltFill, BsCheckCircleFill,
    BsPersonBadge, BsTelephoneFill, BsClockHistory,
    BsArrowLeft, BsChatLeftDotsFill, BsSendFill, BsStarFill, BsX
} from "react-icons/bs";
import userAvatar from "../assets/images/icons/patient-avatar.png";

const ExpressTrack = () => {
    const [status, setStatus] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Namaste! I'm Amit, your Sehaat Saathi technician. I'm on my way.", sender: 'bot', time: '10:36 AM' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [showRating, setShowRating] = useState(false);
    const [rating, setRating] = useState(0);
    const chatEndRef = useRef(null);

    // Status steps
    const steps = [
        { label: "Request Received", time: "10:30 AM" },
        { label: "Technician Assigned", time: "10:35 AM" },
        { label: "Out for Collection", time: "10:45 AM" },
        { label: "Arrived at Location", time: "11:05 AM" },
    ];

    // Simulate movement and status updates
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setShowRating(true);
                    return 100;
                }
                return prev + 1;
            });
        }, 200);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (progress > 20 && status === 0) setStatus(1);
        if (progress > 50 && status === 1) setStatus(2);
        if (progress > 98 && status === 2) setStatus(3);
    }, [progress, status]);

    // Handle Chat Simulation
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg = { text: inputValue, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');

        // Technician reply simulation
        setTimeout(() => {
            const botMsg = { text: "Thik hai sir, I'll reach there in 10 mins. Please keep your ID proof ready.", sender: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
            setMessages(prev => [...prev, botMsg]);
        }, 1500);
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="min-h-screen bg-slate-50 pb-20 font-sans">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link to="/smarthub" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600">
                            <BsArrowLeft className="text-xl" />
                        </Link>
                        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <BsTruck className="text-green-600 text-2xl" /> Sehaat Saathi Express
                        </h1>
                    </div>
                    <div className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase animate-pulse">
                        Live
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left Column: Live Map Simulation */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 relative aspect-video mid-h-[400px]">
                            {/* Fake Map Background */}
                            <div className="absolute inset-0 bg-[#f8f9fa] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
                                {/* Landmarks */}
                                <div className="absolute left-[20%] top-[40%] text-slate-300 font-bold text-xs uppercase tracking-widest pointer-events-none opacity-40">Bara Bazar Chowk</div>
                                <div className="absolute left-[60%] top-[30%] text-slate-300 font-bold text-xs uppercase tracking-widest pointer-events-none opacity-40">Medical Hub</div>

                                {/* Simulated Path */}
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 500">
                                    <path
                                        id="trackPath"
                                        d="M 100 400 Q 300 150 500 300 T 900 100"
                                        fill="none"
                                        stroke="#e2e8f0"
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M 100 400 Q 300 150 500 300 T 900 100"
                                        fill="none"
                                        stroke="#16a34a"
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                        strokeDasharray="1500"
                                        strokeDashoffset={1500 - (1500 * progress / 100)}
                                        className="transition-all duration-300"
                                    />
                                </svg>

                                {/* Destination Marker */}
                                <div className="absolute left-[90%] top-[20%] -translate-x-1/2 -translate-y-full flex flex-col items-center">
                                    <div className="bg-white px-3 py-1 rounded-full shadow-lg border border-slate-200 text-xs font-bold mb-1">
                                        Home
                                    </div>
                                    <BsGeoAltFill className="text-red-500 text-4xl drop-shadow-md" />
                                </div>

                                {/* Moving Bike Marker - Simple linear approximation for the demo */}
                                <div
                                    className="absolute transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2"
                                    style={{
                                        left: `${10 + (80 * progress / 100)}%`,
                                        top: `${80 - (60 * progress / 100)}%`
                                    }}
                                >
                                    <div className="bg-green-600 p-3 rounded-2xl shadow-xl text-white transform -rotate-12 animate-bounce flex items-center justify-center">
                                        <BsTruck className="text-2xl" />
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-xs font-bold text-slate-700 tracking-wider">EN ROUTE • {progress}% COMPLETE</span>
                            </div>
                        </div>

                        {/* Features Info */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[
                                { l: 'Status', v: 'On Track', c: 'text-green-600' },
                                { l: 'ETA', v: `${Math.max(0, 15 - Math.floor(progress / 6))} Mins`, c: 'text-slate-800' },
                                { l: 'Temp', v: '4°C Lab Grade', c: 'text-blue-600' },
                                { l: 'Battery', v: '85%', c: 'text-slate-800' }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-4 rounded-3xl border border-slate-200 flex flex-col items-center text-center hover:border-green-200 transition-colors shadow-sm">
                                    <span className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-tighter">{item.l}</span>
                                    <span className={`text-sm font-black ${item.c}`}>{item.v}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Status & Technician */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-slate-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="relative">
                                    <img src={userAvatar} className="w-16 h-16 rounded-2xl bg-slate-100 object-cover border-2 border-green-500 p-1" alt="Technician" />
                                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-lg border-2 border-white">
                                        <BsCheckCircleFill className="text-[10px]" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-slate-800">Amit Kumar</h4>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">ID: SS-2409</p>
                                    <div className="flex items-center gap-1 mt-1 text-orange-400 text-xs">
                                        <BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill />
                                        <span className="text-slate-400 font-bold ml-1">4.9</span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                <button
                                    onClick={() => setIsChatOpen(true)}
                                    className="bg-green-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-green-700 transition-all shadow-lg active:scale-95"
                                >
                                    <BsChatLeftDotsFill /> Message Amit
                                </button>
                                <button className="bg-slate-50 text-slate-600 font-bold py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-100 transition-all text-sm border border-slate-100">
                                    <BsTelephoneFill className="text-xs" /> Call Technician
                                </button>
                            </div>
                        </div>

                        {/* Stepper Status */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100">
                            <div className="space-y-8 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                                {steps.map((step, index) => (
                                    <div key={index} className="flex gap-4 relative">
                                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center z-10 transition-all duration-700 ${index <= status ? 'bg-green-600 text-white shadow-lg' : 'bg-white border-2 border-slate-100 text-slate-200'}`}>
                                            {index < status ? <BsCheckCircleFill /> : <BsClockHistory className={index === status ? 'animate-spin' : ''} />}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className={`text-sm font-black transition-colors ${index <= status ? 'text-slate-800' : 'text-slate-300'}`}>
                                                {step.label}
                                            </span>
                                            <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest font-mono">
                                                {step.time}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Simulation Panel */}
            {isChatOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white w-full max-w-md rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden animate-slide-up">
                        <div className="bg-green-600 p-6 text-white flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <img src={userAvatar} className="w-10 h-10 rounded-full border-2 border-white/20" alt="" />
                                <div>
                                    <h3 className="font-black text-lg">Amit (Technician)</h3>
                                    <p className="text-[10px] font-bold text-green-100 uppercase tracking-widest">Online • SS Express</p>
                                </div>
                            </div>
                            <button onClick={() => setIsChatOpen(false)} className="p-2 hover:bg-white/10 rounded-full"><BsX className="text-2xl" /></button>
                        </div>
                        <div className="h-96 overflow-y-auto p-6 bg-slate-50 space-y-4">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-4 rounded-3xl text-sm font-bold shadow-sm ${m.sender === 'user' ? 'bg-green-600 text-white rounded-br-none' : 'bg-white text-slate-700 rounded-bl-none'}`}>
                                        {m.text}
                                        <div className={`text-[9px] mt-1 opacity-60 ${m.sender === 'user' ? 'text-right' : 'text-left'}`}>{m.time}</div>
                                    </div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>
                        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100 flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type message..."
                                className="flex-1 bg-slate-100 border-none rounded-2xl px-5 py-3 text-sm font-bold focus:ring-2 focus:ring-green-500 whitespace-nowrap overflow-hidden"
                            />
                            <button type="submit" className="bg-green-600 text-white p-4 rounded-2xl hover:bg-green-700 active:scale-95 transition-all">
                                <BsSendFill />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Post-Service Rating Modal */}
            {showRating && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[70] flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-[3rem] p-10 max-w-sm w-full text-center shadow-2xl border border-green-100 animate-slide-up">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BsCheckCircleFill className="text-5xl text-green-600" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 mb-2">Service Arrived!</h2>
                        <p className="text-slate-500 font-bold text-sm mb-8">How was your booking experience with Amit Kumar?</p>
                        <div className="flex justify-center gap-2 mb-10">
                            {[1, 2, 3, 4, 5].map(i => (
                                <button
                                    key={i}
                                    onClick={() => setRating(i)}
                                    className={`text-4xl transition-all hover:scale-125 ${i <= rating ? 'text-orange-400' : 'text-slate-200'}`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setShowRating(false)}
                            className="w-full bg-green-600 text-white font-black py-4 rounded-2xl shadow-xl hover:bg-green-700 active:scale-95 transition-all"
                        >
                            Submit Review
                        </button>
                    </div>
                </div>
            )}

            <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>
        </div>
    );
};

export default ExpressTrack;
