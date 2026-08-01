import { useState, useEffect } from "react";
import { BiSolidUserDetail, BiHistory } from "react-icons/bi";
import { BsActivity, BsCalendarCheck, BsCurrencyRupee, BsStarFill, BsQrCodeScan } from "react-icons/bs";
import { CgDanger } from "react-icons/cg";
import { FaUserEdit } from "react-icons/fa";
import { RiPlayListAddFill } from "react-icons/ri";
import bgImg from "../../assets/images/bgImg.png";
import starIcon from "../../assets/images/icons/Star.png";
import doctorAvatar from "../../assets/images/icons/avatar-icon.png";
import DoctorAbout from "../../components/DoctorDetails/DoctorAbout";
import Error from "../../components/Shared/Error";
import Loading from "../../components/Shared/Loading";
import { BASE_URL } from "../../config";
import useGetProfile from "../../hooks/useFetchData";
import Appointments from "./Appointments";
import Profile from "./Profile";
import DoctorActivity from "./DoctorActivity";
import WorkflowPanel from "./WorkflowPanel";
import useRecordActivity from "../../hooks/useRecordActivity";
import DoctorAnalyticsOverview from "../../components/DoctorDetails/DoctorAnalyticsOverview";
import DoctorAvailabilityManager from "../../components/DoctorDetails/DoctorAvailabilityManager";
import RevenueEarningsPanel from "../../components/DoctorDetails/RevenueEarningsPanel";
import ReviewReputationManager from "../../components/DoctorDetails/ReviewReputationManager";
import ClinicQRKit from "./ClinicQRKit";
import PromotionalQRKit from "../../components/Shared/PromotionalQRKit";

