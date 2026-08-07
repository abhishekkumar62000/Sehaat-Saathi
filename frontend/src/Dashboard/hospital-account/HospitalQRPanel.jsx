import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import {
  FaQrcode, FaDownload, FaPrint, FaCopy, FaCheckCircle,
  FaHospital, FaPhone, FaMapMarkerAlt, FaShieldAlt, FaBed, FaUserMd
} from "react-icons/fa";
import { MdOutlineVerified, MdLocalHospital } from "react-icons/md";
import { BsQrCodeScan, BsHospital, BsShieldCheck } from "react-icons/bs";

const HospitalQRPanel = ({ hospitalData }) => {
  const posterRef = useRef(null);
  const [copied, setCopied] = useState(false);

  // Particular Hospital Direct Patient Link
  const hospitalId = hospitalData?._id || "live";
  const publicLink = `${window.location.origin}/hospital-availability?id=${hospitalId}`;

  // Copy Link Handler
  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicLink);
    setCopied(true);
    toast.success("📋 Hospital profile & OPD booking link copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  // Download Poster as PNG
  const downloadPoster = () => {
    const element = posterRef.current;
    if (!element) return;

    toast.info("🎨 Generating high-resolution hospital reception poster flyer...");

    html2canvas(element, {
      useCORS: true,
      scale: 3, // Ultra crisp resolution
      backgroundColor: "#ffffff",
      logging: false,
    }).then((canvas) => {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      const safeName = (hospitalData?.hospitalName || "Hospital").replace(/\s+/g, "-");
      link.download = `Sehaat-Saathi-HospitalQR-${safeName}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("✅ Complete hospital poster flyer downloaded successfully!");
    }).catch((err) => {
      console.error("Poster capture error:", err);
      toast.error("Failed to generate poster flyer image.");
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* Top Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-indigo-950 flex items-center gap-3">
            <BsQrCodeScan className="text-indigo-600 animate-pulse" />
            Hospital Smart acquisition QR Kit
          </h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
            Particular QR Code for {hospitalData?.hospitalName || "Your Hospital"} · Direct patient redirection
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={handleCopyLink}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all border border-indigo-200 shadow-sm active:scale-95">
            <FaCopy /> {copied ? "Copied! ✅" : "Copy Link"}
          </button>
          <button onClick={downloadPoster}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-md active:scale-95">
            <FaDownload /> Download QR Flyer
          </button>
          <button onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-950 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-900 transition-all shadow-sm active:scale-95">
            <FaPrint /> Print Standee
          </button>
        </div>
      </div>

      {/* Main Container: Poster Preview Card */}
      <div className="bg-gray-100 p-6 md:p-10 rounded-3xl border border-gray-200 flex justify-center">

        {/* Printable Poster Standee Container */}
        <div ref={posterRef}
          className="w-full max-w-lg bg-white rounded-3xl p-8 border-4 border-indigo-900 shadow-2xl space-y-6 text-center text-gray-900 relative overflow-hidden">

          {/* Top Decorative Header */}
          <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 -mx-8 -mt-8 p-6 text-white text-center border-b-4 border-indigo-500">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-xl">🏥</span>
              <span className="text-xs font-black uppercase tracking-[0.25em] text-indigo-300">SEHAAT SAATHI PLATFORM</span>
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-white">
              {hospitalData?.hospitalName || "Registered Hospital"}
            </h1>
            <p className="text-xs text-indigo-200 font-bold uppercase tracking-widest mt-1">
              {hospitalData?.tagline || "Multi-Specialty Healthcare Facility"} · {hospitalData?.district || "Bihar"}
            </p>

            {hospitalData?.registrationNumber && (
              <span className="inline-block mt-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-300 border border-white/10">
                Reg No: {hospitalData.registrationNumber}
              </span>
            )}
          </div>

          {/* Instruction Pill */}
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-900 px-4 py-2 rounded-full font-black text-xs uppercase tracking-wider border border-indigo-200">
            <BsQrCodeScan className="text-indigo-600 animate-pulse" />
            SCAN QR FOR INSTANT OPD & LIVE BEDS
          </div>

          {/* QR Code Canvas Frame */}
          <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl border-2 border-indigo-200 inline-block shadow-inner my-2">
            <QRCodeCanvas
              value={publicLink}
              size={220}
              level="H"
              includeMargin={true}
              imageSettings={{
                src: hospitalData?.photo || "https://cdn-icons-png.flaticon.com/512/3304/3304567.png",
                x: undefined,
                y: undefined,
                height: 40,
                width: 40,
                excavate: true,
              }}
            />
          </div>

          {/* Call-To-Action Instructions */}
          <div className="space-y-2 text-left bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <p className="text-xs font-black text-indigo-950 uppercase tracking-wider text-center mb-2">
              📲 What Patients Get When Scanning This QR:
            </p>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-gray-700">
              <span className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-gray-100">
                <FaBed className="text-indigo-600 flex-shrink-0" /> Live Bed Availability
              </span>
              <span className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-gray-100">
                <FaUserMd className="text-purple-600 flex-shrink-0" /> Doctors On Duty Today
              </span>
              <span className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-gray-100">
                <FaCheckCircle className="text-green-600 flex-shrink-0" /> Instant OPD Booking
              </span>
              <span className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-gray-100">
                <FaPhone className="text-blue-600 flex-shrink-0" /> Emergency Hotline
              </span>
            </div>
          </div>

          {/* Footer Contact Info */}
          <div className="pt-3 border-t border-gray-200 text-xs text-gray-500 font-semibold space-y-1">
            <p className="flex items-center justify-center gap-1">
              <FaMapMarkerAlt className="text-red-500" /> {hospitalData?.address || hospitalData?.district}, Bihar
            </p>
            {hospitalData?.contactNumber && (
              <p className="flex items-center justify-center gap-1 text-gray-800 font-black">
                📞 Emergency Hotline: {hospitalData.contactNumber}
              </p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

export default HospitalQRPanel;
