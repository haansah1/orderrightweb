import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { fetchOrderById } from '../services/api';

export default function OrderTrackingPage() {
  const [searchParams] = useSearchParams();
  const orderIdQuery = searchParams.get('id') || 'ORD-98421';

  const [orderId, setOrderId] = useState(orderIdQuery);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadOrder() {
      if (!orderIdQuery) return;
      setLoading(true);
      setError('');
      const data = await fetchOrderById(orderIdQuery);
      if (data) {
        setOrder(data);
      } else {
        setError(`No order found matching "${orderIdQuery}"`);
      }
      setLoading(false);
    }
    loadOrder();
  }, [orderIdQuery]);

  const handleSearchOrder = (e) => {
    e.preventDefault();
    if (orderId.trim()) {
      window.location.href = `/order-tracking?id=${encodeURIComponent(orderId.trim())}`;
    }
  };

  return (
    <main className="pt-28 pb-2xl max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full min-h-screen">
      <div className="max-w-3xl mx-auto space-y-xl">
        
        {/* Title */}
        <div className="text-center space-y-xs">
          <h1 className="font-display font-bold text-display-lg-mobile md:text-display-lg text-primary">Track Your Order</h1>
          <p className="font-body text-body-md text-on-surface-variant">Enter your order ID to see real-time delivery status.</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchOrder} className="flex gap-2 max-w-md mx-auto">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter Order ID (e.g. ORD-98421)"
            className="flex-grow bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary uppercase"
          />
          <button
            type="submit"
            className="bg-primary text-on-primary font-label text-label-md px-6 py-3 rounded-lg uppercase tracking-wider hover:bg-surface-tint transition-colors"
          >
            Track
          </button>
        </form>

        {loading ? (
          <div className="flex justify-center py-xl">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent" />
          </div>
        ) : error ? (
          <div className="bg-error-container text-on-error-container p-lg rounded-2xl text-center font-body text-body-md">
            {error}
          </div>
        ) : order ? (
          <div className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-xl shadow-lg space-y-xl">
            
            {/* Order Meta Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-lg border-b border-surface-container-highest gap-sm">
              <div>
                <span className="font-label text-label-sm uppercase tracking-wider text-on-surface-variant">Order Number</span>
                <h2 className="font-headline font-bold text-headline-md text-primary">{order.id}</h2>
              </div>
              <div className="flex items-center gap-sm">
                <span className="px-3 py-1 bg-secondary-container text-on-secondary-container font-label text-label-sm uppercase rounded-full font-bold">
                  {order.status || 'In Transit'}
                </span>
                <span className="font-body text-body-md text-on-surface-variant">
                  Est. Delivery: <strong>{order.tracking?.estimatedDelivery || 'Tomorrow'}</strong>
                </span>
              </div>
            </div>

            {/* Courier Info Bar */}
            <div className="bg-surface-container-low p-md rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md">
              <div className="flex items-center gap-md">
                <span className="material-symbols-outlined text-[32px] text-secondary">local_shipping</span>
                <div>
                  <h4 className="font-headline font-bold text-body-lg text-primary">{order.tracking?.carrier || 'OrderRight Express Courier'}</h4>
                  <p className="font-body text-label-sm text-on-surface-variant">Waybill Code: {order.tracking?.trackingNumber || 'GH-84920-ACC'}</p>
                </div>
              </div>
              <a
                href="tel:+233241234567"
                className="bg-surface border border-outline-variant px-4 py-2 rounded-lg font-label text-label-sm uppercase text-primary hover:bg-surface-container-high transition-colors inline-flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                Call Courier Driver
              </a>
            </div>

            {/* Timeline Progress */}
            <div className="py-md">
              <h3 className="font-headline font-bold text-headline-md text-primary mb-xl">Tracking Progress</h3>
              
              <div className="relative pl-6 space-y-xl border-l-2 border-surface-container-highest">
                {(order.tracking?.steps || [
                  { title: "Order Placed", description: "Order confirmed and sent to fulfillment", completed: true, timestamp: "2026-08-28 09:30 AM" },
                  { title: "Quality Check & Packaged", description: "Item verified & prepared at Accra Hub", completed: true, timestamp: "2026-08-28 02:15 PM" },
                  { title: "In Transit", description: "Package dispatched with courier driver", completed: true, timestamp: "2026-08-29 08:00 AM" },
                  { title: "Delivered", description: "Handed over to customer", completed: false, timestamp: "Pending" }
                ]).map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-md">
                    
                    {/* Circle Node */}
                    <div className={`absolute -left-[31px] top-1 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                      step.completed 
                        ? 'bg-primary border-primary text-white shadow-sm' 
                        : 'bg-surface border-outline-variant text-transparent'
                    }`}>
                      {step.completed && <span className="material-symbols-outlined text-[14px]">check</span>}
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-center">
                        <h4 className={`font-headline font-bold text-body-lg ${step.completed ? 'text-primary' : 'text-on-surface-variant'}`}>
                          {step.title}
                        </h4>
                        <span className="font-label text-label-sm text-on-surface-variant">{step.timestamp}</span>
                      </div>
                      <p className="font-body text-body-md text-on-surface-variant mt-1">
                        {step.description}
                      </p>
                    </div>

                  </div>
                ))}
              </div>

            </div>

            {/* Back to Orders */}
            <div className="pt-md border-t border-surface-container-highest flex justify-between items-center">
              <Link to="/orders" className="font-label text-label-md uppercase text-primary hover:underline flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                View All My Orders
              </Link>
            </div>

          </div>
        ) : null}

      </div>
    </main>
  );
}
