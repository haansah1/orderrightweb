import React from 'react';

/**
 * Scalable SVG Icons for Adinkra Symbols and University Crests
 */
const ADINKRA_PNG_MAP = {
  abe_dua: '/media/adinkra/abe-dua.png',
  'abe-dua': '/media/adinkra/abe-dua.png',
  abode_santann: '/media/adinkra/abode-santann.png',
  'abode-santann': '/media/adinkra/abode-santann.png',
  abusua_pa: '/media/adinkra/abusua-pa.png',
  'abusua-pa': '/media/adinkra/abusua-pa.png',
  adinkrahene: '/media/adinkra/adinkrahene.png',
  adwo: '/media/adinkra/adwo.png',
  bese_saka: '/media/adinkra/bese-saka.png',
  'bese-saka': '/media/adinkra/bese-saka.png',
  denkyem: '/media/adinkra/denkyem.png',
  dwennimmen: '/media/adinkra/dwennimmen.png',
  funtumfunefu_denkyemfunefu: '/media/adinkra/funtumfunefu-denkyemfunefu.png',
  'funtumfunefu-denkyemfunefu': '/media/adinkra/funtumfunefu-denkyemfunefu.png',
  gye_nyame: '/media/adinkra/gye-nyame.png',
  'gye-nyame': '/media/adinkra/gye-nyame.png',
  mate_masie: '/media/adinkra/mate-masie.png',
  'mate-masie': '/media/adinkra/mate-masie.png',
  nea_onnim: '/media/adinkra/nea-onnim.png',
  'nea-onnim': '/media/adinkra/nea-onnim.png',
  nkyinkyim: '/media/adinkra/nkyinkyim.png',
  nsoromma: '/media/adinkra/nsoromma.png',
  nyame_biribi_wo_soro: '/media/adinkra/nyame-biribi-wo-soro.png',
  'nyame-biribi-wo-soro': '/media/adinkra/nyame-biribi-wo-soro.png',
  odo_nnyew_fie_kwan: '/media/adinkra/odo-nnyew-fie-kwan.png',
  'odo-nnyew-fie-kwan': '/media/adinkra/odo-nnyew-fie-kwan.png',
  ohene_aniwa: '/media/adinkra/ohene-aniwa.png',
  'ohene-aniwa': '/media/adinkra/ohene-aniwa.png',
  sankofa_heart: '/media/adinkra/sankofa-heart.png',
  'sankofa-heart': '/media/adinkra/sankofa-heart.png',
  sankofa: '/media/adinkra/sankofa.png',
};

/**
 * Scalable Icons for Adinkra Symbols and University Crests
 */
export function AdinkraIcon({ type, iconUrl, className = "w-6 h-6", color }) {
  const imageSrc = iconUrl || ADINKRA_PNG_MAP[type];

  if (imageSrc) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <img
          src={imageSrc}
          alt={type || "Adinkra Symbol"}
          className="max-w-full max-h-full object-contain filter drop-shadow-sm"
        />
      </div>
    );
  }

  switch (type) {
    case 'gye_nyame':
      return (
        <svg viewBox="0 0 100 100" fill={color || 'currentColor'} className={className}>
          <path d="M50 5 C45 5 40 10 40 16 L40 30 C30 30 20 35 15 45 C10 55 12 68 20 76 C28 84 40 88 50 88 C60 88 72 84 80 76 C88 68 90 55 85 45 C80 35 70 30 60 30 L60 16 C60 10 55 5 50 5 Z M42 38 C45 36 55 36 58 38 C68 40 76 50 72 65 C68 76 58 80 50 80 C42 80 32 76 28 65 C24 50 32 40 42 38 Z" />
          <circle cx="50" cy="55" r="8" />
          <path d="M30 48 L15 45 C12 55 18 68 25 72 L32 62 Z" />
          <path d="M70 48 L85 45 C88 55 82 68 75 72 L68 62 Z" />
          <path d="M46 16 L54 16 L54 32 L46 32 Z" />
        </svg>
      );
    case 'sankofa':
      return (
        <svg viewBox="0 0 100 100" fill={color || 'currentColor'} className={className}>
          <path d="M50 15 C30 15 15 32 15 52 C15 72 32 88 52 88 C70 88 85 75 88 58 C90 48 85 38 78 32 C70 25 60 22 52 22 C45 22 38 25 34 30 C30 35 32 45 40 48 C48 50 56 42 55 35 C52 28 42 28 40 32 C38 35 42 40 46 39 C48 38 48 35 46 34 C44 33 42 35 43 36 C35 38 32 50 38 58 C45 66 58 68 68 60 C76 52 78 40 70 30 C62 20 48 18 36 24" stroke={color || 'currentColor'} strokeWidth="6" fill="none" strokeLinecap="round" />
          <circle cx="62" cy="22" r="5" />
          <path d="M50 82 C35 82 25 70 25 55 C25 45 32 38 40 38 C48 38 55 45 55 55 C55 68 45 80 32 82" fill={color || 'currentColor'} opacity="0.4" />
        </svg>
      );
    case 'nkyinkyim':
      return (
        <svg viewBox="0 0 100 100" fill={color || 'currentColor'} className={className}>
          <path d="M20 20 Q50 5 80 20 Q95 50 80 80 Q50 95 20 80 Q5 50 20 20 Z" stroke={color || 'currentColor'} strokeWidth="6" fill="none" />
          <path d="M35 35 Q50 25 65 35 Q75 50 65 65 Q50 75 35 65 Q25 50 35 35 Z" stroke={color || 'currentColor'} strokeWidth="5" fill="none" />
          <circle cx="50" cy="50" r="6" />
          <line x1="50" y1="5" x2="50" y2="95" stroke={color || 'currentColor'} strokeWidth="4" />
          <line x1="5" y1="50" x2="95" y2="50" stroke={color || 'currentColor'} strokeWidth="4" />
        </svg>
      );
    case 'dwennimmen':
      return (
        <svg viewBox="0 0 100 100" fill={color || 'currentColor'} className={className}>
          <path d="M50 50 C30 20 10 35 25 60 C35 75 48 65 50 50 Z" stroke={color || 'currentColor'} strokeWidth="6" fill="none" />
          <path d="M50 50 C70 20 90 35 75 60 C65 75 52 65 50 50 Z" stroke={color || 'currentColor'} strokeWidth="6" fill="none" />
          <path d="M50 50 C30 80 10 65 25 40 C35 25 48 35 50 50 Z" stroke={color || 'currentColor'} strokeWidth="6" fill="none" />
          <path d="M50 50 C70 80 90 65 75 40 C65 25 52 35 50 50 Z" stroke={color || 'currentColor'} strokeWidth="6" fill="none" />
          <circle cx="50" cy="50" r="5" />
        </svg>
      );
    case 'adinkrahene':
      return (
        <svg viewBox="0 0 100 100" fill={color || 'currentColor'} className={className}>
          <circle cx="50" cy="50" r="42" stroke={color || 'currentColor'} strokeWidth="6" fill="none" />
          <circle cx="50" cy="50" r="28" stroke={color || 'currentColor'} strokeWidth="6" fill="none" />
          <circle cx="50" cy="50" r="14" fill={color || 'currentColor'} />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" fill={color || 'currentColor'} className={className}>
          <polygon points="50,5 64,35 98,35 70,57 81,91 50,70 19,91 30,57 2,35 36,35" />
        </svg>
      );
  }
}

