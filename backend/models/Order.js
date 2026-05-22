import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  customerName: String,
  customerPhone: String,
  deliveryArea: String,
  deliveryAddress: String,
  items: [{
    menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
    quantity: Number
  }],
  totalAmount: Number,
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
