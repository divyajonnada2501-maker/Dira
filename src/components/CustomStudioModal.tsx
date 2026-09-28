import React, { useState } from 'react';
import { X, Sparkles, Check, HeartHandshake, Gift, Flower2, Sliders } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { DHANDA_IMAGE, BOUQUET_IMAGE } from '../data/products';

interface CustomStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomStudioModal: React.FC<CustomStudioModalProps> = ({ isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [creationType, setCreationType] = useState<'dhanda' | 'bouquet'>('dhanda');

  // Dhanda configuration state
  const [dhandaFlower, setDhandaFlower] = useState('Madurai Jasmine & Red Rose');
  const [dhandaAccent, setDhandaAccent] = useState('Golden Zari Tassels');
  const [dhandaLength, setDhandaLength] = useState('4.5 ft (Pair for Couple)');
  const [dhandaPattern, setDhandaPattern] = useState('Traditional Dense Spiral');

  // Bouquet configuration state
  const [bouquetTheme, setBouquetTheme] = useState('Pastel Garden Romance (Roses & Peonies)');
  const [bouquetSize, setBouquetSize] = useState('Standard (18 Stems)');
  const [bouquetWrap, setBouquetWrap] = useState('Artisanal Matte Kraft Paper & Silk Ribbon');

  const [specialNote, setSpecialNote] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  // Calculate pricing based on selections
  let calculatedPrice = 0;
  if (creationType === 'dhanda') {
    let base = 499;
    if (dhandaLength.includes('6 ft')) base += 350;
    if (dhandaLength.includes('3 ft')) base -= 150;
    if (dhandaFlower.includes('Lotus')) base += 150;
    if (dhandaAccent.includes('Gold')) base += 80;
    calculatedPrice = base;
  } else {
    let base = 449;
    if (bouquetSize.includes('28 Stems')) base += 350;
    if (bouquetSize.includes('10 Stems')) base -= 150;
    if (bouquetTheme.includes('Orchid')) base += 120;
    calculatedPrice = base;
  }

  const handleAddCustomToCart = () => {
    const customProduct: Product = {
      id: `custom-${Date.now()}`,
      name:
        creationType === 'dhanda'
          ? `Custom Artisan Dhanda (${dhandaLength})`
          : `Custom Artisan Bouquet (${bouquetSize})`,
      category: creationType === 'dhanda' ? 'dhandalu' : 'bouquets',
      price: calculatedPrice,
      originalPrice: Math.round(calculatedPrice * 1.35),
      rating: 5.0,
      reviewCount: 1,
      unit:
        creationType === 'dhanda'
          ? `Custom Hand-woven garland (${dhandaLength})`
          : `Custom Bouquet (${bouquetSize})`,
      image: creationType === 'dhanda' ? DHANDA_IMAGE : BOUQUET_IMAGE,
      description:
        creationType === 'dhanda'
          ? `Custom designed floral dhanda with ${dhandaFlower}, accented with ${dhandaAccent}, pattern: ${dhandaPattern}.`
          : `Custom designed bouquet themed around ${bouquetTheme}, wrapped in ${bouquetWrap}.`,
      flowerTypes: [
        creationType === 'dhanda' ? dhandaFlower : bouquetTheme,
        creationType === 'dhanda' ? dhandaAccent : bouquetWrap,
      ],
      fragranceLevel: 'High Fragrance',
      freshnessTime: 'Hand-crafted to order for your delivery slot',
      tags: ['Custom Creation', 'Handcrafted', 'Direct Price'],
      customizable: true,
    };

    addToCart(customProduct, 1, {
      length: creationType === 'dhanda' ? dhandaLength : bouquetSize,
      flowerMix: `${dhandaFlower} + ${dhandaAccent}`,
      ribbonColor: bouquetWrap,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="bg-stone-900 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 text-amber-300 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight">
                Dira Custom Flower Studio
              </h2>
              <p className="text-xs text-stone-300">
                Design your personalized wedding dhanda or bespoke gift bouquet
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Type Selector Tabs */}
        <div className="grid grid-cols-2 p-3 bg-stone-100 border-b border-stone-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setCreationType('dhanda')}
            className={`py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              creationType === 'dhanda'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <HeartHandshake className="w-4 h-4 text-rose-700" />
            <span>Custom Flower Dhanda (Garland)</span>
          </button>

          <button
            type="button"
            onClick={() => setCreationType('bouquet')}
            className={`py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              creationType === 'bouquet'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Gift className="w-4 h-4 text-rose-700" />
            <span>Custom Fresh Bouquet</span>
          </button>
        </div>

        {/* Configuration Body */}
        <div className="p-6 text-left space-y-5 max-h-[68vh] overflow-y-auto">
          
          {creationType === 'dhanda' ? (
            <>
              {/* Flower Combination */}
              <div>
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
                  1. Select Primary Flower Combination
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Madurai Jasmine & Red Rose',
                    'Golden Marigold & Tuberose (Sampangi)',
                    'Twin Sacred Lotus & Mallepoolu',
                    'Pastel Spray Roses & Baby’s Breath',
                    'Chamanthi & Yellow Banthi Blooms',
                  ].map((mix) => (
                    <button
                      key={mix}
                      type="button"
                      onClick={() => setDhandaFlower(mix)}
                      className={`p-3 text-left rounded-lg border text-xs transition-all cursor-pointer ${
                        dhandaFlower === mix
                          ? 'border-rose-900 bg-rose-50/70 font-semibold text-rose-950 ring-1 ring-rose-900'
                          : 'border-stone-200 hover:border-stone-400 bg-stone-50 text-stone-700'
                      }`}
                    >
                      {mix}
                    </button>
                  ))}
                </div>
              </div>

              {/* Length Selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
                  2. Choose Garland Length
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    '3 ft (Pooja / Deity)',
                    '4.5 ft (Pair for Couple)',
                    '6 ft (Grand Varmala)',
                  ].map((len) => (
                    <button
                      key={len}
                      type="button"
                      onClick={() => setDhandaLength(len)}
                      className={`p-2.5 text-center rounded-lg border text-xs transition-all cursor-pointer ${
                        dhandaLength === len
                          ? 'border-stone-900 bg-stone-900 text-white font-medium shadow-xs'
                          : 'border-stone-200 hover:border-stone-400 bg-white text-stone-700'
                      }`}
                    >
                      {len}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weaving Style & Accents */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
                    3. Weaving Style
                  </label>
                  <select
                    value={dhandaPattern}
                    onChange={(e) => setDhandaPattern(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white text-stone-800 focus:border-stone-800 outline-none"
                  >
                    <option>Traditional Dense Spiral</option>
                    <option>Alternating Color Rings</option>
                    <option>Feather-Light Muhurtham Style</option>
                    <option>Royal Tiered Layering</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
                    4. Decorative Accent
                  </label>
                  <select
                    value={dhandaAccent}
                    onChange={(e) => setDhandaAccent(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white text-stone-800 focus:border-stone-800 outline-none"
                  >
                    <option>Golden Zari Tassels</option>
                    <option>Silver Foil Ribbons</option>
                    <option>Fresh Tulasi & Mango Leaf Tips</option>
                    <option>Natural Cotton Velvet Cords</option>
                  </select>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Bouquet Themes */}
              <div>
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
                  1. Select Floral Theme & Mood
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Pastel Garden Romance (Roses & Peonies)',
                    'Classic 24 Passion Red Dutch Roses',
                    'Vibrant Sunshine (Sunflowers & Lilies)',
                    'Exotic Purple Orchids & White Hydrangea',
                    'Rainbow Daisy & Carnation Cheer',
                  ].map((theme) => (
                    <button
                      key={theme}
                      type="button"
                      onClick={() => setBouquetTheme(theme)}
                      className={`p-3 text-left rounded-lg border text-xs transition-all cursor-pointer ${
                        bouquetTheme === theme
                          ? 'border-rose-900 bg-rose-50/70 font-semibold text-rose-950 ring-1 ring-rose-900'
                          : 'border-stone-200 hover:border-stone-400 bg-stone-50 text-stone-700'
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bouquet Stem Count */}
              <div>
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
                  2. Bouquet Size (Stem Count)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    'Petite (10 Stems)',
                    'Standard (18 Stems)',
                    'Grand Deluxe (28 Stems)',
                  ].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setBouquetSize(size)}
                      className={`p-2.5 text-center rounded-lg border text-xs transition-all cursor-pointer ${
                        bouquetSize === size
                          ? 'border-stone-900 bg-stone-900 text-white font-medium shadow-xs'
                          : 'border-stone-200 hover:border-stone-400 bg-white text-stone-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wrap Style */}
              <div>
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
                  3. Wrapping & Presentation
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Artisanal Matte Kraft Paper & Silk Ribbon',
                    'Luxury Midnight Black & Champagne Gold Trim',
                    'Frosted Translucent Korean Style Wrap',
                    'Eco-Friendly Burlap Jute & Raffia String',
                  ].map((wrap) => (
                    <button
                      key={wrap}
                      type="button"
                      onClick={() => setBouquetWrap(wrap)}
                      className={`p-2.5 text-left rounded-lg border text-xs transition-all cursor-pointer ${
                        bouquetWrap === wrap
                          ? 'border-stone-900 bg-stone-900 text-white font-medium shadow-xs'
                          : 'border-stone-200 hover:border-stone-400 bg-white text-stone-700'
                      }`}
                    >
                      {wrap}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Custom Note or Occasion Date */}
          <div>
            <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5">
              Special Artisan Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Wedding muhurtham at 7:30 AM / include extra sweet jasmine fragrance / card text"
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:border-stone-800 outline-none"
            />
          </div>

        </div>

        {/* Footer Pricing & CTA */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <div className="text-left">
            <span className="text-[11px] text-stone-500 uppercase tracking-wider block">
              Direct Workshop Price
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-stone-950 tabular-nums">
                ₹{calculatedPrice}
              </span>
              <span className="text-xs text-stone-400 line-through tabular-nums">
                ₹{Math.round(calculatedPrice * 1.35)}
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                Farm Direct Guarantee
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddCustomToCart}
            disabled={isSuccess}
            className={`py-3 px-6 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
              isSuccess
                ? 'bg-emerald-700 text-white'
                : 'bg-rose-900 hover:bg-rose-950 text-white'
            }`}
          >
            {isSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Custom Order Added!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Add Custom Creation</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
