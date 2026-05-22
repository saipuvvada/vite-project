import express from "express";
import Restaurant from "../models/Restaurant.js";

const router = express.Router();

/**
 * @swagger
 * /api/restaurants:
 *   get:
 *     summary: Get all restaurants
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: List of restaurants
 */
// Get all restaurants
router.get("/", async (req, res) => {
  const data = await Restaurant.find();
  res.json(data);
});

/**
 * @swagger
 * /api/restaurants:
 *   post:
 *     summary: Add a new restaurant
 *     tags: [Restaurants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               timing:
 *                 type: string
 *     responses:
 *       200:
 *         description: Restaurant created
 */
// Add restaurant (for now open)
router.post("/", async (req, res) => {
  const restaurant = await Restaurant.create(req.body);
  res.json(restaurant);
});

export default router;
