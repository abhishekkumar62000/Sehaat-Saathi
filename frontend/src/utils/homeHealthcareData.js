// Sehaat Saathi Home Healthcare Services Database (Madhubani Town & Nearby Surrounding 1-10 KM Radius)

export const HELPLINE_NUMBERS = [
  { labelEn: "Founder Direct", labelHi: "संस्थापक हॉटलाइन", number: "+91 6200087830", cleanNo: "916200087830" },
  { labelEn: "Emergency Support", labelHi: "इमरजेंसी सपोर्ट", number: "+91 9934276622", cleanNo: "919934276622" },
  { labelEn: "24/7 Care Desk", labelHi: "24/7 केयर डेस्क", number: "+91 7667352632", cleanNo: "917667352632" },
  { labelEn: "Senior Coordinator", labelHi: "वरिष्ठ कॉर्डिनेटर", number: "+91 78271 80077", cleanNo: "917827180077" }
];

// TOP 3 CORE HEALTHCARE PILLARS OF SEHAAT SAATHI
export const CORE_HEALTHCARE_PILLARS = [
  {
    id: 'nursing_pillar',
    titleEn: '1. EXPERT HOME NURSING & CLINICAL CARE',
    titleHi: '1. एक्सपर्ट होम नर्सिंग व क्लिनिकल केयर 👩‍⚕️',
    badge: '👑 CORE PILLAR #1 (HIGHLIGHTED)',
    color: 'emerald',
    icon: '👩‍⚕️',
    taglineEn: 'Certified B.Sc/GNM Staff Nurses for Injections, IV Drips, Dressings, Catheters & Post-Surgery Care at Home',
    taglineHi: 'बी.एससी/जीएनएम नर्स द्वारा घर पर ही इंजेक्शन, ड्रिप, पट्टी, कैथेटर व ऑपरेशन के बाद की देखभाल'
  },
  {
    id: 'elderly_pillar',
    titleEn: '2. SENIOR CITIZEN & ELDERLY MEDICAL HOME CARE',
    titleHi: '2. बुजुर्गों व वरिष्ठ नागरिकों के लिए होम मेडिकल केयर 👴',
    badge: '👑 CORE PILLAR #2 (HIGHLIGHTED)',
    color: 'amber',
    icon: '👴',
    taglineEn: 'Dedicated Staff Nurse & Attendants for Elderly Patients Unable to Visit Hospitals Frequently',
    taglineHi: 'बार-बार अस्पताल न जा सकने वाले बुजुर्गों के लिए घर पर ही समर्पित स्टाफ नर्स, फिजियो व केयर अटेंडेंट की सेवा'
  },
  {
    id: 'physio_pillar',
    titleEn: '3. SPECIALIZED HOME PHYSIOTHERAPY & REHAB',
    titleHi: '3. स्पेशलाइज्ड होम फिजियोथेरेपी व लोकल रिहैब 🦾',
    badge: '👑 CORE PILLAR #3 (HIGHLIGHTED)',
    color: 'purple',
    icon: '🦾',
    taglineEn: 'Doctorate BPT/MPT Physiotherapists at Home for Stroke Paralysis, Knee Pain & Machine Therapy',
    taglineHi: 'फिजियो डॉक्टर द्वारा घर आकर लकवा (Stroke), घुटने व कमर दर्द का मशीन से पक्का इलाज'
  }
];

