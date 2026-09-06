/**
 * Universities Dataset for Sash Studio
 * Contains only institutions with verified crest logos in public/media/university_logos/
 */

export const UNIVERSITIES = [
  {
    id: "ug_legon",
    name: "University of Ghana (UG Legon)",
    shortName: "UG Legon",
    location: "Legon, Accra, Ghana",
    primaryColor: "#002060",
    secondaryColor: "#ffd700",
    crestSvg: "ug",
    logoUrl: "/media/university_logos/UG logo.png",
    isActive: true
  },
  {
    id: "knust",
    name: "Kwame Nkrumah University of Science and Technology (KNUST)",
    shortName: "KNUST",
    location: "Kumasi, Ghana",
    primaryColor: "#0b6623",
    secondaryColor: "#ffd700",
    crestSvg: "knust",
    logoUrl: "/media/university_logos/knust.png",
    isActive: true
  },
  {
    id: "ucc",
    name: "University of Cape Coast (UCC)",
    shortName: "UCC",
    location: "Cape Coast, Ghana",
    primaryColor: "#800000",
    secondaryColor: "#ffd700",
    crestSvg: "ucc",
    logoUrl: "/media/university_logos/ucc.png",
    isActive: true
  },
  {
    id: "upsa",
    name: "University of Professional Studies, Accra (UPSA)",
    shortName: "UPSA",
    location: "Accra, Ghana",
    primaryColor: "#003366",
    secondaryColor: "#ffcc00",
    crestSvg: "upsa",
    logoUrl: "/media/university_logos/upsa.png",
    isActive: true
  },
  {
    id: "gimpa",
    name: "Ghana Institute of Management and Public Administration (GIMPA)",
    shortName: "GIMPA",
    location: "Greenhill, Accra, Ghana",
    primaryColor: "#004080",
    secondaryColor: "#c5a059",
    crestSvg: "gimpa",
    logoUrl: "/media/university_logos/GIMPA.png",
    isActive: true
  }
];

export function getUniversityById(id) {
  return UNIVERSITIES.find(u => u.id === id) || null;
}
