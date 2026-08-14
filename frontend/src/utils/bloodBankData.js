// Sehaat Saathi Emergency Blood Bank Services Data (Madhubani, Darbhanga, Patna & Bihar Network)

export const HELPLINE_NUMBERS = [
  { labelEn: "Founder Direct", labelHi: "संस्थापक हॉटलाइन", number: "+91 6200087830", cleanNo: "916200087830" },
  { labelEn: "Emergency Support", labelHi: "इमरजेंसी सपोर्ट", number: "+91 9934276622", cleanNo: "919934276622" },
  { labelEn: "24/7 Care Desk", labelHi: "24/7 केयर डेस्क", number: "+91 7667352632", cleanNo: "917667352632" },
  { labelEn: "Senior Coordinator", labelHi: "वरिष्ठ कॉर्डिनेटर", number: "+91 78271 80077", cleanNo: "917827180077" }
];

export const EMOTIONAL_MOTIVATIONS = [
  {
    quoteHi: "रक्तदान महा-कल्याण! जब आपकी दी हुई एक बूँद खून किसी की रगों में दौड़ती है, तो एक पूरा परिवार बिखरने से बच जाता है।",
    quoteEn: "Blood Donation is the Supreme Service! When a single drop of your blood flows through someone's veins, an entire family is saved from shattering.",
    author: "— सेहत साथी प्रेरणा (Sehaat Saathi Mission)"
  },
  {
    quoteHi: "अस्पताल के बेड पर बैठा हर मरीज किसी की माँ, किसी का पिता या किसी का मासूम बच्चा है। उनकी साँसें बचाना सेहत साथी का सबसे पवित्र कर्तव्य है।",
    quoteEn: "Every patient on a hospital bed is someone's mother, father, or child. Preserving their breath is Sehaat Saathi's most sacred duty.",
    author: "— संस्थापक संकल्प (Founder Commitment)"
  },
  {
    quoteHi: "हम 100% खून मिलने का झूठा दावा नहीं करते, पर यह 1000% वादा करते हैं कि आपकी जान बचाने के लिए हम जमीनी स्तर पर हर दरवाजे पर दस्तक देंगे!",
    quoteEn: "We make no false 100% claims, but we give 1000% commitment that our team will knock every door on the ground to arrange blood for your loved one!",
    author: "— सेहत साथी ग्राउंड टीम (Sehaat Saathi Ground Team)"
  }
];

export const IMPACT_STATS = [
  { value: "480+", labelEn: "Emergency Blood Units Arranged", labelHi: "इमरजेंसी ब्लड यूनिट्स अरेंज्ड" },
  { value: "390+", labelEn: "Lives Saved Across Bihar", labelHi: "मरीजों की बचाई गई जान" },
  { value: "1,250+", labelEn: "Registered Volunteer Donors", labelHi: "पंजीकृत वॉलिएंटियर रक्तदाता" },
  { value: "100%", labelEn: "Ground Verification Guarantee", labelHi: "ग्राउंड लेवल सत्यापन गारंटी" }
];

export const DISPATCH_SLAS = [
  { areaEn: "Madhubani Sadar & Town Area", areaHi: "मधुबनी टाउन व आसपास (1-10 किमी)", time: "⚡ 20 - 35 Mins", badge: "Fastest Response" },
  { areaEn: "Darbhanga DMCH & Hospitals", areaHi: "दरभंगा (DMCH व शहर)", time: "⚡ 40 - 60 Mins", badge: "Regional Express" },
  { areaEn: "Patna PMCH / AIIMS Network", areaHi: "पटना (PMCH / AIIMS / IGIMS)", time: "⚡ 2 - 3 Hours", badge: "Inter-City Network" }
];

export const HOSPITAL_PARTNER_BENEFITS = [
  { titleHi: "24/7 समर्पित ग्राउंड कॉर्डिनेटर", titleEn: "24/7 Dedicated Ground Coordinator", descHi: "अस्पताल के आईसीयू व ओटी के लिए तुरंत ब्लड अरेंजमेंट बैकअप।" },
  { titleHi: "डिजिटल ब्लड रिक्विजिशन स्लिप", titleEn: "Digital Blood Requisition Slip", descHi: "अस्पताल के डॉक्टरों द्वारा सीधे ऑनलाइन फॉर्म सत्यापन।" },
  { titleHi: "रेयर ब्लड ग्रुप अलर्ट सिस्टम", titleEn: "Rare Blood Group Emergency Alert", descHi: "O-Negative, AB-Negative डोनर्स का तुरंत ऑटो-अलर्ट।" },
  { titleHi: "कोल्ड-चेन सुरक्षित ट्रांसपोर्ट", titleEn: "Cold-Chain Temperature Transport", descHi: "रक्त की 100% गुणवत्ता बनाए रखने हेतु थर्मो-इंसुलेटेड बैग्स।" }
];

