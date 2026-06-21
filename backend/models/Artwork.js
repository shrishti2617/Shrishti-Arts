const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      default: "Artwork",
    },

    featured: {
  type: Boolean,
  default: false,
},

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Artwork",
  artworkSchema
);