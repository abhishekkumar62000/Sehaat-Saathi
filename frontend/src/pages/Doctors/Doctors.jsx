import { useEffect, useState } from "react";
import Error from "../../components/Shared/Error";
import Loader from "../../components/Shared/Loading";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import DoctorCard from "./DoctorCard";
import MetaHead from "../../components/SEO/MetaHead";
import SEOKeywordIsland from "../../components/SEO/SEOKeywordIsland";
import DoctorBookingSEOIsland from "../../components/SEO/DoctorBookingSEOIsland";

const Doctors = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [maxFee, setMaxFee] = useState("");
  const [minExperience, setMinExperience] = useState("");
  
  const [debounceParams, setDebounceParams] = useState({ query: "", location: "", maxFee: "", minExperience: "" });

  const handleSearch = () => {
    // Immediate search when clicking button
    setDebounceParams({ query: query.trim(), location: location.trim(), maxFee, minExperience });
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounceParams({ query: query.trim(), location: location.trim(), maxFee, minExperience });
    }, 700);

    return () => clearTimeout(timeOut);
  }, [query, location, maxFee, minExperience]);

  const {
    data: doctors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors?query=${debounceParams.query}&location=${debounceParams.location}&maxFee=${debounceParams.maxFee}&minExp=${debounceParams.minExperience}`);

  return (
    <section className="container mb-10">
      <MetaHead
        title="Sehaat Saathi Doctor Booking App | Find & Book Specialist Doctors Bihar & India"
        description="Sehaat Saathi doctor booking App (Sehat Sathi) — Search and book top verified specialist doctors, cardiologists, gynecologists, pediatricians, and surgeons in Madhubani, Darbhanga, Patna & all Bihar. Helpline: +91 6200087830."
        keywords="Sehaat Saathi doctor booking App, sehat sathi doctor booking App, Sehaat Saathi Offline Doctor Booking app, sehatt sehaathi offline doctor Booking, sehaat saathi doctor bboing app, sehaat saathi bihar doctor booking app, sehat sathi madhubani darbhanga doctor booking app, Sehaat Saathi Doctor Booking, Sehat Sathi Doctor Consultation, Online Doctor Bihar, Doctor Booking App India"
        canonicalUrl="https://sehaatsaathi.com/doctors"
      />
      <SEOKeywordIsland />
      <DoctorBookingSEOIsland />
      <div className="mt-3">
        <div className="container text-center">
          <h2 className="heading">Search a Doctor</h2>

          <div className="max-w-[800px] mt-[10px] mx-auto bg-[#0066ff2c] rounded-md flex flex-col md:flex-row items-center justify-between overflow-hidden relative z-10 shadow-sm border border-indigo-100">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-white/50 md:bg-transparent w-full focus:outline-none placeholder:text-textColor border-b md:border-b-0 md:border-r border-slate-200 text-sm font-bold"
              placeholder="Doctor's Name / Specialty"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-white/50 md:bg-transparent w-full focus:outline-none placeholder:text-textColor border-b md:border-b-0 md:border-r border-slate-200 text-sm font-bold"
              placeholder="Location (City/State)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <div className="flex items-center w-full bg-white/50 md:bg-transparent px-3 py-2 md:py-0">
               <span className="text-[12px] font-bold text-slate-400 mr-2 uppercase tracking-widest whitespace-nowrap">Max Fee</span>
               <input
                type="number"
                className="py-2 px-2 bg-transparent w-full focus:outline-none placeholder:text-textColor text-sm font-black text-indigo-600"
                placeholder="₹1000"
                value={maxFee}
                onChange={(e) => setMaxFee(e.target.value)}
              />
            </div>
            <div className="flex items-center w-full bg-white/50 md:bg-transparent px-3 py-2 md:py-0 border-b md:border-b-0 md:border-r border-slate-200">
               <span className="text-[12px] font-bold text-slate-400 mr-2 uppercase tracking-widest whitespace-nowrap">Min Exp.</span>
               <input
                type="number"
                className="py-2 px-2 bg-transparent w-[80px] focus:outline-none placeholder:text-textColor text-sm font-black text-indigo-600"
                placeholder="5 Yrs"
                value={minExperience}
                onChange={(e) => setMinExperience(e.target.value)}
              />
            </div>
            
            <button
              onClick={handleSearch}
              className="py-[18px] px-[40px] text-white font-[600] bg-indigo-600 hover:bg-green-600 rounded-none w-full md:w-auto uppercase tracking-widest text-xs transition-all shadow-md shadow-indigo-200"
            >
              Scan
            </button>
          </div>
        </div>
      </div>
      <div className="my-7">
        {loading && <Loader />}
        {error && <Error />}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {doctors.map((doctor) => (
              <DoctorCard doctor={doctor} key={doctor?._id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Doctors;
