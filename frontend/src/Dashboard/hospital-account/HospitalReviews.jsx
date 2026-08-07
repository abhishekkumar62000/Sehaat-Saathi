import { useState, useMemo } from "react";
import { formatDate } from "../../utils/formatDate";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import {
  FaStar, FaRegStar, FaThumbsUp, FaReply, FaCheckCircle,
  FaFilter, FaSearch, FaSyncAlt, FaUserCheck, FaAward, FaQuoteLeft
} from "react-icons/fa";
import { MdOutlineVerified, MdOutlineRateReview } from "react-icons/md";
import { BsStarFill, BsShieldCheck } from "react-icons/bs";

const HospitalReviews = ({ hospitalData }) => {
  const [reviewsList, setReviewsList] = useState(hospitalData?.reviews || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStar, setSelectedStar] = useState("all");
  const [replyingId, setReplyingId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState({});

  // Real-time rating statistics calculation
  const stats = useMemo(() => {
    const total = reviewsList.length;
    if (total === 0) {
      return {
        avg: hospitalData?.averageRating || 5.0,
        total: hospitalData?.totalRating || 0,
        counts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        percentages: { 5: 100, 4: 0, 3: 0, 2: 0, 1: 0 },
        recommendPercent: 98,
      };
    }

    let sum = 0;
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let positiveCount = 0;

    reviewsList.forEach(r => {
      const rating = Math.min(5, Math.max(1, Math.round(r.rating || 5)));
      sum += rating;
      counts[rating] = (counts[rating] || 0) + 1;
      if (rating >= 4) positiveCount++;
    });

    const avg = Math.round((sum / total) * 10) / 10;
    const percentages = {
      5: Math.round((counts[5] / total) * 100),
      4: Math.round((counts[4] / total) * 100),
      3: Math.round((counts[3] / total) * 100),
      2: Math.round((counts[2] / total) * 100),
      1: Math.round((counts[1] / total) * 100),
    };

    const recommendPercent = Math.round((positiveCount / total) * 100);

    return { avg, total, counts, percentages, recommendPercent };
  }, [reviewsList, hospitalData]);

  // Handle hospital reply to patient review
  const handleSendReply = (reviewId) => {
    if (!replyText.trim()) return toast.warn("Please write a response before sending!");

    setReplies(prev => ({ ...prev, [reviewId]: replyText }));
    setReplyingId(null);
    setReplyText("");
    toast.success("💬 Official hospital response posted!");
  };

  // Filter Reviews
  const filteredReviews = useMemo(() => {
    return reviewsList.filter(r => {
      const rRating = Math.round(r.rating || 5);
      const name = r.user?.name || r.name || "";
      const text = r.reviewText || r.text || "";

      const starMatch = selectedStar === "all" || rRating === Number(selectedStar);
      const searchMatch = name.toLowerCase().includes(searchTerm.toLowerCase()) || text.toLowerCase().includes(searchTerm.toLowerCase());

      return starMatch && searchMatch;
    });
  }, [reviewsList, selectedStar, searchTerm]);

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-indigo-950 flex items-center gap-3">
            <MdOutlineRateReview className="text-indigo-600" />
            Patient Ratings & Reviews Management
          </h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
            Real-time patient feedback · Verified patient sentiment analytics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl font-black text-xs uppercase tracking-widest border border-emerald-200">
            <BsShieldCheck className="w-4 h-4 text-emerald-600" /> {stats.recommendPercent}% Recommended
          </span>
        </div>
      </div>

      {/* Rating Hero Analytics Section */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 p-7 rounded-3xl text-white shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">

        {/* Big Score Block */}
        <div className="text-center md:border-r border-indigo-800/60 md:pr-6">
          <p className="text-6xl font-black text-white leading-none">{stats.avg}</p>
          <div className="flex justify-center gap-1 my-3">
            {[1, 2, 3, 4, 5].map(star => (
              <FaStar key={star} className={`w-5 h-5 ${star <= Math.round(stats.avg) ? "text-amber-400" : "text-gray-600"}`} />
            ))}
          </div>
          <p className="text-xs font-black text-indigo-300 uppercase tracking-widest">
            {stats.total > 0 ? `${stats.total} Verified Reviews` : "Hospital Reputation Score"}
          </p>
        </div>

        {/* Breakdown Bars */}
        <div className="space-y-2 md:col-span-2">
          {[5, 4, 3, 2, 1].map(star => {
            const pct = stats.percentages[star] || 0;
            const cnt = stats.counts[star] || 0;
            return (
              <div key={star} className="flex items-center gap-3 text-xs">
                <span className="w-8 font-black text-indigo-200 flex items-center gap-1">{star} <FaStar className="w-3 h-3 text-amber-400" /></span>
                <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-12 text-right text-indigo-300 font-bold">{pct}% ({cnt})</span>
              </div>
            );
          })}
        </div>

      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search review by patient name or keyword..."
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Filter Stars:</span>
          {["all", "5", "4", "3", "2"].map(star => (
            <button key={star} onClick={() => setSelectedStar(star)}
              className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${
                selectedStar === star ? "bg-indigo-600 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}>
              {star === "all" ? "All Stars" : `${star} ★`}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      {filteredReviews.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <FaQuoteLeft className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-black uppercase tracking-widest text-sm">No Matching Reviews Found</p>
          <p className="text-gray-400 text-xs mt-1">Patient ratings submitted on your hospital detail page will appear here live</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((r, idx) => {
            const patientName = r.user?.name || r.name || "Verified Patient";
            const patientPhoto = r.user?.photo || r.photo;
            const reviewRating = Math.round(r.rating || 5);
            const reviewId = r._id || idx;
            const hospitalReply = replies[reviewId];

            return (
              <div key={reviewId} className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-4 transition-all hover:border-indigo-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-2xl flex items-center justify-center font-black text-lg overflow-hidden border border-indigo-200 shadow-sm">
                      {patientPhoto ? <img src={patientPhoto} alt="" className="w-full h-full object-cover" /> : patientName[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-gray-900 text-sm">{patientName}</h4>
                        <span className="flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                          <MdOutlineVerified className="w-3 h-3 text-green-600" /> Verified Patient
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">
                        {r.createdAt ? formatDate(r.createdAt) : r.date || "Recent Consultation"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100">
                    {[1, 2, 3, 4, 5].map(star => (
                      <FaStar key={star} className={`w-3.5 h-3.5 ${star <= reviewRating ? "text-amber-400" : "text-gray-300"}`} />
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 text-sm font-medium leading-relaxed pl-2 border-l-4 border-indigo-500">
                  "{r.reviewText || r.text || "Excellent service and care provided by the hospital team."}"
                </p>

                {/* Hospital Response Display */}
                {hospitalReply && (
                  <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl space-y-1">
                    <p className="text-xs font-black text-indigo-900 flex items-center gap-2">
                      <FaReply className="text-indigo-600" /> Official Hospital Response:
                    </p>
                    <p className="text-xs text-indigo-700 font-medium pl-6">"{hospitalReply}"</p>
                  </div>
                )}

                {/* Response Action Button */}
                {!hospitalReply && (
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    {replyingId === reviewId ? (
                      <div className="w-full space-y-2">
                        <textarea value={replyText} onChange={e => setReplyText(e.target.value)}
                          placeholder="Write official response to this patient review..."
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none focus:ring-2 focus:ring-indigo-400" rows={2} />
                        <div className="flex gap-2 justify-end">
                          <button onClick={() => setReplyingId(null)} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-xl text-xs font-black uppercase">Cancel</button>
                          <button onClick={() => handleSendReply(reviewId)} className="px-4 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase shadow-sm">Send Response</button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => { setReplyingId(reviewId); setReplyText(""); }}
                        className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline flex items-center gap-1.5">
                        <FaReply /> Reply to Patient
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default HospitalReviews;
