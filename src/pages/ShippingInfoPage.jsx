import React from 'react';
import { Link } from 'react-router-dom';

export default function ShippingInfoPage() {
  const speedafSteps = [
    {
      step: 1,
      title: "Place your order",
      desc: "Customize your T-shirt or Sash studio order on OrderRight.",
      icon: "shopping_bag"
    },
    {
      step: 2,
      title: "Select Speedaf Delivery",
      desc: "Choose Speedaf Delivery during checkout for non-campus locations.",
      icon: "local_shipping"
    },
    {
      step: 3,
      title: "Choose Speedaf Branch",
      desc: "Select the Speedaf pickup branch closest to your location.",
      icon: "location_on"
    },
    {
      step: 4,
      title: "Order Dispatch & Transit",
      desc: "Your order will be safely produced and dispatched to the selected branch.",
      icon: "package_2"
    },
    {
      step: 5,
      title: "Ready for Pickup Alert",
      desc: "You will be notified via email/SMS when your package arrives at the branch.",
      icon: "notifications_active"
    },
    {
      step: 6,
      title: "Pickup & Pay Fee",
      desc: "Pay the delivery fee directly at the Speedaf branch upon collecting your item.",
      icon: "payments"
    }
  ];

  const importantNotes = [
    {
      title: "Free Campus Delivery",
      desc: "Delivery to supported schools and universities is 100% free.",
      badge: "FREE",
      color: "bg-emerald-50 text-emerald-900 border-emerald-200",
      icon: "school"
    },
    {
      title: "Speedaf Logistics Partner",
      desc: "Delivery outside school campuses is securely handled through Speedaf.",
      badge: "SPEEDAF",
      color: "bg-blue-50 text-blue-900 border-blue-200",
      icon: "local_shipping"
    },
    {
      title: "Branch Selection",
      desc: "Customers are responsible for selecting the correct and most convenient Speedaf pickup branch.",
      badge: "CUSTOMER CHOICE",
      color: "bg-purple-50 text-purple-900 border-purple-200",
      icon: "map"
    },
    {
      title: "Pay Upon Pickup",
      desc: "The delivery fee for Speedaf orders is paid directly when picking up your package.",
      badge: "PAY ON PICKUP",
      color: "bg-amber-50 text-amber-900 border-amber-200",
      icon: "account_balance_wallet"
    },
    {
      title: "Timeline & Production",
      desc: "Standard delivery is 2-5 business days. Times may vary depending on order type, quantity, and location.",
      badge: "2-5 DAYS",
      color: "bg-surface-container-low text-primary border-surface-container-highest",
      icon: "schedule"
    }
  ];

  return (
    <main className="pt-28 pb-2xl w-full max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop min-h-screen">
      
      {/* Header Hero Banner */}
      <div className="bg-surface-container-lowest border border-surface-container-highest rounded-3xl p-6 sm:p-10 mb-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-0 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-secondary text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                Delivery Guide
              </span>
              <span className="bg-emerald-100 text-emerald-900 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Free Campus Delivery Available
              </span>
            </div>
            <h1 className="font-display font-bold text-display-lg-mobile sm:text-display-lg text-primary tracking-tight">
              Shipping Information
            </h1>
            <p className="font-body text-body-md sm:text-headline-sm text-on-surface-variant mt-2 leading-relaxed">
              At OrderRight, we aim to make receiving your order simple and convenient.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="hidden sm:flex items-center gap-2 bg-surface-container border border-outline-variant hover:bg-surface-container-high text-primary px-4 py-2.5 rounded-xl font-label text-xs uppercase tracking-wider font-semibold transition-colors flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            Print Guide
          </button>
        </div>
      </div>

      {/* Main Delivery Methods Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        
        {/* Method 1: School & University Delivery */}
        <div className="bg-surface-container-lowest border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">school</span>
              </div>
              <span className="bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full">
                100% FREE
              </span>
            </div>

            <div>
              <h2 className="font-headline font-bold text-headline-md text-primary">
                Free Delivery to Schools & Universities
              </h2>
              <p className="font-body text-body-md text-on-surface-variant mt-2 leading-relaxed">
                We offer <strong>FREE delivery</strong> to selected schools and universities across Ghana.
              </p>
            </div>

            <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4 space-y-2">
              <h4 className="font-headline font-bold text-body-sm text-emerald-950 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-emerald-700">check_circle</span>
                How to claim campus delivery:
              </h4>
              <p className="font-body text-body-sm text-emerald-900 leading-relaxed">
                During checkout, simply select your school or university and provide the required location details, such as your hall, hostel, or other designated delivery information where applicable.
              </p>
            </div>

            <p className="font-body text-body-sm text-on-surface-variant italic">
              Our delivery arrangements will ensure your order reaches the appropriate school or university location safely.
            </p>
          </div>

          <div className="pt-4 border-t border-surface-container-highest">
            <Link to="/shop" className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors uppercase tracking-wider">
              Start Order for Campus Delivery <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Method 2: Speedaf Branch Delivery */}
        <div className="bg-surface-container-lowest border-2 border-blue-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">local_shipping</span>
              </div>
              <span className="bg-blue-600 text-white font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full">
                SPEEDAF PICKUP
              </span>
            </div>

            <div>
              <h2 className="font-headline font-bold text-headline-md text-primary">
                Delivery Outside Schools & Universities
              </h2>
              <p className="font-body text-body-md text-on-surface-variant mt-2 leading-relaxed">
                For locations outside our supported school and university delivery areas, orders are sent through <strong>Speedaf</strong>.
              </p>
            </div>

            <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-4 space-y-2">
              <h4 className="font-headline font-bold text-body-sm text-blue-950 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-blue-700">store</span>
                Convenient Branch Pickup
              </h4>
              <p className="font-body text-body-sm text-blue-900 leading-relaxed">
                After your order is processed, you can select the Speedaf branch closest to you for convenient pickup.
              </p>
            </div>

            <p className="font-body text-body-sm text-on-surface-variant italic">
              Delivery fees for Speedaf orders are calculated based on branch location and paid upon pickup.
            </p>
          </div>

          <div className="pt-4 border-t border-surface-container-highest">
            <Link to="/checkout" className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors uppercase tracking-wider">
              Select Pickup Branch at Checkout <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Speedaf How It Works Timeline */}
      <div className="bg-surface-container-lowest border border-surface-container-highest rounded-3xl p-6 sm:p-10 mb-10 shadow-xs">
        <div className="mb-8">
          <span className="bg-secondary/10 text-secondary text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Step-by-Step
          </span>
          <h2 className="font-headline font-bold text-headline-md sm:text-headline-lg text-primary mt-2">
            How Speedaf Delivery Works
          </h2>
          <p className="font-body text-body-md text-on-surface-variant mt-1">
            Follow these simple steps when ordering outside campus delivery areas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {speedafSteps.map((stepItem) => (
            <div key={stepItem.step} className="bg-surface-container-low border border-surface-container-highest rounded-2xl p-5 space-y-3 relative group hover:border-secondary/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-secondary text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {stepItem.step}
                </span>
                <span className="material-symbols-outlined text-[24px] text-secondary opacity-80 group-hover:scale-110 transition-transform">
                  {stepItem.icon}
                </span>
              </div>
              <h3 className="font-headline font-bold text-body-md text-primary">
                {stepItem.title}
              </h3>
              <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
                {stepItem.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Important Information Section */}
      <div className="bg-surface-container-lowest border border-surface-container-highest rounded-3xl p-6 sm:p-10 mb-10 shadow-xs">
        <div className="mb-6 flex items-center gap-3">
          <span className="material-symbols-outlined text-[28px] text-secondary">info</span>
          <div>
            <h2 className="font-headline font-bold text-headline-md text-primary">
              Important Information
            </h2>
            <p className="font-body text-body-sm text-on-surface-variant">
              Key delivery policies and obligations to keep in mind.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {importantNotes.map((note, idx) => (
            <div key={idx} className={`p-4 rounded-2xl border ${note.color} space-y-2 flex flex-col justify-between`}>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined text-[22px]">{note.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/80 border border-current">
                    {note.badge}
                  </span>
                </div>
                <h4 className="font-headline font-bold text-body-md">{note.title}</h4>
                <p className="font-body text-body-sm leading-relaxed">{note.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Need Help? Contact Box */}
      <div className="bg-surface-container-lowest border-2 border-primary/20 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="material-symbols-outlined text-secondary text-[24px]">support_agent</span>
            <h3 className="font-headline font-bold text-headline-sm text-primary">Need Help with Delivery?</h3>
          </div>
          <p className="font-body text-body-md text-on-surface-variant max-w-xl">
            If you need assistance selecting a delivery option or have questions about your order, please contact the OrderRight team.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <a
            href="tel:0507363108"
            className="w-full sm:w-auto bg-secondary text-white px-5 py-3 rounded-xl font-label text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-xs hover:bg-secondary/90 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            0507363108
          </a>
          <a
            href="mailto:orderrightgh@gmail.com"
            className="w-full sm:w-auto bg-surface-container border border-outline-variant hover:bg-surface-container-high text-primary px-5 py-3 rounded-xl font-label text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">mail</span>
            Email Us
          </a>
        </div>
      </div>

    </main>
  );
}
