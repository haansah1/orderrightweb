import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dvdsrlh5g',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Fetch ALL images from a Cloudinary asset folder and convert each into a product.
 * Uses the Admin API `resources_by_asset_folder` (Dynamic Folders mode).
 *
 * @param {string} folderPath - Cloudinary asset folder path (e.g. "Orderright/tshirts/boys")
 * @param {Object} options - Configuration for product generation
 * @param {string} options.collection - Collection name ("Boys" or "Girls")
 * @param {string} options.vibe - Vibe tag for filtering ("Streetwear" or "Classy")
 * @param {string} options.idPrefix - Prefix for product IDs (e.g. "cld-boys")
 * @returns {Promise<Array|null>} Array of product objects, or null if none found
 */
async function fetchFolderProducts(folderPath, { collection, vibe, idPrefix }) {
  const allResources = [];
  let nextCursor = undefined;

  do {
    const opts = { max_results: 100 };
    if (nextCursor) opts.next_cursor = nextCursor;

    const result = await cloudinary.api.resources_by_asset_folder(folderPath, opts);

    if (result && result.resources) {
      allResources.push(...result.resources);
    }
    nextCursor = result.next_cursor;
  } while (nextCursor);

  if (allResources.length === 0) {
    console.log(`No images found in ${folderPath}`);
    return [];
  }

  console.log(`Fetched ${allResources.length} images from ${folderPath}`);

  return allResources.map((asset, index) => {
    const publicId = asset.public_id;
    const rawFilename = publicId.split('/').pop();

    // Clean name: strip Cloudinary random suffix, format as title
    const cleanName = rawFilename
      .replace(/\.[^/.]+$/, '')
      .replace(/_[a-z0-9]{5,8}$/i, '')
      .replace(/[-_]/g, ' ')
      .trim()
      .replace(/\b\w/g, l => l.toUpperCase());

    const productName = cleanName.length > 1
      ? `${cleanName} Tee`
      : `${collection} Tee ${index + 1}`;

    const imageUrl = asset.secure_url;

    return {
      id: `${idPrefix}-${index + 1}`,
      name: productName,
      collection,
      vibe,
      category: 'Tops',
      price: 60.00,
      currency: 'GH₵',
      rating: parseFloat((4.5 + Math.random() * 0.5).toFixed(1)),
      reviewsCount: 20 + index * 7,
      isNew: index < 6,
      isFeatured: true,
      description: `Exclusive "${productName}" from the OrderRight ${collection.toLowerCase()} collection.`,
      cloudinaryPublicId: publicId,
      images: [imageUrl],
      sizes: ['M', 'L', 'XL', 'XXL', 'XXXL'],
      colors: ['Deep Charcoal', 'Off White', 'Crimson Red'],
      details: {
        material: '100% Premium Cotton',
        care: 'Machine wash cold inside out. Hang dry.',
        shipping: 'Standard delivery within Ghana (2-5 business days).',
      },
    };
  });
}

/**
 * Fetch products from the Boys folder: Orderright/tshirts/boys
 */
export async function fetchBoysFolderProducts() {
  return fetchFolderProducts('Orderright/tshirts/boys', {
    collection: 'Boys',
    vibe: 'Streetwear',
    idPrefix: 'cld-boys',
  });
}

/**
 * Fetch products from the Girls folder: Orderright/tshirts/girls
 */
export async function fetchGirlsFolderProducts() {
  return fetchFolderProducts('Orderright/tshirts/girls', {
    collection: 'Girls',
    vibe: 'Classy',
    idPrefix: 'cld-girls',
  });
}

/**
 * Fetch ALL products from both Boys and Girls folders
 */
export async function fetchAllFolderProducts() {
  const [boys, girls] = await Promise.all([
    fetchBoysFolderProducts(),
    fetchGirlsFolderProducts(),
  ]);
  return [...(boys || []), ...(girls || [])];
}

export { cloudinary };
export default cloudinary;
