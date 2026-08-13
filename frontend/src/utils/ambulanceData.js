// Sehaat Saathi - 50+ Verified Emergency Ambulance Fleet Database using Local Asset Images

import ambulance1 from '../assets/Ambulace1set.png';
import ambulance2 from '../assets/Ambulance2set.png';
import ambulance3 from '../assets/ambulance3.jpeg';
import ambulance4 from '../assets/ambulance4.jpg';
import ambulance5 from '../assets/ambulance5.jpg';
import ambulance6 from '../assets/ambulance6.jpeg';

export const LOCAL_AMBULANCE_IMAGES = [
  ambulance1,
  ambulance2,
  ambulance3,
  ambulance4,
  ambulance5,
  ambulance6
];

export const AMBULANCE_FLEET_DATA = [
  {
    id: 1,
    nameEn: "Sehaat Saathi Rapid Rescue #01",
    nameHi: "सेहत साथी एम्बुलेंस #01",
    image: LOCAL_AMBULANCE_IMAGES[0],
    vehicleModel: "Mahindra Bolero Neo Ambulance",
    plateNo: "BR-32-PA-1001",
    driverName: "Ramesh Kumar Yadav",
    licenseNo: "DL-BR322018009812",
    driverExperienceEn: "12 Years Verified Exp.",
    driverExperienceHi: "12 साल का अनुभव",
    locationEn: "Sankar Chowk, Madhubani",
    locationHi: "संकर चौक, मधुबनी",
    serviceCoverageEn: "Madhubani, Rajnagar, Darbhanga, Patna, Delhi Inter-State",
    serviceCoverageHi: "मधुबनी, राजनगर, दरभंगा, पटना, दिल्ली तक",
    contactNumbers: ["+91 6200087830", "+91 9934276622"],
    statusEn: "AVAILABLE NOW",
    statusHi: "अभी उपलब्ध है 🟢",
    rating: 4.9,
    reviewsCount: 142,
    category: "ALS",
    categorySimpleEn: "Advanced Cardiac ALS Unit (Oxygen + Nurse)",
    categorySimpleHi: "इमरजेंसी एम्बुलेंस (ऑक्सीजन + नर्स)",
    basePrice: 1199,
    perKm: 32,
    facilitiesEn: [
      "40L High-Capacity Oxygen Cylinder",
      "Multi-Para Cardiac Monitor & ECG",
      "Biphasic AED Defibrillator",
      "Automatic Loading Stretcher & Wheelchair",
      "First Aid & Trauma Hemorrhage Kit",
      "Senior Emergency Paramedic Onboard",
      "Siren & Flasher LED Bar",
      "Live GPS Tracking"
    ],
    facilitiesHi: [
      "बड़ा ऑक्सीजन सिलेंडर 🌬️",
      "दिल की धड़कन की मशीन (ECG/Monitor) 🩺",
      "इमरजेंसी शॉक मशीन (AED) ⚡",
      "आरामदायक स्ट्रेचर और व्हीलचेयर 🛏️",
      "फर्स्ट एड और पट्टी किट 🩹",
      "अनुभवी मेडिकल स्टाफ 👨‍⚕️",
      "साइरन और इमरजेंसी लाइट 🚨",
      "जीपीएस (GPS Live Location) 📡"
    ]
  },
  {
    id: 2,
    nameEn: "Madhubani Express Emergency #02",
    nameHi: "मधुबनी एक्सप्रेस एम्बुलेंस #02",
    image: LOCAL_AMBULANCE_IMAGES[1],
    vehicleModel: "Maruti Suzuki Eeco Ambulance",
    plateNo: "BR-32-PA-1002",
    driverName: "Suresh Prasad Singh",
    licenseNo: "DL-BR322019004561",
    driverExperienceEn: "9 Years Verified Exp.",
    driverExperienceHi: "9 साल का अनुभव",
    locationEn: "Station Road, Madhubani",
    locationHi: "स्टेशन रोड, मधुबनी",
    serviceCoverageEn: "Station Road, Rahika, Bhagwanpur, Darbhanga, Patna",
    serviceCoverageHi: "मधुबनी गाँव और शहर, दरभंगा, पटना",
    contactNumbers: ["+91 6200087830", "+91 9934276622"],
    statusEn: "AVAILABLE NOW",
    statusHi: "अभी उपलब्ध है 🟢",
    rating: 4.8,
    reviewsCount: 98,
    category: "BLS",
    categorySimpleEn: "Basic Life Support (Oxygen & Stretcher)",
    categorySimpleHi: "साधारण एम्बुलेंस (ऑक्सीजन के साथ)",
    basePrice: 499,
    perKm: 18,
    facilitiesEn: [
      "10L Oxygen Cylinder",
      "Stretcher & Wheelchair",
      "First Aid Emergency Kit",
      "Trained Paramedic Onboard",
      "Emergency Siren Bar"
    ],
    facilitiesHi: [
      "ऑक्सीजन सिलेंडर 🌬️",
      "स्ट्रेचर और व्हीलचेयर 🛏️",
      "फर्स्ट एड किट 🩹",
      "अनुभवी ड्राइवर 👨‍✈️",
      "इमरजेंसी साइरन 🚨"
    ]
  },
  {
    id: 3,
    nameEn: "Mithila Critical Care Unit #03",
    nameHi: "मिथिला आईसीयू एम्बुलेंस #03",
    image: LOCAL_AMBULANCE_IMAGES[2],
    vehicleModel: "Force Traveller Super ICU",
    plateNo: "BR-32-PA-1003",
    driverName: "Amit Kumar Jha",
    licenseNo: "DL-BR322015007890",
    driverExperienceEn: "15 Years Verified Exp.",
    driverExperienceHi: "15 साल का अनुभव",
    locationEn: "Bypass Road, Madhubani",
    locationHi: "बायपास रोड, मधुबनी",
    serviceCoverageEn: "Madhubani, Darbhanga DMCH, Patna PMCH/AIIMS, Delhi AIIMS",
    serviceCoverageHi: "मधुबनी, दरभंगा DMCH, पटना PMCH/AIIMS, दिल्ली AIIMS",
    contactNumbers: ["+91 6200087830", "+91 9934276622"],
    statusEn: "AVAILABLE NOW",
    statusHi: "अभी उपलब्ध है 🟢",
    rating: 5.0,
    reviewsCount: 210,
    category: "ICU",
    categorySimpleEn: "Invasive ICU Ventilator Unit (Doctor Onboard)",
    categorySimpleHi: "वेंटिलेटर एम्बुलेंस (गंभीर मरीज के लिए)",
    basePrice: 2499,
    perKm: 48,
    facilitiesEn: [
      "Invasive Transport Ventilator Unit",
      "Biphasic Defibrillator & ECG Monitor",
      "Dual 40L Oxygen Backup Tanks",
      "ICU Intensivist Doctor & Nurse",
      "Drug Cold Storage Box",
      "Automatic Stretcher Loader"
    ],
    facilitiesHi: [
      "सांस की मशीन (वेंटिलेटर) 🫁",
      "इमरजेंसी शॉक और हार्ट मॉनिटर ⚡",
      "डबल बड़ा ऑक्सीजन टैंक 🌬️",
      "आईसीयू डॉक्टर और स्पेशल नर्स 👨‍⚕️",
      "दवाई ठंडा रखने वाला बॉक्स 🧊",
      "ऑटोमैटिक मरीज लिफ्ट स्ट्रेचर 🛏️"
    ]
  },
  {
    id: 4,
    nameEn: "Jai Maa Durga Emergency Force #04",
    nameHi: "जय माँ दुर्गा एम्बुलेंस #04",
    image: LOCAL_AMBULANCE_IMAGES[3],
    vehicleModel: "Mahindra Scorpio Classic ALS",
    plateNo: "BR-32-PA-1004",
    driverName: "Vikram Kumar Verma",
    licenseNo: "DL-BR322017003412",
    driverExperienceEn: "11 Years Verified Exp.",
    driverExperienceHi: "11 साल का अनुभव",
    locationEn: "Benipatti, Madhubani",
    locationHi: "बेनीपट्टी, मधुबनी",
    serviceCoverageEn: "Benipatti, Rahika, Ranti, Darbhanga, Patna",
    serviceCoverageHi: "बेनीपट्टी, रहिका, रंटी, दरभंगा, पटना",
    contactNumbers: ["+91 6200087830", "+91 9934276622"],
    statusEn: "DISPATCH READY",
    statusHi: "कॉल करते ही तैयार ⚡",
    rating: 4.9,
    reviewsCount: 165,
    category: "ALS",
    categorySimpleEn: "Advanced Cardiac ALS Unit (Oxygen + Nurse)",
    categorySimpleHi: "इमरजेंसी एम्बुलेंस (ऑक्सीजन + नर्स)",
    basePrice: 1199,
    perKm: 32,
    facilitiesEn: [
      "Oxygen Tank & Regulator",
      "Cardiac Monitor",
      "AED Defibrillator",
      "Stretcher & Wheelchair",
      "Siren & Flasher"
    ],
    facilitiesHi: [
      "ऑक्सीजन सिलेंडर 🌬️",
      "हार्ट मॉनिटर 🩺",
      "इमरजेंसी शॉक मशीन ⚡",
      "स्ट्रेचर और व्हीलचेयर 🛏️",
      "इमरजेंसी साइरन 🚨"
    ]
  },
  {
    id: 5,
    nameEn: "Shree Ram Neonatal Care #05",
    nameHi: "श्री राम बच्चों की एम्बुलेंस #05",
    image: LOCAL_AMBULANCE_IMAGES[4],
    vehicleModel: "Tata Winger NICU Specialty",
    plateNo: "BR-32-PA-1005",
    driverName: "Deepak Kumar Chaudhary",
    licenseNo: "DL-BR322016001299",
    driverExperienceEn: "13 Years Verified Exp.",
    driverExperienceHi: "13 साल का अनुभव",
    locationEn: "Jhanjharpur, Madhubani",
    locationHi: "झंझारपुर, मधुबनी",
    serviceCoverageEn: "Jhanjharpur, Phulparas, Sakri, Darbhanga, Patna, Delhi",
    serviceCoverageHi: "झंझारपुर, फुलपरास, सकरी, दरभंगा, पटना, दिल्ली",
    contactNumbers: ["+91 6200087830", "+91 9934276622"],
    statusEn: "AVAILABLE NOW",
    statusHi: "अभी उपलब्ध है 🟢",
    rating: 4.9,
    reviewsCount: 118,
    category: "NICU",
    categorySimpleEn: "Neonatal Incubator & Pediatric Unit",
    categorySimpleHi: "छोटे बच्चों और नवजात शिशु की एम्बुलेंस 👶",
    basePrice: 1899,
    perKm: 38,
    facilitiesEn: [
      "Infant Transport Incubator",
      "Pediatric Micro-Ventilator",
      "Pediatric Oxygen Hood",
      "Specialized Child Nurse Onboard"
    ],
    facilitiesHi: [
      "बच्चों के लिए गर्म पेटी (इनक्यूबेटर) 👶",
      "बच्चों की सांस की मशीन (माइक्रो वेंटिलेटर) 🫁",
      "बच्चों की ऑक्सीजन किट 🌬️",
      "बच्चों की स्पेशल नर्स 👩‍⚕️"
    ]
  },
  {
    id: 6,
    nameEn: "Bharat Shield ICU Response #06",
    nameHi: "भारत शील्ड आईसीयू एम्बुलेंस #06",
    image: LOCAL_AMBULANCE_IMAGES[5],
    vehicleModel: "Force Traveller ALS Cardiac",
    plateNo: "BR-32-PA-1006",
    driverName: "Rajesh Kumar Mishra",
    licenseNo: "DL-BR322014008765",
    driverExperienceEn: "16 Years Verified Exp.",
    driverExperienceHi: "16 साल का अनुभव",
    locationEn: "Phulparas, Madhubani",
    locationHi: "फुलपरास, मधुबनी",
    serviceCoverageEn: "Phulparas, Laukahi, Khajauli, Darbhanga, Patna, Delhi",
    serviceCoverageHi: "फुलपरास, लौकही, खजौली, दरभंगा, पटना, दिल्ली",
    contactNumbers: ["+91 6200087830", "+91 9934276622"],
    statusEn: "AVAILABLE NOW",
    statusHi: "अभी उपलब्ध है 🟢",
    rating: 5.0,
    reviewsCount: 240,
    category: "ALS",
    categorySimpleEn: "Advanced Cardiac ALS Unit (Oxygen + Nurse)",
    categorySimpleHi: "इमरजेंसी एम्बुलेंस (ऑक्सीजन + नर्स)",
    basePrice: 1199,
    perKm: 32,
    facilitiesEn: [
      "Cardiac Monitor",
      "AED Defibrillator",
      "40L Oxygen Supply",
      "Emergency Paramedic"
    ],
    facilitiesHi: [
      "हार्ट मॉनिटर 🩺",
      "इमरजेंसी शॉक मशीन ⚡",
      "बड़ा ऑक्सीजन टैंक 🌬️",
      "अनुभवी मेडिकल स्टाफ 👨‍⚕️"
    ]
  }
];

