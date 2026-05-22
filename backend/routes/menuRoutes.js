import express from "express";
import Menu from "../models/Menu.js";

const router = express.Router();

/**
 * @swagger
 * /api/menu/{id}:
 *   get:
 *     summary: Get menu items by restaurant ID
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of menu items
 */
// Get menu by restaurant
router.get("/:id", async (req, res) => {
  const items = await Menu.find({ restaurantId: req.params.id });
  res.json(items);
});

export default router;
