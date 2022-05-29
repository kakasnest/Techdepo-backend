import { join, sep } from "path";

import Category from "../models/category.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createCategory = async (req, res) => {
  if (req.file) {
    const {
      body: { name },
      file: { path },
    } = req;
    const defaultPath = join(sep, "api", path);
    const image = defaultPath.replaceAll("\\", "/");

    try {
      await Category.create({ name, image });
      res.status(200).json({ message: "Category created" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    const {
      body: { name },
    } = req;

    try {
      await Category.create({ name });
      res.status(200).json({ message: "Category created" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
// export const deleteCategory = async (req, res) => {
//   const {
//     params: { id },
//   } = req;

//   try {
//     await Category.findByIdAndDelete(id);
//     res.status(200).json({ message: "Category deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

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
