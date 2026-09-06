import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../services/api';

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      const data = await fetchOrders();
      setOrders(data);
      setLoading(false);
    }
    loadOrders();
  }, []);

  return (
    <main className="pt-28 pb-2xl max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full min-h-screen">
      <div className="flex justify-between items-end mb-xl border-b border-surface-container-highest pb-lg">
        <div>
          <h1 className="font-display font-bold text-display-lg-mobile md:text-display-lg text-primary mb-xs">
            My Orders
          </h1>
          <p className="font-body text-body-md text-on-surface-variant">
            View order status, receipts, and live courier tracking.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-xl">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent" />
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-2xl text-center bg-surface-container-low rounded-2xl border border-surface-container-highest p-xl">
          <span className="material-symbols-outlined text-[64px] text-outline-variant mb-md">inventory_2</span>
          <h3 className="font-headline font-bold text-headline-md text-primary mb-xs">No Orders Placed Yet</h3>
          <p className="font-body text-body-md text-on-surface-variant mb-lg">
            When you place an order, your purchases and live delivery updates will appear here.
          </p>
          <Link
            to="/shop"
            className="bg-primary text-on-primary font-label text-label-md px-6 py-3 rounded-lg uppercase tracking-wider hover:bg-surface-tint"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-xl">
          {orders.map((ord) => (
            <div 
              key={ord.id}
              className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-xl shadow-xs space-y-md"
            >
              {/* Order Header Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-md border-b border-surface-container-highest gap-sm">
                <div>
                  <span className="font-label text-label-sm uppercase tracking-wider text-on-surface-variant">Order ID</span>
                  <h3 className="font-headline font-bold text-headline-md text-primary">{ord.id}</h3>
                  <span className="font-body text-label-sm text-on-surface-variant">Placed on {ord.date}</span>
                </div>
                
                <div className="flex items-center gap-md">
                  <span className={`px-3 py-1 rounded-full font-label text-label-sm uppercase font-bold ${
                    ord.status === 'Delivered' 
                      ? 'bg-surface-container-high text-primary' 
                      : 'bg-secondary-container text-on-secondary-container'
                  }`}>
                    {ord.status}
                  </span>
                  <Link
                    to={`/order-tracking?id=${ord.id}`}
                    className="px-4 py-2 bg-primary text-on-primary font-label text-label-sm uppercase tracking-wider rounded-lg hover:bg-surface-tint transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                    Track Package
                  </Link>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md pt-sm">
                {ord.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-md bg-surface p-md rounded-xl border border-surface-container">
                    <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-lg bg-surface-container-low" />
                    <div className="flex-grow">
                      <h4 className="font-headline font-semibold text-body-md text-primary">{item.name}</h4>
                      <p className="font-body text-label-sm text-on-surface-variant">
                        Size: {item.size} | Qty: {item.quantity}
                      </p>
                      <span className="font-headline font-bold text-body-md text-primary mt-1 block">
                        GH₵ {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer Total */}
              <div className="pt-md border-t border-surface-container-highest flex justify-between items-center text-body-md font-body">
                <span className="text-on-surface-variant">
                  Payment: <strong className="text-primary font-semibold">{ord.paymentMethod}</strong>
                </span>
                <div>
                  <span className="text-on-surface-variant mr-2">Total Amount:</span>
                  <span className="font-headline font-bold text-headline-md text-primary">
                    GH₵ {ord.total.toFixed(2)}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </main>
  );
}
