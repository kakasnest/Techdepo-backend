import Category from "../models/category.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCategory = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const categoryToGet = await Category.findById(id);
    res.status(200).json(categoryToGet);
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
