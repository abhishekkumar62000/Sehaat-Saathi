// Sehaat Saathi Home Healthcare Services Database (Madhubani, Darbhanga, Bihar Network)

export const HOME_HEALTHCARE_CATEGORIES = [
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
    titleEn: 'Elder & Assisted Care',
    titleHi: 'बुजुर्गों और बीमारों की देखभाल (Elder Care) 👴',
    icon: '👴',
    badge: '24/7 Dedicated Caregivers',
    color: 'amber',
    descEn: 'Trained patient attendants for elderly care, daily hygiene, feeding, mobility assistance & 12/24 hour shift support.',
    descHi: 'बुजुर्गों के लिए भरोसेमंद अटेंडेंट - खाना खिलाना, दवा देना, टहलाना और 12 या 24 घंटे की केयर।'
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
  },
  {
    id: 'physio',
    titleEn: 'Home Physiotherapy & Rehab',
    titleHi: 'घर पर फिजियोथेरेपी (फिजियो डॉक्टर) 🦾',
    icon: '🦾',
    badge: 'Certified Physio Specialists',
    color: 'purple',
    descEn: 'Expert BPT/MPT physiotherapists for paralysis stroke rehab, joint pain, backache, knee replacement recovery.',
    descHi: 'लकवा, पैर-पीठ दर्द, जोड़ों के दर्द और ऑपरेशन के बाद घर पर कसरत और फिजियोथेरेपी।'
  }
];

