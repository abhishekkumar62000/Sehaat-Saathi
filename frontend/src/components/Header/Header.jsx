import React, { useState, useEffect, useContext } from "react";
import { BiMenu, BiBell } from "react-icons/bi";
import { BsActivity, BsRobot } from "react-icons/bs";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/brand-logo/SehaatSaathiLogo.png";
import userAvatar from "../../assets/images/icons/patient-avatar.png";
import { authContext } from "../../context/AuthContext";
import { useSocket } from "../../context/SocketContext";
import { BASE_URL } from "../../config";

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/doctors", display: "Doctors" },
  { path: "/services", display: "Services" },
  { path: "/smarthub", display: "SMART HUB", isNew: true },
  { path: "/about", display: "About Us" },
  { path: "/contact", display: "Contact" },
];

const Header = ({ isCompact = false }) => {
  const activeClass = "nav-link-underline active text-orange-600 text-[13px] lg:text-[15px] font-black tracking-widest transition-all";
  const inactiveClass = "nav-link-underline text-slate-700 text-[13px] lg:text-[15px] font-black tracking-widest hover:text-[#000080] transition-all";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user, role, token, dispatch } = useContext(authContext);
  const { socket } = useSocket();

  const navigate = useNavigate();

  // Fetch initial unread count
  useEffect(() => {
    if (token) {
      fetch(`${BASE_URL}/notifications`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          const unread = result.data.filter(n => !n.isRead).length;
          setUnreadCount(unread);
        }
      });
    }
  }, [token]);

  // Listen for real-time alerts
  useEffect(() => {
    if (socket) {
      socket.on("NEW_BOOKING_ALERT", () => setUnreadCount(prev => prev + 1));
      socket.on("STATUS_SYNC", () => setUnreadCount(prev => prev + 1));
    }
    return () => {
      if (socket) {
        socket.off("NEW_BOOKING_ALERT");
        socket.off("STATUS_SYNC");
      }
    };
  }, [socket]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <header className={`header bg-white/95 backdrop-blur-3xl sticky top-0 z-[200] border-b border-slate-100 shadow-md transition-all duration-500 ${isCompact ? 'h-[50px] md:h-[60px]' : ''}`}>
      {/* Patriotic Top Bar - Hidden in Compact Mode */}
      {!isCompact && (
        <div className="bg-slate-900 overflow-hidden relative group/top">
          <div className="animate-marquee whitespace-nowrap py-1.5 flex items-center">
            {[1,2,3].map((i) => (
              <span key={i} className="text-[12px] font-black uppercase tracking-[0.2em] text-white/90 flex items-center mx-8">
                <BsActivity className="text-[#FF9933] mr-2 animate-pulse" />
                India's 1st AI-Powered Virtual Healthcare Platform
                <span className="mx-4 text-white/20">|</span>
                <span className="text-[#138808]">Designed for Remote Consultations, Emergency Healthcare & Diagnostic Solutions!</span>
                <span className="mx-4 text-white/20">|</span>
                <span className="text-[#FF9933] mr-1">Sehaat</span> <span className="text-[#138808]">Saathi</span> <span className="ml-2">In Bharat</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {!isCompact && <div className="w-full h-[4px] bg-gradient-to-r from-[#FF9933] via-white to-[#138808] opacity-90"></div>}
      
      <div className={`container mx-auto flex justify-between items-center transition-all ${isCompact ? 'py-0 md:py-1' : 'py-3'}`}>
        {/* ========Logo========= */}
        <div className="flex items-center">
          <NavLink to="/home" className={`flex items-center gap-2 group/logo relative transition-all ${isCompact ? 'scale-[0.8] origin-left' : ''}`}>
            <div className="relative">
              <img src={logo} alt="Sehaat Saathi Logo" className={`${isCompact ? 'w-[30px] lg:w-[35px]' : 'w-[45px] lg:w-[55px]'} drop-shadow-md transition-transform duration-500 group-hover/logo:rotate-[360deg]`} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div className="flex flex-col justify-center">
              <h1 className={`${isCompact ? 'text-[1.1rem] lg:text-[1.3rem]' : 'text-[1.8rem] lg:text-[2.2rem]'} font-black tracking-tighter leading-none flex items-center`}>
                <span className="text-[#FF9933]">Sehaat</span>
                <span className="text-[#138808] ml-1">Saathi</span>
              </h1>
              {!isCompact && <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400 mt-0.5">India's Smart AI Health</span>}
            </div>
          </NavLink>
        </div>

        {/* Middle: Nav Links (Standard for Desktop) */}
        <nav className="hidden md:flex space-x-8 list-none">
          {navLinks.map((link, index) => (
            <li key={index} className="relative group/nav">
              <NavLink
                to={link.path}
                className={(navClass) =>
                  navClass.isActive ? activeClass : inactiveClass
                }
              >
                {link.display}
                {link.isNew && (
                  <span className="absolute -top-4 -right-6 px-2 py-0.5 bg-orange-600 text-[9px] text-white font-black rounded-full uppercase tracking-tighter shadow-sm animate-bounce">
                    New
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </nav>

        {/* Right: User Info or Login/Logout */}
        <div className="flex items-center lg:space-x-6 space-x-3">
          {token && user ? (
            <div className="flex items-center space-x-4">
              {/* Neural Notification Bell */}
              <div className="relative cursor-pointer group/bell" onClick={() => navigate(`${role === "doctor" ? "/doctors/profile/me" : "/users/profile/me"}`)}>
                <BiBell className="w-6 h-6 text-slate-700 group-hover/bell:text-orange-600 transition-colors" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse border border-white shadow-sm">
                    {unreadCount}
                  </span>
                )}
              </div>

              <Link
                to={`${role === "doctor" ? "/doctors/profile/me" : "/users/profile/me"}`}
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
