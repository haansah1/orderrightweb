import React, { useRef, useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { AdinkraIcon, UniversityCrest } from './CrestsAndIcons';

const GOLD_EMBROIDERY = '#FED65B';
const GOLD_SHADOW = '0 1px 0 #735c00, 0 -1px 0 #fff5d0, 1px 0 0 #574500, 0 2px 4px rgba(0,0,0,0.65)';
const ZONE_PADDING = 6;

/**
 * SashElement
 * Interactive layer on the sash. Supports:
 * - Drag to reposition (non-text elements)
 * - Corner resize handle
 * - Auto-sizing text to fill the zone
 * - Inline text editing on tap/click with visible cursor
 * - Hard clamping within the zone boundary
 */
export default function SashElement({
  element,
  isSelected,
  onSelect,
  onUpdate,
  isPreviewMode = false,
  panelWidth = 160,
  panelHeight = 520
}) {
  const elementRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(element.content || '');
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, startElemX: 0, startElemY: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, startW: 0, startH: 0 });
  const [autoFontSize, setAutoFontSize] = useState(24);

  const isText = isTextType(element.type);

  const elemX = isText ? ZONE_PADDING : Math.max(ZONE_PADDING, element.x ?? ZONE_PADDING);
  const elemY = isText ? ZONE_PADDING : Math.max(ZONE_PADDING, element.y ?? ZONE_PADDING);
  const elemW = isText ? (100 - ZONE_PADDING * 2) : Math.min(element.width ?? 80, 100 - ZONE_PADDING * 2);
  const elemH = isText ? (100 - ZONE_PADDING * 2) : Math.min(element.height ?? 80, 100 - ZONE_PADDING * 2);

  // Sync editText when content changes externally
  useEffect(() => {
    if (!isEditing) {
      setEditText(element.content || '');
    }
  }, [element.content, isEditing]);

  // ─── Clamp helper ──────────────────────────────────────────────────
  const clampPos = (x, y, w, h) => ({
    x: Math.max(ZONE_PADDING, Math.min(x, 100 - ZONE_PADDING - w)),
    y: Math.max(ZONE_PADDING, Math.min(y, 100 - ZONE_PADDING - h)),
  });

  // ─── DRAG (non-text elements only) ────────────────────────────────
  const handleDragStart = (e) => {
    if (isPreviewMode || isText) return;
    e.stopPropagation();
    onSelect(element.id);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setIsDragging(true);
    setDragStart({
      x: clientX,
      y: clientY,
      startElemX: element.x ?? ZONE_PADDING,
      startElemY: element.y ?? ZONE_PADDING,
    });
  };

  useEffect(() => {
    if (!isDragging) return;
    const handleMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = ((clientX - dragStart.x) / panelWidth) * 100;
      const dy = ((clientY - dragStart.y) / panelHeight) * 100;
      const w = element.width ?? 80;
      const h = element.height ?? 80;
      const clamped = clampPos(dragStart.startElemX + dx, dragStart.startElemY + dy, w, h);
      onUpdate(element.id, { x: clamped.x, y: clamped.y }, false);
    };
    const handleEnd = () => {
      setIsDragging(false);
      onUpdate(element.id, {}, true);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, dragStart, panelWidth, panelHeight, element.id, element.width, element.height, onUpdate]);

  // ─── RESIZE (non-text elements only) ──────────────────────────────
  const handleResizeStart = (e) => {
    if (isPreviewMode) return;
    e.stopPropagation();
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setIsResizing(true);
    setResizeStart({
      x: clientX,
      y: clientY,
      startW: element.width ?? 80,
      startH: element.height ?? 80,
    });
  };

  useEffect(() => {
    if (!isResizing) return;
    const handleMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const dw = ((clientX - resizeStart.x) / panelWidth) * 100;
      const dh = ((clientY - resizeStart.y) / panelHeight) * 100;
      const curX = element.x ?? ZONE_PADDING;
      const curY = element.y ?? ZONE_PADDING;
      const maxW = 100 - ZONE_PADDING - curX;
      const maxH = 100 - ZONE_PADDING - curY;
      const newW = Math.max(20, Math.min(maxW, resizeStart.startW + dw));
      const newH = Math.max(15, Math.min(maxH, resizeStart.startH + dh));
      if (!isText) {
        onUpdate(element.id, { width: newW, height: newH }, false);
      }
    };
    const handleEnd = () => {
      setIsResizing(false);
      onUpdate(element.id, {}, true);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isResizing, resizeStart, panelWidth, panelHeight, element.id, element.x, element.y, isText, onUpdate]);

  // ─── Auto-resize text font to fill zone ────────────────────────────
  const fitTextToZone = useCallback(() => {
    const container = textRef.current;
    if (!container || isEditing) return;
    const parent = container.parentElement;
    if (!parent) return;

    const maxW = parent.clientWidth;
    const maxH = parent.clientHeight;
    if (maxW <= 0 || maxH <= 0) return;

    let lo = 8;
    let hi = Math.min(maxH * 0.85, 64);
    let best = lo;

    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      container.style.fontSize = `${mid}px`;
      if (container.scrollHeight <= maxH + 1 && container.scrollWidth <= maxW + 1) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    setAutoFontSize(best);
    container.style.fontSize = `${best}px`;
  }, [isEditing]);

  useLayoutEffect(() => {
    if (isText && !isEditing) {
      const t = setTimeout(fitTextToZone, 20);
      return () => clearTimeout(t);
    }
  }, [element.content, element.type, panelWidth, panelHeight, fitTextToZone, isText, isEditing]);

  useEffect(() => {
    if (!isText) return;
    window.addEventListener('resize', fitTextToZone);
    return () => window.removeEventListener('resize', fitTextToZone);
  }, [isText, fitTextToZone]);

  // ─── Inline text editing ───────────────────────────────────────────
  const startEditing = (e) => {
    if (!isText || isPreviewMode) return;
    e.stopPropagation();
    onSelect(element.id);
    setIsEditing(true);
    setEditText(element.content || '');
    // Focus the hidden input after render
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 50);
  };

  const commitEdit = () => {
    if (!isEditing) return;
    const finalText = editText.toUpperCase().trim();
    onUpdate(element.id, { content: finalText }, true);
    setIsEditing(false);
  };

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      commitEdit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(element.content || '');
    }
  };

  if (!element.visible) return null;

  // ─── Render Content ────────────────────────────────────────────────
  const renderContent = () => {
    switch (element.type) {
      case 'crest':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <UniversityCrest id={element.universityId} className="max-w-full max-h-full object-contain" />
          </div>
        );
      case 'custom_logo':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img src={element.imageUrl} alt="Custom Crest" className="max-w-full max-h-full object-contain filter drop-shadow-md" />
          </div>
        );
      case 'symbol':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <AdinkraIcon type={element.symbolId} className="max-w-full max-h-full" color={GOLD_EMBROIDERY} />
          </div>
        );
      default:
        // Text content — show either the edit input or the display text
        if (isEditing) {
          return (
            <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
              <textarea
                ref={inputRef}
                value={editText}
                onChange={(e) => setEditText(e.target.value.toUpperCase())}
                onBlur={commitEdit}
                onKeyDown={handleEditKeyDown}
                className="w-full h-full resize-none border-none outline-none bg-transparent text-center uppercase tracking-wider font-embroidery"
                style={{
                  color: element.color || GOLD_EMBROIDERY,
                  fontSize: `${Math.max(10, autoFontSize - 2)}px`,
                  lineHeight: 1.15,
                  textShadow: GOLD_SHADOW,
                  fontFamily: element.fontFamily || "'Bebas Neue', sans-serif",
                  caretColor: GOLD_EMBROIDERY,
                  padding: '2px',
                  wordBreak: 'normal',
                  overflowWrap: 'normal',
                  whiteSpace: 'pre-wrap',
                }}
                autoFocus
              />
            </div>
          );
        }
        return (
          <div
            className="w-full h-full flex items-center justify-center overflow-hidden cursor-text"
            onClick={startEditing}
            onTouchEnd={startEditing}
          >
            <span
              ref={textRef}
              className="block w-full text-center uppercase tracking-wider font-embroidery select-none"
              style={{
                color: element.color || GOLD_EMBROIDERY,
                fontSize: `${autoFontSize}px`,
                lineHeight: 1.15,
                wordBreak: 'normal',
                overflowWrap: 'normal',
                whiteSpace: 'pre-wrap',
                textShadow: GOLD_SHADOW,
                fontFamily: element.fontFamily || "'Bebas Neue', sans-serif",
                maxHeight: '100%',
                overflow: 'hidden',
              }}
            >
              {element.content || (
                <span style={{ opacity: 0.35 }}>TAP TO EDIT</span>
              )}
            </span>
          </div>
        );
    }
  };

  return (
    <div
      ref={elementRef}
      onMouseDown={!isText ? handleDragStart : undefined}
      onTouchStart={!isText ? handleDragStart : undefined}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(element.id);
        if (isText && !isEditing && !isPreviewMode) {
          startEditing(e);
        }
      }}
      className={`absolute overflow-hidden ${
        isPreviewMode ? 'cursor-default' : isText ? 'cursor-text' : 'cursor-move'
      } ${isSelected && !isPreviewMode ? 'z-30' : 'z-10'}`}
      style={{
        left: `${elemX}%`,
        top: `${elemY}%`,
        width: `${elemW}%`,
        height: `${elemH}%`,
      }}
    >
      {renderContent()}

      {/* Selection indicator + resize handle */}
      {isSelected && !isPreviewMode && (
        <div
          className="absolute inset-0 rounded-sm pointer-events-none"
          style={{ border: `2px solid ${GOLD_EMBROIDERY}`, boxShadow: `0 0 8px rgba(254,214,91,0.25)` }}
        >
          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 rounded-full pointer-events-none" style={{ borderColor: GOLD_EMBROIDERY }} />
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 rounded-full pointer-events-none" style={{ borderColor: GOLD_EMBROIDERY }} />
          <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 rounded-full pointer-events-none" style={{ borderColor: GOLD_EMBROIDERY }} />

          {!isText && (
            <div
              onMouseDown={handleResizeStart}
              onTouchStart={handleResizeStart}
              className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full shadow-md cursor-se-resize pointer-events-auto flex items-center justify-center"
              style={{ backgroundColor: GOLD_EMBROIDERY, border: '2px solid #b8940a' }}
              title="Drag to resize"
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#8a6d00' }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function isTextType(type) {
  return ['name', 'verse', 'programme', 'quote', 'text'].includes(type) || !type;
}
