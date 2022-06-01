import { join, sep } from "path";
import mongoose from "mongoose";

import Product from "../models/product.js";
import Review from "../models/review.js";

const { ObjectId } = mongoose.Types;

export const getProductById = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const product = await Product.findById(id)
      .select(["-createdAt", "-updatedAt", "-__v", "-thumbnail"])
      .populate({
        path: "categories",
        model: "Category",
        select: "name",
      });
    const ratingOfProduct = await Review.aggregate([
      { $match: { productId: ObjectId(id) } },
      { $group: { _id: "$productId", rating: { $avg: "$rating" } } },
    ]);
    res.status(200).json({ product, ratingOfProduct });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  const {
    body: { category },
  } = req;

  try {
    const products = await Product.find({ categories: category }).select([
      "-createdAt",
      "-updatedAt",
      "-__v",
      "-images",
      "-categories",
      "-description",
    ]);
    const ratingsOfProducts = [];
    for (let i = 0; i < products.length; i++) {
      const { id } = products[i];
      const ratingOfProduct = await Review.aggregate([
        { $match: { productId: ObjectId(id) } },
        { $group: { _id: "$productId", rating: { $avg: "$rating" } } },
      ]);
      ratingsOfProducts.push(ratingOfProduct);
    }
    res.status(200).json({ products, ratingsOfProducts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createProduct = async (req, res) => {
  const {
    body: { name, description, stock, price, categories },
    files,
  } = req;

  try {
    const product = { name, description, stock, price, categories };
    if (files.length > 0) {
      const images = files.map((f) => {
        const defaultPath = join(sep, "api", f.path);
        const image = defaultPath.replaceAll("\\", "/");
        return image;
      });
      await Product.create({
        ...product,
        images,
        thumbnail: images[0],
      });
    } else {
      await Product.create(product);
    }
    res.status(201).json({ message: "Product created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export const deleteProduct = async (req, res) => {
//   const {
//     params: { id },
//   } = req;

//   try {
//     await Product.findByIdAndDelete(id);
//     res.status(200).json({ message: "Product deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const updateProduct = async (req, res) => {
//   const {
//     body: { name, description, images, stock, price, categories },
//   } = req;
//   const {
//     params: { id },
//   } = req;

//   try {
//     await Product.findByIdAndUpdate(id, {
//       name,
//       description,
//       images,
//       stock,
//       price,
//       categories,
//     });
//     res.status(200).json({ message: "Product updated" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
