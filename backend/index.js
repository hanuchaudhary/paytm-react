const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { User, Account } = require("./database");
const { signupValidation, signinValidation } = require("./zodValidation");
const { authMiddleware } = require("./middleware");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;
const SECRET = process.env.JWT_SECRET;

//route to signup of user
app.post("/signup", async (req, res) => {
    try {
        const body = req.body;
        const parsedUserData = signupValidation.safeParse(body) //zod validation
        if (!parsedUserData.success) {
            res.status(401).json({
                success: false,
                message: "Wrong Inputs Validation Fails!!!",
                error: parsedUserData.error.errors
            })
            return;
        }

        //if user exists or not!
        const ifUserExists = await User.findOne({ email: body.email })

        if (ifUserExists) {
            res.status(401).json({
                success: false,
                message: "User Already Exists!!!",
            })
            return;
        }

        //hashing password to save in db
        const hashedPassword = await bcrypt.hash(body.password, 10);

        //new user
        const createUser = await new User({
            email: body.email,
            firstName: body.firstName,
            lastName: body.lastName,
            password: hashedPassword,
        })

        //saved in db
        await createUser.save();

        //adding random balance to user via UserId
        const userId = await createUser._id;
        await Account.create({ userId, balance: 1 + Math.random() * 10000 })

        //field used for creating jwt token
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

//route to signin of user
app.post("/signin", async (req, res) => {
    try {
        const body = req.body;
        const parsedUserData = signinValidation.safeParse(body)
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
                message: "User does not Exists or Incorrect Email!!!",
            })
            return;
        }

        //compares the input password to the saved hashed password from the db
        const validPassword = await bcrypt.compare(body.password, ifUserExists.password);

        if (!validPassword) {
            res.status(401).json({
                success: false,
                message: "Password incorrect!"
            });
            return;
        }

        //field for token
        const data = {
            email: ifUserExists.email,
            password: ifUserExists.password
        }

        const token = jwt.sign(data, SECRET, { expiresIn: "1h" });

        res.status(201).json({
            success: true,
            message: "User Login Successfully!!!",
            token: token,
            User: {
                email: ifUserExists.email,
                firstName: ifUserExists.firstName,
                password: ifUserExists.password,
            }
        })

    } catch (error) {
        console.log(error);

        res.status(400).json(
            {
                success: false,
                message: "Login Failed!!!",
                error: error
            }
        )
    }
});

//route to update details of user
app.put("/update", async (req, res, next) => {
    try {
        const body = req.body;
        const parsedUser = signupValidation.safeParse(body);

        if (!parsedUser.success) {
            res.status(401).json({
                success: false,
                message: "Wrong Inputs Validation Fails!!!",
                error: parsedUser.error.errors
            });
            return;
        }

        const ifUserExists = await User.findOne({ email: body.email });
        if (!ifUserExists) {
            res.status(401).json({
                success: false,
                message: "User Does Not Exist or Incorrect Email!!!",
            });
            return;
        }

        const updateData = {
            firstName: body.firstName,
            lastName: body.lastName,
        };

        // Only hash and update password if it is provided
        if (body.password) {
            updateData.password = await bcrypt.hash(body.password, 10);
        }

        await ifUserExists.updateOne(updateData);

        res.status(200).json({
            success: true,
            message: "User Updated Successfully!!!",
            data: {
                email: ifUserExists.email,
                firstName: updateData.firstName || ifUserExists.firstName,
                lastName: updateData.lastName || ifUserExists.lastName,
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "User Update Failed!!!",
            error: error.message
        });
    }
});

//get users
app.get("/bulk", async (req, res) => {
    try {
        const filter = req.query.filter || "";
        const users = await User.find({
            $or: [
                { firstName: { "$regex": filter, "$options": "i" } },
                { lastName: { "$regex": filter, "$options": "i" } }
            ]
        });

        res.status(200).json({
            success: true,
            message: "Users Retrieved Successfully!!!",
            users: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to Retrieve Users!!!",
            error: error.message
        });
    }
});

//account routes-------------------------------------------------

app.get("/balance", authMiddleware, async (req, res ,next) => {
    const account = await Account.findOne({
        userId: req.userId
    });
    
    res.json({
        message : "Balance Fetched!!",
        userId : account.userId,
        balance: account.balance,
    })
});


app.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { amount, to } = req.body;

        // Fetch the accounts within the transaction
        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: "Insufficient balance!!!"
            });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: "Invalid account!!!"
            });
        }

        // Perform the transfer
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        // Commit the transaction
        await session.commitTransaction();
        res.json({
            success: true,
            message: "Transfer successful!!!"
        });
    } catch (error) {
        await session.abortTransaction();
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Transfer failed!!!",
            error: error.message
        });
    } finally {
        session.endSession();
    }
});



app.listen(PORT, () => {
    console.log("App is Running on Port:", PORT);
});
