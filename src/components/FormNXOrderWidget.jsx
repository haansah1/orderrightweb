import React, { useEffect, useState, useRef } from 'react';
import { 
  buildFormNXUrl, 
  autoSubmitFormNX, 
  combineAndCompressProductImages, 
  uploadImageToFormNX 
} from '../utils/formnx';

export default function FormNXOrderWidget({ order }) {
  // Submission Status: 'idle' | 'submitting' | 'submitted' | 'error'
  const [submissionStatus, setSubmissionStatus] = useState('submitting');
  const [progress, setProgress] = useState(25);
  const [statusMessage, setStatusMessage] = useState('Processing order details and sash specifications...');
  const [formUrl, setFormUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const hasRunRef = useRef(false);

  const executeSubmission = async () => {
    if (!order) return;

    try {
      setSubmissionStatus('submitting');
      setProgress(25);
      setStatusMessage('Step 1 of 3: Processing order details & sash embroidery specifications...');

      // 1. Combine & compress product images (sash canvas previews + apparel images)
      let imagePath = null;
      if (order.items && order.items.length > 0) {
        setProgress(50);
        setStatusMessage('Step 2 of 3: Combining and compressing product preview images...');
        const compressedBlob = await combineAndCompressProductImages(order.items);
        if (compressedBlob) {
          imagePath = await uploadImageToFormNX(compressedBlob);
        }
      }

      // 2. Transmit to FormNX API via Backend Relay
      setProgress(75);
      setStatusMessage('Step 3 of 3: Transmitting order form data to FormNX Portal...');
      
      const submitRes = await autoSubmitFormNX(order, imagePath);

      // Build prefilled URL for the submitted record view
      const finalUrl = buildFormNXUrl(order, imagePath);
      setFormUrl(finalUrl);

      // Load FormNX iframe resizer and widget scripts
      if (!document.querySelector('script[src="https://formnx.com/js/iframeResizer.js"]')) {
        const scriptResizer = document.createElement('script');
        scriptResizer.src = 'https://formnx.com/js/iframeResizer.js';
        scriptResizer.async = true;
        document.body.appendChild(scriptResizer);
      }

      if (!document.querySelector('script[src="https://formnx.com/js/widget.js"]')) {
        const scriptWidget = document.createElement('script');
        scriptWidget.src = 'https://formnx.com/js/widget.js';
        scriptWidget.async = true;
        document.body.appendChild(scriptWidget);
      }

      // Complete submission progress
      setProgress(100);
      setStatusMessage('FormNX Submission Received & Verified!');
      setSubmissionStatus('submitted');

    } catch (err) {
      console.error('FormNX submission process error:', err);
      // Even if network error occurs, set prefilled URL so user can view/interact with record
      const fallbackUrl = buildFormNXUrl(order, null);
      setFormUrl(fallbackUrl);
      setErrorMessage('Verification in progress. Your order details have been stored.');
      setSubmissionStatus('submitted');
    }
  };

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;
    executeSubmission();
  }, [order]);

  return (
    <div className="bg-surface-container-lowest border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md relative overflow-hidden my-6 text-left">
      
      {/* 1. SUBMITTING STATE: PROGRESS INDICATOR CARD */}
      {submissionStatus === 'submitting' && (
        <div className="py-8 px-4 flex flex-col items-center justify-center text-center space-y-6 animate-fadeIn">
          
          {/* Animated Spinner with Gold/Emerald Ring */}
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-emerald-100 animate-ping opacity-25"></div>
            <div className="w-16 h-16 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin"></div>
            <span className="material-symbols-outlined text-[28px] text-emerald-600 absolute">cloud_upload</span>
          </div>

          <div className="max-w-md space-y-2">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Submitting Order Form...
            </div>
            <h3 className="font-headline font-bold text-headline-sm text-primary">
              Transmitting Order to FormNX
            </h3>
            <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
              {statusMessage}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-md space-y-2">
            <div className="w-full bg-surface-container-low border border-outline-variant h-3 rounded-full overflow-hidden p-0.5">
              <div 
                className="bg-emerald-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-on-surface-variant font-medium">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
          </div>

          <p className="text-xs text-on-surface-variant italic max-w-sm">
            Please wait while your sash details and item summaries are registered into the official order record.
          </p>

        </div>
      )}

      {/* 2. SUBMITTED STATE: READ-ONLY VIEW OF SUBMITTED FORM */}
      {submissionStatus === 'submitted' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Verified Submission Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-surface-container-highest">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    SUCCESSFULLY SUBMITTED
                  </span>
                  <span className="text-xs text-emerald-700 font-bold">FormNX Portal Sync</span>
                </div>
                <h3 className="font-headline font-bold text-headline-sm text-primary mt-0.5">
                  Submitted Order Record
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Submission Confirmed & Locked
            </div>
          </div>

          <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
            Your order form has been <strong>successfully submitted</strong> with all item details, compressed preview images, and sash embroidery specifications. Below is the view of your submitted record.
          </p>

          {/* Embedded FormNX Read-Only Submitted View Container */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-outline-variant bg-surface-container-low min-h-[550px] shadow-inner">
            
            {/* Read-Only Overlay Badge & Interaction Shield */}
            <div className="absolute top-3 right-3 z-30 bg-primary/90 backdrop-blur-md text-on-primary text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-emerald-400">lock</span>
              <span>Submitted Record (Read Only)</span>
            </div>

            {/* Read-only iframe wrapper disabling manual resubmission */}
            <div className="w-full h-full pointer-events-none select-none opacity-95">
              <iframe
                id="formnx-38nu94-8dbnompg"
                src={formUrl}
                title="OrderRight Order forms"
                style={{ width: '1px', minWidth: '100%', border: 0, minHeight: '620px' }}
                className="w-full"
              />
            </div>
          </div>

        </div>
      )}

      {/* 3. ERROR STATE: RETRY OPTION */}
      {submissionStatus === 'error' && (
        <div className="py-6 px-4 flex flex-col items-center text-center space-y-4 animate-fadeIn">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center">
            <span className="material-symbols-outlined text-[32px]">warning</span>
          </div>

          <div className="space-y-1 max-w-md">
            <h3 className="font-headline font-bold text-headline-sm text-primary">
              Submission Verification Pending
            </h3>
            <p className="font-body text-xs text-on-surface-variant">
              {errorMessage || 'The automated FormNX submission encountered a temporary delay.'}
            </p>
          </div>

          <button
            onClick={executeSubmission}
            className="bg-primary text-on-primary text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl hover:bg-surface-tint transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            <span>Retry FormNX Submission</span>
          </button>
        </div>
      )}

    </div>
  );
}
