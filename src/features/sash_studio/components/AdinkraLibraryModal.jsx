import React, { useState } from 'react';
import { ADINKRA_SYMBOLS } from '../data/adinkraSymbols';
import { AdinkraIcon } from './CrestsAndIcons';
import { useSashStudio } from '../context/SashStudioContext';

export default function AdinkraLibraryModal({ isOpen, onClose }) {
  const { addSymbol } = useSashStudio();
  const [searchTerm, setSearchTerm] = useState('');
  const [targetSide, setTargetSide] = useState('right'); // 'left' or 'right'

  if (!isOpen) return null;

  const filteredSymbols = ADINKRA_SYMBOLS.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col border border-zinc-200 animate-fadeIn">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
          <div>
            <h3 className="font-montserrat font-bold text-xl text-zinc-900">Adinkra Symbol Library</h3>
            <p className="text-xs text-zinc-500 mt-0.5">Select a symbol reflecting your values and heritage</p>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Search & Side Selection */}
        <div className="p-4 bg-zinc-50 border-b border-zinc-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative flex-1 w-full">
            <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-zinc-400 text-[20px]">
              search
            </span>
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search symbols by name, meaning (e.g. God, Wisdom, Strength)..."
              className="w-full bg-white border border-zinc-200 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-800 focus:outline-none focus:border-sash-gold"
              autoFocus
            />
          </div>

          {/* Place On Panel Toggle */}
          <div className="flex items-center gap-1 bg-zinc-200/80 p-1 rounded-xl w-full sm:w-auto justify-center">
            <button
              onClick={() => setTargetSide('left')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                targetSide === 'left' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600'
              }`}
            >
              Left Panel
            </button>
            <button
              onClick={() => setTargetSide('right')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                targetSide === 'right' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600'
              }`}
            >
              Right Panel
            </button>
          </div>
        </div>

        {/* Symbols Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[440px]">
          {filteredSymbols.map(sym => (
            <div
              key={sym.id}
              onClick={() => {
                addSymbol(sym.id, targetSide);
                onClose();
              }}
              className="group p-4 rounded-2xl border border-zinc-200 bg-white hover:border-sash-gold hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center justify-between"
            >
              <div className="w-16 h-16 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center p-2 mb-3 group-hover:scale-110 transition-transform">
                <AdinkraIcon type={sym.iconType} iconUrl={sym.iconUrl} className="w-10 h-10 object-contain" />
              </div>
              <div>
                <h4 className="font-embroidery text-base text-zinc-900 tracking-wider">
                  {sym.name}
                </h4>
                <p className="text-[11px] text-zinc-500 font-medium leading-snug line-clamp-2">
                  {sym.meaning}
                </p>
              </div>
              <span className="mt-2 text-[10px] text-sash-gold font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                + Add to {targetSide}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
