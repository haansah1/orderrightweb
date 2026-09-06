import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicyPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const sections = [
    {
      id: "section-1",
      number: "1",
      title: "Information We Collect",
      icon: "assignment",
      content: (
        <div className="space-y-4">
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            We may collect the following information:
          </p>

          {/* Personal Information */}
          <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-highest space-y-2">
            <h4 className="font-headline font-bold text-body-md text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary">badge</span>
              Personal Information
            </h4>
            <p className="font-body text-body-sm text-on-surface-variant">
              When you create an account, place an order, or contact us, we may collect:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-body-sm text-on-surface pt-1">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Full name
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Email address
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Phone number
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Profile picture
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Delivery address or location
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> University, hall, and room info where applicable
              </li>
            </ul>
          </div>

          {/* Order Information */}
          <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-highest space-y-2">
            <h4 className="font-headline font-bold text-body-md text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary">shopping_cart</span>
              Order Information
            </h4>
            <p className="font-body text-body-sm text-on-surface-variant">
              When you place an order, we may collect information about:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {["Selected products", "Sizes", "Materials", "Quantities", "Customization preferences", "Bulk order details", "Delivery preferences", "Order history"].map((item, idx) => (
                <span key={idx} className="bg-surface border border-outline-variant text-on-surface text-xs px-3 py-1 rounded-full font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Graduation Sash Studio Orders */}
          <div className="bg-amber-50/50 border border-amber-200 p-4 rounded-xl space-y-2">
            <h4 className="font-headline font-bold text-body-md text-amber-950 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-sash-gold-dark">school</span>
              Graduation Sash Studio Orders
            </h4>
            <p className="font-body text-body-sm text-amber-900">
              For Graduation Sash Studio orders, we may also collect information you provide for customization, such as:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-body-sm text-amber-950 pt-1">
              <li className="flex items-center gap-2">🎓 Name</li>
              <li className="flex items-center gap-2">🎓 Academic programme</li>
              <li className="flex items-center gap-2">🎓 University</li>
              <li className="flex items-center gap-2">🎓 University logo</li>
              <li className="flex items-center gap-2">🎓 Uploaded logos or images</li>
              <li className="flex items-center gap-2">🎓 Quotes, verses, or personal messages</li>
              <li className="flex items-center gap-2">🎓 Selected symbols</li>
              <li className="flex items-center gap-2">🎓 Sash design and layout preferences</li>
            </ul>
          </div>

          {/* Payment & Technical Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-highest space-y-1">
              <h4 className="font-headline font-bold text-body-md text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-emerald-600">lock</span>
                Payment Information
              </h4>
              <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
                Payments may be processed through approved third-party payment providers. OrderRight does not intentionally store sensitive card details unless specifically required and securely handled by an authorized payment provider.
              </p>
            </div>

            <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-highest space-y-1">
              <h4 className="font-headline font-bold text-body-md text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-blue-600">devices</span>
                Technical Information
              </h4>
              <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
                We may collect certain technical information when you use our platform, including: device information, browser or application information, IP address, approximate location, pages or features used, app activity, and error and performance information.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "section-2",
      number: "2",
      title: "How We Use Your Information",
      icon: "settings_suggest",
      content: (
        <div className="space-y-3">
          <p className="font-body text-body-md text-on-surface-variant">
            We may use your information to:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Create and manage your account",
              "Process and manage your orders",
              "Customize products based on your instructions",
              "Process payments",
              "Arrange delivery",
              "Communicate with you about your orders",
              "Provide customer support",
              "Improve our website, app, products, and services",
              "Manage referrals and commissions",
              "Detect fraud or misuse",
              "Maintain the security of our services",
              "Send relevant updates, promotions, or marketing communications where permitted"
            ].map((purpose, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-surface-container-lowest rounded-xl border border-surface-container-highest">
                <span className="w-6 h-6 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-xs flex-shrink-0">
                  {idx + 1}
                </span>
                <span className="font-body text-body-sm text-primary font-medium">{purpose}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "section-3",
      number: "3",
      title: "Your Designs and Uploaded Content",
      icon: "palette",
      content: (
        <div className="space-y-3">
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            When you upload a design, logo, image, or other content to OrderRight, you retain responsibility for ensuring that you have the necessary rights or permission to use that content.
          </p>
          <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-highest">
            <h4 className="font-headline font-bold text-body-md text-primary mb-2">Permitted Usage</h4>
            <p className="font-body text-body-sm text-on-surface-variant mb-2">
              We may use your uploaded content only as reasonably necessary to:
            </p>
            <ul className="space-y-1.5 text-body-sm text-on-surface">
              <li className="flex items-center gap-2">✓ Display your design within the platform</li>
              <li className="flex items-center gap-2">✓ Allow you to customize and preview a product</li>
              <li className="flex items-center gap-2">✓ Produce your ordered item</li>
              <li className="flex items-center gap-2">✓ Process and fulfil your order</li>
              <li className="flex items-center gap-2">✓ Provide customer support</li>
              <li className="flex items-center gap-2">✓ Maintain records relating to your order</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 text-red-900 p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-red-600 flex-shrink-0">gavel</span>
            <span>You must not upload content that infringes another person's intellectual property rights, violates applicable laws, or is otherwise unlawful.</span>
          </div>
        </div>
      )
    },
    {
      id: "section-4",
      number: "4",
      title: "How We Share Your Information",
      icon: "share",
      content: (
        <div className="space-y-3">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600">verified</span>
            <span>OrderRight does not sell your personal information.</span>
          </div>
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            We may share relevant information with trusted service providers where necessary to operate our business and fulfil your orders, including:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { title: "Payment service providers", icon: "payments" },
              { title: "Delivery and logistics partners", icon: "local_shipping" },
              { title: "Printing and production teams", icon: "print" },
              { title: "Cloud hosting and storage providers", icon: "cloud" },
              { title: "Technology and analytics service providers", icon: "analytics" }
            ].map((partner, idx) => (
              <div key={idx} className="p-3 bg-surface-container-low rounded-xl border border-surface-container-highest flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-[20px]">{partner.icon}</span>
                <span className="font-body text-body-sm font-semibold text-primary">{partner.title}</span>
              </div>
            ))}
          </div>
          <p className="font-body text-body-sm text-on-surface-variant italic pt-1">
            These parties should only receive information necessary to provide their services or support OrderRight's operations. We may also disclose information where required by law or when necessary to protect the rights, safety, and security of OrderRight, our users, or others.
          </p>
        </div>
      )
    },
    {
      id: "section-5",
      number: "5",
      title: "Location Information",
      icon: "location_on",
      content: (
        <div className="space-y-2">
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            OrderRight may allow you to provide a delivery location or use your current location to help determine delivery availability and costs.
          </p>
          <p className="font-body text-body-sm text-on-surface-variant">
            We use location information only as necessary to provide location-based services, such as identifying your delivery area and calculating delivery options.
          </p>
          <p className="font-body text-body-sm text-on-surface-variant font-medium">
            You can choose not to provide location access, although some delivery features may be limited.
          </p>
        </div>
      )
    },
    {
      id: "section-6",
      number: "6",
      title: "University and Student Delivery Information",
      icon: "school",
      content: (
        <div className="space-y-2">
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            Where you choose student or campus delivery, we may collect information such as your:
          </p>
          <div className="flex flex-wrap gap-2">
            {["University", "Hall or residence", "Room number", "Contact details"].map((info, idx) => (
              <span key={idx} className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                🎓 {info}
              </span>
            ))}
          </div>
          <p className="font-body text-body-sm text-on-surface-variant pt-1">
            This information is used to help identify the correct delivery location and fulfil your order.
          </p>
        </div>
      )
    },
    {
      id: "section-7",
      number: "7",
      title: "Data Security",
      icon: "security",
      content: (
        <div className="space-y-2">
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            We take reasonable technical and organisational measures to protect your information from unauthorized access, loss, misuse, alteration, or disclosure.
          </p>
          <p className="font-body text-body-sm text-on-surface-variant">
            However, no internet-based service or electronic storage system can be guaranteed to be completely secure. You are responsible for protecting your account credentials and should not share your password with others.
          </p>
        </div>
      )
    },
    {
      id: "section-8",
      number: "8",
      title: "Data Retention",
      icon: "history",
      content: (
        <div className="space-y-2">
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            We retain personal information only for as long as reasonably necessary to:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-body-sm text-primary">
            {["Provide our services", "Fulfil and manage orders", "Maintain business and transaction records", "Resolve disputes", "Comply with legal obligations", "Improve and protect our services"].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-surface-container-low p-2.5 rounded-lg border border-surface-container-highest">
                <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="font-body text-body-sm text-on-surface-variant italic pt-1">
            We may retain certain information for longer periods where required by law or legitimate business purposes.
          </p>
        </div>
      )
    },
    {
      id: "section-9",
      number: "9",
      title: "Your Rights and Choices",
      icon: "tune",
      content: (
        <div className="space-y-2">
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            Depending on applicable law, you may have the right to:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-body-sm text-primary">
            <li className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container-highest flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary">visibility</span> Access your personal information
            </li>
            <li className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container-highest flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary">edit</span> Request correction of inaccurate information
            </li>
            <li className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container-highest flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary">delete</span> Request deletion of certain personal information
            </li>
            <li className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container-highest flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary">manage_accounts</span> Update your account details
            </li>
            <li className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container-highest flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary">mail_lock</span> Opt out of certain marketing communications
            </li>
            <li className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container-highest flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary">undo</span> Withdraw consent where processing is based on consent
            </li>
          </ul>
          <p className="font-body text-body-sm text-on-surface-variant pt-2">
            To make a privacy-related request, contact us using the details provided below.
          </p>
        </div>
      )
    },
    {
      id: "section-10",
      number: "10",
      title: "Marketing Communications",
      icon: "campaign",
      content: (
        <div className="space-y-2">
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            We may send you information about:
          </p>
          <div className="flex flex-wrap gap-2">
            {["New products", "New designs", "Promotions", "Discounts", "Special offers", "Updates about OrderRight"].map((item, idx) => (
              <span key={idx} className="bg-surface border border-outline-variant text-on-surface text-xs px-3 py-1 rounded-full font-medium">
                {item}
              </span>
            ))}
          </div>
          <p className="font-body text-body-sm text-on-surface-variant pt-2">
            You can opt out of marketing communications at any time by using the unsubscribe option provided or by contacting us.
          </p>
        </div>
      )
    },
    {
      id: "section-11",
      number: "11",
      title: "Children's Privacy",
      icon: "child_care",
      content: (
        <div className="space-y-2">
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            OrderRight is not intended to knowingly collect personal information from children where parental or guardian consent is required by applicable law.
          </p>
          <p className="font-body text-body-sm text-on-surface-variant">
            If you believe that a child has provided us with personal information without appropriate authorization, please contact us so that we can take appropriate action.
          </p>
        </div>
      )
    },
    {
      id: "section-12",
      number: "12",
      title: "Third-Party Services",
      icon: "open_in_new",
      content: (
        <div className="space-y-2">
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            Our platform may use or link to third-party services, including payment providers, maps, delivery services, analytics providers, and social media platforms.
          </p>
          <p className="font-body text-body-sm text-on-surface-variant">
            These third parties may have their own privacy policies. We encourage you to review their privacy practices before providing information directly to them.
          </p>
        </div>
      )
    },
    {
      id: "section-13",
      number: "13",
      title: "Changes to This Privacy Policy",
      icon: "update",
      content: (
        <div className="space-y-2">
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            We may update this Privacy Policy from time to time to reflect changes in our services, operations, or legal requirements.
          </p>
          <p className="font-body text-body-sm text-on-surface-variant">
            When we make changes, we will update the Effective Date at the top of this page. We encourage you to review this Privacy Policy periodically.
          </p>
        </div>
      )
    },
    {
      id: "section-14",
      number: "14",
      title: "Contact Us",
      icon: "contact_support",
      content: (
        <div className="bg-surface-container-lowest border-2 border-primary/20 rounded-2xl p-6 space-y-4 shadow-md">
          <p className="font-body text-body-md text-primary font-medium">
            If you have questions, concerns, or requests regarding this Privacy Policy or how OrderRight handles your personal information, please contact us:
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
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-secondary text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Official Document
              </span>
              <span className="text-xs text-on-surface-variant font-medium">
                Effective Date: <strong>25.06.25</strong>
              </span>
            </div>
            <h1 className="font-display font-bold text-display-lg-mobile sm:text-display-lg text-primary tracking-tight">
              Privacy Policy for OrderRight
            </h1>
            <p className="font-body text-body-md sm:text-headline-sm text-on-surface-variant max-w-2xl mt-2 leading-relaxed">
              OrderRight (“we,” “us,” or “our”) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect information when you use the OrderRight website, mobile application, and related services.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="hidden sm:flex items-center gap-2 bg-surface-container border border-outline-variant hover:bg-surface-container-high text-primary px-4 py-2.5 rounded-xl font-label text-xs uppercase tracking-wider font-semibold transition-colors flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            Print Policy
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
                placeholder="Search privacy topics..."
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

          </div>
        </aside>

        {/* Policy Sections Content */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Introductory Statement */}
          <div className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-6 space-y-3 shadow-xs">
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              By using OrderRight, you agree to the practices described in this Privacy Policy.
            </p>
            <div className="p-3.5 bg-secondary/10 border border-secondary/20 rounded-xl text-primary font-medium text-xs sm:text-body-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px] flex-shrink-0">shield</span>
              <span>Your privacy and data security are core priorities for OrderRight.</span>
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
                <span className="w-9 h-9 rounded-xl bg-secondary text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-sm">
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
