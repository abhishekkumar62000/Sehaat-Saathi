import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { QRCodeSVG } from 'qrcode.react';
import { BsCheckCircleFill, BsPrinter, BsDownload, BsXCircleFill } from 'react-icons/bs';

const BookingPass = ({ passDetails, onClose }) => {
    const passRef = useRef(null);

    const handleDownload = async () => {
        if (!passRef.current) return;
        try {
            const canvas = await html2canvas(passRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
            const data = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = data;
            link.download = `Sehaat_Saathi_Pass_${passDetails.tokenNumber}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error generating image:", error);
        }
    };

    const handlePrint = async () => {
        if (!passRef.current) return;
        try {
            // Temporarily disable the scrollbar and max-height for printing the full pass
            const originalMaxHeight = passRef.current.style.maxHeight;
            const originalOverflowY = passRef.current.style.overflowY;
            passRef.current.style.maxHeight = 'none';
            passRef.current.style.overflowY = 'visible';
            
            const canvas = await html2canvas(passRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
            const dataUrl = canvas.toDataURL('image/png');
            
            // Restore original styles
            passRef.current.style.maxHeight = originalMaxHeight;
            passRef.current.style.overflowY = originalOverflowY;

            const windowContent = '<!DOCTYPE html><html><head><title>Print Pass</title></head><body style="margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh;"><img src="' + dataUrl + '" style="max-width: 100%; max-height: 100vh;"></body></html>';
            const printWin = window.open('', '', 'width=800,height=900');
            if (printWin) {
                printWin.document.open();
                printWin.document.write(windowContent);
                printWin.document.close();
                printWin.focus();
                setTimeout(() => {
                    printWin.print();
                    printWin.close();
                }, 500);
            }
        } catch (error) {
            console.error("Error generating print:", error);
        }
    };

    if (!passDetails) return null;

    return (
        <div className="fixed inset-0 z-[140] flex items-center justify-center p-4">
            <div onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"></div>
            
            <div ref={passRef} className="relative w-full max-w-md bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] animate-in zoom-in-95 duration-500 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all ease-out cursor-default group max-h-[95vh] overflow-y-auto custom-scrollbar">
                
                {/* Holographic authentic seal */}
                <div className="absolute top-4 left-4 z-30 w-10 h-10 rounded-full border-2 border-dashed border-white/50 flex items-center justify-center -rotate-12 opacity-80 group-hover:animate-spin-slow bg-gradient-to-tr from-yellow-300 via-yellow-100 to-yellow-500 shadow-lg shadow-yellow-500/20">
                    <span className="text-[5px] font-black uppercase text-yellow-800 text-center leading-tight">100%<br/>Verified</span>
                </div>

                {/* Header Pattern */}
                <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-green-500 p-6 text-center relative overflow-hidden">
                    {/* Animated Shine/Glare on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-12 z-20 pointer-events-none"></div>

                    {/* Watermark in header */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 flex items-center justify-center pointer-events-none">
                        <span className="text-white font-black text-5xl transform -rotate-12 whitespace-nowrap tracking-tighter">SEHAAT SAATHI</span>
                    </div>

                    <button onClick={onClose} className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-md transition-all z-40">
                        <BsXCircleFill className="text-lg drop-shadow-md" />
                    </button>
                    <BsCheckCircleFill className="text-3xl text-white mx-auto mb-2 relative z-10 drop-shadow-lg scale-110" />
                    
                    <div className="relative z-10">
                        <h1 className="text-2xl font-black uppercase tracking-tighter text-white drop-shadow-md border-b-2 border-white/20 inline-block pb-1">SEHAAT SAATHI</h1>
                        <p className="text-[9px] font-black text-white uppercase tracking-[0.3em] mt-1 drop-shadow">Official Medical Boarding Pass</p>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    {/* Background Watermark for body */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
                        <h1 className="text-6xl font-black transform -rotate-45 text-slate-900 tracking-tighter">SEHAAT</h1>
                    </div>

                    <div className="flex justify-center -mt-12 mb-2 relative z-10">
                        <div className="p-2 bg-white rounded-2xl shadow-xl border-4 border-slate-50 relative group-hover:shadow-2xl transition-shadow duration-500 overflow-hidden">
                            <QRCodeSVG value={passDetails.qrCode || `SS-DEMO-${passDetails.tokenNumber}`} size={100} fgColor="#0f172a" />
                            {/* Scanning line animation */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.5)] animate-bounce relative z-20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>

                    <div className="text-center relative z-10">
                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.3em]">Gate / Token</p>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter drop-shadow-sm">{passDetails.tokenNumber}</h3>
                    </div>

                    {/* Highly Realistic Perforated Tear Line */}
                    <div className="relative flex items-center py-2 z-10 -mx-6 px-6">
                        <div className="absolute -left-3 w-6 h-6 bg-slate-900/60 rounded-full backdrop-blur-md shadow-inner border border-white/10"></div>
                        <div className="w-full border-t-[3px] border-dashed border-slate-300"></div>
                        <div className="absolute -right-3 w-6 h-6 bg-slate-900/60 rounded-full backdrop-blur-md shadow-inner border border-white/10"></div>
                    </div>

                    <div className="space-y-3 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-slate-50/90 backdrop-blur-sm p-5 rounded-2xl border border-slate-200 relative z-10 shadow-inner">
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                            <span className="text-xs font-bold text-slate-500 uppercase">Patient</span>
                            <span className="text-xs font-black text-slate-900 uppercase text-right max-w-[150px] truncate" title={passDetails.patientName || "Self / User"}>
                                {passDetails.patientName || "Self / User"}
                            </span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                            <span className="text-xs font-bold text-slate-500 uppercase">Doctor</span>
                            <span className="text-xs font-black text-slate-900 uppercase">{passDetails.doctorName}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                            <span className="text-xs font-bold text-slate-500 uppercase">Hospital</span>
                            <span className="text-xs font-black text-slate-900 uppercase">{passDetails.hospital}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                            <span className="text-xs font-bold text-slate-500 uppercase">Date & Time</span>
                            <span className="text-xs font-black text-orange-600 uppercase">{passDetails.date} | {passDetails.timeSlot}</span>
                        </div>
                        <div className="flex justify-between pt-1">
                            <span className="text-xs font-bold text-slate-500 uppercase">Payment</span>
                            <span className={`text-xs font-black ${passDetails.isPaid ? 'text-green-600' : 'text-slate-900'} uppercase`}>
                                {passDetails.paymentMethod}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-2 relative z-10">
                        <a 
                            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(passDetails.hospital + ' ' + (passDetails.district || 'Bihar'))}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 py-3 bg-orange-50 text-orange-600 border border-orange-200 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all text-center flex items-center justify-center drop-shadow-sm"
                        >
                            📍 Navigate
                        </a>
                        <button onClick={handlePrint} className="flex-1 py-3 border border-slate-200 rounded-xl font-black text-[9px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-1 drop-shadow-sm">
                            <BsPrinter /> Print
                        </button>
                        <button onClick={handleDownload} className="flex-[1.2] py-3 bg-slate-900 text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-xl shadow-slate-900/20 active:scale-95 flex items-center justify-center gap-1">
                            <BsDownload /> Save
                        </button>
                    </div>
                    
                    {/* Brand Footer */}
                    <div className="text-center pb-1 relative z-10">
                        <p className="text-[8px] font-bold text-slate-400 tracking-widest uppercase">
                            Verify this pass at 
                            <span className="text-green-600 ml-1 font-black">sehaatsaathi.com</span>
                        </p>
                    </div>
                    {/* Barcode Element for Realism */}
                    <div className="flex justify-center items-center gap-1 mt-4 opacity-40 mix-blend-multiply flex-wrap w-full overflow-hidden h-8">
                        {Array.from({ length: 40 }).map((_, i) => (
                            <div key={i} className={`h-full bg-slate-900 ${i % 3 === 0 ? 'w-2' : i % 5 === 0 ? 'w-[1px]' : 'w-1'}`}></div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Tailwind Shimmer animation for realistic glare */}
            <style jsx>{`
                @keyframes shimmer {
                    100% {
                        transform: translateX(200%);
                    }
                }
            `}</style>
        </div>
    );
};

export default BookingPass;
