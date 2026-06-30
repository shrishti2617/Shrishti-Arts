const express = require("express");

const router = express.Router();

const Request = require("../models/Request");

/* ==========================
   CREATE REQUEST
========================== */

router.post("/", async (req, res) => {
  try {
    const request = new Request(req.body);

    await request.save();

    res.status(201).json({
      message:
        "Request submitted successfully.",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

/* ==========================
   GET ALL REQUESTS
========================== */

router.get("/", async (req, res) => {
  try {
    const requests = await Request.find().sort({
      createdAt: -1,
    });

    res.json(requests);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
/* ==========================
   GET USER REQUESTS
========================== */

router.get("/user/:userId", async (req, res) => {

  try {

    const requests = await Request.find({
      userId: req.params.userId,
    }).sort({
      createdAt: -1,
    });

    res.json(requests);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

});

/* ==========================
   UPDATE STATUS
========================== */

router.put("/status/:id", async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    console.log("Current Status:", request.status);

    if (
      request.status === "Pending" ||
      request.status === "Completed"
    ) {
      request.status = "Accepted";
    } else {
      request.status = "Pending";
    }

    console.log("New Status:", request.status);

    await request.save();

    res.json(request);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
});
/* ==========================
   DELETE REQUEST
========================== */

router.delete("/:id", async (req, res) => {
  try {
    await Request.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Request Deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;