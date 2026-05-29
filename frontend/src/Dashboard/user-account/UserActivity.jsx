import React, { useContext } from "react";
import { motion } from "framer-motion";
import { 
  FaStethoscope, 
  FaPrescriptionBottleAlt, 
  FaMicroscope, 
  FaUserMd, 
  FaHospital, 
  FaClinicMedical,
  FaClock,
  FaTrash
} from "react-icons/fa";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Loading from "../../components/Shared/Loading";
import Error from "../../components/Shared/Error";
import { authContext } from "../../context/AuthContext";

const featureIcons = {
  "Symptom Checker": <FaStethoscope className="text-blue-500" />,
  "AI Doctor": <FaUserMd className="text-purple-500" />,
  "Medicine Finder": <FaPrescriptionBottleAlt className="text-green-500" />,
  "Report Interpreter": <FaMicroscope className="text-red-500" />,
  "Hospital Availability": <FaHospital className="text-orange-500" />,
  "Smart Hub": <FaClinicMedical className="text-teal-500" />,
  "Live Tele-Consult": <FaVideo className="text-rose-500" />,
  "Offline Consultation": <FaHospitalUser className="text-blue-600" />,
  "BOOKING_ACCEPTED": <FaCheckCircle className="text-green-600 font-bold" />,
  "BOOKING_REJECTED": <FaTimesCircle className="text-red-600 font-bold" />,
  "AUTO_CANCELLED": <FaClock className="text-red-400 animate-pulse" />,
  "Default": <FaClock className="text-gray-500" />
};
import { FaCheckCircle, FaTimesCircle, FaVideo, FaHospitalUser } from "react-icons/fa";

const UserActivity = () => {
    const { token } = useContext(authContext);
    const {
        data: notifications,
        loading: loadingNotif,
    } = useGetProfile(`${BASE_URL}/notifications`);

    const {
        data: logs,
        loading: loadingLogs,
        error,
    } = useGetProfile(`${BASE_URL}/users/activity/history`);

    const activities = [...(notifications || []), ...(logs || [])].sort((a,b) => 
        new Date(b.createdAt || b.timestamp) - new Date(a.createdAt || a.timestamp)
    );

    const clearHistory = async () => {
        if (!window.confirm("Are you sure you want to clear your activity history? This cannot be undone.")) return;

        try {
            const res = await fetch(`${BASE_URL}/users/activity/clear`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const result = await res.json();
            if (result.success) {
                window.location.reload(); 
            }
        } catch (err) {
            console.error("Failed to clear history", err);
        }
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getRelativeTime = (dateString) => {
        const now = new Date();
        const date = new Date(dateString);
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return "Just now";
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    };

    if (loadingNotif || loadingLogs) return <Loading />;
    if (error) return <Error errMessage={error} />;

    return (
        <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-[20px] leading-[30px] font-bold text-headingColor flex items-center gap-2">
                    Your Health Journey Activity
                    <span className="text-[14px] font-medium text-textColor bg-gray-100 px-3 py-1 rounded-full">
                        {activities?.length || 0} Records
                    </span>
                </h2>
                {activities?.length > 0 && (
                    <button 
                        onClick={clearHistory}
                        className="flex items-center gap-2 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg text-[13px] font-bold transition-all"
                    >
                        <FaTrash size={12} /> Clear History
                    </button>
                )}
            </div>

            {(!activities || activities.length === 0) ? (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                    <p className="text-textColor">No activity records found yet. Start exploring Sehaat Saathi features!</p>
                </div>
            ) : (
                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                    <div className="space-y-8">
                        {activities.map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="relative flex items-start ml-12"
                            >
                                {/* Neural Pulse Indicator */}
                                <div className="absolute -left-12 mt-1 w-12 h-12 rounded-full border-4 border-white bg-white shadow-lg flex items-center justify-center z-10 transition-transform hover:scale-110">
                                    <div className="text-[20px]">
                                        {featureIcons[item.featureName] || featureIcons[item.actionType] || featureIcons["Default"]}
                                    </div>
                                </div>

                                <div className={`p-4 rounded-xl shadow-sm border w-full transition-all duration-300 hover:shadow-md ${
                                    item.actionType ? 'bg-green-50/30 border-green-100 hover:border-green-300' : 'bg-white border-gray-100 hover:border-blue-100'
                                }`}>
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-[16px] text-headingColor tracking-tight">
                                            {item.featureName || item.actionType?.replace('_', ' ')}
                                        </h3>
                                        <span className="text-[12px] text-slate-400 font-medium">
                                            {getRelativeTime(item.createdAt || item.timestamp)}
                                        </span>
                                    </div>
                                    <p className="text-textColor text-[14px]">
                                        {item.message || item.action}
                                    </p>
                                    <div className="mt-3 flex items-center justify-between">
                                        <div className="text-[12px] text-gray-400 flex items-center gap-1">
                                            <FaClock className="text-[10px]" /> {formatTime(item.createdAt || item.timestamp)}
                                        </div>
                                        {item.isRead === false && (
                                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserActivity;
