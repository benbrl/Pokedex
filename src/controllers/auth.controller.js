const UserService = require("../services/user.service");
const bcrypt = require('../../node_modules/bcrypt');
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const body = req.body;
        const userService = new UserService();
        const user = await userService.createUser(body);
        res.status(201).send({ message: "User registered successfully" });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userService = new UserService();

        const user = await userService.getUserByEmail(email);

        if (!user) {
            return res.status(400).send({ error: "Invalid email or password" });
        }

        const Secretoken = process.env.TOKEN_SECRET;

        const isPasswordValid = await userService.verifyPassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send({ error: "Invalid email or password" });
        }
        const token = jwt.sign(
            { userId: user._id },
            Secretoken,
            { expiresIn: '24h' }
        )
       
        res.status(200).send({ userId: user._id, token: token });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};