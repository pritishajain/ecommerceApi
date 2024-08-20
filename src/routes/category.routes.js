import { Router } from "express";
import { isAdmin, requireSignIn } from "../middlewares/auth.middleware.js";
import { createCategoryController, deleteCategoryController, getByIdCategoryController, getCategoryController, updateCategoryController } from "../controllers/category.controller.js";


const router = Router();

router.post('/categories', requireSignIn , isAdmin , createCategoryController);

router.put('/categories/:id' ,requireSignIn , isAdmin, updateCategoryController);

router.get('/categories' , getCategoryController);

router.get('/categories/:id' , getByIdCategoryController);

router.delete('/categories/:id' ,requireSignIn, isAdmin, deleteCategoryController);

export default router;  