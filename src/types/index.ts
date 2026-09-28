export type FlowerCategory = 
  | 'all'
  | 'dhandalu'
  | 'bouquets'
  | 'natural_loose'
  | 'pooja_special'
  | 'floral_accessories';

export interface Product {
  id: string;
  name: string;
  regionalName?: string;
  category: FlowerCategory;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  unit: string;
  image: string;
  description: string;
  flowerTypes: string[];
  fragranceLevel: 'High Fragrance' | 'Delicate Scent' | 'Gentle Natural' | 'Fresh Earthy';
  freshnessTime: string;
  tags: string[];
  isBestPrice?: boolean;
  isBestseller?: boolean;
  customizable?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
  customNote?: string;
  customDetails?: {
    length?: string;
    flowerMix?: string;
    ribbonColor?: string;
  };
}

export interface DeliveryLocation {
  city: string;
  area: string;
  pincode: string;
  deliveryTimeEstimate: string;
  isExpressAvailable: boolean;
  address?: string;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  customerPhone: string;
  deliveryLocation: DeliveryLocation;
  deliveryDate: string;
  deliverySlot: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'cod' | 'upi' | 'card';
  greetingCardMessage?: string;
  orderTimestamp: string;
}
