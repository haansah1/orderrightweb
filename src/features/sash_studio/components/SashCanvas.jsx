import React, { useRef, useState, useEffect, useCallback } from 'react';
import SashElement from './SashElement';
import { useSashStudio } from '../context/SashStudioContext';

/**
 * EMBROIDERY SAFE ZONES
 * Pixel-accurate positions detected from the red border rectangles on "sash border.png"
 * (image size: 1024×1536). Border thickness ~8px has been accounted for (inner edge used).
 */
const SASH_ZONES = {
  left_upper: {
    id: 'left_upper',
    panel: 'left',
    label: 'Left Upper',
    x: 17.9,
    y: 24.5,
    w: 25.1,
    h: 17.7,
  },
  left_lower: {
    id: 'left_lower',
    panel: 'left',
    label: 'Left Lower',
    x: 15.2,
    y: 57.7,
    w: 28.9,
    h: 20.6,
  },
  right_upper: {
    id: 'right_upper',
    panel: 'right',
    label: 'Right Upper',
    x: 56.0,
    y: 24.8,
    w: 27.5,
    h: 17.4,
  },
  right_lower: {
    id: 'right_lower',
    panel: 'right',
    label: 'Right Lower',
    x: 56.6,
    y: 57.2,
    w: 29.0,
    h: 21.7,
  },
};

/**
 * Content type options for the zone change dropdown
 */
const ZONE_CONTENT_OPTIONS = [
  { type: 'name',        label: 'Full Name',          icon: 'badge',           placeholder: 'ANSAH JUNIOR AGYEKU' },
  { type: 'programme',   label: 'Academic Programme', icon: 'school',          placeholder: 'BSC. COMPUTER SCIENCE 2026' },
  { type: 'crest',       label: 'University Logo',    icon: 'account_balance', placeholder: null },
  { type: 'symbol',      label: 'Adinkra Symbol',     icon: 'auto_awesome',    placeholder: null },
  { type: 'quote',       label: 'Graduation Quote',   icon: 'format_quote',    placeholder: 'YOUR QUOTE HERE' },
  { type: 'verse',       label: 'Bible Verse',        icon: 'menu_book',       placeholder: 'JEREMIAH 29:11' },
  { type: 'text',        label: 'Personal Message',   icon: 'edit_note',       placeholder: 'YOUR MESSAGE' },
];

/**
 * ZoneChangeDropdown
 * Small icon button that opens a floating dropdown to change what content lives in a zone.
 */
