import React, { useState } from 'react';
import { MapPin, ShoppingBag, Sparkles, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';

interface NavbarProps {
  onOpenCustomStudio: () => void;
  onSelectCategory: (cat: string) => void;
  selectedCategory: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCustomStudio,
  onSelectCategory,
  selectedCategory,
}) => {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { currentLocation, setIsLocationModalOpen } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'All Flowers', id: 'all' },
    { label: 'Flower Dhandalu', id: 'dhandalu' },
    { label: 'Fresh Bouquets', id: 'bouquets' },
    { label: 'Natural Loose Blooms', id: 'natural_loose' },
    { label: 'Pooja Specials', id: 'pooja_special' },
  ];

  const handleNavClick = (id: string) => {
    onSelectCategory(id);
    setMobileMenuOpen(false);
    const element = document.getElementById('catalog-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4 font-normal tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] sm:text-xs">
          <div className="flex items-center gap-2 truncate">
            <span className="text-amber-300">🌸 Fresh Morning Harvest</span>
            <span className="text-stone-500 hidden sm:inline">|</span>
            <span className="truncate">Direct farm prices starting at just ₹89 · Same-day delivery</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-stone-400">
            <span>2-Hour Express Service</span>
            <span>·</span>
            <span>100% Dewy Fresh Guarantee</span>
          </div>
        </div>
      </div>

      {/* Main One-Row, Three-Zone Top Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-stone-200 transition-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-stone-700 hover:text-stone-950 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex flex-col text-left focus:outline-none"
            >
              <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 group-hover:text-rose-900 transition-colors">
                Dira Flowers
              </span>
              <span className="text-[10px] tracking-widest uppercase text-stone-500 font-sans -mt-1 font-medium">
                Artisanal Blooms & Garlands
              </span>
            </a>
          </div>

          {/* Zone 2: 4-6 nav links (Single-line, clean text hover) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors py-1 cursor-pointer whitespace-nowrap text-sm ${
                  selectedCategory === link.id
                    ? 'text-rose-900 font-semibold border-b-2 border-rose-800'
                    : 'hover:text-stone-950'
                }`}
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={onOpenCustomStudio}
              className="flex items-center gap-1.5 text-amber-800 hover:text-amber-950 font-medium cursor-pointer transition-colors py-1 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Custom Studio</span>
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Delivery Location Selector Button */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 hover:border-stone-400 bg-white/80 hover:bg-white text-stone-800 transition-all text-xs cursor-pointer shadow-xs"
              title="Change Delivery Location"
            >
              <MapPin className="w-3.5 h-3.5 text-rose-700 shrink-0" />
              <div className="flex flex-col text-left max-w-[110px] sm:max-w-[150px]">
                <span className="text-[10px] text-stone-500 leading-none">Deliver to:</span>
                <span className="font-medium text-stone-800 truncate text-[11px] sm:text-xs">
                  {currentLocation.area || currentLocation.city}
                </span>
              </div>
              <ChevronDown className="w-3 h-3 text-stone-400 shrink-0 ml-0.5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center justify-center p-2.5 rounded-lg bg-stone-900 text-white hover:bg-stone-800 transition-colors cursor-pointer shadow-sm group"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-105" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white font-semibold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-[#FAF9F5] px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top duration-200">
            <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider px-2 py-1">
              Explore Collections
            </div>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === link.id
                    ? 'bg-rose-50 text-rose-900'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCustomStudio();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium bg-amber-50 text-amber-900 hover:bg-amber-100 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Custom Garland & Bouquet Studio</span>
              </span>
              <span className="text-xs text-amber-700">Design Now →</span>
            </button>

            <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600 px-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                <span>{currentLocation.area}, {currentLocation.pincode}</span>
              </span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsLocationModalOpen(true);
                }}
                className="text-rose-800 underline font-medium"
              >
                Change Pin
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
