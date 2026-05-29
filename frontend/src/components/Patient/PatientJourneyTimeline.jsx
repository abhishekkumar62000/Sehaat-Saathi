import { BsCheckCircleFill, BsClockHistory, BsActivity, BsPersonCheckFill } from "react-icons/bs";

const PatientJourneyTimeline = ({ journey }) => {
  if (!journey || journey.length === 0) return null;

  const getIcon = (status) => {
    switch (status) {
      case "confirmed": return <BsCheckCircleFill className="text-green-500" />;
      case "PATIENT_ARRIVED": return <BsPersonCheckFill className="text-orange-500" />;
      case "CONSULTATION_STARTED": return <BsActivity className="text-primaryColor animate-pulse" />;
      case "completed": return <BsCheckCircleFill className="text-indigo-600" />;
      default: return <BsClockHistory className="text-slate-400" />;
    }
  };

  return (
    <div className="mt-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
      <h3 className="text-sm font-black text-headingColor uppercase tracking-widest mb-6 flex items-center gap-2">
        <BsActivity className="text-primaryColor" /> Life-Cycle Neural Timeline
      </h3>
      
      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
        {journey.map((item, index) => (
          <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            {/* Dot */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              {getIcon(item.status)}
            </div>
            {/* Content */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
              <div className="flex items-center justify-between space-x-2 mb-1">
                <div className="font-black text-slate-800 uppercase text-[10px] tracking-widest">{item.status.replace("_", " ")}</div>
                <time className="font-mono text-[9px] text-indigo-500 font-bold">{new Date(item.timestamp).toLocaleTimeString()}</time>
              </div>
              <div className="text-slate-500 text-xs italic">"{item.message || 'Status synchronized with medical hub.'}"</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientJourneyTimeline;
