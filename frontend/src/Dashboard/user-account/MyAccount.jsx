import { useState, useContext } from "react";
import userAvatar from "../../assets/images/icons/patient-avatar.png";
import Error from "../../components/Shared/Error";
import Loading from "../../components/Shared/Loading";
import { BASE_URL } from "../../config";
import useGetProfile from "../../hooks/useFetchData";
import MyBookings from "./MyBookings";
import Profile from "./Profile";
import UserActivity from "./UserActivity";
import PromotionalQRKit from "../../components/Shared/PromotionalQRKit";
import { authContext } from "../../context/AuthContext";
import {
  BsCalendarCheckFill, BsStarFill, BsClockHistory,
  BsPersonFill, BsDropletFill, BsGenderAmbiguous,
  BsShieldFill, BsHouseFill, BsBellFill, BsGearFill,
  BsArrowRight, BsHeartFill
} from "react-icons/bs";
import { MdHealthAndSafety, MdOutlineWaterDrop } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";

const TABS = [
  { id: "settings", label: "Profile",      icon: <FaUserEdit />,           color: "from-rose-500 to-pink-600" },
  { id: "bookings", label: "Bookings",     icon: <BsCalendarCheckFill />,  color: "from-violet-600 to-indigo-600" },
  { id: "activity", label: "Activity",     icon: <BsClockHistory />,       color: "from-emerald-500 to-teal-600" },
  { id: "rate",     label: "Rate",         icon: <BsStarFill />,           color: "from-amber-500 to-orange-500" },
];

