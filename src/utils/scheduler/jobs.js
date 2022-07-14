import Category from "../../models/category.js";
import { join, sep } from "path";
import { readdir, unlink } from "fs/promises";
import { cwd } from "process";
import Product from "../../models/product.js";

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
    const products = await Product.find().select("images").lean();
    removeImages(products, "product_images");
  } catch (error) {
    console.log(error);
  }
};

export const deleteUnusedCategoryImages = async () => {
  try {
    const categories = await Category.find().select("image").lean();
    removeImages(categories, "category_images");
  } catch (error) {
    console.log(error);
  }
};
