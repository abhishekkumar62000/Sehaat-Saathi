import { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import registerImg from "../assets/images/others/register.gif";
import Loading from "../components/Shared/Loading.jsx";
import { BASE_URL } from "../config.js";
import uploadImageToCloudinary from "../utils/uploadCloudinary.js";
import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import confetti from "canvas-confetti";
import "../assets/styles/LoginRegister.css";

const Register = () => {
  const [selectFile, setSelectFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectFile,
    gender: "",
    role: "patient",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    // Use cloudinary to upload images
    const data = await uploadImageToCloudinary(file);
    console.log(data);

    setPreviewURL(data.url);
    setSelectFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  // submitHandler
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
      toast.success(message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <section className="px-5 xl:px-0 my-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-[920px] glass-container mx-auto rounded-3xl overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* img box */}
          <div className="hidden lg:block register-gradient relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <figure className="h-full flex items-center justify-center p-8">
              <motion.img
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                src={registerImg}
                alt=""
                className="w-full rounded-2xl shadow-2xl relative z-10"
              />
            </figure>
            <div className="absolute bottom-10 left-0 right-0 text-center text-white px-8">
              <h4 className="text-2xl font-black mb-2">Join the Future of Health</h4>
              <p className="text-white/80 font-medium">Connect with top doctors and manage your health seamlessly.</p>
            </div>
          </div>
          {/* ===register card=== */}
          <div className="lg:p-12 p-6">
            <h3 className="lg:text-[36px] text-[28px] font-black tracking-tight mb-8">
              <span style={{ color: "#FF9933" }}>Create</span>{" "}
              <span style={{ color: "#138808" }}>Account</span>
            </h3>

            {/* ===register form=== */}
            <form onSubmit={submitHandler} className="space-y-5">
              {/* name input */}
              <motion.div whileHover={{ x: 5 }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 text-[17px] transition-all font-medium"
                  required
                />
              </motion.div>
              {/* email input */}
              <motion.div whileHover={{ x: 5 }}>
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 text-[17px] transition-all font-medium"
                  required
                />
              </motion.div>
              {/* password input */}
              <motion.div whileHover={{ x: 5 }} className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 text-[17px] transition-all font-medium"
                  required
                />
                <span
                  className="password-toggle-btn !right-4"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </span>
              </motion.div>

              {/* ===selected part=== */}
              <div className="flex items-center justify-between bg-violet-50/50 p-4 rounded-xl border border-violet-100">
                <label className="font-bold text-violet-900 text-sm uppercase tracking-wide">
                  Type:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="ml-2 font-black text-violet-700 bg-transparent focus:outline-none text-[15px]"
                  >
                    <option value="patient">Patient Node</option>
                    <option value="doctor">Medical Pro</option>
                    <option value="hospital">Hospital Node</option>
                  </select>
                </label>

                <label className="font-bold text-violet-900 text-sm uppercase tracking-wide">
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="ml-2 font-black text-violet-700 bg-transparent focus:outline-none text-[15px]"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
              </div>

              {/* ===img input=== */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    onChange={handleFileInputChange}
                    accept=".jpg, .png, .jpeg"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer "
                  />
                  <label
                    htmlFor="customFile"
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-white border-2 border-dashed border-violet-200 rounded-xl hover:border-violet-500 hover:bg-violet-50 text-violet-700 transition-all cursor-pointer font-bold text-sm"
                  >
                    <MdCloudUpload className="text-xl" /> Upload Avatar
                  </label>
                </div>
                {selectFile && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <figure className="w-14 h-14 rounded-full ring-4 ring-violet-500/20 overflow-hidden shadow-lg">
                      <img src={previewURL} alt="" className="w-full h-full object-cover"  loading="lazy" />
                    </figure>
                  </motion.div>
                )}
              </div>

              <div className="pt-4">
                <button
                  disabled={loading}
                  type="submit"
                  className="premium-btn w-full py-4 text-white font-bold rounded-xl text-[18px] shadow-lg disabled:opacity-70"
                >
                  {loading ? <Loading /> : "Create Account ✨"}
                </button>
              </div>

              <p className="text-center font-medium text-gray-500">
                Joined already?{" "}
                <Link to="/login" className="text-violet-700 font-bold hover:underline transition-all">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Register;
