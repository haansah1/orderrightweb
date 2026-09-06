import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { fetchProducts } from '../services/api';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialVibe = searchParams.get('vibe') || 'All';
  const initialCat = searchParams.get('category') || 'All';
  const initialCollection = searchParams.get('collection') || 'All';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedVibe, setSelectedVibe] = useState(initialVibe);
  const [selectedCollection, setSelectedCollection] = useState(initialCollection);
  const [selectedPriceRange, setSelectedPriceRange] = useState({ label: 'All Prices', min: 0, max: 10000 });
  const [sortBy, setSortBy] = useState('recommended');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const params = {};
      if (selectedCategory !== 'All') params.category = selectedCategory;
      if (selectedVibe !== 'All') params.vibe = selectedVibe;
      if (selectedCollection !== 'All') params.collection = selectedCollection;
      if (selectedPriceRange.min > 0) params.minPrice = selectedPriceRange.min;
      if (selectedPriceRange.max < 10000) params.maxPrice = selectedPriceRange.max;

      if (sortBy === 'price-low') params.sort = 'price-low';
      if (sortBy === 'price-high') params.sort = 'price-high';
      if (sortBy === 'newest') params.sort = 'newest';

      const res = await fetchProducts(params);
      setProducts(res.products);
      setLoading(false);
    }

    loadProducts();
  }, [selectedCategory, selectedVibe, selectedCollection, selectedPriceRange, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedVibe('All');
    setSelectedPriceRange({ label: 'All Prices', min: 0, max: 10000 });
    setSortBy('recommended');
    setSearchParams({});
  };

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-28 pb-2xl min-h-screen">
      
      {/* Header & Sorting */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-xl border-b border-surface-container-highest pb-lg gap-md">
        <div>
          <h1 className="font-display font-bold text-display-lg-mobile md:text-display-lg text-primary mb-xs">
            Shop All Collections
          </h1>
          <p className="font-body text-body-md text-on-surface-variant">
            Explore our complete line of high-fashion apparel and accessories.
          </p>
        </div>

        <div className="flex justify-between items-center md:justify-end gap-md">
          {/* Mobile Filter Toggle Button */}
          <button 
            onClick={() => setMobileFiltersOpen(true)}
            className="md:hidden flex items-center gap-2 bg-surface-container px-4 py-2.5 rounded-lg border border-outline-variant text-label-md font-label uppercase"
          >
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            Filters
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label className="font-label text-label-md text-on-surface-variant uppercase hidden sm:inline">Sort By</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-surface-container-lowest border border-surface-container-highest text-primary font-body text-body-md rounded-lg px-3 py-2 focus:border-primary outline-none cursor-pointer"
            >
              <option value="recommended">Recommended</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-gutter">
        {/* Desktop Sidebar Filters */}
        <div className="hidden md:block md:w-1/4">
          <FilterSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedVibe={selectedVibe}
            setSelectedVibe={setSelectedVibe}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
            onResetFilters={handleResetFilters}
          />
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
            <div className="bg-surface w-4/5 max-w-sm h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-surface-container-highest">
                  <h3 className="font-headline font-bold text-headline-md text-primary">Filters</h3>
                  <button onClick={() => setMobileFiltersOpen(false)} className="text-on-surface-variant p-1">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                <FilterSidebar
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedVibe={selectedVibe}
                  setSelectedVibe={setSelectedVibe}
                  selectedPriceRange={selectedPriceRange}
                  setSelectedPriceRange={setSelectedPriceRange}
                  onResetFilters={handleResetFilters}
                />
              </div>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-4 bg-primary text-on-primary font-label text-label-md uppercase tracking-wider rounded-lg mt-6"
              >
                Apply Filters ({products.length} Items)
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="w-full md:w-3/4">
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-gutter">
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} className="aspect-[3/4] bg-surface-container-high rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (selectedCategory !== 'All' && selectedCategory !== 'Tops') || (selectedVibe !== 'All') ? (
            <div className="flex flex-col items-center justify-center py-2xl text-center bg-surface-container-low rounded-2xl border border-surface-container-highest p-xl shadow-sm">
              <div className="w-16 h-16 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center mb-md border border-amber-500/20">
                <span className="material-symbols-outlined text-[36px]">auto_awesome</span>
              </div>
              <span className="bg-amber-400 text-black font-label font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-sm">
                Coming Soon
              </span>
              <h3 className="font-headline font-bold text-headline-lg text-primary mb-xs">
                {selectedCategory !== 'All' && selectedCategory !== 'Tops' ? selectedCategory : selectedVibe} Collection — Coming Soon
              </h3>
              <p className="font-body text-body-md text-on-surface-variant mb-lg max-w-md">
                We are currently preparing and curating the official release for this collection. Explore our available Tops in the meantime!
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-primary text-on-primary font-label text-label-md px-6 py-3 rounded-lg uppercase tracking-wider hover:bg-surface-tint"
              >
                View Available Collections
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-2xl text-center bg-surface-container-low rounded-2xl border border-surface-container-highest p-xl">
              <span className="material-symbols-outlined text-[64px] text-outline-variant mb-md">search_off</span>
              <h3 className="font-headline font-bold text-headline-md text-primary mb-xs">No Products Found</h3>
              <p className="font-body text-body-md text-on-surface-variant mb-lg max-w-md">
                We couldn't find any products matching your active filter criteria.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-primary text-on-primary font-label text-label-md px-6 py-3 rounded-lg uppercase tracking-wider hover:bg-surface-tint"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-gutter">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
