const dotenv = require("dotenv");
dotenv.config();
const authRoutes =
require("./routes/authRoutes");
const wishlistRoutes =
require("./routes/wishlistRoutes");
const cartRoutes = require("./routes/cartRoutes");
const artworkRoutes = require(
  "./routes/artworkRoutes"
);
const orderRoutes = require(
  "./routes/orderRoutes"
);
const reviewRoutes = require(
  "./routes/reviewRoutes.js"
);
const requestRoutes = require(
  "./routes/requestRoutes"
);
const paymentRoutes =
require("./routes/paymentRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB Connected");
})
.catch((err)=>{
    console.log(err);
});

app.use("/api/auth", authRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use(
  "/api/artworks",
  artworkRoutes
);
app.use(
  "/api/orders",
  orderRoutes
);
app.use(
  "/api/payment",
  paymentRoutes
);
app.use("/api/reviews", reviewRoutes);
app.use(
  "/api/requests",
  requestRoutes
);

app.get("/", (req,res)=>{
    res.send("API is running");
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server running");
});
