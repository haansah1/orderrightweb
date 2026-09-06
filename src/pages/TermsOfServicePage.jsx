import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TermsOfServicePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const sections = [
    {
      id: "section-1",
      number: "1",
      title: "Our Services",
      icon: "storefront",
      content: (
        <div className="space-y-3">
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            OrderRight allows customers to purchase ready-made apparel and customize products, including T-shirts and graduation sashes.
          </p>
          <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-highest flex items-start gap-3">
            <span className="material-symbols-outlined text-secondary text-[22px] flex-shrink-0 mt-0.5">info</span>
            <p className="font-body text-body-sm text-on-surface-variant">
              Available products, sizes, colours, materials, and customization options may change based on availability and stock.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "section-2",
      number: "2",
      title: "Orders and Customization",
      icon: "palette",
      content: (
        <div className="space-y-4">
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            Customers are responsible for reviewing all order details before confirmation, including designs, text, spelling, sizes, quantities, and delivery details.
          </p>

          <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-highest space-y-2">
            <h4 className="font-headline font-bold text-body-md text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary">assignment_turned_in</span>
              Customer Order Review Checklist
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              {["Custom Text & Spelling", "Size Selection", "Quantity", "Fabric Weight", "Design & Symbol Layout", "Delivery Address"].map((item, idx) => (
                <div key={idx} className="bg-surface border border-outline-variant text-on-surface text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5">
                  <span className="text-secondary font-bold">✓</span> {item}
                </div>
              ))}
            </div>
          </div>

          <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
            Customized products are produced based on the information and design submitted or approved by the customer. OrderRight may contact you if a design cannot reasonably be produced as requested.
          </p>
        </div>
      )
    },
    {
      id: "section-3",
      number: "3",
      title: "Pricing and Payment",
      icon: "payments",
      content: (
        <div className="space-y-3">
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            Prices and applicable charges, including customization and delivery fees, will be displayed before checkout.
          </p>
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs sm:text-body-sm font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600 flex-shrink-0">lock</span>
            <span>Orders may only enter production after payment has been successfully confirmed, unless otherwise agreed.</span>
          </div>
        </div>
      )
    },
    {
      id: "section-4",
      number: "4",
      title: "Product Availability",
      icon: "inventory_2",
      content: (
        <div className="space-y-3">
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            All products and materials are subject to availability.
          </p>
          <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
            If an item becomes unavailable after an order is placed, we will contact you regarding available alternatives, revised timelines, or an appropriate resolution.
          </p>
        </div>
      )
    },
    {
      id: "section-5",
      number: "5",
      title: "Delivery",
      icon: "local_shipping",
      content: (
        <div className="space-y-3">
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            Delivery costs and timelines may vary depending on location, order size, production requirements, and the selected delivery option.
          </p>
          <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-highest space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-body-sm">
              <span className="material-symbols-outlined text-[18px] text-secondary">schedule</span>
              Standard Delivery Timeline: 2-5 Business Days
            </div>
            <p className="font-body text-body-sm text-on-surface-variant">
              Customers must provide accurate delivery information, including university, hall, or room details where applicable.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "section-6",
      number: "6",
      title: "Cancellations, Returns and Refunds",
      icon: "replay",
      content: (
        <div className="space-y-3">
          <div className="p-3.5 bg-amber-50 border border-amber-200 text-amber-950 rounded-xl text-xs sm:text-body-sm font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-600 flex-shrink-0">warning</span>
            <span>Customized products may not be eligible for cancellation, return, or refund once production has started.</span>
          </div>
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            Where an error occurs on the part of OrderRight, we will assess the issue and provide an appropriate resolution where applicable.
          </p>
        </div>
      )
    },
    {
      id: "section-7",
      number: "7",
      title: "Referral Programme",
      icon: "group_add",
      content: (
        <div className="space-y-3">
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            Where available, referral rewards or commissions are subject to OrderRight's referral rules and qualifying conditions.
          </p>
          <p className="font-body text-body-sm text-on-surface-variant italic">
            Rewards connected to invalid, cancelled, or fraudulent transactions may be withheld or reversed.
          </p>
        </div>
      )
    },
    {
      id: "section-8",
      number: "8",
      title: "Changes to Our Terms",
      icon: "edit_note",
      content: (
        <div className="space-y-3">
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            We may update these Terms from time to time.
          </p>
          <p className="font-body text-body-sm text-on-surface-variant font-medium">
            Continued use of OrderRight after changes take effect means you accept the updated Terms.
          </p>
        </div>
      )
    },
    {
      id: "section-9",
      number: "9",
      title: "Governing Law",
      icon: "gavel",
      content: (
        <div className="space-y-3">
          <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-highest flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary text-[24px]">flag</span>
            <p className="font-headline font-bold text-body-md text-primary">
              These Terms are governed by the applicable laws of Ghana.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "section-10",
      number: "10",
      title: "Contact Us",
      icon: "contact_support",
      content: (
        <div className="bg-surface-container-lowest border-2 border-primary/20 rounded-2xl p-6 space-y-4 shadow-md">
          <p className="font-body text-body-md text-primary font-medium">
            For questions regarding these Terms or our services, contact:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-highest flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-[28px] text-secondary mb-1">location_on</span>
              <span className="font-headline font-bold text-body-sm text-primary">OrderRight</span>
              <span className="font-body text-xs text-on-surface-variant mt-1">Dansoman, Accra, Ghana</span>
            </div>

            <a href="mailto:orderrightgh@gmail.com" className="bg-surface-container-low hover:bg-secondary/10 transition-colors p-4 rounded-xl border border-surface-container-highest flex flex-col items-center text-center group">
              <span className="material-symbols-outlined text-[28px] text-secondary mb-1 group-hover:scale-110 transition-transform">mail</span>
              <span className="font-headline font-bold text-body-sm text-primary">Email Us</span>
              <span className="font-body text-xs text-secondary font-medium mt-1 underline">orderrightgh@gmail.com</span>
            </a>

            <a href="tel:0507363108" className="bg-surface-container-low hover:bg-secondary/10 transition-colors p-4 rounded-xl border border-surface-container-highest flex flex-col items-center text-center group">
              <span className="material-symbols-outlined text-[28px] text-secondary mb-1 group-hover:scale-110 transition-transform">call</span>
              <span className="font-headline font-bold text-body-sm text-primary">Phone</span>
              <span className="font-body text-xs text-secondary font-medium mt-1 underline">0507363108</span>
            </a>
          </div>
        </div>
      )
    }
  ];

  const filteredSections = sections.filter(sec => 
    sec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sec.number.includes(searchTerm)
  );

  return (
    <main className="pt-28 pb-2xl w-full max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop min-h-screen">
      
      {/* Header Banner */}
      <div className="bg-surface-container-lowest border border-surface-container-highest rounded-3xl p-6 sm:p-10 mb-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-0 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-primary text-on-primary text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Legal Terms
              </span>
              <span className="text-xs text-on-surface-variant font-medium">
                Effective Date: <strong>25.06.25</strong>
              </span>
              <span className="text-xs text-on-surface-variant font-medium">
                • Last Updated: <strong>05.09.26</strong>
              </span>
            </div>
            <h1 className="font-display font-bold text-display-lg-mobile sm:text-display-lg text-primary tracking-tight">
              Terms of Service
            </h1>
            <p className="font-body text-body-md sm:text-headline-sm text-on-surface-variant max-w-2xl mt-2 leading-relaxed">
              Welcome to OrderRight. By using our website, mobile application, and services, you agree to these Terms of Service.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="hidden sm:flex items-center gap-2 bg-surface-container border border-outline-variant hover:bg-surface-container-high text-primary px-4 py-2.5 rounded-xl font-label text-xs uppercase tracking-wider font-semibold transition-colors flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            Print Terms
          </button>
        </div>
      </div>

      {/* Quick Search & Table of Contents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sticky Table of Contents Sidebar */}
        <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
          <div className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-5 shadow-xs space-y-4">
            
            {/* Search Input */}
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3.5 top-3 text-on-surface-variant text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search terms..."
                className="w-full bg-surface-container-low border border-outline-variant rounded-xl pl-10 pr-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div className="border-t border-surface-container-highest pt-3">
              <h3 className="font-headline font-bold text-body-sm text-primary mb-2 flex items-center justify-between">
                <span>Table of Contents</span>
                <span className="text-[10px] text-on-surface-variant uppercase font-medium">{sections.length} Sections</span>
              </h3>

              <div className="max-h-[60vh] overflow-y-auto space-y-1 pr-1 no-scrollbar">
                {sections.map(sec => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="flex items-center gap-2.5 p-2 rounded-lg text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors truncate"
                  >
                    <span className="w-5 h-5 rounded-full bg-surface-container font-bold text-[10px] flex items-center justify-center text-primary flex-shrink-0">
                      {sec.number}
                    </span>
                    <span className="truncate">{sec.title}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Link to Privacy Policy */}
            <div className="border-t border-surface-container-highest pt-3">
              <Link to="/privacy" className="flex items-center gap-2 text-xs font-semibold text-secondary hover:underline">
                <span className="material-symbols-outlined text-[16px]">privacy_tip</span>
                View Privacy Policy
              </Link>
            </div>

          </div>
        </aside>

        {/* Policy Sections Content */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Introductory Notice */}
          <div className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="p-3.5 bg-secondary/10 border border-secondary/20 rounded-xl text-primary font-medium text-xs sm:text-body-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px] flex-shrink-0">gavel</span>
              <span>Please read these terms carefully before confirming your order or using our custom studio tools.</span>
            </div>
          </div>

          {/* Render Sections */}
          {filteredSections.map(sec => (
            <section
              id={sec.id}
              key={sec.id}
              className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-28"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-surface-container-highest">
                <span className="w-9 h-9 rounded-xl bg-primary text-on-primary font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-sm">
                  {sec.number}
                </span>
                <h2 className="font-headline font-bold text-headline-sm sm:text-headline-md text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-[22px] text-secondary hidden sm:inline">{sec.icon}</span>
                  {sec.title}
                </h2>
              </div>

              {sec.content}
            </section>
          ))}

          {filteredSections.length === 0 && (
            <div className="p-8 text-center bg-surface-container-lowest border border-surface-container-highest rounded-2xl">
              <span className="material-symbols-outlined text-[48px] text-outline-variant mb-2">search_off</span>
              <h3 className="font-headline font-bold text-headline-sm text-primary mb-1">No matching section found</h3>
              <p className="text-xs text-on-surface-variant mb-4">Try searching with a different keyword or view all sections above.</p>
              <button onClick={() => setSearchTerm('')} className="bg-primary text-white text-xs px-4 py-2 rounded-lg uppercase">
                Clear Search
              </button>
            </div>
          )}

        </div>

      </div>

    </main>
  );
}
