import { useContext } from "react";
import { motion } from "framer-motion";
import { 
  FaUserEdit, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaChartLine, 
  FaHospital, 
  FaUserMd,
  FaClock,
  FaTrash,
  FaClipboardList
} from "react-icons/fa";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Loading from "../../components/Shared/Loading";
import Error from "../../components/Shared/Error";
import { authContext } from "../../context/AuthContext";

const featureIcons = {
  "Profile": <FaUserEdit className="text-blue-500" />,
  "Booking": <FaCheckCircle className="text-green-500" />,
  "Cancellation": <FaTimesCircle className="text-red-500" />,
  "Dashboard": <FaChartLine className="text-purple-500" />,
  "Hospital": <FaHospital className="text-orange-500" />,
  "Doctor": <FaUserMd className="text-teal-500" />,
  "Appointments": <FaClipboardList className="text-indigo-500" />,
  "NEW_BOOKING": <FaClipboardList className="text-orange-500" />,
  "BOOKING_ACCEPTED": <FaCheckCircle className="text-green-600 font-bold" />,
  "BOOKING_REJECTED": <FaTimesCircle className="text-red-600 font-bold" />,
  "AUTO_CANCELLED": <FaClock className="text-red-400 animate-pulse" />,
  "Default": <FaClock className="text-gray-500" />
};

const DoctorActivity = () => {
    const { token } = useContext(authContext);
    const {
        data: notifications,
        loading: loadingNotif,
    } = useGetProfile(`${BASE_URL}/notifications`);

    const {
        data: logs,
        loading: loadingLogs,
        error: errorLogs,
    } = useGetProfile(`${BASE_URL}/doctors/activity/history`);

    const loading = loadingNotif || loadingLogs;
    const error = errorLogs;

    // Safety fallback: ensure notifications and logs are always arrays
    const activityList = Array.isArray(notifications) ? notifications : [];
    const logList = Array.isArray(logs) ? logs : [];

    const activities = [...activityList, ...logList].sort((a,b) => 
        new Date(b.createdAt || b.timestamp) - new Date(a.createdAt || a.timestamp)
    );

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

    if (loading) return <Loading />;
    if (error) return <Error errMessage={error} />;

    return (
        <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-[20px] leading-[30px] font-black text-headingColor flex items-center gap-2">
                    Professional Activity Hub
                    <span className="text-[14px] font-medium text-violet-700 bg-violet-50 px-3 py-1 rounded-full border border-violet-100">
                        {activities?.length || 0} Neural Logs
                    </span>
                </h2>
            </div>

            {(!activities || activities.length === 0) ? (
                <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                    <p className="text-textColor font-medium">Your professional journey is waiting. Start managing appointments!</p>
                </div>
            ) : (
                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-200 via-gray-100 to-transparent"></div>

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

                                <div className={`p-5 rounded-2xl shadow-sm border w-full transition-all duration-300 hover:shadow-xl ${
                                    item.actionType ? 'bg-indigo-50/30 border-indigo-100 hover:border-indigo-300' : 'bg-white border-gray-100 hover:border-violet-100'
                                }`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-black text-[17px] text-headingColor tracking-tight">
                                            {item.featureName || item.actionType?.replace('_', ' ')}
                                        </h3>
                                        <span className="text-[12px] text-violet-600 font-black uppercase tracking-widest">
                                            {getRelativeTime(item.createdAt || item.timestamp)}
                                        </span>
                                    </div>
                                    <p className="text-textColor text-[14px] font-medium">
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

export default DoctorActivity;
