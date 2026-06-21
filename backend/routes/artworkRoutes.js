const express = require("express");
const Artwork = require("../models/Artwork");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const artworks = await Artwork.find();

    res.json(artworks);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.post("/add", async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      price,
      category,
    } = req.body;

    const artwork = new Artwork({
      title,
      description,
      image,
      price,
      category,
    });

    await artwork.save();

    res.status(201).json({
      message: "Artwork Added",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    await Artwork.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Artwork Deleted",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
router.put("/update/:id", async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      price,
      category,
    } = req.body;

    const artwork =
      await Artwork.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          image,
          price,
          category,
        },
        {
          new: true,
        }
      );

    res.json(artwork);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.put(
  "/featured/:id",
  async (req, res) => {
    try {

      const artwork =
        await Artwork.findById(
          req.params.id
        );

      artwork.featured =
        !artwork.featured;

      await artwork.save();

      res.json({
        message:
          "Featured Updated",
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