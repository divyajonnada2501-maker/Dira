import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, MapPin, Calendar, Clock, ArrowRight, ShieldCheck, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';
import { OrderDetails } from '../types';

interface CartDrawerProps {
  onOpenLocationModal: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenLocationModal }) => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    subtotal,
    deliveryFee,
    totalPrice,
    setLastOrder,
  } = useCart();

  const { currentLocation } = useLocation();

  // Checkout inputs
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [addressDetails, setAddressDetails] = useState(currentLocation.address || '');
  const [deliveryDate, setDeliveryDate] = useState('Today (Immediate Fresh Delivery)');
  const [deliverySlot, setDeliverySlot] = useState('⚡ Express 90-Min Slot');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi'>('cod');
  const [greetingMsg, setGreetingMsg] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 499;
  const amountNeededForFree = Math.max(0, freeDeliveryThreshold - subtotal);

  const handlePlaceOrder = (isWhatsApp = false) => {
    if (items.length === 0) return;

    if (!customerName.trim() || !customerPhone.trim()) {
      setFormError('Please enter your Name and Mobile Number for order tracking.');
      return;
    }

    if (customerPhone.replace(/\D/g, '').length < 10) {
      setFormError('Please enter a valid 10-digit phone number.');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    const orderId = `DIRA-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: OrderDetails = {
      orderId,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      deliveryLocation: {
        ...currentLocation,
        address: addressDetails.trim() || `${currentLocation.area}, ${currentLocation.city}`,
      },
      deliveryDate,
      deliverySlot,
      items: [...items],
      subtotal,
      deliveryFee,
      total: totalPrice,
      paymentMethod,
      greetingCardMessage: greetingMsg,
      orderTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    if (isWhatsApp) {
      // Build WhatsApp message
      const itemsList = items
        .map((i) => `• ${i.product.name} (x${i.quantity}) - ₹${i.product.price * i.quantity}`)
        .join('%0A');
      const waText = `🌸 *New Order on Dira Flowers* 🌸%0A%0A*Order ID:* ${orderId}%0A*Customer:* ${customerName}%0A*Phone:* ${customerPhone}%0A*Delivery To:* ${addressDetails || currentLocation.area}, ${currentLocation.city} - ${currentLocation.pincode}%0A*Slot:* ${deliveryDate} | ${deliverySlot}%0A%0A*Items:*%0A${itemsList}%0A%0A*Subtotal:* ₹${subtotal}%0A*Delivery:* ${deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}%0A*Total Payable:* ₹${totalPrice}%0A*Payment:* ${paymentMethod.toUpperCase()}%0A%0APlease confirm my fresh floral delivery!`;
      
      const waUrl = `https://wa.me/919876543210?text=${waText}`;
      window.open(waUrl, '_blank');
    }

    setTimeout(() => {
      setLastOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
      setIsCartOpen(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200 text-left">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF9F5]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-100 text-rose-900 rounded-lg">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-stone-900">
                Your Fresh Floral Basket
              </h2>
              <p className="text-xs text-stone-500">
                {items.length} {items.length === 1 ? 'item' : 'items'} ready for harvest
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="px-4 py-2.5 bg-amber-50 border-b border-amber-200/60 text-xs text-stone-700">
          {amountNeededForFree > 0 ? (
            <p>
              Add <strong className="text-amber-950 font-bold">₹{amountNeededForFree}</strong> more
              for <span className="text-emerald-700 font-semibold">FREE Express Delivery</span>!
            </p>
          ) : (
            <p className="text-emerald-800 font-medium flex items-center gap-1.5">
              <span>🎉 Congratulations! You have unlocked </span>
              <strong className="underline">FREE Express Delivery</strong>.
            </p>
          )}
        </div>

        {/* Delivery Location Quick Indicator */}
        <div className="px-4 py-2 bg-stone-50 border-b border-stone-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-stone-700 truncate">
            <MapPin className="w-3.5 h-3.5 text-rose-700 shrink-0" />
            <span className="truncate">
              Deliver to: <strong>{currentLocation.area}</strong> ({currentLocation.pincode})
            </span>
          </div>
          <button
            onClick={onOpenLocationModal}
            className="text-rose-800 font-medium hover:underline shrink-0 ml-2 cursor-pointer"
          >
            Change
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-stone-400">
              <ShoppingBag className="w-12 h-12 text-stone-300 stroke-[1.5]" />
              <p className="text-sm font-medium text-stone-600">Your basket is currently empty.</p>
              <p className="text-xs text-stone-400 max-w-xs">
                Explore our farm fresh dhandalu, natural loose blooms, and celebration bouquets!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800"
              >
                Start Browsing
              </button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={`${item.product.id}-${idx}`}
                className="p-3 bg-stone-50 rounded-xl border border-stone-200/90 flex gap-3 text-left"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-18 h-18 rounded-lg object-cover bg-stone-200 shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-stone-400 hover:text-rose-700 transition-colors p-0.5 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.customDetails?.length && (
                      <span className="text-[10px] text-stone-500 block">
                        Size: {item.customDetails.length}
                      </span>
                    )}

                    <div className="text-xs font-bold text-stone-900 mt-1 tabular-nums">
                      ₹{item.product.price * item.quantity}
                      <span className="text-[10px] text-stone-400 font-normal ml-1">
                        (₹{item.product.price} each)
                      </span>
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-200/60">
                    <span className="text-[11px] text-stone-500">Qty:</span>
                    <div className="flex items-center border border-stone-300 rounded bg-white">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-stone-600 hover:text-stone-900 font-bold text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold text-stone-900 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-stone-600 hover:text-stone-900 font-bold text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Checkout Info Form (Visible when items > 0) */}
          {items.length > 0 && (
            <div className="pt-3 border-t border-stone-200 space-y-3">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                Delivery Details
              </span>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-stone-600 mb-1">Your Name *</label>
                  <input
                    type="text"
                    placeholder="Recipient / Customer"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs px-2.5 py-2 border border-stone-300 rounded-lg outline-none focus:border-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-600 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full text-xs px-2.5 py-2 border border-stone-300 rounded-lg outline-none focus:border-stone-800 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-stone-600 mb-1">
                  Delivery Address / House / Flat
                </label>
                <input
                  type="text"
                  placeholder="e.g. Flat 204, Green Meadows, Banjara Hills"
                  value={addressDetails}
                  onChange={(e) => setAddressDetails(e.target.value)}
                  className="w-full text-xs px-2.5 py-2 border border-stone-300 rounded-lg outline-none focus:border-stone-800"
                />
              </div>

              {/* Delivery Date & Slot Selector */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-stone-600 mb-1">Delivery Day</label>
                  <select
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full text-xs px-2 py-2 border border-stone-300 rounded-lg outline-none focus:border-stone-800 bg-white"
                  >
                    <option>Today (Immediate Harvest)</option>
                    <option>Tomorrow Morning</option>
                    <option>Weekend Muhurtham / Event</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-stone-600 mb-1">Delivery Slot</label>
                  <select
                    value={deliverySlot}
                    onChange={(e) => setDeliverySlot(e.target.value)}
                    className="w-full text-xs px-2 py-2 border border-stone-300 rounded-lg outline-none focus:border-stone-800 bg-white"
                  >
                    <option>⚡ Express 90-Min Slot</option>
                    <option>🌅 Early Morning Pooja (6-8:30 AM)</option>
                    <option>🌇 Evening Celebrations (5-8 PM)</option>
                  </select>
                </div>
              </div>

              {/* Free Card Message */}
              <div>
                <input
                  type="text"
                  placeholder="Include a message for the gift card (Optional)"
                  value={greetingMsg}
                  onChange={(e) => setGreetingMsg(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 border border-stone-200 rounded-lg outline-none focus:border-stone-800"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-[11px] text-stone-600 mb-1.5">Payment Option</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-2 px-3 rounded-lg border text-center font-medium cursor-pointer transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-300 bg-white text-stone-700'
                    }`}
                  >
                    Cash on Delivery (COD)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-2 px-3 rounded-lg border text-center font-medium cursor-pointer transition-colors ${
                      paymentMethod === 'upi'
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-300 bg-white text-stone-700'
                    }`}
                  >
                    UPI / QR at Doorstep
                  </button>
                </div>
              </div>

              {formError && (
                <p className="text-xs text-rose-600 bg-rose-50 p-2 rounded">{formError}</p>
              )}
            </div>
          )}
        </div>

        {/* Footer Billing & Actions */}
        {items.length > 0 && (
          <div className="p-4 bg-stone-50 border-t border-stone-200 space-y-3">
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-stone-900 tabular-nums">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Doorstep Express Delivery</span>
                <span className="font-semibold tabular-nums">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-950 pt-1.5 border-t border-stone-200">
                <span>Total Amount</span>
                <span className="text-base tabular-nums">₹{totalPrice}</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handlePlaceOrder(false)}
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-rose-900 hover:bg-rose-950 text-white font-semibold text-sm rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm Order (Pay ₹{totalPrice} via {paymentMethod.toUpperCase()})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handlePlaceOrder(true)}
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant Order via WhatsApp</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-stone-400">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
              <span>100% Farm Fresh Guarantee · Verified Florist Packaging</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
