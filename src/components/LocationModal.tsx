import React, { useState } from 'react';
import { X, MapPin, CheckCircle, Navigation, Clock, ShieldCheck } from 'lucide-react';
import { useLocation } from '../context/LocationContext';
import { DeliveryLocation } from '../types';

export const LocationModal: React.FC = () => {
  const {
    currentLocation,
    isLocationModalOpen,
    setIsLocationModalOpen,
    updateLocation,
    popularLocations,
    checkPincode,
  } = useLocation();

  const [pincodeInput, setPincodeInput] = useState('');
  const [streetAddress, setStreetAddress] = useState(currentLocation.address || '');
  const [selectedCity, setSelectedCity] = useState(currentLocation.city || 'Hyderabad');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isLocationModalOpen) return null;

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincodeInput || pincodeInput.length < 6) {
      setErrorMsg('Please enter a valid 6-digit delivery pincode');
      return;
    }
    setErrorMsg('');
    const verified = checkPincode(pincodeInput);
    updateLocation({
      ...verified,
      address: streetAddress,
    });
  };

  const handleSelectPredefined = (loc: DeliveryLocation) => {
    updateLocation({
      ...loc,
      address: streetAddress,
    });
  };

  const filteredLocations = popularLocations.filter((l) => l.city === selectedCity);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-50 text-rose-800 rounded-lg">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-stone-900">
                Choose Delivery Location
              </h3>
              <p className="text-xs text-stone-500">
                Fresh flowers are sourced & delivered locally for maximum fragrance
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Location Pill */}
        <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <div className="text-xs">
              <span className="text-stone-500">Currently Delivering to: </span>
              <strong className="text-stone-800 font-semibold">{currentLocation.area}, {currentLocation.city}</strong>
              <span className="text-stone-400 ml-1">({currentLocation.pincode})</span>
            </div>
          </div>
          <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
            {currentLocation.deliveryTimeEstimate}
          </span>
        </div>

        {/* Pincode Input Form */}
        <form onSubmit={handlePincodeSubmit} className="mt-4">
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
            Enter Delivery Pincode
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. 500081, 560038, 600017"
              value={pincodeInput}
              onChange={(e) => {
                setPincodeInput(e.target.value.replace(/\D/g, '').slice(0, 6));
                setErrorMsg('');
              }}
              className="flex-1 px-3.5 py-2.5 rounded-lg border border-stone-300 focus:border-stone-800 focus:ring-1 focus:ring-stone-800 text-sm outline-none font-mono"
              maxLength={6}
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-rose-900 hover:bg-rose-950 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            >
              Set Pincode
            </button>
          </div>
          {errorMsg && <p className="text-xs text-rose-600 mt-1">{errorMsg}</p>}
        </form>

        {/* Street Address / Flat optional */}
        <div className="mt-3">
          <label className="block text-xs font-medium text-stone-600 mb-1">
            House / Flat No., Street, Landmark (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Flat 301, Sri Sai Towers, Road No 12"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg border border-stone-300 focus:border-stone-800 focus:ring-1 focus:ring-stone-800 text-xs outline-none"
          />
        </div>

        {/* Quick City Picker */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
              Popular Cities & Express Hubs
            </span>
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 mb-3">
            {['Hyderabad', 'Bangalore', 'Chennai', 'Visakhapatnam', 'Vijayawada'].map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1 text-xs rounded-md transition-colors cursor-pointer whitespace-nowrap font-medium ${
                  selectedCity === city
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
            {filteredLocations.map((loc) => {
              const isSelected = currentLocation.pincode === loc.pincode;
              return (
                <button
                  key={loc.pincode}
                  type="button"
                  onClick={() => handleSelectPredefined(loc)}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-rose-800 bg-rose-50/50 shadow-xs ring-1 ring-rose-800'
                      : 'border-stone-200 hover:border-stone-400 bg-white'
                  }`}
                >
                  <div className="truncate mr-2">
                    <div className="text-xs font-medium text-stone-900 truncate">
                      {loc.area}
                    </div>
                    <div className="text-[11px] text-stone-500 font-mono">
                      PIN: {loc.pincode} · {loc.deliveryTimeEstimate}
                    </div>
                  </div>
                  {isSelected && <CheckCircle className="w-4 h-4 text-rose-800 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-5 pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span>Pooja orders: Delivery starts 6:00 AM</span>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="text-stone-900 font-semibold hover:underline cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
