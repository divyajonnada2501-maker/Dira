import React, { useState } from 'react';
import { MapPin, ArrowRight, Sparkles, Check, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';
import { useLocation } from '../context/LocationContext';

interface HeroProps {
  onExploreClick: () => void;
  onOpenCustomStudio: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenCustomStudio }) => {
  const { currentLocation, checkPincode, updateLocation } = useLocation();
  const [pinInput, setPinInput] = useState('');
  const [checkedStatus, setCheckedStatus] = useState<string | null>(null);

  const handleCheckDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) return;
    const loc = checkPincode(pinInput);
    updateLocation(loc);
    setCheckedStatus(`Delivering to ${loc.area} · Express in ${loc.deliveryTimeEstimate}`);
    setTimeout(() => setCheckedStatus(null), 5000);
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Editorial & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 text-xs font-medium text-rose-900 bg-rose-50 border border-rose-200/80 px-3 py-1 rounded-md">
              <Sparkles className="w-3.5 h-3.5 text-rose-700" />
              <span>Direct Flower Farm Harvest · 30-40% Lower Than Market Prices</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-stone-900 leading-[1.12] text-balance">
              Lush Fresh Blooms, Sacred Dhandalu & Classy Bouquets
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
              From fragrant Madurai jasmine strings and sacred temple marigolds to grand wedding 
              varmalas and French-style pastel bouquets. Plucked at dawn and crafted with love.
            </p>

            {/* Quick Delivery Pincode Checker */}
            <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-stone-200 shadow-xs max-w-xl">
              <div className="flex items-center justify-between text-xs text-stone-600 mb-2">
                <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-700" />
                  Check Delivery in Your Area
                </span>
                <span className="text-stone-500">
                  Current: <strong className="text-stone-800">{currentLocation.area}</strong> ({currentLocation.pincode})
                </span>
              </div>

              <form onSubmit={handleCheckDelivery} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Enter 6-digit Pincode (e.g. 500081, 560038)"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:border-stone-800 focus:ring-1 focus:ring-stone-800 text-sm outline-none transition-all placeholder:text-stone-400 font-mono"
                    maxLength={6}
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-xs"
                >
                  Verify Area
                </button>
              </form>

              {checkedStatus && (
                <div className="mt-2 text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded flex items-center gap-1.5 animate-in fade-in duration-150">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{checkedStatus}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3 bg-rose-900 hover:bg-rose-950 text-white font-medium text-sm rounded-lg transition-colors inline-flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Browse Collections</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCustomStudio}
                className="px-6 py-3 bg-white hover:bg-stone-50 text-stone-900 font-medium text-sm rounded-lg border border-stone-300 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <HeartHandshake className="w-4 h-4 text-amber-700" />
                <span>Custom Garland Builder</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200/80 text-left">
              <div>
                <div className="text-xs font-bold text-stone-900 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-rose-700" />
                  90-Min Express
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">Morning & evening slots</div>
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-700" />
                  Lowest Prices
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">From ₹89 · Farm direct</div>
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-rose-700" />
                  Dewy Freshness
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">100% natural flowers</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 border border-stone-200/60 bg-stone-100">
              <img
                src={HERO_IMAGE}
                alt="Dira Flowers floral showroom with colorful fresh bouquets and traditional garlands"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent pointer-events-none" />

              {/* Floating Highlight Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-stone-200 text-stone-900 text-left shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-rose-800">
                      Signature Creation
                    </span>
                    <h2 className="font-serif text-base font-semibold text-stone-900">
                      Traditional Wedding Dhandalu & Varmala
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-400 line-through">₹1,599</span>
                    <div className="text-base font-bold text-stone-900 tabular-nums">₹999</div>
                  </div>
                </div>
                <p className="text-[11px] text-stone-600 mt-1 line-clamp-1">
                  Velvet Dutch crimson rose petals hand-woven with sweet Madurai jasmine buds.
                </p>
              </div>
            </div>

            {/* Decorative organic stamp */}
            <div className="hidden sm:flex absolute -top-4 -right-4 bg-amber-100 border border-amber-300 text-amber-950 px-3 py-1.5 rounded-full text-xs font-medium shadow-md items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Harvested at 4:30 AM</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
