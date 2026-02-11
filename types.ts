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
}

export enum AppRoute {
  HOME = 'home',
  BROWSE = 'browse',
  RESTAURANT = 'restaurant'
}