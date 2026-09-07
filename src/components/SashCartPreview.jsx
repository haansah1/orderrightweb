import React from 'react';
import { UniversityCrest, AdinkraIcon } from '../features/sash_studio/components/CrestsAndIcons';

export default function SashCartPreview({ item, className = "" }) {
  const data = item?.customizationData || {};
  const universityId = typeof data.universityId === 'string' ? data.universityId : (data.university?.id || 'ug_legon');
  
  const rawName = data.name || item?.name;
  const studentName = typeof rawName === 'string' ? rawName : (typeof rawName === 'object' && rawName?.content ? String(rawName.content) : 'GRADUATE NAME');
  
  const rawProg = data.programme;
  const programme = typeof rawProg === 'string' ? rawProg : (typeof rawProg === 'object' && rawProg?.content ? String(rawProg.content) : 'GRADUATION 2026');
  
  const rawVerse = data.verse;
  const verse = typeof rawVerse === 'string' ? rawVerse : (typeof rawVerse === 'object' && rawVerse?.content ? String(rawVerse.content) : null);
  
  const rawUni = data.university;
  const uniName = typeof rawUni === 'string' ? rawUni : (typeof rawUni === 'object' && rawUni?.name ? String(rawUni.name) : 'GRADUATION STOLE');

  // Find symbol element if customized
  const symbolElement = Array.isArray(data.elements) ? data.elements.find(e => e?.type === 'symbol') : null;
  const symbolId = typeof symbolElement?.symbolId === 'string' ? symbolElement.symbolId : (typeof data.symbolId === 'string' ? data.symbolId : null);

  return (
    <div className={`relative bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 p-2 text-white shadow-inner flex flex-col justify-between ${className}`}>
      {/* Pan-African trim accent border top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-yellow-400 to-emerald-600" />

      {/* University Logo & Crest */}
      <div className="flex items-center justify-between gap-2 pt-1 pb-1.5 border-b border-zinc-800/80">
        <div className="w-7 h-7 bg-white/10 rounded-lg p-0.5 flex items-center justify-center flex-shrink-0 border border-amber-500/30">
          <UniversityCrest id={universityId} className="w-5 h-5 object-contain" />
        </div>
        <div className="text-right min-w-0 flex-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block break-words whitespace-normal">
            {uniName}
          </span>
        </div>
      </div>

      {/* Embroidery Content Preview */}
      <div className="py-2 space-y-1.5 text-center">
        {/* Name */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-md py-1 px-2">
          <span className="text-[9px] uppercase tracking-widest font-extrabold text-amber-300 block break-words whitespace-normal font-mono">
            {studentName}
          </span>
        </div>

        {/* Programme */}
        <div className="text-[8px] uppercase tracking-wide font-medium text-zinc-300 break-words whitespace-normal px-1">
          🎓 {programme}
        </div>

        {/* Verse / Quote */}
        {verse && verse !== 'N/A' && (
          <div className="text-[8px] italic text-zinc-400 break-words whitespace-normal px-1">
            "{verse}"
          </div>
        )}
      </div>

      {/* Symbol Footer */}
      {symbolId && (
        <div className="pt-1 border-t border-zinc-800/80 flex items-center justify-center gap-1">
          <AdinkraIcon type={symbolId} className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[8px] font-semibold text-zinc-400 uppercase tracking-tighter">Official Adinkra</span>
        </div>
      )}
    </div>
  );
}