function ZoneChangeDropdown({ zone, currentElement, onChangeType, isPreviewMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  if (isPreviewMode) return null;

  // Determine which side the dropdown should open to avoid going off-screen
  const isRightSide = zone.panel === 'right';

  return (
    <div ref={dropdownRef} className="absolute z-40" style={{ top: '-2px', right: isRightSide ? 'auto' : '-2px', left: isRightSide ? '-2px' : 'auto' }}>
      {/* Change Icon Button */}
      <button
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        className="w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
        style={{
          backgroundColor: 'rgba(30,30,30,0.85)',
          border: '1.5px solid rgba(254,214,91,0.6)',
          backdropFilter: 'blur(4px)',
        }}
        title="Change content type"
      >
        <span className="material-symbols-outlined text-[12px] md:text-[14px]" style={{ color: '#FED65B' }}>swap_horiz</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute mt-1 rounded-xl shadow-2xl overflow-hidden animate-fadeIn"
          style={{
            width: '180px',
            backgroundColor: 'rgba(24,24,27,0.96)',
            border: '1px solid rgba(254,214,91,0.2)',
            backdropFilter: 'blur(12px)',
            right: isRightSide ? 'auto' : '0',
            left: isRightSide ? '0' : 'auto',
            zIndex: 100,
          }}
        >
          <div className="py-1">
            <div className="px-3 py-1.5 border-b border-zinc-700/50">
              <span className="text-[9px] uppercase tracking-widest font-semibold" style={{ color: '#FED65B' }}>
                Change to
              </span>
            </div>
            {ZONE_CONTENT_OPTIONS.map((opt) => {
              const isActive = currentElement?.type === opt.type;
              return (
                <button
                  key={opt.type}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChangeType(zone.id, opt);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-left transition-colors ${
                    isActive
                      ? 'bg-amber-900/30 text-amber-300'
                      : 'text-zinc-300 hover:bg-zinc-700/50 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]" style={{ color: isActive ? '#FED65B' : '#a1a1aa' }}>
                    {opt.icon}
                  </span>
                  <span className="text-xs font-medium truncate">{opt.label}</span>
                  {isActive && (
                    <span className="material-symbols-outlined text-[14px] ml-auto" style={{ color: '#FED65B' }}>check</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * SashCanvas
 * Renders the real sash photo with interactive embroidery zones,
 * each with a change-type dropdown and inline-editable elements.
 */
export default function SashCanvas({
  isPreviewMode = false,
  scale = 1,
  showGuides = true,
  onCanvasClick,
}) {
  const {
    elements,
    selectedElementId,
    setSelectedElementId,
    updateElement,
    addElement,
    removeElement,
    activeSide,
  } = useSashStudio();

  const containerRef = useRef(null);
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

  const handleImageLoad = useCallback((e) => {
    const { clientWidth, clientHeight } = e.target;
    setImgSize({ width: clientWidth, height: clientHeight });
  }, []);

  useEffect(() => {
    const onResize = () => {
      const img = containerRef.current?.querySelector('img');
      if (img) {
        setImgSize({ width: img.clientWidth, height: img.clientHeight });
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Resolve which zone an element belongs to
  const resolveZone = (element) => {
    if (element.zoneId && SASH_ZONES[element.zoneId]) return SASH_ZONES[element.zoneId];
    return SASH_ZONES.left_upper;
  };

  // Handle changing the content type for a zone
  const handleChangeZoneType = useCallback((zoneId, option) => {
    const zone = SASH_ZONES[zoneId];
    if (!zone) return;

    // Find existing element in this zone
    const existing = elements.find((el) => el.zoneId === zoneId);

    if (option.type === 'crest' || option.type === 'symbol') {
      // Non-text types: replace existing with a visual element
      if (existing) {
        // Update in-place
        updateElement(existing.id, {
          type: option.type,
          content: undefined,
          universityId: option.type === 'crest' ? 'ug_legon' : undefined,
          symbolId: option.type === 'symbol' ? 'gye_nyame' : undefined,
          x: 10,
          y: 10,
          width: 80,
          height: 80,
        });
      } else {
        addElement({
          type: option.type,
          side: zone.panel,
          zoneId: zoneId,
          universityId: option.type === 'crest' ? 'ug_legon' : undefined,
          symbolId: option.type === 'symbol' ? 'gye_nyame' : undefined,
          x: 10,
          y: 10,
          width: 80,
          height: 80,
        });
      }
    } else {
      // Text types
      if (existing) {
        updateElement(existing.id, {
          type: option.type,
          content: option.placeholder || '',
          fontFamily: 'Bebas Neue',
          color: '#fed65b',
          // Clear non-text props
          universityId: undefined,
          symbolId: undefined,
          imageUrl: undefined,
        });
      } else {
        addElement({
          type: option.type,
          side: zone.panel,
          zoneId: zoneId,
          content: option.placeholder || '',
          fontFamily: 'Bebas Neue',
          color: '#fed65b',
        });
      }
    }
  }, [elements, updateElement, addElement]);

  return (
    <div
      onClick={() => {
        if (onCanvasClick) onCanvasClick();
        setSelectedElementId(null);
      }}
      className="relative flex items-center justify-center p-4 md:p-8 select-none"
      style={{ transform: `scale(${scale})`, transformOrigin: 'center top' }}
    >
      <div ref={containerRef} className="relative inline-block">
        {/* The real sash image */}
        <img
          src="/media/sash  no-border.png"
          alt="Graduation Sash Mockup"
          onLoad={handleImageLoad}
          draggable={false}
          className="block w-auto max-w-full pointer-events-none"
          style={{
            height: 'clamp(400px, 70vh, 700px)',
            filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.45))',
          }}
        />

        {/* Embroidery Zone Overlays */}
        {imgSize.width > 0 &&
          Object.values(SASH_ZONES).map((zone) => {
            const isActive =
              activeSide === 'full' ||
              activeSide === 'both' ||
              activeSide === zone.panel ||
              !activeSide;
            const dimmed = !isActive;

            const left = (zone.x / 100) * imgSize.width;
            const top = (zone.y / 100) * imgSize.height;
            const width = (zone.w / 100) * imgSize.width;
            const height = (zone.h / 100) * imgSize.height;

            // Get the element in this zone
            const zoneElements = elements.filter((el) => resolveZone(el).id === zone.id);
            const primaryElement = zoneElements[0] || null;

            return (
              <div
                key={zone.id}
                onClick={(e) => e.stopPropagation()}
                className="absolute transition-opacity duration-300"
                style={{
                  left: `${left}px`,
                  top: `${top}px`,
                  width: `${width}px`,
                  height: `${height}px`,
                  opacity: dimmed ? 0.3 : 1,
                  pointerEvents: dimmed ? 'none' : 'auto',
                }}
              >
                {/* Guide border */}
                {showGuides && !isPreviewMode && (
                  <div
                    className="absolute inset-0 rounded-sm pointer-events-none"
                    style={{
                      border: '1.5px dashed rgba(234, 179, 8, 0.45)',
                      boxShadow: 'inset 0 0 12px rgba(234, 179, 8, 0.05)',
                    }}
                  >
                    <span
                      className="absolute -top-4 left-1 text-[8px] tracking-wider uppercase font-medium"
                      style={{ color: 'rgba(234, 179, 8, 0.5)' }}
                    >
                      {zone.label}
                    </span>
                  </div>
                )}

                {/* Change Type Dropdown Icon */}
                <ZoneChangeDropdown
                  zone={zone}
                  currentElement={primaryElement}
                  onChangeType={handleChangeZoneType}
                  isPreviewMode={isPreviewMode}
                />

                {/* Render elements in this zone */}
                {zoneElements.map((element) => (
                  <SashElement
                    key={element.id}
                    element={element}
                    isSelected={selectedElementId === element.id}
                    onSelect={(id) => setSelectedElementId(id)}
                    onUpdate={updateElement}
                    isPreviewMode={isPreviewMode}
                    panelWidth={width}
                    panelHeight={height}
                  />
                ))}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export { SASH_ZONES };
