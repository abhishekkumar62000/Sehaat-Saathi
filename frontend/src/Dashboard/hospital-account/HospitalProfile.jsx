import { useState, useContext, useEffect } from "react";
import { authContext } from "../../context/AuthContext";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";

const HospitalProfile = ({ hospitalData }) => {
    const { token } = useContext(authContext);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        hospitalName: "",
        email: "",
        phone: "",
        district: "",
        location: "",
        specialization: "",
        totalBeds: 0,
        availableBeds: 0,
        bio: "",
        photo: null,
    });

    useEffect(() => {
        setFormData({
            hospitalName: hospitalData?.hospitalName || "",
            email: hospitalData?.email || "",
            phone: hospitalData?.phone || "",
            district: hospitalData?.district || "",
            location: hospitalData?.location || "",
            specialization: hospitalData?.specialization || "",
            totalBeds: hospitalData?.totalBeds || 0,
            availableBeds: hospitalData?.availableBeds || 0,
            bio: hospitalData?.bio || "",
            photo: hospitalData?.photo || null,
        });
    }, [hospitalData]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        const data = await uploadImageToCloudinary(file);
        setFormData({ ...formData, photo: data.url });
    };

    const updateProfileHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${BASE_URL}/hospitals/${hospitalData._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message);

            setLoading(false);
            toast.success("Facility Sync Successful");
            window.location.reload();
        } catch (err) {
            setLoading(false);
            toast.error(err.message);
        }
    };

    return (
        <form onSubmit={updateProfileHandler}>
            <div className="mb-10">
                <h1 className="text-2xl font-black text-headingColor tracking-tight mb-2">
                    Facility Neural Configuration
                </h1>
                <p className="text-slate-400 font-medium uppercase tracking-[0.2em] text-[12px]">
                    Node: {hospitalData?.email}
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                    <label className="block text-[12px] font-black text-indigo-900 uppercase tracking-widest mb-2 ml-1">
                        Hospital Designation
                    </label>
                    <input
                        type="text"
                        name="hospitalName"
                        value={formData.hospitalName}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-[16px] font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-mono"
                    />
                </div>
                <div>
                    <label className="block text-[12px] font-black text-indigo-900 uppercase tracking-widest mb-2 ml-1">
                        Contact Synchronizer (Phone)
                    </label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-[16px] font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-mono"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                    <label className="block text-[12px] font-black text-indigo-900 uppercase tracking-widest mb-2 ml-1">
                        District Sector
                    </label>
                    <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-[16px] font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-mono"
                    />
                </div>
                <div>
                    <label className="block text-[12px] font-black text-indigo-900 uppercase tracking-widest mb-2 ml-1">
                        Total Capacity (Beds)
                    </label>
                    <input
                        type="number"
                        name="totalBeds"
                        value={formData.totalBeds}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-[16px] font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-mono"
                    />
                </div>
                <div>
                    <label className="block text-[12px] font-black text-indigo-900 uppercase tracking-widest mb-2 ml-1">
                        Available Nodes (Beds)
                    </label>
                    <input
                        type="number"
                        name="availableBeds"
                        value={formData.availableBeds}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-[16px] font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-mono"
                    />
                </div>
            </div>

            <div className="mb-10">
                <label className="block text-[12px] font-black text-indigo-900 uppercase tracking-widest mb-2 ml-1">
                    Facility Abstract (Bio)
                </label>
                <textarea
                    name="bio"
                    rows="4"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-[15px] font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all min-h-[120px]"
                ></textarea>
            </div>

            <div className="mb-10 flex items-center gap-6">
                <figure className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center p-2 border border-slate-200 overflow-hidden">
                    <img src={formData.photo} alt="" className="w-full h-full object-contain"  loading="lazy" />
                </figure>
                <div className="relative">
                    <input
                        type="file"
                        onChange={handleFileInputChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <button
                        type="button"
                        className="bg-slate-100 text-slate-600 px-6 py-3 rounded-xl font-black uppercase text-[11px] tracking-widest hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-slate-200"
                    >
                        Update Facility Visual
                    </button>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white font-black py-5 rounded-3xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 text-[15px] uppercase tracking-[0.2em] flex items-center justify-center"
            >
                {loading ? <HashLoader size={25} color="#fff" /> : "Verify & Sync Profile"}
            </button>
        </form>
    );
};

export default HospitalProfile;
