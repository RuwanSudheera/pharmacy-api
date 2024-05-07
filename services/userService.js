const db = require('../database');
const bcrypt = require('bcrypt');

exports.createUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10); 
    return new Promise((resolve, reject) => {
        const { name, username, role } = userData;
        const sql = `INSERT INTO users (name, username, password, role) VALUES (?, ?, ?, ?)`;
        db.run(sql, [name, username, hashedPassword, role], function(err) {
            if (err) reject(err);
            else resolve({ id: this.lastID, name, username, role });
        });
    });
};

exports.getUser = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE id = ?";
        db.get(sql, [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

exports.updateUser = (id, userData) => {
    return new Promise((resolve, reject) => {
        const { name, username, password, role } = userData;
        const sql = `UPDATE users SET name = ?, username = ?, password = ?, role = ? WHERE id = ?`;
        db.run(sql, [name, username, password, role, id], function(err) {
            if (err) reject(err);
            else resolve(userData);
        });
    });
};

exports.deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM users WHERE id = ?';
        db.run(sql, id, function(err) {
            if (err) reject(err);
            else resolve(true);
        });
    });
};

exports.findByUsername = (username) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE username = ?";
        db.get(sql, [username], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};