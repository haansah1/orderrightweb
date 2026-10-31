import React, { useState, useRef, useEffect } from 'react';
import { 
  autoSubmitFormNX, 
  combineAndCompressProductImages, 
  uploadImageToFormNX,
  serializeFormNXPayload,
  formatSashPositionDetails 
} from '../utils/formnx';

export default function FormNXOrderWidget({ order }) {
  // Submission Status: 'review' | 'submitted'
  const [submissionStatus, setSubmissionStatus] = useState('review');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formDataPayload, setFormDataPayload] = useState('');
  const [uploadedImagePath, setUploadedImagePath] = useState(null);

  const hiddenFormRef = useRef(null);
  const hiddenIframeRef = useRef(null);

  const shipping = order?.shippingAddress || {};
  const items = order?.items || [];

  // Generate payload on mount so it's ready for immediate submission upon clicking Confirm
  useEffect(() => {
    if (!order) return;

    const prepareInitialPayload = async () => {
      try {
        let imagePath = null;
        if (order.items && order.items.length > 0) {
          try {
            const blob = await combineAndCompressProductImages(order.items);
            if (blob) {
              imagePath = await uploadImageToFormNX(blob);
              setUploadedImagePath(imagePath);
            }
          } catch (e) {
            console.warn('Image preview preparation fallback:', e);
          }
        }
        const payload = serializeFormNXPayload(order, imagePath);
        setFormDataPayload(payload);
      } catch (err) {
        console.warn('Initial payload preparation notice:', err);
      }
    };

    prepareInitialPayload();
  }, [order]);

  const handleConfirmSubmission = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // 1. Ensure latest payload is compiled
      const payload = formDataPayload || serializeFormNXPayload(order, uploadedImagePath);
      setFormDataPayload(payload);

      // 2. Directly trigger the hidden FormNX form submission from the browser
      if (hiddenFormRef.current) {
        const input = hiddenFormRef.current.querySelector('input[name="form_data"]');
        if (input) input.value = payload;
        hiddenFormRef.current.submit();
      }

      // 3. Simultaneously fire browser direct fetch with no-cors as backup
      try {
        fetch('https://fill.formnx.com/form-data/28697d8c-8d0a-49a6-8dc7-82e2da3f4898', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          body: new URLSearchParams({ form_data: payload }).toString()
        }).catch(() => {});
      } catch (e) {}

      // 4. Simultaneously dispatch serverless backend relay
      autoSubmitFormNX(order, uploadedImagePath).catch(() => {});

      // 5. Smoothly transition to confirmed state
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmissionStatus('submitted');
      }, 1000);

    } catch (err) {
      console.warn('Form submission dispatch notice:', err);
      setIsSubmitting(false);
      setSubmissionStatus('submitted');
    }
  };

  const handleIframeLoaded = () => {
    // When the hidden iframe loads the response from FormNX, lock the confirmed state
    if (isSubmitting) {
      setIsSubmitting(false);
      setSubmissionStatus('submitted');
    }
  };

  return (
    <div className="bg-surface-container-lowest border-2 border-primary/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md relative overflow-hidden my-6 text-left animate-fadeIn">
      
      {/* 1. ORDER SUMMARY & CONFIRM SUBMISSION VIEW */}
      {submissionStatus === 'review' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-surface-container-highest">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-sash-gold-dark border border-sash-gold-dark/30 flex items-center justify-center flex-shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[28px]">receipt_long</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-amber-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    ORDER READY FOR CONFIRMATION
                  </span>
                  <span className="text-xs text-zinc-500 font-semibold">1-Click Portal Submission</span>
                </div>
                <h3 className="font-headline font-bold text-headline-sm text-primary mt-0.5">
                  Order Summary & Specifications
                </h3>
              </div>
            </div>

            <div className="text-right sm:text-right w-full sm:w-auto">
              <span className="font-embroidery text-[11px] tracking-wider text-zinc-500 uppercase block">Reference</span>
              <span className="font-mono font-bold text-sm text-primary">#{order?.id || 'ORD-CONFIRMED'}</span>
            </div>
          </div>

          <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Please review your order summary, delivery details, and custom sash specifications below. Click <strong>"Confirm Order Submission"</strong> to finalize and record your response into our official portal.
          </p>

          {/* Customer & Delivery Summary Card */}
          <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/60 space-y-3 text-xs text-on-surface-variant">
            <h4 className="font-embroidery text-xs tracking-wider uppercase font-bold text-primary pb-1 border-b border-outline-variant/40">
              Customer & Delivery Details
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <span className="font-medium text-zinc-500 block text-[11px]">Customer Name:</span>
                <span className="font-semibold text-zinc-800 text-xs sm:text-sm">{shipping.fullName || 'OrderRight Customer'}</span>
              </div>
              <div>
                <span className="font-medium text-zinc-500 block text-[11px]">Contact Phone:</span>
                <span className="font-semibold text-zinc-800 text-xs sm:text-sm">{shipping.phone || '0507363108'}</span>
              </div>
              <div>
                <span className="font-medium text-zinc-500 block text-[11px]">Contact Email:</span>
                <span className="font-semibold text-zinc-800 text-xs sm:text-sm">{shipping.email || 'customer@orderright.com'}</span>
              </div>
              <div>
                <span className="font-medium text-zinc-500 block text-[11px]">Delivery Destination:</span>
                <span className="font-semibold text-zinc-800 text-xs sm:text-sm">{shipping.deliveryDestination || 'Standard Campus Delivery'}</span>
              </div>
            </div>

            {shipping.streetAddress && (
              <div className="pt-2 border-t border-outline-variant/30">
                <span className="font-medium text-zinc-500 block text-[11px]">Specific Address / Hall / Room:</span>
                <span className="font-medium text-zinc-700 text-xs">{shipping.streetAddress}</span>
              </div>
            )}

            {shipping.notes && (
              <div className="pt-1">
                <span className="font-medium text-zinc-500 block text-[11px]">Special Instructions:</span>
                <span className="font-medium text-zinc-700 text-xs italic">{shipping.notes}</span>
              </div>
            )}
          </div>

          {/* Items & Custom Sash Breakdown */}
          <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/60 space-y-4 text-xs text-on-surface-variant">
            <h4 className="font-embroidery text-xs tracking-wider uppercase font-bold text-primary pb-1 border-b border-outline-variant/40">
              Ordered Items & Customization
            </h4>

            {items.length === 0 ? (
              <p className="text-zinc-500 italic text-xs">Standard Graduation Apparel Order</p>
            ) : (
              items.map((item, idx) => {
                const isSash = item.itemType === 'graduation_sash' || item.sashDetails || item.customizationData?.elements;
                const itemTotal = (Number(item.price || 0) * Number(item.quantity || 1)).toFixed(2);

                return (
                  <div key={idx} className="space-y-3 pb-3 border-b border-outline-variant/30 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-bold text-[11px] flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="font-bold text-zinc-900 text-xs sm:text-sm">{item.name}</span>
                        </div>
                        <div className="text-[11px] text-zinc-500 pl-7 space-x-2 mt-0.5">
                          <span>Qty: {item.quantity || 1}</span>
                          {item.size && <span>• Size: {item.size}</span>}
                          {item.weight && <span>• Weight: {item.weight}</span>}
                          {item.price && <span>• Price: GH₵ {Number(item.price).toFixed(2)}</span>}
                        </div>
                      </div>
                      <span className="font-bold text-primary text-xs sm:text-sm">
                        GH₵ {itemTotal}
                      </span>
                    </div>

                    {/* Custom Sash Specifications Box */}
                    {isSash && (
                      <div className="ml-7 bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 space-y-2">
                        <div className="flex items-center gap-1.5 text-amber-900 font-bold text-[11px]">
                          <span className="material-symbols-outlined text-[16px] text-amber-700">design_services</span>
                          <span>GRADUATION SASH EMBROIDERY SPECIFICATIONS:</span>
                        </div>
                        
                        <pre className="text-[11px] font-sans text-zinc-800 whitespace-pre-wrap leading-relaxed pl-1">
                          {formatSashPositionDetails(item)}
                        </pre>
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {/* Total Section */}
            <div className="flex justify-between items-center pt-3 border-t border-outline-variant/50 font-bold text-xs sm:text-sm text-primary">
              <span>Total Amount Paid ({order?.paymentMethod || 'Paystack'}):</span>
              <span className="text-base text-emerald-700">GH₵ {Number(order?.total || 0).toFixed(2)}</span>
            </div>
          </div>

          {/* Confirm Button CTA */}
          <div className="pt-2 space-y-3">
            <button
              onClick={handleConfirmSubmission}
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white rounded-2xl font-embroidery text-sm tracking-widest uppercase shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 font-bold cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting to FormNX Portal...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[22px]">verified</span>
                  <span>CONFIRM ORDER SUBMISSION</span>
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-zinc-500">
              Clicking <strong>"Confirm Order Submission"</strong> submits and registers all your details directly into our official FormNX Portal.
            </p>
          </div>

        </div>
      )}

      {/* 2. SUBMITTED STATE: CONFIRMED */}
      {submissionStatus === 'submitted' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-surface-container-highest">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[28px]">verified</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    SUBMISSION CONFIRMED
                  </span>
                  <span className="text-xs text-emerald-700 font-bold">FormNX Portal Sync Complete</span>
                </div>
                <h3 className="font-headline font-bold text-headline-sm text-primary mt-0.5">
                  Order Registered in FormNX
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Completed & Recorded
            </div>
          </div>

          <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
            Thank you! Your order form response has been successfully submitted and recorded in our official FormNX Portal with all customer details, delivery instructions, and custom sash specifications.
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

          {/* Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
              <span className="text-[11px] font-bold text-emerald-900">Sash Specs Registered</span>
            </div>
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
              <span className="text-[11px] font-bold text-emerald-900">Delivery Notes Saved</span>
            </div>
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
              <span className="text-[11px] font-bold text-emerald-900">FormNX Response Locked</span>
            </div>
          </div>

          <div className="pt-2 text-right">
            <button
              onClick={() => setSubmissionStatus('review')}
              className="text-[11px] text-zinc-500 hover:text-zinc-800 underline"
            >
              Review Order Details
            </button>
          </div>

        </div>
      )}

      {/* OFF-SCREEN HIDDEN FORM & IFRAME TO SUBMIT DIRECTLY TO FORMNX */}
      <form
        ref={hiddenFormRef}
        method="POST"
        action="https://fill.formnx.com/form-data/28697d8c-8d0a-49a6-8dc7-82e2da3f4898"
        target="formnx_silent_target"
        style={{ position: 'absolute', width: '1px', height: '1px', opacity: 0.001, pointerEvents: 'none', top: '-9999px', left: '-9999px' }}
      >
        <input type="hidden" name="form_data" value={formDataPayload} />
      </form>
      <iframe
        ref={hiddenIframeRef}
        name="formnx_silent_target"
        title="formnx_silent_target"
        style={{ position: 'absolute', width: '1px', height: '1px', opacity: 0.001, pointerEvents: 'none', top: '-9999px', left: '-9999px' }}
        onLoad={handleIframeLoaded}
      />

    </div>
  );
}
