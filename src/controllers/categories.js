import Category from "../models/category.js";
import Product from "../models/product.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductsByCategoryId = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const productToGet = await Product.where("categories")
      .equals(id)
      .populate(["categories"]);

    res.status(200).json(productToGet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addCategory = async (req, res) => {
  const {
    body: { category },
  } = req;

  try {
    const categoryToCreate = await Category.create(category);
    res.status(200).json(categoryToCreate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const categoryToDelete = await Category.findByIdAndDelete(id);
    res.status(200).json(categoryToDelete);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
