import React, { createContext, useContext, useState, useEffect } from 'react';
import { DeliveryLocation } from '../types';
import { POPULAR_LOCATIONS } from '../data/products';

interface LocationContextType {
  currentLocation: DeliveryLocation;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  updateLocation: (loc: DeliveryLocation) => void;
  checkPincode: (pin: string) => DeliveryLocation;
  popularLocations: DeliveryLocation[];
}

const DEFAULT_LOCATION: DeliveryLocation = {
  city: 'Hyderabad',
  area: 'Banjara Hills',
  pincode: '500034',
  deliveryTimeEstimate: '60 - 90 mins',
  isExpressAvailable: true,
  address: 'Flat 402, Green Meadows',
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState<DeliveryLocation>(() => {
    try {
      const saved = localStorage.getItem('dira_flowers_location');
      return saved ? JSON.parse(saved) : DEFAULT_LOCATION;
    } catch {
      return DEFAULT_LOCATION;
    }
  });

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('dira_flowers_location', JSON.stringify(currentLocation));
    } catch {
      // storage unavailable
    }
  }, [currentLocation]);

  const updateLocation = (loc: DeliveryLocation) => {
    setCurrentLocation(loc);
    setIsLocationModalOpen(false);
  };

  const checkPincode = (pin: string): DeliveryLocation => {
    const clean = pin.trim();
    const found = POPULAR_LOCATIONS.find((l) => l.pincode === clean);
    if (found) {
      return found;
    }
    // Generic valid 6 digit pincode in India
    if (/^[1-9][0-9]{5}$/.test(clean)) {
      return {
        city: 'Delivery Service Hub',
        area: `Postal Area (${clean})`,
        pincode: clean,
        deliveryTimeEstimate: 'Today by 2:00 PM - 5:00 PM',
        isExpressAvailable: true,
      };
    }
    // Fallback
    return {
      city: 'Local Area',
      area: 'Delivery Zone',
      pincode: clean || '500001',
      deliveryTimeEstimate: 'Same-Day Express Available',
      isExpressAvailable: true,
    };
  };

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        isLocationModalOpen,
        setIsLocationModalOpen,
        updateLocation,
        checkPincode,
        popularLocations: POPULAR_LOCATIONS,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
