import React, { useEffect } from "react";

const MetaHead = ({ 
  title = "Sehaat Saathi | India's #1 AI Healthcare Platform & OPD Booking", 
  description = "Sehaat Saathi is India's premier AI-powered healthcare platform. Book instant hospital OPD token passes, consult top specialist doctors, access 24/7 AI diagnosis, and track live beds across India.",
  keywords = "Sehaat Saathi, Sehaat Saathi App, Sehaat Saathi HealthCare Platform, Sehaat Saathi OPD Booking, Sehaat Saathi Doctor Booking, Sehaat Saathi Hospital Booking, Sehaat Saathi Ambulance, Sehaat Saathi Gigs, Sehaat Saathi Bihar, Online Doctor Consultation India, Best Health App India",
  canonicalUrl = "https://sehaatsaathi.com/" 
}) => {

  useEffect(() => {
    // Dynamic Document Title
    document.title = title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = keywords;

    // Update Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = title;

    // Update Open Graph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = description;

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

  }, [title, description, keywords, canonicalUrl]);

  return null;
};

export default MetaHead;
