import { toast } from "react-toastify";
import { BASE_URL, token } from "../../config";
import LiveAvailabilityTimetable from "./LiveAvailabilityTimetable";

/* eslint-disable react/prop-types */
const SidePanel = ({ doctorId, ticketPrice, availability, unavailabilityDates }) => {

  const bookingHandler = async () => {
    try {
      const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message + " Please login first.");
      }

      if (data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text_para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          {ticketPrice} BDT
        </span>
      </div>
      <div className="my-[30px]">
        <LiveAvailabilityTimetable 
            doctorId={doctorId}
            initialAvailability={availability}
            initialHolidays={unavailabilityDates}
        />
      </div>
      <button onClick={bookingHandler} className="customBtn w-full">
        Book Appointment
      </button>
    </div>
  );
};

export default SidePanel;
