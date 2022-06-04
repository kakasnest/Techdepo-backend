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
        .skip(pageNumber > 0 ? (pageNumber - 1) * 10 : 0)
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

  try {
    const product = { name, description, stock, price, categories, isActive };
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
