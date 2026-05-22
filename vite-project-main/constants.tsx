import { MenuItem } from "./types";

export const TIFFIN_MENU_ITEMS: MenuItem[] = [
  { id: "t1", name: "Idly (4 pcs)", price: 30, category: "Breakfast" },
  { id: "t2", name: "Sambar Idly", price: 45, category: "Breakfast" },

  // ✅ Added below Sambar Idly
  { id: "t2a", name: "Vada (3 pcs)", price: 30, category: "Breakfast" },

  { id: "t3", name: "Bonda (3 pcs)", price: 30, category: "Breakfast" },
  { id: "t4", name: "Mysore Bonda", price: 45, category: "Breakfast" },
  { id: "t5", name: "Puri", price: 40, category: "Breakfast" },

  { id: "t6", name: "Plain Dosa", price: 30, category: "Dosa" },
  { id: "t7", name: "Onion Dosa", price: 40, category: "Dosa" },
  { id: "t8", name: "Plain Karam Dosa", price: 35, category: "Dosa" },
  { id: "t9", name: "Masala Dosa", price: 45, category: "Dosa" },
  { id: "t10", name: "Rava Dosa", price: 45, category: "Dosa" },

  { id: "t11", name: "Plain Pesarattu", price: 30, category: "Pesarattu" },
  { id: "t12", name: "Allam Pesarattu", price: 35, category: "Pesarattu" },
  { id: "t13", name: "Upma Pesarattu", price: 40, category: "Pesarattu" },
  { id: "t14", name: "Onion Pesarattu", price: 40, category: "Pesarattu" },

  // ✅ Snacks BELOW Pesarattu section
  { id: "s1", name: "Aloo Samosa (1 pcs)", price: 20, category: "Snacks" },
  { id: "s2", name: "Onion Samosa (4 pcs)", price: 30, category: "Snacks" },
  { id: "s3", name: "Jilebi", price: 50, category: "Snacks" },
  { id: "s4", name: "Gunta Punugulu", price: 30, category: "Snacks" },
  { id: "s5", name: "Pani Puri (8 pcs)", price: 30, category: "Snacks" },

  { id: "t15", name: "Chapati (Single)", price: 35, category: "Breakfast" },
  { id: "t16", name: "Chapati (Plate)", price: 70, category: "Breakfast" },
];

export const BAKERY_MENU_ITEMS: MenuItem[] = [
  { id: "b1", name: "Puff (Veg)", price: 30, category: "Puffs" },
  { id: "b2", name: "Puff (Egg)", price: 40, category: "Puffs" },
  

  { id: "b4", name: "Cream Bun", price: 20, category: "Buns" },
  { id: "b5", name: "Dilpasand", price: 25, category: "Buns" },

  { id: "b6", name: "Pastry (Chocolate)", price: 60, category: "Pastries" },
  { id: "b7", name: "Pastry (Butterscotch)", price: 60, category: "Pastries" },

  { id: "b8", name: "Cake (1/2 Kg)", price: 300, category: "Cakes" },
  { id: "b9", name: "Cake (1 Kg)", price: 550, category: "Cakes" },

  { id: "b10", name: "Bread", price: 40, category: "Bread" },
  
];

export const JUICE_MENU_ITEMS: MenuItem[] = [
  // Juices
  { id: "j1", name: "Banana Juice", price: 50, category: "Juices" },
  { id: "j2", name: "Dates Juice", price: 100, category: "Juices" },
  { id: "j3", name: "Pineapple", price: 60, category: "Juices" },
  { id: "j4", name: "Pomegranate", price: 70, category: "Juices" },
  { id: "j5", name: "Grapes Juice", price: 60, category: "Juices" },
  { id: "j6", name: "Sapota Juice", price: 60, category: "Juices" },
  { id: "j7", name: "Mango Juice", price: 60, category: "Juices" },
  { id: "j8", name: "Orange Juice", price: 50, category: "Juices" },
  { id: "j9", name: "Apple Juice", price: 60, category: "Juices" },
  { id: "j10", name: "Carrot Juice", price: 60, category: "Juices" },
  { id: "j11", name: "Beetroot Juice", price: 60, category: "Juices" },
  { id: "j12", name: "Watermelon", price: 50, category: "Juices" },
  { id: "j13", name: "Muskmelon", price: 60, category: "Juices" },
  { id: "j14", name: "Dry Fruits", price: 119, category: "Juices" },
  { id: "j15", name: "Special ABC", price: 101, category: "Juices" },
  { id: "j16", name: "Raw Juice", price: 10, category: "Juices" },

  // Milkshakes
  { id: "m1", name: "Oreo Shake", price: 69, category: "Milkshakes" },
  { id: "m2", name: "Dark Fantasy", price: 69, category: "Milkshakes" },
  { id: "m3", name: "KitKat Shake", price: 69, category: "Milkshakes" },
  { id: "m4", name: "Dairy Milk", price: 69, category: "Milkshakes" },
  { id: "m5", name: "Boost Milk", price: 69, category: "Milkshakes" },
  { id: "m6", name: "Vanilla Shake", price: 69, category: "Milkshakes" },
  { id: "m7", name: "Chocolate", price: 69, category: "Milkshakes" },
  { id: "m8", name: "Butterscotch", price: 69, category: "Milkshakes" },
  { id: "m9", name: "Strawberry", price: 69, category: "Milkshakes" },
  { id: "m10", name: "Guava Shake", price: 69, category: "Milkshakes" },
  { id: "m11", name: "Orange Shake", price: 59, category: "Milkshakes" },
  { id: "m12", name: "Rose Milk", price: 49, category: "Milkshakes" },
  { id: "m13", name: "Black Currant", price: 69, category: "Milkshakes" },
  { id: "m14", name: "Green Apple", price: 69, category: "Milkshakes" },
  { id: "m15", name: "Mixed Fruit", price: 69, category: "Milkshakes" },

  // Desserts & Soft Drinks
  { id: "d1", name: "Family Pack Ice Cream", price: 0, category: "Ice Cream" },
  { id: "d2", name: "All Soft Drinks", price: 0, category: "Soft Drinks" },
];