
export interface Restaurant {
  id: string;
  name: string;
  location: string;
  hours: string;
  rating: number;
  tags: string[];
  image: string;
  status: 'Open Now' | 'Closed' | 'Trending' | 'Pocket Friendly';
  category: 'Full Meals' | 'Drinks' | 'Fast Foods' | 'Biryani' | 'South Indian';
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  type: 'veg' | 'non-veg';
  category: string;
}

export enum AppRoute {
  HOME = 'home',
  BROWSE = 'browse',
  RESTAURANT = 'restaurant',
  ORDERS = 'orders',
  CONTACT = 'contact'
}
