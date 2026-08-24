import { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    BsArrowLeft, BsSearch, BsCameraVideoFill, BsStarFill,
    BsShieldFillCheck, BsXCircleFill, BsPersonFill, BsFillTelephoneFill,
    BsInfoCircleFill, BsWhatsapp, BsTranslate, BsAward,
    BsLightningFill, BsFire, BsClock, BsGraphUpArrow, BsHeart
} from 'react-icons/bs';
import {
    MdVerifiedUser, MdVideoCall, MdOutlinePayment, MdStar,
    MdHealthAndSafety, MdTimer, MdPeopleAlt, MdSupportAgent
} from 'react-icons/md';
import { FaCopy, FaDownload, FaWhatsapp, FaPills, FaQuoteLeft, FaUserMd } from 'react-icons/fa';
import { BASE_URL } from '../config';
import { authContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import useFetchData from '../hooks/useFetchData';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import uploadImageToCloudinary from '../utils/uploadCloudinary';
import MetaHead from '../components/SEO/MetaHead';
import SEOKeywordIsland from '../components/SEO/SEOKeywordIsland';
import VideoConsultSEOIsland from '../components/SEO/VideoConsultSEOIsland';

// ─── TRANSLATIONS ───
const TRANSLATIONS = {
    en: {
        title: "Online Video Call Doctor Booking",
        subtitle: "Book a video call with verified doctors. Get Google Meet, Zoom or WhatsApp link instantly.",
        findDoctors: "🔍 Find Doctors",
        myBookings: "📅 My Bookings",
        bookCall: "Book Call",
        bookNow: "Book Now",
        today: "Available Today",
        tomorrow: "Tomorrow",
        allDoctors: "All Doctors",
        under500: "Under ₹500",
        topRated: "Top Rated",
        whoIsThisFor: "Who is this consultation for?",
        myself: "Myself",
        child: "My Child",
        parent: "My Parent",
        other: "Other",
        patientName: "Your Full Name",
        phone: "10-digit Mobile",
        age: "Age",
        gender: "Gender",
        symptoms: "Symptoms / Reason",
        medicines: "Current Medicines",
        conditions: "Known Health Conditions",
        uploadReports: "📁 Upload Previous Reports (Optional)",
        uploading: "Uploading...",
        selectSlot: "Choose Consultation Slot",
        duration: "Duration",
        platform: "Video Platform",
        total: "Total",
        confirmPay: "Pay & Confirm",
        viewPass: "View Pass",
        viewPrescription: "📋 View Prescription",
        joinCall: "Join Call",
        rate: "Rate",
        statsNow: "consultations happening right now",
        privacyTitle: "Your Privacy is 100% Protected",
        howItWorks: "How It Works",
        stepTitle1: "Tell Your Problem",
        stepDesc1: "Tap your health concern — we suggest the right specialist.",
        stepTitle2: "Pick Duration & Time",
        stepDesc2: "Choose 10, 20 or 45 min. Book for yourself or family.",
        stepTitle3: "Pay Securely",
        stepDesc3: "UPI, Card or Net Banking. 100% encrypted.",
        stepTitle4: "Join Video Call",
        stepDesc4: "Get Google Meet, Zoom or WhatsApp link instantly.",
        whyChoose: "Why Choose Video Consultation?",
        saveMoney: "Save ₹300–500",
        noTravel: "No travel, no waiting room",
        quickPrescription: "Quick Prescription",
    },
    hi: {
        title: "ऑनलाइन वीडियो कॉल डॉक्टर बुकिंग",
        subtitle: "सत्यापित डॉक्टरों के साथ वीडियो कॉल बुक करें। तुरंत गूगल मीट, ज़ूम या व्हाट्सएप लिंक प्राप्त करें।",
        findDoctors: "🔍 डॉक्टर खोजें",
        myBookings: "📅 मेरी बुकिंग",
        bookCall: "कॉल बुक करें",
        bookNow: "अभी बुक करें",
        today: "आज उपलब्ध",
        tomorrow: "कल",
        allDoctors: "सभी डॉक्टर",
        under500: "₹500 के अंदर",
        topRated: "टॉप रेटेड",
        whoIsThisFor: "यह परामर्श किसके लिए है?",
        myself: "खुद के लिए",
        child: "मेरे बच्चे के लिए",
        parent: "मेरे माता-पिता के लिए",
        other: "अन्य",
        patientName: "आपका पूरा नाम",
        phone: "10 अंकों का मोबाइल",
        age: "उम्र",
        gender: "लिंग",
        symptoms: "लक्षण / कारण",
        medicines: "अभी चल रही दवाएं",
        conditions: "पुरानी बीमारियां",
        uploadReports: "📁 पुरानी रिपोर्ट्स अपलोड करें (वैकल्पिक)",
        uploading: "अपलोड हो रहा है...",
        selectSlot: "परामर्श का समय चुनें",
        duration: "अवधि",
        platform: "वीडियो प्लेटफॉर्म",
        total: "कुल राशि",
        confirmPay: "भुगतान और पुष्टि करें",
        viewPass: "पास देखें",
        viewPrescription: "📋 पर्चा देखें",
        joinCall: "कॉल ज्वाइन करें",
        rate: "रेट करें",
        statsNow: "परामर्श अभी चल रहे हैं",
        privacyTitle: "आपकी गोपनीयता 100% सुरक्षित है",
        howItWorks: "यह कैसे काम करता है",
        stepTitle1: "अपनी समस्या बताएं",
        stepDesc1: "अपने स्वास्थ्य की चिंता को चुनें - हम सही विशेषज्ञ का सुझाव देंगे।",
        stepTitle2: "समय और अवधि चुनें",
        stepDesc2: "10, 20 या 45 मिनट चुनें। खुद या परिवार के लिए बुक करें।",
        stepTitle3: "सुरक्षित भुगतान",
        stepDesc3: "UPI, कार्ड या नेट बैंकिंग। 100% एन्क्रिप्टेड।",
        stepTitle4: "वीडियो कॉल में शामिल हों",
        stepDesc4: "तुरंत गूगल मीट, ज़ूम या व्हाट्सएप लिंक प्राप्त करें।",
        whyChoose: "वीडियो परामर्श क्यों चुनें?",
        saveMoney: "₹300-500 बचाएं",
        noTravel: "यात्रा नहीं, कोई प्रतीक्षा कक्ष नहीं",
        quickPrescription: "त्वरित पर्चा",
    }
};

// ─── DEMO doctors ───
const DEMO_DOCTORS = [
    { _id: 'demo-1', name: 'Dr. Priya Sharma', specialization: 'Dermatologist', photo: 'https://i.pravatar.cc/150?img=47', teleConsultPrice: 499, experience: 8, averageRating: 4.8, totalRating: 142, bio: 'AIIMS Delhi alumna. Skin, hair & nails specialist.', isApproved: 'approved', isTeleConsultActive: true, preferredPlatform: 'google', whatsappNumber: '9876543210', languages: ['Hindi', 'English'], qualifications: 'MBBS (AIIMS Delhi), MD Dermatology (PGI)', totalConsultations: 1420, responseTime: '2 hrs', topReview: { name: 'Rakesh Kumar', text: 'Very helpful. Explained my skin issue clearly and medicine worked perfectly.' }, availableSlots: ['9:00 AM', '10:30 AM', '12:00 PM', '4:00 PM', '5:30 PM', '7:00 PM'], availableToday: true, nextSlot: '9:00 AM' },
    { _id: 'demo-2', name: 'Dr. Amit Verma', specialization: 'Cardiologist', photo: 'https://i.pravatar.cc/150?img=12', teleConsultPrice: 799, experience: 15, averageRating: 4.9, totalRating: 311, bio: 'Senior Cardiologist from PGIMER. Heart disease management online.', isApproved: 'approved', isTeleConsultActive: true, preferredPlatform: 'zoom', whatsappNumber: '9812345678', languages: ['Hindi', 'English', 'Punjabi'], qualifications: 'MBBS, MD Cardiology (PGIMER), Fellowship USA', totalConsultations: 3110, responseTime: '1 hr', topReview: { name: 'Sunita Devi', text: 'Best cardiologist. Very patient and explained everything.' }, availableSlots: ['8:00 AM', '11:00 AM', '6:00 PM'], availableToday: false, nextSlot: 'Tomorrow 8:00 AM' },
    { _id: 'demo-3', name: 'Dr. Sunita Jha', specialization: 'Gynecologist', photo: 'https://i.pravatar.cc/150?img=45', teleConsultPrice: 599, experience: 11, averageRating: 4.7, totalRating: 228, bio: "Women's health specialist. PCOS, pregnancy care, menopause.", isApproved: 'approved', isTeleConsultActive: true, preferredPlatform: 'whatsapp', whatsappNumber: '9801234567', languages: ['Hindi', 'Maithili', 'English'], qualifications: 'MBBS (PMCH Patna), MS Gynecology (JIPMER)', totalConsultations: 2280, responseTime: '3 hrs', topReview: { name: 'Priya Singh', text: 'So comfortable to talk to. Resolved my PCOS in 2 consultations.' }, availableSlots: ['10:00 AM', '1:00 PM', '3:30 PM', '5:00 PM', '7:30 PM'], availableToday: true, nextSlot: '10:00 AM' },
    { _id: 'demo-4', name: 'Dr. Rahul Singh', specialization: 'Neurologist', photo: 'https://i.pravatar.cc/150?img=15', teleConsultPrice: 899, experience: 13, averageRating: 4.6, totalRating: 187, bio: 'Neurology expert — migraines, epilepsy & sleep disorders.', isApproved: 'approved', isTeleConsultActive: true, preferredPlatform: 'google', whatsappNumber: '9867890123', languages: ['Hindi', 'English', 'Bhojpuri'], qualifications: 'MBBS, DM Neurology (AIIMS)', totalConsultations: 1870, responseTime: '2 hrs', topReview: { name: 'Anil Gupta', text: 'Migraine solved in one consultation. Very thorough.' }, availableSlots: ['9:30 AM', '11:30 AM', '3:00 PM', '6:30 PM'], availableToday: true, nextSlot: '9:30 AM' },
    { _id: 'demo-5', name: 'Dr. Meena Kumari', specialization: 'Pediatrician', photo: 'https://i.pravatar.cc/150?img=49', teleConsultPrice: 399, experience: 9, averageRating: 4.9, totalRating: 263, bio: 'Child health expert — vaccines, growth & childhood illnesses.', isApproved: 'approved', isTeleConsultActive: true, preferredPlatform: 'whatsapp', whatsappNumber: '9823456789', languages: ['Hindi', 'Maithili'], qualifications: 'MBBS (IGIMS), MD Pediatrics (RIMS)', totalConsultations: 2630, responseTime: '30 min', topReview: { name: 'Kavita Devi', text: 'My child had fever 3 days. Dr. Meena diagnosed correctly over video. Recovered in 2 days.' }, availableSlots: ['8:30 AM', '10:00 AM', '12:30 PM', '4:30 PM', '6:00 PM'], availableToday: true, nextSlot: '8:30 AM' },
    { _id: 'demo-6', name: 'Dr. Vikram Patel', specialization: 'Orthopedics', photo: 'https://i.pravatar.cc/150?img=33', teleConsultPrice: 699, experience: 10, averageRating: 4.5, totalRating: 156, bio: 'Bone & joint specialist — arthritis, injuries & post-surgery.', isApproved: 'approved', isTeleConsultActive: true, preferredPlatform: 'zoom', whatsappNumber: '9834567890', languages: ['Hindi', 'English', 'Gujarati'], qualifications: 'MBBS, MS Orthopedics (GMC Ahmedabad)', totalConsultations: 1560, responseTime: '4 hrs', topReview: { name: 'Rajan Mishra', text: 'Knee pain consultation very useful. Exercise plan really helped.' }, availableSlots: ['9:00 AM', '11:00 AM', '2:30 PM', '5:00 PM'], availableToday: false, nextSlot: 'Tomorrow 9:00 AM' },
];

// ─── Symptom Tiles ───
const SYMPTOM_TILES = [
    { icon: '🤒', label: 'Fever', specialist: 'General Physician', symptoms: 'High fever, body ache, chills' },
    { icon: '🤧', label: 'Cold / Cough', specialist: 'General Physician', symptoms: 'Cold, cough, sore throat, runny nose' },
    { icon: '🤕', label: 'Headache', specialist: 'Neurologist', symptoms: 'Severe headache, migraine, dizziness' },
    { icon: '🫀', label: 'Chest Pain', specialist: 'Cardiologist', symptoms: 'Chest pain, shortness of breath, palpitations' },
    { icon: '🤰', label: 'Pregnancy', specialist: 'Gynecologist', symptoms: 'Pregnancy concern or checkup' },
    { icon: '👶', label: 'Child Health', specialist: 'Pediatrician', symptoms: 'Child health concern — fever, growth, nutrition' },
    { icon: '🦴', label: 'Bone / Joint', specialist: 'Orthopedics', symptoms: 'Joint pain, bone pain, back pain, arthritis' },
    { icon: '🧴', label: 'Skin Problem', specialist: 'Dermatologist', symptoms: 'Skin rash, acne, hair fall, itching' },
    { icon: '🧠', label: 'Sleep / Stress', specialist: 'Neurologist', symptoms: 'Insomnia, anxiety, stress, memory issues' },
    { icon: '🩺', label: 'General Checkup', specialist: 'General Physician', symptoms: 'General health checkup or routine consultation' },
    { icon: '❓', label: 'Other', specialist: null, symptoms: '' },
];

// ─── Duration Tiers ───
const DURATION_TIERS = [
    { id: 'quick', label: '⚡ Quick', duration: '10 min', multiplier: 0.5, badge: 'Budget' },
    { id: 'standard', label: '📋 Standard', duration: '20 min', multiplier: 1, badge: 'Popular' },
    { id: 'detailed', label: '🔍 Detailed', duration: '45 min', multiplier: 1.8, badge: 'Thorough' },
];

// ─── Testimonials ───
const TESTIMONIALS = [
    { name: 'Anjali Verma', location: 'Patna, Bihar', photo: 'https://i.pravatar.cc/80?img=5', rating: 5, text: 'Mujhe hospital jaana bahut mushkil lagta tha. Sehaat Saathi se ghar baithe doctor se baat ki. Bahut easy and helpful!', specialization: 'Gynecology' },
    { name: 'Ravi Kumar', location: 'Muzaffarpur, Bihar', photo: 'https://i.pravatar.cc/80?img=11', rating: 5, text: 'My father has heart problem. Dr. Verma helped us on Zoom. Medicine is working well now. Saved ₹1500 of travel cost.', specialization: 'Cardiology' },
    { name: 'Seema Devi', location: 'Darbhanga, Bihar', photo: 'https://i.pravatar.cc/80?img=47', rating: 5, text: 'Meri beti ko fever tha. 10 minute mein Dr. Meena ne sab samjha diya. Prescription bhi mili turant. Bahut acha service!', specialization: 'Pediatrics' },
    { name: 'Mohan Lal', location: 'Bhagalpur, Bihar', photo: 'https://i.pravatar.cc/80?img=52', rating: 5, text: 'Sehaat Saathi is best! WhatsApp pe doctor se baat ki. Ek baar me samajh gaya problem. Highly recommend karta hu.', specialization: 'Orthopedics' },
];

// ─── Countdown Timer ───
const CountdownTimer = ({ appointmentDate, appointmentTime, onCanJoin }) => {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0, canJoin: false, isPast: false, nearSoon: false });
    useEffect(() => {
        const calculate = () => {
            try {
                const rawTime = appointmentTime.replace(/(AM|PM)/i, '').trim();
                const [h, m = '0'] = rawTime.split(':').map(Number);
                const isPM = appointmentTime.toLowerCase().includes('pm');
                const hour24 = isPM && h !== 12 ? h + 12 : (!isPM && h === 12 ? 0 : h);
                const appt = new Date(appointmentDate);
                appt.setHours(hour24, m, 0, 0);
                const now = new Date();
                const diff = appt - now;
                const earlyMs = 15 * 60 * 1000, lateMs = 60 * 60 * 1000, soonMs = 2 * 60 * 60 * 1000;
                if (diff < -lateMs) { setTimeLeft({ hours: 0, minutes: 0, seconds: 0, canJoin: false, isPast: true, nearSoon: false }); return; }
                if (diff < earlyMs) { setTimeLeft({ hours: 0, minutes: Math.max(0, Math.floor((diff + earlyMs) / 60000)), seconds: 0, canJoin: true, isPast: false, nearSoon: true }); onCanJoin?.(); return; }
                const totalSec = Math.floor(diff / 1000);
                setTimeLeft({ hours: Math.floor(totalSec / 3600), minutes: Math.floor((totalSec % 3600) / 60), seconds: totalSec % 60, canJoin: false, isPast: false, nearSoon: diff < soonMs });
            } catch { /* ignore */ }
        };
        calculate(); const iv = setInterval(calculate, 1000); return () => clearInterval(iv);
    }, [appointmentDate, appointmentTime]);
    if (timeLeft.isPast) return <div className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-xl border border-red-100">Session ended</div>;
    if (timeLeft.canJoin) return <div className="text-xs font-black text-green-600 bg-green-50 px-3 py-1.5 rounded-xl animate-pulse flex items-center gap-1.5 border border-green-200"><span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />Join Now!</div>;
    const pad = n => String(n).padStart(2, '0');
    return (
        <div className="flex items-center gap-1">
            {[['Hrs', timeLeft.hours], ['Min', timeLeft.minutes], ['Sec', timeLeft.seconds]].map(([label, val]) => (
                <div key={label} className={`rounded-lg px-1.5 py-1 text-center min-w-[36px] ${timeLeft.nearSoon ? 'bg-orange-600' : 'bg-violet-900'} text-white`}>
                    <div className="text-sm font-black tabular-nums">{pad(val)}</div>
                    <div className="text-[7px] uppercase tracking-wider opacity-60">{label}</div>
                </div>
            ))}
        </div>
    );
};

