import React from 'react';
import { Link } from 'react-router-dom';
import { GALLERY_SAMPLES } from '../features/sash_studio/data/sashTemplates';

export default function SashGalleryPage() {
  return (
    <div className="bg-sash-surface min-h-screen text-on-surface pt-24 pb-16">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-embroidery text-sash-gold-dark text-sm tracking-widest uppercase block mb-2 font-semibold">
            Inspiration Gallery
          </span>
          <h1 className="font-montserrat font-bold text-4xl text-zinc-950 mb-3">
            Graduation Stoles & Sashes
          </h1>
          <p className="text-zinc-600 text-sm">
            Explore our authentic collection of custom graduation stoles and sashes created for graduates across West Africa.
          </p>
        </div>

        {/* Single Filter Category Pill (All) */}
        <div className="flex justify-center mb-10">
          <span className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-zinc-900 text-white shadow-md">
            All Sashes ({GALLERY_SAMPLES.length})
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {GALLERY_SAMPLES.map(sample => (
            <div
              key={sample.id}
              className="bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div className="relative h-80 overflow-hidden bg-zinc-100">
                <img
                  src={sample.image}
                  alt={sample.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-sash-gold-light text-xs font-bold px-3.5 py-1.5 rounded-full font-embroidery tracking-wider shadow-md">
                  GH₵ {sample.price.toFixed(2)}
                </div>
              </div>

              <div className="p-6 space-y-2">
                <h3 className="font-embroidery text-xl text-zinc-900 tracking-wider uppercase">
                  {sample.title}
                </h3>
                <p className="text-xs text-zinc-500 font-medium">
                  {sample.subTitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 bg-zinc-950 text-white rounded-3xl p-8 md:p-12 text-center border border-zinc-800 shadow-xl max-w-3xl mx-auto space-y-4">
          <h2 className="font-montserrat font-bold text-2xl md:text-3xl">
            Want to design your own sash?
          </h2>
          <p className="text-zinc-400 text-sm max-w-md mx-auto">
            Our interactive Sash Studio lets you customize stoles with your school crest, custom text, and Adinkra symbols.
          </p>
          <Link
            to="/sash-studio/designer"
            className="inline-block bg-sash-gold-dark hover:bg-sash-gold text-white font-embroidery text-base tracking-widest py-3.5 px-8 rounded-full shadow-lg transition-transform active:scale-95 uppercase font-bold"
          >
            OPEN SASH STUDIO
          </Link>
        </div>

      </div>
    </div>
  );
}
