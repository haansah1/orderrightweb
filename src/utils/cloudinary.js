/**
 * Cloudinary Utility for Frontend React App
 * Cloud Name: dvdsrlh5g
 * Folder: Orderright/tshirts/boys
 *
 * Products are dynamically generated from Cloudinary folder images by the backend.
 * The secure_url returned by Cloudinary is used directly — no re-transformation needed.
 */

const DEFAULT_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dvdsrlh5g';

/**
 * Returns the best image URL for display.
 * If the input is already a full Cloudinary/HTTP URL, returns it directly.
 * If it's a public ID, constructs an optimized Cloudinary URL.
 *
 * @param {string} publicIdOrUrl - Cloudinary Public ID or full URL
 * @param {Object} options - Optional transformation options (width, height, crop, quality, format)
 * @returns {string} Image URL ready for <img src>
 */
export function getCloudinaryUrl(publicIdOrUrl, options = {}) {
  if (!publicIdOrUrl) return '/favicon.svg';

  // If already a full HTTP URL, return as is (Cloudinary secure_urls work directly)
  if (publicIdOrUrl.startsWith('http://') || publicIdOrUrl.startsWith('https://')) {
    return publicIdOrUrl;
  }

  // Build a Cloudinary URL from a public ID
  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
    cloudName = DEFAULT_CLOUD_NAME,
  } = options;

  const transformations = [`f_${format}`, `q_${quality}`];
  if (crop) transformations.push(`c_${crop}`);
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations.join(',')}/${publicIdOrUrl}`;
}

/**
 * Image error handler — falls back gracefully if a Cloudinary image 404s
 */
export function handleImageError(e, fallbackUrl) {
  const target = e.target;
  if (fallbackUrl && target.src !== fallbackUrl) {
    target.src = fallbackUrl;
  } else {
    target.style.display = 'none';
  }
}

export default getCloudinaryUrl;