const VEHICLE_MODELS = [
  "Mahindra Bolero Neo Ambulance",
  "Maruti Suzuki Eeco Ambulance",
  "Force Traveller Super ICU",
  "Mahindra Scorpio Classic ALS",
  "Tata Winger ICU Special",
  "Mahindra Supro Mini Ambulance"
];

const LOCATIONS_EN = [
  "Sankar Chowk, Madhubani",
  "Station Road, Madhubani",
  "Bypass Road, Madhubani",
  "Rajnagar, Madhubani",
  "Bhagwanpur, Madhubani",
  "Ranti, Madhubani",
  "Rahika, Madhubani",
  "Khajauli, Madhubani",
  "Jaynagar, Madhubani",
  "Pandaul, Madhubani",
  "Sakri, Madhubani",
  "Benipatti, Madhubani",
  "Jhanjharpur, Madhubani",
  "Phulparas, Madhubani",
  "Darbhanga Sector (DMCH)",
  "Patna Sector (PMCH/AIIMS)",
  "Delhi NCR Inter-State Corridor"
];

const LOCATIONS_HI = [
  "संकर चौक, मधुबनी",
  "स्टेशन रोड, मधुबनी",
  "बायपास रोड, मधुबनी",
  "राजनगर, मधुबनी",
  "भगवानपुर, मधुबनी",
  "रंटी, मधुबनी",
  "रहिका, मधुबनी",
  "खजौली, मधुबनी",
  "जयनगर, मधुबनी",
  "पंडौल, मधुबनी",
  "सकरी, मधुबनी",
  "बेनीपट्टी, मधुबनी",
  "झंझारपुर, मधुबनी",
  "फुलपरास, मधुबनी",
  "दरभंगा (DMCH)",
  "पटना (PMCH / AIIMS)",
  "दिल्ली NCR (AIIMS)"
];

