import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import starIcon from "../../assets/images/icons/Star.png";
import DoctorAbout from "../../components/DoctorDetails/DoctorAbout";
import Feedback from "../../components/DoctorDetails/Feedback";
import SidePanel from "../../components/DoctorDetails/SidePanel";
import Error from "../../components/Shared/Error";
import Loading from "../../components/Shared/Loading";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import { useSocket } from "../../context/SocketContext";

const DoctorDetails = () => {
  const [tab, setTab] = useState("about");

  const { id } = useParams();
  const { socket } = useSocket();

  const {
    data: doctor,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors/${id}`);

  // Live reviews state — starts from fetched data, updated in real-time
  const [liveReviews, setLiveReviews] = useState(null);
  const [liveTotal, setLiveTotal] = useState(null);
  const [liveAvg, setLiveAvg] = useState(null);

  // Seed live state once doctor data arrives
  useEffect(() => {
    if (doctor?.reviews) {
      setLiveReviews(doctor.reviews);
      setLiveTotal(doctor.totalRating);
      setLiveAvg(doctor.averageRating);
    }
  }, [doctor]);

  // Real-time: listen for new reviews from any patient
  useEffect(() => {
    if (!socket || !id) return;

    const handleNewReview = (newReview) => {
      setLiveReviews(prev => {
        if (!prev) return [newReview];
        if (prev.find(r => r._id === newReview._id)) return prev;
        const updated = [newReview, ...prev];
        const newAvg = updated.reduce((sum, r) => sum + r.rating, 0) / updated.length;
        setLiveAvg(parseFloat(newAvg.toFixed(1)));
        setLiveTotal(updated.length);
        return updated;
      });
    };

    // The backend emits NEW_REVIEW_{doctorId}
    socket.on(`NEW_REVIEW_${id}`, handleNewReview);
    return () => socket.off(`NEW_REVIEW_${id}`, handleNewReview);
  }, [socket, id]);

  const {
    name,
    bio,
    specialization,
    ticketPrice,
    qualifications,
    experiences,
    timeSlots,
    about,
    photo,
  } = doctor;

  const displayReviews = liveReviews ?? doctor?.reviews ?? [];
  const displayTotal   = liveTotal   ?? doctor?.totalRating ?? 0;
  const displayAvg     = liveAvg     ?? doctor?.averageRating ?? 0;

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto my-5">
        {loading && <Loading />}
        {error && <Error />}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
              <div className="flex items-center gap-5">
                <figure className="max-w-[200px] max-h-[200px]">
                  <img src={photo} alt="" className="w-full" loading="lazy" />
                </figure>
                <div className="">
                  {/* ================ */}
                  <h3 className="font-bold text-[22px] text-headingColor">
                    {name}
                  </h3>
                  <p className="text-textColor font-semibold text-[12px] lg:text-[14px]">
                    {specialization}
                  </p>
                  {/* ================ */}

                  <div className="flex items-center gap-[6px]">
                    <span className="flex items-center gap-[6px] text-[14px] lg:text-[16px] leading-5 lg:leading-7 font-semibold text-headingColor">
                      <img src={starIcon} alt="" loading="lazy" /> {displayAvg}
                    </span>
                    <span className="text-[14px] lg:text-[16px] leading-5 lg:leading-7 font-[400] text-headingColor">
                      ({displayTotal})
                    </span>
                  </div>
                  <p className="text_para text-[14px] md:text-[15px] leading-6 lg:max-w-[390px]">
                    {bio}
                  </p>
                </div>
              </div>

              <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                <button
                  onClick={() => setTab("about")}
                  className={`${tab === "about" &&
                    "border-b border-solid border-primaryColor"
                    } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  About
                </button>
                <button
                  onClick={() => setTab("feedback")}
                  className={`${tab === "feedback" &&
                    "border-b border-solid border-primaryColor"
                    } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  Feedback
                  {liveTotal > (doctor?.totalRating ?? 0) && (
                    <span className="ml-1.5 bg-green-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full animate-pulse">
                      LIVE
                    </span>
                  )}
                </button>
              </div>

              <div className="mt-[50px]">
                {tab === "about" && (
                  <DoctorAbout
                    name={name}
                    about={about}
                    qualifications={qualifications}
                    experiences={experiences}
                  />
                )}
                {tab === "feedback" && (
                  <Feedback reviews={displayReviews} totalRating={displayTotal} />
                )}
              </div>
            </div>

            <div>
              <SidePanel
                doctorId={doctor._id}
                ticketPrice={ticketPrice}
                availability={doctor.availability}
                unavailabilityDates={doctor.unavailabilityDates}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorDetails;
