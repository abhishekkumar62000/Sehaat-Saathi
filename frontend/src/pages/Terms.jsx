import React, { useState } from "react";
import { Link } from "react-router-dom";
import MetaHead from "../components/SEO/MetaHead";
import { 
  FaShieldAlt, 
  FaFileContract, 
  FaUserMd, 
  FaAmbulance, 
  FaCreditCard, 
  FaExclamationTriangle, 
  FaHandshake, 
  FaLock, 
  FaBalanceScale,
  FaArrowRight,
  FaCheckCircle,
  FaPhoneAlt,
  FaEnvelope,
  FaPrint
} from "react-icons/fa";
import { RiRobot2Line, RiHospitalLine } from "react-icons/ri";

const sections = [
  { id: "acceptance", title: "1. Acceptance of Terms & Eligibility" },
  { id: "emergency-disclaimer", title: "2. Emergency Medical Care Disclaimer (108/102)" },
  { id: "telemedicine", title: "3. Scope of Telemedicine & Digital Healthcare" },
  { id: "ai-disclaimer", title: "4. AI Doctor, Symptom Checker & Clinical Assistant" },
  { id: "user-accounts", title: "5. User Account Security & Patient Responsibilities" },
  { id: "doctor-consult", title: "6. Doctor Consultations, Bookings & Prescription Policy" },
  { id: "payments-refunds", title: "7. Fees, Payment Gateway & Refund Protocol" },
  { id: "emergency-services", title: "8. Emergency Services: Ambulance Dispatch & Blood Bank" },
  { id: "intellectual-property", title: "9. Intellectual Property Rights & Content Ownership" },
  { id: "prohibited-conduct", title: "10. Prohibited Conduct & Account Suspension" },
  { id: "liability-limitation", title: "11. Limitation of Liability & Indemnification" },
  { id: "governing-law", title: "12. Governing Law, Dispute Resolution & Grievance Redressal" }
];

