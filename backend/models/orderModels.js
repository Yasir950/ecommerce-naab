import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: String, // optional snapshot
    price: Number, // price at purchase
    quantity: Number
  }
],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // references the User model
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
