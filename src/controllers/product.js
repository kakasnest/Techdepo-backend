import { join, sep, dirname } from "path";
import { unlink } from "fs";

import Product from "../models/product.js";
import Review from "../models/review.js";
import Category from "../models/category.js";
import { productRating } from "../utils/product.js";
import {
  alreadyInValidCategories,
  categoryExists,
  hasCategories,
  hasOneCategory,
} from "../utils/category.js";
import { getAPIPath, hasPaginationParams } from "../utils/general.js";

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

export const getProductsByCategoryId = async (req, res) => {
  const {
    query: { page, limit, categoryId },
  } = req;

  try {
    if (hasPaginationParams(page, limit)) {
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
      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const rating = await Review.aggregate(productRating(product._id));
        products[i] = {
          ...product.toObject(),
          id: product._id,
          ...rating[0],
        };
      }
      res.status(200).json(products);
    } else {
      throw new Error(
        "The page and limit parameters must be integers greater than zero"
      );
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

  try {
    const validCategories = [];
    if (hasCategories(categories)) {
      for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        if (await categoryExists(category)) {
          if (!alreadyInValidCategories(validCategories, category))
            validCategories.push(category);
        }
      }
    } else if (hasOneCategory(categories)) {
      if (await categoryExists(categories)) {
        validCategories.push(categories);
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
      const images = files.map(({ path }) => {
        return getAPIPath(path);
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
      res.status(200).json({
        message: "Product images have been reset using default image",
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
