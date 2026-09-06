import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest text-primary w-full py-xl border-t border-surface-container-highest transition-all duration-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Brand info */}
        <div className="flex flex-col space-y-md">
          <Link to="/" className="inline-block">
            <img src="/media/logo_black.png" alt="OrderRight" className="h-8 w-auto object-contain" />
          </Link>
          <p className="font-body text-body-md text-on-surface-variant">© 2026 OrderRight. All rights reserved.</p>
        </div>

        {/* Links */}
        <div className="flex flex-col space-y-sm">
          <Link to="/shop" className="font-body text-body-md text-secondary font-medium hover:underline transition-all">Sitemap</Link>
          <Link to="/privacy" className="font-body text-body-md text-on-surface-variant hover:text-primary hover:underline transition-all">Privacy Policy</Link>
          <Link to="/terms" className="font-body text-body-md text-on-surface-variant hover:text-primary hover:underline transition-all">Terms of Service</Link>
          <Link to="/shipping" className="font-body text-body-md text-on-surface-variant hover:text-primary hover:underline transition-all">Shipping Info</Link>
          <Link to="/faqs" className="font-body text-body-md text-on-surface-variant hover:text-primary hover:underline transition-all">FAQs</Link>
        </div>

        {/* Newsletter & Extra Column */}
        <div className="md:col-span-2 flex flex-col space-y-md">
          <span className="font-headline font-semibold text-body-lg text-primary">Stay Connected</span>
          <p className="font-body text-body-md text-on-surface-variant max-w-md">
            Subscribe to receives updates on exclusive drops, high-fashion edits, and seasonal promotions.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 max-w-md">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
            />
            <button className="bg-primary text-on-primary font-label text-label-sm uppercase tracking-wider px-6 py-2.5 rounded-lg hover:bg-surface-tint transition-colors font-medium">
              Join
            </button>
          </form>
        </div>

      </div>
    </footer>
  );
}
