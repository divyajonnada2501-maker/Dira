import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CustomStudioModal } from './components/CustomStudioModal';
import { CartDrawer } from './components/CartDrawer';
import { LocationModal } from './components/LocationModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { FlowerCareSection } from './components/FlowerCareSection';
import { Footer } from './components/Footer';

import { LocationProvider } from './context/LocationContext';
import { CartProvider } from './context/CartContext';
import { PRODUCTS, CATEGORIES_LIST } from './data/products';
import { Product, FlowerCategory } from './types';
import { Search, Sparkles, Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

function StoreApp() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under200' | '200to500' | '500to1000' | 'above1000'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isCustomStudioOpen, setIsCustomStudioOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Filter products based on search, category, price range, and sort
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesRegional = product.regionalName?.toLowerCase().includes(query) ?? false;
        const matchesFlowers = product.flowerTypes.some((f) => f.toLowerCase().includes(query));
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesRegional && !matchesFlowers && !matchesDesc) {
          return false;
        }
      }

      // Price filter
      if (priceFilter === 'under200' && product.price >= 200) return false;
      if (priceFilter === '200to500' && (product.price < 200 || product.price > 500)) return false;
      if (priceFilter === '500to1000' && (product.price < 500 || product.price > 1000)) return false;
      if (priceFilter === 'above1000' && product.price <= 1000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured
    });
  }, [selectedCategory, searchQuery, priceFilter, sortBy]);

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-800">
      
      {/* 3-Zone Clean Header */}
      <Navbar
        onOpenCustomStudio={() => setIsCustomStudioOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToCatalog();
        }}
        selectedCategory={selectedCategory}
      />

      {/* Hero Section with Live Delivery Checker */}
      <Hero
        onExploreClick={scrollToCatalog}
        onOpenCustomStudio={() => setIsCustomStudioOpen(true)}
      />

      {/* Main Catalog & Shopping Experience */}
      <main id="catalog-section" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
        
        {/* Section Heading & Category Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 text-left">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-rose-900 block mb-1">
              Hand-Picked Fresh Flora
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
              {selectedCategory === 'all'
                ? 'All Flowers & Sacred Creations'
                : CATEGORIES_LIST.find((c) => c.id === selectedCategory)?.name || 'Collections'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Authentic traditional dhandalu, natural loose blooms, and celebration bouquets at wholesale farm prices.
            </p>
          </div>

          {/* Quick Custom Builder Callout */}
          <button
            onClick={() => setIsCustomStudioOpen(true)}
            className="self-start md:self-auto px-4 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Need Custom Length or Flower Mix? Design Here</span>
          </button>
        </div>

        {/* Category Filter Tabs (Interactive Segmented Buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          {CATEGORIES_LIST.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-400 hover:text-stone-900'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-stone-800 text-stone-300' : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="bg-white p-3 sm:p-4 rounded-xl border border-stone-200 shadow-xs mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search flowers by name, telugu name, jasmine, dhandalu, marigolds, lotus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-stone-50 rounded-lg border border-stone-200 focus:bg-white focus:border-stone-800 outline-none transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Price Filter Segment */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setPriceFilter('all')}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  priceFilter === 'all'
                    ? 'bg-white text-stone-900 font-semibold shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All Prices
              </button>
              <button
                type="button"
                onClick={() => setPriceFilter('under200')}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  priceFilter === 'under200'
                    ? 'bg-white text-stone-900 font-semibold shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Under ₹200
              </button>
              <button
                type="button"
                onClick={() => setPriceFilter('200to500')}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  priceFilter === '200to500'
                    ? 'bg-white text-stone-900 font-semibold shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                ₹200 - ₹500
              </button>
              <button
                type="button"
                onClick={() => setPriceFilter('500to1000')}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  priceFilter === '500to1000'
                    ? 'bg-white text-stone-900 font-semibold shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                ₹500 - ₹1000
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-stone-200">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs text-stone-700 font-medium outline-none cursor-pointer"
              >
                <option value="featured">Featured Fresh</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 space-y-3">
            <p className="text-base font-semibold text-stone-800">No flowers found matching your filters.</p>
            <p className="text-xs text-stone-500">
              Try clearing your search query or switching to another category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setPriceFilter('all');
              }}
              className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setActiveProductModal(p)}
              />
            ))}
          </div>
        )}

      </main>

      {/* Flower Care & Farm Heritage Section */}
      <FlowerCareSection />

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToCatalog();
        }}
        onOpenCustomStudio={() => setIsCustomStudioOpen(true)}
      />

      {/* Modals & Slide-overs */}
      <ProductDetailModal
        product={activeProductModal}
        onClose={() => setActiveProductModal(null)}
        onOpenCustomStudio={() => {
          setActiveProductModal(null);
          setIsCustomStudioOpen(true);
        }}
      />

      <CustomStudioModal
        isOpen={isCustomStudioOpen}
        onClose={() => setIsCustomStudioOpen(false)}
      />

      <CartDrawer
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
      />

      <LocationModal />

      <OrderSuccessModal />

    </div>
  );
}

export default function App() {
  return (
    <LocationProvider>
      <CartProvider>
        <StoreApp />
      </CartProvider>
    </LocationProvider>
  );
}
