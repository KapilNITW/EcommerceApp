import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js';
import JWT from "jsonwebtoken";
import { json } from 'express';
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;
        //validation

        if (!name) return res.send({ message: "Name Field is Required" });
        if (!email) return res.send({ message: "Email Field is Required" });
        if (!password) return res.send({ message: "Password Field is Required" });
        if (!phone) return res.send({ message: "Phone Field is Required" });
        if (!address) return res.send({ message: "Address Field is Required" });
        if (!answer) return res.send({ message: "Answer Field is Required" });
        const existinguser = await userModel.findOne({ email })
        if (existinguser) {
            return res.status(200).send({
                success: true,
                message: "Already Registered please login",
            })
        }

        const hashedPassword = await hashPassword(password)
        const user = await new userModel({ name, email, password: hashedPassword, phone, address, answer }).save();

        res.status(201).send({
            success: true,
            message: "User Registered Successfully",
            user
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        })
    }
};

export const loginController = async (req, res) => {

    try {

        const { email, password } = req.body;
        if (!email || !password) return res.status(404).send({
            success: false,
            message: "Invalid Email or Password"
        })

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not registered."
            })
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(404).send({
                success: false,
                message: "Wrong Password"
            })
        }

        const token = await JWT.sign(
            { _id: user._id },
            process.env.JWT_SECRETKEY,
            { expiresIn: '100d' }
        );
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token
        })
    }

    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        })
    }
}

export const forgotPasswordController = async (req, res) => {
    try {
        const { email, newpassword, answer } = req.body;
        if (!email) return res.status(400).send({ message: "Email Field is Required" });
        if (!newpassword) return res.status(400).send({ message: "New Password Field is Required" });
        if (!answer) return res.status(400).send({ message: "Answer Field is Required" });


        //check
        const user = await userModel.findOne({ email, answer });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email or Answer"
            })
        }

        const hashed = await hashPassword(newpassword)
        await userModel.findByIdAndUpdate(user.id, { password: hashed })
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}


export const testController = async (req, res) => {

    try {
        res.send("Protected Route")
    } catch (error) {
        console.error({ error });
        res.send({ error });
    }
}

export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await userModel.findById(req.user._id);
        //password
        if (password && password.length < 6) {
            return res.json({ error: "Passsword is required and 6 character long" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                address: address || user.address,
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Profile Updated SUccessfully",
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Update profile",
            error,
        });
    }
};