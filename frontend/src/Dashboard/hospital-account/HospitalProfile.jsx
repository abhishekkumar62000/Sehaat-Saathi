/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL } from "../../config";
import { authContext } from "../../context/AuthContext";
import {
  FaHospital, FaPhone, FaMapMarkerAlt, FaBed, FaCheckCircle,
  FaAngleRight, FaAngleLeft, FaBuilding, FaAmbulance, FaStethoscope,
  FaIdCard, FaClock, FaGlobe, FaEnvelope, FaShieldAlt, FaFlask, FaLungs,
  FaPlus, FaMinus, FaExclamationTriangle, FaUserMd, FaAward, FaCamera,
  FaTrash, FaUserCheck
} from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";
import { BsBuildings, BsShieldCheck } from "react-icons/bs";
import HashLoader from "react-spinners/HashLoader";

const DEPARTMENTS = [
  "Emergency & Trauma","Cardiology","Neurology","Orthopedics","Gynecology & Obstetrics",
  "Pediatrics","General Surgery","Internal Medicine","Radiology","Pathology","Ophthalmology",
  "ENT","Dermatology","Urology","Nephrology","Oncology","Gastroenterology","Psychiatry",
  "Pulmonology","Endocrinology","Physiotherapy","Dental","Ayurveda","ICU / Critical Care",
];

const FACILITIES = [
  "24/7 Emergency","ICU / ICCU","Operation Theatre","Blood Bank","Pharmacy","Ambulance Service",
  "Laboratory","X-Ray","CT Scan","MRI","Ultrasound","Dialysis","NICU","Ventilators",
  "Oxygen Supply","COVID Ward","Isolation Ward","AYUSH Wing","Telemedicine","Cafeteria",
  "Wheelchair Access","Parking","CCTV Surveillance","Wi-Fi",
];

const SPECIALIZATIONS = [
  "Multi-Specialty","Super-Specialty","General Hospital","Maternity Hospital","Children's Hospital",
  "Cancer Hospital","Eye Hospital","Dental Hospital","Orthopaedic Hospital","Cardiac Hospital",
  "Psychiatric Hospital","Government Hospital","Community Health Centre","Primary Health Centre",
];

const INSURANCE_PARTNERS = [
  "Ayushman Bharat (PMJAY)",
];

const ACCREDITATIONS = [
  "NABH Accredited Hospital","NABL Certified Laboratory","ISO 9001:2015 Certified",
  "JCI International Standard","AYUSH Gold Standard","CGHS Approved Center",
];

const CAPACITY_CATEGORIES = [
  {
    key: "generalWard",
    title: "General Ward Beds",
    description: "Regular ward beds for non-critical admitted patients",
    emoji: "🛏️",
    badgeColor: "bg-indigo-100 text-indigo-700",
    borderClass: "border-indigo-200",
    bgClass: "bg-indigo-50/50",
    btnColor: "bg-indigo-600 hover:bg-indigo-700",
  },
  {
    key: "icu",
    title: "ICU / ICCU Beds",
    description: "Intensive Care Unit with cardiac & multi-para vital monitoring",
    emoji: "🏥",
    badgeColor: "bg-red-100 text-red-700",
    borderClass: "border-red-200",
    bgClass: "bg-red-50/50",
    btnColor: "bg-red-600 hover:bg-red-700",
  },
  {
    key: "oxygenBeds",
    title: "Oxygen Beds / Cylinders",
    description: "Dedicated beds equipped with continuous central oxygen line or cylinders",
    emoji: "💨",
    badgeColor: "bg-cyan-100 text-cyan-700",
    borderClass: "border-cyan-200",
    bgClass: "bg-cyan-50/50",
    btnColor: "bg-cyan-600 hover:bg-cyan-700",
  },
  {
    key: "ventilators",
    title: "Ventilator Units",
    description: "Invasive & Non-invasive mechanical respiratory ventilators for critical care",
    emoji: "🫁",
    badgeColor: "bg-blue-100 text-blue-700",
    borderClass: "border-blue-200",
    bgClass: "bg-blue-50/50",
    btnColor: "bg-blue-600 hover:bg-blue-700",
  },
  {
    key: "operationTheatres",
    title: "Operation Theatres (OT)",
    description: "Major & Minor Surgical OT rooms ready for surgical procedures",
    emoji: "🩺",
    badgeColor: "bg-purple-100 text-purple-700",
    borderClass: "border-purple-200",
    bgClass: "bg-purple-50/50",
    btnColor: "bg-purple-600 hover:bg-purple-700",
  },
  {
    key: "nicuPicu",
    title: "NICU / PICU Units",
    description: "Neonatal & Pediatric Intensive Care units for infants and children",
    emoji: "👶",
    badgeColor: "bg-pink-100 text-pink-700",
    borderClass: "border-pink-200",
    bgClass: "bg-pink-50/50",
    btnColor: "bg-pink-600 hover:bg-pink-700",
  },
  {
    key: "emergencyBeds",
    title: "Emergency & Trauma Beds",
    description: "Immediate triage & resuscitation casualty beds active 24/7",
    emoji: "🚨",
    badgeColor: "bg-amber-100 text-amber-700",
    borderClass: "border-amber-200",
    bgClass: "bg-amber-50/50",
    btnColor: "bg-amber-600 hover:bg-amber-700",
  },
];

const defaultCapacity = {
  generalWard: { enabled: true, total: 50, available: 15 },
  icu: { enabled: true, total: 10, available: 3 },
  oxygenBeds: { enabled: true, total: 20, available: 8 },
  ventilators: { enabled: true, total: 5, available: 2 },
  operationTheatres: { enabled: true, total: 4, available: 2 },
  nicuPicu: { enabled: false, total: 0, available: 0 },
  emergencyBeds: { enabled: true, total: 12, available: 4 },
};

const SUGGESTED_SPECIALIZATIONS = [
  "Cardiology", "Neurology", "Pediatrics", "Gynaecology & Obstetrics", "Orthopedics",
  "Dermatology", "Oncology", "Ophthalmology", "ENT (Ear, Nose, Throat)", "General Medicine",
  "General Surgery", "Gastroenterology", "Nephrology", "Urology", "Psychiatry", "Ayurveda"
];

const SUGGESTED_QUALIFICATIONS = [
  "MBBS", "MD", "MS", "DM (Cardiology)", "DM (Neurology)", "MCh (Neurosurgery)",
  "MCh (Urology)", "BAMS", "BHMS", "BDS", "MDS", "DNB", "MD, DM", "MS, MCh"
];

