import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import FormNXOrderWidget from '../components/FormNXOrderWidget';

export default function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  // Fallback order if visited directly or state missing
  const displayOrder = order || {
    id: "ORD-" + Math.floor(10000 + Math.random() * 90000),
    date: new Date().toISOString().split('T')[0],
    status: "Confirmed",
    items: [],
    total: 0,
    currency: "GH₵",
    shippingAddress: {
      fullName: "Valued Customer",
      address: "Accra, Ghana",
      deliveryDestination: "Campus Delivery",
      phone: "+233 24 000 0000"
    },
    paymentMethod: "Paystack (MoMo / Card)"
  };

  const handleDownloadReceipt = () => {
    const shipping = displayOrder.shippingAddress || {};
    const items = displayOrder.items || [];

    const printWindow = window.open('', '_blank', 'width=800,height=900');
    if (!printWindow) {
      alert('Please allow popups in your browser to download your official receipt.');
      return;
    }

    const itemsRows = items.map((item, idx) => {
      let extra = '';
      if (item.size) extra += `Size: ${item.size} `;
      if (item.weight) extra += `| Weight: ${item.weight} `;
      if (item.itemType === 'graduation_sash' || item.sashDetails) {
        extra += `<br/><small style="color:#059669; font-weight:bold;">Custom Graduation Sash Embroidery Specs Included</small>`;
      }

      return `
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px; text-align: left;">${idx + 1}</td>
          <td style="padding: 12px; text-align: left;">
            <strong>${item.name}</strong><br/>
            <span style="font-size: 12px; color: #4b5563;">${extra}</span>
          </td>
          <td style="padding: 12px; text-align: center;">${item.quantity}</td>
          <td style="padding: 12px; text-align: right;">GH₵ ${Number(item.price || 0).toFixed(2)}</td>
          <td style="padding: 12px; text-align: right;">GH₵ ${(Number(item.price || 0) * Number(item.quantity || 1)).toFixed(2)}</td>
        </tr>
      `;
    }).join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>OrderRight Official Receipt - #${displayOrder.id}</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 40px; color: #111827; background: #fff; }
            .receipt-card { max-width: 700px; margin: 0 auto; border: 2px solid #e5e7eb; border-radius: 16px; padding: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #059669; padding-bottom: 20px; margin-bottom: 24px; }
            .logo { font-size: 26px; font-weight: 800; color: #059669; letter-spacing: 1px; }
            .status-badge { background: #d1fae5; color: #065f46; font-size: 12px; font-weight: bold; padding: 6px 14px; border-radius: 20px; text-transform: uppercase; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; background: #f9fafb; padding: 20px; border-radius: 12px; }
            .grid-col h4 { margin: 0 0 6px 0; font-size: 11px; text-transform: uppercase; color: #6b7280; letter-spacing: 0.5px; }
            .grid-col p { margin: 0; font-size: 14px; font-weight: 600; color: #1f2937; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; }
            th { background: #f3f4f6; text-align: left; padding: 12px; font-size: 12px; text-transform: uppercase; color: #374151; }
            .total-box { margin-left: auto; width: 280px; font-size: 14px; }
            .total-row { display: flex; justify-content: space-between; padding: 6px 0; }
            .total-grand { font-size: 18px; font-weight: bold; border-top: 2px solid #111827; padding-top: 8px; color: #059669; }
            .footer { text-align: center; margin-top: 32px; border-top: 1px solid #e5e7eb; padding-top: 20px; font-size: 12px; color: #6b7280; }
            @media print {
              body { padding: 0; }
              .receipt-card { border: none; box-shadow: none; }
            }
          </style>
        </head>
        <body>
          <div class="receipt-card">
            <div class="header">
              <div>
                <div class="logo">ORDER<span style="color:#d97706;">RIGHT</span> GHANA</div>
                <p style="margin:4px 0 0 0; font-size:12px; color:#6b7280;">Dansoman, Accra, Ghana • 0507363108</p>
                <p style="margin:2px 0 0 0; font-size:12px; color:#6b7280;">orderrightgh@gmail.com</p>
              </div>
              <div style="text-align:right;">
                <span class="status-badge">PAYMENT CONFIRMED</span>
                <p style="margin:8px 0 0 0; font-size:13px; font-weight:bold; color:#111827;">Receipt #${displayOrder.id}</p>
                <p style="margin:2px 0 0 0; font-size:12px; color:#6b7280;">Date: ${displayOrder.date || new Date().toISOString().slice(0,10)}</p>
              </div>
            </div>

            <div class="grid">
              <div class="grid-col">
                <h4>Customer Details</h4>
                <p>${shipping.fullName || displayOrder.customerName || 'Valued Customer'}</p>
                <p style="font-weight:normal; font-size:13px;">${shipping.email || 'customer@orderright.com'}</p>
                <p style="font-weight:normal; font-size:13px;">${shipping.phone || '+233 24 000 0000'}</p>
              </div>
              <div class="grid-col">
                <h4>Fulfillment Details</h4>
                <p>${shipping.deliveryDestination || 'Campus / Branch Pickup'}</p>
                <p style="font-weight:normal; font-size:13px;">Payment Method: ${displayOrder.paymentMethod || 'Paystack (MoMo)'}</p>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th style="width: 40px;">#</th>
                  <th>Item & Specifications</th>
                  <th style="text-align: center;">Qty</th>
                  <th style="text-align: right;">Unit Price</th>
                  <th style="text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsRows}
              </tbody>
            </table>

            <div class="total-box">
              <div class="total-row">
                <span>Subtotal:</span>
                <span>GH₵ ${Number(displayOrder.total || 0).toFixed(2)}</span>
              </div>
              <div class="total-row">
                <span>Delivery:</span>
                <span>${shipping.deliveryMode === 'university' ? 'FREE Campus Delivery' : 'Pay on Pickup'}</span>
              </div>
              <div class="total-row total-grand">
                <span>Total Paid:</span>
                <span>GH₵ ${Number(displayOrder.total || 0).toFixed(2)}</span>
              </div>
            </div>

            <div class="footer">
              <p style="margin: 0; font-weight: bold; color: #111827;">Thank you for your order with OrderRight!</p>
              <p style="margin: 4px 0 0 0;">This official receipt serves as proof of payment and order confirmation.</p>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <main className="pt-28 pb-2xl max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full min-h-screen">
      <div className="max-w-3xl mx-auto bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-xl shadow-lg space-y-xl text-center">
        
        {/* Success Icon */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-amber-50 text-sash-gold-dark border-2 border-sash-gold rounded-full flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-[36px]">verified</span>
          </div>
          <span className="font-embroidery text-sm uppercase tracking-widest text-sash-gold-dark font-bold mb-1">
            ORDER CONFIRMED!
          </span>
          <p className="text-zinc-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Thank you for your order. Your custom sash design & apparel items are now being prepared for production.
          </p>
        </div>

        {/* Order Info & Production Status Card */}
        <div className="bg-white border-2 border-sash-gold-dark/40 rounded-3xl p-6 text-left space-y-6 shadow-sm">
          
          <div className="flex justify-between items-start border-b border-zinc-100 pb-4">
            <div>
              <span className="font-embroidery text-xs tracking-wider text-zinc-500 uppercase">Order Number</span>
              <h3 className="font-montserrat font-bold text-lg text-zinc-900">#{displayOrder.id}</h3>
            </div>
            <div className="text-right">
              <span className="font-embroidery text-xs tracking-wider text-zinc-500 uppercase">Estimated Delivery</span>
              <p className="font-montserrat font-semibold text-sm text-zinc-800">
                {new Date(Date.now() + 86400000 * 5).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Production Status Timeline */}
          <div>
            <h4 className="font-embroidery text-xs tracking-wider text-zinc-600 uppercase mb-4">
              Production Status
            </h4>
            
            <div className="space-y-4 relative pl-7 border-l-2 border-zinc-200 ml-2">
              
              {/* Step 1: Design Received */}
              <div className="relative flex items-center">
                <div className="absolute -left-[37px] w-6 h-6 rounded-full bg-sash-gold-dark text-white flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </div>
                <div>
                  <h5 className="font-embroidery text-xs tracking-wider uppercase text-zinc-900 font-bold">
                    DESIGN RECEIVED
                  </h5>
                </div>
              </div>

              {/* Step 2: Confirmed */}
              <div className="relative flex items-center">
                <div className="absolute -left-[37px] w-6 h-6 rounded-full bg-white border-2 border-sash-gold-dark flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-sash-gold-dark" />
                </div>
                <div>
                  <h5 className="font-embroidery text-xs tracking-wider uppercase text-sash-gold-dark font-bold">
                    CONFIRMED & FORM SYNCHRONIZED
                  </h5>
                </div>
              </div>

              {/* Step 3: In Production */}
              <div className="relative flex items-center">
                <div className="absolute -left-[37px] w-6 h-6 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center text-zinc-400">
                  <span className="material-symbols-outlined text-[14px]">precision_manufacturing</span>
                </div>
                <div>
                  <h5 className="font-embroidery text-xs tracking-wider uppercase text-zinc-400">
                    IN PRODUCTION
                  </h5>
                </div>
              </div>

              {/* Step 4: Quality Check */}
              <div className="relative flex items-center">
                <div className="absolute -left-[37px] w-6 h-6 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center text-zinc-400">
                  <span className="material-symbols-outlined text-[14px]">inventory</span>
                </div>
                <div>
                  <h5 className="font-embroidery text-xs tracking-wider uppercase text-zinc-400">
                    QUALITY CHECK
                  </h5>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* FormNX Auto-Prefilled Order Form Widget */}
        <FormNXOrderWidget order={displayOrder} />

        {/* CTAs */}
        <div className="space-y-3">
          <button
            onClick={handleDownloadReceipt}
            className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-embroidery text-sm tracking-widest uppercase shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">download</span>
            <span>DOWNLOAD RECEIPT (PDF)</span>
          </button>

          <button
            onClick={() => navigate('/orders')}
            className="w-full py-3.5 bg-sash-gold-dark hover:bg-sash-gold text-white rounded-2xl font-embroidery text-sm tracking-widest uppercase shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            <span>VIEW MY ORDERS</span>
          </button>
          
          <Link
            to="/shop"
            className="w-full py-3.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-zinc-800 rounded-2xl font-embroidery text-sm tracking-widest uppercase transition-colors flex items-center justify-center gap-2 block"
          >
            <span className="material-symbols-outlined text-[18px]">storefront</span>
            <span>CONTINUE SHOPPING</span>
          </Link>
        </div>

      </div>
    </main>
  );
}
