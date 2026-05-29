import { useState, useContext } from "react";
import { authContext } from "../../context/AuthContext";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Loading from "../../components/Shared/Loading";
import Error from "../../components/Shared/Error";
import Tabs from "./Tabs";
import HospitalProfile from "./HospitalProfile";
import HospitalAppointments from "./HospitalAppointments";
import HospitalQueueDashboard from "./HospitalQueueDashboard";

const HospitalDashboard = () => {
    const { token } = useContext(authContext);
    const {
        data: hospitalData,
        loading,
        error,
    } = useGetProfile(`${BASE_URL}/hospitals/profile/me`);

    const [tab, setTab] = useState("bookings");

    return (
        <section className="bg-[#f8f9ff] min-h-screen">
            <div className="max-w-[1170px] px-5 mx-auto py-10">
                {loading && !error && <Loading />}
                {error && !loading && <Error errMessage={error} />}

                {!loading && !error && (
                    <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
                        <Tabs tab={tab} setTab={setTab} hospitalData={hospitalData} />

                        <div className="lg:col-span-2">
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                                {tab === "bookings" && (
                                    <HospitalAppointments bookings={hospitalData.bookings} />
                                )}
                                {tab === "queue" && (
                                    <HospitalQueueDashboard hospitalId={hospitalData._id} />
                                )}
                                {tab === "settings" && (
                                    <HospitalProfile hospitalData={hospitalData} />
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default HospitalDashboard;
