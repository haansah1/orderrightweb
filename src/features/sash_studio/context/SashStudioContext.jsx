import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SASH_TEMPLATES } from '../data/sashTemplates';
import { UNIVERSITIES, getUniversityById } from '../data/universities';
import { ADINKRA_SYMBOLS, getSymbolById } from '../data/adinkraSymbols';
import { EMBROIDERY_ZONES, calculateSpaceUsage, clampToZone } from '../data/embroideryZones';

const SashStudioContext = createContext();

const INITIAL_ELEMENTS = [
  {
    id: "elem-crest",
    type: "crest",
    side: "left",
    zoneId: "left_upper",
    universityId: "ug_legon",
    x: 10,
    y: 10,
    width: 80,
    height: 80,
    scale: 1,
    visible: true,
    zIndex: 1
  },
  {
    id: "elem-left-name",
    type: "name",
    side: "left",
    zoneId: "left_lower",
    content: "ANSAH JUNIOR AGYEKU",
    fontFamily: "Bebas Neue",
    color: "#fed65b",
    visible: true,
    zIndex: 2
  },
  {
    id: "elem-right-verse",
    type: "verse",
    side: "right",
    zoneId: "right_upper",
    content: "TRUST IN GOD'S PLAN",
    fontFamily: "Bebas Neue",
    color: "#fed65b",
    visible: true,
    zIndex: 3
  },
  {
    id: "elem-right-prog",
    type: "programme",
    side: "right",
    zoneId: "right_lower",
    content: "BSC. COMPUTER SCIENCE 2026",
    fontFamily: "Bebas Neue",
    color: "#fed65b",
    visible: true,
    zIndex: 4
  }
];