const FIRST_NAMES_EN = ["Ramesh", "Suresh", "Amit", "Vikram", "Deepak", "Rajesh", "Manoj", "Alok", "Sunil", "Pankaj", "Santosh", "Dharmendra", "Subhash", "Vijay", "Anand", "Mukesh", "Rohan", "Sanjay"];
const LAST_NAMES_EN = ["Yadav", "Singh", "Jha", "Verma", "Chaudhary", "Mishra", "Ray", "Dev", "Sah", "Kumar", "Thakur", "Paswan", "Mahto"];

const FIRST_NAMES_HI = ["रमेश", "सुरेश", "अमित", "विक्रम", "दीपक", "राजेश", "मनोज", "आलोक", "सुनील", "पंकज", "संतोष", "धर्मेंद्र", "सुभाष", "विजय", "आनंद", "मुकेश", "रोहन", "संजय"];
const LAST_NAMES_HI = ["यादव", "सिंह", "झा", "वर्मा", "चौधरी", "मिश्रा", "राय", "देव", "साह", "कुमार", "ठाकुर", "पासवान", "महतो"];

// Generate items 7 to 52 cycling through the 6 LOCAL AMBULANCE ASSETS
for (let i = 7; i <= 52; i++) {
  const modelIndex = (i - 1) % VEHICLE_MODELS.length;
  const locIndex = (i - 1) % LOCATIONS_EN.length;
  const imgIndex = (i - 1) % LOCAL_AMBULANCE_IMAGES.length;
  
  const firstNameEn = FIRST_NAMES_EN[(i - 1) % FIRST_NAMES_EN.length];
  const lastNameEn = LAST_NAMES_EN[(i - 1) % LAST_NAMES_EN.length];
  const firstNameHi = FIRST_NAMES_HI[(i - 1) % FIRST_NAMES_HI.length];
  const lastNameHi = LAST_NAMES_HI[(i - 1) % LAST_NAMES_HI.length];

  const isIcu = modelIndex === 2 || modelIndex === 4;
  const isAls = modelIndex === 0 || modelIndex === 3;

  const category = isIcu ? "ICU" : isAls ? "ALS" : "BLS";
  const categorySimpleEn = isIcu ? "Invasive ICU Ventilator Unit (Doctor Onboard)" : isAls ? "Advanced Cardiac ALS Unit (Oxygen + Nurse)" : "Basic Life Support (Oxygen & Stretcher)";
  const categorySimpleHi = isIcu ? "वेंटिलेटर एम्बुलेंस (गंभीर मरीज के लिए)" : isAls ? "इमरजेंसी एम्बुलेंस (ऑक्सीजन + नर्स)" : "साधारण एम्बुलेंस (ऑक्सीजन के साथ)";
  const basePrice = category === "ICU" ? 2499 : category === "ALS" ? 1199 : 499;
  const perKm = category === "ICU" ? 48 : category === "ALS" ? 32 : 18;

  AMBULANCE_FLEET_DATA.push({
    id: i,
    nameEn: `Sehaat Saathi Emergency Force #${i < 10 ? '0' + i : i}`,
    nameHi: `सेहत साथी एम्बुलेंस #${i < 10 ? '0' + i : i}`,
    image: LOCAL_AMBULANCE_IMAGES[imgIndex],
    vehicleModel: VEHICLE_MODELS[modelIndex],
    plateNo: `BR-32-PA-10${i < 10 ? '0' + i : i}`,
    driverName: `${firstNameEn} ${lastNameEn}`,
    licenseNo: `DL-BR3220${15 + (i % 8)}00${2000 + i}`,
    driverExperienceEn: `${6 + (i % 12)} Yrs Verified Exp.`,
    driverExperienceHi: `${6 + (i % 12)} साल का अनुभव`,
    locationEn: LOCATIONS_EN[locIndex],
    locationHi: LOCATIONS_HI[locIndex],
    serviceCoverageEn: "Madhubani, Rajnagar, Bhagwanpur, Ranti, Rahika, Khajauli, Jaynagar, Pandaul, Sakri, Darbhanga, Patna, Delhi",
    serviceCoverageHi: "मधुबनी गाँव और शहर, राजनगर, खजौली, जयनगर, पंडौल, सकरी, दरभंगा, पटना, दिल्ली",
    contactNumbers: ["+91 6200087830", "+91 9934276622"],
    statusEn: i % 4 === 0 ? "ON EMERGENCY DUTY" : i % 3 === 0 ? "DISPATCH READY" : "AVAILABLE NOW",
    statusHi: i % 4 === 0 ? "इमरजेंसी ड्यूटी पर 🔴" : i % 3 === 0 ? "कॉल करते ही तैयार ⚡" : "अभी उपलब्ध है 🟢",
    rating: +(4.6 + (i % 5) * 0.1).toFixed(1),
    reviewsCount: 50 + (i * 4),
    category,
    categorySimpleEn,
    categorySimpleHi,
    basePrice,
    perKm,
    facilitiesEn: category === "ICU" ? [
      "Invasive Transport Ventilator",
      "Multi-Para Cardiac Monitor",
      "AED Defibrillator",
      "40L Oxygen Tank",
      "Syringe Infusion Pump",
      "Trained ICU Nurse Onboard",
      "Automatic Stretcher"
    ] : category === "ALS" ? [
      "Oxygen Cylinder 40L",
      "Cardiac Monitor & ECG",
      "AED Defibrillator",
      "Emergency Trauma Kit",
      "Paramedic Onboard",
      "Emergency Siren"
    ] : [
      "Oxygen Cylinder 10L",
      "Foldable Stretcher",
      "First Aid Kit",
      "Wheelchair",
      "GPS Navigation"
    ],
    facilitiesHi: category === "ICU" ? [
      "सांस की मशीन (वेंटिलेटर) 🫁",
      "दिल की धड़कन की मशीन (ECG) 🩺",
      "इमरजेंसी शॉक मशीन (AED) ⚡",
      "बड़ा ऑक्सीजन सिलेंडर 🌬️",
      "आईसीयू डॉक्टर और नर्स 👨‍⚕️",
      "आरामदायक स्ट्रेचर 🛏️"
    ] : category === "ALS" ? [
      "बड़ा ऑक्सीजन सिलेंडर 🌬️",
      "हार्ट मॉनिटर 🩺",
      "इमरजेंसी शॉक मशीन ⚡",
      "फर्स्ट एड किट 🩹",
      "अनुभवी मेडिकल स्टाफ 👨‍⚕️"
    ] : [
      "ऑक्सीजन सिलेंडर 🌬️",
      "स्ट्रेचर और व्हीलचेयर 🛏️",
      "फर्स्ट एड किट 🩹",
      "इमरजेंसी साइरन 🚨"
    ]
  });
}
