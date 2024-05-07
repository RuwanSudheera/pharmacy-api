const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = require('../services/userService');

exports.createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await userService.getUser(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updated = await userService.updateUser(req.params.id, req.body);
        if (updated) {
            res.status(200).json(updated);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deleted = await userService.deleteUser(req.params.id);
        if (deleted) {
            res.status(200).json({ message: 'User deleted' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.signup = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({ message: "User created successfully", data : user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userService.findByUsername(username);
        if (!user) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const token = jwt.sign(
                { userId: user.id, username: user.username, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({ message: "Authentication successful", token });
        } else {
            res.status(401).json({ message: "Authentication failed" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
