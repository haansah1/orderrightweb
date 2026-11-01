import React, { useState, useEffect } from 'react';
import { 
  buildFormNXUrl,
  combineAndCompressProductImages, 
  uploadImageToFormNX 
} from '../utils/formnx';

export default function FormNXOrderWidget({ order }) {
  // Submission Status: 'manual_submit' | 'submitted'
  const [submissionStatus, setSubmissionStatus] = useState('manual_submit');
  const [formUrl, setFormUrl] = useState(() => buildFormNXUrl(order, null));
  const shipping = order?.shippingAddress || {};

  useEffect(() => {
    if (!order) return;
    setFormUrl(buildFormNXUrl(order, null));

    // Upload compressed image preview in background if available to update formUrl
    if (order.items && order.items.length > 0) {
      combineAndCompressProductImages(order.items)
        .then(blob => {
          if (blob) return uploadImageToFormNX(blob);
          return null;
        })
        .then(imagePath => {
          if (imagePath) {
            setFormUrl(buildFormNXUrl(order, imagePath));
          }
        })
        .catch(err => {
          console.warn('Image preview notice:', err);
        });
    }
  }, [order]);

  // FormNX auto-resizing integration via official iframeResizer
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://fill.formnx.com/js/iframeResizer.js';
    script.async = true;
    script.onload = () => {
      if (window.iFrameResize) {
        window.iFrameResize({
          log: false,
          checkOrigin: false,
          scrolling: false,
          minHeight: 1450
        }, '#formnx-order-frame');
      }
    };
    document.body.appendChild(script);

    return () => {
      try {
        document.body.removeChild(script);
      } catch (e) {}
    };
  }, []);

  // Listen for FormNX submission completion messages
  useEffect(() => {
    const handleMessage = (event) => {
      if (
        event.data?.action === 'submitted' ||
        event.data?.event === 'formnx_form_submitted' ||
        (typeof event.data === 'string' && event.data.includes('formnx_form_submitted'))
      ) {
        setSubmissionStatus('submitted');
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="w-full text-left space-y-4">
      
      {/* 1. MANUAL SUBMIT INTERFACE (FULL UNRESTRICTED DISPLAY) */}
      {submissionStatus === 'manual_submit' && (
        <div className="w-full space-y-4 animate-fadeIn">
          
          {/* Informational Guidance Banner */}
          <div className="bg-amber-50/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-amber-200/50">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                <span className="font-embroidery text-[12px] font-bold text-amber-900 uppercase tracking-wider">
                  Final Step: Submit Your Order Form Below
                </span>
                <span className="inline-flex items-center gap-1 bg-amber-100/90 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-300/60">
                  <span className="material-symbols-outlined text-[13px]">lock</span>
                  <span>Read-Only</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                Your customer details, delivery location, and custom sash specifications are prefilled below. Scroll down to the bottom of the form and click the official <strong>"Thanks"</strong> button to submit your response.
              </p>
            </div>

            {formUrl && (
              <a
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 text-center bg-white hover:bg-zinc-50 text-zinc-800 text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs border border-zinc-200 transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                <span>Open in New Tab</span>
              </a>
            )}
          </div>

          {/* FormNX Full-Length Interactive Form (No Restricted Scrollable Container) */}
          {formUrl && (
            <div className="w-full bg-white rounded-2xl overflow-visible">
              <iframe
                id="formnx-order-frame"
                src={formUrl}
                title="OrderRight Order forms"
                scrolling="no"
                className="w-full min-h-[1450px] border-0 outline-none block"
                style={{ width: '100%', minHeight: '1450px', border: 'none', outline: 'none' }}
              />
            </div>
          )}

        </div>
      )}

      {/* 2. SUBMITTED STATE: CONFIRMED */}
      {submissionStatus === 'submitted' && (
        <div className="w-full bg-white rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn shadow-xs border border-zinc-100">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[28px]">verified</span>
              </div>
              <div>
                <span className="bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  SUBMISSION CONFIRMED
                </span>
              </div>
            </div>

            <button
              onClick={() => setSubmissionStatus('manual_submit')}
              className="text-xs text-primary underline underline-offset-4 hover:text-primary/80 font-semibold cursor-pointer"
            >
              Re-open Form
            </button>
          </div>

          <p className="font-body text-body-sm text-on-surface-variant leading-relaxed font-medium">
            Thank you! Your order form response has been submitted.
          </p>

          {/* Quick Summary Card */}
          <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/60 space-y-3 text-xs text-on-surface-variant">
            <div className="flex justify-between items-center py-1 border-b border-outline-variant/40">
              <span className="font-medium text-zinc-500">Order Reference:</span>
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
            <div className="flex justify-between items-center py-1 border-b border-outline-variant/40">
              <span className="font-medium text-zinc-500">Phone Number:</span>
              <span className="font-semibold text-zinc-800">{shipping.phone || '0507363108'}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="font-medium text-zinc-500">Delivery Destination:</span>
              <span className="font-semibold text-zinc-800">{shipping.deliveryDestination || 'Standard Campus Delivery'}</span>
            </div>
          </div>

          {/* Badge */}
          <div className="pt-1">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 rounded-xl px-4 py-2.5">
              <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Submission Confirmed</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
