import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bgImg from "../assets/images/bgImg.png";
import logo from "../assets/images/brand-logo/SehaatSaathiLogo.png";
import Loading from "../components/Shared/Loading.jsx";
import { BASE_URL } from "../config.js";
import { authContext } from "../context/AuthContext.jsx";
import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "../assets/styles/LoginRegister.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "patient"
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  useEffect(() => {
    const isRemembered = localStorage.getItem("remember_me") === "true";
    if (isRemembered) {
      const email = localStorage.getItem("remembered_email") || "";
      const password = localStorage.getItem("remembered_password") || "";
      const role = localStorage.getItem("remembered_role") || "patient";
      setFormData({ email, password, role });
      setRememberMe(true);
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submit handler
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      if (rememberMe) {
        localStorage.setItem("remember_me", "true");
        localStorage.setItem("remembered_email", formData.email);
        localStorage.setItem("remembered_password", formData.password);
        localStorage.setItem("remembered_role", formData.role);
      } else {
        localStorage.removeItem("remember_me");
        localStorage.removeItem("remembered_email");
        localStorage.removeItem("remembered_password");
        localStorage.removeItem("remembered_role");
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          token: result.token,
          role: result.role,
        },
      });

      setLoading(false);
      toast.success(result.message);
      navigate("/home");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <section className="px-5 my-12 lg:px-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[480px] mx-auto rounded-3xl glass-container lg:p-12 p-6"
      >
        <div className="flex justify-center mb-6">
          <div className="relative group inline-block">
            <div className="absolute -inset-4 bg-violet-200 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <img src={logo}
              alt="Sehaat Saathi Logo"
              className="relative w-[140px] floating-icon"
             loading="lazy" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h3 className="lg:text-[44px] text-[34px] font-black tracking-tighter leading-tight drop-shadow-sm">
            <span style={{ color: "#FF9933" }}>Sehaat</span>
            <span style={{ color: "#138808" }}>Saathi</span>
          </h3>
          <p className="text-gray-500 font-bold text-sm tracking-wide uppercase">Your Digital Healthcare Ally</p>
        </div>

        <form onSubmit={submitHandler}>
          <div className="mb-6 space-y-4">
            {/* email input */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative"
            >
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-5 py-4 bg-white/50 border border-gray-200 rounded-2xl focus:outline-none input-glow text-[17px] transition-all placeholder:text-gray-400 font-medium"
                required
              />
            </motion.div>

            {/* password input */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative"
            >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-5 py-4 bg-white/50 border border-gray-200 rounded-2xl focus:outline-none input-glow text-[17px] transition-all placeholder:text-gray-400 font-medium"
                required
              />
              <span
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
              </span>
            </motion.div>

            {/* role selector */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="flex items-center justify-between bg-violet-50/50 p-4 rounded-2xl border border-violet-100"
            >
              <label className="font-bold text-violet-900 text-sm uppercase tracking-wide flex w-full">
                <span className="shrink-0 flex items-center">SIGN IN AS:</span>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="ml-auto w-full max-w-[200px] text-right font-black text-violet-700 bg-transparent focus:outline-none text-[15px] cursor-pointer"
                >
                  <option value="patient">Patient Node</option>
                  <option value="doctor">Medical Pro</option>
                  <option value="hospital">Hospital Node</option>
                </select>
              </label>
            </motion.div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between px-2 pt-1 text-xs">
              <label className="flex items-center gap-2 font-bold text-gray-500 uppercase tracking-widest cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 accent-violet-600 cursor-pointer"
                />
                Remember My Session
              </label>
            </div>
          </div>

          <div className="mt-8">
            <button
              disabled={loading}
              type="submit"
              className="premium-btn w-full py-4 text-white font-bold rounded-2xl text-[18px] shadow-lg disabled:opacity-70"
            >
              {loading ? <Loading /> : "Sign In ✨"}
            </button>
          </div>

          <p className="mt-10 text-gray-500 text-center font-medium">
            New here?{" "}
            <Link to="/register" className="text-violet-700 font-bold hover:underline transition-all">
              Create an Account
            </Link>
          </p>
        </form>
      </motion.div>
    </section>
  );
};

export default Login;