const Dashboard = () => {
  const [tab, setTab] = useState("settings");

  const activeTabClass = "bg-indigo-600 text-white font-black shadow-md shadow-indigo-100 scale-[1.02] transition-all duration-200";
  const inactiveTabClass = "bg-slate-50 text-slate-500 font-bold hover:bg-slate-100 hover:text-slate-800 transition-all duration-200";

  const { data, loading, error } = useGetProfile(
    `${BASE_URL}/doctors/profile/me`
  );

  const { recordActivity } = useRecordActivity();

  useEffect(() => {
    if (data) {
      recordActivity("Dashboard", "Professional Overview");
    }
  }, [data]);

  return (
    <section className="max-w-[1220px] px-4 md:px-6 mx-auto my-6">
      {loading && !error && <Loading />}

      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <div className="flex flex-col md:flex-row w-full gap-6">
          {/* =======================
                 left side/Tabs
          =========================== */}
          <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible pb-4 md:pb-6 pt-2 md:pt-6 px-3 md:px-4 rounded-2xl shadow-sm bg-white h-max w-full md:w-[25%] gap-2 scrollbar-none border border-slate-100 flex-shrink-0">
            <button
              onClick={() => setTab("settings")}
              className={`${
                tab == "settings" ? activeTabClass : inactiveTabClass
              } flex-shrink-0 rounded-xl flex items-center justify-start px-4 md:px-5 py-3`}
            >
              <FaUserEdit className="w-5 h-5" />
              <p className="ml-3 text-xs md:text-sm uppercase tracking-wider">Profile</p>
            </button>
            <button
              onClick={() => setTab("overview")}
              className={`${
                tab == "overview" ? activeTabClass : inactiveTabClass
              } flex-shrink-0 rounded-xl flex items-center justify-start px-4 md:px-5 py-3`}
            >
              <BiSolidUserDetail className="w-5 h-5" />
              <p className="ml-3 text-xs md:text-sm uppercase tracking-wider">Overview</p>
            </button>
            <button
              onClick={() => setTab("appointments")}
              className={`${
                tab == "appointments" ? activeTabClass : inactiveTabClass
              } flex-shrink-0 rounded-xl flex items-center justify-start px-4 md:px-5 py-3`}
            >
              <RiPlayListAddFill className="w-5 h-5" />
              <p className="ml-3 text-xs md:text-sm uppercase tracking-wider">Appointments</p>
            </button>
            <button
              onClick={() => setTab("workflow")}
              className={`${
                tab == "workflow" ? activeTabClass : inactiveTabClass
              } flex-shrink-0 rounded-xl flex items-center justify-start px-4 md:px-5 py-3`}
            >
              <BsActivity className="w-5 h-5" />
              <p className="ml-3 text-xs md:text-sm uppercase tracking-wider">Workflow</p>
            </button>
            <button
              onClick={() => setTab("availability")}
              className={`${
                tab == "availability" ? activeTabClass : inactiveTabClass
              } flex-shrink-0 rounded-xl flex items-center justify-start px-4 md:px-5 py-3`}
            >
              <BsCalendarCheck className="w-5 h-5" />
              <p className="ml-3 text-xs md:text-sm uppercase tracking-wider">Schedule</p>
            </button>
            <button
              onClick={() => setTab("revenue")}
              className={`${
                tab == "revenue" ? activeTabClass : inactiveTabClass
              } flex-shrink-0 rounded-xl flex items-center justify-start px-4 md:px-5 py-3`}
            >
              <BsCurrencyRupee className="w-5 h-5" />
              <p className="ml-3 text-xs md:text-sm uppercase tracking-wider">Revenue</p>
            </button>
            <button
              onClick={() => setTab("reviews")}
              className={`${
                tab == "reviews" ? activeTabClass : inactiveTabClass
              } flex-shrink-0 rounded-xl flex items-center justify-start px-4 md:px-5 py-3`}
            >
              <BsStarFill className="w-5 h-5" />
              <p className="ml-3 text-xs md:text-sm uppercase tracking-wider">Reviews</p>
            </button>
            <button
              onClick={() => setTab("activity")}
              className={`${
                tab == "activity" ? activeTabClass : inactiveTabClass
              } flex-shrink-0 rounded-xl flex items-center justify-start px-4 md:px-5 py-3`}
            >
              <BiHistory className="w-5 h-5" />
              <p className="ml-3 text-xs md:text-sm uppercase tracking-wider">Activity</p>
            </button>
            <button
              onClick={() => setTab("qr-kit")}
              className={`${
                tab == "qr-kit" ? activeTabClass : inactiveTabClass
              } flex-shrink-0 rounded-xl flex items-center justify-start px-4 md:px-5 py-3`}
            >
              <BsQrCodeScan className="w-5 h-5" />
              <p className="ml-3 text-xs md:text-sm uppercase tracking-wider">Clinic QR</p>
            </button>

            <div className="md:block hidden mt-6 w-full">
              <button className="text-xs font-black uppercase tracking-wider rounded-xl w-full bg-red-50 hover:bg-red-100 text-red-600 p-3 transition-colors border border-red-100">
                Delete Account
              </button>
            </div>
          </div>

          {/* =======================
           right side/details layout
          =========================== */}
          <div className="w-full md:w-[75%] bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-slate-100">
            
            {/* WOW FACTOR: SOS Emergency Radar Alert */}
            <div className="mb-6 relative group/radar overflow-hidden rounded-[2rem] shadow-2xl shadow-red-500/20 bg-white border-2 border-red-500">
                <div className="absolute inset-0 bg-red-50 opacity-50"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(239,68,68,0.15)_0%,_transparent_70%)] animate-pulse duration-1000"></div>
                <div className="relative px-6 py-6 flex flex-col md:flex-row items-center justify-between z-10 gap-4">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center shadow-inner relative">
                            <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-60"></div>
                            <CgDanger className="text-red-600 text-3xl animate-pulse" />
                        </div>
                        <div>
                            <h2 className="text-red-600 font-black text-xl tracking-widest uppercase flex items-center gap-2">
                                🚨 SOS Radar Active
                            </h2>
                            <p className="text-slate-600 text-xs font-bold tracking-wider mt-1">
                                Scanning for nearby patient emergencies...
                            </p>
                        </div>
                    </div>
                    <button className="px-6 py-3 bg-red-600 text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-red-600/30 hover:bg-red-700 active:scale-95 transition-all">
                        View Active Alerts
                    </button>
                </div>
            </div>

            {data.isApproved == "pending" && (
              <div className="flex justify-center items-center py-3 mb-4 text-white bg-red-400 rounded-xl animate-bounce">
                <CgDanger className="w-5 h-5" />
                <span className="sr-only">Info</span>
                <div className="ml-3 text-xs font-black uppercase tracking-wider">
                  Complete your profile to request manual clinical approval (within 3 days).
                </div>
              </div>
            )}

            <div>
              {tab == "overview" && (
                <DoctorAnalyticsOverview doctorData={data} />
              )}
              {tab == "appointments" && (
                <Appointments appointments={data.appointments} />
              )}
              {tab == "workflow" && (
                <WorkflowPanel appointments={data.appointments} doctorId={data._id} />
              )}
              {tab == "availability" && (
                <DoctorAvailabilityManager doctorData={data} />
              )}
              {tab == "revenue" && (<RevenueEarningsPanel doctorData={data} />)}
              {tab == "reviews" && (<ReviewReputationManager doctorData={data} />)}
              {tab == "settings" && <Profile doctorData={data} />}
              {tab == "activity" && <DoctorActivity />}
              {tab == "qr-kit" && <ClinicQRKit doctorData={data} />}
            </div>
            {/* Promotional Website Advertisement Kit */}
            <PromotionalQRKit />
          </div>
        </div>
      )}
    </section>
  );
};

export default Dashboard;
