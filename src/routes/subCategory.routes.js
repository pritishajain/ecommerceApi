import { Router } from "express";
import { isAdmin, requireSignIn } from "../middlewares/auth.middleware.js";
import { createSubCategoryController, deleteSubCategoryController, getByIdSubCategoryController, getSubCategoryController, updateSubCategoryController } from "../controllers/subCategory.controller.js";

const router = Router();

router.post('/sub-categories', requireSignIn , isAdmin , createSubCategoryController);

router.put('/sub-categories/:id' ,requireSignIn , isAdmin, updateSubCategoryController);

router.get('/sub-categories' , getSubCategoryController);

router.get('/sub-categories/:id' , getByIdSubCategoryController);

router.delete('/sub-categories/:id' ,requireSignIn, isAdmin, deleteSubCategoryController);

export default router;  