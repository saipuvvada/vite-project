const API_URL = "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("admin_token");
  return token ? { "Authorization": token, "Content-Type": "application/json" } : { "Content-Type": "application/json" };
};

export const api = {
  getRestaurants: async () => {
    const res = await fetch(`${API_URL}/restaurants`);
    if (!res.ok) throw new Error("Failed to fetch restaurants");
    return res.json();
  },
  
  getMenuByRestaurant: async (restaurantId: string) => {
    const res = await fetch(`${API_URL}/menu/${restaurantId}`);
    if (!res.ok) throw new Error("Failed to fetch menu");
    return res.json();
  },
  
  placeOrder: async (orderData: any) => {
    const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData)
    });
    if (!res.ok) throw new Error("Failed to place order");
    return res.json();
  },

  login: async (credentials: any) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    });
    if (!res.ok) throw new Error("Invalid credentials");
    return res.json();
  },

  getOrders: async () => {
    const res = await fetch(`${API_URL}/orders`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    const res = await fetch(`${API_URL}/orders/${orderId}/status`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error("Failed to update status");
    return res.json();
  }
};
