const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    coustomerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: {
      type: Object,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    paymentType: {
      type: String,
      default: "COD",
    },

    status: {
      type: String,
      default: "order_placed",
    },
  },
  {
    timestamps: true,
  }
);

const orders = mongoose.model("Order", orderSchema);

module.exports = orders;
