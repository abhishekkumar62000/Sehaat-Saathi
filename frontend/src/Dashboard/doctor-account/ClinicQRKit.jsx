import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { BsPrinterFill, BsDownload, BsBadgeAd, BsQrCodeScan } from "react-icons/bs";
import { toast } from "react-toastify";

const ClinicQRKit = ({ doctorData }) => {
  const qrRef = useRef(null);
  
  // Direct scan routing link
  const qrValue = `${window.location.origin}/doctor-profile-qr/${doctorData?._id || doctorData?.id}`;

  const downloadQR = () => {
    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `Sehaat-Saathi-QR-${doctorData.name.replace(/\s+/g, "-")}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR Code image downloaded successfully!");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <BsQrCodeScan className="text-indigo-600 animate-pulse" /> Clinic QR Smart Acquisition Kit
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Download or print your clinic poster. Patients scan it to join the live queue instantly.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={downloadQR}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5"
          >
            <BsDownload /> Download QR
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-indigo-100 flex items-center gap-1.5"
          >
            <BsPrinterFill /> Print Poster
          </button>
        </div>
      </div>

      {/* Grid Poster View & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Poster Mockup Sheet */}
        <div className="lg:col-span-2 flex justify-center bg-slate-50 p-6 rounded-3xl border border-slate-100 print:bg-white print:border-none print:p-0">
          <div className="w-full max-w-md bg-white border-8 border-indigo-600 rounded-[3rem] p-8 text-center flex flex-col items-center justify-between gap-6 shadow-xl relative overflow-hidden print:border-indigo-600 print:shadow-none print:rounded-[2rem]">
            {/* Design accents */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-white to-green-500"></div>
            
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-indigo-600 tracking-[0.3em] bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                Skip the Queue
              </span>
              <h1 className="text-3xl font-black text-slate-900 mt-2 tracking-tight">SEHAAT SAATHI</h1>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Digital OPD Booking Facility</p>
            </div>

            {/* Doctor Info Box */}
            <div className="bg-slate-50 border border-slate-100 w-full p-4 rounded-2xl flex items-center gap-4 text-left">
              <img src={doctorData?.photo} alt={doctorData?.name} className="w-14 h-14 rounded-xl object-cover border border-slate-200" />
              <div className="min-w-0">
                <div className="text-sm font-black text-slate-800 truncate">{doctorData?.name}</div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{doctorData?.specialization}</div>
                <div className="text-[9px] font-bold text-indigo-500 uppercase tracking-wider">{doctorData?.hospitalName || "Private Clinic"}</div>
              </div>
            </div>

            {/* QR Wrapper */}
            <div ref={qrRef} className="p-4 bg-slate-50 border-4 border-dashed border-indigo-200 rounded-3xl flex items-center justify-center shadow-inner">
              <QRCodeCanvas
                value={qrValue}
                size={180}
                bgColor={"#f8fafc"}
                fgColor={"#4f46e5"}
                level={"H"}
                includeMargin={true}
              />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-black text-slate-800 flex items-center justify-center gap-1.5">
                📲 SCAN TO BOOK INSTANTLY
              </h3>
              <p className="text-[10px] text-slate-500 font-bold leading-relaxed max-w-xs mx-auto">
                Scan the QR code with your mobile camera to view live queue sizes, schedule slots, and skip walk-in waiting.
              </p>
            </div>

            <div className="text-[8px] font-black uppercase text-slate-400 border-t border-slate-100 pt-3 w-full tracking-widest">
              Powered by Sehaat Saathi Healthcare Network
            </div>
          </div>
        </div>

        {/* Instructions Guide */}
        <div className="space-y-4">
          <div className="p-5 bg-indigo-50/50 border border-indigo-100 rounded-2xl space-y-3">
            <h3 className="font-black text-indigo-950 text-xs uppercase tracking-wider">How Clinic QR Works</h3>
            <ul className="text-xs text-indigo-900 font-medium space-y-2.5 list-disc pl-4">
              <li>Pasting this flyer at your **Reception desk** or **Cabin door** encourages walks-ins to register digitially.</li>
              <li>Saves manual receptionist logging and reduces crowd accumulation.</li>
              <li>Updates token queues in **real-time** on patients' screens as you serve.</li>
            </ul>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
            <h3 className="font-black text-slate-800 text-xs uppercase tracking-wider">Custom Link Info</h3>
            <div className="text-xs text-slate-600 font-semibold truncate bg-white p-2.5 border border-slate-200 rounded-lg select-all" title="Click to select all">
              {qrValue}
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Use this link for online promotions, WhatsApp business messages, or SMS broadcasts.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicQRKit;
