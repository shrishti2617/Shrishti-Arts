const express = require("express");
const Wishlist = require("../models/Wishlist");

const router = express.Router();

router.post("/add", async (req, res) => {
try {
const {
userId,
title,
image,
price,
} = req.body;

const item = new Wishlist({
  userId,
  title,
  image,
  price,
});

await item.save();

res.status(201).json({
  message: "Added to wishlist",
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
const wishlist = await Wishlist.find({
userId: req.params.userId,
});

res.json(wishlist);

} catch (error) {
console.log(error);

res.status(500).json({
  message: "Server Error",
});

}
});

module.exports = router;
router.delete("/remove/:id", async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);

    res.json({
      message: "Removed from wishlist",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});