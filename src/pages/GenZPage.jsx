import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function GenZPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <main className="min-h-screen pt-20 bg-surface-container-lowest text-primary relative overflow-hidden flex flex-col justify-between">
      
      {/* Background Hero Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/media/genz_studio_lifestyle.jpg" 
          alt="Gen Z Lifestyle Studio" 
          className="w-full h-full object-cover object-center filter brightness-[0.4] scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/40" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-2xl w-full flex-grow flex flex-col items-center justify-center text-center">
        
        {/* Glowing Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 backdrop-blur-md mb-lg animate-pulse shadow-[0_0_20px_rgba(244,63,94,0.3)]">
          <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
          <span className="font-label font-bold text-label-md uppercase tracking-widest text-secondary-fixed">
            Exclusive Drop 001
          </span>
        </div>

        {/* Coming Soon Main Title */}
        <h1 className="font-display font-black text-[42px] sm:text-[64px] md:text-[84px] leading-none text-white tracking-tight drop-shadow-[0_8px_32px_rgba(0,0,0,0.8)] mb-md">
          GEN Z LIFESTYLE
        </h1>

        <div className="bg-surface/10 backdrop-blur-xl border border-white/15 px-6 py-2 rounded-2xl mb-xl inline-block shadow-2xl">
          <span className="font-headline font-extrabold text-headline-lg text-amber-300 uppercase tracking-widest">
            COMING SOON
          </span>
        </div>

        <p className="font-body text-body-lg text-surface-container-lowest/90 max-w-2xl mx-auto mb-2xl drop-shadow-md leading-relaxed">
          The ultimate blend of high-street graphic aesthetics, heavyweight luxury cotton, and camera studio streetwear. Get ready for the next evolution in college culture.
        </p>

        {/* VIP Early Access Signup Form */}
        <div className="w-full max-w-md bg-surface/30 backdrop-blur-2xl border border-white/20 p-6 md:p-8 rounded-3xl shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
          {subscribed ? (
            <div className="py-4 animate-fadeIn">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-500/30">
                <span className="material-symbols-outlined text-[28px]">check_circle</span>
              </div>
              <h3 className="font-headline font-bold text-headline-sm text-white mb-1">You're on the VIP Access List!</h3>
              <p className="font-body text-body-sm text-surface-container-lowest/80">
                We'll drop an exclusive invite directly to your inbox when the collection lands.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <label className="font-label text-label-md font-semibold text-white uppercase tracking-wider text-left">
                Get Early Access & Drops Notification
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="flex-grow bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-body-md text-white placeholder:text-white/50 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                />
                <button 
                  type="submit"
                  className="bg-secondary hover:bg-secondary-fixed text-white font-label font-bold text-label-md px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-secondary/50 uppercase tracking-wider whitespace-nowrap"
                >
                  Notify Me
                </button>
              </div>
              <p className="font-body text-[12px] text-white/60 text-left mt-1">
                🔒 No spam. Only drop countdowns and early VIP discount codes.
              </p>
            </form>
          )}
        </div>

        {/* Quick Navigation Back to Shop */}
        <div className="mt-2xl flex flex-wrap justify-center gap-4">
          <Link 
            to="/shop?collection=Boys"
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-label text-label-md border border-white/20 backdrop-blur-md transition-all flex items-center gap-2"
          >
            <span>Explore Boys Collection</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>

          <Link 
            to="/shop?collection=Girls"
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-label text-label-md border border-white/20 backdrop-blur-md transition-all flex items-center gap-2"
          >
            <span>Explore Girls Collection</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>

          <Link 
            to="/sash-studio"
            className="px-6 py-3 rounded-xl bg-sash-gold-dark/80 hover:bg-sash-gold-dark text-white font-label text-label-md border border-sash-gold-light/40 backdrop-blur-md transition-all flex items-center gap-2"
          >
            <span>🎓 Graduation Sash Studio</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

      </div>

    </main>
  );
}
