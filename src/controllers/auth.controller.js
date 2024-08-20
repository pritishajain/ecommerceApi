import userModel from "../models/auth.model.js";
import { comparePassword, hashPassword } from './../utils/auth.utils.js';
import JWT from "jsonwebtoken";

const validateRegistration = (name, email, password, confirmPassword, answer) => {
    const errors = [];

    if (!name || name.trim() === '') {
        errors.push({ field: 'name', message: 'Name is required' });
    }
    if (!email || !validateEmail(email)) {
        errors.push({ field: 'email', message: 'Invalid email' });
    }
    if (!password || password.length < 6) {
        errors.push({ field: 'password', message: 'Password must be at least 6 characters long' });
    }
    if (!confirmPassword || password !== confirmPassword) {
        errors.push({ field: 'confirmPassword', message: 'password and confirmPassword doen not match' });
    }
    if (!answer) {
        errors.push({ field: 'answer', message: 'Answer is required' });
    }
    return errors;
};

const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
};

const adminEmail = 'pritisha@admin.com'

export const registerController = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, answer } = req.body;

        const isAdmin = (email === adminEmail);

        const errors = validateRegistration(name, email, password, confirmPassword, answer);

        if (errors.length > 0) {
            return res.status(400).send({
                success: false,
                errors
            })
        }

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: 'User already exit, Please login!'
            })
        }

        const hashedPassword = await hashPassword(password)
        const user = await new userModel({ name, email, password: hashedPassword, confirmPassword, answer, isAdmin }).save();

        res.status(200).send({
            success: true,
            message: "User Registered successfully",
            user,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'error in registration',
            error
        })
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'enter email and password'
            })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            })
        }

        const matched = await comparePassword(password, user.password)

        if (!matched) {
            return res.status(404).send({
                success: false,
                message: 'Incorrect password'
            })
        }

        const isAdmin = (user.email === adminEmail);

        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.status(200).send({
            success: true,
            message: 'login successfully',
            token,
            isAdmin,
            user,
            data: {
                name: user.name,
                email: user.email
            }
        }
        )

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error in login"
        })
    }
}

export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(400).send({ message: 'email is required' })
        }
        if (!answer) {
            res.status(400).send({ message: 'answer is required' })
        }
        if (!newPassword) {
            res.status(400).send({ message: 'password is required' })
        }

        const user = await userModel.findOne({ email, answer })

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Incorrect email or answer'
            })
        }

        const hashedPassword = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashedPassword })
        res.status(200).send({
            success: true,
            message: 'Password reset successfully'
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}
