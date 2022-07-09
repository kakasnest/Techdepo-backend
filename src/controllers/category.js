import Category from "../models/category.js";
import { convertBackslashesToSlashes } from "../utils/controller_related/general.js";
import { generalPlaceholderPath } from "../utils/database_related/defaultPathsForImages.js";
import { hasUpdateProps, unlinkImage } from "../utils/general.js";

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
      const image = convertBackslashesToSlashes(path);
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
    const { image } = await Category.findByIdAndDelete(id);
    unlinkImage(image, "db");
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
      const image = convertBackslashesToSlashes(path);
      const { image: oldImage } = await Category.findByIdAndUpdate(
        id,
        { name, image },
        {
          runValidators: true,
        }
      );
      unlinkImage(oldImage, "db");
    } else {
      await Category.findByIdAndUpdate(id, { name });
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
    const { image: oldImage } = await Category.findByIdAndUpdate(id, {
      image: generalPlaceholderPath,
    });
    unlinkImage(oldImage, "db");
    res.status(200).json({ message: "Category image reset" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
