import React, { useState } from 'react';
import { ShoppingBag, Eye, Star, Check, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <article
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col bg-white rounded-xl border border-stone-200/90 overflow-hidden hover:border-stone-400 hover:shadow-md transition-all duration-200 cursor-pointer text-left"
    >
      {/* Image Container with Zero-Broken-Image Policy */}
      <div className="relative aspect-4/3 sm:aspect-1/1 w-full bg-stone-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Subtle Single Text Tag (NO PILL BADGE SANDWICH) */}
        {product.isBestPrice && (
          <div className="absolute top-2.5 left-2.5 bg-stone-900/90 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-sm tracking-wide">
            Best Price
          </div>
        )}
        {!product.isBestPrice && product.isBestseller && (
          <div className="absolute top-2.5 left-2.5 bg-rose-900/90 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-sm tracking-wide">
            Top Seller
          </div>
        )}

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-0 bg-stone-950/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="px-3.5 py-1.5 bg-white/95 text-stone-900 rounded-lg text-xs font-semibold shadow-md hover:bg-white transition-all transform translate-y-2 group-hover:translate-y-0 duration-200 flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>

        {/* Discount tag top right */}
        {discountPercent > 0 && (
          <div className="absolute top-2.5 right-2.5 bg-amber-500/95 text-stone-950 font-bold text-[10px] px-1.5 py-0.5 rounded-xs tracking-tight">
            {discountPercent}% OFF
          </div>
        )}
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Freshness indicator as clean unboxed text */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
            <span className="capitalize">{product.category.replace('_', ' ')}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-700">{product.fragranceLevel}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-base sm:text-lg font-semibold text-stone-900 mt-1 line-clamp-1 group-hover:text-rose-900 transition-colors">
            {product.name}
          </h3>

          {/* Regional name if available */}
          {product.regionalName && (
            <p className="text-xs text-stone-500 mt-0.5 line-clamp-1 font-sans">
              {product.regionalName}
            </p>
          )}

          {/* Package Unit description */}
          <p className="text-xs text-stone-500 mt-1.5 line-clamp-1">
            {product.unit}
          </p>
        </div>

        {/* Pricing & Add to Cart button */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-stone-950 tabular-nums">
                ₹{product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-stone-400 line-through tabular-nums">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-stone-500">Taxes & packing incl.</span>
          </div>

          <button
            onClick={handleAdd}
            disabled={isAdding}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs whitespace-nowrap ${
              isAdding
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-900 hover:bg-stone-800 text-white'
            }`}
          >
            {isAdding ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>

      </div>
    </article>
  );
};
