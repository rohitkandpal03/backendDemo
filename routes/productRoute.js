import express from "express";
import Product from "../model/productModel";
import { isAdmin, isAuth } from "../util";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

router.get("/:id", async (req, res) => {
  const productId = req.params.id;
  // const products = await Product.find({});
  // console.log(products);
  const product = await Product.findOne({ _id: req.params.id });

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

router.post("/", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    price: req.body.price,
    brand: req.body.brand,
    rating: req.body.rating,
    numReview: req.body.numReview,
    description: req.body.description,
    category: req.body.category,
    inStockItems: req.body.inStockItems,
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(201)
      .send({ message: "Product is created", data: newProduct });
  }
  return res.status(500).send({ message: "Error in creating Product" });
});

router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.image = req.body.image;
    product.price = req.body.price;
    product.brand = req.body.brand;
    product.description = req.body.description;
    product.category = req.body.category;
    product.inStockItems = req.body.inStockItems;
    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ message: "Product is updated", data: updatedProduct });
    }
  }
  return res.status(500).send({ message: "Error in updating Product" });
});

router.delete("/:id", async (req, res) => {
  const productId = req.params.id;
  const deleteProduct = await Product.findById(productId);
  if (deleteProduct) {
    await deleteProduct.remove();
    return res.status(200).send({ message: "Product deleted" });
  } else {
    return res.status(500).send({ message: "Error in deleting Product" });
  }
});

export default router;
