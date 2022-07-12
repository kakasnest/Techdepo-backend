import Category from "../../models/category.js";
import { join, sep } from "path";
import { readdir, unlink } from "fs/promises";
import { cwd } from "process";
import Product from "../../models/product.js";
import Order from "../../models/order.js";
import OrderLine from "../../models/orderLine.js";

export const deleteUnusedProductImages = async () => {
  console.log("Hello world");
  //   try {
  //     const products = await Product.find().select("images");
  //     const imagesInDB = products.map((product) => {
  //       const { image } = product;
  //       return image.split(sep).pop();
  //     });
  //     const imageDirPath = join(cwd(), "images", "product_images");
  //     const imagesInDirectory = await readdir(imageDirPath);
  //     imagesInDirectory.forEach((image) => {
  //       if (!imagesInDB.includes(image)) {
  //         const imageToRemove = join(imageDirPath, image);
  //         unlink(imageToRemove);
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
};

export const deleteUnusedCategoryImages = async () => {
  try {
    const categories = await Category.find().select("image");
    const imagesInDB = categories.map((category) => {
      const { image } = category;
      return image.split(sep).pop();
    });
    const imageDirPath = join(cwd(), "images", "category_images");
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

export const deleteOrdersWithoutLines = async () => {
  try {
    const orders = await Order.find().select("_id");
    for (let i = 0; i < orders.length; i++) {
      const { _id: orderId } = orders[i];
      const lines = await OrderLine.find({ orderId });
      if (lines.length === 0) await Order.findByIdAndDelete(orderId);
    }
  } catch (error) {
    console.log(error);
  }
};
