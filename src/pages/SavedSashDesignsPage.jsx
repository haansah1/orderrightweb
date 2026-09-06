import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function SavedSashDesignsPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [savedDesigns, setSavedDesigns] = useState(() => {
    try {
      const saved = localStorage.getItem('orderright_saved_sashes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleDelete = (id) => {
    const updated = savedDesigns.filter(d => d.id !== id);
    setSavedDesigns(updated);
    localStorage.setItem('orderright_saved_sashes', JSON.stringify(updated));
  };

  const handleAddToCart = (design) => {
    const cartSashItem = {
      id: `sash-${Date.now()}`,
      itemType: "graduation_sash",
      name: design.name || "Custom Heritage Sash",
      price: design.price || 130.00,
      currency: "GH₵",
      localPrice: design.price || 130.00,
      localCurrency: "GH₵",
      quantity: 1,
      image: design.template?.previewImage || '/media/sash_sample_1.png',
      size: "Standard (72\")",
      color: "Deep Satin Black",
      customizationData: {
        designId: design.id,
        university: design.university?.name,
        elements: design.elements
      }
    };

    addToCart(cartSashItem, "Standard (72\")", "Deep Satin Black", 1);
  };

  return (
    <div className="bg-sash-surface min-h-screen text-on-surface pt-24 pb-16">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-200">
          <div>
            <h1 className="font-montserrat font-bold text-3xl text-zinc-950">
              My Saved Sash Designs
            </h1>
            <p className="text-zinc-500 text-sm mt-1">
              Resume editing your custom graduation stoles or add them to your cart.
            </p>
          </div>

          <Link
            to="/sash-studio/designer"
            className="bg-zinc-950 hover:bg-black text-white font-embroidery text-sm tracking-widest px-5 py-2.5 rounded-xl shadow-sm flex items-center gap-2 uppercase"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>New Design</span>
          </Link>
        </div>

        {/* Designs List / Empty State */}
        {savedDesigns.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-zinc-200 shadow-sm max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-sash-gold flex items-center justify-center mx-auto text-3xl">
              🎓
            </div>
            <h3 className="font-montserrat font-bold text-xl text-zinc-900">
              No Saved Designs Yet
            </h3>
            <p className="text-zinc-500 text-sm max-w-xs mx-auto">
              Start creating your personalized graduation stole in our interactive Sash Studio.
            </p>
            <Link
              to="/sash-studio/designer"
              className="inline-block bg-sash-gold-dark hover:bg-sash-gold text-white font-embroidery text-sm tracking-widest py-3 px-6 rounded-xl shadow-md uppercase"
            >
              LAUNCH SASH STUDIO
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedDesigns.map(design => (
              <div
                key={design.id}
                className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-sash-gold uppercase tracking-wider">
                      {design.university?.shortName || "Custom Sash"}
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      {new Date(design.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="font-montserrat font-bold text-lg text-zinc-900 mb-2">
                    {design.name}
                  </h3>

                  <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100 mb-4 space-y-1.5 text-xs text-zinc-600">
                    <p><span className="font-semibold text-zinc-800">Elements:</span> {design.elements?.length || 0} customized layers</p>
                    <p><span className="font-semibold text-zinc-800">Fabric:</span> Deep Satin with Kente trim</p>
                    <p><span className="font-semibold text-zinc-800">Investment:</span> GH₵ {design.price?.toFixed(2) || "130.00"}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-zinc-100">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate('/sash-studio/designer')}
                      className="flex-1 bg-zinc-900 hover:bg-black text-white text-xs font-bold py-2.5 rounded-xl transition-colors uppercase tracking-wider"
                    >
                      Continue Editing
                    </button>
                    <button
                      onClick={() => handleAddToCart(design)}
                      className="bg-sash-gold-dark hover:bg-sash-gold text-white px-3 py-2.5 rounded-xl transition-colors"
                      title="Add to cart"
                    >
                      <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                    </button>
                  </div>
                  <button
                    onClick={() => handleDelete(design.id)}
                    className="w-full text-zinc-400 hover:text-red-600 text-[11px] font-medium py-1 text-center transition-colors"
                  >
                    Delete Draft
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
