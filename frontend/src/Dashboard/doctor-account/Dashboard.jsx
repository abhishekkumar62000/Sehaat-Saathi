import { useState, useEffect } from "react";
import { BiSolidUserDetail, BiHistory } from "react-icons/bi";
import { BsActivity, BsCalendarCheck, BsCurrencyRupee, BsStarFill } from "react-icons/bs";
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

const Dashboard = () => {
  const [tab, setTab] = useState("overview");

  const activeTabClass = "bg-indigo-100 text-primaryColor";
  const inactiveTabClass = "bg-transparent text-headingColor";

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
    <section className="max-w-[1220px] px-5 mx-auto my-6">
      {loading && !error && <Loading />}

      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <div className="flex w-full mx-auto">
          {/* =======================
                 left side/Tabs
          =========================== */}
          <div className="w-[13%] lg:w-[25%] lg:py-6 lg:px-[20px] px-1 pb-3 rounded-md shadow-md bg-white h-max lg:mr-0 mr-[6px]">
            <button
              onClick={() => setTab("overview")}
              className={`${
                tab == "overview" ? activeTabClass : inactiveTabClass
              } w-full mt-0 rounded-md flex items-center lg:justify-start justify-center lg:px-5 lg:py-2 px-1`}
            >
              <BiSolidUserDetail className="w-7 h-7" />
              <p className="ml-3 hidden lg:block">Overview</p>
            </button>
            <button
              onClick={() => setTab("appointments")}
              className={`${
                tab == "appointments" ? activeTabClass : inactiveTabClass
              } w-full mt-2 rounded-md flex items-center lg:justify-start justify-center lg:px-5 lg:py-2 px-1`}
            >
              <RiPlayListAddFill className="w-6 h-6" />
              <p className="ml-3 hidden lg:block">Appointments</p>
            </button>
            <button
              onClick={() => setTab("workflow")}
              className={`${
                tab == "workflow" ? activeTabClass : inactiveTabClass
              } w-full mt-2 rounded-md flex items-center lg:justify-start justify-center lg:px-5 lg:py-2 px-1`}
            >
              <BsActivity className="w-6 h-6" />
              <p className="ml-3 hidden lg:block">Workflow Panel</p>
            </button>
            <button
                  onClick={() => setTab("availability")}
                  className={`${tab == "availability" ? activeTabClass : inactiveTabClass} w-full mt-2 rounded-md flex items-center lg:justify-start justify-center lg:px-5 lg:py-2 px-1`}
                >
                  <BsCalendarCheck className="w-6 h-6" />
                  <p className="ml-3 hidden lg:block">Availability Schedule</p>
                </button>

                {/* Revenue Panel Tab */}
                <button
                  onClick={() => setTab("revenue")}
                  className={`${tab == "revenue" ? activeTabClass : inactiveTabClass} w-full mt-2 rounded-md flex items-center lg:justify-start justify-center lg:px-5 lg:py-2 px-1`}
                >
                  <BsCurrencyRupee className="w-6 h-6" />
                  <p className="ml-3 hidden lg:block">Revenue & Earnings</p>
                </button>

                {/* Reviews Tab */}
                <button
                  onClick={() => setTab("reviews")}
                  className={`${tab == "reviews" ? activeTabClass : inactiveTabClass} w-full mt-2 rounded-md flex items-center lg:justify-start justify-center lg:px-5 lg:py-2 px-1`}
                >
                  <BsStarFill className="w-6 h-6" />
                  <p className="ml-3 hidden lg:block">Reviews</p>
                </button>
            <button
              onClick={() => setTab("settings")}
              className={`${
                tab == "settings" ? activeTabClass : inactiveTabClass
              } w-full mt-2 rounded-md flex items-center lg:justify-start justify-center lg:px-5 lg:py-2 px-1`}
            >
              <FaUserEdit className="w-7 h-7" />
              <p className="ml-3 hidden lg:block">Profile</p>
            </button>
            <button
              onClick={() => setTab("activity")}
              className={`${
                tab == "activity" ? activeTabClass : inactiveTabClass
              } w-full mt-2 rounded-md flex items-center lg:justify-start justify-center lg:px-5 lg:py-2 px-1`}
            >
              <BiHistory className="w-7 h-7" />
              <p className="ml-3 hidden lg:block">Activity Hub</p>
            </button>

            <div className="lg:block hidden mt-[100px] w-full">
              <button className="lg:text-[16px] text-[14px] rounded-md w-full bg-red-600 mt-4 text-white lg:p-3 p-1">
                Delete Account
              </button>
            </div>
          </div>

          {/* =======================
           right side/details layout
          =========================== */}
          <div className="w-[87%] lg:w-[75%] lg:px-0 px-3 lg:ml-8 rounded-md lg:rounded-none shadow-md lg:shadow-none ">
            {data.isApproved == "pending" && (
              <div className="flex justify-center items-center py-3 my-4 text-white bg-red-400 rounded-lg animate-bounce">
                <CgDanger className="w-5 h-5" />

                <span className="sr-only">Info</span>
                <div className="ml-3 text-sm font-medium">
                  To get approval please complete your profile. We&apos;ll
                  review manually and approve within 3days.
                </div>
              </div>
            )}

            <div className="lg:px-0 px-[10px]">
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
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Dashboard;
