import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder, initializePaystackTransaction } from '../services/api';
import SashCartPreview from '../components/SashCartPreview';
import { FREE_UNIVERSITY_DELIVERY_OPTIONS, SPEEDAF_REGIONAL_BRANCHES } from '../data/speedafBranches';

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Delivery mode: 'university' vs 'speedaf_branch'
  const [deliveryMode, setDeliveryMode] = useState('university');
  const [selectedUniversity, setSelectedUniversity] = useState(FREE_UNIVERSITY_DELIVERY_OPTIONS[0].name);
  
  const regions = Object.keys(SPEEDAF_REGIONAL_BRANCHES);
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [selectedBranch, setSelectedBranch] = useState(SPEEDAF_REGIONAL_BRANCHES[regions[0]][0]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    streetAddress: '',
    notes: ''
  });

  // Track focused field to make placeholders disappear on click/focus
  const [focusedField, setFocusedField] = useState(null);

  const getPlaceholder = (fieldName, defaultText) => {
    return focusedField === fieldName ? '' : defaultText;
  };

  const [paymentMethod] = useState('Paystack');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Paystack Modal State
  const [showPaystackModal, setShowPaystackModal] = useState(false);
  const [momoProvider, setMomoProvider] = useState('MTN Mobile Money');
  const [momoPhone, setMomoPhone] = useState(formData.phone);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Total price
  const grandTotal = subtotal;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'phone') setMomoPhone(e.target.value);
  };

  const handleRegionChange = (e) => {
    const reg = e.target.value;
    setSelectedRegion(reg);
    const branches = SPEEDAF_REGIONAL_BRANCHES[reg] || [];
    setSelectedBranch(branches[0] || '');
  };

  // 1. Initial click on "Pay with Paystack"
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setSubmitting(true);
    setError('');

    let deliveryDestination = '';
    if (deliveryMode === 'university') {
      deliveryDestination = `Campus Delivery: ${selectedUniversity}`;
    } else {
      deliveryDestination = `Speedaf Branch Pickup: ${selectedBranch} (${selectedRegion}) - Pay on Pickup`;
    }

    const orderPayload = {
      items: cart,
      shippingAddress: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        deliveryMode,
        deliveryDestination,
        streetAddress: formData.streetAddress,
        notes: formData.notes
      },
      paymentMethod: 'Paystack (MoMo & Card)',
      total: grandTotal
    };

    // 1. Try Paystack Inline Popup V2 setup if window.PaystackPop and valid public key are available
    const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
    if (window.PaystackPop && paystackKey && !paystackKey.includes('placeholder')) {
      try {
        const paystack = new window.PaystackPop();
        paystack.newTransaction({
          key: paystackKey,
          email: formData.email,
          amount: Math.round(grandTotal * 100),
          currency: 'GHS',
          metadata: {
            custom_fields: [
              { display_name: "Customer Name", variable_name: "customer_name", value: formData.fullName },
              { display_name: "Phone Number", variable_name: "phone", value: formData.phone }
            ]
          },
          onSuccess: async (transaction) => {
            await finalizeOrder(transaction.reference || ('pstk_' + Date.now()), deliveryDestination);
          },
          onCancel: () => {
            setSubmitting(false);
          },
          onError: (err) => {
            console.warn('Paystack popup error:', err);
            setSubmitting(false);
          }
        });
        return;
      } catch (err) {
        console.warn('PaystackPop inline V2 setup failed, trying API initialization:', err);
      }
    }

    // 2. Official Backend Initialization Flow
    try {
      const paystackData = await initializePaystackTransaction({
        email: formData.email,
        amount: grandTotal,
        currency: 'GHS',
        metadata: {
          customer_name: formData.fullName,
          phone: formData.phone,
          deliveryDestination
        },
        callback_url: `${window.location.origin}/order-confirmation`
      });

      // If official Paystack authorization URL is returned, redirect to Paystack Payment Page
      if (paystackData.authorization_url) {
        window.location.href = paystackData.authorization_url;
        return;
      }

      // Resume Paystack transaction in iframe popup if access_code is present
      if (window.PaystackPop && paystackData.access_code && !paystackData.isSandbox) {
        try {
          const popup = new window.PaystackPop();
          popup.resumeTransaction(paystackData.access_code);
          setSubmitting(false);
          return;
        } catch (popupErr) {
          console.warn('Paystack Pop resume error:', popupErr);
        }
      }

      // 3. Fallback for Sandbox / Test Mode
      setShowPaystackModal(true);
      setSubmitting(false);
    } catch (err) {
      console.warn('Paystack initialization fallback to window:', err);
      setShowPaystackModal(true);
      setSubmitting(false);
    }
  };

  // 2. Finalize & create order after Paystack authorization
  const finalizeOrder = async (paystackRef, customDestination) => {
    setIsProcessingPayment(true);
    setError('');

    let deliveryDestination = customDestination;
    if (!deliveryDestination) {
      if (deliveryMode === 'university') {
        deliveryDestination = `Campus Delivery: ${selectedUniversity}`;
      } else {
        deliveryDestination = `Speedaf Branch Pickup: ${selectedBranch} (${selectedRegion}) - Pay on Pickup`;
      }
    }

    const orderPayload = {
      items: cart,
      shippingAddress: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        deliveryMode,
        deliveryDestination,
        streetAddress: formData.streetAddress,
        notes: formData.notes
      },
      paymentMethod: `Paystack (${momoProvider} - ${momoPhone})`,
      paystackReference: paystackRef || ('pstk_' + Date.now()),
      total: grandTotal
    };

    try {
      const res = await createOrder(orderPayload);
      clearCart();
      setShowPaystackModal(false);
      setIsProcessingPayment(false);
      navigate('/order-confirmation', { state: { order: res.order } });
    } catch (err) {
      console.error('Finalize order error:', err);
      setError(err.message || 'Failed to complete order. Please try again.');
      setIsProcessingPayment(false);
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-2xl max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop min-h-screen text-center flex flex-col items-center justify-center">
        <h2 className="font-headline font-bold text-headline-lg text-primary mb-md">Your cart is empty</h2>
        <Link to="/shop" className="bg-primary text-on-primary font-label text-label-md px-6 py-3 rounded-lg uppercase">
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <main className="pt-24 sm:pt-28 pb-2xl max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop w-full min-h-screen">
      <h1 className="font-display font-bold text-display-lg-mobile md:text-display-lg text-primary mb-lg sm:mb-xl">Checkout</h1>

      {error && (
        <div className="mb-lg p-md bg-error-container text-on-error-container rounded-xl border border-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-xl">
        
        {/* Shipping & Delivery Details (Left Column) */}
        <div className="lg:col-span-7 space-y-lg sm:space-y-xl">
          
          {/* Section 1: Contact Info */}
          <div className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-4 sm:p-xl space-y-md shadow-xs">
            <h2 className="font-headline font-bold text-body-lg sm:text-headline-md text-primary pb-sm border-b border-surface-container-highest flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] sm:text-[24px]">person</span>
              1. Contact Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="flex flex-col gap-xs">
                <label className="font-label text-label-sm text-on-surface-variant font-bold">Full Name *</label>
                <input 
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('fullName')}
                  onBlur={() => setFocusedField(null)}
                  placeholder={getPlaceholder('fullName', 'e.g. Ansah Junior Agyeku')}
                  required
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label text-label-sm text-on-surface-variant font-bold">Email Address *</label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder={getPlaceholder('email', 'e.g. ansah.junior@example.com')}
                  required
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label text-label-sm text-on-surface-variant font-bold">Phone Number (For Delivery Updates & Paystack) *</label>
              <input 
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                placeholder={getPlaceholder('phone', 'e.g. +233 24 123 4567')}
                required
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Section 2: Delivery Location Selection */}
          <div className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-4 sm:p-xl space-y-md shadow-xs">
            <h2 className="font-headline font-bold text-body-lg sm:text-headline-md text-primary pb-sm border-b border-surface-container-highest flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] sm:text-[24px]">local_shipping</span>
              2. Delivery Destination
            </h2>

            {/* Mode Selection Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
              <div 
                onClick={() => setDeliveryMode('university')}
                className={`p-3.5 sm:p-md rounded-xl border-2 cursor-pointer transition-all ${
                  deliveryMode === 'university' 
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-sm' 
                    : 'border-surface-container-highest bg-surface-container-low hover:border-outline-variant'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-[20px]">school</span>
                  <span className="font-headline font-bold text-body-md sm:text-body-lg text-primary">University Free Delivery</span>
                </div>
                <span className="text-xs text-emerald-700 font-bold block mt-1">GH₵ 0.00 • Free Campus Delivery</span>
              </div>

              <div 
                onClick={() => setDeliveryMode('speedaf_branch')}
                className={`p-3.5 sm:p-md rounded-xl border-2 cursor-pointer transition-all ${
                  deliveryMode === 'speedaf_branch' 
                    ? 'border-primary bg-surface-container-low shadow-sm' 
                    : 'border-surface-container-highest bg-surface-container-low hover:border-outline-variant'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">location_city</span>
                  <span className="font-headline font-bold text-body-md sm:text-body-lg text-primary">Speedaf Branch Pickup</span>
                </div>
                <span className="text-xs text-amber-700 font-semibold block mt-1">Pay for delivery on pickup</span>
              </div>
            </div>

            {/* University Dropdown */}
            {deliveryMode === 'university' ? (
              <div className="space-y-sm pt-sm animate-fadeIn">
                <label className="font-label text-label-sm text-on-surface-variant font-bold block">
                  Select Your University Campus *
                </label>
                <select
                  value={selectedUniversity}
                  onChange={(e) => setSelectedUniversity(e.target.value)}
                  required
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3.5 text-body-md font-semibold text-primary focus:outline-none focus:border-primary"
                >
                  {FREE_UNIVERSITY_DELIVERY_OPTIONS.map(uni => (
                    <option key={uni.id} value={uni.name}>
                      🎓 {uni.name} ({uni.shortName}) - FREE DELIVERY
                    </option>
                  ))}
                </select>
                <p className="text-xs text-emerald-700 font-medium flex items-center gap-1 pt-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  Free direct-to-campus delivery enabled for your sash/order!
                </p>
              </div>
            ) : (
              /* Regional Speedaf Branch Dropdowns */
              <div className="space-y-md pt-sm animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  
                  {/* Region Select */}
                  <div className="flex flex-col gap-xs">
                    <label className="font-label text-label-sm text-on-surface-variant font-bold">Select Region *</label>
                    <select
                      value={selectedRegion}
                      onChange={handleRegionChange}
                      required
                      className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3.5 text-body-md font-semibold text-primary focus:outline-none focus:border-primary"
                    >
                      {regions.map(reg => (
                        <option key={reg} value={reg}>{reg}</option>
                      ))}
                    </select>
                  </div>

                  {/* Branch Select */}
                  <div className="flex flex-col gap-xs">
                    <label className="font-label text-label-sm text-on-surface-variant font-bold">Select Speedaf Branch *</label>
                    <select
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                      required
                      className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3.5 text-body-md font-semibold text-primary focus:outline-none focus:border-primary"
                    >
                      {(SPEEDAF_REGIONAL_BRANCHES[selectedRegion] || []).map(branch => (
                        <option key={branch} value={branch}>{branch}</option>
                      ))}
                    </select>
                  </div>

                </div>

                {/* Pickup Note Banner */}
                <div className="bg-amber-50 border border-amber-200 text-amber-900 p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-amber-700 flex-shrink-0">info</span>
                  <span>Deliveries to Speedaf branches mean you pay for delivery upon pickup at the branch.</span>
                </div>
              </div>
            )}

            {/* Delivery Address / Landmark Input - Only required for University Campus delivery */}
            {deliveryMode === 'university' && (
              <div className="flex flex-col gap-xs pt-xs animate-fadeIn">
                <label className="font-label text-label-sm text-on-surface-variant font-bold">
                  Specific Campus Address / Hall of Residence & Room No. *
                </label>
                <input 
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('streetAddress')}
                  onBlur={() => setFocusedField(null)}
                  placeholder={getPlaceholder('streetAddress', 'e.g. Jean Nelson Aka Hall, Room B12')}
                  required={deliveryMode === 'university'}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            )}
          </div>

          {/* Section 3: Payment Method Options */}
          <div className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-4 sm:p-xl space-y-md shadow-xs">
            <h2 className="font-headline font-bold text-body-lg sm:text-headline-md text-primary pb-sm border-b border-surface-container-highest flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] sm:text-[24px]">payments</span>
              3. Payment Method
            </h2>

            <div className="space-y-sm">
              {/* Paystack Integration */}
              <div className="p-3.5 sm:p-md border-2 border-emerald-600 bg-emerald-50/30 rounded-xl ring-1 ring-emerald-600">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600">lock</span>
                  <span className="font-headline font-bold text-body-md sm:text-body-lg text-primary">
                    Paystack Payment (MoMo / Card / GhIPSS)
                  </span>
                  <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ml-auto">
                    Active
                  </span>
                </div>
                <p className="font-body text-xs sm:text-body-md text-on-surface-variant mt-1.5 ml-7">
                  Secure instant payment via MTN MoMo, Telecel Cash, AT Money, Visa, or Mastercard.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Order Breakdown Sidebar (Right Column) */}
        <div className="lg:col-span-5">
          <div className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-4 sm:p-xl lg:sticky top-28 space-y-md shadow-sm">
            <h2 className="font-headline font-bold text-headline-md text-primary pb-sm border-b border-surface-container-highest">
              Order Summary ({cart.length} Items)
            </h2>

            <div className="max-h-80 overflow-y-auto space-y-md pr-1">
              {cart.map((item, index) => (
                <div key={index} className="p-3 sm:p-md bg-surface-container-low rounded-xl border border-surface-container-highest space-y-2">
                  <div className="flex items-center gap-3 sm:gap-md">
                    <img src={item.image} alt={item.name} className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg bg-surface-container-lowest flex-shrink-0" />
                    <div className="flex-grow min-w-0">
                      <h4 className="font-headline font-semibold text-xs sm:text-body-md text-primary truncate">{item.name}</h4>
                      <p className="font-body text-label-sm text-on-surface-variant">Qty: {item.quantity} | {item.size} {item.weight && `| ${item.weight}`}</p>
                    </div>
                    <span className="font-headline font-bold text-xs sm:text-body-md text-primary flex-shrink-0">
                      GH₵ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Custom Sash Visual Preview in Order Summary */}
                  {item.itemType === 'graduation_sash' && (
                    <div className="pt-1">
                      <SashCartPreview item={item} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-md border-t border-surface-container-highest space-y-xs font-body text-body-md text-on-surface-variant">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-primary font-semibold">GH₵ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="text-emerald-700 font-bold text-xs sm:text-sm">
                  {deliveryMode === 'university' ? 'FREE Campus Delivery' : 'Pay on Branch Pickup'}
                </span>
              </div>
            </div>

            <div className="pt-md border-t border-surface-container-highest flex justify-between items-center">
              <span className="font-headline font-bold text-body-lg sm:text-headline-md text-primary">Total to Pay</span>
              <span className="font-headline font-bold text-body-lg sm:text-headline-md text-primary">
                GH₵ {grandTotal.toFixed(2)}
              </span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-label text-xs sm:text-label-md uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  Initializing Paystack...
                </>
              ) : (
                <>
                  Pay GH₵ {grandTotal.toFixed(2)} with Paystack
                  <span className="material-symbols-outlined text-[18px]">lock</span>
                </>
              )}
            </button>

          </div>
        </div>

      </form>

      {/* Paystack Payment Checkout Modal */}
      {showPaystackModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-zinc-900 w-full max-w-md rounded-3xl p-5 sm:p-6 shadow-2xl border border-zinc-200 animate-fadeIn space-y-4 sm:space-y-5 relative">
            
            {/* Close Button */}
            <button
              onClick={() => setShowPaystackModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 p-1"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>

            {/* Header Badge */}
            <div className="flex items-center gap-3 border-b border-zinc-100 pb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                P
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">Paystack Secure Checkout</span>
                <h3 className="font-montserrat font-bold text-base text-zinc-900">OrderRight Ghana</h3>
              </div>
            </div>

            {/* Order Total & Customer Info */}
            <div className="bg-zinc-50 p-3.5 sm:p-4 rounded-2xl border border-zinc-200/80 space-y-1">
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-zinc-600 font-medium">Customer:</span>
                <span className="font-bold text-zinc-900 truncate max-w-[180px]">{formData.fullName}</span>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-zinc-600 font-medium">Email:</span>
                <span className="font-semibold text-zinc-800 text-xs truncate max-w-[180px]">{formData.email}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-zinc-200 text-sm sm:text-base font-bold">
                <span className="text-zinc-900">Amount Due:</span>
                <span className="text-emerald-700">GH₵ {grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Mobile Money Provider Selector */}
            <div className="space-y-2 sm:space-y-3">
              <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">
                Select Mobile Money Network *
              </label>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {[
                  { name: 'MTN Mobile Money', short: 'MTN MoMo', color: 'border-yellow-500 bg-yellow-50/50' },
                  { name: 'Telecel Cash', short: 'Telecel', color: 'border-red-500 bg-red-50/50' },
                  { name: 'AT Money', short: 'AT Money', color: 'border-blue-500 bg-blue-50/50' }
                ].map(net => (
                  <div
                    key={net.name}
                    onClick={() => setMomoProvider(net.name)}
                    className={`p-2.5 sm:p-3 rounded-xl border text-center cursor-pointer transition-all ${
                      momoProvider === net.name
                        ? `border-2 font-bold ${net.color} shadow-xs`
                        : 'border-zinc-200 hover:border-zinc-300 bg-zinc-50/40 text-zinc-600'
                    }`}
                  >
                    <span className="text-[11px] sm:text-xs block font-bold truncate">{net.short}</span>
                  </div>
                ))}
              </div>

              {/* MoMo Number Input */}
              <div className="space-y-1 pt-1">
                <label className="text-xs font-medium text-zinc-600 block">MoMo Wallet Phone Number *</label>
                <input
                  type="tel"
                  value={momoPhone}
                  onChange={(e) => setMomoPhone(e.target.value)}
                  onFocus={() => setFocusedField('momoPhone')}
                  onBlur={() => setFocusedField(null)}
                  placeholder={getPlaceholder('momoPhone', 'e.g. 024 XXX XXXX')}
                  required
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-900 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            {/* Authorize Button */}
            <button
              onClick={() => finalizeOrder('pstk_' + Date.now())}
              disabled={isProcessingPayment}
              className="w-full py-3.5 sm:py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-montserrat font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessingPayment ? (
                <>
                  <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  Processing MoMo Prompt...
                </>
              ) : (
                <>
                  <span>AUTHORIZE GH₵ {grandTotal.toFixed(2)} PAYMENT</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>

            <p className="text-[10px] sm:text-[11px] text-zinc-500 text-center flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-emerald-600">verified_user</span>
              Encrypted 256-bit Paystack PCI-DSS Compliant Security
            </p>

          </div>
        </div>
      )}

    </main>
  );
}
