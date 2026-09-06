import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchProductById, fetchProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { getCloudinaryUrl, handleImageError } from '../utils/cloudinary';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedWeight, setSelectedWeight] = useState('600GMS');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      const data = await fetchProductById(id);
      if (data) {
        setProduct(data);
        const images = data.images && data.images.length > 0 ? data.images : [data.image || ''];
        setSelectedImage(images[0]);
        
        // Filter out 'S' and ensure 'XXXL' is present
        const sizes = (data.sizes || ['M', 'L', 'XL', 'XXL']).filter(s => s !== 'S');
        if (!sizes.includes('XXXL')) sizes.push('XXXL');
        setSelectedSize(sizes[0] || 'M');

        if (data.colors && data.colors.length > 0) setSelectedColor(data.colors[0]);

        // Load related products
        const rel = await fetchProducts({ category: data.category });
        setRelatedProducts(rel.products.filter(p => p.id !== data.id).slice(0, 4));
      }
      setLoading(false);
    }
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-2xl max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-2xl max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop min-h-screen text-center flex flex-col items-center justify-center">
        <h2 className="font-headline font-bold text-headline-lg text-primary mb-md">Product Not Found</h2>
        <Link to="/shop" className="bg-primary text-on-primary font-label text-label-md px-6 py-3 rounded-lg uppercase tracking-wider">
          Back to Catalogue
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.image || ''];

  // Size list calculation: No 'S', includes 'XXXL' as last option
  const availableSizes = (product.sizes || ['M', 'L', 'XL', 'XXL']).filter(s => s !== 'S');
  if (!availableSizes.includes('XXXL')) {
    availableSizes.push('XXXL');
  }

  // Calculate dynamic unit price based on weight (600GMS standard vs 1000GMS +10 cedis)
  const extraWeightPrice = selectedWeight === '1000GMS' ? 10.00 : 0.00;
  const currentUnitPrice = (product.price || 60.00) + extraWeightPrice;

  const handleAddToCart = () => {
    const productWithWeight = {
      ...product,
      price: currentUnitPrice,
      weight: selectedWeight
    };
    addToCart(productWithWeight, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  return (
    <main className="pt-28 pb-2xl max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full min-h-screen">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-body-md text-on-surface-variant mb-lg">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-primary">Shop</Link>
        <span>/</span>
        <span className="text-primary font-medium line-clamp-1">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-2xl">
        
        {/* Left: Image Gallery */}
        <section className="md:col-span-7 flex flex-col-reverse md:flex-row gap-lg">
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex md:flex-col gap-sm overflow-x-auto md:overflow-y-auto max-h-[700px] no-scrollbar">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-20 md:w-20 md:h-24 rounded-lg overflow-hidden border flex-shrink-0 transition-all ${
                    selectedImage === img 
                      ? 'border-primary ring-2 ring-primary/20 opacity-100' 
                      : 'border-outline-variant opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={getCloudinaryUrl(img, { width: 160, height: 200, crop: 'fill' })} alt={`Thumbnail ${index}`} className="w-full h-full object-cover" onError={(e) => handleImageError(e, img)} />
                </button>
              ))}
            </div>
          )}

          {/* Main Display Image */}
          <div className="flex-grow aspect-[3/4] rounded-2xl overflow-hidden bg-surface-container-low border border-surface-container-highest relative">
            <img 
              src={getCloudinaryUrl(selectedImage, { width: 800, height: 1067, crop: 'fill' })} 
              alt={product.name} 
              className="w-full h-full object-cover"
              onError={(e) => handleImageError(e, product.images?.[0])}
            />
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-all ${
                wishlisted ? 'bg-secondary text-white' : 'bg-surface/80 text-on-surface hover:bg-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: wishlisted ? "'FILL' 1" : "'FILL' 0" }}>
                favorite
              </span>
            </button>
          </div>
        </section>

        {/* Right: Product Details & Actions */}
        <section className="md:col-span-5 flex flex-col gap-lg sticky top-28 self-start">
          
          <div className="flex flex-col gap-xs">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-surface-container rounded-full font-label text-label-sm text-on-surface-variant uppercase tracking-wider">
                {product.vibe || 'Ghanaian High-Fashion'}
              </span>
              {product.isNew && (
                <span className="px-3 py-1 bg-primary text-white rounded-full font-label text-label-sm uppercase tracking-wider">
                  New Arrival
                </span>
              )}
            </div>

            <h1 className="font-display font-bold text-display-lg-mobile md:text-headline-lg text-primary mt-sm">
              {product.name}
            </h1>

            <div className="flex items-center gap-md mt-xs">
              <p className="font-headline font-bold text-headline-md text-primary">
                {product.currency || 'GH₵'} {currentUnitPrice.toFixed(2)}
              </p>
              <span className="text-body-md text-on-surface-variant font-medium">
                {selectedWeight === '1000GMS' ? '(1000GMS +10 GH₵)' : 'VAT Included'}
              </span>
            </div>
          </div>

          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            {product.description}
          </p>

          {/* Size Selection (M, L, XL, XXL, XXXL) */}
          <div className="flex flex-col gap-sm">
            <div className="flex justify-between items-center">
              <span className="font-label text-label-md text-primary font-bold">Select Size</span>
              <button className="font-label text-label-sm text-on-surface-variant underline hover:text-primary">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-sm">
              {availableSizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`min-w-[48px] h-12 px-4 rounded-lg font-label text-label-md transition-all ${
                    selectedSize === sz
                      ? 'bg-primary text-on-primary shadow-md font-bold'
                      : 'bg-surface-container-low border border-surface-container text-on-surface-variant hover:border-primary'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity selector */}
          <div className="flex items-center gap-md">
            <span className="font-label text-label-md text-primary font-bold">Quantity</span>
            <div className="flex items-center border border-outline-variant rounded-lg bg-surface">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-l-lg"
              >
                <span className="material-symbols-outlined text-[18px]">remove</span>
              </button>
              <span className="font-label text-label-md px-4 font-bold text-primary">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-r-lg"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>
          </div>

          {/* Weight Dropdown Selector (Below Quantity) */}
          <div className="flex flex-col gap-xs pt-xs">
            <label className="font-label text-label-md text-primary font-bold block">
              Fabric Weight Options
            </label>
            <select
              value={selectedWeight}
              onChange={(e) => setSelectedWeight(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-body-md font-semibold text-primary focus:outline-none focus:border-primary"
            >
              <option value="600GMS">600GMS (Standard — GH₵ 60.00)</option>
              <option value="1000GMS">1000GMS (Heavyweight — GH₵ 70.00)</option>
            </select>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-col gap-sm mt-md">
            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-primary text-on-primary rounded-lg font-label text-label-md uppercase tracking-wider hover:bg-surface-tint transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full py-4 bg-secondary text-white rounded-lg font-label text-label-md uppercase tracking-wider hover:bg-secondary/90 transition-colors shadow-md"
            >
              Buy It Now
            </button>
          </div>

          {/* Product Specifications Accordion */}
          <div className="flex flex-col border-t border-surface-container-highest mt-lg">
            <details className="group py-md border-b border-surface-container-highest">
              <summary className="flex justify-between items-center font-label text-label-md text-primary font-bold cursor-pointer list-none">
                Material & Care
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="pt-sm font-body text-body-md text-on-surface-variant leading-relaxed">
                {product.details?.material || '100% Organic Cotton. Premium high-density weave.'}
                <br />
                {product.details?.care || 'Machine wash cold inside out. Tumble dry low or hang dry.'}
              </div>
            </details>

            <details className="group py-md border-b border-surface-container-highest">
              <summary className="flex justify-between items-center font-label text-label-md text-primary font-bold cursor-pointer list-none">
                Shipping & Delivery
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="pt-sm font-body text-body-md text-on-surface-variant leading-relaxed">
                {product.details?.shipping || 'Standard delivery within Ghana (2-5 business days).'}
              </div>
            </details>
          </div>

        </section>

      </div>

      {/* Related Products Recommendations */}
      {relatedProducts.length > 0 && (
        <section className="mt-2xl pt-xl border-t border-surface-container-highest">
          <h2 className="font-headline font-bold text-headline-lg text-primary mb-xl">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

    </main>
  );
}
