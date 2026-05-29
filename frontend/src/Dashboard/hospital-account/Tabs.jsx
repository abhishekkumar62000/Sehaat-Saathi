import { useContext } from "react";
import { BiLogOut } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Tabs = ({ tab, setTab, hospitalData }) => {
    const { dispatch } = useContext(authContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
    };

    return (
        <div>
            <span className="lg:hidden">
                <select
                    value={tab}
                    onChange={(e) => setTab(e.target.value)}
                    className="w-full bg-white border border-slate-100 rounded-xl p-3 font-bold text-slate-700"
                >
                    <option value="bookings">Hospital Sync</option>
                    <option value="queue">Queue Engine</option>
                    <option value="settings">Facility Settings</option>
                </select>
            </span>

            <div className="hidden lg:flex flex-col p-[30px] bg-white shadow-sm border border-slate-100 rounded-3xl h-max">
                <div className="flex flex-col items-center mb-8">
                    <figure className="w-24 h-24 rounded-3xl bg-indigo-50 flex items-center justify-center p-4 border-2 border-indigo-100 shadow-sm overflow-hidden mb-4">
                        <img src={hospitalData?.photo} alt="" className="w-full h-full object-contain" />
                    </figure>
                    <h3 className="text-[20px] font-black text-headingColor tracking-tight">
                        {hospitalData?.name}
                    </h3>
                    <p className="text-slate-400 text-[14px] font-medium uppercase tracking-widest mt-1">
                        {hospitalData?.district} Node
                    </p>
                </div>

                <button
                    onClick={() => setTab("bookings")}
                    className={`${
                        tab === "bookings"
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                            : "bg-transparent text-slate-600 hover:bg-slate-50"
                    } w-full text-left p-4 rounded-2xl font-black uppercase text-[12px] tracking-widest transition-all mb-3 flex items-center gap-2`}
                >
                    <span className={`w-1.5 h-1.5 rounded-full ${tab === "bookings" ? 'bg-white' : 'bg-indigo-400'}`}></span>
                    Hospital Sync
                </button>

                <button
                    onClick={() => setTab("queue")}
                    className={`${
                        tab === "queue"
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                            : "bg-transparent text-slate-600 hover:bg-slate-50"
                    } w-full text-left p-4 rounded-2xl font-black uppercase text-[12px] tracking-widest transition-all mb-3 flex items-center gap-2`}
                >
                    <span className={`w-1.5 h-1.5 rounded-full ${tab === "queue" ? 'bg-white' : 'bg-indigo-400'}`}></span>
                    Queue Engine
                </button>

                <button
                    onClick={() => setTab("settings")}
                    className={`${
                        tab === "settings"
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                            : "bg-transparent text-slate-600 hover:bg-slate-50"
                    } w-full text-left p-4 rounded-2xl font-black uppercase text-[12px] tracking-widest transition-all mb-8 flex items-center gap-2`}
                >
                    <span className={`w-1.5 h-1.5 rounded-full ${tab === "settings" ? 'bg-white' : 'bg-indigo-400'}`}></span>
                    Facility Settings
                </button>

                <div className="mt-auto">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-slate-900 border border-slate-800 p-4 text-[12px] leading-7 rounded-2xl text-white font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3"
                    >
                        <BiLogOut size={20} /> Logout
                    </button>
                    <p className="text-[10px] text-center text-slate-400 font-medium mt-4 uppercase tracking-[0.2em] opacity-30">
                        Neural Hub v6.0
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Tabs;
