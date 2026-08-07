import { useState, useContext } from "react";
import { authContext } from "../../context/AuthContext";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Loading from "../../components/Shared/Loading";
import Error from "../../components/Shared/Error";
import HospitalProfile from "./HospitalProfile";
import HospitalAppointments from "./HospitalAppointments";
import SmartTokenQueue from "./SmartTokenQueue";
import LiveBedTracker from "./LiveBedTracker";
import BloodBankInventory from "./BloodBankInventory";
import HospitalOverview from "./HospitalOverview";
import HospitalSchedule from "./HospitalSchedule";
import HospitalRevenue from "./HospitalRevenue";
import HospitalReviews from "./HospitalReviews";
import HospitalActivity from "./HospitalActivity";
import HospitalQRPanel from "./HospitalQRPanel";

import { BiSolidUserDetail, BiHistory } from "react-icons/bi";
import { BsActivity, BsCalendarCheck, BsCurrencyRupee, BsStarFill, BsQrCodeScan, BsHospital, BsDropletFill } from "react-icons/bs";
import { FaUserEdit, FaAmbulance, FaBed, FaBuilding, FaBars, FaTimes } from "react-icons/fa";
import { RiPlayListAddFill } from "react-icons/ri";
import { MdOutlineVerified } from "react-icons/md";

/* ============================
   INLINE PREMIUM PANEL COMPONENTS
   ============================ */











/* ============================
   MAIN HOSPITAL DASHBOARD
   ============================ */