export function SashStudioProvider({ children }) {
  // Template & Base State
  const [selectedTemplate, setSelectedTemplate] = useState(SASH_TEMPLATES[0]);
  const [selectedUniversity, setSelectedUniversity] = useState(getUniversityById('ug_legon') || UNIVERSITIES[0]);
  const [activeSide, setActiveSide] = useState('full'); // 'full', 'left', 'right'
  const [activeTab, setActiveTab] = useState('text'); // 'design', 'symbols', 'text', 'layers', 'preview'
  const [selectedElementId, setSelectedElementId] = useState("elem-left-name");
  const [zoomLevel, setZoomLevel] = useState(1);

  // Design Elements
  const [elements, setElements] = useState(INITIAL_ELEMENTS);

  // Undo / Redo History
  const [history, setHistory] = useState([INITIAL_ELEMENTS]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Saved designs in localStorage
  const [savedDesigns, setSavedDesigns] = useState(() => {
    try {
      const saved = localStorage.getItem('orderright_saved_sashes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('orderright_saved_sashes', JSON.stringify(savedDesigns));
  }, [savedDesigns]);

  // Push state to history
  const pushHistory = useCallback((newElements) => {
    setHistory(prev => {
      const updated = prev.slice(0, historyIndex + 1);
      return [...updated, newElements];
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  // Update elements and record history
  const updateElements = useCallback((newElements, recordHistory = true) => {
    setElements(newElements);
    if (recordHistory) {
      pushHistory(newElements);
    }
  }, [pushHistory]);

  // Undo action
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const targetIndex = historyIndex - 1;
      setHistoryIndex(targetIndex);
      setElements(history[targetIndex]);
    }
  }, [historyIndex, history]);

  // Redo action
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const targetIndex = historyIndex + 1;
      setHistoryIndex(targetIndex);
      setElements(history[targetIndex]);
    }
  }, [historyIndex, history]);

  // Reset Design
  const resetDesign = useCallback(() => {
    updateElements(INITIAL_ELEMENTS);
    setSelectedElementId("elem-left-name");
  }, [updateElements]);

  // Clear everything from the sash
  const clearAll = useCallback(() => {
    updateElements([]);
    setSelectedElementId(null);
  }, [updateElements]);

  // Update a single element property
  const updateElement = useCallback((id, updates, recordHistory = true) => {
    setElements(prev => {
      const next = prev.map(elem => {
        if (elem.id !== id) return elem;
        const updated = { ...elem, ...updates };

        // Auto-clamp if x or y changed
        if (updates.x !== undefined || updates.y !== undefined) {
          const clamped = clampToZone(
            updated.x,
            updated.y,
            updated.width || 60,
            updated.height || 20,
            updated.zoneId
          );
          updated.x = clamped.x;
          updated.y = clamped.y;
        }

        return updated;
      });

      if (recordHistory) {
        pushHistory(next);
      }
      return next;
    });
  }, [pushHistory]);

  // Add new element to sash
  const addElement = useCallback((elementData) => {
    const newId = `elem-${Date.now()}`;
    const newElement = {
      id: newId,
      side: elementData.side || 'left',
      zoneId: elementData.zoneId || (elementData.side === 'right' ? 'right_upper' : 'left_upper'),
      width: elementData.width || 60,
      height: elementData.height || 20,
      x: elementData.x || 20,
      y: elementData.y || 30,
      scale: 1,
      visible: true,
      zIndex: elements.length + 1,
      ...elementData
    };

    const next = [...elements, newElement];
    updateElements(next);
    setSelectedElementId(newId);
    return newId;
  }, [elements, updateElements]);

  // Remove element from sash
  const removeElement = useCallback((id) => {
    const next = elements.filter(e => e.id !== id);
    updateElements(next);
    if (selectedElementId === id) {
      setSelectedElementId(next.length > 0 ? next[0].id : null);
    }
  }, [elements, selectedElementId, updateElements]);

  // Select university handler
  const setUniversity = useCallback((universityOrId) => {
    const uni = typeof universityOrId === 'string' ? getUniversityById(universityOrId) : universityOrId;
    if (!uni) return;
    setSelectedUniversity(uni);

    // Update existing crest element or add one
    setElements(prev => {
      const hasCrest = prev.some(e => e.type === 'crest');
      if (hasCrest) {
        return prev.map(e => e.type === 'crest' ? { ...e, universityId: uni.id } : e);
      } else {
        return [
          ...prev,
          {
            id: `elem-crest-${Date.now()}`,
            type: "crest",
            side: "left",
            zoneId: "left_upper",
            universityId: uni.id,
            x: 18,
            y: 18,
            width: 64,
            height: 18,
            scale: 1,
            visible: true,
            zIndex: 1
          }
        ];
      }
    });
  }, []);

  // Custom Logo Upload with University Name
  const uploadCustomLogo = useCallback((imageUrl, customName = "Custom University") => {
    const customUniObj = {
      id: "custom_logo",
      name: customName || "Custom University",
      shortName: customName ? (customName.length > 12 ? customName.slice(0, 10) + '...' : customName) : "Custom",
      location: "Custom Institution Upload",
      primaryColor: "#002060",
      secondaryColor: "#ffd700",
      crestSvg: "custom_logo",
      logoUrl: imageUrl,
      isActive: true
    };
    setSelectedUniversity(customUniObj);

    const newId = `elem-custom-logo-${Date.now()}`;
    const newElem = {
      id: newId,
      type: "custom_logo",
      side: "left",
      zoneId: "left_upper",
      imageUrl,
      universityId: "custom_logo",
      customUniversityName: customName,
      x: 18,
      y: 18,
      width: 64,
      height: 18,
      scale: 1,
      visible: true,
      zIndex: 2
    };
    const next = [...elements.filter(e => e.type !== 'crest' && e.type !== 'custom_logo'), newElem];
    updateElements(next);
    setSelectedElementId(newId);
  }, [elements, updateElements]);

  // Add or update Adinkra symbol
  const addSymbol = useCallback((symbolId, side = 'right') => {
    const sym = getSymbolById(symbolId);
    if (!sym) return;

    const existingSymbol = elements.find(e => e.type === 'symbol');
    if (existingSymbol) {
      updateElement(existingSymbol.id, {
        symbolId: sym.id,
        name: sym.name,
        side: side,
        zoneId: side === 'left' ? 'left_lower' : 'right_lower',
      });
      setSelectedElementId(existingSymbol.id);
    } else {
      const newId = `elem-symbol-${Date.now()}`;
      const newElem = {
        id: newId,
        type: "symbol",
        symbolId: sym.id,
        side: side,
        zoneId: side === 'left' ? 'left_lower' : 'right_lower',
        name: sym.name,
        x: 35,
        y: side === 'left' ? 70 : 45,
        width: 30,
        height: 16,
        scale: 1,
        color: "#fed65b",
        visible: true,
        zIndex: elements.length + 1
      };

      const next = [...elements, newElem];
      updateElements(next);
      setSelectedElementId(newId);
    }
  }, [elements, updateElements, updateElement]);

  // Save current design to drafts
  const saveCurrentDesign = useCallback((designName = "Custom Heritage Sash") => {
    const newDesign = {
      id: `design-${Date.now()}`,
      name: designName,
      createdAt: new Date().toISOString(),
      templateId: selectedTemplate.id,
      template: selectedTemplate,
      university: selectedUniversity,
      elements: [...elements],
      price: selectedTemplate.basePrice + selectedTemplate.embroideryPrice,
      currency: selectedTemplate.currency
    };

    setSavedDesigns(prev => [newDesign, ...prev]);
    return newDesign;
  }, [selectedTemplate, selectedUniversity, elements]);

  // Load a saved design into the studio
  const loadSavedDesign = useCallback((design) => {
    if (!design) return;
    const template = SASH_TEMPLATES.find(t => t.id === design.templateId) || SASH_TEMPLATES[0];
    setSelectedTemplate(template);
    if (design.university) setSelectedUniversity(design.university);
    if (design.elements) {
      updateElements(design.elements);
      setSelectedElementId(design.elements[0]?.id || null);
    }
  }, [updateElements]);

  // Delete saved design
  const deleteSavedDesign = useCallback((designId) => {
    setSavedDesigns(prev => prev.filter(d => d.id !== designId));
  }, []);

  // Active element helper
  const selectedElement = elements.find(e => e.id === selectedElementId) || null;

  // Space calculation for text elements
  const leftNameElement = elements.find(e => e.type === 'name' || e.zoneId === 'left_lower');
  const rightVerseElement = elements.find(e => e.type === 'verse' || e.zoneId === 'right_upper');
  const rightProgElement = elements.find(e => e.type === 'programme' || e.zoneId === 'right_lower');

  const nameSpaceUsage = calculateSpaceUsage(leftNameElement?.content || "", "left_lower");
  const verseSpaceUsage = calculateSpaceUsage(rightVerseElement?.content || "", "right_upper");
  const progSpaceUsage = calculateSpaceUsage(rightProgElement?.content || "", "right_lower");

  // Overall space percentage
  const totalSpacePercentage = Math.round(
    (nameSpaceUsage.percentage + verseSpaceUsage.percentage + progSpaceUsage.percentage) / 3
  );

  // Overlap detection
  const hasOverlap = elements.length > 3 && (nameSpaceUsage.isOverLimit || verseSpaceUsage.isOverLimit || progSpaceUsage.isOverLimit);

  // Pricing
  const basePrice = selectedTemplate.basePrice || 80.00;
  const customEmbroideryPrice = selectedTemplate.embroideryPrice || 50.00;
  const totalPrice = basePrice + customEmbroideryPrice;

  return (
    <SashStudioContext.Provider value={{
      selectedTemplate,
      setSelectedTemplate,
      selectedUniversity,
      setUniversity,
      uploadCustomLogo,
      elements,
      selectedElementId,
      setSelectedElementId,
      selectedElement,
      updateElement,
      addElement,
      removeElement,
      addSymbol,
      activeSide,
      setActiveSide,
      activeTab,
      setActiveTab,
      zoomLevel,
      setZoomLevel,
      // Undo / Redo
      undo,
      redo,
      resetDesign,
      clearAll,
      canUndo: historyIndex > 0,
      canRedo: historyIndex < history.length - 1,
      // Space & Quality
      nameSpaceUsage,
      verseSpaceUsage,
      progSpaceUsage,
      totalSpacePercentage,
      hasOverlap,
      // Pricing
      basePrice,
      customEmbroideryPrice,
      totalPrice,
      currency: selectedTemplate.currency || 'GH₵',
      localCurrency: selectedTemplate.localCurrency || 'GH₵',
      localPrice: totalPrice,
      // Saved designs
      savedDesigns,
      saveCurrentDesign,
      loadSavedDesign,
      deleteSavedDesign
    }}>
      {children}
    </SashStudioContext.Provider>
  );
}

export function useSashStudio() {
  return useContext(SashStudioContext);
}
