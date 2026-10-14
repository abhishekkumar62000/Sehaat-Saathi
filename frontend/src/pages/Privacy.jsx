import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUserShield,
  FaDatabase,
  FaLock,
  FaHeartbeat,
  FaUserCheck,
  FaShareAlt,
  FaTrashAlt,
  FaChild,
  FaHeadset,
  FaPrint,
  FaArrowLeft,
  FaCheckCircle,
  FaRegClock,
  FaShieldVirus,
} from "react-icons/fa";
import { RiFilePaperFill, RiGovernmentFill } from "react-icons/ri";
import MetaHead from "../components/SEO/MetaHead";

const Privacy = () => {
  const [activeSection, setActiveSection] = useState("commitment");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: "commitment", title: "1. Privacy Commitment & Framework", icon: FaUserShield },
    { id: "data-collected", title: "2. Information We Collect", icon: FaDatabase },
    { id: "how-we-use", title: "3. How We Use Patient Data", icon: FaHeartbeat },
    { id: "doctor-patient", title: "4. Doctor-Patient Confidentiality", icon: FaUserCheck },
    { id: "ai-privacy", title: "5. AI Clinical Copilot & Data Privacy", icon: FaLock },
    { id: "third-party", title: "6. Data Sharing & Third Parties", icon: FaShareAlt },
    { id: "security", title: "7. Encryption & Security Architecture", icon: FaShieldVirus },
    { id: "patient-rights", title: "8. Your Data Rights & Consent", icon: RiFilePaperFill },
    { id: "retention", title: "9. Data Retention & Deletion", icon: FaTrashAlt },
    { id: "children", title: "10. Children & Minor Privacy", icon: FaChild },
    { id: "dpdp-compliance", title: "11. DPDP Act 2023 & Compliance", icon: RiGovernmentFill },
    { id: "grievance", title: "12. Data Protection Officer (DPO)", icon: FaHeadset },
  ];

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-800 pb-20">
      <MetaHead
        title="Privacy Policy | Sehaat Saathi App Healthcare Platform"
        description="Learn how Sehaat Saathi App protects your Electronic Health Records (EHR), sensitive medical data, and personal privacy in compliance with India's DPDP Act 2023 and SPDI Rules."
        keywords="Sehaat Saathi App Privacy Policy, Patient Data Security, Health Data Protection India, DPDP Act 2023 Healthcare, Medical Record Confidentiality"
        canonicalUrl="https://sehaatsaathi.com/privacy"
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white pt-28 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF9933]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#138808]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="flex items-center gap-3 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Link to="/" className="hover:text-white flex items-center gap-1.5 transition-colors">
              <FaArrowLeft className="text-xs" /> Back to Home
            </Link>
            <span>/</span>
            <span>Trust & Privacy</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                Privacy Policy & Health Data Protection
              </h1>
              <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                At <strong className="text-[#FF9933]">Sehaat</strong> <strong className="text-[#138808]">Saathi</strong>, protecting your sensitive medical records and personal health information is our highest sacred priority.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <FaRegClock className="text-emerald-400" /> Last Updated: October 2026
                </span>
                <span>•</span>
                <span className="text-emerald-300 font-semibold">DPDP Act 2023 & SPDI Rules Compliant</span>
                <span>•</span>
                <span>Bank-Grade 256-Bit Encryption</span>
              </div>
            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all shrink-0 self-start md:self-auto"
            >
              <FaPrint /> Print / Save PDF
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 pt-10">
        
        {/* Core Privacy Promise Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-sm flex items-start gap-3">
            <FaLock className="text-emerald-700 text-2xl shrink-0 mt-0.5" />
            <div>
              <h3 className="font-black text-slate-900 text-sm">Zero Data Selling</h3>
              <p className="text-xs text-slate-600 mt-1">We NEVER sell or monetize your sensitive medical history or personal records to commercial advertisers.</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-teal-50 border border-teal-200 shadow-sm flex items-start gap-3">
            <FaShieldVirus className="text-teal-700 text-2xl shrink-0 mt-0.5" />
            <div>
              <h3 className="font-black text-slate-900 text-sm">Doctor-Patient Privacy</h3>
              <p className="text-xs text-slate-600 mt-1">Your video consults, test reports, and prescriptions are restricted strictly to you and your treating doctor.</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 shadow-sm flex items-start gap-3">
            <RiGovernmentFill className="text-blue-700 text-2xl shrink-0 mt-0.5" />
            <div>
              <h3 className="font-black text-slate-900 text-sm">DPDP Act 2023 Compliant</h3>
              <p className="text-xs text-slate-600 mt-1">Full control over your digital personal data with instant right to access, rectify, or request account erasure.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 items-start">
          {/* Sticky Table of Contents (Desktop) */}
          <aside className="hidden lg:block sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-1">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 px-3 mb-3">
              Privacy Outline
            </h4>
            <nav className="space-y-1">
              {sections.map((sec) => {
                const Icon = sec.icon;
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollTo(sec.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-lg text-left transition-all ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="text-xs shrink-0" />
                    <span className="truncate">{sec.title}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 pt-5 border-t border-slate-100 text-xs text-slate-500 space-y-2 px-1">
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <FaCheckCircle className="text-xs" /> DISHA & HIPAA Standards
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                <FaCheckCircle className="text-xs text-emerald-500" /> SPDI Rules 2011 Certified
              </div>
            </div>
          </aside>

          {/* Privacy Clauses Section */}
          <main className="space-y-10 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm leading-relaxed text-sm sm:text-base">
            
            {/* Section 1 */}
            <section id="commitment" className="scroll-mt-28 space-y-3 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-2.5 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                <FaUserShield /> Section 1
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                1. Privacy Commitment & Regulatory Framework
              </h2>
              <p className="text-slate-600 leading-relaxed">
                This Privacy Policy outlines how <strong>Sehaat Saathi App</strong> (operated by TechSeva IT Solutions, Madhubani, Bihar, India) collects, processes, encrypts, and protects your personal identification and Sensitive Personal Data or Information (SPDI).
              </p>
              <p className="text-slate-600 leading-relaxed">
                We strictly govern our data practices under:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-sm">
                <li>The <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong></li>
                <li>The <strong>Information Technology Act, 2000</strong> and the <strong>SPDI Rules, 2011</strong></li>
                <li>The <strong>Telemedicine Practice Guidelines, 2020</strong> issued by MoHFW & NMC</li>
                <li>National Digital Health Mission (NDHM / ABDM) data privacy guidelines</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section id="data-collected" className="scroll-mt-28 space-y-3 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-2.5 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                <FaDatabase /> Section 2
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                2. Categories of Information We Collect
              </h2>
              <div className="space-y-3 text-slate-600">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h3 className="font-bold text-slate-900 text-sm">A. Personal Identification Data</h3>
                  <p className="text-xs text-slate-600 mt-1">Full legal name, phone number, email address, date of birth, gender, emergency contact number, and residential district/state.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h3 className="font-bold text-slate-900 text-sm">B. Sensitive Personal Data or Information (SPDI) / Protected Health Information (PHI)</h3>
                  <p className="text-xs text-slate-600 mt-1">Self-reported symptoms, blood group, recorded clinical vitals (blood pressure, pulse rate, oxygen saturation, glucose levels), past medical illnesses, diagnostic laboratory test reports, medical imaging (X-ray, MRI, Skin scans), and electronic prescriptions.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h3 className="font-bold text-slate-900 text-sm">C. Payment & Transactional Data</h3>
                  <p className="text-xs text-slate-600 mt-1">Payment transaction IDs, timestamp, and amount. Note: Raw credit card numbers, CVV, or UPI MPINs are handled directly by PCI-DSS compliant gateways (Razorpay and Stripe) and are <strong>never</strong> processed or stored on our servers.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h3 className="font-bold text-slate-900 text-sm">D. Technical & Telemetry Data</h3>
                  <p className="text-xs text-slate-600 mt-1">IP addresses, browser type, device identifiers, and WebSockets session handshake data used exclusively for real-time video streaming, OPD queue sync, and platform stability.</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="how-we-use" className="scroll-mt-28 space-y-3 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-2.5 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                <FaHeartbeat /> Section 3
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                3. Purpose of Processing Patient Data
              </h2>
              <p className="text-slate-600">We process your data strictly for legitimate clinical, operational, and safety reasons:</p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li><strong>Medical Consultations:</strong> To allow registered doctors to evaluate your vitals and health history before and during audio/video consultations.</li>
                <li><strong>OPD Queue Management:</strong> To allocate automated hospital token numbers and provide real-time estimated waiting time in hospital lobbies.</li>
                <li><strong>Emergency Coordination:</strong> To connect emergency ambulance drivers and blood banks with the patient's verified location and blood group.</li>
                <li><strong>Automated Notifications:</strong> To dispatch critical consultation links, prescription downloads, and appointment reminder alerts via SMS and email.</li>
                <li><strong>Continuous Health Timeline:</strong> To empower patients with an accessible, lifelong electronic record of past consultations, vitals, and diagnostic results.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="doctor-patient" className="scroll-mt-28 space-y-3 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-2.5 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                <FaUserCheck /> Section 4
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                4. Doctor-Patient Confidentiality Safeguards
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We treat every consultation with strict medical confidentiality. Video calls are encrypted end-to-end via WebRTC protocols. Only you and the assigned licensed doctor possess authorization to view session notes and generated digital prescriptions.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Hospital administrators and operational staff are restricted via Role-Based Access Control (RBAC) and can only view logistical parameters (such as arrival status and OPD token numbers) without access to your detailed clinical discussions.
              </p>
            </section>

            {/* Section 5 */}
            <section id="ai-privacy" className="scroll-mt-28 space-y-3 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-2.5 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                <FaLock /> Section 5
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                5. Sehaat AI Doctor & Neural Copilot Privacy
              </h2>
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 space-y-2 text-sm">
                <h3 className="font-bold text-emerald-400">Privacy-First AI Architecture</h3>
                <p className="text-slate-300">
                  When you interact with the <strong>Sehaat AI Doctor v6.0</strong> or Symptom Checker:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-300 text-xs">
                  <li>Your queries are evaluated in real-time by isolated heuristic clinical engines.</li>
                  <li>We <strong>DO NOT</strong> feed your identifiable personal medical history into open, public AI models for general training.</li>
                  <li>Telemetry analysis is processed anonymously, ensuring that AI suggestions remain completely decoupled from public advertising ecosystems.</li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section id="third-party" className="scroll-mt-28 space-y-3 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-2.5 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                <FaShareAlt /> Section 6
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                6. Third-Party Disclosures & Data Sharing
              </h2>
              <p className="text-slate-600 leading-relaxed">
                <strong>We NEVER sell, trade, or rent patient personal information.</strong> We disclose data strictly on a need-to-know basis to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
                <li><strong>Assigned Doctors & Clinics:</strong> For conducting your booked medical consultations.</li>
                <li><strong>Ambulance Operators:</strong> Only in active ambulance bookings to provide GPS pickup coordinates and patient contact number to the assigned driver.</li>
                <li><strong>Accredited Diagnostic Labs:</strong> When booking home sample collection or diagnostic packages.</li>
                <li><strong>Regulatory & Legal Authorities:</strong> Only when strictly mandated by a valid judicial court order, public health emergency notification, or statutory law enforcement directive under Indian jurisdiction.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section id="security" className="scroll-mt-28 space-y-3 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-2.5 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                <FaShieldVirus /> Section 7
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                7. Technical Security & Encryption Architecture
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Sehaat Saathi App employs multi-tiered enterprise cybersecurity measures:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="block text-slate-900 text-sm mb-1">In-Transit Encryption</strong>
                  All API traffic, socket streams, and browser sessions utilize TLS 1.3 / SSL encryption with HTTPS protocol enforcement.
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="block text-slate-900 text-sm mb-1">Database at Rest Encryption</strong>
                  Patient health records stored on MongoDB Atlas are encrypted at rest utilizing AES-256 with VPC isolation.
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="block text-slate-900 text-sm mb-1">Authentication Tokens</strong>
                  Password verification is executed with bcrypt salt hashing. User sessions are validated via signed, tamper-proof JSON Web Tokens (JWT).
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="block text-slate-900 text-sm mb-1">Continuous Monitoring</strong>
                  Automated background crash guardians and rate-limiting middleware to guard against unauthorized scraping and DDoS attacks.
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section id="patient-rights" className="scroll-mt-28 space-y-3 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-2.5 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                <RiFilePaperFill /> Section 8
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                8. Your Legal Data Rights & Consent Withdrawal
              </h2>
              <p className="text-slate-600">Under the Digital Personal Data Protection Act, you possess the following actionable rights:</p>
              <div className="space-y-2 text-slate-600 text-sm">
                <p><strong>Right to Access:</strong> You can view and download all uploaded reports, past consultation summaries, and prescriptions through your <Link to="/users/profile/me" className="text-emerald-700 font-bold hover:underline">My Account</Link> dashboard.</p>
                <p><strong>Right to Correction:</strong> You can update personal details, contact numbers, and health vitals directly or by writing to support.</p>
                <p><strong>Right to Erasure ("Right to be Forgotten"):</strong> You may request complete account deletion. Upon receiving an authenticated request, your profile is purged from active databases, subject to medical record retention laws.</p>
                <p><strong>Right to Withdraw Consent:</strong> You can opt out of promotional communications at any time while retaining essential clinical service alerts.</p>
              </div>
            </section>

            {/* Section 9 */}
            <section id="retention" className="scroll-mt-28 space-y-3 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-2.5 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                <FaTrashAlt /> Section 9
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                9. Data Retention & Archival Guidelines
              </h2>
              <p className="text-slate-600 leading-relaxed">
                In accordance with Indian Medical Council (Professional Conduct, Etiquette and Ethics) Regulations, medical records of outpatient consultations are maintained for a mandatory period of 3 years from the consultation date to enable continuous clinical follow-up and medico-legal compliance.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Following the expiration of statutory retention windows, inactive data is safely anonymized or permanently destroyed through cryptographic deletion procedures.
              </p>
            </section>

            {/* Section 10 */}
            <section id="children" className="scroll-mt-28 space-y-3 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-2.5 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                <FaChild /> Section 10
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                10. Children & Minor Data Protection
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Sehaat Saathi App does not knowingly permit children under 18 to register independently. Minor profiles (such as pediatric consultations) must be created and operated as dependent profiles under a parent or legal guardian's verified primary account.
              </p>
            </section>

            {/* Section 11 */}
            <section id="dpdp-compliance" className="scroll-mt-28 space-y-3 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-2.5 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                <RiGovernmentFill /> Section 11
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                11. Compliance with Indian DPDP Act 2023
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Sehaat Saathi App fulfills the obligations of a <strong>Data Fiduciary</strong> under the Digital Personal Data Protection Act, 2023. We maintain clear consent records, purpose limitation, data minimization, and reasonable security safeguards to prevent data breaches.
              </p>
            </section>

            {/* Section 12 */}
            <section id="grievance" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                <FaHeadset /> Section 12
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                12. Data Protection Officer & Grievance Redressal
              </h2>
              <p className="text-slate-600 leading-relaxed">
                If you have inquiries regarding how your health data is handled, wish to exercise your data rights, or want to report a privacy concern, please contact our designated Grievance & Data Protection Officer:
              </p>
              
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2 text-sm text-slate-700">
                <p><strong>Designation:</strong> Data Protection & Grievance Officer, Sehaat Saathi App</p>
                <p><strong>Operating Organization:</strong> TechSeva IT Solutions</p>
                <p><strong>Address:</strong> Bara Bazar, Madhubani, Bihar, PIN: 847211, India</p>
                <p><strong>Privacy Inquiries Email:</strong> <a href="mailto:privacy@sehaatsaathi.com" className="text-emerald-700 font-bold hover:underline">privacy@sehaatsaathi.com</a> / <a href="mailto:support@sehaatsaathi.com" className="text-emerald-700 font-bold hover:underline">support@sehaatsaathi.com</a></p>
                <p><strong>Helpline:</strong> (+91) 6200087830 / 9470074183</p>
                <p className="text-xs text-slate-500 pt-2 border-t border-slate-200">
                  Grievances are acknowledged within 24 hours and resolved within the statutory period of 15 business days.
                </p>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
