import { useContext, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/brand-logo/SehaatSaathi Logo.png";
import userAvatar from "../../assets/images/icons/patient-avatar.png";
import { authContext } from "../../context/AuthContext";

const navLinks = [
  {
    path: "/",
    display: "HOME",
  },
  {
    path: "/doctors",
    display: "DOCTORS",
  },
  {
    path: "/services",
    display: "SERVICES",
  },
  {
    path: "/smarthub",
    display: "SMART HUB",
  },
  {
    path: "/about",
    display: "ABOUT US",
  },
  {
    path: "/contact",
    display: "CONTACT",
  },
];
const Header = () => {
  const activeClass = "nav-link-underline active text-orange-600 text-[15px] font-black tracking-widest transition-all";
  const inactiveClass = "nav-link-underline text-slate-700 text-[15px] font-black tracking-widest hover:text-[#000080] transition-all";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, role, token, dispatch } = useContext(authContext);

  const navigate = useNavigate();

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  return (
    <header className="header bg-white/90 backdrop-blur-3xl sticky top-0 z-50 border-b border-slate-100/50 shadow-sm transition-all duration-500">
      {/* Flag Gradient Accent Top */}
      <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#FF9933] via-white to-[#138808] opacity-90"></div>
      <div className="container mx-auto flex justify-between items-center py-3">
        {/* ========Logo========= */}
        <div className="flex items-center">
          <NavLink to="/" className="group flex items-center">
            <div className="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm p-1.5 transition-all duration-500 group-hover:bg-green-50/30 group-hover:shadow-[0_0_25px_rgba(22,163,74,0.15)]">
              <img
                src={logo}
                alt="Sehaat Saathi Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 object-contain transform transition-transform duration-500 group-hover:scale-110 active:scale-95"
              />
              <div className="absolute inset-0 border border-transparent group-hover:border-green-100/50 rounded-xl transition-all duration-500"></div>
            </div>
            <div className="ml-4 flex flex-row items-center whitespace-nowrap leading-none scale-105">
              <span className="text-xl sm:text-2xl font-black tracking-tighter drop-shadow-sm" style={{ color: "#FF9933" }}>
                Sehaat
              </span>
              <span className="ml-1 text-xl sm:text-2xl font-black tracking-tighter drop-shadow-sm" style={{ color: "#138808" }}>
                Saathi
              </span>
            </div>
          </NavLink>
        </div>

        {/* Middle: Nav Links */}
        <nav className="hidden md:flex space-x-8 list-none">
          {navLinks.map((link, index) => (
            <li key={index} className="relative">
              <NavLink
                to={link.path}
                className={(navClass) =>
                  navClass.isActive ? activeClass : inactiveClass
                }
              >
                {link.display}
                {link.display === "SMART HUB" && (
                  <span className="absolute -top-3 -right-5 bg-orange-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full animate-bounce shadow-md border border-white/40">
                    NEW
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </nav>

        {/* Right: User Info or Login/Logout */}
        <div className="flex items-center lg:space-x-6 space-x-3">
          {token && user ? (
            <div className="flex items-center space-x-3">
              <Link
                to={`${role == "doctor" ? "/doctors/profile/me" : "/users/profile/me"
                  }`}
                className="flex items-center hover:scale-105 transition-all"
              >
                <span className="text-slate-800 font-black text-sm mr-2 hidden lg:block">{user.name}</span>
                <figure className="lg:w-[48px] lg:h-[48px] w-[36px] h-[36px] rounded-full cursor-pointer flex items-center border-2 border-green-100 shadow-sm overflow-hidden">
                  <img
                    src={user?.photo ? user.photo : userAvatar}
                    alt="user"
                    className="w-full h-full object-cover"
                  />
                </figure>
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 py-2.5 px-5 text-white font-black tracking-widest uppercase text-[12px] rounded-xl shadow-lg shadow-red-100 transition-all duration-300 active:scale-95 hidden lg:block border border-red-400/20"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="patriotic-btn py-2.5 px-7 font-black tracking-widest uppercase text-[13px] rounded-xl flex items-center justify-center shadow-xl active:scale-95 transition-all duration-300 group/btn"
            >
              <span className="relative z-10 flex items-center gap-2">
                Login
                <span className="text-blue-900 group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
          )}

          {/* Toggle Menu Button for Mobile */}
          <button
            className="md:hidden block text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            <BiMenu className="w-8 h-8 cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Mobile Menu with Premium Patriotic Glass */}
      {isMenuOpen && (
        <div className="md:hidden tri-glass fixed inset-y-0 right-0 w-72 p-8 z-[100] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] border-l border-white/40 animate-slide-in">
          <button
            className="absolute top-6 right-6 text-slate-600 hover:text-orange-600 transition-colors"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="mb-10 mt-6 flex items-center gap-4 bg-white/40 p-3 rounded-2xl border border-white/60">
            <img src={logo} alt="Logo" className="w-12 h-12 object-contain drop-shadow-md" />
            <div className="flex flex-col">
              <span className="text-xl font-black leading-none drop-shadow-sm" style={{ color: "#FF9933" }}>Sehaat</span>
              <span className="text-xl font-black leading-none drop-shadow-sm" style={{ color: "#138808" }}>Saathi</span>
            </div>
          </div>

          <nav className="flex flex-col space-y-5 list-none">
            {navLinks.map((link, index) => (
              <li key={index} className="relative group">
                <NavLink
                  to={link.path}
                  onClick={toggleMenu}
                  className={(navClass) =>
                    navClass.isActive
                      ? "text-orange-600 font-extrabold text-xl tracking-tight block transition-all scale-105 origin-left"
                      : "text-slate-700 font-bold text-lg tracking-tight block hover:text-[#000080] transition-all"
                  }
                >
                  <div className="flex items-center justify-between py-1">
                    <span>{link.display}</span>
                    <BsActivity className="opacity-0 group-hover:opacity-100 transition-all text-green-600 animate-pulse" />
                  </div>
                  {link.display === "SMART HUB" && (
                    <span className="absolute -top-3 left-24 bg-orange-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full animate-pulse border border-white/20">
                      NEW
                    </span>
                  )}
                </NavLink>
              </li>
            ))}

            <div className="pt-8 border-t border-slate-200/50 mt-4">
              {token && user ? (
                <button
                  onClick={() => { handleLogout(); toggleMenu(); }}
                  className="w-full bg-red-500/10 text-red-600 border border-red-200 py-4 rounded-2xl font-black tracking-widest uppercase text-[12px] hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="patriotic-btn w-full flex items-center justify-center py-5 rounded-2xl font-black tracking-widest uppercase text-[12px] shadow-2xl active:scale-95 transition-all duration-300"
                >
                  Login Hub
                </Link>
              )}
            </div>
          </nav>

          <div className="absolute bottom-8 left-8 right-8 text-center">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Bharat Healthcare AI</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
