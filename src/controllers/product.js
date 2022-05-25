import Product from "../models/product.js";

export const getProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createProduct = async (req, res) => {
  const product = JSON.parse(req.body.product);
  const images = req.files.map((f) => f.path);

  try {
    await Product.create({
      ...product,
      images,
    });
    res.status(200).json({ message: "Product created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  const product = req.body.product;
  const id = req.params.id;

  try {
    await Product.findByIdAndUpdate(id, product);
    res.status(200).json({ message: "Product updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
