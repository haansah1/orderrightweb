import React, { useEffect, useState, useRef } from 'react';
import { 
  buildFormNXUrl,
  autoSubmitFormNX, 
  combineAndCompressProductImages, 
  uploadImageToFormNX 
} from '../utils/formnx';

export default function FormNXOrderWidget({ order }) {
  // Submission Status: 'initializing' | 'manual_submit' | 'submitted'
  const [submissionStatus, setSubmissionStatus] = useState('initializing');
  const [statusMessage, setStatusMessage] = useState('Formatting order specifications and sash embroidery details...');
  const [formUrl, setFormUrl] = useState('');
  const [logs, setLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(true);
  const [lastError, setLastError] = useState(null);
  const hasInitializedRef = useRef(false);

  const addLog = (msg, level = 'info', extra = null) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { timestamp, msg, level, extra }]);
    console.log(`[FormNX ${level.toUpperCase()}] ${msg}`, extra || '');
  };

  const initializeFormNX = async () => {
    if (!order) return;

    try {
      setSubmissionStatus('initializing');
      setStatusMessage('Preparing order breakdown and sash embroidery specifications...');
      addLog(`Started FormNX synchronization for Order #${order.id || 'N/A'}`);

      // 1. Combine & compress product preview images
      let imagePath = null;
      if (order.items && order.items.length > 0) {
        setStatusMessage('Preparing custom sash preview specifications...');
        addLog('Processing product images for embroidery preview...');
        try {
          const compressedBlob = await combineAndCompressProductImages(order.items);
          if (compressedBlob) {
            addLog(`Product image compressed (${Math.round(compressedBlob.size / 1024)} KB). Uploading to FormNX...`);
            imagePath = await uploadImageToFormNX(compressedBlob);
            if (imagePath) {
              addLog(`Preview image uploaded successfully: ${imagePath}`, 'success');
            } else {
              addLog('Image upload skipped (using text specifications).', 'warn');
            }
          }
        } catch (imgErr) {
          addLog(`Image preview warning: ${imgErr.message}`, 'warn');
        }
      }

      // 2. Build official FormNX prefilled URL with all specifications
      const prefilledUrl = buildFormNXUrl(order, imagePath);
      setFormUrl(prefilledUrl);
      addLog('Prefilled FormNX URL generated with customer, delivery, and sash embroidery specs', 'info', {
        fields: {
          name: order.shippingAddress?.fullName || 'N/A',
          email: order.shippingAddress?.email || 'N/A',
          phone: order.shippingAddress?.phone || 'N/A',
          deliveryDestination: order.shippingAddress?.deliveryDestination || 'N/A'
        }
      });

      // 3. Attempt automated background transmission to verify if serverless relay works
      setStatusMessage('Checking automated portal transmission...');
      addLog('Attempting background transmission via server relay /api/orders/submit-formnx...');
      
      const res = await autoSubmitFormNX(order, imagePath);
      
      if (res && res.success) {
        addLog('Automated transmission confirmed by FormNX!', 'success', res);
        setSubmissionStatus('submitted');
        setShowLogs(false);
      } else {
        const errorDetail = res?.error || 'Automated transmission could not be verified.';
        setLastError(errorDetail);
        addLog(`Automated transmission notice: ${errorDetail}`, 'warn', {
          httpStatus: res?.status || 'N/A',
          cloudflareChallenge: res?.cloudflareChallenge || false,
          rawResponse: res?.rawResponse || null
        });
        addLog('Switched to Interactive Manual Submission mode so you can submit directly in your browser without Cloudflare blocks.', 'info');
        setSubmissionStatus('manual_submit');
        setShowLogs(true);
      }

    } catch (err) {
      addLog(`Initialization exception: ${err.message}`, 'error', err);
      setLastError(err.message);
      setSubmissionStatus('manual_submit');
      setShowLogs(true);
    }
  };

  useEffect(() => {
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;
    initializeFormNX();
  }, [order]);

  const shipping = order?.shippingAddress || {};

  return (
    <div className="bg-surface-container-lowest border-2 border-primary/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md relative overflow-hidden my-6 text-left animate-fadeIn">
      
      {/* 1. INITIALIZING STATE */}
      {submissionStatus === 'initializing' && (
        <div className="py-10 px-4 flex flex-col items-center justify-center text-center space-y-6">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full border-4 border-amber-500 border-t-transparent animate-spin"></div>
            <span className="material-symbols-outlined text-[24px] text-amber-600 absolute">sync</span>
          </div>

          <div className="max-w-md space-y-1.5">
            <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              Preparing Order Form
            </div>
            <h3 className="font-headline font-bold text-headline-sm text-primary">
              Connecting to FormNX
            </h3>
            <p className="font-body text-xs text-on-surface-variant">
              {statusMessage}
            </p>
          </div>
        </div>
      )}

      {/* 2. MANUAL SUBMISSION INTERFACE (PREFILLED EMBED) */}
      {submissionStatus === 'manual_submit' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-surface-container-highest">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[28px]">assignment_turned_in</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-amber-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    MANUAL SUBMISSION READY
                  </span>
                  <span className="text-xs text-amber-800 font-bold">1-Click Portal Submission</span>
                </div>
                <h3 className="font-headline font-bold text-headline-sm text-primary mt-0.5">
                  Complete Your Order Form Submission
                </h3>
              </div>
            </div>

            <button
              onClick={() => setSubmissionStatus('submitted')}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>I Have Clicked Submit</span>
            </button>
          </div>

          {/* Action Instruction Box */}
          <div className="bg-amber-50 border-2 border-amber-200/90 rounded-2xl p-4 sm:p-5 space-y-2 text-xs text-amber-950 leading-relaxed">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
              <span className="material-symbols-outlined text-amber-700 text-[20px]">touch_app</span>
              <span>Instructions: Review & Submit Below</span>
            </div>
            <p>
              All your order information, items, customer details, and <strong>sash embroidery specifications</strong> have been automatically prefilled into the official form below.
            </p>
            <p className="font-semibold text-amber-900 flex items-center gap-1.5 pt-1">
              <span className="material-symbols-outlined text-[16px] text-amber-700">arrow_downward</span>
              Scroll down to the bottom of the form and click <strong>"Thanks" / "Submit"</strong> to record your response directly into the FormNX portal.
            </p>
          </div>

          {/* Quick Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <a
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary/5 hover:bg-primary/10 text-primary border border-primary/20 text-xs font-bold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                <span>Open Form in Full Screen / New Tab</span>
              </a>

              <button
                onClick={() => setShowLogs(!showLogs)}
                className={`text-xs font-bold px-3.5 py-2 rounded-xl border transition-all flex items-center gap-1.5 ${
                  showLogs 
                    ? 'bg-zinc-800 text-white border-zinc-900' 
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-zinc-300'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">terminal</span>
                <span>{showLogs ? 'Hide Diagnostic Logs' : 'View Diagnostic Logs'}</span>
              </button>
            </div>

            <span className="text-[11px] text-zinc-500 italic">
              Order: #{order?.id || 'ORD-CONFIRMED'}
            </span>
          </div>

          {/* Embedded Prefilled FormNX Form */}
          {formUrl && (
            <div className="relative w-full rounded-2xl overflow-hidden border-2 border-outline-variant bg-white min-h-[680px] shadow-sm">
              <iframe
                id="formnx-interactive-embed"
                src={formUrl}
                title="OrderRight Order FormNX Embed"
                className="w-full min-h-[680px] border-0"
                style={{ width: '100%', minHeight: '680px' }}
              />
            </div>
          )}

          {/* Bottom Confirmation Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 pb-1">
            <p className="text-xs text-zinc-500">
              Once you have clicked <strong>"Thanks"</strong> or <strong>"Submit"</strong> in the form above:
            </p>
            <button
              onClick={() => setSubmissionStatus('submitted')}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Confirm & Mark as Submitted</span>
            </button>
          </div>

        </div>
      )}

      {/* 3. SUBMITTED STATE: CONFIRMED */}
      {submissionStatus === 'submitted' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-surface-container-highest">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    SUBMISSION CONFIRMED
                  </span>
                  <span className="text-xs text-emerald-700 font-bold">FormNX Portal Sync</span>
                </div>
                <h3 className="font-headline font-bold text-headline-sm text-primary mt-0.5">
                  Order Registered in FormNX
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSubmissionStatus('manual_submit')}
                className="text-xs text-primary underline underline-offset-4 hover:text-primary/80 font-semibold"
              >
                Re-open Form
              </button>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                Completed & Recorded
              </div>
            </div>
          </div>

          <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
            Your order form response has been registered in the official FormNX Order Portal with all customer details, delivery instructions, and custom sash specifications.
          </p>

          {/* Submission Details Card */}
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

          <div className="flex justify-between items-center pt-1">
            <button
              onClick={() => setShowLogs(!showLogs)}
              className="text-xs text-zinc-500 hover:text-zinc-800 flex items-center gap-1 underline underline-offset-4"
            >
              <span className="material-symbols-outlined text-[14px]">terminal</span>
              <span>{showLogs ? 'Hide Transmission Logs' : 'View Diagnostic Logs'}</span>
            </button>
          </div>

        </div>
      )}

      {/* 4. ON-SCREEN BROWSER DIAGNOSTIC LOG CONSOLE */}
      {showLogs && (
        <div className="bg-zinc-950 text-zinc-200 rounded-2xl p-4 sm:p-5 font-mono text-xs space-y-3 border-2 border-zinc-800 shadow-inner mt-4 animate-fadeIn">
          
          <div className="flex justify-between items-center pb-2.5 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-bold text-zinc-100 uppercase tracking-wider text-[11px]">
                Browser Diagnostic & Network Transmission Logs
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded-md border border-zinc-800">
                {logs.length} entries
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(logs, null, 2));
                  alert('Diagnostic logs copied to clipboard!');
                }}
                className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-2 py-1 rounded-md transition-colors flex items-center gap-1"
                title="Copy logs to clipboard"
              >
                <span className="material-symbols-outlined text-[12px]">content_copy</span>
                <span>Copy</span>
              </button>
            </div>
          </div>

          {lastError && (
            <div className="bg-red-950/60 border border-red-800/80 rounded-xl p-3 text-red-200 text-[11px] leading-relaxed">
              <span className="font-bold text-red-400 block mb-0.5">Automated Relay Notice:</span>
              {lastError}
            </div>
          )}

          <div className="max-h-64 overflow-y-auto space-y-2 pr-1 custom-scrollbar text-[11px]">
            {logs.length === 0 ? (
              <p className="text-zinc-500 italic">No logs recorded yet...</p>
            ) : (
              logs.map((log, index) => {
                let badgeColor = 'text-zinc-400';
                if (log.level === 'success') badgeColor = 'text-emerald-400 font-bold';
                else if (log.level === 'warn') badgeColor = 'text-amber-400 font-bold';
                else if (log.level === 'error') badgeColor = 'text-red-400 font-bold';

                return (
                  <div key={index} className="flex items-start gap-2 border-b border-zinc-900/80 pb-1.5">
                    <span className="text-zinc-500 text-[10px] flex-shrink-0">
                      [{log.timestamp}]
                    </span>
                    <div className="flex-1 space-y-1">
                      <span className={`${badgeColor} break-all`}>
                        {log.msg}
                      </span>
                      {log.extra && (
                        <pre className="text-[10px] bg-zinc-900/90 text-zinc-300 p-2 rounded-lg overflow-x-auto border border-zinc-800/80 mt-1 whitespace-pre-wrap">
                          {typeof log.extra === 'object' ? JSON.stringify(log.extra, null, 2) : String(log.extra)}
                        </pre>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>
      )}

    </div>
  );
}