const SUGGESTED_OPD_DAYS = [
  "Mon-Sat", "Mon-Fri", "Daily", "Mon-Wed-Fri", "Tue-Thu-Sat", "Weekend (Sat-Sun)",
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

const SUGGESTED_OPD_TIMINGS = [
  "09:00 AM - 01:00 PM", "10:00 AM - 02:00 PM", "02:00 PM - 06:00 PM",
  "05:00 PM - 09:00 PM", "09:00 AM - 05:00 PM", "10:00 AM - 04:00 PM",
  "08:00 AM - 08:00 PM", "24 Hours Emergency"
];

const HospitalProfile = ({ hospitalData }) => {
  const { token } = useContext(authContext);
  const [loading, setLoading] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    hospitalName: "",
    tagline: "",
    email: "",
    contactNumber: "",
    emergencyNumber: "",
    website: "",
    district: "",
    city: "",
    state: "Bihar",
    pincode: "",
    address: "",
    registrationNumber: "",
    establishedYear: "",
    hospitalType: "Private",
    totalBeds: 0,
    availableBeds: 0,
    icuBeds: 0,
    ventilators: 0,
    consultationFee: 0,
    departments: [],
    specializations: [],
    facilities: [],
    insurancePartners: [],
    accreditations: [],
    galleryPhotos: [],
    doctorRoster: [
      {
        name: "Dr. Rajesh Sharma",
        specialization: "Cardiology",
        qualification: "MD, DM (Cardiology)",
        experience: "12 Years",
        opdDays: "Mon-Sat",
        opdTime: "10:00 AM - 2:00 PM",
        fee: 500,
        isAvailable: true,
      }
    ],
    ambulanceFleet: {
      total: 3,
      blsCount: 2,
      alsCount: 1,
      hotline: "+91 108"
    },
    capacityDetails: defaultCapacity,
    bio: "",
    workingHours: "8:00 AM – 8:00 PM",
    acceptsAyushmanBharat: false,
    acceptsEmergency: true,
    isLive: false,
    photo: null,
    weeklySchedule: [
      { day: "Monday", isAvailable: true, startTime: "09:00", endTime: "17:00" },
      { day: "Tuesday", isAvailable: true, startTime: "09:00", endTime: "17:00" },
      { day: "Wednesday", isAvailable: true, startTime: "09:00", endTime: "17:00" },
      { day: "Thursday", isAvailable: false, startTime: "09:00", endTime: "17:00" },
      { day: "Friday", isAvailable: true, startTime: "09:00", endTime: "17:00" },
      { day: "Saturday", isAvailable: true, startTime: "09:00", endTime: "17:00" },
      { day: "Sunday", isAvailable: false, startTime: "09:00", endTime: "17:00" }
    ]
  });

  const calculateProgress = () => {
    const filled = Object.entries(formData).filter(([k, v]) => {
      if (Array.isArray(v)) return v.length > 0;
      if (typeof v === "boolean") return true;
      if (typeof v === "object" && v !== null) return Object.keys(v).length > 0;
      return v !== "" && v !== null && v !== 0;
    });
    return Math.min(Math.round((filled.length / Object.keys(formData).length) * 100), 100);
  };

  useEffect(() => {
    if (hospitalData) {
      const initialCapacity = hospitalData?.capacityDetails || {
        generalWard: { enabled: true, total: hospitalData?.totalBeds || 50, available: hospitalData?.availableBeds || 15 },
        icu: { enabled: true, total: hospitalData?.icuBeds || 10, available: 3 },
        oxygenBeds: { enabled: true, total: 20, available: 8 },
        ventilators: { enabled: true, total: hospitalData?.ventilators || 5, available: 2 },
        operationTheatres: { enabled: true, total: 4, available: 2 },
        nicuPicu: { enabled: false, total: 0, available: 0 },
        emergencyBeds: { enabled: true, total: 12, available: 4 },
      };

      setFormData({
        hospitalName: hospitalData?.hospitalName || "",
        tagline: hospitalData?.tagline || "",
        email: hospitalData?.email || "",
        contactNumber: hospitalData?.contactNumber || "",
        emergencyNumber: hospitalData?.emergencyNumber || "",
        website: hospitalData?.website || "",
        district: hospitalData?.district || "",
        city: hospitalData?.city || "",
        state: hospitalData?.state || "Bihar",
        pincode: hospitalData?.pincode || "",
        address: hospitalData?.address || "",
        registrationNumber: hospitalData?.registrationNumber || "",
        establishedYear: hospitalData?.establishedYear || "",
        hospitalType: hospitalData?.hospitalType || "Private",
        totalBeds: hospitalData?.totalBeds || 0,
        availableBeds: hospitalData?.availableBeds || 0,
        icuBeds: hospitalData?.icuBeds || 0,
        ventilators: hospitalData?.ventilators || 0,
        consultationFee: hospitalData?.consultationFee || 0,
        departments: hospitalData?.departments || [],
        specializations: hospitalData?.specializations || [],
        facilities: hospitalData?.facilities || [],
        insurancePartners: hospitalData?.insurancePartners || [],
        accreditations: hospitalData?.accreditations || [],
        galleryPhotos: hospitalData?.galleryPhotos || [],
        doctorRoster: hospitalData?.doctorRoster?.length > 0 ? hospitalData.doctorRoster : [
          {
            name: "Dr. Rajesh Sharma",
            specialization: "Cardiology",
            qualification: "MD, DM (Cardiology)",
            experience: "12 Years",
            opdDays: "Mon-Sat",
            opdTime: "10:00 AM - 2:00 PM",
            fee: 500,
            isAvailable: true,
          }
        ],
        ambulanceFleet: hospitalData?.ambulanceFleet || {
          total: 3,
          blsCount: 2,
          alsCount: 1,
          hotline: hospitalData?.emergencyNumber || "+91 108"
        },
        capacityDetails: initialCapacity,
        bio: hospitalData?.bio || "",
        workingHours: hospitalData?.workingHours || "8:00 AM – 8:00 PM",
        acceptsAyushmanBharat: hospitalData?.acceptsAyushmanBharat || false,
        acceptsEmergency: hospitalData?.acceptsEmergency || true,
        isLive: hospitalData?.isLive || false,
        photo: hospitalData?.photo || null,
        weeklySchedule: hospitalData?.weeklySchedule?.length > 0 ? hospitalData.weeklySchedule : [
          { day: "Monday", isAvailable: true, startTime: "09:00", endTime: "17:00" },
          { day: "Tuesday", isAvailable: true, startTime: "09:00", endTime: "17:00" },
          { day: "Wednesday", isAvailable: true, startTime: "09:00", endTime: "17:00" },
          { day: "Thursday", isAvailable: false, startTime: "09:00", endTime: "17:00" },
          { day: "Friday", isAvailable: true, startTime: "09:00", endTime: "17:00" },
          { day: "Saturday", isAvailable: true, startTime: "09:00", endTime: "17:00" },
          { day: "Sunday", isAvailable: false, startTime: "09:00", endTime: "17:00" }
        ]
      });
    }
  }, [hospitalData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleWeeklyScheduleChange = (index, field, value) => {
    setFormData(prev => {
      const updatedSchedule = [...(prev.weeklySchedule || [])];
      updatedSchedule[index] = {
        ...updatedSchedule[index],
        [field]: value
      };
      return {
        ...prev,
        weeklySchedule: updatedSchedule
      };
    });
  };

  const handleArrayToggle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(i => i !== value)
        : [...prev[field], value],
    }));
  };

  // Synchronized capacity handler
  const handleCapacityChange = (catKey, field, val) => {
    setFormData(prev => {
      const currentCat = prev.capacityDetails[catKey] || { enabled: true, total: 0, available: 0 };
      const updatedCat = {
        ...currentCat,
        [field]: field === "enabled" ? val : Math.max(0, Number(val) || 0)
      };

      if (field === "total" && updatedCat.available > updatedCat.total) {
        updatedCat.available = updatedCat.total;
      }
      if (field === "available" && updatedCat.available > updatedCat.total) {
        updatedCat.available = updatedCat.total;
      }

      const newCapDetails = {
        ...prev.capacityDetails,
        [catKey]: updatedCat
      };

      let totalSum = 0;
      let availSum = 0;

      Object.entries(newCapDetails).forEach(([k, v]) => {
        if (v.enabled && k !== "operationTheatres") {
          totalSum += Number(v.total) || 0;
          availSum += Number(v.available) || 0;
        }
      });

      const icuTotal = newCapDetails.icu?.enabled ? (Number(newCapDetails.icu.total) || 0) : 0;
      const ventTotal = newCapDetails.ventilators?.enabled ? (Number(newCapDetails.ventilators.total) || 0) : 0;

      return {
        ...prev,
        capacityDetails: newCapDetails,
        totalBeds: totalSum,
        availableBeds: availSum,
        icuBeds: icuTotal,
        ventilators: ventTotal,
      };
    });
  };

  const adjustAvailable = (catKey, delta) => {
    const cat = formData.capacityDetails[catKey];
    if (!cat || !cat.enabled) return;
    const newAvail = Math.min(cat.total, Math.max(0, (cat.available || 0) + delta));
    handleCapacityChange(catKey, "available", newAvail);
  };

  const setFullOrEmpty = (catKey, type) => {
    const cat = formData.capacityDetails[catKey];
    if (!cat || !cat.enabled) return;
    const target = type === "empty" ? cat.total : 0;
    handleCapacityChange(catKey, "available", target);
  };

  // Doctor Roster Handlers
  const handleAddDoctorRoster = () => {
    setFormData(prev => ({
      ...prev,
      doctorRoster: [
        ...prev.doctorRoster,
        {
          name: "",
          specialization: "General Medicine",
          qualification: "MBBS",
          experience: "5 Years",
          opdDays: "Mon-Sat",
          opdTime: "9:00 AM - 1:00 PM",
          fee: 400,
          isAvailable: true,
        }
      ]
    }));
  };

  const handleDoctorRosterChange = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.doctorRoster];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, doctorRoster: updated };
    });
  };

  const handleRemoveDoctorRoster = (index) => {
    setFormData(prev => ({
      ...prev,
      doctorRoster: prev.doctorRoster.filter((_, i) => i !== index)
    }));
  };

  // Gallery Photo Handlers
  const [galleryUrlInput, setGalleryUrlInput] = useState("");
  const handleAddGalleryPhoto = () => {
    if (!galleryUrlInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      galleryPhotos: [...prev.galleryPhotos, galleryUrlInput.trim()]
    }));
    setGalleryUrlInput("");
    toast.success("Gallery photo link added!");
  };

  const handleRemoveGalleryPhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      galleryPhotos: prev.galleryPhotos.filter((_, i) => i !== index)
    }));
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setPhotoLoading(true);
    try {
      const data = await uploadImageToCloudinary(file);
      setFormData(prev => ({ ...prev, photo: data.secure_url || data.url }));
      toast.success("Hospital logo uploaded!");
    } catch (err) {
      toast.error("Photo upload failed");
    } finally {
      setPhotoLoading(false);
    }
  };

  const updateProfileHandler = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    
    // Automatically force isLive to true when saving profile
    const updatedFormData = { ...formData, isLive: true };
    setFormData(updatedFormData);

    try {
      const res = await fetch(`${BASE_URL}/hospitals/${hospitalData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFormData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      toast.success("🏥 Hospital profile, doctor roster & real-time capacity updated! Hospital is now LIVE 🟢");
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const progress = calculateProgress();

  const labelClass = "text-[11px] font-black text-gray-500 uppercase tracking-widest block mb-2";
  const inputClass = "w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium text-sm";

  const activeBedsTotal = formData.totalBeds;
  const activeBedsAvail = formData.availableBeds;
  const overallOccupancy = activeBedsTotal > 0 ? Math.round(((activeBedsTotal - activeBedsAvail) / activeBedsTotal) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-blue-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
              <FaHospital className="w-8 h-8 text-indigo-300" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">{formData.hospitalName || "Hospital Profile"}</h1>
              <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mt-1">Configure your Hospital Node</p>
              <div className="flex items-center gap-2 mt-2">
                <div className={`w-2.5 h-2.5 rounded-full ${formData.isLive ? "bg-green-400 animate-pulse" : "bg-orange-400"}`} />
                <span className="text-[11px] font-black uppercase tracking-wider text-indigo-200">
                  {formData.isLive ? "🟢 LIVE ON SEHAAT SAATHI" : "⚫ COMPLETE PROFILE TO GO LIVE"}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-60 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="flex justify-between items-center text-xs font-black uppercase tracking-wider mb-2">
              <span className="text-indigo-200">Quality Score</span>
              <span className="text-green-300">{progress}% {progress >= 85 ? "👑 Platinum" : "⭐ Gold"}</span>
            </div>
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        {/* Wizard Steps Nav */}
        <div className="grid grid-cols-5 gap-2.5 mt-8 pt-6 border-t border-white/10">
          {[
            { step: 1, label: "Identity", icon: FaIdCard },
            { step: 2, label: "Location", icon: FaMapMarkerAlt },
            { step: 3, label: "Capacity", icon: FaBed },
            { step: 4, label: "Doctors", icon: FaUserMd },
            { step: 5, label: "Services", icon: FaStethoscope },
          ].map(s => {
            const Icon = s.icon;
            const isActive = currentStep === s.step;
            const isDone = currentStep > s.step;
            return (
              <button key={s.step} type="button" onClick={() => setCurrentStep(s.step)}
                className={`flex items-center justify-center gap-2 py-3.5 px-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all ${isActive ? "bg-white text-indigo-950 shadow-lg scale-105" : isDone ? "bg-white/20 text-white" : "bg-white/5 text-indigo-300 hover:bg-white/10"}`}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="hidden md:inline">{s.label}</span>
                {isDone && <FaCheckCircle className="w-3.5 h-3.5 text-green-400 hidden md:inline ml-auto" />}
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={updateProfileHandler}>

        {/* ===================== STEP 1: IDENTITY & ACCREDITATION ===================== */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                <FaHospital className="text-indigo-400" /> Basic Hospital Info
              </h3>

              {/* Photo Upload */}
              <div className="flex items-center gap-6 mb-8 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-white border-2 border-indigo-200 flex items-center justify-center flex-shrink-0 shadow-md">
                  {formData.photo ? (
                    <img src={formData.photo} alt="Hospital Logo" className="w-full h-full object-cover" />
                  ) : (
                    <FaHospital className="text-indigo-300 w-10 h-10" />
                  )}
                  {photoLoading && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <HashLoader size={20} color="#ffffff" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-xs font-black text-indigo-900 uppercase tracking-widest mb-1">Hospital Logo / Building Photo</p>
                  <p className="text-xs text-gray-400 mb-3">Upload clear image for display in search cards (max 5MB)</p>
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200">
                    <MdCloudUpload className="w-4 h-4" /> Upload Photo
                    <input type="file" onChange={handleFileInputChange} accept="image/*" className="hidden" />
                  </label>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <FaHospital className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                    <input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleInputChange} placeholder="AIIMS Patna / Apollo Hospital" className={inputClass} required />
                    <span className={labelClass}>Hospital Name *</span>
                  </div>
                  <div className="relative group">
                    <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                    <input type="text" name="tagline" value={formData.tagline} onChange={handleInputChange} placeholder="Super-Specialty Care Center" className={inputClass} />
                    <span className={labelClass}>Tagline / Sub-heading</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative group">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                    <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} placeholder="+91 6200..." className={inputClass} required />
                    <span className={labelClass}>Main Contact *</span>
                  </div>
                  <div className="relative group">
                    <FaAmbulance className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 z-10" />
                    <input type="tel" name="emergencyNumber" value={formData.emergencyNumber} onChange={handleInputChange} placeholder="+91 108..." className={inputClass} />
                    <span className={labelClass}>Emergency No.</span>
                  </div>
                  <div className="relative group">
                    <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                    <input type="number" name="establishedYear" value={formData.establishedYear} onChange={handleInputChange} placeholder="2005" className={inputClass} />
                    <span className={labelClass}>Est. Year</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative group">
                    <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                    <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleInputChange} placeholder="MED-BIH-2024-884" className={inputClass} />
                    <span className={labelClass}>Registration / License No.</span>
                  </div>
                  <div className="relative group">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="info@hospital.com" className={inputClass} />
                    <span className={labelClass}>Hospital Email</span>
                  </div>
                  <div className="relative group">
                    <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                    <input type="url" name="website" value={formData.website} onChange={handleInputChange} placeholder="https://hospital.com" className={inputClass} />
                    <span className={labelClass}>Website (Optional)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Accreditations & Quality Certifications Badges */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                <FaAward className="text-amber-500" /> Accreditations & Quality Certifications
              </h3>
              <p className="text-xs text-gray-400 font-medium mb-5">Select all verified certifications held by your hospital</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {ACCREDITATIONS.map(acc => {
                  const isChecked = formData.accreditations.includes(acc);
                  return (
                    <button key={acc} type="button" onClick={() => handleArrayToggle("accreditations", acc)}
                      className={`flex items-center gap-3 p-4 rounded-2xl text-xs font-black transition-all border-2 text-left ${isChecked ? "bg-amber-50 border-amber-400 text-amber-900 shadow-sm" : "bg-gray-50 border-gray-100 text-gray-500 hover:border-amber-200"}`}>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isChecked ? "bg-amber-500 border-amber-500 text-white" : "border-gray-300"}`}>
                        {isChecked && <BsShieldCheck className="w-3.5 h-3.5" />}
                      </div>
                      <span>{acc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hospital Type */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                <FaShieldAlt className="text-indigo-400" /> Hospital Category
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                {["Government", "Private"].map(type => (
                  <button key={type} type="button" onClick={() => setFormData(prev => ({ ...prev, hospitalType: type }))}
                    className={`py-3 px-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all border-2 ${formData.hospitalType === type ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200 scale-105" : "bg-gray-50 text-gray-500 border-gray-100 hover:border-indigo-200 hover:text-indigo-600"}`}>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-4">About the Hospital</h3>
              <div className="relative">
                <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows="4" maxLength={400}
                  placeholder="Describe the hospital's mission, specializations, patient care philosophy..."
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium text-sm resize-none" />
                <div className="absolute bottom-3 right-4 text-[10px] font-black text-gray-400 uppercase">{formData.bio?.length || 0}/400</div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                <FaClock className="text-indigo-400" /> Working Hours & Availability
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                  <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                  <input type="text" name="workingHours" value={formData.workingHours} onChange={handleInputChange} placeholder="8:00 AM – 8:00 PM" className={inputClass} />
                  <span className={labelClass}>OPD Hours</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl border border-green-100">
                  <input type="checkbox" id="acceptsEmergency" name="acceptsEmergency" checked={formData.acceptsEmergency} onChange={handleInputChange} className="w-5 h-5 accent-green-600 rounded cursor-pointer" />
                  <label htmlFor="acceptsEmergency" className="text-sm font-black text-green-800 uppercase tracking-wider cursor-pointer">24/7 Emergency Active</label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== STEP 2: LOCATION & INSURANCE TPA ===================== */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                <FaMapMarkerAlt className="text-orange-400" /> Hospital Address & Location
              </h3>
              <div className="space-y-6">
                <div className="relative group">
                  <FaMapMarkerAlt className="absolute left-4 top-5 text-gray-400 z-10" />
                  <textarea name="address" value={formData.address} onChange={handleInputChange} rows="3"
                    placeholder="Complete street address, landmark, area..."
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium text-sm resize-none" required />
                  <span className={labelClass}>Full Address *</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Patna" className={inputClass} />
                    <span className={labelClass}>City / Town</span>
                  </div>
                  <div className="relative group">
                    <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                    <input type="text" name="district" value={formData.district} onChange={handleInputChange} placeholder="Patna" className={inputClass} required />
                    <span className={labelClass}>District *</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                    <select name="state" value={formData.state} onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-sm appearance-none">
                      {["Bihar","Jharkhand","UP","Uttarakhand","West Bengal","Delhi","Maharashtra","Karnataka","Tamil Nadu","Gujarat","Rajasthan"].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <span className={labelClass}>State</span>
                  </div>
                  <div className="relative group">
                    <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="800001" className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-sm" />
                    <span className={labelClass}>Pincode</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Insurance & TPA Empanelment */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                <BsShieldCheck className="text-emerald-500" /> Cashless Insurance & TPA Empanelments
              </h3>
              <p className="text-xs text-gray-400 font-medium mb-5">Select all insurance providers accepted for cashless mediclaim at your hospital</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {INSURANCE_PARTNERS.map(partner => {
                  const isChecked = formData.insurancePartners.includes(partner);
                  return (
                    <button key={partner} type="button" onClick={() => handleArrayToggle("insurancePartners", partner)}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl text-xs font-bold transition-all border-2 text-left ${isChecked ? "bg-emerald-50 border-emerald-400 text-emerald-900 shadow-sm" : "bg-gray-50 border-gray-100 text-gray-500 hover:border-emerald-200"}`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isChecked ? "bg-emerald-500 border-emerald-500 text-white" : "border-gray-300"}`}>
                        {isChecked && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <span>{partner}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ambulance Fleet Specs */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                <FaAmbulance className="text-red-500" /> Emergency Ambulance Fleet Specs
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-4 bg-red-50/50 rounded-2xl border border-red-100">
                  <label className="text-[10px] font-black text-red-500 uppercase tracking-widest block mb-2">Total Fleet</label>
                  <input type="number" min="0" value={formData.ambulanceFleet.total}
                    onChange={e => setFormData(p => ({ ...p, ambulanceFleet: { ...p.ambulanceFleet, total: Number(e.target.value) } }))}
                    className="w-full text-2xl font-black text-red-700 bg-white border border-red-200 rounded-xl px-3 py-2 outline-none text-center" />
                </div>
                <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                  <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest block mb-2">BLS Ambulances</label>
                  <input type="number" min="0" value={formData.ambulanceFleet.blsCount}
                    onChange={e => setFormData(p => ({ ...p, ambulanceFleet: { ...p.ambulanceFleet, blsCount: Number(e.target.value) } }))}
                    className="w-full text-2xl font-black text-blue-700 bg-white border border-blue-200 rounded-xl px-3 py-2 outline-none text-center" />
                </div>
                <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
                  <label className="text-[10px] font-black text-purple-500 uppercase tracking-widest block mb-2">ALS Ventilator Fleet</label>
                  <input type="number" min="0" value={formData.ambulanceFleet.alsCount}
                    onChange={e => setFormData(p => ({ ...p, ambulanceFleet: { ...p.ambulanceFleet, alsCount: Number(e.target.value) } }))}
                    className="w-full text-2xl font-black text-purple-700 bg-white border border-purple-200 rounded-xl px-3 py-2 outline-none text-center" />
                </div>
                <div className="p-4 bg-green-50/50 rounded-2xl border border-green-100">
                  <label className="text-[10px] font-black text-green-600 uppercase tracking-widest block mb-2">24/7 Hotline</label>
                  <input type="text" value={formData.ambulanceFleet.hotline}
                    onChange={e => setFormData(p => ({ ...p, ambulanceFleet: { ...p.ambulanceFleet, hotline: e.target.value } }))}
                    placeholder="+91 108"
                    className="w-full text-sm font-black text-green-800 bg-white border border-green-200 rounded-xl px-3 py-3 outline-none text-center" />
                </div>
              </div>
            </div>

            {/* Consultation Fee */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                OPD Consultation Fee (₹)
              </h3>
              <div className="relative group max-w-sm">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-black text-lg z-10">₹</span>
                <input type="number" name="consultationFee" value={formData.consultationFee} onChange={handleInputChange} placeholder="500"
                  className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-black text-xl" />
                <span className={labelClass}>OPD Consultation Fee</span>
              </div>
            </div>
          </div>
        )}

        {/* ===================== STEP 3: REAL-TIME CAPACITY & INFRASTRUCTURE ===================== */}
        {currentStep === 3 && (
          <div className="space-y-8 animate-fadeIn">
            {/* Live Summary Bar */}
            <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4 border-b border-indigo-800/60 pb-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                      <h2 className="text-xl font-black tracking-wide text-white">REAL-TIME CAPACITY CONTROL PANEL</h2>
                    </div>
                    <p className="text-xs text-indigo-300 font-bold uppercase tracking-widest mt-1">
                      Separately input total vs empty/khali beds for every department
                    </p>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm border border-white/10">
                    <span className="text-xs font-black uppercase text-indigo-200">Overall Hospital Occupancy</span>
                    <span className={`text-sm font-black px-3 py-1 rounded-full ${overallOccupancy > 90 ? "bg-red-500 text-white" : overallOccupancy > 70 ? "bg-orange-500 text-white" : "bg-green-500 text-white"}`}>
                      {overallOccupancy}% Occupied
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-white/10 rounded-2xl text-center border border-white/10">
                    <p className="text-3xl font-black text-white">{activeBedsTotal}</p>
                    <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mt-1">Total Active Beds</p>
                  </div>
                  <div className="p-4 bg-green-500/20 rounded-2xl text-center border border-green-400/30">
                    <p className="text-3xl font-black text-green-300">{activeBedsAvail}</p>
                    <p className="text-[10px] font-black text-green-200 uppercase tracking-widest mt-1">Free / Khali Now</p>
                  </div>
                  <div className="p-4 bg-red-500/20 rounded-2xl text-center border border-red-400/30">
                    <p className="text-3xl font-black text-red-300">{formData.icuBeds}</p>
                    <p className="text-[10px] font-black text-red-200 uppercase tracking-widest mt-1">ICU Capacity</p>
                  </div>
                  <div className="p-4 bg-blue-500/20 rounded-2xl text-center border border-blue-400/30">
                    <p className="text-3xl font-black text-blue-300">{formData.ventilators}</p>
                    <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mt-1">Ventilators</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Categorized Capacity Input Cards */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-indigo-950 uppercase tracking-widest">
                    Infrastructure & Ward Capacity Breakdown
                  </h3>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    Toggle service button ON to configure Total Capacity & Real-Time Free / Khali Beds
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {CAPACITY_CATEGORIES.map(cat => {
                  const data = formData.capacityDetails?.[cat.key] || { enabled: false, total: 0, available: 0 };
                  const isEnabled = data.enabled;
                  const total = data.total || 0;
                  const avail = data.available || 0;
                  const occupied = Math.max(0, total - avail);
                  const freePercent = total > 0 ? Math.round((avail / total) * 100) : 0;

                  return (
                    <div key={cat.key}
                      className={`relative p-7 rounded-3xl border-2 transition-all duration-300 ${
                        isEnabled
                          ? `${cat.bgClass} ${cat.borderClass} shadow-md`
                          : "bg-gray-50/70 border-gray-200 opacity-80 hover:opacity-100"
                      }`}>

                      {/* Header Row: Title + Toggle Switch Button */}
                      <div className="flex items-center justify-between flex-wrap gap-4 mb-5 border-b pb-4 border-gray-200/60">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-gray-100 flex-shrink-0">
                            {cat.emoji}
                          </div>
                          <div>
                            <div className="flex items-center gap-3">
                              <h4 className="font-black text-gray-900 text-base">{cat.title}</h4>
                              {isEnabled && (
                                <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${cat.badgeColor}`}>
                                  Active Service
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">{cat.description}</p>
                          </div>
                        </div>

                        {/* TOGGLE BUTTON */}
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-black uppercase tracking-wider ${isEnabled ? "text-green-600" : "text-gray-400"}`}>
                            {isEnabled ? "Service ON" : "Service OFF"}
                          </span>
                          <button type="button" onClick={() => handleCapacityChange(cat.key, "enabled", !isEnabled)}
                            className={`relative w-16 h-9 rounded-full transition-colors duration-300 ${isEnabled ? "bg-green-500 shadow-md shadow-green-200" : "bg-gray-300"}`}>
                            <div className={`absolute top-1 left-1 w-7 h-7 bg-white rounded-full shadow-md transition-transform duration-300 ${isEnabled ? "translate-x-7" : ""}`} />
                          </button>
                        </div>
                      </div>

                      {/* SERVICE OFF STATE */}
                      {!isEnabled ? (
                        <div className="py-6 px-4 text-center rounded-2xl bg-white/70 border border-dashed border-gray-300">
                          <p className="text-xs text-gray-500 font-bold mb-3">
                            This service is currently disabled or not available at your hospital.
                          </p>
                          <button type="button" onClick={() => handleCapacityChange(cat.key, "enabled", true)}
                            className={`px-5 py-2.5 ${cat.btnColor} text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-sm active:scale-95`}>
                            ➕ Activate {cat.title} Service
                          </button>
                        </div>
                      ) : (
                        /* SERVICE ON STATE */
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Total Capacity Input */}
                            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                              <label className="text-xs font-black text-gray-700 uppercase tracking-wider block mb-2">
                                Total {cat.title} Capacity
                              </label>
                              <div className="flex items-center gap-3">
                                <input type="number" min="0" value={total}
                                  onChange={e => handleCapacityChange(cat.key, "total", e.target.value)}
                                  className="w-full text-3xl font-black text-gray-900 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 text-center" />
                                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Total</span>
                              </div>
                            </div>

                            {/* Available / Khali Beds Input */}
                            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                              <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-black text-green-700 uppercase tracking-wider block">
                                  Currently Free / Khali Now
                                </label>
                                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                                  avail === 0 ? "bg-red-100 text-red-700" : freePercent > 40 ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                                }`}>
                                  {avail === 0 ? "FULL / CRITICAL" : freePercent > 40 ? "HIGH FREE" : "LIMITED"}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <input type="number" min="0" max={total} value={avail}
                                  onChange={e => handleCapacityChange(cat.key, "available", e.target.value)}
                                  className="w-full text-3xl font-black text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500 text-center" />
                                <span className="text-xs font-black text-green-600 uppercase tracking-widest">Free</span>
                              </div>
                            </div>
                          </div>

                          {/* Real-time Occupancy Visual Bar & Quick Touch Controls */}
                          <div className="bg-white/80 p-5 rounded-2xl border border-gray-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="w-full md:flex-1">
                              <div className="flex justify-between text-xs font-bold text-gray-600 mb-1.5">
                                <span>Occupied: <strong className="text-gray-900">{occupied}</strong></span>
                                <span>Free / Khali: <strong className="text-green-600">{avail}</strong> ({freePercent}%)</span>
                              </div>
                              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden flex">
                                <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${total > 0 ? (occupied / total) * 100 : 0}%` }} />
                                <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${total > 0 ? (avail / total) * 100 : 0}%` }} />
                              </div>
                            </div>

                            {/* Quick Touch Adjustment Buttons */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <button type="button" onClick={() => adjustAvailable(cat.key, -1)} disabled={avail <= 0}
                                className="px-3 py-2 bg-red-50 text-red-600 border border-red-200 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-red-600 hover:text-white transition-all disabled:opacity-30 active:scale-95 flex items-center gap-1">
                                <FaMinus className="w-2.5 h-2.5" /> 1 Khali
                              </button>
                              <button type="button" onClick={() => adjustAvailable(cat.key, 1)} disabled={avail >= total}
                                className="px-3 py-2 bg-green-50 text-green-600 border border-green-200 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-green-600 hover:text-white transition-all disabled:opacity-30 active:scale-95 flex items-center gap-1">
                                <FaPlus className="w-2.5 h-2.5" /> 1 Khali
                              </button>
                              <button type="button" onClick={() => setFullOrEmpty(cat.key, "full")}
                                className="px-3 py-2 bg-gray-100 text-gray-700 border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-gray-200 transition-all active:scale-95">
                                Set Full
                              </button>
                              <button type="button" onClick={() => setFullOrEmpty(cat.key, "empty")}
                                className="px-3 py-2 bg-green-100 text-green-700 border border-green-200 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-green-200 transition-all active:scale-95">
                                Set All Empty
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Specializations */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                <BsBuildings className="text-indigo-400" /> Hospital Category / Specialization
              </h3>
              <p className="text-xs text-gray-400 font-medium mb-5">Select all that apply</p>
              <div className="flex flex-wrap gap-3">
                {SPECIALIZATIONS.map(spec => (
                  <button key={spec} type="button" onClick={() => handleArrayToggle("specializations", spec)}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all border-2 ${formData.specializations.includes(spec) ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200 scale-105" : "bg-gray-50 text-gray-500 border-gray-100 hover:border-blue-200 hover:text-blue-600"}`}>
                    {spec}
                  </button>
                ))}
              </div>
            </div>

            {/* Departments */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                <FaStethoscope className="text-indigo-400" /> Active Departments
              </h3>
              <p className="text-xs text-gray-400 font-medium mb-5">Select all operational departments in your hospital</p>
              <div className="flex flex-wrap gap-3">
                {DEPARTMENTS.map(dept => (
                  <button key={dept} type="button" onClick={() => handleArrayToggle("departments", dept)}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all border-2 ${formData.departments.includes(dept) ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 scale-105" : "bg-gray-50 text-gray-500 border-gray-100 hover:border-indigo-200 hover:text-indigo-600"}`}>
                    {dept}
                  </button>
                ))}
              </div>
              {formData.departments.length > 0 && (
                <div className="mt-4 p-3 bg-indigo-50 rounded-2xl">
                  <p className="text-xs font-black text-indigo-600 uppercase tracking-widest">✅ {formData.departments.length} Departments Selected</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================== STEP 4: DOCTOR SPECIALIST ROSTER (NEW WOW FEATURE) ===================== */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <div>
                  <h3 className="text-base font-black text-indigo-950 uppercase tracking-widest flex items-center gap-2">
                    <FaUserMd className="text-indigo-600" /> On-Site Doctor & Specialist Team Roster
                  </h3>
                  <p className="text-xs text-gray-500 font-medium mt-1">
                    Add doctors available at your hospital so patients can see specialists on duty
                  </p>
                </div>
                <button type="button" onClick={handleAddDoctorRoster}
                  className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200">
                  <FaPlus className="w-3 h-3" /> Add Doctor
                </button>
              </div>

              {formData.doctorRoster.length === 0 ? (
                <div className="text-center py-12 bg-indigo-50/50 rounded-3xl border-2 border-dashed border-indigo-100">
                  <FaUserMd className="w-12 h-12 text-indigo-300 mx-auto mb-3" />
                  <p className="text-sm font-black text-indigo-900 uppercase tracking-widest">No Doctors Added Yet</p>
                  <p className="text-xs text-gray-500 mt-1 mb-4">Click below to add your hospital's specialist doctors</p>
                  <button type="button" onClick={handleAddDoctorRoster}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest">
                    ➕ Add First Doctor
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {formData.doctorRoster.map((doc, idx) => (
                    <div key={idx} className="p-6 bg-gray-50/80 rounded-3xl border border-gray-200/80 relative space-y-4">
                      <div className="flex items-center justify-between border-b pb-3 border-gray-200">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 bg-indigo-600 text-white rounded-full flex items-center justify-center font-black text-xs">
                            {idx + 1}
                          </span>
                          <span className="font-black text-gray-800 text-sm">
                            {doc.name || `Doctor #${idx + 1}`}
                          </span>
                        </div>
                        <button type="button" onClick={() => handleRemoveDoctorRoster(idx)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all">
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">Doctor Name *</label>
                          <input type="text" value={doc.name}
                            onChange={e => handleDoctorRosterChange(idx, "name", e.target.value)}
                            placeholder="Dr. Rajesh Sharma"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-indigo-400" />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">Specialization</label>
                          <input type="text" value={doc.specialization}
                            onChange={e => handleDoctorRosterChange(idx, "specialization", e.target.value)}
                            placeholder="Type or select specialization"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-indigo-400" />
                          <div className="flex gap-1.5 overflow-x-auto py-1.5 mt-1 whitespace-nowrap" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
                            {SUGGESTED_SPECIALIZATIONS.map(spec => (
                              <button
                                key={spec}
                                type="button"
                                onClick={() => handleDoctorRosterChange(idx, "specialization", spec)}
                                className={`inline-block px-2.5 py-1 text-[10px] font-bold rounded-full transition-all border ${
                                  doc.specialization === spec 
                                    ? "bg-indigo-600 border-indigo-600 text-white shadow-sm" 
                                    : "bg-indigo-50/50 hover:bg-indigo-100/80 border-indigo-100 text-indigo-700"
                                }`}
                              >
                                {spec}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">Qualification</label>
                          <input type="text" value={doc.qualification}
                            onChange={e => handleDoctorRosterChange(idx, "qualification", e.target.value)}
                            placeholder="Type or select qualification"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-indigo-400" />
                          <div className="flex gap-1.5 overflow-x-auto py-1.5 mt-1 whitespace-nowrap" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
                            {SUGGESTED_QUALIFICATIONS.map(qual => (
                              <button
                                key={qual}
                                type="button"
                                onClick={() => handleDoctorRosterChange(idx, "qualification", qual)}
                                className={`inline-block px-2.5 py-1 text-[10px] font-bold rounded-full transition-all border ${
                                  doc.qualification === qual 
                                    ? "bg-indigo-600 border-indigo-600 text-white shadow-sm" 
                                    : "bg-indigo-50/50 hover:bg-indigo-100/80 border-indigo-100 text-indigo-700"
                                }`}
                              >
                                {qual}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">OPD Days</label>
                          <input type="text" value={doc.opdDays}
                            onChange={e => handleDoctorRosterChange(idx, "opdDays", e.target.value)}
                            placeholder="Type or select days"
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-900 outline-none focus:ring-2 focus:ring-indigo-400" />
                          <div className="flex gap-1.5 overflow-x-auto py-1.5 mt-1 whitespace-nowrap" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
                            {SUGGESTED_OPD_DAYS.map(day => (
                              <button
                                key={day}
                                type="button"
                                onClick={() => handleDoctorRosterChange(idx, "opdDays", day)}
                                className={`inline-block px-2.5 py-1 text-[10px] font-bold rounded-full transition-all border ${
                                  doc.opdDays === day 
                                    ? "bg-indigo-600 border-indigo-600 text-white shadow-sm" 
                                    : "bg-indigo-50/50 hover:bg-indigo-100/80 border-indigo-100 text-indigo-700"
                                }`}
                              >
                                {day}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">OPD Timings</label>
                          <input type="text" value={doc.opdTime}
                            onChange={e => handleDoctorRosterChange(idx, "opdTime", e.target.value)}
                            placeholder="Type or select timings"
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-900 outline-none focus:ring-2 focus:ring-indigo-400" />
                          <div className="flex gap-1.5 overflow-x-auto py-1.5 mt-1 whitespace-nowrap" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
                            {SUGGESTED_OPD_TIMINGS.map(time => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => handleDoctorRosterChange(idx, "opdTime", time)}
                                className={`inline-block px-2.5 py-1 text-[10px] font-bold rounded-full transition-all border ${
                                  doc.opdTime === time 
                                    ? "bg-indigo-600 border-indigo-600 text-white shadow-sm" 
                                    : "bg-indigo-50/50 hover:bg-indigo-100/80 border-indigo-100 text-indigo-700"
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">Consultation Fee (₹)</label>
                          <input type="number" value={doc.fee}
                            onChange={e => handleDoctorRosterChange(idx, "fee", Number(e.target.value))}
                            placeholder="500"
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-900 outline-none focus:ring-2 focus:ring-indigo-400" />
                        </div>
                        <div className="flex items-center gap-3 pt-4">
                          <input type="checkbox" id={`doc-avail-${idx}`} checked={doc.isAvailable}
                            onChange={e => handleDoctorRosterChange(idx, "isAvailable", e.target.checked)}
                            className="w-5 h-5 accent-green-600 rounded cursor-pointer" />
                          <label htmlFor={`doc-avail-${idx}`} className="text-xs font-black text-green-700 uppercase cursor-pointer">
                            Available Today 🟢
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Suggestions Datalists for 1-click fill */}
              <datalist id="specializationList">
                {SUGGESTED_SPECIALIZATIONS.map(spec => (
                  <option key={spec} value={spec} />
                ))}
              </datalist>

              <datalist id="qualificationList">
                {SUGGESTED_QUALIFICATIONS.map(qual => (
                  <option key={qual} value={qual} />
                ))}
              </datalist>

              <datalist id="opdDaysList">
                {SUGGESTED_OPD_DAYS.map(day => (
                  <option key={day} value={day} />
                ))}
              </datalist>

              <datalist id="opdTimingsList">
                {SUGGESTED_OPD_TIMINGS.map(time => (
                  <option key={time} value={time} />
                ))}
              </datalist>

              {/* Live OPD Timings Weekly Schedule Editor */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="text-base font-black text-indigo-950 uppercase tracking-widest flex items-center gap-2 mb-2">
                  <FaClock className="text-indigo-600" /> Live OPD Weekly Timings & Availability
                </h3>
                <p className="text-xs text-gray-500 font-medium mb-6">
                  Configure operational timings for each day. Offline Booking and search pages will reflect this in real-time.
                </p>

                <div className="space-y-4">
                  {formData.weeklySchedule?.map((slot, index) => (
                    <div key={slot.day} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200/85 gap-4">
                      
                      {/* Day Label & Available Toggle */}
                      <div className="flex items-center gap-4 min-w-[200px]">
                        <input 
                          type="checkbox" 
                          id={`schedule-day-${index}`}
                          checked={slot.isAvailable}
                          onChange={(e) => handleWeeklyScheduleChange(index, "isAvailable", e.target.checked)}
                          className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
                        />
                        <label htmlFor={`schedule-day-${index}`} className="text-sm font-black text-gray-800 uppercase tracking-wide cursor-pointer">
                          {slot.day}
                        </label>
                      </div>

                      {/* Time Range Inputs */}
                      <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="flex-1 md:w-36">
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-wider block mb-1">Start Time</label>
                          <input 
                            type="time" 
                            value={slot.startTime} 
                            disabled={!slot.isAvailable}
                            onChange={(e) => handleWeeklyScheduleChange(index, "startTime", e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-900 outline-none disabled:opacity-40"
                          />
                        </div>
                        <span className="text-gray-400 font-bold self-end mb-2.5">to</span>
                        <div className="flex-1 md:w-36">
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-wider block mb-1">End Time</label>
                          <input 
                            type="time" 
                            value={slot.endTime} 
                            disabled={!slot.isAvailable}
                            onChange={(e) => handleWeeklyScheduleChange(index, "endTime", e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-900 outline-none disabled:opacity-40"
                          />
                        </div>
                      </div>

                      {/* Status indicator pill */}
                      <div className="self-center">
                        <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${slot.isAvailable ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-200 text-gray-500'}`}>
                          {slot.isAvailable ? 'Active' : 'Closed / Off'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== STEP 5: FACILITIES, GALLERY & GO LIVE ===================== */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Facilities */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                <FaFlask className="text-indigo-400" /> In-House Facilities & Equipment
              </h3>
              <p className="text-xs text-gray-400 font-medium mb-5">Select every available facility at your hospital</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {FACILITIES.map(fac => {
                  const isSelected = formData.facilities.includes(fac);
                  return (
                    <button key={fac} type="button" onClick={() => handleArrayToggle("facilities", fac)}
                      className={`flex items-center gap-2 p-3 rounded-2xl text-xs font-bold transition-all border-2 text-left ${isSelected ? "bg-green-600 text-white border-green-600 shadow-md scale-105" : "bg-gray-50 text-gray-500 border-gray-100 hover:border-green-200 hover:text-green-600"}`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${isSelected ? "bg-white border-white" : "border-gray-300"}`}>
                        {isSelected && <div className="w-2 h-2 bg-green-600 rounded-full" />}
                      </div>
                      {fac}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Gallery Photos Showcase */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                <FaCamera className="text-blue-500" /> Hospital Photo Showcase Gallery
              </h3>
              <p className="text-xs text-gray-400 font-medium mb-5">Add photo links of your ICU, Reception, OT, or Entrance for patient visual trust</p>
              
              <div className="flex gap-3 mb-6">
                <input type="url" value={galleryUrlInput} onChange={e => setGalleryUrlInput(e.target.value)}
                  placeholder="Paste image URL (https://images.unsplash.com/...)"
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-400" />
                <button type="button" onClick={handleAddGalleryPhoto}
                  className="px-5 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200">
                  ➕ Add Link
                </button>
              </div>

              {formData.galleryPhotos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.galleryPhotos.map((url, idx) => (
                    <div key={idx} className="relative group rounded-2xl overflow-hidden border-2 border-indigo-100 h-32 bg-gray-100">
                      <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                      <button type="button" onClick={() => handleRemoveGalleryPhoto(idx)}
                        className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-xl text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* GO LIVE Toggle */}
            <div className="bg-gradient-to-br from-indigo-950 to-blue-900 p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-orange-400 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between flex-wrap gap-6">
                  <div>
                    <h3 className="text-xl font-black text-white mb-1 flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${formData.isLive ? "bg-green-400 animate-pulse" : "bg-gray-500"}`} />
                      Go LIVE on Sehaat Saathi
                    </h3>
                    <p className="text-indigo-300 text-sm font-medium">
                      {formData.isLive ? "✅ Your hospital is LIVE and visible in the Offline Consultation Hub!" : "Toggle to make your hospital visible to patients in the Offline Booking Hub"}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="isLive" checked={formData.isLive} onChange={handleInputChange} className="sr-only peer" />
                    <div className="relative w-20 h-10 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 transition-all duration-300">
                      <div className={`absolute top-1 left-1 w-8 h-8 bg-white rounded-full shadow-md transition-all duration-300 ${formData.isLive ? "translate-x-10" : ""}`} />
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Summary Preview */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-6">Profile Summary Preview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Hospital Name", val: formData.hospitalName || "—" },
                  { label: "Type", val: formData.hospitalType },
                  { label: "District", val: formData.district || "—" },
                  { label: "Total Beds", val: formData.totalBeds || "0" },
                  { label: "Free Beds Now", val: formData.availableBeds || "0" },
                  { label: "ICU Capacity", val: formData.icuBeds || "0" },
                  { label: "Doctors Roster", val: `${formData.doctorRoster.length} Specialists` },
                  { label: "Accreditations", val: `${formData.accreditations.length} Badges` },
                  { label: "Insurance TPAs", val: `${formData.insurancePartners.length} Partners` },
                  { label: "Status", val: formData.isLive ? "🟢 LIVE" : "⚫ Offline" },
                ].map(item => (
                  <div key={item.label} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-sm font-black text-gray-800">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls Bottom */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          {currentStep > 1 ? (
            <button type="button" onClick={() => setCurrentStep(prev => prev - 1)}
              className="flex items-center gap-2 px-6 py-3.5 bg-gray-100 text-gray-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">
              <FaAngleLeft className="w-4 h-4" /> Previous Step
            </button>
          ) : <div />}

          <div className="flex items-center gap-4">
            <button type="submit" disabled={loading}
              className="px-6 py-3.5 bg-green-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-green-700 transition-all shadow-lg shadow-green-200 active:scale-95">
              {loading ? <HashLoader size={18} color="#ffffff" /> : "Save Profile"}
            </button>

            {currentStep < totalSteps && (
              <button type="button" onClick={() => setCurrentStep(prev => prev + 1)}
                className="flex items-center gap-2 px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95">
                Next Step <FaAngleRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default HospitalProfile;