export const BLOOD_GROUPS = [
  { group: "O+", rarity: "Universal Donor", canGiveTo: "O+, A+, B+, AB+", canReceiveFrom: "O+, O-", label: "O Positive (O+)", color: "red" },
  { group: "O-", rarity: "Universal Emergency", canGiveTo: "All Blood Groups", canReceiveFrom: "O- Only", label: "O Negative (O-)", color: "rose" },
  { group: "A+", rarity: "High Demand", canGiveTo: "A+, AB+", canReceiveFrom: "A+, A-, O+, O-", label: "A Positive (A+)", color: "red" },
  { group: "A-", rarity: "Rare Group", canGiveTo: "A+, A-, AB+, AB-", canReceiveFrom: "A-, O-", label: "A Negative (A-)", color: "rose" },
  { group: "B+", rarity: "High Demand", canGiveTo: "B+, AB+", canReceiveFrom: "B+, B-, O+, O-", label: "B Positive (B+)", color: "red" },
  { group: "B-", rarity: "Rare Group", canGiveTo: "B+, B-, AB+, AB-", canReceiveFrom: "B-, O-", label: "B Negative (B-)", color: "rose" },
  { group: "AB+", rarity: "Universal Recipient", canGiveTo: "AB+ Only", canReceiveFrom: "All Blood Groups", label: "AB Positive (AB+)", color: "amber" },
  { group: "AB-", rarity: "Very Rare Group", canGiveTo: "AB+, AB-", canReceiveFrom: "AB-, A-, B-, O-", label: "AB Negative (AB-)", color: "purple" }
];

export const BLOOD_COMPONENTS = [
  { id: 'whole', labelEn: 'Whole Blood', labelHi: 'होल ब्लड (साधारण खून)', usageEn: 'Trauma, Surgery, Acute Hemorrhage', usageHi: 'सर्जरी, गंभीर चोट व ज्यादा खून बहने पर' },
  { id: 'prbc', labelEn: 'PRBC (Packed Red Blood Cells)', labelHi: 'पीआरबीसी (लाल रक्त कोशिकाएं)', usageEn: 'Anemia, Post-Op Recovery', usageHi: 'एनीमिया, हीमोग्लोबिन कमी व रिकवरी हेतु' },
  { id: 'platelets', labelEn: 'Random Donor Platelets (RDP)', labelHi: 'प्लेटलेट्स (RDP)', usageEn: 'Dengue, Low Platelet Count', usageHi: 'डेंगू बुखार, प्लेटलेट कमी हेतु' },
  { id: 'sdp', labelEn: 'Single Donor Platelets (SDP)', labelHi: 'सिंगल डोनर प्लेटलेट्स (SDP Dengue)', usageEn: 'Critical Dengue & Oncology', usageHi: 'क्रिटिकल डेंगू व कैंसर उपचार हेतु' },
  { id: 'ffp', labelEn: 'Fresh Frozen Plasma (FFP)', labelHi: 'प्लाज्मा (FFP Plasma)', usageEn: 'Liver Failure, Clotting Factor', usageHi: 'लिवर बीमारी व क्लॉटिंग फैक्टर हेतु' }
];

