import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SashCanvas from '../features/sash_studio/components/SashCanvas';
import { SashStudioProvider } from '../features/sash_studio/context/SashStudioContext';
import { GALLERY_SAMPLES } from '../features/sash_studio/data/sashTemplates';

function LandingPageContent() {
  const navigate = useNavigate();

  const steps = [
    { num: "01", title: "CHOOSE BASE", desc: "Select fabric color & finish" },
    { num: "02", title: "ADD DETAILS", desc: "Logos & Academic marks" },
    { num: "03", title: "PERSONALIZE", desc: "Names, quotes & verses" },
    { num: "04", title: "PREVIEW", desc: "High-fidelity render" },
    { num: "05", title: "ORDER", desc: "Secure checkout" }
  ];

  return (
    <div className="bg-sash-surface min-h-screen text-on-surface pt-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 text-center pt-8 pb-12">
        <span className="font-embroidery text-sash-gold-dark text-sm md:text-base tracking-widest uppercase block mb-3 font-semibold">
          OrderRight Graduation
        </span>
        
        <h1 className="font-montserrat font-extrabold text-4xl sm:text-5xl md:text-6xl text-zinc-950 tracking-tight leading-[1.1] mb-2">
          Design Your <br />
          Graduation Sash.
        </h1>

        <p className="font-serif italic text-2xl sm:text-3xl text-sash-gold-dark font-medium mb-6">
          Your Story. Your Achievement.
        </p>

        <p className="text-zinc-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
          Personalize your graduation sash with your name, programme, university logo, quote, verse, and meaningful symbols. Craft a physical legacy of your academic journey.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
          <Link
            to="/sash-studio/designer"
            className="w-full sm:w-auto flex-1 bg-sash-gold-dark hover:bg-sash-gold text-white font-embroidery text-lg tracking-widest py-3.5 px-8 rounded-full shadow-lg transition-all transform active:scale-95 text-center"
          >
            START DESIGNING
          </Link>
          <Link
            to="/sash-studio/gallery"
            className="w-full sm:w-auto flex-1 bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-300 font-embroidery text-lg tracking-widest py-3.5 px-8 rounded-full shadow-sm transition-all text-center"
          >
            VIEW SASH GALLERY
          </Link>
        </div>
      </section>

      {/* 2. HERO SASH SHOWCASE CANVAS */}
      <section className="max-w-2xl mx-auto px-4 my-6 flex justify-center">
        <div className="transform hover:scale-[1.02] transition-transform duration-500">
          <SashCanvas isPreviewMode={true} showGuides={false} />
        </div>
      </section>

      {/* 3. THE CRAFTING PROCESS (5 Steps) */}
      <section className="max-w-3xl mx-auto px-4 md:px-8 py-16 text-center border-t border-zinc-200/60 mt-12">
        <h2 className="font-montserrat font-bold text-3xl text-zinc-900 mb-2">
          The Crafting Process
        </h2>
        <p className="text-sm text-zinc-500 mb-12">
          From concept to reality in five simple steps.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-4">
          {steps.map((step) => (
            <div key={step.num} className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full border-2 border-zinc-200 bg-white flex items-center justify-center font-embroidery text-lg text-zinc-800 shadow-sm mb-3">
                {step.num}
              </div>
              <h3 className="font-embroidery text-sm text-zinc-900 tracking-wider mb-1 uppercase">
                {step.title}
              </h3>
              <p className="text-xs text-zinc-500 leading-snug max-w-[130px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SASH GALLERY SHOWCASE */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-8">
          <h2 className="font-montserrat font-bold text-3xl text-zinc-900 mb-1">
            Sash Gallery
          </h2>
          <p className="text-sm text-zinc-500">
            Inspiration from past graduates.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {GALLERY_SAMPLES.map((sample) => (
            <div 
              key={sample.id}
              onClick={() => navigate('/sash-studio/designer')}
              className="group bg-white rounded-2xl overflow-hidden border border-zinc-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col"
            >
              <div className="relative h-64 overflow-hidden bg-zinc-100">
                <img 
                  src={sample.image} 
                  alt={sample.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="bg-white/95 text-zinc-900 text-xs font-bold py-1.5 px-3 rounded-full uppercase tracking-wider">
                    Customize This
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-embroidery text-base text-zinc-900 tracking-wider uppercase">
                  {sample.title}
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {sample.subTitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/sash-studio/gallery"
            className="inline-flex items-center gap-1 font-embroidery text-sm text-zinc-700 hover:text-zinc-950 tracking-widest uppercase hover:underline"
          >
            <span>VIEW ALL GALLERY</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* 5. SUB-FOOTER BRANDING */}
      <footer className="max-w-4xl mx-auto px-4 text-center pt-16 border-t border-zinc-200/80 text-zinc-500 text-xs space-y-3">
        <p className="font-embroidery text-sm tracking-widest text-zinc-800 uppercase">
          Sash Studio
        </p>
        <div className="flex justify-center gap-6 text-zinc-600 font-medium">
          <Link to="/sash-studio/designer" className="hover:text-zinc-900">Design Guide</Link>
          <Link to="/sash-studio/gallery" className="hover:text-zinc-900">Gallery</Link>
          <Link to="/shop" className="hover:text-zinc-900">T-Shirts</Link>
          <Link to="/account" className="hover:text-zinc-900">Saved Designs</Link>
        </div>
        <p className="text-zinc-400 text-[11px] pt-2">
          © {new Date().getFullYear()} OrderRight Sash Studio. Handcrafted Excellence.
        </p>
      </footer>

    </div>
  );
}

export default function SashStudioLandingPage() {
  return (
    <SashStudioProvider>
      <LandingPageContent />
    </SashStudioProvider>
  );
}
