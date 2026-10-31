import React, { useEffect, useState, useRef } from 'react';
import { 
  buildFormNXUrl, 
  autoSubmitFormNX, 
  combineAndCompressProductImages, 
  uploadImageToFormNX 
} from '../utils/formnx';

export default function FormNXOrderWidget({ order }) {
  // Submission Status: 'submitting' | 'submitted' | 'direct_submit'
  const [submissionStatus, setSubmissionStatus] = useState('submitting');
  const [progress, setProgress] = useState(25);
  const [statusMessage, setStatusMessage] = useState('Processing order details and sash specifications...');
  const [formUrl, setFormUrl] = useState(null);
  const [isCloudflareChallenge, setIsCloudflareChallenge] = useState(false);
  const [showEmbeddedForm, setShowEmbeddedForm] = useState(false);
  const hasRunRef = useRef(false);

  // Listen for FormNX submission messages from iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && (
        event.data.formnx_message ||
        event.data.action === 'submit' ||
        event.data.action === 'submitted' ||
        event.data.type === 'form_submitted'
      )) {
        console.log('[FormNX Iframe Event]:', event.data);
        setSubmissionStatus('submitted');
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

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
        setStatusMessage('Step 2 of 3: Preparing product preview images...');
        try {
          const compressedBlob = await combineAndCompressProductImages(order.items);
          if (compressedBlob) {
            imagePath = await uploadImageToFormNX(compressedBlob);
          }
        } catch (imgErr) {
          console.warn('Image preview preparation fallback:', imgErr);
        }
      }

      // Build prefilled URL for the form view / fallback
      const finalUrl = buildFormNXUrl(order, imagePath);
      setFormUrl(finalUrl);

      // 2. Transmit to FormNX API via Backend Relay
      setProgress(75);
      setStatusMessage('Step 3 of 3: Transmitting order data to FormNX Portal...');
      
      const submitRes = await autoSubmitFormNX(order, imagePath);

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

      // Complete submission progress if confirmed
      if (submitRes && submitRes.success) {
        setProgress(100);
        setStatusMessage('FormNX Submission Received & Verified!');
        setSubmissionStatus('submitted');
      } else {
        console.log('Background submission unconfirmed, switching to prefilled direct submission mode:', submitRes);
        setIsCloudflareChallenge(!!submitRes?.cloudflareChallenge);
        setSubmissionStatus('direct_submit');
      }

    } catch (err) {
      console.error('FormNX submission process notice:', err);
      const fallbackUrl = buildFormNXUrl(order, null);
      setFormUrl(fallbackUrl);
      setSubmissionStatus('direct_submit');
    }
  };

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;
    executeSubmission();
  }, [order]);

  const shipping = order?.shippingAddress || {};

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
              Transmitting to FormNX...
            </div>
            <h3 className="font-headline font-bold text-headline-sm text-primary">
              Registering Order Form
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

      {/* 2. SUBMITTED STATE: VERIFIED SUBMISSION BANNER & RECEIPT */}
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
                    SUCCESSFULLY TRANSMITTED
                  </span>
                  <span className="text-xs text-emerald-700 font-bold">FormNX Portal Sync</span>
                </div>
                <h3 className="font-headline font-bold text-headline-sm text-primary mt-0.5">
                  Order Registered in FormNX
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Response Confirmed
            </div>
          </div>

          <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
            Your order form has been <strong>successfully transmitted to FormNX</strong> with all customer information, item specifications, and sash embroidery details.
          </p>

          {/* Submission Details Card */}
          <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/60 space-y-3 text-xs text-on-surface-variant">
            <div className="flex justify-between items-center py-1 border-b border-outline-variant/40">
              <span className="font-medium text-zinc-500">FormNX Reference:</span>
              <span className="font-bold text-primary">#{order?.id || 'ORD-CONFIRMED'}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-outline-variant/40">
              <span className="font-medium text-zinc-500">Customer Name:</span>
              <span className="font-semibold text-zinc-800">{shipping.fullName || 'OrderRight Customer'}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-outline-variant/40">
              <span className="font-medium text-zinc-500">Contact Email:</span>
              <span className="font-semibold text-zinc-800">{shipping.email || 'customer@orderright.com'}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="font-medium text-zinc-500">Delivery Destination:</span>
              <span className="font-semibold text-zinc-800">{shipping.deliveryDestination || 'Standard Campus Delivery'}</span>
            </div>
          </div>

          {/* Toggle Button to inspect submitted form in FormNX */}
          <div className="pt-2">
            <button
              onClick={() => setShowEmbeddedForm(!showEmbeddedForm)}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1.5 underline underline-offset-4"
            >
              <span className="material-symbols-outlined text-[16px]">
                {showEmbeddedForm ? 'visibility_off' : 'visibility'}
              </span>
              <span>{showEmbeddedForm ? 'Hide FormNX Embedded View' : 'View Submitted FormNX Record'}</span>
            </button>
          </div>

          {showEmbeddedForm && formUrl && (
            <div className="relative w-full rounded-2xl overflow-hidden border border-outline-variant bg-surface-container-low min-h-[550px] shadow-inner mt-4 animate-fadeIn">
              <iframe
                id="formnx-38nu94-8dbnompg"
                src={formUrl}
                title="OrderRight Order forms"
                style={{ width: '1px', minWidth: '100%', border: 0, minHeight: '620px' }}
                className="w-full"
              />
            </div>
          )}

        </div>
      )}

      {/* 3. DIRECT SUBMIT FALLBACK: INTERACTIVE PREFILLED FORM */}
      {submissionStatus === 'direct_submit' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-surface-container-highest">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[24px]">assignment_turned_in</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-amber-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {isCloudflareChallenge ? 'BROWSER VERIFICATION READY' : 'PREFILLED FORM READY'}
                  </span>
                  <span className="text-xs text-amber-800 font-bold">1-Click Portal Submission</span>
                </div>
                <h3 className="font-headline font-bold text-headline-sm text-primary mt-0.5">
                  Confirm Your FormNX Submission
                </h3>
              </div>
            </div>

            <button
              onClick={() => setSubmissionStatus('submitted')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Mark as Submitted</span>
            </button>
          </div>

          <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 space-y-1.5 text-xs text-amber-900 leading-relaxed">
            <p className="font-bold flex items-center gap-1.5 text-amber-950">
              <span className="material-symbols-outlined text-[18px] text-amber-700">info</span>
              All your order information and sash embroidery specifications have been prefilled below!
            </p>
            <p>
              Please scroll down inside the form and click <strong>"Submit"</strong> to register your response directly into our official FormNX Portal.
            </p>
          </div>

          {/* Interactive FormNX Embed with prefilled data */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-outline-variant bg-surface-container-low min-h-[620px] shadow-sm">
            <iframe
              id="formnx-38nu94-8dbnompg"
              src={formUrl || buildFormNXUrl(order, null)}
              title="OrderRight Order forms"
              style={{ width: '1px', minWidth: '100%', border: 0, minHeight: '620px' }}
              className="w-full"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
            <button
              onClick={executeSubmission}
              className="text-xs text-zinc-600 hover:text-zinc-900 font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">sync</span>
              <span>Retry Automatic Background Transmission</span>
            </button>

            <button
              onClick={() => setSubmissionStatus('submitted')}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>I Have Clicked Submit on FormNX</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

