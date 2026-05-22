import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Restaurant from "./models/Restaurant.js";
import Menu from "./models/Menu.js";

dotenv.config();

const TIFFIN_MENU_ITEMS = [
  { name: "Idly (4 pcs)", price: 40, category: "Breakfast" },
  { name: "Sambar Idly", price: 55, category: "Breakfast" },
  { name: "Vada (3 pcs)", price: 40, category: "Breakfast" },
  { name: "Bonda (3 pcs)", price: 40, category: "Breakfast" },
  { name: "Mysore Bonda", price: 55, category: "Breakfast" },
  { name: "Puri", price: 50, category: "Breakfast" },
  { name: "Plain Dosa", price: 40, category: "Dosa" },
  { name: "Onion Dosa", price: 50, category: "Dosa" },
  { name: "Plain Karam Dosa", price: 45, category: "Dosa" },
  { name: "Masala Dosa", price: 55, category: "Dosa" },
  { name: "Rava Dosa", price: 55, category: "Dosa" },
  { name: "Plain Pesarattu", price: 40, category: "Pesarattu" },
  { name: "Allam Pesarattu", price: 45, category: "Pesarattu" },
  { name: "Upma Pesarattu", price: 50, category: "Pesarattu" },
  { name: "Onion Pesarattu", price: 50, category: "Pesarattu" },
  { name: "Aloo Samosa (1 pcs)", price: 30, category: "Snacks" },
  { name: "Onion Samosa (4 pcs)", price: 40, category: "Snacks" },
  { name: "Jilebi", price: 60, category: "Snacks" },
  { name: "Gunta Punugulu", price: 40, category: "Snacks" },
  { name: "Pani Puri (8 pcs)", price: 40, category: "Snacks" },
  { name: "Chapati (Single)", price: 45, category: "Breakfast" },
  { name: "Chapati (Plate)", price: 80, category: "Breakfast" }
];

const BAKERY_MENU_ITEMS = [
  { name: "Puff (Veg)", price: 40, category: "Puffs" },
  { name: "Puff (Egg)", price: 50, category: "Puffs" },
  { name: "Cream Bun", price: 30, category: "Buns" },
  { name: "Dilpasand", price: 35, category: "Buns" },
  { name: "Pastry (Chocolate)", price: 70, category: "Pastries" },
  { name: "Pastry (Butterscotch)", price: 70, category: "Pastries" },
  { name: "Cake (1/2 Kg)", price: 310, category: "Cakes" },
  { name: "Cake (1 Kg)", price: 560, category: "Cakes" },
  { name: "Bread", price: 50, category: "Bread" }
];

const JUICE_MENU_ITEMS = [
  { name: "Banana Juice", price: 50, category: "Juices" },
  { name: "Dates Juice", price: 100, category: "Juices" },
  { name: "Pineapple", price: 60, category: "Juices" },
  { name: "Pomegranate", price: 70, category: "Juices" },
  { name: "Grapes Juice", price: 60, category: "Juices" },
  { name: "Sapota Juice", price: 60, category: "Juices" },
  { name: "Mango Juice", price: 60, category: "Juices" },
  { name: "Orange Juice", price: 50, category: "Juices" },
  { name: "Apple Juice", price: 60, category: "Juices" },
  { name: "Carrot Juice", price: 60, category: "Juices" },
  { name: "Beetroot Juice", price: 60, category: "Juices" },
  { name: "Watermelon", price: 50, category: "Juices" },
  { name: "Muskmelon", price: 60, category: "Juices" },
  { name: "Dry Fruits", price: 119, category: "Juices" },
  { name: "Special ABC", price: 101, category: "Juices" },
  { name: "Raw Juice", price: 10, category: "Juices" },
  { name: "Oreo Shake", price: 69, category: "Milkshakes" },
  { name: "Dark Fantasy", price: 69, category: "Milkshakes" },
  { name: "KitKat Shake", price: 69, category: "Milkshakes" },
  { name: "Dairy Milk", price: 69, category: "Milkshakes" },
  { name: "Boost Milk", price: 69, category: "Milkshakes" },
  { name: "Vanilla Shake", price: 69, category: "Milkshakes" },
  { name: "Chocolate", price: 69, category: "Milkshakes" },
  { name: "Butterscotch", price: 69, category: "Milkshakes" },
  { name: "Strawberry", price: 69, category: "Milkshakes" },
  { name: "Guava Shake", price: 69, category: "Milkshakes" },
  { name: "Orange Shake", price: 59, category: "Milkshakes" },
  { name: "Rose Milk", price: 49, category: "Milkshakes" },
  { name: "Black Currant", price: 69, category: "Milkshakes" },
  { name: "Green Apple", price: 69, category: "Milkshakes" },
  { name: "Mixed Fruit", price: 69, category: "Milkshakes" },
  { name: "Family Pack Ice Cream", price: 0, category: "Ice Cream" },
  { name: "All Soft Drinks", price: 0, category: "Soft Drinks" }
];

