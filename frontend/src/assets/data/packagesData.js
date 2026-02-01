import BSCPackImg from "../images/home/packages/1.png";
import SHPackImg from "../images/home/packages/2.png";
import PBCPackImg from "../images/home/packages/3.png";

export const packages = [
  {
    name: "Basic Health Check",
    description:
      "Comprehensive screening covering essen-tial tests for overall health.",
    price: "$20",
    facilities: [
      "Blood pressure check",
      "Cholesterol and glucose tests",
      "AI-Powered Symptom Analysis",
      "Basic vision screening",
      "Online Doctor Consultation",
    ],
    image: BSCPackImg,
  },
  {
    id: 2,
    name: "Senior Health Package",
    description:
      "Expert care for seniors with AI-driven monitoring and preventive checks.",
    price: "$30",
    facilities: [
      "Heart function test (ECG)",
      "Bone density scan",
      "AI Health Trend Tracking",
      "Eye and hearing assessment",
      "24/7 Virtual Support",
    ],
    image: SHPackImg,
  },
  {
    id: 3,
    name: "Full Body Checkup",
    description:
      "Our most advanced package with full-scale AI diagnostics and specialist care.",
    price: "$50",
    facilities: [
      "Complete blood profile",
      "Liver and kidney function tests",
      "AI-Enhanced ECG Analysis",
      "Comprehensive vision & hearing",
      "Priority Specialist Consultation",
    ],
    image: PBCPackImg,
  },
];
