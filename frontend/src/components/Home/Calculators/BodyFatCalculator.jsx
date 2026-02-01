import { useState } from "react";
import { BsActivity } from "react-icons/bs";

const BodyFatCalculator = () => {
    const [gender, setGender] = useState("male");
    const [waist, setWaist] = useState("");
    const [neck, setNeck] = useState("");
    const [height, setHeight] = useState("");
    const [hip, setHip] = useState("");
    const [result, setResult] = useState(null);

    const calculateBodyFat = () => {
        if (gender === "male" && waist && neck && height) {
            // US Navy Method (Male)
            const fat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
            setResult(fat.toFixed(1));
        } else if (gender === "female" && waist && neck && height && hip) {
            // US Navy Method (Female)
            const fat = 495 / (1.29579 - 0.35004 * Math.log10(Number(waist) + Number(hip) - Number(neck)) + 0.221 * Math.log10(height)) - 450;
            setResult(fat.toFixed(1));
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Gender</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-5 py-3 bg-white/50 border border-teal-100 rounded-2xl focus:ring-4 focus:ring-teal-100 outline-none font-medium appearance-none">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Height (cm)</label>
                    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-5 py-3 bg-white/50 border border-teal-100 rounded-2xl focus:ring-4 focus:ring-teal-100 outline-none font-medium" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Neck (cm)</label>
                    <input type="number" value={neck} onChange={(e) => setNeck(e.target.value)} className="w-full px-5 py-3 bg-white/50 border border-teal-100 rounded-2xl focus:ring-4 focus:ring-teal-100 outline-none font-medium" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Waist (cm)</label>
                    <input type="number" value={waist} onChange={(e) => setWaist(e.target.value)} className="w-full px-5 py-3 bg-white/50 border border-teal-100 rounded-2xl focus:ring-4 focus:ring-teal-100 outline-none font-medium" />
                </div>
                {gender === "female" && (
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Hip (cm)</label>
                        <input type="number" value={hip} onChange={(e) => setHip(e.target.value)} className="w-full px-5 py-3 bg-white/50 border border-teal-100 rounded-2xl focus:ring-4 focus:ring-teal-100 outline-none font-medium" />
                    </div>
                )}
            </div>

            <button onClick={calculateBodyFat} className="w-full py-4 bg-gradient-to-r from-teal-500 to-green-500 text-white font-black rounded-2xl shadow-xl hover:shadow-green-200 active:scale-95 transition-all">
                Estimate Body Fat %
            </button>

            {result && (
                <div className="p-6 bg-teal-50 rounded-[32px] border border-teal-100 flex flex-col items-center justify-center animate-in zoom-in duration-500">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-teal-500 text-3xl shadow-lg mb-4">
                        <BsActivity />
                    </div>
                    <p className="text-gray-500 font-bold uppercase tracking-tighter text-xs">Estimated Body Fat</p>
                    <h3 className="text-4xl font-black text-teal-600">{result} <span className="text-xl">%</span></h3>
                    <p className="mt-2 text-sm text-teal-600/70 font-medium">Standard estimation based on Navy Method.</p>
                </div>
            )}
        </div>
    );
};

export default BodyFatCalculator;
