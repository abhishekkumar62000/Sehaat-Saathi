import { useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Routers from "../routes/Routers";
import FloatingAIWidget from "../components/FloatingAIWidget";
import FloatingWhatsAppWidget from "../components/FloatingWhatsAppWidget";

const Layout = () => {
  const location = useLocation();

  // List of paths that should hide the global Site Header and Footer
  const hubRoutes = [
    "/medicine-suggestion",
    "/tele-consult",
    "/symptom-checker",
    "/doctor-ai",
    "/express-track",
    "/emergency-protocols",
    "/blood-bank",
    "/ayurveda-hub",
    "/homeopathy-hub",
    "/naturopathy-hub",
    "/nutrition-hub",
    "/pharmacy-hub",
    "/report-interpreter",
    "/ambulance-dispatch",
    "/women-care",
    "/caregiver-panic",
    "/medicine-finder",
    "/health-twin",
    "/skin-diagnosis",
    "/follow-up-hub",
    "/personalized-health",
    "/neural-board",
    "/offline-consultation",
    "/medicine-price-compare",
    "/pain-navigator",
    "/health-copilot",
    "/emergency-health-id",
    "/hospital-availability"
  ];
  const isHub = hubRoutes.includes(location.pathname);

  return (
    <>
      <Header isCompact={isHub} />
      <main>
        <Routers />
      </main>
      <FloatingAIWidget />
      <FloatingWhatsAppWidget />
      {!isHub && <Footer />}
    </>
  );
};

export default Layout;
