const asyncHandler = require("express-async-handler");
const UserM = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }

    const availableUser = await UserM.findOne({ email });
    if (availableUser) {
        res.status(400);
        throw new Error("User already registered");
    }

    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserM.create({
        username: username,
        email: email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json(user);
        console.log("User created")
    } else {
        res.status(400)
        console.log("User data is not valid")
    }

    res.json({ message: "Registered" })
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All the fields are mandatory")
    }

    const user = await UserM.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: "1m" }
        );
        res.status(200).json({ accessToken })
    } else {
        res.status(401);
        throw new Error("Email or password not valid")
    }
})

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})

module.exports = { currentUser, login, registerUser }