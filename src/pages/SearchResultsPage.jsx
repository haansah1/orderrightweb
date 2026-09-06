import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';

export default function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(queryParam);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSearch() {
      setLoading(true);
      const res = await fetchProducts({ search: queryParam });
      setProducts(res.products);
      setLoading(false);
    }
    loadSearch();
  }, [queryParam]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    }
  };

  return (
    <main className="pt-28 pb-2xl max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full min-h-screen">
      
      {/* Search Header Form */}
      <div className="max-w-2xl mx-auto mb-xl text-center space-y-md">
        <h1 className="font-display font-bold text-display-lg-mobile md:text-display-lg text-primary">Search Catalog</h1>
        
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search streetwear, tees, totes, blazers..."
            className="flex-grow bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 font-body text-body-md text-on-surface focus:outline-none focus:border-primary shadow-xs"
          />
          <button
            type="submit"
            className="bg-primary text-on-primary font-label text-label-md px-6 py-3 rounded-xl uppercase tracking-wider hover:bg-surface-tint transition-colors"
          >
            Search
          </button>
        </form>

        {queryParam && (
          <p className="font-body text-body-md text-on-surface-variant">
            Showing results for <strong className="text-primary">"{queryParam}"</strong> ({products.length} found)
          </p>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="aspect-[3/4] bg-surface-container-high rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-2xl text-center bg-surface-container-low rounded-2xl border border-surface-container-highest p-xl max-w-xl mx-auto">
          <span className="material-symbols-outlined text-[64px] text-outline-variant mb-md">search_off</span>
          <h3 className="font-headline font-bold text-headline-md text-primary mb-xs">No Matching Products</h3>
          <p className="font-body text-body-md text-on-surface-variant mb-lg">
            We couldn't find any clothing matching "{queryParam}". Try searching for another keyword.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </main>
  );
}
