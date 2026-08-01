/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import {
  MdCloudUpload,
  MdMoreTime,
  MdOutlineAddToPhotos,
} from "react-icons/md";
import { toast } from "react-toastify";
import avatarImg from "../../assets/images/icons/avatar-icon.png";
import Loading from "../../components/Shared/Loading";
import { BASE_URL } from "../../config";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { 
  FaUser, FaPhone, FaBriefcase, FaGraduationCap, 
  FaMapMarkerAlt, FaIdCard, FaHistory, FaClock, FaCheckCircle, FaRocket, FaAngleRight, FaAngleLeft 
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Profile = ({ doctorData }) => {
  const [loading, setLoading] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: 0,
    qualifications: [],
    experiences: [],
    about: "",
    photo: null,
    licenseNumber: "",
    verificationDocuments: [],
    city: "",
    district: "",
    state: "",
    pincode: "",
    hospitalName: "",
    hospitalType: "Private Hospital",
    inHouseFacilities: [],
    acceptsEmergency: false,
    acceptsAyushmanBharat: false,
    experience: 0,
    teleConsultPrice: 0,
    isTeleConsultActive: true,
    timeSlots: [],
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const calculateProgress = () => {
    const fields = Object.values(formData).filter(v => v !== "" && v !== null && (!Array.isArray(v) || v.length > 0));
    return Math.round((fields.length / Object.keys(formData).length) * 100);
  };

  useEffect(() => {
    if (doctorData) {
      setFormData({
        name: doctorData?.name || "",
        email: doctorData?.email || "",
        phone: doctorData?.phone || "",
        bio: doctorData?.bio || "",
        gender: doctorData?.gender || "",
        specialization: doctorData?.specialization || "",
        ticketPrice: doctorData?.ticketPrice || 0,
        qualifications: doctorData?.qualifications || [],
        experiences: doctorData?.experiences || [],
        timeSlots: doctorData?.timeSlots || [],
        about: doctorData?.about || "",
        photo: doctorData?.photo || null,
        licenseNumber: doctorData?.licenseNumber || "",
        verificationDocuments: doctorData?.verificationDocuments || [],
        city: doctorData?.location?.city || "",
        district: doctorData?.location?.district || "",
        state: doctorData?.location?.state || "",
        pincode: doctorData?.location?.pincode || "",
        hospitalName: doctorData?.hospitalName || "",
        hospitalType: doctorData?.hospitalType || "Private Hospital",
        inHouseFacilities: doctorData?.inHouseFacilities || [],
        acceptsEmergency: doctorData?.acceptsEmergency || false,
        acceptsAyushmanBharat: doctorData?.acceptsAyushmanBharat || false,
        experience: doctorData?.experience || 0,
        teleConsultPrice: doctorData?.teleConsultPrice || 0,
        isTeleConsultActive: doctorData?.isTeleConsultActive ?? true,
      });
    }
  }, [doctorData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setPhotoLoading(true);
    try {
      const data = await uploadImageToCloudinary(file);
      setFormData({ ...formData, photo: data.secure_url || data.url });
      toast.success("Photo uploaded successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to upload photo");
    } finally {
      setPhotoLoading(false);
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleArrayToggle = (e, fieldName) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].includes(value) 
        ? prev[fieldName].filter(item => item !== value)
        : [...prev[fieldName], value]
    }));
  };

  const handleDocumentUpload = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setFormData(prev => ({ 
      ...prev, 
      verificationDocuments: [...prev.verificationDocuments, data?.url] 
    }));
  };

  const updateProfileHandler = async (e) => {
    // Check if e is defined to prevent error when called programmatically override step button
    if(e) e.preventDefault();
    setLoading(true);

    try {
      // Map flat inputs back to nested schema before PUT request
      const payload = {
        ...formData,
        location: {
          city: formData.city,
          district: formData.district,
          state: formData.state,
          pincode: formData.pincode
        },
        // IMPORTANT: Map timeSlots to availability for backend schema
        availability: formData.timeSlots?.map(slot => ({
          day: slot.day.charAt(0).toUpperCase() + slot.day.slice(1).toLowerCase(), // Enum compliance (Monday, etc.)
          startTime: slot.startingTime,
          endTime: slot.endingTime,
          slotDuration: 30 // Default slot duration
        })) || [],
        // Sanitize numeric fields (Phone/Price)
        phone: Number(formData.phone) || 0,
        ticketPrice: Number(formData.ticketPrice) || 0,
        experience: Number(formData.experience) || 0,
        teleConsultPrice: Number(formData.teleConsultPrice) || 0
      };

      const authToken = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw Error(result.message);
      }

      toast.success("Profile Updated Successfully!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  //reusable function for adding item
  const addItem = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
      /* [key]: Array.isArray(prevFormData[key])
        ? [...prevFormData[key], item]
        : [item], */
    }));
  };

  //reusable input change function
  const handleReusableInputChangeFunc = (key, index, event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      const updateItems = [...prevFormData[key]];

      updateItems[index][name] = value;

      return {
        ...prevFormData,
        [key]: updateItems,
      };
    });
  };

  //reusable function for delete item
  const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };

  /*================================
    logic for qualification
  ================================*/
  const addQualification = (e) => {
    e.preventDefault();

    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "",
      university: "",
    });
  };

  const handleQualificationChange = (event, index) => {
    handleReusableInputChangeFunc("qualifications", index, event);
  };

  const deleteQualification = (e, index) => {
    e.preventDefault();

    deleteItem("qualifications", index);
  };

  /*================================
       logic for Experience
  ================================*/
  const addExperience = (e) => {
    e.preventDefault();

    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "",
      hospital: "",
    });
  };

  const handleExperienceChange = (event, index) => {
    handleReusableInputChangeFunc("experiences", index, event);
  };

  const deleteExperience = (e, index) => {
    e.preventDefault();

    deleteItem("experiences", index);
  };

  /*================================
       logic for Time_slots
  ================================*/
  const addTimeSlot = (e) => {
    e.preventDefault();

    addItem("timeSlots", {
      day: "",
      startingTime: "",
      endingTime: "",
    });
  };

  const handleTimeSlotChange = (event, index) => {
    handleReusableInputChangeFunc("timeSlots", index, event);
  };

  const deleteTimeSlot = (e, index) => {
    e.preventDefault();

    deleteItem("timeSlots", index);
  };

  return (
    <section className="mb-10 px-2 lg:px-0">
      {/* Premium Header & Progress Section */}
      <div className="mb-8 p-6 bg-white rounded-3xl shadow-xl border border-gray-100/50 tri-glass relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 relative z-10">
          <div>
            <h1 className="text-3xl font-black text-indigo-950 flex items-center gap-3">
              <span className="bg-gradient-to-r from-orange-500 to-green-600 bg-clip-text text-transparent">Doctor Profile</span>
              <FaCheckCircle className="text-green-500 animate-pulse w-7 h-7" />
            </h1>
            <p className="text-gray-500 font-medium text-sm mt-1 uppercase tracking-widest">Professional Account Settings</p>
          </div>
          <div className="w-full lg:w-72">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-black text-indigo-900 uppercase tracking-widest">Setup Completion</span>
              <span className="text-lg font-black text-green-600">{calculateProgress()}%</span>
            </div>
            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${calculateProgress()}%` }}
                className="h-full bg-gradient-to-r from-orange-400 via-white to-green-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modern Step Navigation Tabs */}
      <div className="flex flex-wrap justify-center lg:justify-between items-center gap-3 mb-8">
        {[
          { id: 1, label: "Identity", icon: FaUser, color: "orange" },
          { id: 2, label: "Profession", icon: FaBriefcase, color: "blue" },
          { id: 3, label: "Clinic Hub", icon: FaMapMarkerAlt, color: "indigo" },
          { id: 4, label: "Availability", icon: FaClock, color: "green" },
        ].map((step) => (
          <button
            key={step.id}
            type="button"
            onClick={() => setCurrentStep(step.id)}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-500 group relative
              ${currentStep === step.id 
                ? 'bg-indigo-950 text-white shadow-2xl scale-105' 
                : 'bg-white text-gray-500 hover:bg-gray-50 shadow-sm border border-gray-100 hover:scale-105'
              }`}
          >
            <step.icon className={`w-5 h-5 ${currentStep === step.id ? 'text-orange-400' : 'group-hover:text-indigo-600'}`} />
            <span className="font-black uppercase tracking-tighter text-sm">{step.label}</span>
            {currentStep > step.id && (
              <FaCheckCircle className="absolute -top-2 -right-2 text-green-500 bg-white rounded-full w-5 h-5" />
            )}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        <AnimatePresence mode="wait">
          {/* STEP 1: IDENTITY */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1 space-y-6 w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium"
                      />
                      <span className="absolute -top-3 left-4 bg-white px-2 text-xs font-black text-indigo-900 uppercase tracking-widest">Doctor Name*</span>
                    </div>

                    <div className="relative group">
                      <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium"
                      />
                      <span className="absolute -top-3 left-4 bg-white px-2 text-xs font-black text-indigo-900 uppercase tracking-widest">Phone Number*</span>
                    </div>
                  </div>

                  <div className="relative group">
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Short professional summary (100 characters)"
                      rows="3"
                      maxLength={100}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium"
                    ></textarea>
                    <span className="absolute -top-3 left-4 bg-white px-2 text-xs font-black text-indigo-900 uppercase tracking-widest">One-Line Bio*</span>
                    <div className="absolute bottom-3 right-4 text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                      {formData.bio?.length || 0}/100 Characters
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-48 flex flex-col items-center gap-4 bg-indigo-50/30 p-6 rounded-3xl border border-indigo-100 text-center">
                  <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden group">
                    <img src={formData.photo ? formData.photo : avatarImg}
                      alt="Profile"
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                     loading="lazy" />
                    {photoLoading && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                  <label className="w-full">
                    <input type="file" onChange={handleFileInputChange} className="hidden" accept="image/*" />
                    <div className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-black uppercase py-2 px-4 rounded-xl text-center cursor-pointer transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-2 tracking-widest">
                      <MdCloudUpload className="w-4 h-4" /> Change Photo
                    </div>
                  </label>
                </div>
              </div>

              {/* READONLY EMAIL CARD */}
              <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100 flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <FaIdCard className="text-rose-500 w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-rose-950 uppercase tracking-widest">Registered Email</p>
                  <p className="text-sm font-bold text-gray-500">{formData.email}</p>
                </div>
                <div className="ml-auto text-[8px] font-black uppercase text-rose-400 bg-white px-2 py-1 rounded-md">Locked</div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: PROFESSION */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="relative group">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium appearance-none"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <span className="absolute -top-3 left-4 bg-white px-2 text-xs font-black text-indigo-900 uppercase tracking-widest">Gender*</span>
                  </div>

                  <div className="relative group">
                    <select
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium appearance-none"
                    >
                      <option value="">Select Specialization</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Dentistry">Dentistry</option>
                      <option value="Urology">Urology</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Dermatology">Dermatology</option>
                      <option value="Gastroenterology">Gastroenterology</option>
                      <option value="Ophthalmology">Ophthalmology</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Oncology">Oncology</option>
                      <option value="Gynecology">Gynecology</option>
                    </select>
                    <span className="absolute -top-3 left-4 bg-white px-2 text-xs font-black text-indigo-900 uppercase tracking-widest">Medical Specialty*</span>
                  </div>

                  <div className="relative group">
                    <input
                      type="number"
                      name="ticketPrice"
                      value={formData.ticketPrice}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium"
                    />
                    <span className="absolute -top-3 left-4 bg-white px-2 text-xs font-black text-indigo-900 uppercase tracking-widest">Consulation Fee (₹)*</span>
                  </div>

                  <div className="relative group">
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      placeholder="e.g. 10"
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium"
                    />
                    <span className="absolute -top-3 left-4 bg-white px-2 text-xs font-black text-indigo-900 uppercase tracking-widest">Years of Experience*</span>
                  </div>
                </div>

                {/* About Professional Bio */}
                <div className="relative group">
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your professional background and medical approach..."
                    rows="5"
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium"
                  ></textarea>
                  <span className="absolute -top-3 left-4 bg-white px-2 text-xs font-black text-indigo-900 uppercase tracking-widest">About Me (Bio)*</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: PRESENCE (Location & Verification) */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-8">
                <div className="relative group">
                  <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                  <input
                    type="text"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleInputChange}
                    placeholder="e.g. Apollo, Fortis, or Independent Clinic"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium"
                  />
                  <span className="absolute -top-3 left-4 bg-white px-2 text-xs font-black text-indigo-900 uppercase tracking-widest">Clinic or Hospital Name*</span>
                </div>

                <div className="relative group">
                  <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                  <select
                    name="hospitalType"
                    value={formData.hospitalType}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium appearance-none"
                  >
                    <option value="Private Hospital">Private Hospital</option>
                    <option value="Government Hospital">Government Hospital</option>
                    <option value="Personal Clinic">Personal Clinic</option>
                  </select>
                  <span className="absolute -top-3 left-4 bg-white px-2 text-xs font-black text-indigo-900 uppercase tracking-widest">Provider Type*</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: "city", label: "City", placeholder: "Mumbai" },
                    { name: "district", label: "District", placeholder: "Andheri" },
                    { name: "state", label: "State", placeholder: "Maharashtra" },
                    { name: "pincode", label: "Pincode", placeholder: "400053" },
                  ].map((loc) => (
                    <div key={loc.name} className="relative group">
                      <input
                        type="text"
                        name={loc.name}
                        value={formData[loc.name]}
                        onChange={handleInputChange}
                        placeholder={loc.placeholder}
                        className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium text-sm"
                      />
                      <span className="absolute -top-3 left-4 bg-white px-2 text-[10px] font-black text-indigo-900 uppercase tracking-widest">{loc.label}*</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <label className="flex items-center space-x-3 cursor-pointer bg-red-50 p-4 rounded-2xl border border-red-100 hover:bg-red-100 transition-all group">
                    <input
                      type="checkbox"
                      name="acceptsEmergency"
                      checked={formData.acceptsEmergency}
                      onChange={handleCheckboxChange}
                      className="w-5 h-5 text-red-600 rounded border-red-300 focus:ring-red-500"
                    />
                    <div>
                      <p className="text-sm font-black text-red-900">24x7 Emergency Services</p>
                      <p className="text-xs font-medium text-red-700">Accepts trauma & emergency cases</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer bg-green-50 p-4 rounded-2xl border border-green-100 hover:bg-green-100 transition-all group">
                    <input
                      type="checkbox"
                      name="acceptsAyushmanBharat"
                      checked={formData.acceptsAyushmanBharat}
                      onChange={handleCheckboxChange}
                      className="w-5 h-5 text-green-600 rounded border-green-300 focus:ring-green-500"
                    />
                    <div>
                      <p className="text-sm font-black text-green-900">Ayushman Bharat Accepted</p>
                      <p className="text-xs font-medium text-green-700">Accepts cashless insurance for treatment</p>
                    </div>
                  </label>
                </div>

                <div className="relative group pt-4">
                  <span className="absolute -top-3 left-4 bg-white px-2 text-xs font-black text-indigo-900 uppercase tracking-widest">In-House Facilities (सुविधाएं)</span>
                  <div className="flex flex-wrap gap-3 p-4 bg-gray-50 border border-gray-200 rounded-2xl">
                    {['Pharmacy (दवाखाना)', 'X-Ray (एक्स-रे)', 'Pathology Lab (खून जांच)', 'Ultrasound', 'ICU'].map(facility => (
                      <label key={facility} className="flex items-center space-x-2 cursor-pointer bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-300 transition-all">
                        <input
                          type="checkbox"
                          value={facility}
                          checked={formData.inHouseFacilities?.includes(facility)}
                          onChange={(e) => handleArrayToggle(e, 'inHouseFacilities')}
                          className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="text-sm font-bold text-gray-700">{facility}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col md:flex-row shadow-inner items-center gap-6">
                  <div className="flex-1 w-full relative group">
                    <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      placeholder="MCI-123456"
                      className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium"
                    />
                    <span className="absolute -top-3 left-4 bg-white px-2 text-xs font-black text-indigo-900 uppercase tracking-widest">Medical License Number*</span>
                  </div>
                  <label className="w-full md:w-auto">
                    <input type="file" onChange={handleDocumentUpload} className="hidden" accept=".pdf,.jpg,.png" />
                    <div className="bg-indigo-600 hover:bg-slate-900 text-white text-xs font-black uppercase py-4 px-8 rounded-2xl cursor-pointer transition-all shadow-xl flex items-center justify-center gap-2 tracking-widest">
                       <MdCloudUpload className="w-5 h-5" /> {formData.verificationDocuments?.length > 0 ? `${formData.verificationDocuments.length} Uploaded` : 'Upload Documents'}
                    </div>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: AVAILABILITY & HUB */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="p-8 bg-gradient-to-br from-rose-50 to-orange-50 border border-orange-100 rounded-3xl shadow-sm relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                    <FaRocket className="w-24 h-24 text-orange-600 rotate-12" />
                 </div>
                 <h3 className="text-sm font-black text-orange-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                   🚀 Online Consultation Settings
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100 flex items-center justify-between">
                       <div>
                          <p className="text-xs font-black text-orange-600 uppercase tracking-widest">Video Consult</p>
                          <p className="text-[10px] text-gray-500 font-bold">Visible in Video Hub</p>
                       </div>
                       <div 
                         onClick={() => setFormData(prev => ({ ...prev, isTeleConsultActive: !prev.isTeleConsultActive }))}
                         className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-all duration-500 ${formData.isTeleConsultActive ? 'bg-green-500' : 'bg-gray-300'}`}
                       >
                          <motion.div 
                            animate={{ x: formData.isTeleConsultActive ? 24 : 0 }}
                            className="w-6 h-6 bg-white rounded-full shadow-md"
                          />
                       </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
                        <p className="text-xs font-black text-orange-600 uppercase tracking-widest mb-4">Video Consultation Fee</p>
                        <div className="flex items-center gap-2">
                           <span className="text-xl font-black text-slate-400">₹</span>
                           <input
                             type="number"
                             name="teleConsultPrice"
                             value={formData.teleConsultPrice}
                             onChange={handleInputChange}
                             placeholder="500"
                             className="w-full bg-transparent border-b-2 border-orange-100 focus:border-orange-400 outline-none font-black text-xl text-orange-900"
                           />
                        </div>
                    </div>
                 </div>
              </div>

              {/* Time Slots Section */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-sm font-black text-indigo-950 uppercase tracking-widest flex items-center gap-2">
                    <FaClock className="text-indigo-600" /> Weekly Availability Matrix
                  </h3>
                  <button
                    type="button"
                    onClick={addTimeSlot}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-900 transition-all shadow-lg active:scale-95"
                  >
                    <MdMoreTime className="w-4 h-4" /> Add Slot
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.timeSlots?.map((item, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 group relative">
                      <div className="relative">
                        <select
                          name="day"
                          value={item.day}
                          onChange={(e) => handleTimeSlotChange(e, index)}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none font-bold text-sm h-full"
                        >
                          <option value="">Select Day</option>
                          {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map(d => (
                             <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <input
                          type="time"
                          name="startingTime"
                          value={item.startingTime}
                          onChange={(e) => handleTimeSlotChange(e, index)}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none font-bold text-sm"
                        />
                      </div>
                      <div>
                        <input
                          type="time"
                          name="endingTime"
                          value={item.endingTime}
                          onChange={(e) => handleTimeSlotChange(e, index)}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none font-bold text-sm"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={(e) => deleteTimeSlot(e, index)}
                        className="bg-rose-100 text-rose-600 p-3 rounded-xl hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center shadow-sm"
                      >
                        <RiDeleteBin2Fill className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Final */}
              <div className="mt-10">
                <button
                  disabled={loading}
                  type="button"
                  onClick={updateProfileHandler}
                  className="w-full py-5 text-white font-black uppercase tracking-[0.3em] rounded-[2rem] shadow-2xl transition-all duration-500 bg-gradient-to-r from-orange-600 via-indigo-600 to-green-600 hover:scale-[1.02] active:scale-95 disabled:opacity-50 group overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  {loading ? (
                    <Loading />
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      Save All Changes <GrUpdate className="w-4 h-4" />
                    </div>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Navigation */}
        <div className="flex justify-between items-center mt-10">
            {currentStep > 1 && (
                <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center gap-3 px-8 py-4 bg-white border border-slate-100 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all shadow-xl active:scale-95"
                >
                    <FaAngleLeft /> Previous Step
                </button>
            )}
            {currentStep < 4 ? (
                <button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all shadow-xl active:scale-95"
                >
                    Next Step <FaAngleRight />
                </button>
            ) : (
                <div className="flex-1"></div>
            )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
