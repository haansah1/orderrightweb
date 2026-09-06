import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BentoGrid from '../components/BentoGrid';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const res = await fetchProducts();
      setFeaturedProducts(res.products.slice(0, 4));
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-surface-container-highest">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat object-cover"
            style={{ 
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC4LcLM-zMNCbqKTTi_uai41DNUX07e4ZocABHZZH2QjUNwXXHixoG7weaKcyNtVMIVcEEWqg7Tn8yLCfzDrU3lHQAlQaisGeLXDXiy1cuhiDzyGfZXDIDU0VF3DNHIFfbVSF3NkiBUvH3jYTCTv38m706XhXT0jbptTGp9ufTkViq5MyZJUKsXdvW7hH8_OpYUY0-0qELHw4PTZ7q65XldeNYqXkm3JSJ3OSoxggBYRef4w0-rPQoI')` 
            }}
          />
        </div>
        <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="font-display font-bold text-display-lg-mobile md:text-display-lg text-surface-container-lowest drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)] mb-lg">
            Wear What Represents You
          </h1>
          <p className="font-body font-normal text-body-md md:text-body-lg text-surface-container-lowest/90 mb-xl max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            Discover a curated collection of premium fashion pieces designed to elevate your personal style.
          </p>
          <Link 
            to="/shop" 
            className="bg-primary text-on-primary font-label font-medium text-label-md py-4 px-8 rounded-lg hover:bg-surface-tint transition-colors duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.1)] inline-flex items-center uppercase tracking-wider"
          >
            Shop The Collection
          </Link>
        </div>
      </section>

      {/* Shop by Vibe (Bento Grid) */}
      <BentoGrid />

      {/* Featured Collection Drops */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-xl w-full">
        <div className="flex justify-between items-end mb-xl border-b border-surface-container-highest pb-md">
          <div>
            <h2 className="font-headline font-semibold text-headline-lg text-primary mb-xs">Featured New Drops</h2>
            <p className="font-body text-body-md text-on-surface-variant">Handpicked pieces freshly crafted for the season.</p>
          </div>
          <Link 
            to="/shop" 
            className="font-label font-bold text-label-md text-primary hover:text-secondary flex items-center transition-colors uppercase tracking-wider"
          >
            View All Products
            <span className="material-symbols-outlined text-[18px] ml-1">arrow_forward</span>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="aspect-[3/4] bg-surface-container-high rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Brand Values Banner */}
      <section className="bg-surface-container-low py-2xl border-y border-surface-container-highest my-xl">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-xl text-center">
          <div className="flex flex-col items-center p-md">
            <span className="material-symbols-outlined text-[40px] text-secondary mb-md">local_shipping</span>
            <h3 className="font-headline font-semibold text-headline-md text-primary mb-sm">Ghana Delivery</h3>
            <p className="font-body text-body-md text-on-surface-variant">Standard 2-5 business days courier delivery across Accra, Kumasi, and nationwide.</p>
          </div>
          <div className="flex flex-col items-center p-md">
            <span className="material-symbols-outlined text-[40px] text-secondary mb-md">verified_user</span>
            <h3 className="font-headline font-semibold text-headline-md text-primary mb-sm">Premium Craftsmanship</h3>
            <p className="font-body text-body-md text-on-surface-variant">Heavyweight organic fabrics woven to luxury specifications.</p>
          </div>
          <div className="flex flex-col items-center p-md">
            <span className="material-symbols-outlined text-[40px] text-secondary mb-md">sync_alt</span>
            <h3 className="font-headline font-semibold text-headline-md text-primary mb-sm">Seamless Exchanges</h3>
            <p className="font-body text-body-md text-on-surface-variant">Hassle-free size exchanges and doorstep returns guarantee.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
