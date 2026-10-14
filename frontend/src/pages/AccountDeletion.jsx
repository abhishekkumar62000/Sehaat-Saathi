import React, { useState } from "react";
import { Link } from "react-router-dom";
import MetaHead from "../components/SEO/MetaHead";
import { toast } from "react-toastify";
import { 
  FaTrashAlt, 
  FaMobileAlt, 
  FaEnvelope, 
  FaUserMd, 
  FaHospital, 
  FaShieldAlt, 
  FaCheckCircle, 
  FaClock, 
  FaFileContract, 
  FaInfoCircle, 
  FaCopy, 
  FaCheck,
  FaExclamationTriangle,
  FaArrowRight,
  FaPrint,
  FaPhoneAlt,
  FaLock,
  FaDatabase
} from "react-icons/fa";
import { 
  BsShieldCheck, 
  BsShieldFillX, 
  BsCheck2Circle, 
  BsGooglePlay, 
  BsDeviceHddFill,
  BsFileEarmarkLock2
} from "react-icons/bs";

const AccountDeletion = () => {
  const [activeTab, setActiveTab] = useState("methods");
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    role: "Patient",
    reason: "No longer need the service",
    notes: "",
    agreeTerms: false
  });

  const [submittedTicket, setSubmittedTicket] = useState(null);

  const emailTemplate = `To: support@sehaatsaathi.com, sehaatsaathi@gmail.com
Subject: Account Deletion Request - Sehaat Saathi App
Content:
Dear Data Protection Officer,

I would like to permanently delete my Sehaat Saathi App account and all associated personal health data in accordance with Google Play Developer Policies and the DPDP Act 2023.

Account Details:
- Full Name: ${formData.fullName || "[Your Registered Name]"}
- Registered Mobile Number: ${formData.phone || "+91 [Your Mobile Number]"}
- Account Role: ${formData.role}
- Reason: ${formData.reason}
${formData.notes ? `- Additional Notes: ${formData.notes}` : ""}

I understand that this action is irreversible and my health records, consultations, and profile will be permanently removed from live production databases.

Thank you,
${formData.fullName || "[Your Name]"}`;

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(emailTemplate);
    setCopied(true);
    toast.success("Email request template copied to clipboard!");
    setTimeout(() => setCopied(false), 3000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.phone || formData.phone.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number with country code.");
      return;
    }
    if (!formData.agreeTerms) {
      toast.warning("Please acknowledge the permanent deletion warning.");
      return;
    }

    const randomTicket = "DEL-" + Math.floor(100000 + Math.random() * 900000);
    setSubmittedTicket({
      id: randomTicket,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    });
    toast.success("Deletion Request Registered! Ticket ID: " + randomTicket);
  };

  const handleMailto = () => {
    const subject = encodeURIComponent(`Account Deletion Request - Sehaat Saathi App (${formData.phone || "User"})`);
    const body = encodeURIComponent(emailTemplate);
    window.location.href = `mailto:support@sehaatsaathi.com?cc=sehaatsaathi@gmail.com&subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <MetaHead 
        title="Account & Data Deletion Policy | Sehaat Saathi App"
        description="Official Account and Data Deletion Policy for Sehaat Saathi App. Learn how to permanently erase your patient profile, EHR records, or close doctor/clinic accounts in compliance with Google Play Developer Policies and DPDP Act 2023."
        keywords="Sehaat Saathi App Account Deletion, Delete Account Sehaat Saathi App, Erase Medical Data, Patient Privacy Rights India, Google Play Data Deletion Policy, DPDP Act 2023"
        canonicalUrl="https://sehaatsaathi.com/account-deletion"
      />

      {/* Header Banner */}
      <section className="relative bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 text-white py-14 md:py-20 overflow-hidden border-b-4 border-rose-500">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Regulatory Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold uppercase tracking-wider">
                <BsShieldFillX className="text-rose-400" />
                <span>Account & Data Erasure Protocol</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                <FaCheckCircle className="text-emerald-400" /> Google Play Compliant
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-bold">
                <FaLock className="text-blue-400" /> DPDP Act 2023
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
              Account &amp; Data Deletion Policy
            </h1>
            <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              <span className="text-rose-400 font-semibold">Sehaat Saathi App</span> (सेहत साथी App) — Full control over your digital identity, medical reports, and personal privacy.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                Effective Date: <strong>October 2026</strong>
              </span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                App Name: <strong>Sehaat Saathi App</strong>
              </span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 text-emerald-400 font-semibold">
                Execution SLA: <strong>7 Business Days</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="max-w-5xl mx-auto space-y-10">

          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-200/80 rounded-2xl max-w-2xl mx-auto shadow-inner">
            <button
              onClick={() => setActiveTab("methods")}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === "methods"
                  ? "bg-white text-rose-600 shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FaMobileAlt />
              <span>How to Delete</span>
            </button>
            <button
              onClick={() => setActiveTab("form")}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === "form"
                  ? "bg-white text-rose-600 shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FaEnvelope />
              <span>Submit Request</span>
            </button>
            <button
              onClick={() => setActiveTab("schedule")}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === "schedule"
                  ? "bg-white text-rose-600 shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FaDatabase />
              <span>Data Schedule</span>
            </button>
          </div>

          {/* Section 1: Overview */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-lg font-bold">
                <FaInfoCircle />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">1. Overview</h2>
                <p className="text-xs text-slate-500">Commitment to Patient Sovereignty & Google Play Standards</p>
              </div>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-slate-600">
              At <strong>Sehaat Saathi App</strong>, we respect your right to privacy and absolute control over your personal healthcare data. In strict compliance with <strong>Google Play Developer Data Safety Policies</strong>, the <strong>Digital Personal Data Protection Act (DPDP Act 2023)</strong>, and Indian IT Intermediary Rules, this page outlines how any registered user (Patient, Doctor, or Healthcare Institution) can trigger and verify the permanent deletion of their account, health telemetry, and all associated personal records.
            </p>
          </div>

          {/* Tab 1: Methods */}
          {activeTab === "methods" && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center text-lg font-bold">
                  <FaTrashAlt />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900">2. How to Request Account Deletion</h2>
                  <p className="text-xs text-slate-500">Choose the deletion method that matches your current device access</p>
                </div>
              </div>

              {/* Method 1: In-App */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 hover:border-orange-300 transition-all">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-orange-500 text-white font-black text-sm flex items-center justify-center">
                      M1
                    </span>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2">
                        <span>Method 1: In-App Account Deletion (For Patients)</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold uppercase">Recommended</span>
                      </h3>
                      <p className="text-xs text-slate-500">Fastest and automated via the Sehaat Saathi mobile application</p>
                    </div>
                  </div>
                  <FaMobileAlt className="text-2xl text-slate-400 shrink-0" />
                </div>

                <p className="text-xs md:text-sm text-slate-600 mb-6">
                  If you have the <strong>Sehaat Saathi App</strong> installed on your Android or iOS device, you can trigger permanent deletion directly from within your authenticated profile:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  {[
                    { step: "1", title: "Open & Sign In", desc: "Launch Sehaat Saathi App and log into your registered mobile account." },
                    { step: "2", title: "Profile Tab", desc: "Tap on the Profile icon located in the bottom right navigation bar." },
                    { step: "3", title: "Open Settings", desc: "Select the Settings gear icon from your profile overview." },
                    { step: "4", title: "Privacy & Data", desc: "Scroll down to the 'Privacy & Data Protection' section." },
                    { step: "5", title: "Select 'Delete Account'", desc: "Tap on the red 'Delete Account & Purge Records' button." },
                    { step: "6", title: "Review Warning", desc: "Read the confirmation dialogue detailing permanent loss of EHR records." },
                    { step: "7", title: "Confirm & Submit", desc: "Tap Continue and send the pre-filled verification confirmation message." },
                    { step: "Done", title: "7-Day Execution", desc: "Your profile and records are irreversibly purged within 7 business days." }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-5 h-5 rounded-md bg-orange-100 text-orange-700 font-black text-[10px] flex items-center justify-center">
                          {item.step}
                        </span>
                        <BsCheck2Circle className="text-emerald-500 text-xs" />
                      </div>
                      <h4 className="font-bold text-slate-800 text-xs mb-1">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-xs text-emerald-900">
                  <FaCheckCircle className="text-emerald-600 text-base shrink-0" />
                  <span>
                    <strong>Instant Confirmation:</strong> Once submitted in-app, your login token will be revoked immediately and you will receive an SMS acknowledgment on your registered mobile number.
                  </span>
                </div>
              </div>

              {/* Method 2: Web / Email */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 hover:border-blue-300 transition-all">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center">
                      M2
                    </span>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900">
                        Method 2: External Web / Email Request (If App is Uninstalled)
                      </h3>
                      <p className="text-xs text-slate-500">Google Play compliant web mechanism — no app re-installation required</p>
                    </div>
                  </div>
                  <FaEnvelope className="text-2xl text-slate-400 shrink-0" />
                </div>

                <p className="text-xs md:text-sm text-slate-600 mb-4 leading-relaxed">
                  If you have already uninstalled the application or do not have access to your mobile smartphone, you can request account deletion via email without needing to reinstall the app:
                </p>

                <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl font-mono text-xs space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400 font-sans font-bold">Standard Email Request Template</span>
                    <button
                      onClick={handleCopyTemplate}
                      className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded text-[11px] transition"
                    >
                      {copied ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                      <span>{copied ? "Copied" : "Copy Template"}</span>
                    </button>
                  </div>
                  <p><span className="text-rose-400">Send Email to:</span> <code>support@sehaatsaathi.com</code> (cc: <code>sehaatsaathi@gmail.com</code>)</p>
                  <p><span className="text-amber-400">Subject Line:</span> <code>Account Deletion Request - Sehaat Saathi App</code></p>
                  <div className="text-slate-300 space-y-1 pl-2 border-l-2 border-slate-700">
                    <p>Details to Include in Email Body:</p>
                    <p>1. <strong>Registered Mobile Number</strong> (e.g. +91 9876543210)</p>
                    <p>2. <strong>Full Name</strong> as registered on your patient profile</p>
                    <p>3. <strong>Account Role</strong> (Patient, Doctor, or Hospital Admin)</p>
                    <p>4. <strong>Reason for deletion</strong> (Optional)</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <FaShieldAlt className="text-blue-500" />
                    Identity will be verified via an OTP or confirmation call to prevent unauthorized deletion.
                  </p>
                  <button
                    onClick={() => setActiveTab("form")}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow"
                  >
                    <span>Open Interactive Request Form</span>
                    <FaArrowRight />
                  </button>
                </div>
              </div>

              {/* Method 3: Doctor & Hospital */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 hover:border-purple-300 transition-all">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center">
                      M3
                    </span>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900">
                        Method 3: Doctor &amp; Hospital / Clinic Account Closure
                      </h3>
                      <p className="text-xs text-slate-500">Prerequisites for verified medical practitioners & partner centers</p>
                    </div>
                  </div>
                  <FaUserMd className="text-2xl text-slate-400 shrink-0" />
                </div>

                <p className="text-xs md:text-sm text-slate-600 mb-4 leading-relaxed">
                  Because Registered Medical Practitioners (RMPs) and Healthcare Institutions manage active patient queues, medical liability records, and earnings balances:
                </p>

                <div className="space-y-2 text-xs md:text-sm text-slate-700">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-purple-50/60 border border-purple-100">
                    <span className="w-5 h-5 rounded-full bg-purple-200 text-purple-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <span><strong>Active Consultations:</strong> Ensure all ongoing video consults, pending OPD tokens, and lab queries are fully fulfilled or processed for refund.</span>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-purple-50/60 border border-purple-100">
                    <span className="w-5 h-5 rounded-full bg-purple-200 text-purple-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <span><strong>Wallet Payout:</strong> Request withdrawal of any pending wallet earnings via your Doctor Dashboard before closure.</span>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-purple-50/60 border border-purple-100">
                    <span className="w-5 h-5 rounded-full bg-purple-200 text-purple-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <span><strong>Formal Closure Email:</strong> Send an email from your registered practitioner address to <code>sehaatsaathi@gmail.com</code> requesting provider de-listing and closure.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Interactive Request Form */}
          {activeTab === "form" && (
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200 animate-fade-in space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg font-bold">
                  <FaEnvelope />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900">Direct Online Deletion Request</h2>
                  <p className="text-xs text-slate-500">Submit your request directly to our Data Protection Officer</p>
                </div>
              </div>

              {submittedTicket ? (
                <div className="p-6 md:p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-4 text-center">
                  <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center text-2xl mx-auto shadow-lg shadow-emerald-200">
                    <FaCheck />
                  </div>
                  <h3 className="text-xl font-extrabold text-emerald-900">Deletion Ticket Registered</h3>
                  <p className="text-xs md:text-sm text-emerald-800 max-w-md mx-auto">
                    Your account deletion request has been formally logged. An SMS verification token will be dispatched to <strong>{formData.phone}</strong> within 24 hours.
                  </p>
                  <div className="inline-block bg-white px-4 py-2 rounded-xl border border-emerald-200 text-xs font-mono font-bold text-emerald-800">
                    Ticket Reference: {submittedTicket.id} | Date: {submittedTicket.date}
                  </div>
                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      onClick={handleMailto}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                    >
                      Send Backup Confirmation Email
                    </button>
                    <button
                      onClick={() => setSubmittedTicket(null)}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl transition"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name (As Registered) *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full text-xs md:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Registered Mobile Number *</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 9876543210"
                        className="w-full text-xs md:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Account Role *</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full text-xs md:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500"
                      >
                        <option value="Patient">Patient Account</option>
                        <option value="Doctor">Doctor / Medical Practitioner</option>
                        <option value="Hospital Admin">Hospital / Clinic Administration</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Reason for Deletion (Optional)</label>
                      <select
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        className="w-full text-xs md:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500"
                      >
                        <option value="No longer need the service">No longer need the service</option>
                        <option value="Privacy concerns">Privacy concerns</option>
                        <option value="Created duplicate account">Created duplicate account</option>
                        <option value="Switching phone number">Switching phone number</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Additional Notes / Instructions</label>
                    <textarea 
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any specific instructions or alternative contact number..."
                      className="w-full text-xs md:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={formData.agreeTerms}
                        onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                        className="mt-1 w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500"
                      />
                      <span className="text-xs text-rose-950 leading-relaxed">
                        <strong>Permanent Deletion Warning:</strong> I understand that submitting this request will initiate the irreversible purging of my medical consultation history, prescriptions, and profile within 7 business days. This action cannot be reversed.
                      </span>
                    </label>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleMailto}
                      className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl transition border border-slate-300"
                    >
                      <FaEnvelope className="text-blue-600" />
                      <span>Open Pre-filled Email App</span>
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-xs md:text-sm font-bold px-6 py-2.5 rounded-xl transition shadow-lg shadow-rose-200"
                    >
                      <FaTrashAlt />
                      <span>Submit Deletion Request</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Tab 3: Data Retention Schedule */}
          {activeTab === "schedule" && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg font-bold">
                  <FaDatabase />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900">3. Data Retention &amp; Deletion Schedule</h2>
                  <p className="text-xs text-slate-500">Transparent timeline of what is permanently erased vs statutory records</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs md:text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-4 px-5">Data Category</th>
                        <th className="py-4 px-5">Examples</th>
                        <th className="py-4 px-5">Retention SLA</th>
                        <th className="py-4 px-5">Status After 7 Days</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr>
                        <td className="py-4 px-5 font-bold text-slate-900 flex items-center gap-2">
                          <FaCheckCircle className="text-rose-500" /> Personal Profile
                        </td>
                        <td className="py-4 px-5 text-slate-500">Name, Phone, Email, Profile Picture, Age, Gender</td>
                        <td className="py-4 px-5 font-semibold text-rose-600">7 Business Days</td>
                        <td className="py-4 px-5"><span className="bg-rose-50 text-rose-700 font-bold px-2.5 py-1 rounded-full text-xs">Permanently Erased</span></td>
                      </tr>
                      <tr>
                        <td className="py-4 px-5 font-bold text-slate-900 flex items-center gap-2">
                          <FaCheckCircle className="text-rose-500" /> Health &amp; EHR Records
                        </td>
                        <td className="py-4 px-5 text-slate-500">Uploaded Lab Reports, Prescriptions, AI Doctor Chats, Vitals</td>
                        <td className="py-4 px-5 font-semibold text-rose-600">7 Business Days</td>
                        <td className="py-4 px-5"><span className="bg-rose-50 text-rose-700 font-bold px-2.5 py-1 rounded-full text-xs">Cryptographically Shredded</span></td>
                      </tr>
                      <tr>
                        <td className="py-4 px-5 font-bold text-slate-900 flex items-center gap-2">
                          <FaCheckCircle className="text-rose-500" /> Doctor Credentials
                        </td>
                        <td className="py-4 px-5 text-slate-500">Medical Registration Certificate, Clinic Addresses, Time Slots</td>
                        <td className="py-4 px-5 font-semibold text-rose-600">7 Business Days</td>
                        <td className="py-4 px-5"><span className="bg-rose-50 text-rose-700 font-bold px-2.5 py-1 rounded-full text-xs">Delisted &amp; Deleted</span></td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="py-4 px-5 font-bold text-slate-900 flex items-center gap-2">
                          <BsFileEarmarkLock2 className="text-amber-500" /> Financial Records
                        </td>
                        <td className="py-4 px-5 text-slate-500">Razorpay / Stripe Payment IDs, GST Invoices, Fee Receipts</td>
                        <td className="py-4 px-5 font-semibold text-slate-700">Archived for Statutory Audit</td>
                        <td className="py-4 px-5"><span className="bg-amber-50 text-amber-800 font-bold px-2.5 py-1 rounded-full text-xs">Statutory Indian Tax Law</span></td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="py-4 px-5 font-bold text-slate-900 flex items-center gap-2">
                          <FaLock className="text-blue-500" /> Clinical Audit Log
                        </td>
                        <td className="py-4 px-5 text-slate-500">Anonymized teleconsultation metadata (RMP license ID, timestamp)</td>
                        <td className="py-4 px-5 font-semibold text-slate-700">3 Years (Anonymized)</td>
                        <td className="py-4 px-5"><span className="bg-blue-50 text-blue-800 font-bold px-2.5 py-1 rounded-full text-xs">NMC Telemedicine Guidelines 2020</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Processing Timeline */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg font-bold">
                <FaClock />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">4. Processing Timeline &amp; SLA</h2>
                <p className="text-xs text-slate-500">Guaranteed response and purge deadlines</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-blue-600">Step 1: Acknowledgment</span>
                <h4 className="font-bold text-slate-800 text-sm">Within 24 to 48 Hours</h4>
                <p className="text-slate-600 leading-relaxed">
                  All deletion requests received via in-app trigger, email, or online ticket are verified and acknowledged within 48 hours with a tracking ticket.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-600">Step 2: Full Purge Execution</span>
                <h4 className="font-bold text-slate-800 text-sm">Within 7 Business Days</h4>
                <p className="text-slate-600 leading-relaxed">
                  Following identity verification, your profile, files, and personal data are permanently deleted across all active production databases and backup clusters.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Contact Support & Data Protection Officer */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center text-lg font-bold">
                <FaShieldAlt />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold">5. Contact Support &amp; Data Protection Officer</h2>
                <p className="text-xs text-slate-400">Official nodal office for privacy rights & data erasure assistance</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-rose-400 text-base shrink-0" />
                  <div>
                    <p className="text-slate-400 text-xs">Official Support &amp; Deletion Email:</p>
                    <a href="mailto:support@sehaatsaathi.com" className="font-bold text-white hover:text-rose-400 transition">
                      support@sehaatsaathi.com
                    </a>{" "}
                    <span className="text-slate-500">/</span>{" "}
                    <a href="mailto:sehaatsaathi@gmail.com" className="font-bold text-white hover:text-rose-400 transition">
                      sehaatsaathi@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaPhoneAlt className="text-emerald-400 text-base shrink-0" />
                  <div>
                    <p className="text-slate-400 text-xs">Direct Privacy Helpline:</p>
                    <a href="tel:+916200087830" className="font-bold text-white hover:text-emerald-400 transition">
                      +91 6200087830
                    </a>{" "}
                    <span className="text-slate-500">/</span>{" "}
                    <a href="tel:+919470074183" className="font-bold text-white hover:text-emerald-400 transition">
                      +91 9470074183
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-slate-300 text-xs border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
                <p><strong>Platform:</strong> Sehaat Saathi App (Google Play Store)</p>
                <p><strong>Nodal Officer:</strong> Data Protection Officer, Sehaat Saathi Healthcare</p>
                <p><strong>Headquarters:</strong> Bara Bazar, Madhubani, Bihar - 847211, India</p>
                <p><strong>Founder &amp; Tech Lead:</strong> Abhishek Kumar (AI/ML Engineer)</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <BsShieldCheck className="text-emerald-400 text-base" />
                <span>Fully compliant with Google Play Developer Data Safety Regulations.</span>
              </div>
              <div className="flex gap-3">
                <Link
                  to="/privacy"
                  className="text-xs text-rose-400 hover:text-rose-300 font-bold transition flex items-center gap-1"
                >
                  <span>Privacy Policy</span> <FaArrowRight className="text-[10px]" />
                </Link>
                <Link
                  to="/terms"
                  className="text-xs text-slate-300 hover:text-white font-bold transition flex items-center gap-1"
                >
                  <span>Terms &amp; Conditions</span> <FaArrowRight className="text-[10px]" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AccountDeletion;
