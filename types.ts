export interface Restaurant {
  id: string;
  name: string;
  phone: string;
  timing: string;
  location?: string;
  rating?: number;
  image?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;

  description?: string;

  // ✅ add these because your constants.tsx uses them in MENU_ITEMS
  image?: string;
  type?: 'veg' | 'non-veg';
}

export enum AppRoute {
  HOME = 'home',
  BROWSE = 'browse',
  RESTAURANT = 'restaurant',
  TIFFINS = 'tiffins',
  BAKERY = 'bakery'
}