import Category from "../../models/category.js";
import { join, sep } from "path";
import { readdir, unlink } from "fs/promises";
import { cwd } from "process";
import Product from "../../models/product.js";
import Order from "../../models/order.js";
import OrderLine from "../../models/orderLine.js";
import Review from "../../models/review.js";

const removeImages = async (array, dirName) => {
  try {
    const imagesInDB = array.map((element) => {
      const { image } = element;
      return image.split(sep).pop();
    });
    const imageDirPath = join(cwd(), "images", dirName);
    const imagesInDirectory = await readdir(imageDirPath);
    imagesInDirectory.forEach((image) => {
      if (!imagesInDB.includes(image)) {
        const imageToRemove = join(imageDirPath, image);
        unlink(imageToRemove);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUnusedProductImages = async () => {
  try {
    const products = await Product.find().select("images");
    removeImages(products, "product_images");
  } catch (error) {
    console.log(error);
  }
};

export const deleteUnusedCategoryImages = async () => {
  try {
    const categories = await Category.find().select("image");
    removeImages(categories, "category_images");
  } catch (error) {
    console.log(error);
  }
};

export const deleteOrdersWithoutLines = async () => {
  try {
    const orders = await Order.find().select("_id");
    const ordersToDelete = [];
    for (let i = 0; i < orders.length; i++) {
      const { _id: orderId } = orders[i];
      const lines = await OrderLine.find({ orderId });
      if (lines.length === 0) ordersToDelete.push(orderId);
    }
    await Order.deleteMany({
      _id: { $in: ordersToDelete },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteReviewsWithoutProductId = async () => {
  try {
    const reviews = await Review.find().select("productId");
    const reviewsToDelete = [];
    for (let i = 0; i < reviews.length; i++) {
      const { productId, _id } = reviews[i];
      const product = await Product.find({ _id: productId });
      if (product.length === 0) reviewsToDelete.push(_id);
    }
    await Review.deleteMany({
      _id: { $in: reviewsToDelete },
    });
  } catch (error) {
    console.log(error);
  }
};
