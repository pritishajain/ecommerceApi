import fs from "fs";
import productModel from "../models/product.model.js";

const validateProductsFields = (
  name,
  description,
  category,
  price,
  quantity,
  brand,
  image
) => {
  const errors = [];

  switch (true) {
    case !name:
      errors.push({ field: "name", message: "Name is required" });
    case !description:
      errors.push({ field: "description", message: "Description is required" });
    case !category:
        errors.push({ field: 'category', message: 'Category is required' });
    case !price:
      errors.push({ field: "price", message: "Price is required" });
    case !quantity:
      errors.push({ field: "quantity", message: "Quantity is required" });
    case !brand:
      errors.push({ field: "brand", message: "Brand is required" });
    case image && image.size > 1000000:
      errors.push({
        field: "image",
        message: "Image is required and should be less than 1mb",
      });
  }

  return errors;
};

export const createProductController = async (req, res) => {
  try {
    const { name, description, category, subcategory, brand, price, quantity } =
      req.fields;
    const { image } = req.files;

    const errors = validateProductsFields(
      name,
      description,
      category,
      price,
      quantity,
      brand,
      image
    );

    if (errors.length > 0) {
      return res.status(400).send({
        success: false,
        errors,
      });
    }

    const products = new productModel({ ...req.fields });
    if (image) {
      products.image.data = fs.readFileSync(image.path);
      products.image.contentType = image.type;
    }

    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "new product was not created",
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const products = await productModel.find({}).populate("category");
    res.status(200).send({
      success: true,
      message: "Product List",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while getting all Products",
    });
  }
};

export const getByIdProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id).populate("category");
    res.status(200).send({
      success: true,
      message: "successfully got single product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while getting products by id",
    });
  }
};

export const getProductImageController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid);
    if (product.image.data) {
      res.set("Content-type", product.image.contentType);
      return res.status(200).send(product.image.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while getting image",
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, description, category, subcategory, brand, price, quantity } = req.fields;
    const { image } = req.files;

    const errors = validateProductsFields(
      name,
      description,
      category,
      price,
      quantity,
      image
    );

    if (errors.length > 0) {
      return res.status(400).send({
        success: false,
        errors,
      });
    }

    const products = await productModel.findByIdAndUpdate(req.params.id,{...req.fields},{new:true});
    if (image) {
      products.image.data = fs.readFileSync(image.path);
      products.image.contentType = image.type;
    }

    await products.save();
    res.status(201).send({
      success: true,
      message: "Product updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in updating product",
    });
  }
};

export const deleteProductController = async (req,res) => {
    try {
      const {id} = req.params;
  
      const existingProduct = await productModel.findById(id);
      if (!existingProduct) {
        return res.status(404).send({
          success: false,
          message: "Product not found",
        });
      }
     
      await productModel.findByIdAndDelete(id);
      res.status(200).send({
        success:true,
        message:"product deleted successfully"
      })
      
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "error in deleting the product",
      });
    }
  }