export const HOME_HEALTHCARE_CATEGORIES = [
  {
    id: 'physio',
    titleEn: '🦾 Home Physiotherapy & Local Rehab (HIGHLIGHTED)',
    titleHi: '🦾 होम फिजियोथेरेपी (आपके घर पर फिजियो डॉक्टर)',
    icon: '🦾',
    badge: '★ TOP FEATURED SERVICE',
    color: 'purple',
    descEn: 'Expert BPT/MPT physiotherapists for paralysis stroke rehab, joint pain, backache, knee replacement recovery & TENS machine therapy at your home.',
    descHi: 'घर पर फिजियो डॉक्टर - लकवा (Stroke), घुटना व कमर दर्द, रीढ़ की हड्डी और ऑपरेशन के बाद मशीन थेरेपी से पक्का इलाज।'
  },
  {
    id: 'nursing',
    titleEn: 'Nursing & Clinical Patient Care',
    titleHi: 'होम नर्सिंग और मेडिकल देखभाल 👩‍⚕️',
    icon: '👩‍⚕️',
    badge: 'Popular for Post-Hospital',
    color: 'emerald',
    descEn: 'Professional B.Sc & GNM certified home nurses for injection, wound dressing, IV drip, post-op care & vital monitoring.',
    descHi: 'अनुभवी नर्स घर पर इंजेक्शन, पट्टी, ड्रिप, सर्जरी के बाद की देखभाल और ब्लड प्रेशर/शुगर जांच के लिए।'
  },
  {
    id: 'elderly',
    titleEn: 'Senior Citizen Elder Healthcare',
    titleHi: 'वरिष्ठ नागरिक एवं बुजुर्ग देखभाल (Senior Citizen Care) 👴',
    icon: '👴',
    badge: 'Dedicated Elder Support',
    color: 'amber',
    descEn: 'Dedicated staff nurse & patient attendants for elderly care, daily hygiene, feeding, mobility assistance & 12/24 hour shift support.',
    descHi: 'अस्पताल जाने में असमर्थ बुजुर्गों के लिए घर पर मेडिकल केयर, दवा प्रबंधन, वाइटल चेकिंग और 12/24 घंटे केयर।'
  },
  {
    id: 'diagnostics',
    titleEn: 'Home Diagnostics & Lab Sample',
    titleHi: 'घर पर ब्लड टेस्ट और ईसीजी जांच 🧪',
    icon: '🧪',
    badge: 'Same-Day Digital Reports',
    color: 'cyan',
    descEn: 'Hassle-free blood sample collection, ECG test at home, diabetes panel, lipid profile & routine lab diagnostics.',
    descHi: 'घर से खून का सैंपल उठाना, घर पर ही ECG टेस्ट करना और डिजिटल रिपोर्ट व्हाट्सएप पर पाना।'
  }
];

