import React from 'react';
import { MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';
import { useLocation } from '../context/LocationContext';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenCustomStudio: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenCustomStudio }) => {
  const { currentLocation, setIsLocationModalOpen } = useLocation();

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 text-left pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-800 text-xs">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <span className="font-serif text-2xl font-bold text-white block">
              Dira Flowers
            </span>
            <p className="text-stone-400 leading-relaxed">
              Artisanal fresh floral atelier delivering traditional flower dhandalu, natural sacred blooms, and luxury celebratory bouquets directly from blossom farms.
            </p>
            <div className="pt-2">
              <span className="text-stone-400 block mb-1">Delivering to:</span>
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="flex items-center gap-1.5 text-stone-200 hover:text-white bg-stone-800 px-2.5 py-1.5 rounded text-xs cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>{currentLocation.area}, {currentLocation.city}</span>
                <span className="text-stone-400 ml-1">· Change</span>
              </button>
            </div>
          </div>

          {/* Collections Links */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs">
              Collections
            </h4>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <button
                  onClick={() => onSelectCategory('dhandalu')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Flower Dhandalu & Wedding Malas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('bouquets')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Hand-Tied Fresh Bouquets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('natural_loose')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Natural Loose Blooms (Malli, Banthi)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('pooja_special')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Daily Pooja & Temple Essentials
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('floral_accessories')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bridal Veni & Hair Gajras
                </button>
              </li>
            </ul>
          </div>

          {/* Custom & Services */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs">
              Artisan Services
            </h4>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <button
                  onClick={onOpenCustomStudio}
                  className="hover:text-white transition-colors text-amber-300 font-medium cursor-pointer"
                >
                  ✦ Custom Dhanda & Bouquet Studio
                </button>
              </li>
              <li>
                <span className="text-stone-400">Bulk Wedding Muhurtham Orders</span>
              </li>
              <li>
                <span className="text-stone-400">Daily Morning Pooja Subscriptions</span>
              </li>
              <li>
                <span className="text-stone-400">Corporate & Banquet Floral Decor</span>
              </li>
              <li>
                <span className="text-stone-400">Temple Archana Flower Boxes</span>
              </li>
            </ul>
          </div>

          {/* Delivery & Hours */}
          <div className="space-y-2.5">
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs">
              Contact & Delivery Hours
            </h4>
            <div className="space-y-1.5 text-stone-400">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <span>Pooja Deliveries: 6:00 AM – 9:00 AM</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <span>Express Orders: 9:00 AM – 9:30 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <span>Florist Helpline: +91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <span>orders@diraflowers.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} Dira Flowers. All rights reserved. Handcrafted with devotion.</p>
          <div className="flex items-center gap-4">
            <span>Direct Farm Sourcing</span>
            <span>·</span>
            <span>Zero Chemical Preservation</span>
            <span>·</span>
            <span>Lowest Price Guarantee</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
