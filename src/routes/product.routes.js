import { Router } from "express";
import { isAdmin, requireSignIn } from "../middlewares/auth.middleware.js";
import {
  createProductController,
  deleteProductController,
  getByIdProductController,
  getProductController,
  getProductImageController,
  updateProductController,
} from "../controllers/product.controller.js";
import formidable from "express-formidable";

const router = Router();

router.post(
  "/products",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

router.put('/products/:id' ,requireSignIn , isAdmin, formidable(), updateProductController);

router.get("/products", getProductController);

router.get("/products/:id", getByIdProductController);

router.get("/productImage/:pid", getProductImageController);

router.delete('/products/:id' ,requireSignIn, isAdmin, deleteProductController);

export default router;
