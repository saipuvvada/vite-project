import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");

    const existingAdmin = await User.findOne({ email: "admin@karempudi.com" });
    if (existingAdmin) {
      console.log("Admin account already exists.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin", 10);
    await User.create({
      name: "Super Admin",
      email: "admin@karempudi.com",
      password: hashedPassword
    });

    console.log("Admin account created successfully!");
    console.log("Email: admin@karempudi.com");
    console.log("Password: admin");
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
};

createAdmin();