export const HEALTHCARE_SERVICES_LIST = [
  // 1. EXPANDED PHYSIOTHERAPY SERVICES
  {
    id: 'p1',
    categoryId: 'physio',
    titleEn: 'Neuro Stroke & Paralysis Home Physiotherapy',
    titleHi: 'लकवा (Paralysis & Stroke) होम फिजियोथेरेपी 🦾',
    startingPrice: 599,
    priceUnit: 'per session (45-60 Mins)',
    duration: '45 - 60 Mins',
    rating: 5.0,
    reviewsCount: 380,
    badge: '🔥 #1 Physio Service in Madhubani',
    icon: '🧠',
    highlightFeaturesEn: [
      "📍 Madhubani Town & Nearby 1-10 KM Surrounding Radius",
      "⚡ TENS / Muscle Stimulator Machine Therapy Included",
      "🚶 Balance, Walking & Gait Training Exercises",
      "📈 Weekly Recovery Assessment & Doctor Report"
    ],
    highlightFeaturesHi: [
      "📍 मधुबनी टाउन और आसपास 1 से 10 किमी क्षेत्र में होम विज़िट",
      "⚡ नसों को एक्टिव करने वाली इलेक्ट्रिक स्टिम्युलेटर मशीन",
      "🚶 संतुलन और खुद से चलने का अभ्यास",
      "📈 हर हफ्ते रिकवरी रिपोर्ट और लचक जांच"
    ],
    includesEn: [
      'Neurological Reflex & Muscle Tone Activation',
      'Electrical Stimulation Therapy for Weak Limbs',
      'Passive & Active Range of Motion Drills',
      'Wheelchair to Bed Transfer & Fall Prevention Training'
    ],
    includesHi: [
      'कमजोर नसों और मांसपेशियों की इलेक्ट्रिक थेरेपी',
      'हाथ-पैर को हिलाने-डुलाने और मोड़ने की कसरत',
      'बिस्तर से उठने और चलने का विशेष अभ्यास',
      'मरीज को गिरने से बचाने और बैलेंस बनाने की ट्रेनिंग'
    ]
  },
  {
    id: 'p2',
    categoryId: 'physio',
    titleEn: 'Knee & Hip Joint Replacement Rehab',
    titleHi: 'घुटने व कूल्हे के ऑपरेशन के बाद की फिजियोथेरेपी 🦴',
    startingPrice: 549,
    priceUnit: 'per session',
    duration: '45 Mins',
    rating: 4.9,
    reviewsCount: 290,
    badge: '🦴 Post-Op Ortho Specialist',
    icon: '🦴',
    highlightFeaturesEn: [
      "🦴 Knee Bending & Stiffness Removal Protocol",
      "⚡ Ultrasound & Deep Tissue Pain Relief",
      "🚶 Walker to Independent Stair Climbing Training",
      "🛡️ Certified MPT Orthopedic Doctor Visit"
    ],
    highlightFeaturesHi: [
      "🦴 घुटना मोड़ने और जकड़न दूर करने की कसरत",
      "⚡ अल्ट्रासाउंड मशीन से अंदरूनी दर्द का इलाज",
      "🚶 वॉकर छुड़ाकर सीढ़ी चढ़ने की ट्रेनिंग",
      "🛡️ एमपीटी (MPT Ortho) डिग्री धारी फिजियो डॉक्टर"
    ],
    includesEn: [
      'Post-Surgical Joint Stiffness Recovery Exercises',
      'Ultrasonic Wave Pain Relief Therapy',
      'Strengthening Quad & Hamstring Muscles',
      'Home Ergonomics & Walking Frame Transition'
    ],
    includesHi: [
      'ऑपरेशन के बाद जकड़े जोड़ों की मालिश व एक्सरसाइज',
      'अल्ट्रासाउंड मशीन से सूजन और दर्द कम करना',
      'जांघों की मांसपेशियों को मजबूत करना',
      'बिना सहारे चलने का अभ्यास'
    ]
  },
  {
    id: 'p3',
    categoryId: 'physio',
    titleEn: 'Sciatica, Back Pain & Frozen Shoulder Physio',
    titleHi: 'कमर दर्द, साइटिका व कंधे की जकड़न (Frozen Shoulder) थेरेपी ⚡',
    startingPrice: 499,
    priceUnit: 'per session',
    duration: '45 Mins',
    rating: 4.9,
    reviewsCount: 310,
    badge: '⚡ Instant Pain Relief',
    icon: '⚡',
    highlightFeaturesEn: [
      "⚡ Portable TENS Pain Reliever Machine",
      "💆 Shoulder Joint Mobilization & Stretches",
      "🧘 Spinal Decompression & Core Strengthening",
      "🏠 Ergo Sitting & Sleeping Posture Guide"
    ],
    highlightFeaturesHi: [
      "⚡ घर पर TENS पेन रिलीफ मशीन थेरेपी",
      "💆 जाम कंधे (Frozen Shoulder) को खोलने की कसरत",
      "🧘 रीढ़ की हड्डी (Spine) और साइटिका दर्द का इलाज",
      "🏠 सही बैठने व सोने का तरीका बताना"
    ],
    includesEn: [
      'TENS Nerve Pain Relief Therapy at Home',
      'Frozen Shoulder Capsule Release Mobilization',
      'Lumbar Spine Core Muscle Traction Drills',
      'Postural Correction & Ergonomic Plan'
    ],
    includesHi: [
      'नसों के खिंचाव और कमर दर्द की TENS मशीन थेरेपी',
      'जाम कंधे की लचक वापस लाने का अभ्यास',
      'कमर के निचले हिस्से का दर्द दूर करने की थेरेपी',
      'सही पोश्चर और तकिया-बिस्तर गाइड'
    ]
  },
  {
    id: 'p4',
    categoryId: 'physio',
    titleEn: 'Elderly Mobility & Fall Prevention Physio',
    titleHi: 'बुजुर्गों के लिए लचक व चलने-फिरने की फिजियोथेरेपी 👴',
    startingPrice: 449,
    priceUnit: 'per session',
    duration: '45 Mins',
    rating: 4.8,
    reviewsCount: 220,
    badge: '👵 Senior Citizen Special',
    icon: '👵',
    highlightFeaturesEn: [
      "👵 Gentle Mobility Drills for Senior Citizens",
      "🚶 Balance Enhancement & Dizziness Reduction",
      "💪 Muscle Wasting Recovery Exercises",
      "🏠 Home Safety Modifications Guidance"
    ],
    highlightFeaturesHi: [
      "👵 बुजुर्गों के लिए हल्की व आरामदायक कसरत",
      "🚶 चक्कर आने और डगमगाने की समस्या का इलाज",
      "💪 कमजोर मांसपेशियों को ताकत देने का अभ्यास",
      "🏠 घर में बाथरूम व कमरे की सेफ्टी गाइड"
    ],
    includesEn: [
      'Gentle Joint Lubrication & Flexibility Exercises',
      'Balance Training to Prevent Accidental Falls',
      'Leg Muscle Endurance Building',
      'Home Hazard Audit for Senior Safety'
    ],
    includesHi: [
      'जोड़ों के दर्द और अकड़न की हल्की मालिश व कसरत',
      'बुजुर्गों को गिरने से बचाने के लिए संतुलन ट्रेनिंग',
      'पैरों की पकड़ मजबूत करने का अभ्यास',
      'सीढ़ी व बाथरूम में सुरक्षा सुझाव'
    ]
  },

  // 2. NURSING CARE
  {
    id: 'n1',
    categoryId: 'nursing',
    titleEn: 'Certified Home Nursing Visit',
    titleHi: 'होम नर्सिंग विज़िट (स्टाफ नर्स) 👩‍⚕️',
    startingPrice: 399,
    priceUnit: 'per visit',
    duration: '1 - 2 Hours',
    rating: 4.9,
    reviewsCount: 184,
    badge: '🔥 B.Sc/GNM Registered Nurse',
    icon: '👩‍⚕️',
    highlightFeaturesEn: [
      "⚡ 30-Minute Rapid Home Arrival in Madhubani",
      "🩺 Free BP, SpO2 & Blood Sugar Check",
      "🛡️ 100% Background-Verified Nurses",
      "📄 Direct Digital Doctor Report Sync"
    ],
    highlightFeaturesHi: [
      "⚡ मधुबनी टाउन में 30 मिनट में घर पहुँचने की गारंटी",
      "🩺 बीपी, ऑक्सीजन व शुगर जांच फ्री",
      "🛡️ 100% पुलिस व अस्पताल सत्यापित नर्स",
      "📄 डॉक्टर को तुरंत डिजिटल रिपोर्ट भेजना"
    ],
    includesEn: [
      'Vital Signs Checking (BP, SpO2, Pulse, Temp)',
      'Medication Administration & IV Drip Setup',
      'Blood Sugar Testing (Glucometer)',
      'Patient Hygiene Check & Doctor Report Update'
    ],
    includesHi: [
      'बीपी, ऑक्सीजन, पल्स और बुखार जांच',
      'डॉक्टर की दवाइयां देना व आईवी ड्रिप लगाना',
      'ब्लड शुगर (शुगर) टेस्ट करना',
      'मरीज की स्थिति की रिपोर्ट डॉक्टर को भेजना'
    ]
  },
  {
    id: 'n2',
    categoryId: 'nursing',
    titleEn: 'Injection & Wound Dressing Care',
    titleHi: 'इंजेक्शन व घाव की ड्रेसिंग (पट्टी) 🩹',
    startingPrice: 249,
    priceUnit: 'per session',
    duration: '30 - 45 Mins',
    rating: 4.8,
    reviewsCount: 230,
    badge: '✨ Sterile Kit Guaranteed',
    icon: '🩹',
    highlightFeaturesEn: [
      "✨ 100% Sterile Disposable Equipment",
      "💉 Painless IV / IM Injection Technique",
      "🩹 Diabetic Wound & Suture Removal Specialist",
      "🚀 Same-Day Slot Availability"
    ],
    highlightFeaturesHi: [
      "✨ 100% नई और बैक्टीरिया-मुक्त किट",
      "💉 बिना दर्द वाली इंजेक्शन तकनीक",
      "🩹 शुगर घाव और टांके खोलने में माहिर",
      "🚀 तुरंत स्लॉट बुकिंग उपलब्ध"
    ],
    includesEn: [
      'Sterile Wound Cleaning & Bandage Change',
      'IM / IV / Subcutaneous Injection Admin',
      'Suture Removal & Diabetic Foot Care',
      'Antiseptic Infection Control Protocol'
    ],
    includesHi: [
      'साफ-सुथरे तरीके से घाव की सफाई और पट्टी बदलना',
      'आईएम/आईवी इंजेक्शन व सुई लगाना',
      'टांके खोलना और शुगर के मरीजों की पट्टी',
      'इंफेक्शन रोकने की पूरी सावधानी'
    ]
  },
  {
    id: 'n3',
    categoryId: 'nursing',
    titleEn: 'Post-Surgery Clinical Home Care',
    titleHi: 'सर्जरी के बाद घर पर देखभाल (Post-Op) 🩺',
    startingPrice: 799,
    priceUnit: 'per shift (4-6 Hrs)',
    duration: '4 - 6 Hours',
    rating: 5.0,
    reviewsCount: 140,
    badge: '🏥 ICU Experienced Nurse',
    icon: '🩺',
    highlightFeaturesEn: [
      "🏥 Hospital ICU Trained Nursing Staff",
      "💧 Catheter, Ryles Tube & Drainage Care",
      "💊 Pain Management & Continuous IV Monitoring",
      "📞 24/7 Founder Supervision Support"
    ],
    highlightFeaturesHi: [
      "🏥 आईसीयू में काम कर चुकी स्पेशल नर्स",
      "💧 नली (Tube), कैथेटर और यूरिन बैग केयर",
      "💊 दर्द कम करने वाली आईवी ड्रिप केयर",
      "📞 24 घंटे संस्थापक की सीधी देखरेख"
    ],
    includesEn: [
      'Surgical Site Infection Monitoring',
      'Catheter Care & Urine Bag Hygiene',
      'Pain Management & IV Medication Flow',
      'Ryles Tube Feeding & Oxygen Support Setup'
    ],
    includesHi: [
      'ऑपरेशन के बाद घाव की देखभाल व इंफेक्शन से बचाव',
      'कैथेटर और यूरीन बैग की सफाई व देखभाल',
      'दर्द कम करने वाली दवा व ड्रिप लगाना',
      'नली (Ryles Tube) से खाना और ऑक्सीजन मॉनिटर'
    ]
  },

  // 3. ELDERLY CARE
  {
    id: 'e1',
    categoryId: 'elderly',
    titleEn: 'Senior Citizen Healthcare & Attendant Visit',
    titleHi: 'वरिष्ठ नागरिक देखभाल एवं अटेंडेंट विज़िट 👴',
    startingPrice: 699,
    priceUnit: 'per 12-Hour Shift',
    duration: '12 Hours Day / Night',
    rating: 4.9,
    reviewsCount: 310,
    badge: '❤️ Professional Elder Care',
    icon: '👴',
    highlightFeaturesEn: [
      "❤️ Dedicated Staff Nurse & Medical Caregiver",
      "🩺 Regular Vital Signs & Medication Monitoring",
      "💊 Timely Diet & Health Management",
      "🚶 Mobility & Comfortable Bedside Support"
    ],
    highlightFeaturesHi: [
      "❤️ अस्पताल न आ सकने वाले बुजुर्गों हेतु समर्पित नर्स/अटेंडेंट",
      "🩺 नियमित बीपी, शुगर व वाइटल्स चेकिंग",
      "💊 समय पर दवा व स्वास्थ्य प्रबंधन",
      "🚶 आरामदायक बेडसाइड व मोबिलिटी सपोर्ट"
    ],
    includesEn: [
      'Bedside Health & Vital Monitoring',
      'Timely Oral Medication & Diet Assistance',
      'Wheelchair Mobility & Comfortable Support',
      'Companionship & Daily Health Status Report'
    ],
    includesHi: [
      'घर पर वाइटल और स्वास्थ्य निगरानी',
      'समय पर दवा खिलाना और पौष्टिक भोजन',
      'व्हीलचेयर व आरामदायक देखभाल',
      'बुजुर्गों का ध्यान रखना और रोज स्टेटस रिपोर्ट'
    ]
  },
  {
    id: 'e2',
    categoryId: 'elderly',
    titleEn: '24/7 Full Day Senior Citizen Medical Support',
    titleHi: '24 घंटे का फुल-डे सीनियर सिटीजन होम केयर 🏠',
    startingPrice: 1299,
    priceUnit: 'per 24 Hours',
    duration: '24 Hours Full Day',
    rating: 4.9,
    reviewsCount: 195,
    badge: '🌙 24/7 Complete Support',
    icon: '🏠',
    highlightFeaturesEn: [
      "🌙 Continuous 24-Hour Bedside Medical Stay",
      "🛌 Bedsore Prevention & Position Turning",
      "📊 Daily Vital Signs & Health Logbook",
      "📞 Direct Replacement Guarantee if Absent"
    ],
    highlightFeaturesHi: [
      "🌙 24 घंटे अस्पताल जैसी घर पर ही देखरेख",
      "🛌 बेडसोर से बचाव हेतु सही पोजीशनिंग",
      "📊 रोज वाइटल्स व दवा की डायरी",
      "📞 बैकअप स्टाफ की तुरंत गारंटी"
    ],
    includesEn: [
      'Round-the-Clock Bedside Assistance',
      'Bedridden Patient Position Turning (Prevents Bedsores)',
      'Full Hygiene Care & Medication Management',
      'Direct Care Coordinator Daily Status Reports'
    ],
    includesHi: [
      'दिन-रात मरीज के पास रहकर पूरी मदद करना',
      'बिस्तर पर पड़े मरीज की करवट बदलना (घाव रोकने हेतु)',
      'सफाई, दवा प्रबंधन और स्वास्थ्य रिपोर्ट',
      'केयर कॉर्डिनेटर द्वारा रोज स्टेटस अपडेट'
    ]
  },

  // 4. DIAGNOSTICS
  {
    id: 'd1',
    categoryId: 'diagnostics',
    titleEn: 'Full Body Blood Profile & Sample Collection',
    titleHi: 'घर पर फुल बॉडी ब्लड टेस्ट व सैंपल कलेक्शन 🧪',
    startingPrice: 499,
    priceUnit: 'per package',
    duration: '15 Mins Collection',
    rating: 4.9,
    reviewsCount: 420,
    badge: '🔬 NABL Certified Lab',
    icon: '🧪',
    highlightFeaturesEn: [
      "🔬 Free Painless Home Sample Pick-up",
      "📄 12-Hour WhatsApp PDF Delivery",
      "🩸 CBC + Kidney + Liver + Thyroid + Diabetes",
      "🏷️ 100% NABL Accredited Reports"
    ],
    highlightFeaturesHi: [
      "🔬 घर आकर बिना दर्द के सैंपल लेना",
      "📄 12 घंटे में व्हाट्सएप पर PDF रिपोर्ट",
      "🩸 सीबीसी, किडनी, लिवर, थायरॉइड व शुगर",
      "🏷️ 100% NABL लैब द्वारा प्रमाणित जांच"
    ],
    includesEn: [
      'Free Home Sample Collection by Certified Phlebotomist',
      'Complete Blood Count (CBC) + Thyroid + Kidney + Liver',
      'Fasting Blood Sugar & HbA1c',
      'Digital PDF Report on WhatsApp within 12 Hours'
    ],
    includesHi: [
      'घर पर आकर सुरक्षित खून का सैंपल लेना (कोई एक्सट्रा चार्ज नहीं)',
      'सीबीसी, थायरॉइड, किडनी और लिवर की पूरी जांच',
      'फास्टिंग शुगर और 3 महीने की शुगर जांच (HbA1c)',
      '12 घंटे में व्हाट्सएप पर डिजिटल रिपोर्ट'
    ]
  },
  {
    id: 'd2',
    categoryId: 'diagnostics',
    titleEn: 'ECG Test at Home (12-Lead Digital)',
    titleHi: 'घर पर ईसीजी टेस्ट (ECG at Home) 🫀',
    startingPrice: 349,
    priceUnit: 'per test',
    duration: '20 Mins',
    rating: 5.0,
    reviewsCount: 175,
    badge: '🫀 Cardiologist Signed',
    icon: '🫀',
    highlightFeaturesEn: [
      "🫀 12-Lead Bedside Portable ECG Device",
      "⚡ Instant Heart Rhythm Graph",
      "👨‍⚕️ Cardiologist Signed Final Report",
      "🚨 Emergency Anomaly Call Back"
    ],
    highlightFeaturesHi: [
      "🫀 12-लीड डिजिटल पोर्टेबल ईसीजी मशीन",
      "⚡ तुरंत दिल की धड़कन का सटीक ग्राफ",
      "👨‍⚕️ एमडी कार्डियोलॉजिस्ट द्वारा साइन रिपोर्ट",
      "🚨 गड़बड़ी होने पर डॉक्टर द्वारा तुरंत कॉल"
    ],
    includesEn: [
      '12-Lead Portable Digital ECG at Patient Bedside',
      'Instant AI Electrocardiogram Waveform Analysis',
      'Verified Cardiologist Signed Report',
      'Emergency Rhythm Anomaly Alert'
    ],
    includesHi: [
      'घर पर बिस्तर के पास पोर्टेबल डिजिटल ईसीजी जांच',
      'हार्ट की धड़कन का तुरंत सटीक ग्राफ',
      'एमडी कार्डियोलॉजिस्ट डॉक्टर द्वारा साइन की हुई रिपोर्ट',
      'इमरजेंसी होने पर तुरंत अलर्ट'
    ]
  }
];

