import React, { useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Clock, MapPin, Sparkles, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenCustomStudio?: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenCustomStudio,
}) => {
  const { addToCart } = useCart();
  const { currentLocation } = useLocation();

  const [quantity, setQuantity] = useState(1);
  const [selectedLength, setSelectedLength] = useState('4.5 ft (Standard)');
  const [giftNote, setGiftNote] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity, {
      length: product.category === 'dhandalu' ? selectedLength : undefined,
      flowerMix: product.flowerTypes.join(', '),
      ribbonColor: 'Champagne Gold',
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 800);
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-stone-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950 shadow-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Image & Freshness Badge */}
          <div className="relative bg-stone-100 min-h-[300px] md:min-h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-3 left-3 right-3 bg-stone-950/80 backdrop-blur-md text-white p-3 rounded-lg text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{product.freshnessTime}</span>
              </div>
              <p className="text-stone-300 text-[11px]">
                Packed with moisture-lock hydra-pads for 100% dewy freshness upon delivery.
              </p>
            </div>
          </div>

          {/* Product Details & Actions */}
          <div className="p-6 md:p-8 flex flex-col justify-between text-left space-y-5">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="uppercase tracking-wider font-semibold text-rose-900">
                  {product.category.replace('_', ' ')}
                </span>
                <div className="flex items-center gap-1 text-stone-700">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-stone-400">({product.reviewCount} verified reviews)</span>
                </div>
              </div>

              {/* Title & Regional Name */}
              <h2 className="font-serif text-2xl font-bold text-stone-900 mt-2">
                {product.name}
              </h2>
              {product.regionalName && (
                <p className="text-xs text-stone-500 mt-0.5 font-medium">
                  {product.regionalName}
                </p>
              )}

              {/* Price Row */}
              <div className="mt-3 flex items-baseline gap-2.5">
                <span className="text-2xl font-bold text-stone-950 tabular-nums">
                  ₹{product.price}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-sm text-stone-400 line-through tabular-nums">
                      ₹{product.originalPrice}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Save {discountPercent}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-stone-500 mt-1">Package: {product.unit}</p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Flower Ingredients list */}
              <div className="mt-4 pt-3 border-t border-stone-100">
                <span className="text-xs font-semibold text-stone-700">Flower Composition:</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {product.flowerTypes.map((flower, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-stone-100 text-stone-700 px-2.5 py-1 rounded-md"
                    >
                      {flower}
                    </span>
                  ))}
                </div>
              </div>

              {/* Custom Garland Length Selector if Dhandalu */}
              {product.category === 'dhandalu' && (
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Garland Length (Dhanda Size):
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['3.5 ft (Pooja)', '4.5 ft (Standard)', '6 ft (Grand Varmala)'].map((len) => (
                      <button
                        key={len}
                        type="button"
                        onClick={() => setSelectedLength(len)}
                        className={`text-xs py-1.5 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                          selectedLength === len
                            ? 'border-stone-900 bg-stone-900 text-white font-medium shadow-xs'
                            : 'border-stone-200 text-stone-700 hover:border-stone-400 bg-stone-50'
                        }`}
                      >
                        {len}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Free Gift Card Note */}
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Add a free personalized gift message note (Optional)"
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-200 rounded-lg focus:border-stone-800 outline-none"
                />
              </div>

              {/* Delivery info pill */}
              <div className="mt-3 p-2.5 bg-stone-50 rounded-lg flex items-center justify-between text-xs text-stone-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-700" />
                  <span>Delivering to <strong>{currentLocation.area}</strong></span>
                </div>
                <span className="text-emerald-700 font-medium">
                  {currentLocation.deliveryTimeEstimate}
                </span>
              </div>
            </div>

            {/* Stepper & Add to Cart button */}
            <div className="pt-4 border-t border-stone-200 flex items-center gap-3">
              <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-stone-600 hover:text-stone-900 font-bold text-sm cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 text-xs font-semibold text-stone-900 tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-stone-600 hover:text-stone-900 font-bold text-sm cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-1 py-3 px-5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                  isAdded
                    ? 'bg-emerald-700 text-white'
                    : 'bg-rose-900 hover:bg-rose-950 text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Basket!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Basket (₹{product.price * quantity})</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
