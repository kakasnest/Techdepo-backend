import { join, sep } from "path";
import { unlink } from "fs";

import Category from "../models/category.js";

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
      const defaultPath = join(sep, "api", path);
      const image = defaultPath.replaceAll("\\", "/");
      await Category.create({ name, image });
    } else {
      await Category.create({ name });
    }
    res.status(200).json({ message: "Category created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCategoryById = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const { image } = await Category.findByIdAndDelete(id);
    // unlink();
    console.log(image);
    res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export const updateCategory = async (req, res) => {
//   const {
//     params: { id },
//   } = req;
//   const {
//     body: { name },
//   } = req;

//   try {
//     await Category.findByIdAndUpdate(id, { name });
//     res.status(200).json({ message: "Category updated" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