const MyAccount = () => {
  const [tab, setTab] = useState("settings");
  const { dispatch } = useContext(authContext);

  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);

  const bloodGroupColor = {
    "A+": "bg-red-100 text-red-700 border-red-200",
    "A-": "bg-red-100 text-red-700 border-red-200",
    "B+": "bg-blue-100 text-blue-700 border-blue-200",
    "B-": "bg-blue-100 text-blue-700 border-blue-200",
    "AB+": "bg-purple-100 text-purple-700 border-purple-200",
    "AB-": "bg-purple-100 text-purple-700 border-purple-200",
    "O+": "bg-emerald-100 text-emerald-700 border-emerald-200",
    "O-": "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  if (loading && !error) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Loading />
    </div>
  );
  if (error && !loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Error errMessage={error} />
    </div>
  );

  const activeTab = TABS.find(t => t.id === tab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50/20 pb-32 md:pb-10">

      {/* ══════════════════════════════════════════
          HERO HEADER — Profile Card (Mobile First)
         ══════════════════════════════════════════ */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-700 via-indigo-700 to-indigo-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(167,139,250,0.3)_0%,_transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50/20 rounded-t-[2.5rem]" />

        <div className="relative px-4 pt-6 pb-20 max-w-4xl mx-auto">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <MdHealthAndSafety className="text-white text-2xl" />
              <span className="text-white font-black text-base tracking-tight">Sehaat Saathi</span>
            </div>
            <button
              onClick={() => setTab("settings")}
              className="w-9 h-9 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-all"
            >
              <BsGearFill className="text-sm" />
            </button>
          </div>

          {/* Profile Card */}
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl border-3 border-white/50 overflow-hidden shadow-xl shadow-indigo-900/30">
                <img
                  src={userData?.photo || userAvatar}
                  alt={userData?.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-400 rounded-lg border-2 border-indigo-800 flex items-center justify-center">
                <BsShieldFill className="text-white text-[9px]" />
              </div>
            </div>

            {/* Name & Info */}
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-white font-black text-xl leading-tight truncate">
                  {userData?.name || "Patient"}
                </h1>
              </div>
              <p className="text-indigo-200 text-xs mb-2 truncate">{userData?.email}</p>

              {/* Badges row */}
              <div className="flex items-center gap-2 flex-wrap">
                {userData?.bloodGroup && (
                  <span className="flex items-center gap-1 bg-white/20 backdrop-blur text-white text-[10px] font-black px-2 py-1 rounded-lg border border-white/30">
                    <MdOutlineWaterDrop className="text-red-300" /> {userData.bloodGroup}
                  </span>
                )}
                {userData?.gender && (
                  <span className="flex items-center gap-1 bg-white/20 backdrop-blur text-white text-[10px] font-black px-2 py-1 rounded-lg border border-white/30">
                    <BsGenderAmbiguous /> {userData.gender}
                  </span>
                )}
                {userData?.phone && (
                  <span className="bg-white/20 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-lg border border-white/30 truncate max-w-[120px]">
                    📞 {userData.phone}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* WOW FACTOR: SOS Emergency Button */}
          <div className="mt-6">
            <button className="w-full relative group/sos overflow-hidden rounded-[2rem] shadow-2xl shadow-red-600/30 transition-all hover:scale-[1.02] active:scale-95">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 animate-pulse duration-1000"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
              <div className="relative px-6 py-5 flex items-center justify-between z-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-inner relative">
                    <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-40"></div>
                    <BsHeartFill className="text-red-600 text-2xl animate-pulse" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-white font-black text-xl tracking-widest uppercase">SOS Emergency</h2>
                    <p className="text-red-100 text-[10px] font-bold tracking-widest uppercase">Tap to alert nearby doctors immediately</p>
                  </div>
                </div>
                <BsArrowRight className="text-white text-3xl opacity-50 group-hover/sos:translate-x-2 transition-transform" />
              </div>
            </button>
          </div>

          {/* WOW FACTOR: Live OPD Tracker */}
          <div className="mt-4 bg-white/10 backdrop-blur-md rounded-[2rem] p-5 border border-white/20 shadow-xl">
             <div className="flex items-center justify-between mb-4">
                 <h3 className="text-white font-black uppercase tracking-widest text-sm flex items-center gap-2">
                     <BsClockHistory className="text-emerald-400" /> Live OPD Tracker
                 </h3>
                 <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-[9px] font-black uppercase tracking-widest animate-pulse">
                     Live Status
                 </span>
             </div>
             <div className="flex items-center justify-between bg-black/20 rounded-2xl p-4 border border-white/10">
                 <div className="text-center">
                     <p className="text-indigo-200 text-[9px] font-black uppercase tracking-widest mb-1">Current Token</p>
                     <p className="text-white font-black text-3xl">12</p>
                 </div>
                 <div className="w-[1px] h-10 bg-white/20"></div>
                 <div className="text-center">
                     <p className="text-indigo-200 text-[9px] font-black uppercase tracking-widest mb-1">Your Token</p>
                     <p className="text-emerald-400 font-black text-3xl">15</p>
                 </div>
                 <div className="w-[1px] h-10 bg-white/20"></div>
                 <div className="text-center">
                     <p className="text-indigo-200 text-[9px] font-black uppercase tracking-widest mb-1">Est. Wait</p>
                     <p className="text-amber-400 font-black text-3xl">45<span className="text-sm">m</span></p>
                 </div>
             </div>
             <div className="mt-4 w-full bg-black/20 h-2 rounded-full overflow-hidden border border-white/10">
                 <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 w-[80%] rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
             </div>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { label: "Appointments", value: userData?.appointments?.length || 0, icon: <BsCalendarCheckFill className="text-violet-300" /> },
              { label: "Reviews", value: userData?.reviews?.length || 0, icon: <BsStarFill className="text-amber-300" /> },
              { label: "Active", value: (userData?.appointments || []).filter(a => a.status === "confirmed" || a.status === "pending").length, icon: <BsHeartFill className="text-emerald-300 animate-pulse" /> },
            ].map(stat => (
              <div key={stat.label} className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 text-center border border-white/20">
                <div className="flex justify-center mb-1">{stat.icon}</div>
                <div className="text-white font-black text-xl leading-none">{stat.value}</div>
                <div className="text-indigo-200 text-[9px] font-medium mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP TABS — hidden on mobile (uses bottom nav instead)
         ══════════════════════════════════════════ */}
      <div className="hidden md:flex max-w-4xl mx-auto px-4 mt-4 gap-3">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-black transition-all ${
              tab === t.id
                ? `bg-gradient-to-r ${t.color} text-white shadow-md`
                : "bg-white text-slate-500 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════
          CONTENT AREA
         ══════════════════════════════════════════ */}
      <div className="max-w-4xl mx-auto px-3 md:px-4 mt-4 md:mt-5">

        {/* Active tab label — mobile only */}
        <div className="md:hidden flex items-center gap-2 mb-4 px-1">
          <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${activeTab?.color || "from-violet-600 to-indigo-600"} flex items-center justify-center text-white text-sm`}>
            {activeTab?.icon}
          </div>
          <h2 className="text-slate-800 font-black text-lg">{activeTab?.label}</h2>
        </div>

        {/* Tab panels */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          {(tab === "bookings" || tab === "rate") && (
            <MyBookings initialSection={tab === "rate" ? "rate" : "bookings"} />
          )}
          {tab === "activity" && <UserActivity />}
          {tab === "settings" && <Profile user={userData} />}
        </div>

        {/* Promo QR Kit */}
        <div className="mt-4">
          <PromotionalQRKit />
        </div>

        {/* Delete account — mobile friendly at bottom */}
        <div className="mt-4 mb-4">
          <button className="w-full flex items-center justify-center gap-2 text-sm font-black text-red-500 border border-red-200 bg-red-50 hover:bg-red-100 py-3 rounded-2xl transition-all">
            Delete Account
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MOBILE BOTTOM NAVIGATION BAR
         ══════════════════════════════════════════ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[999] bg-white/95 backdrop-blur-lg border-t border-slate-100 shadow-2xl shadow-slate-900/20">
        <div className="flex items-center justify-around px-2 py-2 safe-area-bottom">
          {TABS.map(t => {
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-200 flex-1 ${
                  isActive ? "bg-indigo-50" : ""
                }`}
              >
                <div className={`text-xl transition-all duration-200 ${isActive ? "text-indigo-600 scale-110" : "text-slate-400"}`}>
                  {t.icon}
                </div>
                <span className={`text-[9px] font-black uppercase tracking-wider transition-all ${isActive ? "text-indigo-600" : "text-slate-400"}`}>
                  {t.label}
                </span>
                {isActive && (
                  <div className="w-1 h-1 rounded-full bg-indigo-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default MyAccount;
