/**
 * Calculates the great-circle distance between two points (latitude and longitude) 
 * on a sphere given their longitudes and latitudes.
 * @param {number} lat1 
 * @param {number} lon1 
 * @param {number} lat2 
 * @param {number} lon2 
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Maps common symptoms to specialization
 * @param {string} symptoms 
 * @returns {string} 
 */
export const mapSymptomsToSpecialization = (symptoms) => {
  const s = symptoms.toLowerCase();
  if (s.includes("heart") || s.includes("chest pain") || s.includes("palpitations")) return "Cardiologist";
  if (s.includes("skin") || s.includes("rash") || s.includes("acne")) return "Dermatologist";
  if (s.includes("brain") || s.includes("nerves") || s.includes("seizures")) return "Neurologist";
  if (s.includes("child") || s.includes("pediatric") || s.includes("kids")) return "Pediatrician";
  if (s.includes("eye") || s.includes("vision") || s.includes("sight")) return "Ophthalmologist";
  if (s.includes("bone") || s.includes("joint") || s.includes("fracture")) return "Orthopedic";
  if (s.includes("stomach") || s.includes("digestion") || s.includes("liver")) return "Gastroenterologist";
  if (s.includes("mental") || s.includes("anxiety") || s.includes("depression")) return "Psychiatrist";
  return "General Physician"; // Default
};
