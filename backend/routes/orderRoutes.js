const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const {
      userId,
      items,
      totalPrice,
    } = req.body;

    const order = new Order({
      userId,
      items,
      totalPrice,
    });

    await order.save();

    res.status(201).json({
      message: "Order Created",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId,
    });

    res.json(orders);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders =
      await Order.find();

    res.json(orders);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.put(
  "/status/:id",
  async (req, res) => {
    try {
      const { status } =
        req.body;

      const order =
        await Order.findByIdAndUpdate(
          req.params.id,
          {
            status,
          },
          {
            new: true,
          }
        );

      res.json(order);

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  }
);

router.get(
  "/stats/dashboard",
  async (req, res) => {
    try {
      const Order =
        require(
          "../models/Order"
        );

      const Artwork =
        require(
          "../models/Artwork"
        );

      const totalOrders =
        await Order.countDocuments();

      const totalArtworks =
        await Artwork.countDocuments();

      const orders =
        await Order.find();

      const totalRevenue =
        orders.reduce(
          (sum, order) =>
            sum +
            order.totalPrice,
          0
        );

      res.json({
        totalOrders,
        totalArtworks,
        totalRevenue,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  }
);

module.exports = router;