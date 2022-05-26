import Category from "../models/category.js";

export const getCategories = async (req, res) => {
  const { query } = req;
  try {
    const categories = await Category.find({ ...query });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createCategory = async (req, res) => {
  const {
    body: { name },
  } = req;
  //TODO: image to each category! create, update, delete
  //const image = req.file.path

  try {
    await Category.create({ name });
    res.status(200).json({ message: "Category created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCategory = async (req, res) => {
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

export const updateCategory = async (req, res) => {
  const {
    params: { id },
  } = req;
  const {
    body: { name },
  } = req.body.category;

  try {
    await Category.findByIdAndUpdate(id, { name });
    res.status(200).json({ message: "Category updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
