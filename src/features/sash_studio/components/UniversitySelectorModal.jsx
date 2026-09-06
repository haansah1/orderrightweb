import React, { useState } from 'react';
import { UNIVERSITIES } from '../data/universities';
import { UniversityCrest } from './CrestsAndIcons';
import { useSashStudio } from '../context/SashStudioContext';

export default function UniversitySelectorModal({ isOpen, onClose }) {
  const { selectedUniversity, setUniversity, uploadCustomLogo } = useSashStudio();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Custom Logo & Name Upload State
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customUniName, setCustomUniName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadError, setUploadError] = useState('');

  if (!isOpen) return null;

  const filteredUnis = UNIVERSITIES.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customUniName.trim()) {
      setUploadError('Please enter your university name.');
      return;
    }
    if (!previewUrl) {
      setUploadError('Please select a logo image file.');
      return;
    }

    uploadCustomLogo(previewUrl, customUniName.trim());
    setShowCustomForm(false);
    setCustomUniName('');
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-xl max-h-[88vh] overflow-hidden shadow-2xl flex flex-col border border-zinc-200 animate-fadeIn">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
          <div>
            <h3 className="font-montserrat font-bold text-xl text-zinc-900">
              {showCustomForm ? "Upload Custom Institution Logo" : "Select University"}
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              {showCustomForm 
                ? "Enter your university name and upload its logo for your sash" 
                : "Choose your institution to load its official emblem"}
            </p>
          </div>
          <button 
            onClick={() => {
              setShowCustomForm(false);
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* CUSTOM UPLOAD FORM VIEW */}
        {showCustomForm ? (
          <form onSubmit={handleCustomSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
            {uploadError && (
              <div className="bg-red-50 text-red-700 border border-red-200 text-xs font-semibold p-3 rounded-xl">
                {uploadError}
              </div>
            )}

            {/* University Name Input */}
            <div className="space-y-1.5">
              <label className="font-embroidery text-xs text-zinc-700 font-bold uppercase tracking-wider block">
                University / Institution Name *
              </label>
              <input 
                type="text"
                required
                value={customUniName}
                onChange={(e) => setCustomUniName(e.target.value)}
                placeholder="e.g. Ashesi University, Valley View University, etc."
                className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-sash-gold"
                autoFocus
              />
              <p className="text-[11px] text-zinc-500">
                This name will be included as part of your sash embroidery specifications.
              </p>
            </div>

            {/* Logo Image File Picker */}
            <div className="space-y-2">
              <label className="font-embroidery text-xs text-zinc-700 font-bold uppercase tracking-wider block">
                University Crest / Logo Image *
              </label>

              {previewUrl ? (
                <div className="flex items-center gap-4 p-4 rounded-2xl border-2 border-sash-gold bg-amber-50/50">
                  <div className="w-16 h-16 rounded-xl bg-white border border-zinc-200 p-1 flex items-center justify-center">
                    <img src={previewUrl} alt="Custom Logo Preview" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-montserrat font-bold text-xs text-zinc-900 block truncate">
                      {selectedFile?.name || "Logo Loaded"}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      Ready to display on sash
                    </span>
                  </div>
                  <label className="cursor-pointer text-xs font-bold text-sash-gold hover:underline">
                    Change
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileSelect} 
                      className="hidden" 
                    />
                  </label>
                </div>
              ) : (
                <label className="border-2 border-dashed border-zinc-300 hover:border-sash-gold bg-zinc-50 hover:bg-amber-50/20 p-6 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors text-center">
                  <span className="material-symbols-outlined text-[36px] text-sash-gold-dark mb-1">cloud_upload</span>
                  <span className="font-montserrat font-bold text-xs text-zinc-800 uppercase tracking-wider mb-1">
                    Click to select logo file
                  </span>
                  <span className="text-[11px] text-zinc-500">Supports PNG, JPG, JPEG, SVG</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileSelect} 
                    className="hidden" 
                  />
                </label>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-zinc-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowCustomForm(false)}
                className="px-4 py-2.5 rounded-xl border border-zinc-300 text-zinc-700 font-label text-xs uppercase tracking-wider hover:bg-zinc-100"
              >
                Back to List
              </button>

              <button
                type="submit"
                className="bg-sash-gold-dark hover:bg-sash-gold text-white font-embroidery text-xs tracking-widest px-6 py-2.5 rounded-xl shadow-md uppercase font-bold"
              >
                Apply Logo & Name
              </button>
            </div>
          </form>
        ) : (
          /* STANDARD SELECTOR VIEW */
          <>
            {/* Search Bar */}
            <div className="p-4 bg-zinc-50 border-b border-zinc-100">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-3 text-zinc-400 text-[20px]">
                  search
                </span>
                <input 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search university by name or location..."
                  className="w-full bg-white border border-zinc-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-800 focus:outline-none focus:border-sash-gold"
                  autoFocus
                />
              </div>
            </div>

            {/* Universities List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-[380px]">
              {filteredUnis.map(uni => {
                const isSelected = selectedUniversity?.id === uni.id;
                return (
                  <div
                    key={uni.id}
                    onClick={() => {
                      setUniversity(uni);
                      onClose();
                    }}
                    className={`flex items-center gap-4 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-sash-gold bg-amber-50/60 shadow-sm' 
                        : 'border-zinc-100 bg-white hover:border-zinc-300 hover:bg-zinc-50'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center p-1">
                      <UniversityCrest id={uni.crestSvg} uni={uni} className="w-9 h-9" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-montserrat font-semibold text-sm text-zinc-900 truncate">
                        {uni.name}
                      </h4>
                      <p className="text-xs text-zinc-500 truncate">{uni.location}</p>
                    </div>
                    {isSelected && (
                      <span className="material-symbols-outlined text-sash-gold text-[20px]">
                        check_circle
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Custom Upload Footer */}
            <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-zinc-600">
                <span className="font-medium">Can't find your university?</span>
              </div>
              <button 
                type="button"
                onClick={() => setShowCustomForm(true)}
                className="bg-zinc-900 hover:bg-black text-white font-label font-medium text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors shadow-sm uppercase tracking-wider"
              >
                <span className="material-symbols-outlined text-[16px]">upload</span>
                <span>Upload Logo & Enter University Name</span>
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
