import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { BsDownload } from "react-icons/bs";
import websiteQrImg from "../../assets/images/Sehaat Saathi Website QR.png";
import { toast } from "react-toastify";

const PromotionalQRKit = () => {
  const posterRef = useRef(null);

  const downloadFlyer = () => {
    const posterElement = posterRef.current;
    if (!posterElement) return;

    toast.info("Generating high-resolution promotional flyer...");

    html2canvas(posterElement, {
      scale: 2.5,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false
    }).then((canvas) => {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = "Sehaat-Saathi-Promotion-Flyer.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("✅ Promotional flyer downloaded successfully!");
    }).catch(err => {
      console.error("Capture failed", err);
      toast.error("Failed to generate flyer image.");
    });
  };

  return (
    <div className="mt-12 border-t border-slate-100 pt-8">
      <div className="bg-gradient-to-br from-indigo-50 via-white to-emerald-50 rounded-3xl p-6 border border-indigo-100/50 shadow-sm flex flex-col lg:flex-row items-center gap-8 text-slate-800">
        
        {/* Left Side Info */}
        <div className="flex-grow space-y-4 text-center lg:text-left">
          <span className="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full inline-block">
            📢 Grow Our Network
          </span>
          <h3 className="text-xl font-black text-slate-900 leading-tight">
            Share Sehaat Saathi with Friends & Patients
          </h3>
          <p className="text-sm text-slate-500 font-medium max-w-md">
            Help doctors and patients discover digital booking. Download and print this official QR code flyer to display at your clinic, hospital lobby, or share on social media!
          </p>
          <button
            onClick={downloadFlyer}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-1.5 mx-auto lg:mx-0"
          >
            <BsDownload /> Download Promo Flyer
          </button>
        </div>

        {/* Right Side Flyer Card to download */}
        <div className="flex-shrink-0 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
          <div ref={posterRef} className="w-[280px] bg-white border-4 border-indigo-600 rounded-[2rem] p-6 text-center flex flex-col items-center gap-4 relative overflow-hidden">
            {/* Accent border banner */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 via-white to-green-500"></div>
            
            <div className="space-y-0.5">
              <span className="text-[8px] font-black uppercase text-indigo-600 tracking-[0.25em] bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
                Website QR CODE
              </span>
              <h4 className="text-lg font-black text-slate-900 mt-1.5 tracking-tight">SEHAAT SAATHI</h4>
              <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">Digital OPD Booking Facility</p>
            </div>

            {/* QR Image */}
            <div className="p-3 bg-slate-50 border-2 border-dashed border-indigo-200 rounded-2xl flex items-center justify-center">
              <img src={websiteQrImg} alt="Sehaat Saathi Website QR" className="w-[140px] h-[140px] object-contain" />
            </div>

            <div className="space-y-1">
              <div className="text-[9px] font-black text-slate-800 tracking-wider uppercase">📲 SCAN TO VISIT WEBSITE</div>
              <p className="text-[7px] font-semibold text-slate-400 max-w-[200px] leading-normal mx-auto">
                Scan with your mobile camera to book consultations, schedule slots, and skip queues.
              </p>
            </div>
            
            <div className="border-t border-slate-100 pt-2 w-full">
              <p className="text-[6px] font-bold text-slate-400 uppercase tracking-wider">
                POWERED BY SEHAAT SAATHI HEALTHCARE NETWORK
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PromotionalQRKit;
