/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { MdCloudUpload, MdCheckCircle, MdHealthAndSafety, MdSecurity, MdContactPhone, MdFingerprint, MdLocationOn } from "react-icons/md";
import { FaUserCircle, FaAngleRight, FaAngleLeft, FaCalendarAlt, FaAllergies, FaBiohazard, FaPhoneSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userAvatar from "../../assets/images/icons/patient-avatar.png";
import Loading from "../../components/Shared/Loading.jsx";
import { BASE_URL } from "../../config.js";
import uploadImageToCloudinary from "../../utils/uploadCloudinary.js";
import useRecordActivity from "../../hooks/useRecordActivity";
import { authContext } from "../../context/AuthContext";
import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Profile = ({ user }) => {
  const { token, dispatch } = useContext(authContext);
  const { recordActivity } = useRecordActivity();
  const [loading, setLoading] = useState(false);
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
    gender: "",
    phone: "",
    bloodGroup: "",
    dob: "",
    allergies: "",
    chronicConditions: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    city: "",
    pincode: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        photo: user.photo || null,
        gender: user.gender || "",
        bloodGroup: user.bloodGroup || "",
        dob: user.dob ? user.dob.split('T')[0] : "",
        allergies: user.allergies || "",
        chronicConditions: user.chronicConditions || "",
        emergencyContactName: user.emergencyContactName || "",
        emergencyContactPhone: user.emergencyContactPhone || "",
        city: user.city || "",
        pincode: user.pincode || "",
        password: "", // Always start empty for security
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateProgress = () => {
    const essentialFields = ['name', 'phone', 'photo', 'gender', 'bloodGroup', 'dob', 'city', 'emergencyContactPhone'];
    const filledFields = essentialFields.filter(f => formData[f] && formData[f] !== "");
    return Math.round((filledFields.length / essentialFields.length) * 100);
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsPhotoLoading(true);
    try {
      const data = await uploadImageToCloudinary(file);
      const photoUrl = data.secure_url || data.url;
      setFormData({ ...formData, photo: photoUrl });
      toast.success("Profile Photo Uploaded!");
    } catch (err) {
      toast.error("Failed to upload photo");
    } finally {
      setIsPhotoLoading(false);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const { message, data } = await res.json();

      if (!res.ok) throw new Error(message);

      setLoading(false);
      toast.success("Profile Updated Successfully");
      
      if (data) {
        dispatch({ type: "UPDATE_USER", payload: { user: data } });
      }

      recordActivity("Profile", "Information Updated", "/users/profile/me");
      
      setTimeout(() => {
        window.location.reload(); 
      }, 1000);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const steps = [
    { title: "Personal", icon: MdFingerprint, color: "from-violet-500 to-fuchsia-500" },
    { title: "Health", icon: MdHealthAndSafety, color: "from-rose-500 to-orange-500" },
    { title: "Contact", icon: MdContactPhone, color: "from-blue-500 to-cyan-500" },
    { title: "Security", icon: MdSecurity, color: "from-emerald-500 to-teal-500" }
  ];

  return (
    <div className="mt-8 max-w-4xl mx-auto px-4 pb-20 font-sans">
      {/* =======================
             Simplfied Header Section
      ========================== */}
      <div className="mb-10 bg-white/40 backdrop-blur-3xl rounded-[3rem] p-8 border border-white/60 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <MdHealthAndSafety className="w-32 h-32 text-violet-700" />
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
          <div className="relative group/avatar">
            <div className="w-32 h-32 rounded-full border-4 border-violet-500 overflow-hidden shadow-2xl transition-transform group-hover/avatar:scale-105 duration-500 bg-white">
              <img src={formData.photo || userAvatar}
                alt="Profile"
                className={`w-full h-full object-cover ${isPhotoLoading ? 'opacity-30' : 'opacity-100'}`}
               loading="lazy" />
              {isPhotoLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                  <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            <label htmlFor="photoUpload" className="absolute bottom-0 right-0 bg-violet-600 p-2 rounded-full text-white cursor-pointer hover:bg-violet-700 shadow-lg transition-all scale-90 hover:scale-100">
               <MdCloudUpload />
               <input id="photoUpload" type="file" onChange={handleFileInputChange} className="hidden" />
            </label>
          </div>

          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">
              My <span className="text-violet-600">Personal Profile</span>
            </h2>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-4">
               <div className="px-4 py-1.5 bg-violet-100 border border-violet-200 rounded-full text-[10px] font-black text-violet-700 uppercase tracking-widest">
                  Welcome, {user.name}
               </div>
               <div className="px-4 py-1.5 bg-emerald-100 border border-emerald-200 rounded-full text-[10px] font-black text-emerald-700 uppercase tracking-widest">
                  Active Member
               </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden border border-gray-100 shadow-inner">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${calculateProgress()}%` }}
                 transition={{ duration: 1, ease: "easeOut" }}
                 className="h-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-rose-400"
               />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">
              Profile Completion: <span className="text-violet-600">{calculateProgress()}%</span>
            </p>
          </div>
        </div>
      </div>

      {/* =======================
             Simple Tabs
      ========================== */}
      <div className="flex justify-between mb-8 px-2 relative">
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-100 -translate-y-1/2 -z-10"></div>
        {steps.map((step, idx) => (
          <div 
            key={idx}
            className={`flex flex-col items-center gap-2 transition-all duration-500 scale-90 lg:scale-100
              ${currentStep === idx + 1 ? 'opacity-100' : 'opacity-40 hover:opacity-70'}
            `}
          >
            <button 
              onClick={() => setCurrentStep(idx + 1)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all shadow-xl
                ${currentStep === idx + 1 
                  ? `bg-gradient-to-br ${step.color} text-white ring-4 ring-white` 
                  : 'bg-white text-slate-400 border border-slate-100'}
              `}
            >
              <step.icon />
            </button>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 hidden sm:block">{step.title}</span>
          </div>
        ))}
      </div>

      {/* =======================
             Simple Form Sections
      ========================== */}
      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/60 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/80 shadow-2xl"
            >
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-3">
                 <span className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white text-xs">1</span>
                 Basic Information
              </h3>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                        <p className="text-[10px] font-black text-violet-600 uppercase tracking-widest mb-2 ml-1">Your Full Name</p>
                        <input
                            type="text"
                            name="name"
                            autoComplete="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Full Name"
                            className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:border-violet-500 outline-none transition-all font-bold text-slate-700 shadow-sm"
                            required
                        />
                    </div>
                    <div className="relative group">
                        <p className="text-[10px] font-black text-violet-600 uppercase tracking-widest mb-2 ml-1">Date of Birth</p>
                        <div className="relative">
                            <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400" />
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleInputChange}
                                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-slate-100 focus:border-violet-500 outline-none transition-all font-bold text-slate-700 shadow-sm"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="relative group">
                   <p className="text-[10px] font-black text-violet-600 uppercase tracking-widest mb-2 ml-1">Gender</p>
                   <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:border-violet-500 outline-none transition-all font-bold text-slate-700 shadow-sm appearance-none cursor-pointer"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/60 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/80 shadow-2xl"
            >
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-3">
                 <span className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white text-xs">2</span>
                 Medical Information
              </h3>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-rose-50 rounded-3xl border border-rose-100 flex items-center gap-6 group h-full">
                        <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center text-rose-500 text-3xl group-hover:scale-110 transition-transform">
                            🩸
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-2">Blood Group</p>
                            <select
                                name="bloodGroup"
                                value={formData.bloodGroup}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-transparent border-b-2 border-rose-200 outline-none font-black text-xl text-rose-900 appearance-none cursor-pointer"
                                required
                            >
                                <option value="">Select Blood Group</option>
                                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                                <option key={bg} value={bg}>{bg}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="relative group">
                        <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-2 ml-1 flex items-center gap-2">
                             <FaAllergies /> Known Allergies
                        </p>
                        <textarea
                            name="allergies"
                            value={formData.allergies}
                            onChange={handleInputChange}
                            placeholder="e.g. Paracetamol, Peanuts, Pollen..."
                            className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:border-rose-500 outline-none transition-all font-bold text-slate-700 shadow-sm"
                            rows="2"
                        />
                    </div>
                </div>
                <div className="relative group">
                   <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-2 ml-1 flex items-center gap-2">
                        <FaBiohazard /> Chronic Illness (Medical History)
                   </p>
                   <textarea
                    name="chronicConditions"
                    value={formData.chronicConditions}
                    onChange={handleInputChange}
                    placeholder="e.g. Diabetes, Blood Pressure, Asthma..."
                    className="w-full px-6 py-8 rounded-[2.5rem] bg-slate-900 border border-slate-800 text-rose-400 placeholder:text-slate-600 outline-none transition-all font-black text-lg shadow-2xl tracking-tighter"
                    rows="3"
                  />
                   <p className="text-[9px] text-slate-400 mt-3 ml-4 font-medium uppercase tracking-widest flex items-center gap-1">
                      <MdCheckCircle className="text-emerald-500" /> Information is securely stored
                   </p>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/60 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/80 shadow-2xl"
            >
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-3">
                 <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs">3</span>
                 Contact & Location
              </h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 ml-1">Mobile Number</p>
                        <input
                            type="number"
                            name="phone"
                            autoComplete="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                            className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:border-blue-500 outline-none transition-all font-bold text-slate-700 shadow-sm"
                        />
                    </div>
                    <div className="relative group h-full">
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 ml-1">Email Address</p>
                        <div className="px-6 py-4 rounded-2xl bg-blue-50 border border-blue-100 text-slate-500 font-bold truncate">
                            {formData.email}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 ml-1">Current City</p>
                        <div className="relative">
                            <MdLocationOn className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder="Your City"
                                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-slate-100 focus:border-blue-500 outline-none transition-all font-bold text-slate-700 shadow-sm"
                            />
                        </div>
                    </div>
                    <div className="relative group">
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 ml-1">Pincode</p>
                        <input
                            type="number"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            placeholder="Pincode"
                            className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:border-blue-500 outline-none transition-all font-bold text-slate-700 shadow-sm"
                        />
                    </div>
                </div>

                <div className="p-6 bg-slate-50 border border-slate-200 rounded-[2.5rem] space-y-4 shadow-inner">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <FaPhoneSquare className="text-rose-500" /> Emergency Contact
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="emergencyContactName"
                            value={formData.emergencyContactName}
                            onChange={handleInputChange}
                            placeholder="Full Name"
                            className="w-full px-5 py-3 rounded-xl bg-white border border-slate-200 focus:border-rose-400 outline-none transition-all font-bold text-sm text-slate-700"
                        />
                        <input
                            type="number"
                            name="emergencyContactPhone"
                            value={formData.emergencyContactPhone}
                            onChange={handleInputChange}
                            placeholder="Mobile Number"
                            className="w-full px-5 py-3 rounded-xl bg-white border border-slate-200 focus:border-rose-400 outline-none transition-all font-bold text-sm text-slate-700"
                        />
                    </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/60 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/80 shadow-2xl"
            >
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-3">
                 <span className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-xs">4</span>
                 Password & Security
              </h3>
              <div className="space-y-8">
                <div className="relative group">
                   <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2 ml-1">Change Password</p>
                   <input
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter New Password"
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:border-emerald-500 outline-none transition-all font-bold text-slate-700 shadow-sm"
                  />
                   <p className="text-[9px] text-slate-400 mt-3 ml-1 font-medium italic">Leave blank if you don't want to change your password.</p>
                </div>
                
                <div className="mt-8">
                  <button
                    disabled={loading}
                    type="button"
                    onClick={submitHandler}
                    className="w-full py-5 text-white font-black uppercase tracking-widest rounded-[2rem] shadow-2xl transition-all duration-500 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-600 hover:scale-[1.02] active:scale-95 disabled:opacity-50 group overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    {loading ? (
                      <Loading />
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        Save Profile Changes <GrUpdate className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-10">
           {currentStep > 1 && (
             <button
              type="button"
              onClick={prevStep}
              className="flex items-center gap-3 px-8 py-4 bg-white border border-slate-100 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all shadow-xl active:scale-95"
             >
               <FaAngleLeft /> Back
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
    </div>
  );
};

export default Profile;
