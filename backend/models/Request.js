const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    artworkType: {
      type: String,
      required: true,
    },

    budget: {
      type: Number,
      required: true,
    },

    deadline: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Pending",
    },

    adminMessage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Request",
  requestSchema
);