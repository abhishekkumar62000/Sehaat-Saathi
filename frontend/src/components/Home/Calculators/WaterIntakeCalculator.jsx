import { useState } from "react";
import { BsDropletFill } from "react-icons/bs";

const WaterIntakeCalculator = () => {
    const [weight, setWeight] = useState("");
    const [activity, setActivity] = useState("30"); // minutes
    const [result, setResult] = useState(null);

    const calculateWater = () => {
        if (weight) {
            // Basic formula: weight (kg) * 0.033 + (activity_minutes / 30) * 0.35
            const baseWater = weight * 0.033;
            const activityWater = (activity / 30) * 0.35;
            const totalLiters = (baseWater + activityWater).toFixed(1);
            setResult(totalLiters);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Weight (kg)</label>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full px-5 py-3 bg-white/50 border border-teal-100 rounded-2xl focus:ring-4 focus:ring-teal-100 focus:border-[#2eb8a6] transition-all outline-none font-medium"
                        placeholder="e.g. 70"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Daily Activity (min)</label>
                    <input
                        type="number"
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                        className="w-full px-5 py-3 bg-white/50 border border-teal-100 rounded-2xl focus:ring-4 focus:ring-teal-100 focus:border-[#2eb8a6] transition-all outline-none font-medium"
                        placeholder="e.g. 30"
                    />
                </div>
            </div>

            <button
                onClick={calculateWater}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-black rounded-2xl shadow-xl hover:shadow-blue-200 hover:-translate-y-1 active:scale-95 transition-all"
            >
                Calculate Water Needs
            </button>

            {result && (
                <div className="p-6 bg-blue-50 rounded-[32px] border border-blue-100 flex flex-col items-center justify-center animate-in zoom-in duration-500">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-500 text-3xl shadow-lg mb-4 animate-bounce">
                        <BsDropletFill />
                    </div>
                    <p className="text-gray-500 font-bold uppercase tracking-tighter text-xs">Your Daily Goal</p>
                    <h3 className="text-4xl font-black text-blue-600">{result} <span className="text-xl">Liters</span></h3>
                    <p className="mt-2 text-sm text-blue-400 font-medium">Approx. {Math.round(result * 4)} glasses of 250ml</p>
                </div>
            )}
        </div>
    );
};

export default WaterIntakeCalculator;
