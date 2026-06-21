const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
{
userId: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true,
},

title: {
type: String,
required: true,
},

image: {
type: String,
required: true,
},

price: {
type: String,
required: true,
},
},
{
timestamps: true,
}
);

module.exports = mongoose.model(
"Wishlist",
wishlistSchema
);