export const DEMO_BLOOD_BANKS_STOCK = [
  {
    id: 'bb1',
    name: 'Sadar Hospital Model Blood Bank',
    city: 'Madhubani Central',
    distance: '1.2 km',
    contact: '+91 6200087830',
    verified: true,
    lastUpdated: '10 Mins Ago',
    statusTag: 'Demo Stock Data',
    stock: {
      'O+': 14, 'O-': 2, 'A+': 10, 'A-': 1, 'B+': 18, 'B-': 3, 'AB+': 8, 'AB-': 0
    }
  },
  {
    id: 'bb2',
    name: 'DMCH Emergency Regional Blood Center',
    city: 'Darbhanga Medical College DMCH',
    distance: '28 km',
    contact: '+91 9934276622',
    verified: true,
    lastUpdated: '15 Mins Ago',
    statusTag: 'Demo Stock Data',
    stock: {
      'O+': 25, 'O-': 4, 'A+': 19, 'A-': 3, 'B+': 32, 'B-': 5, 'AB+': 12, 'AB-': 2
    }
  },
  {
    id: 'bb3',
    name: 'Red Cross Voluntary Blood Center',
    city: 'Station Road, Madhubani',
    distance: '2.5 km',
    contact: '+91 7667352632',
    verified: true,
    lastUpdated: '5 Mins Ago',
    statusTag: 'Demo Stock Data',
    stock: {
      'O+': 9, 'O-': 1, 'A+': 7, 'A-': 0, 'B+': 12, 'B-': 2, 'AB+': 5, 'AB-': 1
    }
  },
  {
    id: 'bb4',
    name: 'PMCH Central Blood Bank & Transfusion Unit',
    city: 'Patna PMCH Main Center',
    distance: '140 km',
    contact: '+91 7827180077',
    verified: true,
    lastUpdated: '20 Mins Ago',
    statusTag: 'Demo Stock Data',
    stock: {
      'O+': 45, 'O-': 8, 'A+': 30, 'A-': 6, 'B+': 50, 'B-': 9, 'AB+': 22, 'AB-': 4
    }
  },
  {
    id: 'bb5',
    name: 'SKMCH Blood Bank Center',
    city: 'Muzaffarpur SKMCH',
    distance: '95 km',
    contact: '+91 6200087830',
    verified: true,
    lastUpdated: '12 Mins Ago',
    statusTag: 'Demo Stock Data',
    stock: {
      'O+': 20, 'O-': 3, 'A+': 14, 'A-': 2, 'B+': 24, 'B-': 4, 'AB+': 10, 'AB-': 1
    }
  }
];

export const VOLUNTARY_DONORS_LIST = [
  {
    id: 'dn1',
    name: 'Rahul Kumar Singh',
    group: 'O+',
    location: 'Sankar Chowk, Madhubani',
    lastDonated: '4 Months Ago',
    status: 'Ready to Donate 🩸',
    donationsCount: 8,
    badge: '👑 Gold Hero Donor',
    verified: true
  },
  {
    id: 'dn2',
    name: 'Vikramaditya Roy',
    group: 'B+',
    location: 'Rajnagar, Madhubani',
    lastDonated: '6 Months Ago',
    status: 'Ready to Donate 🩸',
    donationsCount: 12,
    badge: '🏆 Platinum Champion',
    verified: true
  },
  {
    id: 'dn3',
    name: 'Priya Sharma',
    group: 'AB+',
    location: 'Station Road, Madhubani',
    lastDonated: '5 Months Ago',
    status: 'Ready to Donate 🩸',
    donationsCount: 5,
    badge: '⭐ Silver Lifesaver',
    verified: true
  },
  {
    id: 'dn4',
    name: 'Amitabh Verma',
    group: 'O-',
    location: 'Benipatti, Madhubani',
    lastDonated: '8 Months Ago',
    status: 'Emergency Standby 🚨',
    donationsCount: 15,
    badge: '🛡️ Rare Group Guardian',
    verified: true
  }
];

export const REAL_SUCCESS_STORIES = [
  {
    id: 's1',
    patientName: 'Sunita Devi (Age 48)',
    location: 'DMCH Darbhanga',
    group: 'O Negative (O-)',
    storyHi: 'रातों-रात इमरजेंसी सर्जरी के लिए 2 यूनिट O- नेगेटिव ब्लड की ज़रूरत थी। सेहत साथी टीम ने 35 मिनट में रेड क्रॉस सेंटर से ब्लड अरेंज करवाया।',
    storyEn: 'Required 2 units of rare O- Negative blood overnight for emergency surgery. Sehaat Saathi team coordinated and arranged blood within 35 minutes from Red Cross.',
    timeAgo: 'Yesterday at 2:30 AM'
  },
  {
    id: 's2',
    patientName: 'Rameshwar Thakur (Age 62)',
    location: 'Madhubani Sadar Hospital',
    group: 'B Positive (B+)',
    storyHi: 'डेंगू में प्लेटलेट्स काउंट 15,000 गिर गया था। सेहत साथी के वॉलिएंटियर डोनर ने अस्पताल पहुंचकर तुरंत 1 यूनिट SDP प्लेटलेट्स डोनेट किया।',
    storyEn: 'Platelet count dropped to 15,000 in severe Dengue. Sehaat Saathi volunteer donor arrived at hospital and donated 1 Unit SDP Platelets immediately.',
    timeAgo: '3 Days Ago'
  }
];
