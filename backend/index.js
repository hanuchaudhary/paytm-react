const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { User } = require("./database");
const { userValidation } = require("./zodValidation");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;
const SECRET = process.env.JWT_SECRET;

app.post("/signup", async (req, res) => {
    try {
        const body = req.body;
        const parsedUserData = userValidation.safeParse(body)
        if (!parsedUserData.success) {
            res.status(401).json({
                success: false,
                message: "Wrong Inputs Validation Fails!!!",
                error: parsedUserData.error.errors
            })
            return;
        }

        const ifUserExists = await User.findOne({ email: body.email })

        if (ifUserExists) {
            res.status(401).json({
                success: false,
                message: "User Already Exists!!!",
            })
            return;
        }

        const hashedPassword = await bcrypt.hash(body.password ,10);

        const createUser = await new User({
            email: body.email,
            firstName: body.firstName,
            lastName: body.lastName,
            password: hashedPassword,
        })

        await createUser.save();

        const data = {
            id: createUser._id,
            email: createUser.email
        }

        const token = jwt.sign(data, SECRET, { expiresIn: "1h" });

        res.status(201).json({
            success: true,
            message: "User Created Successfully!!!",
            token: token,
            user: {
                email: createUser.email,
                firstName: createUser.firstName,
                password: createUser.password,
            }
        })

    } catch (error) {
        console.log(error);
        
        res.status(400).json(
            {
                success: false,
                message: "Signup Failed!!!",
                error: error
            }
        )
    }
});

app.post("/signin", async (req, res) => {
    try {
        const body = req.body;
        const parsedUserData = userValidation.safeParse(body)
        if (!parsedUserData.success) {
            res.status(401).json({
                success: false,
                message: "Wrong Inputs Validation Fails!!!",
                error: parsedUserData.error.errors
            })
            return;
        }

        const ifUserExists = await User.findOne({ email: body.email })

        if (!ifUserExists) {
            res.status(401).json({
                success: false,
                message: "User Not Exists!!!",
            })
            return;
        }

        // const hashedPassword = await bcrypt.hash(body.password ,10);

        // const createUser = await new User({
        //     email: body.email,
        //     firstName: body.firstName,
        //     lastName: body.lastName,
        //     password: hashedPassword,
        // })

        // await createUser.save();

        const data = {
            id: createUser._id,
            email: createUser.email
        }

        const token = jwt.sign(data, SECRET, { expiresIn: "1h" });

        res.status(201).json({
            success: true,
            message: "User Created Successfully!!!",
            token: token,
            user: {
                email: createUser.email,
                firstName: createUser.firstName,
                password: createUser.password,
            }
        })

    } catch (error) {
        console.log(error);
        
        res.status(400).json(
            {
                success: false,
                message: "Signup Failed!!!",
                error: error
            }
        )
    }
});



app.listen(PORT, () => {
    console.log("App is Running on Port:", PORT);
});
