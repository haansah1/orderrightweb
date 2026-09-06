import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SashCanvas from '../features/sash_studio/components/SashCanvas';
import SmartSpaceMeter from '../features/sash_studio/components/SmartSpaceMeter';
import LayersAndControls from '../features/sash_studio/components/LayersAndControls';
import { SashStudioProvider, useSashStudio } from '../features/sash_studio/context/SashStudioContext';
import UniversitySelectorModal from '../features/sash_studio/components/UniversitySelectorModal';
import AdinkraLibraryModal from '../features/sash_studio/components/AdinkraLibraryModal';

function DesignerMain() {
  const {
    undo,
    redo,
    resetDesign,
    clearAll,
    canUndo,
    canRedo,
    zoomLevel,
    setZoomLevel,
    activeTab,
    setActiveTab,
    selectedTemplate,
    totalPrice,
    currency,
    activeSide,
    setActiveSide
  } = useSashStudio();

  const navigate = useNavigate();
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [uniModalOpen, setUniModalOpen] = useState(false);
  const [symbolsModalOpen, setSymbolsModalOpen] = useState(false);

  return (
    <div className="bg-sash-surface min-h-screen text-on-surface pt-20 pb-20 md:pb-12">
      
      {/* 1. TOP BREADCRUMB & HEADER */}
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-4 border-b border-zinc-200/70 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs md:text-sm text-zinc-500 font-inter">
          <Link to="/" className="hover:text-zinc-900">Home</Link>
          <span className="text-zinc-400">›</span>
          <Link to="/sash-studio" className="hover:text-zinc-900">Sash Studio</Link>
          <span className="text-zinc-400">›</span>
          <span className="text-zinc-900 font-semibold">Customizer</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/sash-studio/saved"
            className="text-xs font-embroidery tracking-widest text-zinc-600 hover:text-zinc-950 uppercase border border-zinc-300 rounded-lg px-3 py-1.5 bg-white shadow-sm"
          >
            Saved Drafts
          </Link>
        </div>
      </div>

      {/* Main Studio Container */}
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: STICKY INTERACTIVE CANVAS AREA (lg:col-span-6) */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 flex flex-col items-center">
            
            {/* Studio Canvas Card */}
            <div className="w-full bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col relative min-h-[640px] md:min-h-[720px] justify-between">
              
              {/* Floating Top Toolbar (Space Meter & Undo/Redo/Reset) */}
              <div className="p-4 flex items-center justify-between gap-2 z-20 w-full border-b border-zinc-100 bg-white/80 backdrop-blur-md">
                
                {/* Left: Embroidery Space Meter */}
                <SmartSpaceMeter className="scale-90 sm:scale-100 origin-left" />

                {/* Right: Undo / Redo / Reset / Clear Controls */}
                <div className="flex items-center gap-1 bg-zinc-50 border border-zinc-200 rounded-2xl p-1 shadow-sm">
                  <button
                    onClick={undo}
                    disabled={!canUndo}
                    className={`p-2 rounded-xl transition-colors ${
                      canUndo ? 'text-zinc-800 hover:bg-zinc-200' : 'text-zinc-300 cursor-not-allowed'
                    }`}
                    title="Undo"
                  >
                    <span className="material-symbols-outlined text-[20px]">undo</span>
                  </button>
                  <button
                    onClick={redo}
                    disabled={!canRedo}
                    className={`p-2 rounded-xl transition-colors ${
                      canRedo ? 'text-zinc-800 hover:bg-zinc-200' : 'text-zinc-300 cursor-not-allowed'
                    }`}
                    title="Redo"
                  >
                    <span className="material-symbols-outlined text-[20px]">redo</span>
                  </button>
                  <div className="w-[1px] h-5 bg-zinc-300 mx-0.5" />
                  <button
                    onClick={resetDesign}
                    className="p-2 rounded-xl text-zinc-600 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                    title="Reset to default"
                  >
                    <span className="material-symbols-outlined text-[20px]">refresh</span>
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Clear everything from the sash?')) {
                        clearAll();
                      }
                    }}
                    className="p-2 rounded-xl text-zinc-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Clear all — remove everything from sash"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete_sweep</span>
                  </button>
                </div>

              </div>

              {/* Central Interactive Sash Canvas */}
              <div className="flex-1 flex items-center justify-center p-2 relative overflow-hidden bg-zinc-50/40">
                <SashCanvas scale={zoomLevel} />

                {/* Floating Zoom Controls (Bottom Right of Canvas) */}
                <div className="absolute right-4 bottom-20 z-20 flex flex-col gap-1 bg-white/90 backdrop-blur-md border border-zinc-200 rounded-2xl p-1 shadow-md">
                  <button
                    onClick={() => setZoomLevel(prev => Math.min(1.4, prev + 0.1))}
                    className="p-2 rounded-xl text-zinc-700 hover:bg-zinc-100 transition-colors"
                    title="Zoom In"
                  >
                    <span className="material-symbols-outlined text-[20px]">zoom_in</span>
                  </button>
                  <button
                    onClick={() => setZoomLevel(prev => Math.max(0.8, prev - 0.1))}
                    className="p-2 rounded-xl text-zinc-700 hover:bg-zinc-100 transition-colors"
                    title="Zoom Out"
                  >
                    <span className="material-symbols-outlined text-[20px]">zoom_out</span>
                  </button>
                </div>

                {/* Floating "PREVIEW & ORDER" Gold Button over the stole */}
                <button
                  onClick={() => setIsPreviewModalOpen(true)}
                  className="absolute bottom-6 z-20 bg-sash-gold-dark hover:bg-sash-gold text-white font-embroidery text-sm tracking-widest py-2.5 px-6 rounded-full shadow-xl flex items-center gap-2 transform active:scale-95 transition-all"
                >
                  <span>PREVIEW & ORDER</span>
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                </button>

              </div>

              {/* Bottom Canvas Panel Selector */}
              <div className="p-3 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 font-inter">
                <span>Select active panel to customize:</span>
                <div className="flex items-center gap-1 bg-zinc-200/80 p-1 rounded-xl">
                  <button
                    onClick={() => setActiveSide('full')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      activeSide === 'full' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600'
                    }`}
                  >
                    Both Panels
                  </button>
                  <button
                    onClick={() => setActiveSide('left')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      activeSide === 'left' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600'
                    }`}
                  >
                    Left Side
                  </button>
                  <button
                    onClick={() => setActiveSide('right')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      activeSide === 'right' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600'
                    }`}
                  >
                    Right Side
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT: SCROLLABLE CONTROLS & LAYERS AREA (lg:col-span-6) */}
          <div className="lg:col-span-6">
            <LayersAndControls onOpenPreview={() => setIsPreviewModalOpen(true)} />
          </div>

        </div>

      </div>

      {/* 2. MOBILE BOTTOM NAVIGATION BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950 text-white border-t border-zinc-800 flex items-center justify-around py-2.5 px-2">
        <button
          onClick={() => setUniModalOpen(true)}
          className="flex flex-col items-center gap-1 text-zinc-400 hover:text-sash-gold"
        >
          <span className="material-symbols-outlined text-[20px]">school</span>
          <span className="font-embroidery text-[10px] tracking-wider">CREST</span>
        </button>
        <button
          onClick={() => setSymbolsModalOpen(true)}
          className="flex flex-col items-center gap-1 text-zinc-400 hover:text-sash-gold"
        >
          <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
          <span className="font-embroidery text-[10px] tracking-wider">SYMBOLS</span>
        </button>
        <button
          onClick={() => {
            window.scrollTo({ top: 600, behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 text-sash-gold-light"
        >
          <span className="material-symbols-outlined text-[20px]">title</span>
          <span className="font-embroidery text-[10px] tracking-wider">TEXT</span>
        </button>
        <button
          onClick={() => setIsPreviewModalOpen(true)}
          className="flex flex-col items-center gap-1 text-zinc-400 hover:text-sash-gold"
        >
          <span className="material-symbols-outlined text-[20px]">visibility</span>
          <span className="font-embroidery text-[10px] tracking-wider">PREVIEW</span>
        </button>
      </div>

      {/* 3. CLEAN HIGH-FIDELITY PREVIEW MODAL */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col border border-zinc-700 animate-fadeIn">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <h3 className="font-montserrat font-bold text-lg text-white">Final Sash Preview</h3>
                <p className="text-xs text-zinc-400">Clean embroidery layout ready for production</p>
              </div>
              <button 
                onClick={() => setIsPreviewModalOpen(false)}
                className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-white"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Modal Canvas (No guides, no bounding boxes) */}
            <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center bg-zinc-950">
              <SashCanvas isPreviewMode={true} showGuides={false} />
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-400 block">Total Investment</span>
                <span className="font-montserrat font-bold text-xl text-sash-gold-light">
                  {currency}{totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPreviewModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-xs font-semibold"
                >
                  Return to Edit
                </button>
                <button
                  onClick={() => {
                    setIsPreviewModalOpen(false);
                    // scroll to add to cart
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                  }}
                  className="bg-sash-gold-dark hover:bg-sash-gold text-white font-embroidery text-sm tracking-widest px-6 py-2.5 rounded-xl shadow-lg flex items-center gap-2"
                >
                  <span>PROCEED TO ORDER</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Auxiliary Modals */}
      <UniversitySelectorModal isOpen={uniModalOpen} onClose={() => setUniModalOpen(false)} />
      <AdinkraLibraryModal isOpen={symbolsModalOpen} onClose={() => setSymbolsModalOpen(false)} />

    </div>
  );
}

export default function SashDesignerPage() {
  return (
    <SashStudioProvider>
      <DesignerMain />
    </SashStudioProvider>
  );
}
