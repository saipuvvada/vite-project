import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: String,
  location: String,
  cuisine: [String],
  phone: String,
  timing: String
}, { timestamps: true });

export default mongoose.model("Restaurant", restaurantSchema);
