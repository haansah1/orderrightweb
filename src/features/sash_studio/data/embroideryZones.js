/**
 * Embroidery Safe Zones & Mathematical Boundary Rules
 *
 * These zones correspond to the 4 red-bordered rectangles visible on "sash border.png":
 *   - 2 zones on the left panel  (upper and lower black sections)
 *   - 2 zones on the right panel (upper and lower black sections)
 *
 * Coordinates are expressed as percentages of each zone's own width/height (0-100%).
 * The SASH_ZONES in SashCanvas.jsx handle mapping zones to pixel positions on the
 * sash image; these bounds here define inner safe margins within each zone.
 */

export const EMBROIDERY_ZONES = {
  // Left Sash Panel — Upper Zone
  left_upper: {
    id: "left_upper",
    panel: "left",
    name: "Left Upper Panel",
    description: "Ideal for University Crest / Logo or Primary Adinkra Symbol",
    allowedTypes: ["crest", "custom_logo", "symbol", "text", "name"],
    // Inner safe margins within the zone (% of zone dimensions)
    bounds: { top: 5, bottom: 95, left: 5, right: 95 },
    maxElements: 2,
    maxWords: 4,
    maxChars: 28,
    maxAreaPercent: 80
  },

  // Left Sash Panel — Lower Zone
  left_lower: {
    id: "left_lower",
    panel: "left",
    name: "Left Lower Panel",
    description: "Ideal for Graduate Name, Degree, or Additional Symbols",
    allowedTypes: ["name", "text", "programme", "symbol"],
    bounds: { top: 5, bottom: 95, left: 5, right: 95 },
    maxElements: 3,
    maxWords: 6,
    maxChars: 38,
    maxAreaPercent: 85
  },

  // Right Sash Panel — Upper Zone
  right_upper: {
    id: "right_upper",
    panel: "right",
    name: "Right Upper Panel",
    description: "Ideal for Inspirational Quote, Bible Verse, or Dedication",
    allowedTypes: ["quote", "verse", "text", "symbol"],
    bounds: { top: 5, bottom: 95, left: 5, right: 95 },
    maxElements: 2,
    maxWords: 8,
    maxChars: 48,
    maxAreaPercent: 85
  },

  // Right Sash Panel — Lower Zone
  right_lower: {
    id: "right_lower",
    panel: "right",
    name: "Right Lower Panel",
    description: "Ideal for Academic Programme & Graduation Year",
    allowedTypes: ["programme", "name", "text", "symbol"],
    bounds: { top: 5, bottom: 95, left: 5, right: 95 },
    maxElements: 3,
    maxWords: 6,
    maxChars: 40,
    maxAreaPercent: 85
  }
};

/**
 * Smart space calculator: evaluates space usage for text content given zone constraints
 * Returns { percentage, wordCount, maxWords, isOverLimit, message }
 */
export function calculateSpaceUsage(text = "", zoneKey = "right_upper") {
  const clean = text.trim();
  const words = clean ? clean.split(/\s+/).length : 0;
  const chars = clean.length;

  const zone = EMBROIDERY_ZONES[zoneKey] || EMBROIDERY_ZONES.right_upper;
  const maxWords = zone.maxWords || 6;
  const maxChars = zone.maxChars || 36;

  const wordRatio = words / maxWords;
  const charRatio = chars / maxChars;
  const rawPercentage = Math.round(Math.max(wordRatio, charRatio) * 100);
  const percentage = Math.min(100, rawPercentage);

  const isOverLimit = words > maxWords || chars > maxChars;

  let statusMessage = "Space available";
  if (isOverLimit) {
    statusMessage = "This text exceeds the available embroidery space. Please shorten it.";
  } else if (percentage >= 80) {
    statusMessage = "Approaching maximum embroidery space";
  }

  return {
    percentage,
    words,
    maxWords,
    chars,
    maxChars,
    isOverLimit,
    statusMessage
  };
}

/**
 * Clamps coordinates {x, y} so an element of {width, height} stays within the safe zone.
 * All values are in % of the zone's own dimensions.
 */
export function clampToZone(x, y, width, height, zoneKey) {
  const zone = EMBROIDERY_ZONES[zoneKey] || {
    bounds: { top: 5, bottom: 95, left: 5, right: 95 }
  };

  const minX = zone.bounds.left;
  const maxX = zone.bounds.right - width;
  const minY = zone.bounds.top;
  const maxY = zone.bounds.bottom - height;

  return {
    x: Math.max(minX, Math.min(maxX, x)),
    y: Math.max(minY, Math.min(maxY, y))
  };
}
