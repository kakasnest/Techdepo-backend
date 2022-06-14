import { join, sep, dirname } from "path";
import mongoose from "mongoose";
import { unlink } from "fs";

import Product from "../models/product.js";
import Review from "../models/review.js";
import Category from "../models/category.js";
import { productRating } from "../utils/controllerUtils/product.js";

const { ObjectId } = mongoose.Types;

export const getProductById = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const product = await Product.findOne({ _id: id, isActive: true }).select([
      "-createdAt",
      "-updatedAt",
      "-__v",
      "-thumbnail",
      "-categories",
    ]);
    const ratingDataAsArray = await Review.aggregate(productRating(id));
    const { rating, ratingCount } = ratingDataAsArray[0];
    res.status(200).json({ ...product.toObject(), rating, ratingCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  const {
    body: { categoryId },
    query,
  } = req;
  const page = parseInt(query.page);
  const limit = parseInt(query.limit);
  const pageCondition = page && Number.isInteger(page) && page > 0;
  const limitCondition =
    limit && Number.isInteger(limit) && limit > 0 && limit <= 100;

  try {
    if (pageCondition && limitCondition) {
      const products = await Product.find({
        categories: categoryId,
        isActive: true,
      })
        .select([
          "-createdAt",
          "-updatedAt",
          "-__v",
          "-images",
          "-categories",
          "-description",
        ])
        .sort({ _id: 1 })
        .skip((page - 1) * limit)
        .limit(limit);
      const ratingsData = [];
      for (let i = 0; i < products.length; i++) {
        const { id } = products[i];
        const ratingData = await Review.aggregate([
          {
            $facet: {
              productRating: [
                { $match: { productId: ObjectId(id) } },
                {
                  $group: { _id: "$productId", rating: { $avg: "$rating" } },
                },
              ],
              productRatingCount: [
                { $match: { productId: ObjectId(id) } },
                {
                  $count: "ratingCount",
                },
              ],
            },
          },
          {
            $unwind: "$productRating",
          },
          {
            $unwind: "$productRatingCount",
          },
          {
            $addFields: {
              merged: {
                $mergeObjects: ["$productRating", "$productRatingCount"],
              },
            },
          },
          {
            $project: {
              rating: "$merged.rating",
              ratingCount: "$merged.ratingCount",
              id: "$merged._id",
            },
          },
        ]);
        ratingsData.push(ratingData);
      }
      const ratings = ratingsData.filter((r) => r.length > 0).map((r) => r[0]);
      const response = products.map((p) => {
        const hasRatings = ratings.find((r) => {
          return r.id.toString() === p.id;
        });
        if (hasRatings) return { ...p.toObject(), ...hasRatings };
        return p;
      });
      res.status(200).json(response);
    } else {
      res.status(500).json({
        message:
          "The page and limit parameters must be integer convertable strings greater than zero",
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createProduct = async (req, res) => {
  const {
    body: { name, description, stock, price, categories, isActive },
    files,
  } = req;
  // const categoriesCondition =
  //   categories && Array.isArray(categories) && categories.length > 0;

  try {
    // const validCategories = [];
    // if (true)
    //   for (let i = 0; i < categories.length; i++) {
    //     console.log(categories[i]);
    //     const categoryId = ObjectId(categories[i]);
    //     if (true) {
    //       const isValidCategory = await Category.exists({ _id: categoryId });
    //       if (isValidCategory && !validCategories.includes(categoryId))
    //         validCategories.push(categoryId);
    //     }
    //   }
    const product = {
      name,
      description,
      stock,
      price,
      categories,
      isActive,
    };
    if (files.length > 0) {
      const images = files.map((f) => {
        const defaultPath = join(sep, "api", f.path);
        const image = defaultPath.replaceAll("\\", "/");
        return image;
      });
      product.images = images;
      product.thumbnail = images[0];
    }
    await Product.create(product);
    res.status(200).json({ message: "Product created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProductById = async (req, res) => {
  const {
    body: { name, description, stock, price, categories, isActive },
    files,
    params: { id },
  } = req;
  const productBaseCondition = name || description || categories || isActive;
  const stockCondition =
    stock && Number.isInteger(parseInt(stock)) && parseInt(stock) >= 0;
  const priceCondition =
    price && !Number.isNaN(parseInt(price)) && parseInt(price) >= 0;
  const categoriesCondition =
    categories && Array.isArray(categories) && categories.length > 0;

  try {
    const validCategories = [];
    if (categoriesCondition)
      for (let i = 0; i < categories.length; i++) {
        const categoryId = categories[i];
        if (isValidObjectId(categoryId)) {
          const isValidCategory = await Category.exists({ _id: categoryId });
          if (isValidCategory) validCategories.push(categoryId);
        }
      }
    const product = {
      name,
      description,
      categories: validCategories,
      isActive,
    };
    if (priceCondition) product.price = price;
    if (stockCondition) product.stock = stock;
    if (productBaseCondition) {
      if (files.length > 0) {
        const newImages = files.map((f) => {
          const defaultPath = join(sep, "api", f.path);
          const image = defaultPath.replaceAll("\\", "/");
          return image;
        });
        const { images } = await Product.findById(id);
        if (
          !(
            images.length === 1 &&
            images.includes("/api/images/default/placeholder.png")
          )
        ) {
          for (let i = 0; i < images.length; i++) {
            const filename = images[i].split("/").pop();
            const filePath = join(
              dirname("."),
              "images",
              "product_images",
              filename
            );
            unlink(filePath, (error) => {
              if (error) console.log(error);
            });
          }
        }
        product.images = newImages;
        product.thumbnail = newImages[0];
      }
      await Product.findByIdAndUpdate(id, product);
      res.status(200).json({ message: "Product updated" });
    } else {
      res.status(500).json({ message: "No data provided for category update" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const resetProductImagesById = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const { images } = await Product.findById(id);
    if (
      images.length === 1 &&
      images.includes("/api/images/default/placeholder.png")
    ) {
      res
        .status(500)
        .json({ message: "Product has been already set with default image" });
    } else {
      for (let i = 0; i < images.length; i++) {
        const filename = images[i].split("/").pop();
        const filePath = join(
          dirname("."),
          "images",
          "product_images",
          filename
        );
        unlink(filePath, (error) => {
          if (error) console.log(error);
        });
      }
      await Product.findByIdAndUpdate(id, {
        images: ["/api/images/default/placeholder.png"],
        thumbnail: "/api/images/default/placeholder.png",
      });
      res
        .status(200)
        .json({ message: "Category has been reset with default image" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