// ─── Star Rating ───
const StarRating = ({ rating, onRate }) => (
    <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(n => (
            <button key={n} onClick={() => onRate(n)} className={`w-8 h-8 transition-all ${n <= rating ? 'text-yellow-400 scale-110' : 'text-gray-300 hover:text-yellow-300'}`}><BsStarFill className="w-full h-full" /></button>
        ))}
    </div>
);

// ─── Quick Profile Modal ───
const QuickProfileModal = ({ doc, onClose, onBook }) => {
    const fee = doc.teleConsultPrice || doc.ticketPrice || 499;
    const stars = Math.round(doc.averageRating || 4.5);
    const platformBadge = { whatsapp: { label: '🟢 WhatsApp Video', color: 'bg-green-100 text-green-700 border-green-200' }, zoom: { label: '🎥 Zoom', color: 'bg-blue-100 text-blue-700 border-blue-200' }, both: { label: '🎯 Meet & 🎥 Zoom', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' } }[doc.preferredPlatform] || { label: '🎯 Google Meet', color: 'bg-violet-100 text-violet-700 border-violet-200' };
    return (
        <div className="fixed inset-0 z-[1800] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-md" onClick={onClose} />
            <div className="relative bg-white w-full sm:max-w-lg max-h-[92vh] overflow-y-auto sm:rounded-3xl rounded-t-3xl shadow-2xl">
                <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-6 text-white relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white"><BsXCircleFill className="w-6 h-6" /></button>
                    <div className="flex items-start gap-4">
                        <img src={doc.photo} className="w-20 h-20 rounded-2xl object-cover border-4 border-white/30 shadow-xl flex-shrink-0" alt=""  loading="lazy" />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2"><h2 className="font-black text-lg truncate">{doc.name}</h2><MdVerifiedUser className="w-5 h-5 text-green-300 flex-shrink-0" /></div>
                            <p className="text-violet-200 font-bold text-sm">{doc.specialization}</p>
                            <div className="flex items-center gap-1 mt-1">{[...Array(5)].map((_, i) => <BsStarFill key={i} className={`w-3.5 h-3.5 ${i < stars ? 'text-yellow-400' : 'text-white/20'}`} />)}<span className="text-violet-200 text-xs font-bold ml-1">{doc.averageRating} ({doc.totalRating} reviews)</span></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-5">
                        {[['Experience', `${doc.experience}+ yrs`], ['Consultations', (doc.totalConsultations || 0).toLocaleString()], ['Fee', `₹${fee}`]].map(([label, val]) => (
                            <div key={label} className="bg-white/15 rounded-2xl p-3 text-center"><p className="font-black text-white text-base">{val}</p><p className="text-violet-200 text-[9px] font-bold uppercase tracking-widest">{label}</p></div>
                        ))}
                    </div>
                </div>
                <div className="p-6 space-y-5">
                    <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">About</p><p className="text-gray-600 text-sm font-medium leading-relaxed">{doc.bio}</p></div>
                    {doc.qualifications && (<div className="bg-violet-50 rounded-2xl p-4 border border-violet-100"><div className="flex items-center gap-2 mb-2"><BsAward className="text-violet-600 w-4 h-4" /><p className="text-[10px] font-black text-violet-600 uppercase tracking-widest">Qualifications</p></div><p className="text-gray-700 text-sm font-bold">{doc.qualifications}</p></div>)}
                    {doc.languages?.length > 0 && (<div><div className="flex items-center gap-2 mb-2"><BsTranslate className="text-indigo-500 w-4 h-4" /><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Languages Spoken</p></div><div className="flex flex-wrap gap-2">{doc.languages.map(l => <span key={l} className="bg-indigo-50 text-indigo-700 text-xs font-black px-3 py-1.5 rounded-xl border border-indigo-100">{l}</span>)}</div></div>)}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100"><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Platform</p><span className={`text-xs font-black px-3 py-1.5 rounded-xl border ${platformBadge.color}`}>{platformBadge.label}</span></div>
                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100"><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Availability</p><span className={`text-xs font-black px-3 py-1.5 rounded-xl ${doc.availableToday ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{doc.availableToday ? `🟢 Today — ${doc.nextSlot || ''}` : '🟡 Tomorrow'}</span></div>
                    </div>
                    {doc.responseTime && (<div className="flex items-center gap-3 bg-blue-50 rounded-2xl p-4 border border-blue-100"><BsClock className="text-blue-500 w-5 h-5 flex-shrink-0" /><div><p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Response Time</p><p className="font-black text-blue-800 text-sm">Usually responds in {doc.responseTime}</p></div></div>)}
                    {doc.topReview && (<div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-100"><div className="flex items-center gap-1 mb-2">{[...Array(5)].map((_, i) => <BsStarFill key={i} className="w-3 h-3 text-yellow-400" />)}<span className="text-[10px] font-black text-yellow-700 ml-1 uppercase tracking-widest">Top Review</span></div><FaQuoteLeft className="text-yellow-300 w-4 h-4 mb-1" /><p className="text-gray-700 text-sm font-medium italic">"{doc.topReview.text}"</p><p className="text-gray-400 text-xs font-bold mt-1">— {doc.topReview.name}</p></div>)}
                    <button onClick={() => { onClose(); onBook(doc); }} className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 text-sm uppercase tracking-widest shadow-xl shadow-violet-200 active:scale-95 transition-all"><MdVideoCall className="w-5 h-5" /> Book Video Call — ₹{fee}</button>
                </div>
            </div>
        </div>
    );
};

// ─── Pre-Call Checklist ───
const PreCallChecklist = ({ booking, onReady }) => {
    const [checked, setChecked] = useState({});
    const items = [
        { id: 'cam', icon: '📷', text: 'My camera is working fine' },
        { id: 'mic', icon: '🎤', text: 'My microphone is working' },
        { id: 'net', icon: '📶', text: 'I have a stable internet connection (WiFi or 4G)' },
        { id: 'room', icon: '🚪', text: 'I am in a quiet, private room' },
        { id: 'reports', icon: '📋', text: 'I have my previous reports ready (if any)' },
        { id: 'symptoms', icon: '✍️', text: 'I have my 3 main questions written for the doctor' },
    ];
    const doneCount = Object.values(checked).filter(Boolean).length;
    const allChecked = doneCount === items.length;
    return (
        <div className="fixed inset-0 z-[2500] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" />
            <div className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white text-center relative">
                    <div className="text-4xl mb-2">✅</div>
                    <h2 className="font-black text-xl">Pre-Call Checklist</h2>
                    <p className="text-green-100 text-xs font-bold mt-1">Your call with <strong className="text-white">{booking?.doctorName}</strong> starts soon!</p>
                    <div className="bg-white/20 rounded-xl px-4 py-2 mt-3 inline-block"><p className="text-white font-black text-sm">⏰ {booking?.appointmentTime}</p></div>
                    <div className="mt-3 bg-white/20 rounded-xl p-2"><div className="h-2 bg-white/20 rounded-full overflow-hidden"><div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${(doneCount / items.length) * 100}%` }} /></div><p className="text-white text-xs font-bold mt-1">{doneCount}/{items.length} checked</p></div>
                </div>
                <div className="p-6">
                    <div className="space-y-2.5">
                        {items.map(item => (
                            <button key={item.id} onClick={() => setChecked(p => ({ ...p, [item.id]: !p[item.id] }))} className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border-2 text-left transition-all ${checked[item.id] ? 'bg-green-50 border-green-400' : 'bg-gray-50 border-gray-200 hover:border-green-300'}`}>
                                <div className={`w-6 h-6 rounded-full flex-shrink-0 border-2 flex items-center justify-center transition-all ${checked[item.id] ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>{checked[item.id] && <span className="text-white text-xs font-black">✓</span>}</div>
                                <span className="text-base mr-1">{item.icon}</span>
                                <span className={`text-sm font-bold flex-1 leading-tight ${checked[item.id] ? 'text-green-700 line-through opacity-70' : 'text-gray-700'}`}>{item.text}</span>
                            </button>
                        ))}
                    </div>
                    <div className="mt-5 space-y-2.5">
                        <button onClick={onReady} disabled={!allChecked} className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${allChecked ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl shadow-green-200 active:scale-95' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}><MdVideoCall className="w-5 h-5" />{allChecked ? "I'm Ready — Join Video Call!" : `Check all ${items.length} items to join`}</button>
                        <button onClick={onReady} className="w-full py-2.5 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors border-t border-gray-100 pt-3">Skip checklist and join directly →</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Video Booking Pass ───
const VideoBookingPass = ({ booking, onClose }) => {
    const passRef = useRef(null);
    const handleDownload = async () => {
        if (!passRef.current) return;
        const canvas = await html2canvas(passRef.current, { scale: 2, useCORS: true, backgroundColor: '#fff' });
        const link = document.createElement('a'); link.download = `SehaatSaathi_VideoPass_${booking.bookingPassId}.png`; link.href = canvas.toDataURL('image/png'); link.click();
    };
    const providerLabel = { zoom: '🎥 Zoom', whatsapp: '🟢 WhatsApp', google: '🎯 Google Meet' }[booking.meetingProvider] || '🎯 Google Meet';
    const providerColor = { zoom: 'bg-blue-600', whatsapp: 'bg-green-600', google: 'bg-violet-600' }[booking.meetingProvider] || 'bg-violet-600';
    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 overflow-y-auto">
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose} />
            <div className="relative w-full max-w-md">
                <div ref={passRef} className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 p-6 text-white text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 flex items-center justify-center"><span className="text-6xl font-black tracking-tighter -rotate-12">SEHAAT SAATHI</span></div>
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3"><MdVideoCall className="w-7 h-7 text-white" /></div>
                        <h2 className="text-lg font-black uppercase tracking-[0.2em]">Sehaat Saathi</h2>
                        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-violet-200 mt-0.5">Video Consultation Pass</p>
                        <button onClick={onClose} className="absolute top-3 right-3 text-white/60 hover:text-white"><BsXCircleFill /></button>
                    </div>
                    <div className="flex items-center justify-between px-6 py-4 bg-violet-50">
                        <div className="bg-white p-2 rounded-xl shadow-lg"><QRCodeSVG value={`SSA-VIDEO:${booking.bookingPassId}`} size={80} fgColor="#5b21b6" /></div>
                        <div className="text-right">
                            <p className="text-[9px] font-black text-violet-400 uppercase tracking-widest">Booking Pass ID</p>
                            <p className="font-black text-violet-900 text-base tracking-tight">{booking.bookingPassId}</p>
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-[9px] font-black uppercase tracking-widest mt-1 ${providerColor}`}>{providerLabel}</div>
                        </div>
                    </div>
                    <div className="relative"><div className="absolute -left-3 w-6 h-6 bg-white rounded-full" /><div className="w-full border-t-2 border-dashed border-violet-200" /><div className="absolute -right-3 w-6 h-6 bg-white rounded-full" /></div>
                    <div className="px-6 py-4 space-y-2.5 bg-slate-50">
                        {[['Patient', booking.patientName], ['Doctor', `Dr. ${booking.doctorName}`], ['Specialization', booking.specialization], ['Date', booking.appointmentDate], ['Time', booking.appointmentTime], ['Duration', booking.duration || '20 min'], ['Fee Paid', `₹${booking.fee}`]].map(([label, value]) => (
                            <div key={label} className="flex justify-between items-center border-b border-slate-100 pb-2"><span className="text-xs font-bold text-slate-500 uppercase">{label}</span><span className="text-xs font-black text-slate-900">{value}</span></div>
                        ))}
                    </div>
                    {booking.meetingLink && (
                        <div className="px-6 py-4 bg-gradient-to-r from-violet-600 to-indigo-600">
                            <p className="text-[9px] font-black uppercase tracking-widest text-violet-200 mb-2">📎 Your Meeting Link</p>
                            <div className="flex items-center gap-2">
                                <p className="flex-1 font-bold text-xs text-white bg-white/10 rounded-xl p-2.5 break-all">{booking.meetingLink}</p>
                                <button onClick={() => { navigator.clipboard.writeText(booking.meetingLink); toast.success('Link copied!'); }} className="bg-white/20 hover:bg-white/30 text-white p-2.5 rounded-xl flex-shrink-0"><FaCopy /></button>
                            </div>
                        </div>
                    )}
                    <div className="px-6 pb-3 pt-3 text-center bg-white">
                        <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Verified at <span className="text-violet-600 font-black">sehaatsaathi.com</span></p>
                        <div className="flex justify-center items-center gap-0.5 mt-3 opacity-30 h-7 overflow-hidden">{Array.from({ length: 50 }).map((_, i) => <div key={i} className={`h-full bg-slate-900 ${i % 3 === 0 ? 'w-2' : i % 5 === 0 ? 'w-px' : 'w-1'}`} />)}</div>
                    </div>
                </div>
                <div className="flex gap-3 mt-4">
                    <button onClick={handleDownload} className="flex-1 bg-white text-violet-700 font-black py-3 rounded-2xl flex items-center justify-center gap-2 text-xs uppercase tracking-widest shadow-xl active:scale-95"><FaDownload /> Download</button>
                    {booking.meetingLink && (<a href={booking.meetingLink} target="_blank" rel="noreferrer" className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-black py-3 rounded-2xl flex items-center justify-center gap-2 text-xs uppercase tracking-widest shadow-xl active:scale-95"><MdVideoCall className="w-4 h-4" /> Join Call</a>)}
                </div>
            </div>
        </div>
    );
};

// ─── Prescription Viewer ───
const PrescriptionModal = ({ booking, onClose }) => {
    const componentRef = useRef();
    const { prescriptionDetails: p, doctor: d } = booking;
    
    const handleDownloadPDF = async () => {
        const canvas = await html2canvas(componentRef.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Prescription_${booking.bookingPassId}.pdf`);
    };

    return (
        <div className="fixed inset-0 z-[2200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose} />
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 font-sans">
                    <h2 className="font-black text-violet-900 uppercase tracking-tighter text-xl">Digital Prescription</h2>
                    <div className="flex gap-2">
                        <button onClick={handleDownloadPDF} className="bg-violet-600 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-violet-700 transition-all"><FaDownload /> Download PDF</button>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><BsXCircleFill className="w-6 h-6" /></button>
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-8 font-sans" ref={componentRef}>
                    <div className="flex justify-between items-start mb-8 border-b-4 border-violet-600 pb-6">
                        <div>
                            <h1 className="text-3xl font-black text-violet-900 tracking-tighter">SEHAAT SAATHI</h1>
                            <p className="text-[10px] font-black text-violet-400 uppercase tracking-[0.3em]">Sovereign Health Ecosystem</p>
                            <div className="mt-4">
                                <p className="font-black text-gray-900 text-lg">Dr. {d?.name || booking.doctorName}</p>
                                <p className="text-violet-600 font-bold text-sm">{d?.specialization || booking.specialization}</p>
                                <p className="text-gray-500 text-xs">{d?.qualifications || 'Verified Specialist'}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date: {new Date(p?.issuedAt || booking.updatedAt).toLocaleDateString()}</p>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Pass ID: {booking.bookingPassId}</p>
                            <div className="mt-4 bg-violet-50 p-2 rounded-xl border border-violet-100 inline-block">
                                <QRCodeSVG value={booking.bookingPassId} size={50} />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Patient Details</p>
                            <p className="font-black text-gray-900">{booking.patientName}</p>
                            <p className="text-gray-500 text-xs">{booking.metadata?.age} Years • {booking.metadata?.gender || 'Not Specified'}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Diagnosis</p>
                            <p className="font-black text-indigo-700">{p?.diagnosis || 'General Consultation'}</p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <FaPills className="text-violet-600" />
                            <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm">Advice & Medicines</h3>
                        </div>
                        <div className="overflow-hidden border border-gray-100 rounded-2xl">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                        <th className="px-4 py-3">Medicine Name</th>
                                        <th className="px-4 py-3">Dosage</th>
                                        <th className="px-4 py-3">Frequency</th>
                                        <th className="px-4 py-3">Duration</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {(p?.medicines || []).map((m, i) => (
                                        <tr key={i} className="text-sm font-bold text-gray-700">
                                            <td className="px-4 py-4">{m.name}</td>
                                            <td className="px-4 py-4 text-violet-600">{m.dosage || m.dose}</td>
                                            <td className="px-4 py-4">{m.frequency || m.freq}</td>
                                            <td className="px-4 py-4 bg-violet-50/30">{m.duration || m.dur}</td>
                                        </tr>
                                    ))}
                                    {(!p?.medicines || p.medicines.length === 0) && (
                                        <tr><td colSpan="4" className="px-4 py-8 text-center text-gray-400 italic">No specific medicines prescribed.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mb-10 bg-yellow-50 p-6 rounded-2xl border border-yellow-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-100/50 rounded-full -mr-12 -mt-12" />
                        <h3 className="text-[10px] font-black text-yellow-700 uppercase tracking-widest mb-2 flex items-center gap-2">⚠️ Doctor's Advice</h3>
                        <p className="text-gray-700 font-bold leading-relaxed whitespace-pre-wrap">{p?.advice || 'Please follow up if symptoms persist.'}</p>
                    </div>

                    <div className="flex justify-between items-end pt-8 border-t border-gray-100">
                        <div className="opacity-40">
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em] mb-1">Electronic Verification</p>
                            <p className="text-[8px] font-bold text-gray-400 max-w-[200px]">This is an electronically generated document. No physical signature is required.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-32 h-16 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center mb-1 bg-[url('https://www.shutterstock.com/image-vector/digital-signature-handwritten-logo-design-260nw-1830689405.jpg')] bg-contain bg-no-repeat bg-center grayscale opacity-60" />
                            <p className="text-[10px] font-black text-gray-900 uppercase">Digitally Signed</p>
                            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Dr. {d?.name || booking.doctorName}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-slate-900 p-4 text-center">
                    <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.5em] flex items-center justify-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Verified by Sehaat Saathi Healthcare
                    </p>
                </div>
            </div>
        </div>
    );
};

// ─── Symptom Helper ───
const SymptomHelper = ({ onSelect, onSkip }) => {
    const [selected, setSelected] = useState(null);
    const handleSelect = (tile) => { setSelected(tile.label); if (tile.label === 'Other') { onSkip(); return; } setTimeout(() => onSelect(tile), 250); };
    return (
        <div className="fixed inset-0 z-[1600] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-md" onClick={onSkip} />
            <div className="relative bg-white w-full sm:max-w-lg max-h-[90vh] overflow-y-auto sm:rounded-3xl rounded-t-3xl shadow-2xl">
                <div className="relative bg-gradient-to-br from-violet-600 to-indigo-700 p-6 pt-8 text-white">
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/30 rounded-full sm:hidden" />
                    <button onClick={onSkip} className="absolute top-4 right-4 text-white/60 hover:text-white"><BsXCircleFill className="w-6 h-6" /></button>
                    <div className="text-4xl mb-2">🌡️</div>
                    <h2 className="font-black text-xl">What's the problem today?</h2>
                    <p className="text-violet-200 text-sm font-medium mt-1">Tap your health concern — we'll suggest the right doctor for you</p>
                </div>
                <div className="p-5">
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-5">
                        {SYMPTOM_TILES.map(tile => (
                            <button key={tile.label} onClick={() => handleSelect(tile)} className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all active:scale-95 ${selected === tile.label ? 'border-violet-500 bg-violet-50 shadow-lg shadow-violet-100 scale-105' : 'border-gray-100 bg-gray-50 hover:border-violet-300 hover:bg-violet-50 hover:scale-102'}`}>
                                <span className="text-3xl mb-2">{tile.icon}</span>
                                <span className="text-[10px] font-black text-center text-gray-700 leading-tight uppercase tracking-wide">{tile.label}</span>
                                {tile.specialist && <span className="text-[8px] text-violet-500 font-bold mt-1 text-center leading-tight">{tile.specialist}</span>}
                            </button>
                        ))}
                    </div>
                    <button onClick={onSkip} className="w-full py-3 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors border-t border-gray-100 pt-4">Skip — I'll describe my problem myself →</button>
                </div>
            </div>
        </div>
    );
};

// ─── Live Stats Banner ───
const LiveStatsBanner = () => {
    const [count, setCount] = useState(12);
    useEffect(() => {
        const iv = setInterval(() => setCount(c => Math.max(8, Math.min(25, c + (Math.random() > 0.5 ? 1 : -1)))), 4500);
        return () => clearInterval(iv);
    }, []);
    return (
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2.5 px-4 overflow-hidden">
            <div className="container mx-auto flex items-center justify-center gap-6 flex-wrap text-xs font-black uppercase tracking-widest">
                <div className="flex items-center gap-2"><span className="w-2 h-2 bg-white rounded-full animate-ping" /><span>{count} consultations happening right now</span></div>
                <div className="hidden sm:flex items-center gap-2"><MdPeopleAlt className="w-4 h-4" /><span>2,847+ happy patients</span></div>
                <div className="hidden md:flex items-center gap-2"><BsGraphUpArrow className="w-3 h-3" /><span>98% patient satisfaction</span></div>
            </div>
        </div>
    );
};

// ─── Featured Doctors Strip ───
const FeaturedStrip = ({ doctors, onBook, onInfo }) => {
    const featured = doctors.filter(d => (d.totalConsultations || 0) >= 1800 || (d.averageRating || 0) >= 4.8).slice(0, 4);
    if (featured.length === 0) return null;
    return (
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
                <BsFire className="text-orange-500 w-5 h-5" />
                <h2 className="font-black text-gray-900 text-lg">Top Rated Doctors This Week</h2>
                <span className="bg-orange-100 text-orange-700 text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest border border-orange-200">Trending</span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1">
                {featured.map(doc => {
                    const fee = doc.teleConsultPrice || doc.ticketPrice || 499;
                    return (
                        <div key={doc._id + '-feat'} className="flex-shrink-0 w-64 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-4 text-white shadow-xl shadow-violet-200 relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full" />
                            <div className="flex items-center gap-3 mb-3">
                                <img src={doc.photo} className="w-12 h-12 rounded-xl object-cover border-2 border-white/30 flex-shrink-0" alt=""  loading="lazy" />
                                <div className="min-w-0">
                                    <p className="font-black text-sm truncate">{doc.name}</p>
                                    <p className="text-violet-200 text-xs font-bold">{doc.specialization}</p>
                                    <div className="flex items-center gap-0.5">{[...Array(5)].map((_, i) => <BsStarFill key={i} className={`w-2.5 h-2.5 ${i < Math.round(doc.averageRating || 4.5) ? 'text-yellow-400' : 'text-white/20'}`} />)}</div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-3">
                                <span className="bg-white/20 text-white text-[9px] font-black px-2 py-1 rounded-lg uppercase">{(doc.totalConsultations || 0).toLocaleString()} consultations</span>
                                <span className="font-black text-yellow-300 text-lg">₹{fee}</span>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => onInfo(doc)} className="flex-shrink-0 h-8 w-8 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all"><BsInfoCircleFill className="w-4 h-4 text-white" /></button>
                                <button onClick={() => onBook(doc)} className="flex-1 bg-white text-violet-700 font-black text-xs py-2 rounded-xl uppercase tracking-wide hover:bg-violet-50 transition-all active:scale-95 flex items-center justify-center gap-1"><MdVideoCall className="w-4 h-4" /> Book Now</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// ─── Doctor Video Card ───
const VideoDoctorCard = ({ doc, onBook, onInfo }) => {
    const stars = Math.round(doc.averageRating || 4.5);
    const fee = doc.teleConsultPrice || doc.ticketPrice || 499;
    const isMostBooked = (doc.totalConsultations || 0) >= 2500;
    const isTopRated = (doc.averageRating || 0) >= 4.9;
    const platformIcon = { whatsapp: '🟢 WhatsApp', zoom: '🎥 Zoom', both: '🎯 & 🎥' }[doc.preferredPlatform] || '🎯 Meet';
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col relative">
            {isMostBooked && (<div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[9px] font-black px-2.5 py-1 rounded-full shadow-lg"><BsFire className="w-3 h-3" /> Most Booked</div>)}
            {isTopRated && !isMostBooked && (<div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-[9px] font-black px-2.5 py-1 rounded-full shadow-lg"><BsStarFill className="w-3 h-3" /> Top Rated</div>)}
            <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 to-indigo-500 group-hover:from-violet-600 group-hover:to-indigo-600 transition-all" />
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start gap-3 mb-3 mt-2">
                    <div className="relative flex-shrink-0">
                        <img src={doc.photo} alt={doc.name} className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-xl group-hover:scale-105 transition-transform"  loading="lazy" />
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white shadow flex items-center justify-center ${doc.availableToday ? 'bg-green-500' : 'bg-orange-400'}`}><div className={`w-2.5 h-2.5 rounded-full ${doc.availableToday ? 'bg-white animate-ping' : 'bg-white'}`} /></div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5"><h3 className="font-black text-gray-900 truncate text-sm">{doc.name}</h3><MdVerifiedUser className="text-violet-500 w-4 h-4 flex-shrink-0" /></div>
                        <p className="text-violet-600 font-bold text-xs mb-1">{doc.specialization}</p>
                        <div className="flex items-center gap-0.5">{[...Array(5)].map((_, i) => <BsStarFill key={i} className={`w-3 h-3 ${i < stars ? 'text-yellow-400' : 'text-gray-200'}`} />)}<span className="text-[10px] font-bold text-gray-400 ml-1">{doc.averageRating || '4.5'} ({doc.totalRating || 0})</span></div>
                    </div>
                    <div className="text-right flex-shrink-0"><p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Fee</p><p className="font-black text-violet-700 text-xl leading-none">₹{fee}</p><p className="text-[9px] text-gray-400 font-medium">per session</p></div>
                </div>
                <p className="text-xs text-gray-500 font-medium leading-relaxed line-clamp-2 mb-2 flex-1">{doc.bio}</p>
                {doc.languages?.length > 0 && (<div className="flex gap-1 flex-wrap mb-2">{doc.languages.slice(0, 3).map(l => <span key={l} className="text-[9px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-lg border border-indigo-100">{l}</span>)}</div>)}
                <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="bg-violet-50 text-violet-700 text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wide border border-violet-100">{doc.experience}+ Yrs</span>
                    <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wide border ${doc.availableToday ? 'bg-green-50 text-green-700 border-green-100' : 'bg-orange-50 text-orange-700 border-orange-100'}`}>{doc.availableToday ? `● ${doc.nextSlot || 'Today'}` : '○ Tomorrow'}</span>
                    <span className="bg-slate-50 text-slate-600 text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wide border border-slate-200">{platformIcon}</span>
                    {doc.responseTime && <span className="bg-blue-50 text-blue-600 text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wide border border-blue-100 flex items-center gap-1"><BsClock className="w-2.5 h-2.5" />{doc.responseTime}</span>}
                </div>
                <div className="flex gap-2">
                    <button onClick={() => onInfo(doc)} className="flex-shrink-0 w-10 h-10 bg-violet-50 hover:bg-violet-100 border border-violet-200 text-violet-600 rounded-xl flex items-center justify-center transition-all active:scale-95" title="View full profile"><BsInfoCircleFill className="w-5 h-5" /></button>
                    {doc.preferredPlatform === 'whatsapp' && doc.whatsappNumber && (
                        <a href={`https://wa.me/91${doc.whatsappNumber}?text=Hi%20Dr.%20${encodeURIComponent(doc.name)}%2C%20I%20want%20to%20book%20a%20video%20consultation%20via%20Sehaat%20Saathi.`} target="_blank" rel="noreferrer" className="flex-shrink-0 w-10 h-10 bg-green-50 hover:bg-green-100 border border-green-200 text-green-600 rounded-xl flex items-center justify-center transition-all active:scale-95" title="Message on WhatsApp"><FaWhatsapp className="w-5 h-5" /></a>
                    )}
                    <button onClick={() => onBook(doc)} className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-black py-3 rounded-xl text-xs uppercase tracking-[0.15em] transition-all shadow-lg shadow-violet-200 active:scale-95 flex items-center justify-center gap-1.5"><MdVideoCall className="w-4 h-4" /> Book Call</button>
                </div>
            </div>
        </div>
    );
};

// ─── Booking Modal (Fully Enhanced) ───
const BookingModal = ({ doc, token, onClose, onConfirmed, prefilledSymptoms }) => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedDuration, setSelectedDuration] = useState(DURATION_TIERS[1]);
    const [form, setForm] = useState({
        patientName: '', phone: '', age: '', gender: '',
        forWhom: 'myself', memberName: '', memberAge: '',
        date: '', slot: '',
        platform: doc.preferredPlatform === 'whatsapp' ? 'whatsapp' : doc.preferredPlatform === 'zoom' ? 'zoom' : 'google',
        symptoms: prefilledSymptoms || '', currentMedicines: '', knownConditions: '', paymentMethod: 'upi',
    });
    const [attachments, setAttachments] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        try {
            const data = await uploadImageToCloudinary(file);
            setAttachments(prev => [...prev, { url: data.url, name: file.name, type: file.type }]);
            toast.success('Report uploaded successfully!');
        } catch (err) {
            toast.error('File upload failed');
        } finally {
            setUploading(false);
        }
    };

    const set = (key, val) => setForm(p => ({ ...p, [key]: val }));
    const today = new Date().toISOString().split('T')[0];
    const slots = doc.availableSlots || ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '6:00 PM'];
    const basePrice = doc.teleConsultPrice || doc.ticketPrice || 499;
    const fee = Math.round(basePrice * selectedDuration.multiplier);
    const isDemo = doc._id?.startsWith('demo-');

    const getPlatformOptions = () => {
        if (doc.preferredPlatform === 'whatsapp') return [{ value: 'whatsapp', label: '🟢 WhatsApp Video' }];
        if (doc.preferredPlatform === 'zoom') return [{ value: 'zoom', label: '🎥 Zoom' }];
        if (doc.preferredPlatform === 'both') return [{ value: 'google', label: '🎯 Google Meet' }, { value: 'zoom', label: '🎥 Zoom' }];
        return [{ value: 'google', label: '🎯 Google Meet' }];
    };
    const platformOptions = getPlatformOptions();

    const handleConfirm = async () => {
        if (!form.patientName || !form.phone || !form.date || !form.slot) { toast.error('Please fill all required fields!'); return; }
        if (form.forWhom !== 'myself' && !form.memberName) { toast.error("Please enter the family member's name!"); return; }
        setLoading(true);
        try {
            const finalName = form.forWhom === 'myself' ? form.patientName : `${form.memberName} (via ${form.patientName})`;
            const chars = 'abcdefghijkmnpqrstuvwxyz';
            const rnd = n => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
            const meetLink = { zoom: `https://zoom.us/j/${Math.floor(1e10 + Math.random() * 9e10)}?pwd=${rnd(10)}`, whatsapp: `https://wa.me/91${doc.whatsappNumber}`, google: `https://meet.google.com/${rnd(3)}-${rnd(4)}-${rnd(3)}` }[form.platform] || `https://meet.google.com/${rnd(3)}-${rnd(4)}-${rnd(3)}`;
            if (isDemo) {
                await new Promise(r => setTimeout(r, 1500));
                onConfirmed({ 
                    bookingPassId: `SSA-VID-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 89999)}`, 
                    doctorName: doc.name, 
                    specialization: doc.specialization, 
                    patientName: finalName, 
                    appointmentDate: form.date, 
                    appointmentTime: form.slot, 
                    fee, 
                    duration: selectedDuration.duration, 
                    meetingLink: meetLink, 
                    meetingProvider: form.platform 
                });
                return;
            }
            const bookRes = await fetch(`${BASE_URL}/video-consult/book`, { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, 
                body: JSON.stringify({ 
                    doctorId: doc._id, 
                    patientName: finalName, 
                    consultationFee: fee, 
                    meetingProvider: form.platform, 
                    appointmentDate: form.date, 
                    appointmentTime: form.slot, 
                    symptoms: form.symptoms,
                    duration: selectedDuration.duration,
                    familyMember: {
                        forWhom: form.forWhom,
                        name: form.memberName,
                        age: form.memberAge
                    },
                    metadata: {
                        age: form.age,
                        gender: form.gender,
                        knownConditions: form.knownConditions,
                        currentMedicines: form.currentMedicines
                    },
                    attachments: attachments
                }) 
            });
            const bookResult = await bookRes.json();
            if (!bookRes.ok) throw new Error(bookResult.message);
            const payRes = await fetch(`${BASE_URL}/video-consult/payment-success`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ consultationId: bookResult.data.consultation._id, razorpayPaymentId: `pay_mock_${Date.now()}` }) });
            const payResult = await payRes.json();
            if (!payRes.ok) throw new Error(payResult.message);
            onConfirmed({ bookingPassId: bookResult.data.bookingPassId, doctorName: doc.name, specialization: doc.specialization, patientName: finalName, appointmentDate: form.date, appointmentTime: form.slot, fee, duration: selectedDuration.duration, meetingLink: payResult.data.meetingLink, meetingProvider: form.platform, consultationId: bookResult.data.consultation._id });
        } catch (err) { toast.error(err.message || 'Booking failed. Please try again.');
        } finally { setLoading(false); }
    };

    return (
        <div className="fixed inset-0 z-[1500] flex items-center justify-center p-4 overflow-y-auto">
            <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-lg" onClick={onClose} />
            <div className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden my-4">
                {/* Header */}
                <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-5 text-white relative overflow-hidden">
                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full" />
                    <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white z-10"><BsXCircleFill className="w-6 h-6" /></button>
                    <div className="flex items-center gap-3">
                        <img src={doc.photo} className="w-12 h-12 rounded-2xl object-cover border-2 border-white/40 shadow-xl" alt=""  loading="lazy" />
                        <div><h3 className="font-black text-base leading-tight">{doc.name}</h3><p className="text-violet-200 text-xs font-bold">{doc.specialization} • Base ₹{basePrice}</p></div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                        {['Your Info', 'Date & Time', 'Payment'].map((s, i) => (
                            <div key={i} className="flex items-center gap-1.5 flex-shrink-0">
                                <div className={`w-6 h-6 rounded-full text-[10px] font-black flex items-center justify-center transition-all ${step > i + 1 ? 'bg-green-400 text-white' : step === i + 1 ? 'bg-white text-violet-700' : 'bg-white/20 text-white'}`}>{step > i + 1 ? '✓' : i + 1}</div>
                                <span className={`text-[9px] font-black uppercase tracking-widest hidden sm:block ${step === i + 1 ? 'text-white' : 'text-white/40'}`}>{s}</span>
                                {i < 2 && <div className="w-4 h-px bg-white/20 flex-shrink-0" />}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-5 space-y-4 max-h-[62vh] overflow-y-auto">
                    {/* Step 1: Patient Info */}
                    {step === 1 && (
                        <>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Who is this consultation for?</p>
                            <div className="grid grid-cols-4 gap-2">
                                {[{ v: 'myself', i: '👤', l: 'Myself' }, { v: 'child', i: '👶', l: 'My Child' }, { v: 'parent', i: '👴', l: 'My Parent' }, { v: 'other', i: '👫', l: 'Other' }].map(opt => (
                                    <button key={opt.v} type="button" onClick={() => set('forWhom', opt.v)} className={`flex flex-col items-center justify-center py-3 rounded-2xl border-2 transition-all text-xs font-black gap-1 ${form.forWhom === opt.v ? 'bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-200' : 'bg-white border-gray-200 text-gray-600 hover:border-violet-300'}`}>
                                        <span className="text-xl">{opt.i}</span><span className="text-[9px] uppercase tracking-wide">{opt.l}</span>
                                    </button>
                                ))}
                            </div>
                            {form.forWhom !== 'myself' && (
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="relative"><input type="text" value={form.memberName} onChange={e => set('memberName', e.target.value)} placeholder="Their name" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-violet-400" /><span className="absolute -top-2.5 left-4 bg-white px-2 text-[9px] font-black text-violet-700 uppercase tracking-widest">Name *</span></div>
                                    <div className="relative"><input type="number" value={form.memberAge} onChange={e => set('memberAge', e.target.value)} placeholder="Age" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-violet-400" /><span className="absolute -top-2.5 left-4 bg-white px-2 text-[9px] font-black text-violet-700 uppercase tracking-widest">Age</span></div>
                                </div>
                            )}
                            <div className="space-y-3">
                                <div className="relative"><BsPersonFill className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" /><input type="text" value={form.patientName} onChange={e => set('patientName', e.target.value)} placeholder="Your Full Name" className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-violet-400" /><span className="absolute -top-2.5 left-4 bg-white px-2 text-[9px] font-black text-violet-700 uppercase tracking-widest">Your Name *</span></div>
                                <div className="relative"><BsFillTelephoneFill className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" /><input type="tel" value={form.phone} maxLength={10} onChange={e => set('phone', e.target.value)} placeholder="10-digit Mobile" className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-violet-400" /><span className="absolute -top-2.5 left-4 bg-white px-2 text-[9px] font-black text-violet-700 uppercase tracking-widest">Phone *</span></div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="relative"><input type="number" value={form.age} onChange={e => set('age', e.target.value)} placeholder="Your age" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-violet-400" /><span className="absolute -top-2.5 left-4 bg-white px-2 text-[9px] font-black text-violet-700 uppercase tracking-widest">Your Age</span></div>
                                    <div className="relative"><select value={form.gender} onChange={e => set('gender', e.target.value)} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-violet-400 appearance-none"><option value="">Select</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select><span className="absolute -top-2.5 left-4 bg-white px-2 text-[9px] font-black text-violet-700 uppercase tracking-widest">Gender</span></div>
                                </div>
                                <div className="relative"><textarea value={form.symptoms} onChange={e => set('symptoms', e.target.value)} placeholder="e.g. Fever since 2 days, headache, no energy..." rows={2} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-400 resize-none" /><span className="absolute -top-2.5 left-4 bg-white px-2 text-[9px] font-black text-violet-700 uppercase tracking-widest">Symptoms / Reason</span></div>
                                <div className="relative"><FaPills className="absolute left-4 top-4 text-gray-400 w-4 h-4" /><textarea value={form.currentMedicines} onChange={e => set('currentMedicines', e.target.value)} placeholder="e.g. Metformin 500mg, Aspirin 75mg (or write 'None')" rows={2} className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-400 resize-none" /><span className="absolute -top-2.5 left-4 bg-white px-2 text-[9px] font-black text-violet-700 uppercase tracking-widest">Current Medicines</span></div>
                                <div className="relative"><textarea value={form.knownConditions} onChange={e => set('knownConditions', e.target.value)} placeholder="e.g. Diabetes, High BP, Thyroid, None..." rows={2} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-400 resize-none" /><span className="absolute -top-2.5 left-4 bg-white px-2 text-[9px] font-black text-violet-700 uppercase tracking-widest">Known Health Conditions</span></div>
                                
                                <div className="bg-gray-50 p-4 rounded-2xl border border-dashed border-gray-300">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">📁 Health Vault: Attach Reports</p>
                                    <input type="file" id="report-upload" className="hidden" onChange={handleFileUpload} accept="image/*,.pdf" />
                                    <label htmlFor="report-upload" className="flex items-center justify-center p-3 bg-white border border-gray-200 rounded-xl cursor-pointer hover:bg-violet-50 transition-all">
                                        {uploading ? <span className="text-xs font-bold text-violet-600 animate-pulse">Uploading...</span> : <span className="text-xs font-black text-violet-700">+ Add Lab Report / Photo</span>}
                                    </label>
                                    {attachments.length > 0 && (
                                        <div className="flex gap-2 mt-3 overflow-x-auto">
                                            {attachments.map((at, i) => (
                                                <div key={i} className="flex-shrink-0 bg-white border border-violet-100 p-2 rounded-xl flex items-center gap-2 group relative">
                                                    <div className="w-8 h-8 bg-violet-50 rounded flex items-center justify-center text-violet-600">📄</div>
                                                    <span className="text-[10px] font-bold text-gray-600 truncate w-20">{at.name}</span>
                                                    <button onClick={() => setAttachments(p => p.filter((_, idx) => idx !== i))} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-[8px] flex items-center justify-center">×</button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Step 2: Date & Time */}
                    {step === 2 && (
                        <>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Choose Consultation Duration</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {DURATION_TIERS.map(tier => {
                                        const tierFee = Math.round(basePrice * tier.multiplier);
                                        return (
                                            <button key={tier.id} type="button" onClick={() => setSelectedDuration(tier)} className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all active:scale-95 ${selectedDuration.id === tier.id ? 'border-violet-500 bg-violet-50 shadow-lg shadow-violet-100' : 'border-gray-200 bg-white hover:border-violet-300'}`}>
                                                <span className="text-sm font-black text-gray-800">{tier.label}</span>
                                                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full mt-1 ${selectedDuration.id === tier.id ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-500'}`}>{tier.badge}</span>
                                                <span className="text-xs text-gray-500 font-medium mt-1">{tier.duration}</span>
                                                <span className="font-black text-violet-700 text-base">₹{tierFee}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="relative"><input type="date" value={form.date} min={today} onChange={e => set('date', e.target.value)} className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-violet-400" /><span className="absolute -top-2.5 left-4 bg-white px-2 text-[9px] font-black text-violet-700 uppercase tracking-widest">Date *</span></div>
                            <div>
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Available Time Slots *</p>
                                <div className="grid grid-cols-3 gap-2">{slots.map(slot => (<button key={slot} type="button" onClick={() => set('slot', slot)} className={`py-2.5 rounded-xl text-xs font-black uppercase tracking-wide border-2 transition-all active:scale-95 ${form.slot === slot ? 'bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-200' : 'bg-white text-gray-600 border-gray-200 hover:border-violet-300 hover:text-violet-600'}`}>{slot}</button>))}</div>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Video Platform</p>
                                <div className={`grid gap-3 ${platformOptions.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                    {platformOptions.map(p => (<button key={p.value} type="button" onClick={() => set('platform', p.value)} className={`py-3 rounded-2xl text-sm font-black border-2 transition-all active:scale-95 ${form.platform === p.value ? 'bg-violet-600 text-white border-violet-600 shadow-lg' : 'bg-white text-gray-600 border-gray-200 hover:border-violet-300'}`}>{p.label}</button>))}
                                </div>
                                {form.platform === 'whatsapp' && doc.whatsappNumber && (<div className="mt-2 bg-green-50 rounded-2xl p-3 border border-green-200 flex items-center gap-2"><FaWhatsapp className="text-green-600 w-5 h-5 flex-shrink-0" /><p className="text-xs font-bold text-green-700">Doctor will call you on WhatsApp: <strong>+91 {doc.whatsappNumber}</strong> at your scheduled time.</p></div>)}
                            </div>
                        </>
                    )}

                    {/* Step 3: Payment */}
                    {step === 3 && (
                        <>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Confirm & Pay</p>
                            <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl p-4 space-y-2 border border-violet-100">
                                {[['Patient', form.forWhom === 'myself' ? form.patientName : form.memberName], ['Doctor', doc.name], ['Date', form.date], ['Time', form.slot], ['Duration', selectedDuration.duration], ['Platform', { zoom: '🎥 Zoom', whatsapp: '🟢 WhatsApp', google: '🎯 Google Meet' }[form.platform] || '🎯 Google Meet']].map(([label, value]) => (
                                    <div key={label} className="flex justify-between text-sm"><span className="font-bold text-gray-500">{label}</span><span className="font-black text-gray-900">{value}</span></div>
                                ))}
                                <div className="border-t border-violet-200 pt-2 flex justify-between"><span className="font-black text-violet-700 uppercase">Total</span><span className="font-black text-violet-700 text-xl">₹{fee}</span></div>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Payment Method</p>
                                <div className="grid grid-cols-3 gap-2">{[{ value: 'upi', label: '📱 UPI' }, { value: 'card', label: '💳 Card' }, { value: 'netbanking', label: '🏦 Net Banking' }].map(p => (<button key={p.value} type="button" onClick={() => set('paymentMethod', p.value)} className={`py-2.5 rounded-xl text-xs font-black border-2 transition-all ${form.paymentMethod === p.value ? 'bg-violet-600 text-white border-violet-600' : 'bg-white text-gray-600 border-gray-200 hover:border-violet-300'}`}>{p.label}</button>))}</div>
                            </div>
                            <div className="flex items-center gap-2 bg-green-50 px-4 py-3 rounded-xl border border-green-100"><BsShieldFillCheck className="text-green-600 w-5 h-5 flex-shrink-0" /><p className="text-[10px] text-green-700 font-bold">100% Secure encrypted payment. Meeting link sent instantly after confirmation.</p></div>
                        </>
                    )}
                </div>

                <div className="flex gap-3 px-5 pb-5 pt-2 border-t border-gray-50">
                    {step > 1 && (<button onClick={() => setStep(s => s - 1)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-black py-4 rounded-2xl transition-all text-xs uppercase tracking-widest">← Back</button>)}
                    {step < 3 ? (
                        <button onClick={() => {
                            if (step === 1 && (!form.patientName || !form.phone)) { toast.error('Name and phone are required!'); return; }
                            if (step === 1 && form.forWhom !== 'myself' && !form.memberName) { toast.error("Please enter the family member's name!"); return; }
                            if (step === 2 && (!form.date || !form.slot)) { toast.error('Please select a date and time slot!'); return; }
                            setStep(s => s + 1);
                        }} className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-violet-200 active:scale-95 text-xs uppercase tracking-widest">Next →</button>
                    ) : (
                        <button onClick={handleConfirm} disabled={loading} className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-violet-200 active:scale-95 text-xs uppercase tracking-widest disabled:opacity-60 flex items-center justify-center gap-2">
                            {loading ? <><span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" /> Processing...</> : <><MdOutlinePayment className="w-4 h-4" /> Pay ₹{fee} & Confirm</>}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// ─── Reminder Banner ───
const ReminderBanner = ({ bookings }) => {
    const upcoming = bookings.find(b => {
        if (b.bookingStatus === 'cancelled' || b.paymentStatus !== 'paid') return false;
        try {
            const raw = b.appointmentTime.replace(/(AM|PM)/i, '').trim();
            const [h, m = '0'] = raw.split(':').map(Number);
            const isPM = b.appointmentTime.toLowerCase().includes('pm');
            const hour24 = isPM && h !== 12 ? h + 12 : (!isPM && h === 12 ? 0 : h);
            const appt = new Date(b.appointmentDate); appt.setHours(hour24, m, 0, 0);
            const diff = appt - new Date();
            return diff > 0 && diff < 2 * 60 * 60 * 1000;
        } catch { return false; }
    });
    if (!upcoming) return null;
    return (
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl p-4 mb-6 flex items-center justify-between gap-4 shadow-xl shadow-orange-200 animate-pulse">
            <div className="flex items-center gap-3"><span className="text-2xl flex-shrink-0">⏰</span><div><p className="font-black text-sm">Upcoming call with {upcoming.doctor?.name}!</p><p className="text-orange-100 text-xs font-medium">Today at {upcoming.appointmentTime} — Check camera & internet now</p></div></div>
            {upcoming.meetingLink && (<a href={upcoming.meetingLink} target="_blank" rel="noreferrer" className="flex-shrink-0 bg-white text-orange-600 font-black text-xs px-4 py-2 rounded-xl uppercase tracking-widest hover:bg-orange-50 transition-all active:scale-95 flex items-center gap-1.5 shadow"><MdVideoCall /> Join</a>)}
        </div>
    );
};

// ─── Testimonials Section ───
const TestimonialsSection = () => {
    const [active, setActive] = useState(0);
    useEffect(() => { const iv = setInterval(() => setActive(p => (p + 1) % TESTIMONIALS.length), 4000); return () => clearInterval(iv); }, []);
    return (
        <div className="mt-12 bg-gradient-to-br from-slate-900 to-violet-950 rounded-3xl p-8 text-white overflow-hidden">
            <div className="flex items-center gap-3 mb-8">
                <BsHeart className="text-pink-400 w-6 h-6" />
                <h2 className="font-black text-2xl">What Patients Say</h2>
                <span className="bg-pink-500/20 text-pink-300 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest border border-pink-500/30">Real Stories</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TESTIMONIALS.map((t, i) => (
                    <div key={i} onClick={() => setActive(i)} className={`bg-white/5 hover:bg-white/10 rounded-2xl p-5 cursor-pointer transition-all border ${active === i ? 'border-violet-400 bg-white/10 shadow-lg shadow-violet-900/50' : 'border-white/10'}`}>
                        <FaQuoteLeft className="text-violet-400 w-4 h-4 mb-3 opacity-60" />
                        <p className="text-gray-200 text-sm font-medium leading-relaxed mb-4 line-clamp-3">"{t.text}"</p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img src={t.photo} className="w-9 h-9 rounded-full object-cover border-2 border-violet-400/30" alt=""  loading="lazy" />
                                <div><p className="font-black text-white text-sm">{t.name}</p><p className="text-gray-400 text-xs font-medium">{t.location}</p></div>
                            </div>
                            <div className="text-right"><div className="flex items-center gap-0.5">{[...Array(t.rating)].map((_, i) => <BsStarFill key={i} className="w-3 h-3 text-yellow-400" />)}</div><span className="text-[9px] text-violet-300 font-bold">{t.specialization}</span></div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-2 mt-5">{TESTIMONIALS.map((_, i) => (<button key={i} onClick={() => setActive(i)} className={`w-2 h-2 rounded-full transition-all ${active === i ? 'bg-violet-400 w-6' : 'bg-white/20'}`} />))}</div>
        </div>
    );
};

// ─── My Bookings ───
const MyBookingsSection = ({ token }) => {
    const { data, loading } = useFetchData(`${BASE_URL}/video-consult/my-bookings`);
    const [ratingModal, setRatingModal] = useState(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [viewPass, setViewPass] = useState(null);
    const [checklistBooking, setChecklistBooking] = useState(null);
    const [checklistLink, setChecklistLink] = useState('');
    const [viewPrescription, setViewPrescription] = useState(null);
    const bookings = data?.data || [];
    const statusColor = s => ({ scheduled: 'bg-indigo-100 text-indigo-700', ongoing: 'bg-green-100 text-green-700', completed: 'bg-gray-100 text-gray-600', cancelled: 'bg-red-100 text-red-600' }[s] || 'bg-orange-100 text-orange-700');
    const handleRate = async (id) => {
        try {
            const res = await fetch(`${BASE_URL}/video-consult/${id}/rate`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ rating, review }) });
            const result = await res.json(); if (!res.ok) throw new Error(result.message);
            toast.success('Thank you for your feedback! ⭐'); setRatingModal(null);
        } catch (e) { toast.error(e.message); }
    };
    const handleJoinClick = (b) => { if (b.meetingLink) { setChecklistBooking({ doctorName: b.doctor?.name, appointmentTime: b.appointmentTime }); setChecklistLink(b.meetingLink); } };
    const handleChecklistReady = () => { if (checklistLink) window.open(checklistLink, '_blank'); setChecklistBooking(null); setChecklistLink(''); };

    if (loading) return <div className="text-center py-12"><div className="w-10 h-10 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto mb-3" /><p className="text-gray-400 font-bold text-sm">Loading your bookings...</p></div>;
    if (!bookings.length) return (
        <div className="text-center py-16">
            <div className="w-20 h-20 bg-violet-50 rounded-3xl flex items-center justify-center mx-auto mb-4 border-2 border-violet-100"><MdVideoCall className="w-10 h-10 text-violet-400" /></div>
            <p className="font-black text-gray-700 text-lg mb-2">No consultations yet</p>
            <p className="text-gray-400 text-sm font-medium mb-5">Book your first video call with a verified doctor!</p>
        </div>
    );
    return (
        <div className="space-y-4">
            <ReminderBanner bookings={bookings} />
            {bookings.map(b => (
                <div key={b._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
                    <div className="flex items-center gap-4 p-4">
                        <img src={b.doctor?.photo} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" alt=""  loading="lazy" />
                        <div className="flex-1 min-w-0"><p className="font-black text-gray-900 text-sm truncate">{b.doctor?.name}</p><p className="text-violet-600 font-bold text-xs">{b.doctor?.specialization}</p><p className="text-gray-400 text-xs font-medium">{b.appointmentDate} at {b.appointmentTime}</p></div>
                        <div className="text-right flex-shrink-0"><div className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${statusColor(b.bookingStatus)}`}>{b.bookingStatus}</div><p className="text-xs font-black text-violet-700 mt-1">₹{b.consultationFee}</p></div>
                    </div>
                    <div className="border-t border-gray-50 px-4 py-3 flex items-center justify-between gap-3 flex-wrap bg-gray-50/50">
                        <CountdownTimer appointmentDate={b.appointmentDate} appointmentTime={b.appointmentTime} />
                        <div className="flex gap-2 flex-wrap">
                            {b.paymentStatus === 'paid' && b.bookingStatus !== 'cancelled' && (<button onClick={() => setViewPass(b)} className="px-3 py-1.5 bg-violet-50 text-violet-700 text-[9px] font-black uppercase tracking-widest rounded-lg border border-violet-100 hover:bg-violet-100 transition-all">View Pass</button>)}
                            {b.bookingStatus === 'completed' && !b.rating && (<button onClick={() => { setRatingModal(b._id); setRating(0); setReview(''); }} className="px-3 py-1.5 bg-yellow-50 text-yellow-700 text-[9px] font-black uppercase tracking-widest rounded-lg border border-yellow-100 hover:bg-yellow-100 transition-all flex items-center gap-1"><MdStar /> Rate</button>)}
                            {b.bookingStatus === 'completed' && (<button onClick={() => setViewPrescription(b)} className="px-3 py-1.5 bg-green-50 text-green-700 text-[9px] font-black uppercase tracking-widest rounded-lg border border-green-100 hover:bg-green-100 transition-all flex items-center gap-1">📋 Prescription</button>)}
                            {b.meetingLink && b.paymentStatus === 'paid' && b.bookingStatus !== 'cancelled' && (<button onClick={() => handleJoinClick(b)} className="px-3 py-1.5 bg-violet-600 text-white text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-violet-700 transition-all flex items-center gap-1 active:scale-95"><MdVideoCall /> Join</button>)}
                        </div>
                    </div>
                </div>
            ))}
            {ratingModal && (<div className="fixed inset-0 z-[2000] flex items-center justify-center p-4"><div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setRatingModal(null)} /><div className="relative bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl"><h3 className="font-black text-gray-900 text-lg mb-2">How was your consultation?</h3><p className="text-gray-500 text-sm mb-5">Your honest feedback helps us improve.</p><StarRating rating={rating} onRate={setRating} /><textarea value={review} onChange={e => setReview(e.target.value)} placeholder="Write a short review (optional)..." rows={3} className="w-full mt-4 px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-violet-400" /><div className="flex gap-3 mt-5"><button onClick={() => setRatingModal(null)} className="flex-1 bg-gray-100 text-gray-700 font-black py-3 rounded-2xl text-xs uppercase tracking-widest">Cancel</button><button onClick={() => handleRate(ratingModal)} disabled={!rating} className="flex-1 bg-violet-600 text-white font-black py-3 rounded-2xl text-xs uppercase tracking-widest disabled:opacity-50">Submit</button></div></div></div>)}
            {viewPass && (<VideoBookingPass booking={{ bookingPassId: viewPass.bookingPassId, patientName: viewPass.patientName, doctorName: viewPass.doctor?.name, specialization: viewPass.doctor?.specialization, appointmentDate: viewPass.appointmentDate, appointmentTime: viewPass.appointmentTime, fee: viewPass.consultationFee, meetingLink: viewPass.meetingLink, meetingProvider: viewPass.meetingProvider }} onClose={() => setViewPass(null)} />)}
            {viewPrescription && (<PrescriptionModal booking={viewPrescription} onClose={() => setViewPrescription(null)} />)}
            {checklistBooking && (<PreCallChecklist booking={checklistBooking} onReady={handleChecklistReady} />)}
        </div>
    );
};

// ─── MAIN PAGE ───
const OnlineVideoBooking = () => {
    const { token } = useContext(authContext);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSpec, setSelectedSpec] = useState('All');
    const [activeFilter, setActiveFilter] = useState('all');
    const [bookingDoc, setBookingDoc] = useState(null);
    const [profileDoc, setProfileDoc] = useState(null);
    const [confirmedBooking, setConfirmedBooking] = useState(null);
    const [activeTab, setActiveTab] = useState('find');
    const [showSymptomHelper, setShowSymptomHelper] = useState(false);
    const [pendingDoc, setPendingDoc] = useState(null);
    const [prefilledSymptoms, setPrefilledSymptoms] = useState('');
    const [lang, setLang] = useState('en');

    const t = TRANSLATIONS[lang];

    const { data: backendData } = useFetchData(`${BASE_URL}/doctors`);
    const realDoctors = (backendData?.data || []).filter(d => d.isApproved === 'approved' && d.isTeleConsultActive).map(d => ({ ...d, availableSlots: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '6:00 PM'], preferredPlatform: 'both', availableToday: true, responseTime: '2 hrs', nextSlot: '9:00 AM' }));
    const allDoctors = realDoctors.length > 0 ? [...realDoctors, ...DEMO_DOCTORS] : DEMO_DOCTORS;
    const specialties = ['All', ...new Set(allDoctors.map(d => d.specialization).filter(Boolean))];

    const filtered = allDoctors.filter(d => {
        const fee = d.teleConsultPrice || d.ticketPrice || 499;
        return (selectedSpec === 'All' || d.specialization === selectedSpec) &&
            (!searchQuery || d.name?.toLowerCase().includes(searchQuery.toLowerCase()) || d.specialization?.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (activeFilter === 'all' || (activeFilter === 'today' && d.availableToday) || (activeFilter === 'budget' && fee <= 500) || (activeFilter === 'rated' && (d.averageRating || 0) >= 4.8));
    }).sort((a, b) => activeFilter === 'rated' ? (b.averageRating || 0) - (a.averageRating || 0) : 0);

    const handleBookingIntent = (doc) => {
        if (!token) { toast.info('Please login to book a consultation'); navigate('/login'); return; }
        setPendingDoc(doc); setShowSymptomHelper(true);
    };
    const handleSymptomSelect = (tile) => { setPrefilledSymptoms(tile.symptoms); setShowSymptomHelper(false); setBookingDoc(pendingDoc); setPendingDoc(null); };
    const handleSymptomSkip = () => { setShowSymptomHelper(false); setBookingDoc(pendingDoc); setPendingDoc(null); setPrefilledSymptoms(''); };
    const handleConfirmed = (data) => { setBookingDoc(null); setConfirmedBooking(data); toast.success('🎉 Video consultation booked successfully!'); };

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50">
            <MetaHead
              title="Sehaat Saathi Online Doctor Video Calling Booking App | 24/7 Teleconsultation Bihar & India"
              description="Sehaat Saathi doctor video calling booking App (Sehat Sathi Doctor Video Call) — Connect with verified specialist doctors in 5 minutes via Google Meet, Zoom or WhatsApp video call across Madhubani, Darbhanga, Patna & India. Digital prescription included. Helpline: +91 6200087830."
              keywords="doctor video caaling booking app, doctor video calling booking app, doctor video call booking app, online doctor video consultation app bihar, sehat sathi madhubani darbhanga instant doctor video booking app, sehat sathi doctor video call booking App, Sehaat Saathi online Doctor Booking app, sehatt sehaathi doctor video caalling Booking, Sehaat Saathi Doctor Video Calling, Sehat Sathi Telemedicine, Online Doctor Consultation India"
              canonicalUrl="https://sehaatsaathi.com/online-video-booking"
            />
            <SEOKeywordIsland />
            <VideoConsultSEOIsland />
            <LiveStatsBanner />
            {/* Hero */}
            <div className="bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-800 text-white pt-14 pb-12 px-5 sm:px-10 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">{[...Array(20)].map((_, i) => <div key={i} className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s` }} />)}</div>
                <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10 hidden lg:block"><MdVideoCall className="w-72 h-72 text-white" /></div>
                <div className="container mx-auto relative z-10">
                    <div className="flex justify-between items-center mb-6">
                        <Link to="/smarthub" className="inline-flex items-center gap-2 text-violet-200 hover:text-white transition-colors font-bold text-sm"><BsArrowLeft /> Smart Hub</Link>
                        <button onClick={() => setLang(l => l === 'en' ? 'hi' : 'en')} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-2xl border border-white/20 transition-all active:scale-95 group">
                            <BsTranslate className="text-violet-200 group-hover:rotate-12 transition-transform" />
                            <span className="text-xs font-black uppercase tracking-widest">{lang === 'en' ? 'हिंदी' : 'English'}</span>
                        </button>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md mb-4 border border-white/20"><BsCameraVideoFill className="text-violet-200 animate-pulse" /><span className="text-sm font-black tracking-wide uppercase text-white">🔥 Live • {lang === 'en' ? 'Verified Doctors Online' : 'सत्यापित डॉक्टर ऑनलाइन'}</span></div>
                    <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight tracking-tighter">
                        {lang === 'en' ? (
                            <><span className="text-orange-300">Sehaat</span> <span className="text-green-300">Saathi</span><br />Online Video Call<br /><span className="text-violet-200">Doctor Booking</span></>
                        ) : (
                            <><span className="text-orange-300">सेहत</span> <span className="text-green-300">साथी</span><br />ऑनलाइन वीडियो कॉल<br /><span className="text-violet-200">डॉक्टर बुकिंग</span></>
                        )}
                    </h1>
                    <p className="text-violet-200 text-base max-w-xl font-medium leading-relaxed mb-8">{t.subtitle}</p>
                    <div className="flex flex-wrap gap-2">
                        {['🎯 Google Meet', '🎥 Zoom', '🟢 WhatsApp', '🔒 Secure', '✅ Verified', '👨‍👩‍👧 Family Booking', '⏱️ 10/20/45 min', '⭐ Rate After'].map(b => (<div key={b} className="bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs font-black uppercase tracking-wider text-white">{b}</div>))}
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white sticky top-20 z-30 border-b border-gray-100 shadow-sm">
                <div className="container mx-auto px-4 flex items-center gap-1 overflow-x-auto py-1">
                    {[['find', t.findDoctors], ...(token ? [['my-bookings', t.myBookings]] : [])].map(([id, label]) => (
                        <button key={id} onClick={() => setActiveTab(id)} className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${activeTab === id ? 'bg-violet-600 text-white shadow-lg shadow-violet-200' : 'text-gray-500 hover:text-violet-600 hover:bg-violet-50'}`}>{label}</button>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {activeTab === 'find' && (
                    <>
                        {/* Search */}
                        <div className="relative mb-4"><BsSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by doctor name or specialization..." className="w-full pl-10 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-400 shadow-sm" /></div>

                        {/* Smart Filters */}
                        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
                            {[{ id: 'all', label: `🌐 ${t.allDoctors}` }, { id: 'today', label: `🟢 ${t.today}` }, { id: 'budget', label: `💸 ${t.under500}` }, { id: 'rated', label: `⭐ ${t.topRated}` }].map(f => (<button key={f.id} onClick={() => setActiveFilter(f.id)} className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide border-2 transition-all active:scale-95 ${activeFilter === f.id ? 'bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-100' : 'bg-white text-gray-600 border-gray-200 hover:border-violet-300'}`}>{f.label}</button>))}
                        </div>

                        {/* Specialization Filter */}
                        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
                            {specialties.slice(0, 8).map(spec => (<button key={spec} onClick={() => setSelectedSpec(spec)} className={`flex-shrink-0 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wide border-2 transition-all ${selectedSpec === spec ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100' : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'}`}>{spec}</button>))}
                        </div>

                        {/* Featured Strip */}
                        <FeaturedStrip doctors={allDoctors} onBook={handleBookingIntent} onInfo={setProfileDoc} />

                        {/* Stats Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div><h2 className="text-xl font-black text-gray-900">All Doctors — Video Call</h2><p className="text-gray-400 text-sm font-medium">{filtered.length} doctor{filtered.length !== 1 ? 's' : ''} found</p></div>
                            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl border border-green-100"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /><span className="text-xs font-black text-green-700 uppercase tracking-widest">Live</span></div>
                        </div>

                        {filtered.length === 0 && (<div className="text-center py-16"><div className="text-5xl mb-4">🔍</div><p className="text-gray-700 font-black text-lg mb-2">No doctors found</p><p className="text-gray-400 text-sm font-medium mb-5">Try changing the filter or search term</p><button onClick={() => { setActiveFilter('all'); setSelectedSpec('All'); setSearchQuery(''); }} className="px-6 py-3 bg-violet-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg active:scale-95">Clear All Filters</button></div>)}

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map(doc => <VideoDoctorCard key={doc._id} doc={doc} onBook={handleBookingIntent} onInfo={setProfileDoc} />)}
                        </div>

                        {/* Testimonials */}
                        <TestimonialsSection />

                        {/* Why Video Call */}
                        <div className="mt-8 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-8 text-white">
                            <h2 className="text-2xl font-black mb-2 text-center">{t.whyChoose}</h2>
                            <p className="text-violet-200 text-sm text-center mb-8">{lang === 'en' ? '1,000+ patients saved time and money with Sehaat Saathi' : '1,000+ मरीजों ने सेहत साथी के साथ समय और पैसा बचाया'}</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {[{ icon: '🏠', title: t.noTravel, desc: lang === 'en' ? 'No travel, no waiting room, no infection risk' : 'कोई यात्रा नहीं, कोई प्रतीक्षा कक्ष नहीं, कोई संक्रमण का खतरा नहीं' }, { icon: '💰', title: t.saveMoney, desc: lang === 'en' ? 'No travel, no hospital entry fees' : 'कोई यात्रा नहीं, कोई अस्पताल प्रवेश शुल्क नहीं' }, { icon: '⚡', title: t.quickPrescription, desc: lang === 'en' ? 'Medicine list ready in 10–20 minutes' : 'दवा की सूची 10-20 मिनट में तैयार' }, { icon: '🔒', title: '100% Private', desc: lang === 'en' ? 'Your health info is never shared' : 'आपकी स्वास्थ्य जानकारी कभी साझा नहीं की जाती' }, { icon: '👨‍👩‍👧', title: 'Book for Family', desc: lang === 'en' ? 'Book for child, parent or any member' : 'बच्चे, माता-पिता या किसी भी सदस्य के लिए बुक करें' }, { icon: '⏱️', title: 'Choose Duration', desc: lang === 'en' ? '10, 20 or 45-minute sessions available' : '10, 20 या 45 मिनट के सत्र उपलब्ध' }].map(item => (
                                    <div key={item.title} className="bg-white/10 rounded-2xl p-4 text-center hover:bg-white/20 transition-all"><div className="text-3xl mb-2">{item.icon}</div><h3 className="font-black text-sm text-white mb-1">{item.title}</h3><p className="text-violet-200 text-xs font-medium leading-relaxed">{item.desc}</p></div>
                                ))}
                            </div>
                        </div>

                        {/* Privacy Guarantee */}
                        <div className="mt-6 bg-emerald-50 rounded-3xl p-6 border border-emerald-100">
                            <div className="flex items-center gap-3 mb-4"><MdHealthAndSafety className="text-emerald-600 w-8 h-8 flex-shrink-0" /><div><h3 className="font-black text-gray-900 text-base">Your Privacy is 100% Protected</h3><p className="text-gray-500 text-xs font-medium">Especially important for women's health & sensitive topics</p></div></div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {['🔒 Your meeting link is only sent to you — no one else can join', '👤 Your name & health info is never shared with third parties', '🎥 No video recording without your explicit permission', '💚 Safe for women\'s health, mental health & all sensitive topics'].map(item => (
                                    <div key={item} className="flex items-start gap-2 bg-white rounded-xl p-3 border border-emerald-100"><span className="text-sm flex-shrink-0">{item[0]}</span><p className="text-gray-600 text-xs font-bold leading-relaxed">{item.substring(2)}</p></div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'my-bookings' && token && (
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-xl font-black text-gray-900 mb-6">My Video Consultations</h2>
                        <MyBookingsSection token={token} />
                    </div>
                )}
            </div>

            {/* How it Works */}
            {activeTab === 'find' && (
                <div className="bg-white border-t border-gray-100 py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-black text-gray-900 mb-2">{t.howItWorks}</h2>
                        <p className="text-gray-400 text-sm font-medium mb-12">{lang === 'en' ? 'Book in 4 simple steps' : '4 सरल चरणों में बुक करें'}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[{ n: '1', icon: '🌡️', t: t.stepTitle1, d: t.stepDesc1 }, { n: '2', icon: '📅', t: t.stepTitle2, d: t.stepDesc2 }, { n: '3', icon: '💳', t: t.stepTitle3, d: t.stepDesc3 }, { n: '4', icon: '🎥', t: t.stepTitle4, d: t.stepDesc4 }].map(s => (
                                <div key={s.n} className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-3xl p-6 border border-violet-100 hover:shadow-xl transition-all flex flex-col items-center">
                                    <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center text-sm font-black shadow-lg shadow-violet-200 mb-3">{s.n}</div>
                                    <div className="text-3xl mb-2">{s.icon}</div>
                                    <h3 className="font-black text-gray-900 text-sm mb-1">{s.t}</h3>
                                    <p className="text-gray-400 text-xs font-medium leading-relaxed">{s.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {showSymptomHelper && <SymptomHelper onSelect={handleSymptomSelect} onSkip={handleSymptomSkip} />}
            {profileDoc && <QuickProfileModal doc={profileDoc} onClose={() => setProfileDoc(null)} onBook={handleBookingIntent} />}
            {bookingDoc && <BookingModal doc={bookingDoc} token={token} onClose={() => setBookingDoc(null)} onConfirmed={handleConfirmed} prefilledSymptoms={prefilledSymptoms} />}
            {confirmedBooking && <VideoBookingPass booking={confirmedBooking} onClose={() => { setConfirmedBooking(null); setActiveTab('my-bookings'); }} />}
        </div>
    );
};

export default OnlineVideoBooking;