const UNIVERSITY_LOGOS = {
  knust: '/media/university_logos/knust.png',
  ug_legon: '/media/university_logos/UG logo.png',
  ug: '/media/university_logos/UG logo.png',
  ucc: '/media/university_logos/ucc.png',
  upsa: '/media/university_logos/upsa.png',
  gimpa: '/media/university_logos/GIMPA.png',
};

export function UniversityCrest({ id, uni, logoUrl, className = "w-16 h-16" }) {
  const imageSrc = logoUrl || uni?.logoUrl || UNIVERSITY_LOGOS[id] || UNIVERSITY_LOGOS[uni?.id] || UNIVERSITY_LOGOS[uni?.crestSvg];

  if (imageSrc) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <img
          src={imageSrc}
          alt={uni?.name || id || "University Crest"}
          className="max-w-full max-h-full object-contain filter drop-shadow-md"
        />
      </div>
    );
  }

  switch (id) {
    case 'knust':
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            {/* Shield Outline */}
            <path d="M60 10 L100 25 C100 70 80 100 60 115 C40 100 20 70 20 25 Z" fill="#0b6623" stroke="#ffd700" strokeWidth="4" />
            {/* Eagle Wings */}
            <path d="M60 40 Q85 30 95 50 Q75 60 60 70 Q45 60 25 50 Q35 30 60 40 Z" fill="#ffd700" />
            {/* Torch & Flame */}
            <polygon points="60,25 56,38 64,38" fill="#e11d48" />
            <rect x="58" y="38" width="4" height="25" fill="#ffd700" />
            {/* Banner */}
            <rect x="30" y="80" width="60" height="12" rx="2" fill="#ffd700" />
            <text x="60" y="89" fill="#000000" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">KNUST</text>
          </svg>
        </div>
      );
    case 'ug_legon':
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <path d="M60 10 L102 28 C102 75 80 102 60 115 C40 102 18 75 18 28 Z" fill="#002060" stroke="#ffd700" strokeWidth="4" />
            {/* Sunburst / Book */}
            <circle cx="60" cy="45" r="16" fill="#ffd700" />
            <path d="M40 70 Q60 62 80 70 L80 82 Q60 74 40 82 Z" fill="#ffffff" stroke="#ffd700" strokeWidth="2" />
            <text x="60" y="98" fill="#ffd700" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">UG LEGON</text>
          </svg>
        </div>
      );
    case 'ucc':
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <path d="M60 12 L100 28 C100 75 80 102 60 115 C40 102 20 75 20 28 Z" fill="#800000" stroke="#ffd700" strokeWidth="4" />
            <circle cx="60" cy="45" r="14" fill="#ffd700" />
            <polygon points="60,35 68,52 52,52" fill="#1e3a8a" />
            <rect x="35" y="76" width="50" height="12" rx="2" fill="#ffd700" />
            <text x="60" y="85" fill="#800000" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">UCC</text>
          </svg>
        </div>
      );
    case 'ashesi':
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <rect x="22" y="22" width="76" height="76" rx="16" fill="#8b0000" stroke="#ffffff" strokeWidth="4" />
            <polygon points="60,30 82,75 38,75" fill="#ffffff" />
            <text x="60" y="95" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ASHESI</text>
          </svg>
        </div>
      );
    default:
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <path d="M60 12 L100 28 C100 75 80 102 60 115 C40 102 20 75 20 28 Z" fill="#18181b" stroke="#fed65b" strokeWidth="4" />
            <polygon points="60,25 72,55 48,55" fill="#fed65b" />
            <circle cx="60" cy="68" r="10" fill="#fed65b" />
            <text x="60" y="96" fill="#fed65b" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">CREST</text>
          </svg>
        </div>
      );
  }
}
