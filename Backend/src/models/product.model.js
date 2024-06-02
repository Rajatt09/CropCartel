import mongoose, { mongo, Schema } from "mongoose";
// import { User } from "./user.model.js";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cropImage: {
      type: String,
      //   required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      minimum: 1,
    },
    category: {
      type: String,
      required: true,
      enum: ["fruit", "vegetable", "grains", "spices", "dairy"],
    },
    expire: {
      type: Date,
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    currentPrice: {
      type: Number,
      //required:true
    },
    sellerCount: {
      type: Number,
      default: 1,
    },
    buyerCount: {
      type: Number,
      default: 1,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    // bidder: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    // },
    status: {
      type: String,
      required: true,
      enum: ["saved", "posted", "expired"],
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
