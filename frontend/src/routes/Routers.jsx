import { Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboard/doctor-account/Dashboard";
import MyAccount from "../Dashboard/user-account/MyAccount";
import AboutUs from "../pages/AboutUs";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import Contact from "../pages/Contact";
import DoctorDetails from "../pages/Doctors/DoctorDetails";
import Doctors from "../pages/Doctors/Doctors";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Services from "../pages/Services";
import ProtectedRoutes from "./ProtectedRoutes";

import ArticlesPage from "../pages/ArticlesPage";
import DoctorAI from "../pages/DoctorAI";
import ExpressTrack from "../pages/ExpressTrack";
import Smarthub from "../pages/Smarthub";
import SymptomChecker from "../pages/SymptomChecker";
import MedicineSuggestion from "../pages/MedicineSuggestion";
import EmergencyProtocols from "../pages/EmergencyProtocols";
import FollowUpHub from "../pages/FollowUpHub";
import HealthRecommendations from "../pages/HealthRecommendations";
import SkinDiagnosisAI from "../pages/SkinDiagnosisAI";
import PharmacyHub from "../pages/PharmacyHub";
import TeleConsultAI from "../pages/TeleConsultAI";
import NeuralBoard from "../pages/NeuralBoard";
import BloodBank from "../pages/BloodBank";
import HealthTwin from "../pages/HealthTwin";
import EmergencyHealthID from "../pages/EmergencyHealthID";
import HospitalAvailability from "../pages/HospitalAvailability";
import ReportInterpreter from "../pages/ReportInterpreter";
import MedicineFinder from "../pages/MedicineFinder";
import AmbulanceDispatch from "../pages/AmbulanceDispatch";
import WomenCare from "../pages/WomenCare";
import CaregiverPanic from "../pages/CaregiverPanic";

const Routers = () => {
  return (
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

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
