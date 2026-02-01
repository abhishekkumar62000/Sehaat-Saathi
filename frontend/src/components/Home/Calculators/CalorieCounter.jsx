import { useState } from "react";
import { BsFire } from "react-icons/bs";

const CalorieCounter = () => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("1.2");
  const [calories, setCalories] = useState(null);

  const calculateCalories = () => {
    if (age && weight && height) {
      let bmr;
      if (gender === "male") {
        bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
      } else {
        bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
      }
      const totalCalories = Math.round(bmr * parseFloat(activityLevel));
      setCalories(totalCalories);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Age</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full px-4 py-3 bg-white/50 border border-teal-50 rounded-xl focus:ring-2 focus:ring-teal-100 outline-none transition-all font-semibold" placeholder="25" />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full px-4 py-3 bg-white/50 border border-teal-50 rounded-xl focus:ring-2 focus:ring-teal-100 outline-none transition-all font-semibold" placeholder="70" />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Height (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-4 py-3 bg-white/50 border border-teal-50 rounded-xl focus:ring-2 focus:ring-teal-100 outline-none transition-all font-semibold" placeholder="175" />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-4 py-3 bg-white/50 border border-teal-50 rounded-xl focus:ring-2 focus:ring-teal-100 outline-none transition-all font-semibold appearance-none">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Activity Level</label>
        <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} className="w-full px-4 py-3 bg-white/50 border border-teal-50 rounded-xl focus:ring-2 focus:ring-teal-100 outline-none transition-all font-semibold appearance-none">
          <option value="1.2">Sedentary (No Exercise)</option>
          <option value="1.375">Lightly Active (1-3 days/week)</option>
          <option value="1.55">Moderately Active (3-5 days/week)</option>
          <option value="1.725">Very Active (6-7 days/week)</option>
          <option value="1.9">Super Active (Physical Job)</option>
        </select>
      </div>

      <button onClick={calculateCalories} className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black rounded-2xl shadow-xl hover:shadow-orange-100 hover:-translate-y-1 transition-all">
        Calculate Calories
      </button>

      {calories && (
        <div className="p-8 bg-orange-50 rounded-[40px] border border-orange-100 flex flex-col items-center justify-center animate-in slide-in-from-top-4 duration-500">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-orange-500 text-3xl shadow-lg mb-4">
            <BsFire />
          </div>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs font-black">Daily Maintenance Needs</p>
          <h3 className="text-5xl font-black text-orange-600">{calories} <span className="text-xl">kcal</span></h3>
          <div className="mt-4 grid grid-cols-2 gap-4 w-full">
            <div className="p-3 bg-white/80 rounded-2xl text-center border border-orange-50 italic">
              <span className="block text-[10px] font-black uppercase text-gray-400">Lose Weight</span>
              <span className="text-sm font-bold text-orange-600">{calories - 500} kcal</span>
            </div>
            <div className="p-3 bg-white/80 rounded-2xl text-center border border-orange-50 italic">
              <span className="block text-[10px] font-black uppercase text-gray-400">Gain Muscle</span>
              <span className="text-sm font-bold text-orange-600">{calories + 300} kcal</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalorieCounter;
