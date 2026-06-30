const express = require("express");
const Review = require("../models/Review");

const router = express.Router();

/* -------------------------
   ADD REVIEW
--------------------------*/
router.post("/", async (req, res) => {
  try {

    const review = new Review(req.body);

    await review.save();

    res.status(201).json({
      message: "Review Added Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
});

/* -------------------------
   GET ALL REVIEWS
--------------------------*/
router.get("/", async (req, res) => {

  try {

    const reviews = await Review.find().sort({
      createdAt: -1,
    });

    res.json(reviews);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

});

/* -------------------------
   DELETE REVIEW
--------------------------*/
router.delete("/:id", async (req, res) => {

  try {

    await Review.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Review Deleted",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

});

module.exports = router;