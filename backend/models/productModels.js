import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    images:[String],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // links to Category model
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
