import { join, sep, dirname } from "path";
import mongoose from "mongoose";
import { unlink } from "fs";

import Product from "../models/product.js";
import Review from "../models/review.js";
import Category from "../models/category.js";
import { isValidObjectId } from "../utils/mongoIdValidation.js";

const { ObjectId } = mongoose.Types;

export const getProductById = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const product = await Product.findOne({ _id: id, isActive: true })
      .select(["-createdAt", "-updatedAt", "-__v", "-thumbnail"])
      .populate({
        path: "categories",
        model: "Category",
        select: "name",
      });
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

    const rating = ratingData[0];
    const categories = product.categories.map((c) => {
      return { ...c.toObject(), id: c._id };
    });
    res.status(200).json({ ...product.toObject(), ...rating, categories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  const {
    body: { categoryId, pageNumber },
  } = req;

  try {
    if (Number.isInteger(pageNumber) && pageNumber > 0) {
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
        .skip((pageNumber - 1) * 10)
        .limit(10);
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
        message: "The pageNumber must be an integer greater than zero",
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
      stock,
      price,
      categories: validCategories,
      isActive,
    };
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

export const updateProduct = async (req, res) => {
  const {
    body: { name, description, images, stock, price, categories, isActive },
    params: { id },
    files,
  } = req;
  const productBaseCondition = name || description || categories || isActive;
  const stockCondition = stock && Number.isInteger(stock) && stock >= 0;
  const priceCondition = price && !Number.isNaN(price) && price >= 0;

  try {
    if (priceCondition && stockCondition) {
      await Product.findByIdAndUpdate(id, {
        name,
        description,
        stock,
        price,
        images,
        categories,
        isActive,
      });
      res.status(200).json({ message: "Product updated" });
    } else if (stockCondition) {
      await Product.findByIdAndUpdate(id, {
        name,
        description,
        stock,
        images,
        categories,
        isActive,
      });
      res.status(200).json({ message: "Product updated" });
    } else if (priceCondition) {
      await Product.findByIdAndUpdate(id, {
        name,
        description,
        price,
        images,
        categories,
        isActive,
      });
      res.status(200).json({ message: "Product updated" });
    } else if (productBaseCondition) {
      await Product.findByIdAndUpdate(id, {
        name,
        description,
        images,
        categories,
        isActive,
      });
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
      images.includes("/api/images/default/placeholder.png") &&
      images.length === 1
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
      });
      res
        .status(200)
        .json({ message: "Category has been reset with default image" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
