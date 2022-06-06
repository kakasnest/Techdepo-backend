import { join, sep, dirname } from "path";
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
    if (image === "/api/images/default/placeholder.png") {
      res.status(200).json({ message: "Category deleted" });
    } else {
      const filename = image.split("/").pop();
      const filePath = join(
        dirname("."),
        "images",
        "category_images",
        filename
      );
      unlink(filePath, () => {
        res.status(200).json({ message: "Category deleted" });
      });
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
    if (file) {
      const { path } = file;
      const defaultPath = join(sep, "api", path);
      const image = defaultPath.replaceAll("\\", "/");
      const { image: oldImage } = await Category.findByIdAndUpdate(id, {
        image,
        name,
      });
      if (oldImage !== "/api/images/default/placeholder.png") {
        const filename = oldImage.split("/").pop();
        const filePath = join(
          dirname("."),
          "images",
          "category_images",
          filename
        );
        unlink(filePath, (error) => {
          if (error) console.log(error);
          res.status(200).json({ message: "Category updated" });
        });
      } else {
        res.status(200).json({ message: "Category updated" });
      }
    } else if (name) {
      await Category.findByIdAndUpdate(id, { name });
      res.status(200).json({ message: "Category updated" });
    } else {
      res.status(500).json({
        message: "No data provided for category update",
      });
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
    const { image } = await Category.findById(id);
    if (image === "/api/images/default/placeholder.png") {
      res
        .status(500)
        .json({ message: "Category has been already set with default image" });
    } else {
      const filename = image.split("/").pop();
      const filePath = join(
        dirname("."),
        "images",
        "category_images",
        filename
      );
      unlink(filePath, async (error) => {
        if (error) console.log(error);
        await Category.findByIdAndUpdate(id, {
          image: "/api/images/default/placeholder.png",
        });
        res
          .status(200)
          .json({ message: "Category has been reset with default image" });
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
