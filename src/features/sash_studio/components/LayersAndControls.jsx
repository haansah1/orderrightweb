import React, { useState } from 'react';
import { useSashStudio } from '../context/SashStudioContext';
import { useCart } from '../../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import UniversitySelectorModal from './UniversitySelectorModal';
import AdinkraLibraryModal from './AdinkraLibraryModal';
import { AdinkraIcon, UniversityCrest } from './CrestsAndIcons';
import { generateSashSnapshot } from '../utils/generateSashSnapshot';

export default function LayersAndControls({ onOpenPreview }) {
  const {
    elements,
    selectedElementId,
    setSelectedElementId,
    updateElement,
    removeElement,
    addSymbol,
    selectedUniversity,
    nameSpaceUsage,
    verseSpaceUsage,
    progSpaceUsage,
    basePrice,
    customEmbroideryPrice,
    totalPrice,
    currency,
    localCurrency,
    localPrice,
    selectedTemplate,
    saveCurrentDesign
  } = useSashStudio();

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [uniModalOpen, setUniModalOpen] = useState(false);
  const [symbolsModalOpen, setSymbolsModalOpen] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  // Find primary elements
  const leftNameElem = elements.find(e => e.type === 'name' || e.zoneId === 'left_lower');
  const rightVerseElem = elements.find(e => e.type === 'verse' || e.zoneId === 'right_upper');
  const rightProgElem = elements.find(e => e.type === 'programme' || e.zoneId === 'right_lower');
  const symbolElem = elements.find(e => e.type === 'symbol');
  const hasAdinkraSymbol = Boolean(symbolElem);

  // Handle Add To Cart with Custom Sash Payload
  const handleAddToCart = async () => {
    const savedDesign = saveCurrentDesign(`${selectedUniversity?.shortName || 'Custom'} Heritage Sash`);
    
    // Generate actual snapshot preview image of the custom sash
    const snapshotImage = await generateSashSnapshot({
      selectedUniversity,
      leftName: leftNameElem?.content,
      rightVerse: rightVerseElem?.content,
      rightProg: rightProgElem?.content,
      elements
    });

    // Create cart item
    const cartSashItem = {
      id: `sash-${Date.now()}`,
      itemType: "graduation_sash",
      name: `Custom Heritage Sash (${selectedUniversity?.shortName || 'Custom'})`,
      price: totalPrice,
      currency: "GH₵",
      localPrice: localPrice,
      localCurrency: localCurrency,
      quantity: 1,
      image: snapshotImage,
      size: "Standard (72\")",
      color: "Deep Satin Black / Pan-African Trim",
      customizationData: {
        designId: savedDesign.id,
        university: selectedUniversity?.name,
        universityId: selectedUniversity?.id,
        name: leftNameElem?.content || "N/A",
        verse: rightVerseElem?.content || "N/A",
        programme: rightProgElem?.content || "N/A",
        elements: elements,
        basePrice,
        customEmbroideryPrice,
        totalPrice
      }
    };

    addToCart(cartSashItem, "Standard (72\")", "Deep Satin Black", 1);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  return (
    <div className="w-full space-y-6 animate-fadeIn pb-12">
      
      {/* 1. DESIGN TEXT SECTION */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-200/80 shadow-sm space-y-5">
        <div>
          <h2 className="font-montserrat font-bold text-2xl text-zinc-900">Design Text</h2>
          <p className="text-sm text-zinc-500 mt-1">
            Personalize your sash with your name, degree, or a meaningful quote.
          </p>
        </div>

        {/* Left Side Text (Name) */}
        <div className="space-y-1.5">
          <label className="font-embroidery text-xs text-zinc-600 uppercase tracking-wider block">
            Left Side Text
          </label>
          <input
            type="text"
            value={leftNameElem?.content || ""}
            onChange={(e) => {
              if (leftNameElem) {
                updateElement(leftNameElem.id, { content: e.target.value.toUpperCase() });
              }
            }}
            placeholder="e.g. ANSAH JUNIOR AGYEKU"
            className="w-full bg-zinc-50/60 border border-zinc-300 rounded-xl px-4 py-3 text-base font-medium text-zinc-900 focus:outline-none focus:border-sash-gold tracking-wide uppercase"
          />
          {/* Smart Space Usage Meter */}
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="font-medium text-zinc-700">
              {nameSpaceUsage.words}/{nameSpaceUsage.maxWords} words used
            </span>
            <span className={nameSpaceUsage.isOverLimit ? "text-red-600 font-bold" : "text-zinc-500"}>
              {nameSpaceUsage.statusMessage}
            </span>
          </div>
          <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${nameSpaceUsage.isOverLimit ? 'bg-red-500' : 'bg-sash-gold'}`}
              style={{ width: `${Math.min(100, nameSpaceUsage.percentage)}%` }}
            />
          </div>
        </div>

        {/* Right Side Text - Top (Quote / Verse) */}
        <div className="space-y-1.5 pt-2">
          <label className="font-embroidery text-xs text-zinc-600 uppercase tracking-wider block">
            Right Side Text - Top
          </label>
          <input
            type="text"
            value={rightVerseElem?.content || ""}
            onChange={(e) => {
              if (rightVerseElem) {
                updateElement(rightVerseElem.id, { content: e.target.value.toUpperCase() });
              }
            }}
            placeholder="e.g. TRUST IN GOD'S PLAN"
            className="w-full bg-zinc-50/60 border border-zinc-300 rounded-xl px-4 py-3 text-base font-medium text-zinc-900 focus:outline-none focus:border-sash-gold tracking-wide uppercase"
          />
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="font-medium text-zinc-700">
              {verseSpaceUsage.words}/{verseSpaceUsage.maxWords} words used
            </span>
            <span className={verseSpaceUsage.isOverLimit ? "text-red-600 font-bold" : "text-zinc-500"}>
              {verseSpaceUsage.statusMessage}
            </span>
          </div>
        </div>

        {/* Right Side Text - Bottom (Degree / Programme) */}
        <div className="space-y-1.5 pt-2">
          <label className="font-embroidery text-xs text-zinc-600 uppercase tracking-wider block">
            Right Side Text - Bottom
          </label>
          <input
            type="text"
            value={rightProgElem?.content || ""}
            onChange={(e) => {
              if (rightProgElem) {
                updateElement(rightProgElem.id, { content: e.target.value.toUpperCase() });
              }
            }}
            placeholder="e.g. BSC. COMPUTER SCIENCE 2026"
            className="w-full bg-zinc-50/60 border border-zinc-300 rounded-xl px-4 py-3 text-base font-medium text-zinc-900 focus:outline-none focus:border-sash-gold tracking-wide uppercase"
          />
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="font-medium text-zinc-700">
              {progSpaceUsage.words}/{progSpaceUsage.maxWords} words used
            </span>
            <span className={progSpaceUsage.isOverLimit ? "text-red-600 font-bold" : "text-zinc-500"}>
              {progSpaceUsage.statusMessage}
            </span>
          </div>
        </div>

        {/* University Crest Picker Trigger */}
        <div className="pt-2">
          <div 
            onClick={() => setUniModalOpen(true)}
            className="flex items-center justify-between p-4 rounded-2xl border border-zinc-200 hover:border-sash-gold bg-zinc-50/60 hover:bg-amber-50/30 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center p-1">
                <UniversityCrest id={selectedUniversity?.crestSvg || 'ug_legon'} uni={selectedUniversity} className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs text-zinc-500 block">Selected Institution</span>
                <span className="font-montserrat font-bold text-sm text-zinc-900">{selectedUniversity?.name || "Choose University"}</span>
              </div>
            </div>
            <span className="text-xs font-bold text-sash-gold uppercase tracking-wider">Change</span>
          </div>
        </div>

      </div>

      {/* 2. ADINKRA SYMBOLS CARDS (Only visible when user changes one of the boxes on the sash to Adinkra symbol) */}
      {hasAdinkraSymbol && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-200/80 shadow-sm space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-montserrat font-bold text-2xl text-zinc-900">Adinkra Symbols</h2>
              <p className="text-xs text-zinc-500 mt-0.5">Click a symbol to replace the symbol at that part of the sash</p>
            </div>
            <button 
              onClick={() => setSymbolsModalOpen(true)}
              className="font-embroidery text-sm text-sash-gold-dark hover:text-sash-gold tracking-widest flex items-center gap-1"
            >
              <span>+ MORE</span>
            </button>
          </div>

          {/* Quick Selection Symbol Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { id: 'gye_nyame', name: 'GYE NYAME', meaning: 'Supremacy of God' },
              { id: 'sankofa', name: 'SANKOFA', meaning: 'Learn from the past' },
              { id: 'nkyinkyim', name: 'NKYINKYIM', meaning: 'Initiative, dynamism' },
              { id: 'adinkrahene', name: 'ADINKRAHENE', meaning: 'Greatness & leadership' },
              { id: 'dwennimmen', name: 'DWENNIMMEN', meaning: 'Strength & humility' },
              { id: 'mate_masie', name: 'MATE MASIE', meaning: 'Wisdom & knowledge' },
            ].map(sym => {
              const isSelected = symbolElem?.symbolId === sym.id;
              return (
                <div 
                  key={sym.id}
                  onClick={() => {
                    if (symbolElem) {
                      updateElement(symbolElem.id, { symbolId: sym.id });
                    } else {
                      addSymbol(sym.id, 'right');
                    }
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center relative ${
                    isSelected 
                      ? 'border-sash-gold bg-amber-50/50 shadow-md ring-1 ring-sash-gold' 
                      : 'border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-xs'
                  }`}
                >
                  <div className="w-10 h-10 mb-2 flex items-center justify-center">
                    <AdinkraIcon type={sym.id} className="w-8 h-8" />
                  </div>
                  <span className="font-embroidery text-xs sm:text-sm text-zinc-900 tracking-wider font-bold">{sym.name}</span>
                  <span className="text-[10px] text-zinc-500 font-medium mt-0.5">{sym.meaning}</span>
                  {isSelected && (
                    <span className="mt-2 text-[9px] bg-sash-gold-dark text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      Active on Sash
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. CURRENT DESIGN LAYERS */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-200/80 shadow-sm space-y-4">
        <h3 className="font-embroidery text-xs text-zinc-500 tracking-widest uppercase">
          Current Design Layers
        </h3>

        <div className="space-y-2">
          {elements.map((elem) => {
            const isSelected = selectedElementId === elem.id;
            return (
              <div 
                key={elem.id}
                onClick={() => setSelectedElementId(elem.id)}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected 
                    ? 'border-sash-gold bg-amber-50/50 shadow-sm' 
                    : 'border-zinc-100 bg-zinc-50/60 hover:bg-zinc-100/80'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-8 h-8 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-700 text-sm font-bold">
                    {elem.type === 'crest' || elem.type === 'custom_logo' ? '🎓' : elem.type === 'symbol' ? '✨' : 'T'}
                  </span>
                  <div className="truncate">
                    <h4 className="font-montserrat font-semibold text-xs text-zinc-900 truncate">
                      {elem.type === 'name' ? 'Left Text (Name)' : elem.type === 'crest' ? 'Crest Logo' : elem.type === 'verse' ? 'Right Verse' : elem.type === 'programme' ? 'Right Programme' : elem.name || 'Custom Element'}
                    </h4>
                    <p className="text-[11px] text-zinc-500 truncate">
                      {elem.content || elem.side?.toUpperCase() + ' PANEL'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedElementId(elem.id);
                    }}
                    className="p-1.5 text-zinc-400 hover:text-zinc-800 transition-colors"
                    title="Edit element"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      removeElement(elem.id);
                    }}
                    className="p-1.5 text-zinc-400 hover:text-red-600 transition-colors"
                    title="Delete element"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. PRICING & ORDER SUMMARY */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-200/80 shadow-sm space-y-6">
        <div className="space-y-2.5">
          <div className="flex justify-between text-sm text-zinc-600 font-inter">
            <span>Base Sash</span>
            <span className="font-medium text-zinc-900">{currency} {basePrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-zinc-600 font-inter">
            <span>Custom Embroidery</span>
            <span className="font-medium text-zinc-900">{currency} {customEmbroideryPrice.toFixed(2)}</span>
          </div>
          <div className="pt-3 border-t border-zinc-100 flex items-baseline justify-between">
            <span className="font-montserrat font-bold text-2xl text-zinc-900">Total</span>
            <div className="text-right">
              <span className="font-montserrat font-bold text-3xl text-zinc-900 tracking-tight">
                {currency} {totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Notice on Added */}
        {addedNotice && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold p-3 rounded-2xl flex items-center gap-2 animate-fadeIn">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>Custom Sash added to your OrderRight cart!</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleAddToCart}
            className="w-full bg-zinc-950 hover:bg-black text-white font-label font-bold text-sm py-4 rounded-2xl shadow-lg transition-all active:scale-[0.99] uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            <span>ADD TO CART</span>
          </button>

          <button
            onClick={onOpenPreview}
            className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-label font-semibold text-xs py-3 rounded-xl transition-all uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">visibility</span>
            <span>Full Clean Preview</span>
          </button>
        </div>

      </div>

      {/* Modals */}
      <UniversitySelectorModal 
        isOpen={uniModalOpen} 
        onClose={() => setUniModalOpen(false)} 
      />
      <AdinkraLibraryModal 
        isOpen={symbolsModalOpen} 
        onClose={() => setSymbolsModalOpen(false)} 
      />

    </div>
  );
}
