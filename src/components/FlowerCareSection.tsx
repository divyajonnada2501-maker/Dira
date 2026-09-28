import React from 'react';
import { Droplet, Sun, Wind, Clock, Sparkles, HeartHandshake } from 'lucide-react';

export const FlowerCareSection: React.FC = () => {
  return (
    <section className="bg-[#FAF9F5] border-t border-stone-200 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest font-semibold text-rose-900 block mb-1">
            Artisanal Flower Care & Heritage
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            How We Keep Every Bloom Fresh & Fragrant
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            Every petal arrives at your home as alive and aromatic as when it smiled under morning dew.
          </p>
        </div>

        {/* 3 Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          
          <div className="p-6 bg-white rounded-xl border border-stone-200/90 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-800 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-stone-900">
              4:30 AM Dawn Harvest
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Jasmine, marigolds, and roses are hand-plucked during cool twilight hours before heat evaporates their natural essential fragrance oils.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-stone-200/90 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-stone-900">
              Master Garland Weavers
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Our traditional dhandalu are hand-tied with high-density knotting using organic cotton fiber and protective plant foliage—no harmful staple pins or glues.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-stone-200/90 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <Droplet className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-stone-900">
              Hydra-Padded Express Delivery
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Stems and loose pooja flowers are packaged in breathable eco-boxes with moisture hydration cushions to guarantee freshness in 90-minute express transit.
            </p>
          </div>

        </div>

        {/* Quick Tips for Customers */}
        <div className="mt-8 p-6 bg-white rounded-xl border border-stone-200 shadow-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Simple Tips to Make Your Flowers Last Longer
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-stone-600">
            <div>
              <strong className="text-stone-900 block mb-0.5">For Dhandalu & Garlands:</strong>
              Spritz lightly with clean cold water and keep wrapped in a clean moist cotton cloth in shade.
            </div>
            <div>
              <strong className="text-stone-900 block mb-0.5">For Bouquets:</strong>
              Trim stems 1 inch at a 45° angle under running water and place in clean room-temperature water.
            </div>
            <div>
              <strong className="text-stone-900 block mb-0.5">For Loose Jasmine & Mogra:</strong>
              Spread on a wide flat brass plate or banana leaf; avoid storing compressed in plastic bags.
            </div>
            <div>
              <strong className="text-stone-900 block mb-0.5">For Sacred Lotus:</strong>
              Keep stems immersed in at least 3 inches of water; blooms naturally open with gentle morning warmth.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
