import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

// Critical / core routes loaded eagerly for fast initial paint
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

// Lazy loaded routes for code splitting and instant performance boost
const Smarthub = lazy(() => import("../pages/Smarthub"));
const DoctorAI = lazy(() => import("../pages/DoctorAI"));
const SymptomChecker = lazy(() => import("../pages/SymptomChecker"));
const PharmacyHub = lazy(() => import("../pages/PharmacyHub"));
const TeleConsultAI = lazy(() => import("../pages/TeleConsultAI"));
const OfflineConsultationHub = lazy(() => import("../pages/OfflineConsultationHub"));
const ExpressTrack = lazy(() => import("../pages/ExpressTrack"));
const MedicineSuggestion = lazy(() => import("../pages/MedicineSuggestion"));
const EmergencyProtocols = lazy(() => import("../pages/EmergencyProtocols"));
const FollowUpHub = lazy(() => import("../pages/FollowUpHub"));
const HealthRecommendations = lazy(() => import("../pages/HealthRecommendations"));
const SkinDiagnosisAI = lazy(() => import("../pages/SkinDiagnosisAI"));
const NeuralBoard = lazy(() => import("../pages/NeuralBoard"));
const BloodBank = lazy(() => import("../pages/BloodBank"));
const HealthTwin = lazy(() => import("../pages/HealthTwin"));
const EmergencyHealthID = lazy(() => import("../pages/EmergencyHealthID"));
const HospitalAvailability = lazy(() => import("../pages/HospitalAvailability"));
const ReportInterpreter = lazy(() => import("../pages/ReportInterpreter"));
const MedicineFinder = lazy(() => import("../pages/MedicineFinder"));
const AmbulanceDispatch = lazy(() => import("../pages/AmbulanceDispatch"));
const WomenCare = lazy(() => import("../pages/WomenCare"));
const CaregiverPanic = lazy(() => import("../pages/CaregiverPanic"));
const HomeopathyHub = lazy(() => import("../pages/HomeopathyHub"));
const AyurvedaHub = lazy(() => import("../pages/AyurvedaHub"));
const NaturopathyHub = lazy(() => import("../pages/NaturopathyHub"));
const NutritionHub = lazy(() => import("../pages/NutritionHub"));
const OnlineVideoBooking = lazy(() => import("../pages/OnlineVideoBooking"));
const MedicinePriceCompare = lazy(() => import("../pages/MedicinePriceCompare"));
const PainNavigator3D = lazy(() => import("../pages/PainNavigator3D"));
const HealthCopilot = lazy(() => import("../pages/HealthCopilot"));
const Services = lazy(() => import("../pages/Services"));
const CheckoutSuccess = lazy(() => import("../pages/CheckoutSuccess"));
const Contact = lazy(() => import("../pages/Contact"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const ArticlesPage = lazy(() => import("../pages/ArticlesPage"));
const Doctors = lazy(() => import("../pages/Doctors/Doctors"));
const DoctorDetails = lazy(() => import("../pages/Doctors/DoctorDetails"));

const Dashboard = lazy(() => import("../Dashboard/doctor-account/Dashboard"));
const MyAccount = lazy(() => import("../Dashboard/user-account/MyAccount"));
const HospitalDashboard = lazy(() => import("../Dashboard/hospital-account/HospitalDashboard"));
const AdminDashboard = lazy(() => import("../Dashboard/admin-account/AdminDashboard"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Routers = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/smarthub" element={<Smarthub />} />
        <Route path="/express-track" element={<ExpressTrack />} />
        <Route path="/doctor-ai" element={<DoctorAI />} />
        <Route path="/symptom-checker" element={<SymptomChecker />} />
        <Route path="/medicine-suggestion" element={<MedicineSuggestion />} />
        <Route path="/emergency-protocols" element={<EmergencyProtocols />} />
        <Route path="/follow-up-hub" element={<FollowUpHub />} />
        <Route path="/personalized-health" element={<HealthRecommendations />} />
        <Route path="/skin-diagnosis" element={<SkinDiagnosisAI />} />
        <Route path="/pharmacy-hub" element={<PharmacyHub />} />
        <Route path="/tele-consult" element={<TeleConsultAI />} />
        <Route path="/neural-board" element={<NeuralBoard />} />
        <Route path="/blood-bank" element={<BloodBank />} />
        <Route path="/health-twin" element={<HealthTwin />} />
        <Route path="/emergency-health-id" element={<EmergencyHealthID />} />
        <Route path="/hospital-availability" element={<HospitalAvailability />} />
        <Route path="/report-interpreter" element={<ReportInterpreter />} />
        <Route path="/medicine-finder" element={<MedicineFinder />} />
        <Route path="/ambulance-dispatch" element={<AmbulanceDispatch />} />
        <Route path="/women-care" element={<WomenCare />} />
        <Route path="/caregiver-panic" element={<CaregiverPanic />} />
        <Route path="/homeopathy-hub" element={<HomeopathyHub />} />
        <Route path="/ayurveda-hub" element={<AyurvedaHub />} />
        <Route path="/naturopathy-hub" element={<NaturopathyHub />} />
        <Route path="/nutrition-hub" element={<NutritionHub />} />
        <Route path="/offline-consultation" element={<OfflineConsultationHub />} />
        <Route path="/online-video-booking" element={<OnlineVideoBooking />} />
        <Route path="/medicine-price-compare" element={<MedicinePriceCompare />} />
        <Route path="/pain-navigator" element={<PainNavigator3D />} />
        <Route path="/health-copilot" element={<HealthCopilot />} />
        <Route path="/services" element={<Services />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorDetails />} />
        <Route
          path="/users/profile/me"
          element={
            <ProtectedRoutes allowedRoles={["patient"]}>
              <MyAccount />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/doctors/profile/me"
          element={
            <ProtectedRoutes allowedRoles={["doctor"]}>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/hospitals/profile/me"
          element={
            <ProtectedRoutes allowedRoles={["hospital"]}>
              <HospitalDashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/profile/me"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoutes>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