const Terms = () => {
  const [activeSection, setActiveSection] = useState("acceptance");
  const [searchTerm, setSearchTerm] = useState("");

  const scrollTo = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <MetaHead 
        title="Terms & Conditions | Sehaat Saathi App Healthcare Platform"
        description="Read the official Terms of Service and Medical Consultation Agreement for Sehaat Saathi App. Learn about telemedicine compliance, user rights, refund policies, and emergency protocols."
        keywords="Sehaat Saathi App Terms, Terms and Conditions, Telemedicine Agreement, Sehaat Saathi App Legal, Patient Rights India, Telemedicine Practice Guidelines 2020"
        canonicalUrl="https://sehaatsaathi.com/terms"
      />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white py-16 md:py-20 overflow-hidden border-b-4 border-orange-500">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF9933_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs md:text-sm font-bold uppercase tracking-wider mb-6">
              <FaFileContract className="text-orange-400" />
              <span>Legal Agreement & User Terms</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Terms & Conditions
            </h1>
            <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Please read these terms carefully before accessing or using the services provided by <span className="text-orange-400 font-semibold">Sehaat Saathi App</span> Healthcare Platform.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm text-slate-400">
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <FaShieldAlt className="text-emerald-400" /> Compliant with Telemedicine Guidelines 2020
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <FaLock className="text-cyan-400" /> IT Act 2000 & SPDI Rules
              </span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                Last Updated: October 2026
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Critical Medical Alert Bar */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white py-3 px-4 shadow-md">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs md:text-sm font-semibold">
          <div className="flex items-center gap-2">
            <FaExclamationTriangle className="text-yellow-300 text-lg animate-pulse shrink-0" />
            <span>
              <strong>EMERGENCY NOTICE:</strong> Sehaat Saathi App is designed for non-emergency consultations. In medical emergencies, immediately dial <strong>108 / 102 / 112</strong> or proceed to the nearest hospital.
            </span>
          </div>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-xs transition border border-white/30 shrink-0"
          >
            <FaPrint /> Print Terms
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sticky Sidebar Navigation */}
          <aside className="lg:col-span-4 sticky top-28 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center justify-between">
              <span>Table of Contents</span>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">12 Sections</span>
            </h2>

            {/* Filter Search */}
            <input 
              type="text" 
              placeholder="Search terms or clauses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg mb-4 focus:outline-none focus:border-orange-500"
            />

            <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
              {sections
                .filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    className={`w-full text-left text-xs md:text-sm px-3 py-2 rounded-lg transition-all flex items-center justify-between group ${
                      activeSection === section.id 
                        ? "bg-orange-50 text-orange-600 font-bold border-l-4 border-orange-500" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
                    }`}
                  >
                    <span className="truncate">{section.title}</span>
                    <FaArrowRight className={`text-xs transition-transform group-hover:translate-x-1 ${
                      activeSection === section.id ? "text-orange-500 opacity-100" : "opacity-0"
                    }`} />
                  </button>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Need Help?</h3>
              <p className="text-xs text-slate-600 mb-3">Our legal and grievance team is here to assist you.</p>
              <div className="space-y-1.5 text-xs text-slate-700">
                <a href="mailto:support@sehaatsaathi.com" className="flex items-center gap-2 text-slate-700 hover:text-orange-600 transition">
                  <FaEnvelope className="text-orange-500" /> support@sehaatsaathi.com
                </a>
                <a href="tel:+916200087830" className="flex items-center gap-2 text-slate-700 hover:text-orange-600 transition">
                  <FaPhoneAlt className="text-emerald-500" /> +91 6200087830
                </a>
              </div>
            </div>
          </aside>

          {/* Legal Text Sections */}
          <main className="lg:col-span-8 bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-slate-200 text-slate-700 space-y-12">
            
            {/* Section 1 */}
            <section id="acceptance" className="scroll-mt-32 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">01</div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">Acceptance of Terms & Eligibility</h2>
              </div>
              <p className="text-sm md:text-base leading-relaxed">
                By downloading, registering, browsing, or accessing the <strong>Sehaat Saathi App</strong> website (sehaatsaathi.com), mobile application, or associated microservices, you agree to comply with and be strictly bound by these Terms and Conditions and our Privacy Policy.
              </p>
              <p className="text-sm md:text-base leading-relaxed">
                These terms constitute a legally binding electronic agreement between you ("User", "Patient", "Caregiver", or "Healthcare Provider") and <strong>Sehaat Saathi App Healthcare Platform</strong> ("Platform", "We", "Us", or "Our"), compliant with the Information Technology Act, 2000 and applicable intermediary guidelines.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-emerald-500 text-xs md:text-sm space-y-2">
                <p className="font-semibold text-slate-800">Age & Capacity Requirements:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>You must be at least 18 years of age to establish a primary patient account or book medical appointments.</li>
                  <li>Minor patients (under 18 years) may only utilize teleconsultation services under the supervision of a parent or legal guardian.</li>
                  <li>You confirm that you possess the full legal right, capacity, and authority to enter into this agreement.</li>
                </ul>
              </div>
            </section>

            {/* Section 2 */}
            <section id="emergency-disclaimer" className="scroll-mt-32 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">02</div>
                <h2 className="text-xl md:text-2xl font-bold text-red-600">Emergency Medical Care Disclaimer</h2>
              </div>
              <div className="p-5 rounded-2xl bg-red-50 border border-red-200 text-red-950 space-y-3">
                <p className="font-bold text-sm md:text-base flex items-center gap-2">
                  <FaExclamationTriangle className="text-red-600" />
                  DO NOT USE THIS PLATFORM FOR ACUTE EMERGENCIES
                </p>
                <p className="text-xs md:text-sm leading-relaxed">
                  Sehaat Saathi App is NOT an alternative to in-person emergency hospital care. In life-threatening emergencies, every second counts.
                </p>
                <div className="bg-white p-3 rounded-xl border border-red-200 text-xs text-red-800">
                  <p>DO NOT rely on Sehaat Saathi App messaging, chat, or video consultations if you experience:</p>
                  <ul className="list-disc list-inside mt-1 grid grid-cols-1 sm:grid-cols-2 gap-1 font-medium">
                    <li>Severe chest pain or suspected heart attack</li>
                    <li>Sudden paralysis, facial drooping, or stroke symptoms</li>
                    <li>Severe breathing difficulty or anaphylaxis</li>
                    <li>Heavy uncontrolled bleeding or major physical trauma</li>
                    <li>Loss of consciousness, seizures, or acute poisoning</li>
                    <li>Active suicidal thoughts or acute psychiatric crisis</li>
                  </ul>
                </div>
                <p className="text-xs font-semibold text-red-700">
                  Call <strong>108</strong> (National Ambulance Service), <strong>102</strong> (Janani Shishu Suraksha), or <strong>112</strong> (National Emergency Helpline) immediately.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section id="telemedicine" className="scroll-mt-32 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold text-sm">03</div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">Scope of Telemedicine & Digital Healthcare</h2>
              </div>
              <p className="text-sm md:text-base leading-relaxed">
                Sehaat Saathi App operates in strict accordance with the <strong>Telemedicine Practice Guidelines (2020)</strong> issued by the Medical Council of India / National Medical Commission (NMC) under the Ministry of Health and Family Welfare (MoHFW), Government of India.
              </p>
              <div className="space-y-3 text-xs md:text-sm">
                <p><strong>Independent Practitioners:</strong> Doctors practicing via Sehaat Saathi App are independent Registered Medical Practitioners (RMPs). The platform serves solely as an intermediary technology aggregator enabling audio, video, text communication, and electronic health record management.</p>
                <p><strong>Limitations of Tele-Consultation:</strong> You acknowledge that online consultations cannot completely substitute in-person physical clinical examinations, auscultation, palpation, or specialized laboratory tests.</p>
                <p><strong>Informed Consent:</strong> By initiating a tele-consultation session on Sehaat Saathi App, you give express consent to participate in a remote clinical evaluation.</p>
              </div>
            </section>

            {/* Section 4 */}
            <section id="ai-disclaimer" className="scroll-mt-32 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">04</div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">AI Doctor, Symptom Checker & Clinical Assistant</h2>
              </div>
              <p className="text-sm md:text-base leading-relaxed">
                Sehaat Saathi App provides automated health assistants, including the <strong>Sehaat AI Doctor v6.0</strong>, Symptom Checker, Skin Diagnosis AI, Report Interpreter, and Neural Board modules.
              </p>
              <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl text-xs md:text-sm text-purple-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-purple-900">
                  <RiRobot2Line className="text-lg" />
                  <span>Educational & Preliminary Triage Only</span>
                </div>
                <p className="leading-relaxed">
                  All diagnostic suggestions, health triage scores, and risk ratings generated by artificial intelligence algorithms are strictly informational. They do NOT constitute definitive medical advice, verified clinical diagnosis, or a valid medical prescription under Indian law.
                </p>
                <p className="font-semibold text-purple-800">
                  Always consult a certified medical practitioner before initiating, altering, or stopping any medication, treatment regimen, or diet based on AI recommendations.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section id="user-accounts" className="scroll-mt-32 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">05</div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">User Account Security & Patient Responsibilities</h2>
              </div>
              <p className="text-sm md:text-base leading-relaxed">
                When you create an account on Sehaat Saathi App, you are responsible for maintaining the confidentiality of your credentials, password, and OTP tokens.
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs md:text-sm text-slate-600">
                <li><strong>Accurate Information:</strong> You agree to provide truthful, accurate, and complete information regarding your medical history, allergies, current medications, and vitals.</li>
                <li><strong>Account Ownership:</strong> You may not share your account or impersonate any other person. Each patient profile must accurately reflect the person receiving treatment.</li>
                <li><strong>Unauthorized Access:</strong> You agree to notify us immediately at <code>support@sehaatsaathi.com</code> if you suspect unauthorized access or security breaches.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="doctor-consult" className="scroll-mt-32 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">06</div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">Doctor Consultations, Bookings & Prescription Policy</h2>
              </div>
              <p className="text-sm md:text-base leading-relaxed">
                Sehaat Saathi App enables online video consultations, in-clinic physical appointments, and instant digital OPD token passes.
              </p>
              <div className="space-y-3 text-xs md:text-sm text-slate-600">
                <p><strong>Digital Prescriptions:</strong> Doctors may issue digital prescriptions complying with Schedule O of Telemedicine Practice Guidelines. Controlled substances (Schedule X drugs, narcotics, psychotropics) CANNOT be prescribed via telemedicine.</p>
                <p><strong>Doctor Autonomy:</strong> Registered Medical Practitioners retain full professional independence to decide whether telemedicine is appropriate for your condition or whether an in-person physical consultation is mandatory.</p>
                <p><strong>OPD Token Passes:</strong> OPD token passes indicate an estimated queue position and time slot. Actual hospital wait times may vary depending on emergency admissions and surgeon schedules.</p>
              </div>
            </section>

            {/* Section 7 */}
            <section id="payments-refunds" className="scroll-mt-32 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">07</div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">Fees, Payment Gateway & Refund Protocol</h2>
              </div>
              <p className="text-sm md:text-base leading-relaxed">
                Consultation fees, booking charges, and ambulance facilitation costs are clearly displayed prior to transaction confirmation.
              </p>
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs md:text-sm text-amber-950 space-y-2">
                <p><strong>Payment Processing:</strong> All electronic payments are processed through RBI-authorized payment aggregators (including Razorpay and Stripe) using 256-bit SSL encryption. We do not store your complete card or banking credentials.</p>
                <p><strong>Refund Eligibility:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  <li>Full 100% refund will be issued if a doctor cancels an appointment or fails to join within 15 minutes of scheduled time.</li>
                  <li>Cancellations by patients made at least 2 hours prior to scheduled appointment time will be eligible for a refund, minus nominal gateway handling fees.</li>
                  <li>No refunds will be granted for completed consultations or patient no-shows.</li>
                </ul>
              </div>
            </section>

            {/* Section 8 */}
            <section id="emergency-services" className="scroll-mt-32 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-sm">08</div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">Emergency Services: Ambulance Dispatch & Blood Bank</h2>
              </div>
              <p className="text-sm md:text-base leading-relaxed">
                Sehaat Saathi App acts as a real-time digital communication bridge connecting verified ambulance operators, hospital blood banks, and donors across Bihar and India.
              </p>
              <div className="space-y-2 text-xs md:text-sm text-slate-600">
                <p><strong>Third-Party Fleets:</strong> Ambulance dispatch coordinates independent third-party emergency vehicle providers and hospital fleets. While we verify licensing, vehicle road conditions and response delays due to traffic or weather are beyond our direct control.</p>
                <p><strong>Voluntary Blood Donation:</strong> Our blood bank network connects voluntary donors and licensed state blood storage units. Sehaat Saathi App does not sell blood or blood products, strictly adhering to the National Blood Policy of India.</p>
              </div>
            </section>

            {/* Section 9 */}
            <section id="intellectual-property" className="scroll-mt-32 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">09</div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">Intellectual Property Rights & Content Ownership</h2>
              </div>
              <p className="text-sm md:text-base leading-relaxed">
                All platform trademarks, logos ("Sehaat Saathi App"), user interface designs, AI software code, and health articles are the exclusive intellectual property of Sehaat Saathi App Healthcare Platform and its founder Abhishek Kumar.
              </p>
              <p className="text-xs md:text-sm text-slate-600">
                You are granted a limited, revocable, non-transferable license to access the platform for personal, non-commercial health services. Scraping, reverse-engineering, or unauthorized reproduction of platform components is strictly prohibited.
              </p>
            </section>

            {/* Section 10 */}
            <section id="prohibited-conduct" className="scroll-mt-32 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">10</div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">Prohibited Conduct & Account Suspension</h2>
              </div>
              <p className="text-sm md:text-base leading-relaxed">
                Users agree NOT to engage in abusive behavior towards medical practitioners, upload malicious code, falsify identities, or misuse emergency dispatch lines. Violations will result in immediate termination of account privileges and civil or criminal reporting under the Information Technology Act, 2000.
              </p>
            </section>

            {/* Section 11 */}
            <section id="liability-limitation" className="scroll-mt-32 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-sm">11</div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">Limitation of Liability & Indemnification</h2>
              </div>
              <p className="text-sm md:text-base leading-relaxed">
                Sehaat Saathi App provides an intermediary digital technology platform. Healthcare decisions, medical diagnoses, and clinical prescriptions are the sole professional responsibility of the treating Registered Medical Practitioner.
              </p>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                To the maximum extent permitted by applicable Indian Law, Sehaat Saathi App shall not be liable for any indirect, incidental, punitive, or consequential damages resulting from technical interruptions, telecom failures, or clinical misjudgments by independent practitioners.
              </p>
            </section>

            {/* Section 12 */}
            <section id="governing-law" className="scroll-mt-32 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm">12</div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">Governing Law, Dispute Resolution & Grievance Redressal</h2>
              </div>
              <p className="text-sm md:text-base leading-relaxed">
                These Terms shall be interpreted and governed in accordance with the Laws of India. Any disputes arising from or in connection with platform services shall be subject to the exclusive jurisdiction of the competent courts in <strong>Madhubani, Bihar, India</strong>.
              </p>
              
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs md:text-sm space-y-2 mt-4">
                <h3 className="font-bold text-slate-900 text-sm">Grievance Redressal Mechanism (IT Rules 2021)</h3>
                <p>If you have questions, concerns, or legal notices regarding these Terms, contact our appointed officer:</p>
                <div className="space-y-1 text-slate-700 font-medium">
                  <p><strong>Nodal Grievance Officer:</strong> Legal Officer, Sehaat Saathi App Healthcare</p>
                  <p><strong>Headquarters:</strong> Bara Bazar, Madhubani, Bihar - 847211, India</p>
                  <p><strong>Founder & Technical Lead:</strong> Abhishek Kumar (AI/ML Engineer)</p>
                  <p><strong>Helpline:</strong> +91 6200087830 / +91 9470074183</p>
                  <p><strong>Email:</strong> support@sehaatsaathi.com</p>
                </div>
              </div>
            </section>

            {/* Bottom Actions */}
            <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link 
                to="/privacy"
                className="text-xs md:text-sm font-bold text-orange-600 hover:text-orange-700 flex items-center gap-2 group"
              >
                <span>Read our Privacy Policy & Data Protection</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/home"
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs md:text-sm font-bold px-6 py-2.5 rounded-xl transition shadow"
              >
                Return to Home
              </Link>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
};

export default Terms;
