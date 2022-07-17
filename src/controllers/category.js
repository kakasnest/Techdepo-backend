import Category from "../models/category.js";
import { generalPlaceholderPath } from "../utils/database_related/defaultImagePaths.js";
import { createAPIPath } from "../utils/controller_related/general.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().select(["image", "name"]).lean();
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
      const image = createAPIPath(path);
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
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted" });
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
    if (file) {
      const { path } = file;
      const image = createAPIPath(path);
      await Category.findByIdAndUpdate(
        id,
        { image, name },
        {
          runValidators: true,
        }
      );
    } else {
      await Category.findByIdAndUpdate(id, { name }, { runValidators: true });
    }
    res.status(200).json({ message: "Category updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const resetCategoryImageById = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    await Category.findByIdAndUpdate(id, {
      image: generalPlaceholderPath,
    });
    res.status(200).json({ message: "Category image reset" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
