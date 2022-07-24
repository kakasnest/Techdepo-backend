import Product from "../models/product.js";
import Review from "../models/review.js";
import { productRating } from "../utils/controller_related/product.js";
import {
  checkPaginationParams,
  createAPIPath,
} from "../utils/controller_related/general.js";
import { generalPlaceholderPath } from "../utils/database_related/defaultImagePaths.js";

export const getProductById = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const product = await Product.findOne({ _id: id, isActive: true })
      .select(["-createdAt", "-updatedAt", "-__v", "-thumbnail", "-categories"])
      .lean();
    const ratingInfo = await Review.aggregate(productRating(id));
    res.status(200).json({ ...product, ...ratingInfo[0] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductsByCategoryId = async (req, res) => {
  const {
    query: { page, limit, categoryId },
  } = req;

  try {
    if (checkPaginationParams(page, limit)) {
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
        .limit(limit)
        .lean();
      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const ratingInfo = await Review.aggregate(productRating(product._id));
        products[i] = {
          ...product,
          ...ratingInfo[0],
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
    const product = {
      name,
      description,
      stock,
      price,
      categories,
      isActive,
    };
    if (files.length > 0) {
      const images = files.map(({ path }) => {
        return createAPIPath(path);
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

  try {
    const product = {
      name,
      description,
      categories,
      isActive,
      stock,
      price,
    };
    if (files.length > 0) {
      const images = [];
      for (let i = 0; i < files.length; i++) {
        const { path } = files[i];
        const image = createAPIPath(path);
        images.push(image);
      }
      product.images = images;
      product.thumbnail = images[0];
    }
    await Product.findByIdAndUpdate(id, product);
    res.status(200).json({ message: "Product updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const resetProductImagesById = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    await Product.findByIdAndUpdate(id, {
      images: [generalPlaceholderPath],
      thumbnail: generalPlaceholderPath,
    });
    res.status(200).json({
      message: "Product images have been reset using default image",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
