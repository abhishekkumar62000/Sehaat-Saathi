import { useState } from "react";
import { BsPersonCheck } from "react-icons/bs";

const IdealWeightCalculator = () => {
    const [height, setHeight] = useState("");
    const [gender, setGender] = useState("male");
    const [result, setResult] = useState(null);

    const calculateIdealWeight = () => {
        if (height) {
            // Devine Formula
            // Male: 50.0 + 2.3 kg per inch over 5 feet
            // Female: 45.5 + 2.3 kg per inch over 5 feet
            const heightInInches = height / 2.54;
            const inchesOverFiveFeet = Math.max(0, heightInInches - 60);

            let baseWeight = gender === "male" ? 50.0 : 45.5;
            const idealWeight = (baseWeight + 2.3 * inchesOverFiveFeet).toFixed(1);
            setResult(idealWeight);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Height (cm)</label>
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="w-full px-5 py-3 bg-white/50 border border-teal-100 rounded-2xl focus:ring-4 focus:ring-teal-100 focus:border-[#2eb8a6] transition-all outline-none font-medium"
                        placeholder="e.g. 175"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Gender</label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full px-5 py-3 bg-white/50 border border-teal-100 rounded-2xl focus:ring-4 focus:ring-teal-100 focus:border-[#2eb8a6] transition-all outline-none font-medium appearance-none"
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
            </div>

            <button
                onClick={calculateIdealWeight}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black rounded-2xl shadow-xl hover:shadow-orange-200 hover:-translate-y-1 active:scale-95 transition-all"
            >
                Find Ideal Weight
            </button>

            {result && (
                <div className="p-6 bg-amber-50 rounded-[32px] border border-amber-100 flex flex-col items-center justify-center animate-in zoom-in duration-500">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-amber-500 text-3xl shadow-lg mb-4">
                        <BsPersonCheck />
                    </div>
                    <p className="text-gray-500 font-bold uppercase tracking-tighter text-xs">Your Healthiest Range</p>
                    <h3 className="text-4xl font-black text-amber-600">{result} <span className="text-xl">kg</span></h3>
                    <p className="mt-2 text-sm text-amber-600/70 font-medium text-center px-4">Based on the Devine Formula for optimal health.</p>
                </div>
            )}
        </div>
    );
};

export default IdealWeightCalculator;
