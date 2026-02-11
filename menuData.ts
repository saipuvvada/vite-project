export type MenuRow = {
  restaurant: string;
  item: string;
  category: string;
  price: number;
  timing: string;
  phone: string;
};

export async function loadMenuData(): Promise<MenuRow[]> {
  const res = await fetch("/menu.csv", { cache: "no-store" });
  const text = await res.text();
  const rows = parseCSV(text);

  return rows.slice(1).map(r => ({
    restaurant: r[0]?.trim(),
    item: r[1]?.trim(),
    category: r[2]?.trim(),
    price: Number(r[3]) || 0,
    timing: r[4]?.trim(),
    phone: r[5]?.trim(),
  })).filter(r => r.restaurant && r.item);
}

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [], cell = "", inQuotes = false;
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

export function getRestaurants(rows: MenuRow[]) {
  const map = new Map<string, MenuRow>();
  rows.forEach(r => { if (!map.has(r.restaurant)) map.set(r.restaurant, r); });
  return Array.from(map.values()).map(r => ({
    id: slugify(r.restaurant),
    name: r.restaurant,
    timing: r.timing,
    phone: r.phone,
  }));
}

export function getMenuByRestaurant(rows: MenuRow[]) {
  const grouped: Record<string, MenuRow[]> = {};
  rows.forEach(r => {
    const id = slugify(r.restaurant);
    if (!grouped[id]) grouped[id] = [];
    grouped[id].push(r);
  });
  return grouped;
}

function slugify(text: string) {
  return text.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}