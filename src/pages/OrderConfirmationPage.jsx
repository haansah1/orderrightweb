import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import FormNXOrderWidget from '../components/FormNXOrderWidget';

export default function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  // Fallback demo order if visited directly
  const displayOrder = order || {
    id: "ORD-98421",
    date: "2026-08-29",
    total: 1030.00,
    paymentMethod: "MTN Mobile Money",
    shippingAddress: {
      fullName: "Kofi Mensah",
      address: "14 Independence Avenue, Ridge",
      city: "Accra",
      phone: "+233 24 123 4567"
    },
    items: [
      {
        id: "prod-1",
        name: "The Essential Heavyweight Tee",
        size: "L",
        color: "Deep Charcoal",
        price: 450.00,
        quantity: 1,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6mkgLDzF3nBP9-Rqd3IG2CE0IIMnoU413shAiDBEhpBqYiUVs7nZJBhKLITd9QxTMIRYWuKNqTF2CirELde9-wA2abhqcKiE8h_0fvjT9p7BAIo8rjyEfYHbKkmcoLFQotWUgpx8IS2fBchwUiH2VT25E9IUIOfg8ARJVGdrBHlKXmL81BPEGZ_pQij4Y9N98mS-LAeWmNM3Pi9Hpnvj9VllgZDIQgln_-RFjktViveui9vG5aK5z"
      },
      {
        id: "prod-2",
        name: "Canvas Structured Tote",
        size: "One Size",
        color: "Pristine White",
        price: 580.00,
        quantity: 1,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDh8-f6ezM9I205HS6NmCvSikDH1j4yDDVQP4FH91M5wnwnBNbMEUdH3t_IeZ0c_m9u56LMADwOE9eLIBPSSCvEPw_iUe9lXpdhIWQcsH_Kf6-C7eQogheRvjCEWnRLVkuzTkQETe8VYfDERF8X52Mxobd-MVhMPqnBt8AMNBdLAWUmg47sbuip2_TvMO5IeZaVY7WtE9tfzdFWooN4lYyPunAyp0_WkqPGwOlJ-DdjBL8ZpNgS-bzh"
      }
    ]
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

        {/* Order Info & Production Status Card matching screen.png */}
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
            onClick={() => navigate('/orders')}
            className="w-full py-4 bg-sash-gold-dark hover:bg-sash-gold text-white rounded-2xl font-embroidery text-sm tracking-widest uppercase shadow-lg transition-all flex items-center justify-center gap-2"
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
