const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();


router.post("/add", async (req, res) => {
  try {
    const {
      userId,
      title,
      image,
      price,
    } = req.body;

    const existingItem =
      await Cart.findOne({
        userId,
        title,
      });

    if (existingItem) {
      existingItem.quantity += 1;

      await existingItem.save();

      return res.status(200).json({
        message: "Quantity Updated",
      });
    }

    const cartItem = new Cart({
      userId,
      title,
      image,
      price,
      quantity: 1,
    });

    await cartItem.save();

    res.status(201).json({
      message: "Added To Cart",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
router.delete(
  "/remove/:id",
  async (req, res) => {
    try {
      await Cart.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Removed",
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

router.put("/increase/:id", async (req, res) => {
  const item = await Cart.findById(req.params.id);

  item.quantity += 1;

  await item.save();

  res.json(item);
});

router.put("/decrease/:id", async (req, res) => {
  const item = await Cart.findById(req.params.id);

  if (item.quantity > 1) {
    item.quantity -= 1;
    await item.save();
  }

  res.json(item);
});

router.get("/:userId", async (req, res) => {
  try {
    const items = await Cart.find({
      userId: req.params.userId,
    });

    res.json(items);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.delete(
  "/clear/:userId",
  async (req, res) => {
    try {
      await Cart.deleteMany({
        userId: req.params.userId,
      });

      res.json({
        message: "Cart Cleared",
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

module.exports = router;