import React from 'react';
import { Link } from 'react-router-dom';

export default function BentoGrid() {
  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-2xl">
      <div className="flex justify-between items-end mb-xl">
        <div>
          <h2 className="font-headline font-semibold text-headline-lg text-primary">Shop by Collection</h2>
          <p className="font-body text-body-md text-on-surface-variant">Click any collection card to explore</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter h-auto md:h-[600px]">
        
        {/* Large Feature Tile (Boys) - Whole Section Clickable */}
        <Link 
          to="/shop?collection=Boys"
          className="md:col-span-6 h-[400px] md:h-full relative rounded-2xl overflow-hidden group block cursor-pointer transition-shadow hover:shadow-2xl"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ 
              backgroundImage: `url('/media/boys_collection_bg.jpg')` 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
          <div className="absolute bottom-0 left-0 p-lg w-full flex flex-col justify-end">
            <h3 className="font-headline font-bold text-headline-lg text-white mb-xs drop-shadow-md">
              Boys
            </h3>
            <div className="font-label font-medium text-label-md text-white flex items-center group-hover:text-secondary-fixed transition-colors">
              <span>Explore Collection</span>
              <span className="material-symbols-outlined ml-xs text-[20px] transition-transform duration-300 group-hover:translate-x-1.5">arrow_forward</span>
            </div>
          </div>
        </Link>

        {/* Right Side Stack */}
        <div className="md:col-span-6 grid grid-cols-1 md:grid-rows-2 gap-gutter h-auto md:h-full">
          
          {/* Girls - Whole Section Clickable */}
          <Link 
            to="/shop?collection=Girls"
            className="h-[280px] md:h-full relative rounded-2xl overflow-hidden group block cursor-pointer transition-shadow hover:shadow-2xl"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ 
                backgroundImage: `url('/media/girls_collection_bg.jpg')` 
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
            <div className="absolute bottom-0 left-0 p-lg w-full flex flex-col justify-end">
              <h3 className="font-headline font-bold text-headline-lg text-white mb-xs drop-shadow-md">
                Girls
              </h3>
              <div className="font-label font-medium text-label-md text-white flex items-center group-hover:text-secondary-fixed transition-colors">
                <span>Explore Collection</span>
                <span className="material-symbols-outlined ml-xs text-[20px] transition-transform duration-300 group-hover:translate-x-1.5">arrow_forward</span>
              </div>
            </div>
          </Link>

          {/* Gen Z Lifestyle - Whole Section Clickable */}
          <Link 
            to="/gen-z"
            className="h-[280px] md:h-full relative rounded-2xl overflow-hidden group block cursor-pointer border border-amber-400/30 transition-shadow hover:shadow-2xl"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 filter brightness-95"
              style={{ 
                backgroundImage: `url('/media/genz_studio_lifestyle.jpg')` 
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-amber-400 text-black font-label font-extrabold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                Coming Soon
              </span>
            </div>
            <div className="absolute bottom-0 left-0 p-lg w-full flex flex-col justify-end z-10">
              <h3 className="font-headline font-bold text-headline-lg text-white mb-xs drop-shadow-md">
                Gen Z Lifestyle
              </h3>
              <div className="font-label font-medium text-label-md text-amber-300 flex items-center group-hover:text-amber-200 transition-colors">
                <span>Preview Drop & VIP Access</span>
                <span className="material-symbols-outlined ml-xs text-[20px] transition-transform duration-300 group-hover:translate-x-1.5">arrow_forward</span>
              </div>
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
}