export const VERIFIED_HOME_PROVIDERS = [
  {
    id: 'pr2',
    name: 'Dr. Amit Sharma (PT)',
    roleEn: 'Senior Neuro & Ortho Physiotherapist',
    roleHi: 'सीनियर फिजियोथेरेपिस्ट (MPT Ortho)',
    qualification: 'MPT Orthopaedics, BPT (Doctorate)',
    experience: '11 Years Exp',
    rating: 5.0,
    reviews: 215,
    location: 'Station Road, Madhubani',
    badge: 'Physio Specialist 🦾',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    skills: ['Stroke Paralysis Rehab', 'Knee Joint Physio', 'TENS Machine', 'Spine Rehab']
  },
  {
    id: 'pr1',
    name: 'Sunita Kumari',
    roleEn: 'Senior Certified Home Nurse',
    roleHi: 'सीनियर बी.एससी नर्सिंग स्टाफ',
    qualification: 'B.Sc Nursing (Registered Nurse)',
    experience: '8 Years Exp',
    rating: 4.9,
    reviews: 142,
    location: 'Sankar Chowk, Madhubani',
    badge: 'Verified Nurse 🟢',
    photo: 'https://images.unsplash.com/photo-1594824813571-2b533411efa0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    skills: ['Post-Op Care', 'IV Injection', 'Catheter Care', 'Vital Sync']
  },
  {
    id: 'pr3',
    name: 'Rajesh Kumar Yadav',
    roleEn: 'Senior Elderly Patient Attendant',
    roleHi: 'अनुभवी बुजुर्ग देखभाल अटेंडेंट',
    qualification: 'Diploma in Elderly Caregiving',
    experience: '7 Years Exp',
    rating: 4.8,
    reviews: 180,
    location: 'Benipatti, Madhubani',
    badge: 'Background Verified 🛡️',
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    skills: ['Elder Care', 'Diaper Change', 'Mobility Support', '24-Hr Shift']
  },
  {
    id: 'pr4',
    name: 'Deepak Verma',
    roleEn: 'Senior Phlebotomist & Lab Tech',
    roleHi: 'सीनियर ब्लड सैंपल लैब टेक्निशियन',
    qualification: 'DMLT Certified Lab Technician',
    experience: '9 Years Exp',
    rating: 4.9,
    reviews: 165,
    location: 'Pandaul, Madhubani',
    badge: 'Painless Sampling 🧪',
    photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    skills: ['Home Blood Collection', 'ECG at Home', 'Sample Cold Chain', 'WhatsApp PDF']
  }
];

export const SERVICE_LOCATIONS_LIST = [
  "Madhubani Town (Central)", "Sankar Chowk", "Station Road", "Ranti (1-5 KM)",
  "Rahika (5 KM)", "Rajnagar (8 KM)", "Pandaul (10 KM)", "Bhagwanpur (5 KM)"
];