export const HEALTHCARE_SERVICES_LIST = [
  // 1. Nursing
  {
    id: 'n1',
    categoryId: 'nursing',
    titleEn: 'Certified Home Nursing Visit',
    titleHi: 'होम नर्सिंग विज़िट (स्टाफ नर्स)',
    startingPrice: 399,
    priceUnit: 'per visit',
    duration: '1 - 2 Hours',
    rating: 4.9,
    reviewsCount: 184,
    badge: 'Highly Requested',
    icon: '👩‍⚕️',
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
    titleHi: 'इंजेक्शन व घाव की ड्रेसिंग (पट्टी)',
    startingPrice: 249,
    priceUnit: 'per session',
    duration: '30 - 45 Mins',
    rating: 4.8,
    reviewsCount: 230,
    badge: 'Quick Service',
    icon: '🩹',
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
    titleHi: 'सर्जरी के बाद घर पर देखभाल (Post-Op)',
    startingPrice: 799,
    priceUnit: 'per shift (4-6 Hrs)',
    duration: '4 - 6 Hours',
    rating: 5.0,
    reviewsCount: 140,
    badge: 'Specialized Care',
    icon: '🩺',
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

  // 2. Elderly Care
  {
    id: 'e1',
    categoryId: 'elderly',
    titleEn: 'Elderly Patient Daily Caregiver Attendant',
    titleHi: 'बुजुर्ग मरीज देखभाल अटेंडेंट (Caregiver)',
    startingPrice: 699,
    priceUnit: 'per 12-Hour Shift',
    duration: '12 Hours Day / Night',
    rating: 4.9,
    reviewsCount: 310,
    badge: 'Top Rated in Madhubani',
    icon: '👴',
    includesEn: [
      'Assistance in Bathing, Grooming & Toilet',
      'Timely Oral Medication & Diet Assistance',
      'Wheelchair Mobility & Walking Support',
      'Companionship & Vital Recording'
    ],
    includesHi: [
      'नहलाने, कपड़े बदलने और टॉयलेट में मदद',
      'समय पर दवा खिलाना और खाना देना',
      'व्हीलचेयर और टहलाने में मदद',
      'बुजुर्गों का ध्यान रखना और बीपी/शुगर नोट करना'
    ]
  },
  {
    id: 'e2',
    categoryId: 'elderly',
    titleEn: '24/7 Full Day Patient Caregiver',
    titleHi: '24 घंटे का फुल-डे मरीज केयरगिवर',
    startingPrice: 1299,
    priceUnit: 'per 24 Hours',
    duration: '24 Hours Full Day',
    rating: 4.9,
    reviewsCount: 195,
    badge: '24/7 Full Support',
    icon: '🏠',
    includesEn: [
      'Round-the-Clock Bedside Assistance',
      'Bedridden Patient Position Turning (Prevents Bedsores)',
      'Full Hygiene Care, Diaper Change & Feeding',
      'Direct Care Coordinator Daily Status Reports'
    ],
    includesHi: [
      'दिन-रात मरीज के पास रहकर पूरी मदद करना',
      'बिस्तर पर पड़े मरीज की करवट बदलना (घाव रोकने हेतु)',
      'डायपर बदलना, सफाई और खाना खिलाना',
      'केयर कॉर्डिनेटर द्वारा रोज स्टेटस अपडेट'
    ]
  },

  // 3. Diagnostics
  {
    id: 'd1',
    categoryId: 'diagnostics',
    titleEn: 'Full Body Blood Profile & Sample Collection',
    titleHi: 'घर पर फुल बॉडी ब्लड टेस्ट व सैंपल कलेक्शन',
    startingPrice: 499,
    priceUnit: 'per package',
    duration: '15 Mins Collection',
    rating: 4.9,
    reviewsCount: 420,
    badge: 'NABL Certified Partner',
    icon: '🧪',
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
    titleHi: 'घर पर ईसीजी टेस्ट (ECG at Home)',
    startingPrice: 349,
    priceUnit: 'per test',
    duration: '20 Mins',
    rating: 5.0,
    reviewsCount: 175,
    badge: 'Instant Doctor Signed PDF',
    icon: '🫀',
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
  },

  // 4. Physiotherapy
  {
    id: 'p1',
    categoryId: 'physio',
    titleEn: 'Neuro Stroke & Paralysis Rehab Physiotherapy',
    titleHi: 'लकवा (Stroke/Paralysis) फिजियोथेरेपी',
    startingPrice: 599,
    priceUnit: 'per 45-min session',
    duration: '45 - 60 Mins',
    rating: 5.0,
    reviewsCount: 280,
    badge: 'Expert BPT/MPT Doctor',
    icon: '🦾',
    includesEn: [
      'Muscle Strength & Nerve Stimulation Therapy',
      'Gait Training & Balance Restoration',
      'Joint Mobilization & Range of Motion Exercises',
      'Custom Rehabilitation Progress Tracker'
    ],
    includesHi: [
      'मांसपेशियों की मजबूती और नसों की थेरेपी',
      'चलने का अभ्यास (Gait Training) और संतुलन सुधार',
      'जोड़ों को हिलाने-डुलाने की कसरत',
      'हर हफ्ते मरीज की रिकवरी रिपोर्ट'
    ]
  },
  {
    id: 'p2',
    categoryId: 'physio',
    titleEn: 'Joint Pain, Back & Knee Physio Care',
    titleHi: 'कमर, घुटना व जोड़ों के दर्द की फिजियोथेरेपी',
    startingPrice: 499,
    priceUnit: 'per session',
    duration: '45 Mins',
    rating: 4.8,
    reviewsCount: 340,
    badge: 'Pain Relief Protocol',
    icon: '🦵',
    includesEn: [
      'TENS / Ultrasound Therapy for Deep Pain Relief',
      'Spine & Knee Alignment Mobility Drills',
      'Post-Fracture Stiffness Recovery',
      'Ergonomic Home Care Guidance'
    ],
    includesHi: [
      'दर्द कम करने वाली TENS अल्ट्रासाउंड मशीन थेरेपी',
      'कमर और घुटने की कसरत और लचक बढ़ाना',
      'प्लास्टर/प्लास्टर कटने के बाद का दर्द दूर करना',
      'घर पर उठने-बैठने का सही तरीका बताना'
    ]
  }
];

export const VERIFIED_HOME_PROVIDERS = [
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
    id: 'pr2',
    name: 'Dr. Amit Sharma (PT)',
    roleEn: 'Senior Neuro & Ortho Physiotherapist',
    roleHi: 'सीनियर फिजियोथेरेपिस्ट (MPT Ortho)',
    qualification: 'MPT Orthopaedics, BPT',
    experience: '11 Years Exp',
    rating: 5.0,
    reviews: 215,
    location: 'Station Road, Madhubani',
    badge: 'Physio Specialist 🦾',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    skills: ['Paralysis Rehab', 'Knee Joint Physio', 'Spine Rehab', 'Stroke Care']
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
  "Madhubani Central", "Sankar Chowk", "Station Road", "Rajnagar", "Bhagwanpur", "Ranti",
  "Rahika", "Khajauli", "Jaynagar", "Pandaul", "Sakri", "Benipatti", "Jhanjharpur",
  "Phulparas", "Kaluahi", "Laukahi", "Babu Barhi", "Darbhanga", "Patna"
];
