import express from "express";
import Order from "../models/Order.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Place a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               restaurantId:
 *                 type: string
 *               customerName:
 *                 type: string
 *               customerPhone:
 *                 type: string
 *               deliveryArea:
 *                 type: string
 *               deliveryAddress:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     menuId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *               totalAmount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Order placed
 */
// Place order
router.post("/", async (req, res) => {
  const order = await Order.create(req.body);
  res.json(order);
});

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 */
// Get all orders (for testing/admin)
router.get("/", authMiddleware, async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 }); // newest first
  res.json(orders);
});

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Update order status (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Accepted, Rejected, Completed]
 *     responses:
 *       200:
 *         description: Order status updated
 */
// Update order status (Admin)
router.put("/:id/status", authMiddleware, async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(order);
});

export default router;
