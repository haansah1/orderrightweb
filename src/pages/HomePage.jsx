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
      {/* 1st - 10th November Promo Announcement Banner */}
      <section className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white shadow-md border-b border-amber-400/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2.5 flex-wrap justify-center sm:justify-start">
            <span className="inline-flex items-center gap-1 bg-black/30 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-200 border border-white/20 shadow-xs">
              <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
              Special Promo • 1st – 10th November
            </span>
            <span className="font-label font-semibold text-xs sm:text-sm text-white drop-shadow-xs">
              1 Shirt: <strong className="text-amber-100">GH₵ 55</strong> | 2 Shirts: <strong className="text-amber-100">GH₵ 105</strong> | 3 Shirts: <strong className="text-amber-100">GH₵ 155</strong> | 4 Shirts: <strong className="text-amber-100">GH₵ 205</strong> | 5+ Shirts: <strong className="text-amber-100">GH₵ 50 each</strong>
            </span>
          </div>
          <Link
            to="/shop"
            className="flex-shrink-0 bg-white text-zinc-950 hover:bg-amber-100 font-label font-bold text-xs uppercase px-4 py-1.5 rounded-full transition-all shadow-sm hover:scale-105 inline-flex items-center gap-1"
          >
            <span>Shop Promo</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </Link>
        </div>
      </section>

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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-label font-bold text-xs sm:text-sm uppercase tracking-widest mb-4 shadow-lg">
            <span className="material-symbols-outlined text-[18px] text-amber-300">celebration</span>
            <span>Promo Live: 1st – 10th November</span>
          </div>
          <h1 className="font-display font-bold text-display-lg-mobile md:text-display-lg text-surface-container-lowest drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)] mb-lg">
            Wear What Represents You
          </h1>
          <p className="font-body font-normal text-body-md md:text-body-lg text-surface-container-lowest/90 mb-xl max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            Discover a curated collection of premium streetwear and signout tees. Exclusive 1st – 10th November Promo: 1 shirt GH₵ 55, 2 for GH₵ 105, 3 for GH₵ 155, 4 for GH₵ 205, and 5+ for GH₵ 50 each!
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

      {/* Signout & Streetwear Tees Collection Section - Featured Banner */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-lg w-full">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border border-zinc-800 p-6 sm:p-10 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Subtle Glow Backdrop */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Text Column */}
          <div className="relative z-10 max-w-xl text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-label font-bold text-xs uppercase tracking-widest">
              <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
              Special Promo: 1st – 10th November
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              Signout & Streetwear Tees
            </h2>

            <p className="font-body text-zinc-300 text-sm sm:text-base leading-relaxed">
              Celebrate your milestone with our premium heavyweight t-shirts. Crafted with 100% organic cotton to capture every signature and memory. Exclusive tiered bundle pricing available from 1st to 10th November!
            </p>

            {/* Promo Tier Pricing Breakdown Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 pb-1">
              <div className="bg-zinc-800/80 rounded-xl p-2.5 text-center border border-zinc-700/60">
                <span className="text-[11px] text-zinc-400 uppercase font-semibold block">1 Shirt</span>
                <span className="text-emerald-400 font-bold text-base sm:text-lg">GH₵ 55</span>
              </div>
              <div className="bg-zinc-800/80 rounded-xl p-2.5 text-center border border-zinc-700/60">
                <span className="text-[11px] text-zinc-400 uppercase font-semibold block">2 Shirts</span>
                <span className="text-emerald-400 font-bold text-base sm:text-lg">GH₵ 105</span>
              </div>
              <div className="bg-zinc-800/80 rounded-xl p-2.5 text-center border border-zinc-700/60">
                <span className="text-[11px] text-zinc-400 uppercase font-semibold block">3 Shirts</span>
                <span className="text-emerald-400 font-bold text-base sm:text-lg">GH₵ 155</span>
              </div>
              <div className="bg-zinc-800/80 rounded-xl p-2.5 text-center border border-zinc-700/60">
                <span className="text-[11px] text-zinc-400 uppercase font-semibold block">4 Shirts</span>
                <span className="text-emerald-400 font-bold text-base sm:text-lg">GH₵ 205</span>
              </div>
              <div className="col-span-2 sm:col-span-4 bg-amber-500/20 rounded-xl p-2.5 text-center border border-amber-500/40">
                <span className="text-[11px] text-amber-200 uppercase font-bold block">5 or more shirts</span>
                <span className="text-amber-300 font-bold text-base sm:text-lg">GH₵ 50 each</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-headline">
                From GH₵ 55.00 <span className="text-xs font-normal text-zinc-400 line-through">GH₵ 60.00</span>
              </span>

              <Link
                to="/shop?collection=Signout"
                className="py-3.5 px-7 bg-white hover:bg-zinc-100 text-black font-label font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl inline-flex items-center gap-2"
              >
                <span>Shop Promo Tees</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Right Image Banner Card */}
          <Link 
            to="/shop?collection=Signout"
            className="relative z-10 w-full md:w-5/12 h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden group border border-zinc-700/50 shadow-2xl block cursor-pointer"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage: `url('https://res.cloudinary.com/dvdsrlh5g/image/upload/f_auto,q_auto/Orderright/tshirts/signout/signout_tee_1')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-between text-white">
              <div>
                <span className="font-headline font-bold text-sm block">Class of '26 Graduation Tee</span>
                <span className="text-xs text-amber-400 font-semibold">1st – 10th Nov Promo • From GH₵ 55</span>
              </div>
              <span className="material-symbols-outlined text-white text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </Link>

        </div>
      </section>

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
