import Product from "../models/product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(["categories"]);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const productToGet = await Product.findById(id).populate(["categories"]);
    res.status(200).json(productToGet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addProduct = async (req, res) => {
  const product = req.body.product;

  try {
    const productToCreate = await Product.create(product);
    res.status(200).json(productToCreate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const productToDelete = await Product.findByIdAndDelete(id);
    res.status(200).json(productToDelete);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  const product = req.body.product;
  const id = req.params.id;

  try {
    const productToUpdate = await Product.findByIdAndUpdate(id, product, {
      new: true,
    }).populate(["categories"]);
    res.status(200).json(productToUpdate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
