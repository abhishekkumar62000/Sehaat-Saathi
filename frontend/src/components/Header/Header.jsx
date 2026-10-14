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
  const activeClass = "nav-link-underline active text-orange-600 text-[13px] lg:text-[14px] font-bold tracking-tight whitespace-nowrap transition-colors";
  const inactiveClass = "nav-link-underline text-slate-700 text-[13px] lg:text-[14px] font-semibold tracking-tight whitespace-nowrap hover:text-orange-600 transition-colors";

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
    <header className={`header bg-white/95 backdrop-blur-3xl sticky top-0 z-[200] border-b border-slate-100 shadow-md transition-all duration-500 ${isCompact ? 'h-[50px] md:h-[55px]' : ''}`}>
      {/* Patriotic Top Bar - Hidden in Compact Mode */}
      {!isCompact && (
        <div className="bg-slate-900 overflow-hidden relative group/top">
          <div className="animate-marquee whitespace-nowrap py-1.5 flex items-center">
            {[1,2,3].map((i) => (
              <span key={i} className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/90 flex items-center mx-8">
                <BsActivity className="text-[#FF9933] mr-2 animate-pulse" />
                India's 1st AI-Powered Virtual Healthcare Platform
                <span className="mx-4 text-white/20">|</span>
                <span className="text-[#138808]">Designed for Remote Consultations, Emergency Healthcare & Diagnostic Solutions!</span>
                <span className="mx-4 text-white/20">|</span>
                <span className="text-[#FF9933] mr-1">Sehaat</span> <span className="text-[#138808]">Saathi</span> <span className="text-[#FF9933] ml-1 font-black">App</span> <span className="ml-2">In Bharat</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {!isCompact && <div className="w-full h-[3px] bg-gradient-to-r from-[#FF9933] via-white to-[#138808] opacity-90"></div>}
      
      <div className={`container mx-auto px-4 lg:px-8 flex justify-between items-center transition-all ${isCompact ? 'py-1' : 'py-2 md:py-2.5'}`}>
        {/* ========Logo========= */}
        <div className="flex items-center shrink-0">
          <NavLink to="/home" className={`flex items-center gap-2.5 group/logo relative transition-all ${isCompact ? 'scale-[0.85] origin-left' : ''}`}>
            <div className="relative shrink-0">
              <img src={logo} alt="Sehaat Saathi App Logo" className={`${isCompact ? 'w-[28px]' : 'w-[36px] lg:w-[42px]'} drop-shadow-sm transition-transform duration-500 group-hover/logo:rotate-[360deg]`} loading="lazy" />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div className="flex flex-col justify-center">
              <h1 className={`${isCompact ? 'text-[1.05rem]' : 'text-[1.25rem] lg:text-[1.45rem]'} font-extrabold tracking-tight leading-none flex items-center`}>
                <span className="text-[#FF9933]">Sehaat</span>
                <span className="text-[#138808] ml-1">Saathi</span>
                <span className="text-orange-600 ml-1.5 text-[10px] lg:text-[11px] font-black uppercase tracking-wider bg-orange-50 border border-orange-200/80 px-1.5 py-0.5 rounded leading-none shadow-xs">App</span>
              </h1>
              {!isCompact && <span className="text-[8.5px] lg:text-[9.5px] uppercase tracking-wider font-bold text-slate-400 mt-0.5">India's Smart AI Health</span>}
            </div>
          </NavLink>
        </div>

        {/* Middle: Nav Links (Standard for Desktop) */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8 list-none">
          {navLinks.map((link, index) => (
            <li key={index} className="relative group/nav shrink-0">
              <NavLink
                to={link.path}
                className={(navClass) =>
                  navClass.isActive ? activeClass : inactiveClass
                }
              >
                {link.display}
                {link.isNew && (
                  <span className="absolute -top-2.5 -right-5 px-1.5 py-0.2 bg-orange-600 text-[8px] text-white font-extrabold rounded-full uppercase tracking-tight shadow-xs animate-bounce">
                    New
                  </span>
                )}
              </NavLink>
            </li>
          ))}
          {/* Account Deletion Bold Button */}
          <li className="shrink-0">
            <NavLink
              to="/account-deletion"
              className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-[11px] lg:text-[12px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-md shadow-rose-200/60 transition-all duration-200 whitespace-nowrap border border-rose-700/30"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Account Deletion
            </NavLink>
          </li>
        </nav>


        {/* Right: User Info or Login/Logout */}
        <div className="flex items-center space-x-2.5 lg:space-x-4 shrink-0">
          {token && user ? (
            <div className="flex items-center space-x-2.5 lg:space-x-3.5">
              {/* Neural Notification Bell */}
              <div className="relative cursor-pointer group/bell p-1" onClick={() => navigate(role === "doctor" ? "/doctors/profile/me" : role === "hospital" ? "/hospitals/profile/me" : "/users/profile/me")}>
                <BiBell className="w-5 h-5 text-slate-700 group-hover/bell:text-orange-600 transition-colors" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse border border-white shadow-xs">
                    {unreadCount}
                  </span>
                )}
              </div>

              <Link
                to={role === "doctor" ? "/doctors/profile/me" : role === "hospital" ? "/hospitals/profile/me" : "/users/profile/me"}
                className="flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <span className="text-slate-800 font-bold text-xs lg:text-[13px] hidden xl:inline-block whitespace-nowrap max-w-[130px] truncate leading-tight">{user.name}</span>
                <figure className="w-[34px] h-[34px] lg:w-[38px] lg:h-[38px] rounded-full cursor-pointer flex items-center border border-emerald-200 shadow-xs overflow-hidden shrink-0">
                  <img src={user?.photo ? user.photo : userAvatar}
                    alt="user"
                    className="w-full h-full object-cover"
                    loading="lazy" />
                </figure>
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 py-1.5 px-3.5 text-white font-bold tracking-wider uppercase text-[11px] rounded-lg shadow-sm transition-all duration-200 active:scale-95 hidden md:block whitespace-nowrap"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="patriotic-btn py-1.5 px-4 font-bold tracking-wider uppercase text-[12px] rounded-lg flex items-center justify-center shadow-md active:scale-95 transition-all duration-200 whitespace-nowrap group/btn"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Login
                <span className="text-blue-900 group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
          )}

          {/* Toggle Menu Button for Mobile */}
          <button
            className="md:hidden block text-gray-700 focus:outline-none p-1"
            onClick={toggleMenu}
          >
            <BiMenu className="w-7 h-7 cursor-pointer" />
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
            <img src={logo} alt="Logo" className="w-12 h-12 object-contain drop-shadow-md"  loading="lazy" />
            <div className="flex flex-col">
              <span className="text-xl font-black leading-none drop-shadow-sm" style={{ color: "#FF9933" }}>Sehaat</span>
              <span className="text-xl font-black leading-none drop-shadow-sm flex items-center gap-1.5" style={{ color: "#138808" }}>
                Saathi <span className="text-[10px] font-black uppercase text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded">App</span>
              </span>
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
              {/* Account Deletion Mobile Button */}
              <NavLink
                to="/account-deletion"
                onClick={toggleMenu}
                className="w-full mb-4 flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white py-3.5 rounded-2xl font-black tracking-wider uppercase text-[12px] shadow-lg shadow-rose-200/50 transition-all duration-300 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Account Deletion
              </NavLink>
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
