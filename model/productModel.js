import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  brand: { type: String, required: true },
  rating: { type: Number, default: 0, required: true },
  numReview: { type: Number, default: 0, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  inStockItems: { type: Number, default: 0, required: true },
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;
