/**
 * Adinkra Symbol Library
 * Features vector SVG icons, Akan names, and cultural meanings.
 */

export const ADINKRA_SYMBOLS = [
  {
    id: "gye_nyame",
    name: "Gye Nyame",
    meaning: "Supremacy of God",
    description: "Except God; symbol of the omnipotence and immortality of God.",
    iconType: "gye_nyame",
    iconUrl: "/media/adinkra/gye-nyame.png",
    isActive: true
  },
  {
    id: "sankofa",
    name: "Sankofa",
    meaning: "Learn from the Past",
    description: "Go back and get it; symbol of positive reversion and taking lessons from history.",
    iconType: "sankofa",
    iconUrl: "/media/adinkra/sankofa.png",
    isActive: true
  },
  {
    id: "sankofa_heart",
    name: "Sankofa (Heart)",
    meaning: "Learn from the Past",
    description: "Heart representation of Sankofa; symbol of learning from history and wisdom.",
    iconType: "sankofa_heart",
    iconUrl: "/media/adinkra/sankofa-heart.png",
    isActive: true
  },
  {
    id: "nkyinkyim",
    name: "Nkyinkyim",
    meaning: "Initiative & Dynamism",
    description: "Twisting; symbol of versatility, dynamism, resilience, and adaptability.",
    iconType: "nkyinkyim",
    iconUrl: "/media/adinkra/nkyinkyim.png",
    isActive: true
  },
  {
    id: "dwennimmen",
    name: "Dwennimmen",
    meaning: "Strength & Humility",
    description: "Ram's horns; symbol that even the strong must remain humble.",
    iconType: "dwennimmen",
    iconUrl: "/media/adinkra/dwennimmen.png",
    isActive: true
  },
  {
    id: "adinkrahene",
    name: "Adinkrahene",
    meaning: "Leadership & Charisma",
    description: "Chief of Adinkra symbols; symbol of greatness, leadership, and royalty.",
    iconType: "adinkrahene",
    iconUrl: "/media/adinkra/adinkrahene.png",
    isActive: true
  },
  {
    id: "mate_masie",
    name: "Mate Masie",
    meaning: "Wisdom & Knowledge",
    description: "What I hear I keep; symbol of wisdom, prudence, and intelligence.",
    iconType: "mate_masie",
    iconUrl: "/media/adinkra/mate-masie.png",
    isActive: true
  },
  {
    id: "bese_saka",
    name: "Bese Saka",
    meaning: "Abundance & Success",
    description: "Sack of cola nuts; symbol of abundance, wealth, and educational triumph.",
    iconType: "bese_saka",
    iconUrl: "/media/adinkra/bese-saka.png",
    isActive: true
  },
  {
    id: "denkyem",
    name: "Denkyem",
    meaning: "Adaptability",
    description: "The crocodile; symbol of adaptability, cleverness, and resilience.",
    iconType: "denkyem",
    iconUrl: "/media/adinkra/denkyem.png",
    isActive: true
  },
  {
    id: "funtumfunefu_denkyemfunefu",
    name: "Funtumfunefu Denkyemfunefu",
    meaning: "Unity in Diversity",
    description: "Siamese crocodiles; symbol of democracy, shared fate, and unity.",
    iconType: "funtumfunefu_denkyemfunefu",
    iconUrl: "/media/adinkra/funtumfunefu-denkyemfunefu.png",
    isActive: true
  },
  {
    id: "abe_dua",
    name: "Abe Dua",
    meaning: "Wealth & Resourcefulness",
    description: "Palm Tree; symbol of wealth, self-sufficiency, and resourcefulness.",
    iconType: "abe_dua",
    iconUrl: "/media/adinkra/abe-dua.png",
    isActive: true
  },
  {
    id: "abode_santann",
    name: "Abode Santann",
    meaning: "Total Creation",
    description: "Symbol of all creation, nature, and the interconnected universe.",
    iconType: "abode_santann",
    iconUrl: "/media/adinkra/abode-santann.png",
    isActive: true
  },
  {
    id: "abusua_pa",
    name: "Abusua Pa",
    meaning: "Good Family",
    description: "Symbol of family unity, togetherness, and strong community bonds.",
    iconType: "abusua_pa",
    iconUrl: "/media/adinkra/abusua-pa.png",
    isActive: true
  },
  {
    id: "adwo",
    name: "Adwo",
    meaning: "Peace & Tranquility",
    description: "Symbol of peace, calmness, quietude, and harmony.",
    iconType: "adwo",
    iconUrl: "/media/adinkra/adwo.png",
    isActive: true
  },
  {
    id: "nea_onnim",
    name: "Nea Onnim",
    meaning: "Knowledge & Education",
    description: "He who does not know can know from learning; symbol of lifelong learning.",
    iconType: "nea_onnim",
    iconUrl: "/media/adinkra/nea-onnim.png",
    isActive: true
  },
  {
    id: "nsoromma",
    name: "Nsoromma",
    meaning: "Faith & Protection",
    description: "Child of the star; symbol of guardianship, faith, and reliance on God.",
    iconType: "nsoromma",
    iconUrl: "/media/adinkra/nsoromma.png",
    isActive: true
  },
  {
    id: "nyame_biribi_wo_soro",
    name: "Nyame Biribi Wo Soro",
    meaning: "Hope & Inspiration",
    description: "God is in the heavens; symbol of hope, faith, and divine inspiration.",
    iconType: "nyame_biribi_wo_soro",
    iconUrl: "/media/adinkra/nyame-biribi-wo-soro.png",
    isActive: true
  },
  {
    id: "odo_nnyew_fie_kwan",
    name: "Odo Nnyew Fie Kwan",
    meaning: "Love & Devotion",
    description: "Love never loses its way home; symbol of enduring love and devotion.",
    iconType: "odo_nnyew_fie_kwan",
    iconUrl: "/media/adinkra/odo-nnyew-fie-kwan.png",
    isActive: true
  },
  {
    id: "ohene_aniwa",
    name: "Ohene Aniwa",
    meaning: "Vigilance & Protection",
    description: "The King's eyes; symbol of vigilance, security, and foresight.",
    iconType: "ohene_aniwa",
    iconUrl: "/media/adinkra/ohene-aniwa.png",
    isActive: true
  }
];

export function getSymbolById(id) {
  return ADINKRA_SYMBOLS.find(s => s.id === id || s.iconType === id) || null;
}