const HospitalDashboard = () => {
  const { dispatch } = useContext(authContext);
  const {
    data: hospitalData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/hospitals/profile/me`);

  const [tab, setTab] = useState("settings");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeTabClass = "bg-indigo-600 text-white font-black shadow-md shadow-indigo-100 scale-[1.02] transition-all duration-200";
  const inactiveTabClass = "bg-slate-50 text-slate-500 font-bold hover:bg-slate-100 hover:text-slate-800 transition-all duration-200";

  const navTabs = [
    { id: "settings", label: "Profile", Icon: FaUserEdit },
    { id: "overview", label: "Overview", Icon: BiSolidUserDetail },
    { id: "appointments", label: "Appointments", Icon: RiPlayListAddFill },
    { id: "beds", label: "Live Beds", Icon: FaBed, badge: hospitalData?.availableBeds ?? 0, badgeColor: hospitalData?.availableBeds > 5 ? "bg-green-500" : hospitalData?.availableBeds > 0 ? "bg-orange-500" : "bg-red-500" },
    { id: "blood", label: "Blood Bank", Icon: BsDropletFill, badge: null, badgeColor: "bg-red-500" },
    { id: "workflow", label: "Token Queue", Icon: BsActivity },
    { id: "schedule", label: "Schedule", Icon: BsCalendarCheck },
    { id: "revenue", label: "Revenue", Icon: BsCurrencyRupee },
    { id: "reviews", label: "Reviews", Icon: BsStarFill },
    { id: "activity", label: "Activity", Icon: BiHistory },
    { id: "qr", label: "Clinic QR", Icon: BsQrCodeScan },
  ];

  const currentTabObj = navTabs.find(t => t.id === tab) || navTabs[0];
  const CurrentIcon = currentTabObj.Icon;

  return (
    <section className="bg-[#f8f9ff] min-h-screen">
      <div className="max-w-[1220px] px-4 md:px-6 mx-auto my-6 pb-12">
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}

        {!loading && !error && hospitalData && (
          <div className="flex flex-col md:flex-row w-full gap-6">

            {/* ========================= MOBILE HEADER CONTROL BAR (Visible below md) ========================= */}
            <div className="md:hidden w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-lg">
                  <CurrentIcon />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Section</p>
                  <p className="text-sm font-black text-gray-800 uppercase tracking-wider">{currentTabObj.label}</p>
                </div>
              </div>

              <button type="button" onClick={() => setMobileMenuOpen(true)}
                className="p-3 bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white rounded-xl transition-all active:scale-95 flex items-center gap-1.5 font-black text-xs uppercase tracking-wider">
                <FaBars /> Tabs Menu
              </button>
            </div>

            {/* ========================= MOBILE BACKDROP DRAWER MENU (Grid View) ========================= */}
            {mobileMenuOpen && (
              <div className="fixed inset-0 z-50 bg-indigo-950/80 backdrop-blur-md flex items-center justify-center p-6 animate-fadeIn">
                <div className="bg-white rounded-3xl w-full max-w-lg p-6 max-h-[85vh] overflow-y-auto relative space-y-6">
                  {/* Close button */}
                  <button type="button" onClick={() => setMobileMenuOpen(false)}
                    className="absolute top-4 right-4 p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-red-50 hover:text-red-500 transition-all">
                    <FaTimes className="w-4 h-4" />
                  </button>

                  <div className="text-center pb-2 border-b border-gray-100">
                    <h3 className="font-black text-gray-900 text-lg uppercase tracking-wider">Select Dashboard Section</h3>
                    <p className="text-xs text-gray-400 font-medium">Quick jump to any operational control tab</p>
                  </div>

                  {/* 2-Column Responsive Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {navTabs.map(({ id, label, Icon, badge, badgeColor }) => {
                      const ActiveIcon = Icon;
                      const isSelected = tab === id;
                      return (
                        <button key={id} onClick={() => { setTab(id); setMobileMenuOpen(false); }}
                          className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center text-center gap-2 transition-all active:scale-95 ${
                            isSelected
                              ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200"
                              : "bg-gray-50 border-gray-100 text-gray-600 hover:border-indigo-200"
                          }`}>
                          <ActiveIcon className="w-6 h-6" />
                          <span className="text-xs font-black uppercase tracking-wider">{label}</span>
                          {badge !== null && badge !== undefined && (
                            <span className={`text-[9px] font-black text-white px-2 py-0.5 rounded-full ${badgeColor}`}>
                              {badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Mobile Profile Card footer */}
                  <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3 border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 overflow-hidden flex items-center justify-center">
                      {hospitalData.photo ? (
                        <img src={hospitalData.photo} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <BsHospital className="text-indigo-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-black text-gray-800 truncate max-w-[200px]">{hospitalData.hospitalName}</p>
                      <p className="text-[9px] font-black text-green-600 uppercase">🟢 Verified Node</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================= SIDEBAR (Desktop view) ========================= */}
            <div className="hidden md:flex flex-col pb-6 pt-6 px-4 rounded-2xl shadow-sm bg-white h-max w-full md:w-[25%] gap-2 border border-slate-100 flex-shrink-0">
              {/* Hospital Avatar */}
              <div className="flex flex-col items-center mb-6 pb-6 border-b border-slate-100 w-full">
                <div className="w-20 h-20 rounded-3xl overflow-hidden border-4 border-indigo-50 shadow-xl bg-indigo-100 flex items-center justify-center mb-3">
                  {hospitalData.photo ? (
                    <img src={hospitalData.photo} alt="Hospital" className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <BsHospital className="text-indigo-300 w-10 h-10" />
                  )}
                </div>
                <h3 className="text-sm font-black text-center text-gray-800 leading-tight">{hospitalData.hospitalName || "Your Hospital"}</h3>
                <div className={`mt-2 flex items-center gap-1.5 text-[10px] font-black uppercase px-3 py-1 rounded-full ${hospitalData.isLive ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${hospitalData.isLive ? "bg-green-500 animate-pulse" : "bg-orange-400"}`} />
                  {hospitalData.isLive ? "Live" : "Not Live"}
                </div>
              </div>

              {/* Nav Tabs */}
              {navTabs.map(({ id, label, Icon, badge, badgeColor }) => (
                <button key={id} onClick={() => setTab(id)}
                  className={`${tab === id ? activeTabClass : inactiveTabClass} rounded-xl flex items-center justify-start px-5 py-3 relative`}>
                  <Icon className="w-5 h-5" />
                  <p className="ml-3 text-xs md:text-sm uppercase tracking-wider">{label}</p>
                  {badge !== null && badge !== undefined && (
                    <span className={`ml-auto text-[10px] font-black text-white px-2 py-0.5 rounded-full ${badgeColor}`}>
                      {badge}
                    </span>
                  )}
                </button>
              ))}

              {/* Delete Account */}
              <div className="mt-4 w-full">
                <button className="text-xs font-black uppercase tracking-wider rounded-xl w-full bg-red-50 hover:bg-red-100 text-red-600 p-3 transition-colors border border-red-100">
                  Delete Account
                </button>
              </div>
            </div>

            {/* ========================= CONTENT ========================= */}
            <div className="w-full md:w-[75%] bg-white rounded-2xl p-4 md:p-8 shadow-sm border border-slate-100 min-h-[600px]">

              {/* Live Status Alert */}
              {!hospitalData.isLive && (
                <div className="mb-6 flex items-center gap-4 p-4 bg-orange-50 rounded-2xl border border-orange-200">
                  <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse flex-shrink-0" />
                  <p className="text-sm font-black text-orange-700 uppercase tracking-wider">
                    ⚠️ Go to <span className="underline cursor-pointer" onClick={() => setTab("settings")}>Profile</span> → Enable <strong>"Go LIVE"</strong> toggle → Save to appear in Offline Hub
                  </p>
                </div>
              )}

              {/* Render Active Tab */}
              {tab === "settings" && <HospitalProfile hospitalData={hospitalData} />}
              {tab === "overview" && <HospitalOverview hospitalData={hospitalData} onSwitchTab={setTab} />}
              {tab === "appointments" && <HospitalAppointments bookings={hospitalData.bookings} />}
              {tab === "beds" && <LiveBedTracker hospitalData={hospitalData} />}
              {tab === "blood" && <BloodBankInventory hospitalData={hospitalData} />}
              {tab === "workflow" && <SmartTokenQueue />}
              {tab === "schedule" && <HospitalSchedule hospitalData={hospitalData} />}
              {tab === "revenue" && <HospitalRevenue hospitalData={hospitalData} />}
              {tab === "reviews" && <HospitalReviews hospitalData={hospitalData} />}
              {tab === "activity" && <HospitalActivity hospitalData={hospitalData} />}
              {tab === "qr" && <HospitalQRPanel hospitalData={hospitalData} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HospitalDashboard;