const SNACKS_MENU_ITEMS = [
  { name: "French Fries (S)", price: 80, category: "Veg Snacks" },
  { name: "French Fries (L)", price: 100, category: "Veg Snacks" },
  { name: "Veg Manchuria", price: 60, category: "Veg Snacks" },
  { name: "Aloo Samosa (1 pcs)", price: 20, category: "Veg Snacks" },
  { name: "Onion Samosa (4 pcs)", price: 30, category: "Veg Snacks" },
  { name: "Pani Puri (8 pcs)", price: 30, category: "Veg Snacks" },
  { name: "Chicken Lollipop", price: 150, category: "Non-Veg Snacks" },
  { name: "Chicken Wings", price: 120, category: "Non-Veg Snacks" },
  { name: "Chicken Leg", price: 150, category: "Non-Veg Snacks" },
  { name: "Chicken Box", price: 120, category: "Non-Veg Snacks" },
  { name: "Chicken Pop (S)", price: 120, category: "Non-Veg Snacks" },
  { name: "Chicken Pop (L)", price: 180, category: "Non-Veg Snacks" }
];


function parseCSV(text) {
  const rows = [];
  let row = [], cell = "", inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') { inQuotes = !inQuotes; continue; }
    if (c === "," && !inQuotes) { row.push(cell); cell = ""; continue; }
    if ((c === "\n" || c === "\r") && !inQuotes) {
      if (cell || row.length) { row.push(cell); rows.push(row); }
      row = []; cell = ""; continue;
    }
    cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

const seedData = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected! Clearing old data...");

    await Restaurant.deleteMany();
    await Menu.deleteMany();

    // 1. Parse CSV
    const csvData = fs.readFileSync("../vite-project-main/public/menu.csv", "utf8");
    const rows = parseCSV(csvData).slice(1); // skip header
    
    const restaurantMap = new Map();
    
    // Process CSV Rows
    for (const r of rows) {
      if (!r[0] || !r[1]) continue;
      const rName = r[0].trim();
      const mName = r[1].trim();
      const mCat = r[2] ? r[2].trim() : "Other";
      const basePrice = Number(r[3]) || 0;
      const timing = r[4] ? r[4].trim() : "";
      const phone = r[5] ? r[5].trim() : "";

      // Apply price adjustments per requirements
      let finalPrice = basePrice;
      if (rName === "MADINA DHABA & RESTAURANT") {
        if (mName === "Kheer") {
          // Skip adding Kheer item
          console.log(`Skipping Kheer for ${rName}`);
          continue;
        }
        if (mName === "Pulka (1 pc)") {
          finalPrice = 9; // set specific price
          console.log(`Setting Pulka price to 9 for ${rName}`);
        } else {
          finalPrice = basePrice + 20;
          console.log(`Increasing price by 20 for ${rName}: ${mName} from ${basePrice} to ${finalPrice}`);
        }
      } else if (rName === "KV Fast Food" || rName === "Sri Venkateshwara Fast Food Centre") {
        finalPrice = basePrice + 30;
        console.log(`Increasing price by 30 for ${rName}: ${mName} from ${basePrice} to ${finalPrice}`);
      }
      
      if (!restaurantMap.has(rName)) {
        const newRes = await Restaurant.create({ name: rName, location: "Karempudi", phone, timing });
        restaurantMap.set(rName, newRes._id);
      }
      
      const resId = restaurantMap.get(rName);
      await Menu.create({
        restaurantId: resId,
        name: mName,
        price: finalPrice,
        category: mCat,
        description: timing // storing timing in description temporarily to pass it to frontend
      });
    }

    // 2. Add Constants Data
    const seedConstant = async (resName, items) => {
      const newRes = await Restaurant.create({ name: resName, location: "Karempudi", phone: "8639186035", timing: "06:00 AM - 10:00 PM" });
      const menuDocs = items.map(i => ({
        restaurantId: newRes._id,
        name: i.name,
        price: i.price,
        category: i.category
      }));
      await Menu.insertMany(menuDocs);
    };

    await seedConstant("Tiffins", TIFFIN_MENU_ITEMS);
    await seedConstant("Bakery", BAKERY_MENU_ITEMS);
    await seedConstant("Juices", JUICE_MENU_ITEMS);
    await seedConstant("Snacks", SNACKS_MENU_ITEMS);

    console.log("Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seedData();
