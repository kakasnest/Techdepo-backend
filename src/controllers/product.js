import { join, sep } from "path";

import Product from "../models/product.js";

export const getProductById = async (req, res) => {
  const {
    params: { id },
  } = req;

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
  const product = checkFiles(req);

  try {
    await Product.create(product);
    res.status(201).json({ message: "Product created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const checkFiles = (req) => {
  const {
    body: { name, description, stock, price, categories },
    files,
  } = req;

  if (files.length > 0) {
    const images = files.map((f) => {
      const defaultPath = join(sep, "api", f.path);
      const image = defaultPath.replaceAll("\\", "/");
      return image;
    });

    return { name, description, stock, price, categories, images };
  }

  return { name, description, stock, price, categories };
};

// export const deleteProduct = async (req, res) => {
//   const {
//     params: { id },
//   } = req;

//   try {
//     await Product.findByIdAndDelete(id);
//     res.status(200).json({ message: "Product deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const updateProduct = async (req, res) => {
//   const {
//     body: { name, description, images, stock, price, categories },
//   } = req;
//   const {
//     params: { id },
//   } = req;

//   try {
//     await Product.findByIdAndUpdate(id, {
//       name,
//       description,
//       images,
//       stock,
//       price,
//       categories,
//     });
//     res.status(200).json({ message: "Product updated" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
