import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bgImg from "../assets/images/bgImg.png";
import logo from "../assets/images/brand-logo/SehaatSaathi Logo.png";
import Loading from "../components/Shared/Loading.jsx";
import { BASE_URL } from "../config.js";
import { authContext } from "../context/AuthContext.jsx";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

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
    <section className="px-5 my-8 lg:px-0">
      <div
        className="w-full max-w-[420px] mx-auto rounded-lg shadow-md lg:p-10 p-4"
        style={{
          backgroundImage: `url(${bgImg})`,
        }}
      >
        <div className="flex justify-center">
          <div className="relative group inline-block">
            <div className="absolute -inset-2 bg-teal-100 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity"></div>
            <img
              src={logo}
              alt="Sehaat Saathi Logo"
              className="relative w-[130px] transform transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </div>
        <h3 className="lg:mb-2 lg:text-[40px] text-[30px] font-black tracking-tighter text-center">
          <span className="text-green-600">Sehaat</span>
          <span className="text-orange-500">Saathi</span>
        </h3>
        <p className="text-center text-gray-500 font-bold -mt-2 mb-6">Your Trusted Healthcare Partner</p>
        <form className="py-4 md:py-0" onSubmit={submitHandler}>
          {/* email input */}
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter your Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-[#0066ff61] focus:outline-none focus:border-violet-700 text-[18px] leading-6 text-headingColor placeholder:text-textColor"
              required
            />
          </div>
          {/* password input */}
          <div className="mb-5">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-3 border border-[#0066ff61] focus:outline-none focus:border-violet-700 text-[18px] leading-6 text-headingColor placeholder:text-textColor"
              required
            />
          </div>

          <div className="mt-7">
            <button type="submit" className="customBtn w-full rounded-none">
              {loading ? <Loading /> : "Login"}
            </button>
          </div>

          <p className="mt-5 text-textColor text-center lg:text-[15px] text-[13px]">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-violet-800 font-medium">
              Please Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
