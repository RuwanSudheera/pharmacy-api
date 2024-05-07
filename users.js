const express = require('express');
const db = require('./database');
const router = express.Router();

// Create User
router.post('/users', (req, res) => {
    const { name, username, password, role } = req.body;
    const sql = `INSERT INTO users (name, username, password, role) VALUES (?, ?, ?, ?)`;
    db.run(sql, [name, username, password, role], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'User Created Successfully',
            data: req.body,
            id: this.lastID
        });
    });
});

// Read User
router.get('/users/:id', (req, res) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: "Success",
            data: row
        });
    });
});

// Update User
router.put('/users/:id', (req, res) => {
    const { name, username, password, role } = req.body;
    const sql = `UPDATE users SET name = ?, username = ?, password = ?, role = ? WHERE id = ?`;
    db.run(sql, [name, username, password, role, req.params.id], function(err) {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json({ message: "User Updated", changes: this.changes });
    });
});

// Delete User
router.delete('/users/:id', (req, res) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    db.run(sql, req.params.id, function(err) {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json({message: 'Deleted', changes: this.changes});
    });
});

module.exports = router;
