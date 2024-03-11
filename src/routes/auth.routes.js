import { Router } from "express";
import { registerController, loginController, forgotPasswordController } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', registerController);

router.post('/login', loginController);

router.post('/forgot-password', forgotPasswordController)

export default router;  