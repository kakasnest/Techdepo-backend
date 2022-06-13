import Category from "../models/category.js";
import { categoryExists } from "../utils/controllerUtils/category.js";
import {
  getAPIPath,
  hasUpdateProp,
  hasUpdateProps,
  unlinkImage,
} from "../utils/controllerUtils/general.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().select(["image", "name"]);
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createCategory = async (req, res) => {
  const {
    body: { name },
    file,
  } = req;

  try {
    if (file) {
      const { path } = file;
      const image = getAPIPath(path);
      await Category.create({ name, image });
    } else {
      await Category.create({ name });
    }
    res.status(200).json({ message: "Category created" });
  } catch (err) {
    if (file) {
      const { path } = file;
      unlinkImage(path);
    }
    res.status(500).json({ message: err.message });
  }
};

export const deleteCategoryById = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    if (await categoryExists(id)) {
      const { image } = await Category.findByIdAndDelete(id);
      unlinkImage(image, "db");
      res.status(200).json({ message: "Category deleted" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCategoryById = async (req, res) => {
  const {
    params: { id },
    file,
    body: { name },
  } = req;

  try {
    if (await categoryExists(id)) {
      if (hasUpdateProps({ file, name })) {
        const { path } = file;
        const image = getAPIPath(path);
        const { image: oldImage } = await Category.findByIdAndUpdate(id, {
          image,
          name,
        });
        unlinkImage(oldImage, "db");
        res.status(200).json({ message: "Category updated" });
      } else if (hasUpdateProp(name)) {
        await Category.findByIdAndUpdate(id, { name });
        res.status(200).json({ message: "Category updated" });
      } else {
        throw new Error("No data provided for category update");
      }
    } else {
      throw new Error("There isn't a category with this id");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const resetCategoryImageById = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    if (await categoryExists(id)) {
      const { image: oldImage } = await Category.findByIdAndUpdate(id, {
        image: "/api/images/default/placeholder.png",
      });
      unlinkImage(oldImage, "db");
      res
        .status(200)
        .json({ message: "Category has been reset with default image" });
    } else {
      throw new Error("There isn't a category with this id");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
