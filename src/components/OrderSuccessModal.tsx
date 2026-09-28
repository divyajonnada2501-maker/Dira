import React from 'react';
import { CheckCircle2, Clock, MapPin, Phone, MessageCircle, X, Sparkles, PackageCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const OrderSuccessModal: React.FC = () => {
  const { lastOrder, setLastOrder } = useCart();

  if (!lastOrder) return null;

  const handleClose = () => {
    setLastOrder(null);
  };

  const handleWhatsAppHelp = () => {
    const text = `Hi Dira Flowers, I recently placed order #${lastOrder.orderId}. Can you please provide an update on the fresh delivery?`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-150 text-left">
        
        {/* Success Header */}
        <div className="bg-emerald-800 text-white p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 text-emerald-200 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 backdrop-blur-xs rounded-full">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-widest font-semibold text-emerald-200">
                Order Confirmed
              </span>
              <h2 className="font-serif text-2xl font-bold tracking-tight">
                Thank you, {lastOrder.customerName}!
              </h2>
            </div>
          </div>
          <p className="text-xs text-emerald-100 mt-2">
            Your floral order <strong className="text-white font-mono">{lastOrder.orderId}</strong> is received. Our florists are preparing fresh stems.
          </p>
        </div>

        {/* Order Details Body */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          
          {/* Status Tracker */}
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/90 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-700" />
                Delivery Slot
              </span>
              <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                {lastOrder.deliverySlot}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-600">
              <MapPin className="w-3.5 h-3.5 text-rose-700 shrink-0" />
              <span className="truncate">
                {lastOrder.deliveryLocation.address}, {lastOrder.deliveryLocation.city} ({lastOrder.deliveryLocation.pincode})
              </span>
            </div>
          </div>

          {/* Ordered Items summary */}
          <div>
            <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
              Item Summary
            </h4>
            <div className="space-y-2">
              {lastOrder.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs py-1.5 border-b border-stone-100"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-stone-800">
                      {item.quantity}x
                    </span>
                    <span className="text-stone-700">{item.product.name}</span>
                  </div>
                  <span className="font-semibold text-stone-900 tabular-nums">
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total Payable */}
          <div className="pt-2 border-t border-stone-200 space-y-1 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal:</span>
              <span className="tabular-nums">₹{lastOrder.subtotal}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Express Delivery:</span>
              <span>{lastOrder.deliveryFee === 0 ? 'FREE' : `₹${lastOrder.deliveryFee}`}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-stone-950 pt-1">
              <span>Total ({lastOrder.paymentMethod.toUpperCase()}):</span>
              <span className="tabular-nums text-base">₹{lastOrder.total}</span>
            </div>
          </div>

          {/* Guarantee Note */}
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-950 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>100% Freshness Guarantee:</strong> Flowers are dispatched with moisture pads in insulated boxes. If you notice any wilting, our rider will replace them on the spot!
            </div>
          </div>

        </div>

        {/* Footer CTAs */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleWhatsAppHelp}
            className="flex-1 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Track on WhatsApp</span>
          </button>

          <button
            onClick={handleClose}
            className="flex-1 py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
};
