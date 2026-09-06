import React from 'react';

export default function FilterSidebar({ 
  selectedCategory, 
  setSelectedCategory,
  selectedVibe,
  setSelectedVibe,
  selectedPriceRange,
  setSelectedPriceRange,
  onResetFilters
}) {
  const categories = ['All', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Accessories'];
  const vibes = ['All', 'Streetwear', 'Classy', 'Gen Z Lifestyle'];
  const priceRanges = [
    { label: 'All Prices', min: 0, max: 10000 },
    { label: 'Under GH₵ 500', min: 0, max: 500 },
    { label: 'GH₵ 500 - GH₵ 1,000', min: 500, max: 1000 },
    { label: 'Over GH₵ 1,000', min: 1000, max: 10000 }
  ];

  return (
    <aside className="w-full flex flex-col gap-lg pr-lg">
      
      {/* Category Filter */}
      <div className="border-b border-surface-container-highest pb-lg">
        <h3 className="font-headline font-bold text-headline-md text-primary mb-md">Category</h3>
        <div className="flex flex-col space-y-sm">
          {categories.map((cat) => {
            const isComingSoon = cat !== 'All' && cat !== 'Tops';
            return (
              <label key={cat} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center space-x-sm">
                  <input 
                    type="radio" 
                    name="category"
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                    className="accent-primary w-4 h-4 cursor-pointer"
                  />
                  <span className={`font-body text-body-md transition-colors ${
                    selectedCategory === cat ? 'text-primary font-semibold' : 'text-on-surface-variant group-hover:text-primary'
                  }`}>
                    {cat === 'All' ? 'All Clothing' : cat}
                  </span>
                </div>
                {isComingSoon && (
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full">
                    Coming Soon
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>

      {/* Vibe Filter */}
      <div className="border-b border-surface-container-highest pb-lg">
        <h3 className="font-headline font-bold text-headline-md text-primary mb-md">Shop by Vibe</h3>
        <div className="flex flex-col space-y-sm">
          {vibes.map((vibe) => {
            const isComingSoon = vibe !== 'All';
            return (
              <label key={vibe} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center space-x-sm">
                  <input 
                    type="radio" 
                    name="vibe"
                    checked={selectedVibe === vibe}
                    onChange={() => setSelectedVibe(vibe)}
                    className="accent-primary w-4 h-4 cursor-pointer"
                  />
                  <span className={`font-body text-body-md transition-colors ${
                    selectedVibe === vibe ? 'text-primary font-semibold' : 'text-on-surface-variant group-hover:text-primary'
                  }`}>
                    {vibe === 'All' ? 'All Vibes' : vibe}
                  </span>
                </div>
                {isComingSoon && (
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full">
                    Coming Soon
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Filter */}
      <div className="border-b border-surface-container-highest pb-lg">
        <h3 className="font-headline font-bold text-headline-md text-primary mb-md">Price Range</h3>
        <div className="flex flex-col space-y-sm">
          {priceRanges.map((range, idx) => (
            <label key={idx} className="flex items-center space-x-sm cursor-pointer group">
              <input 
                type="radio" 
                name="priceRange"
                checked={selectedPriceRange.label === range.label}
                onChange={() => setSelectedPriceRange(range)}
                className="accent-primary w-4 h-4 cursor-pointer"
              />
              <span className={`font-body text-body-md transition-colors ${
                selectedPriceRange.label === range.label ? 'text-primary font-semibold' : 'text-on-surface-variant group-hover:text-primary'
              }`}>
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset Filters */}
      <button
        onClick={onResetFilters}
        className="w-full py-3 bg-surface-container border border-outline-variant text-on-surface font-label text-label-md uppercase tracking-wider rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined text-[18px]">restart_alt</span>
        Reset All Filters
      </button>
    </aside>
  );
}
