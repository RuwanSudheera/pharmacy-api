const db = require('../database');

exports.createCustomer = (customerData) => {
    return new Promise((resolve, reject) => {
        const { name, email, phone } = customerData;
        const sql = `INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)`;
        db.run(sql, [name, email, phone], function(err) {
            if (err) reject(err);
            else resolve({ id: this.lastID, ...customerData });
        });
    });
};

exports.getCustomer = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM customers WHERE id = ?";
        db.get(sql, [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

exports.getAllCustomers = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM customers";
        db.all(sql, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

exports.updateCustomer = (id, customerData) => {
    return new Promise((resolve, reject) => {
        const { name, email, phone } = customerData;
        const sql = `UPDATE customers SET name = ?, email = ?, phone = ? WHERE id = ?`;
        db.run(sql, [name, email, phone, id], function(err) {
            if (err) reject(err);
            else resolve(customerData);
        });
    });
};

exports.deleteCustomer = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE customers SET deleted = 1 WHERE id = ?';
        db.run(sql, id, function(err) {
            if (err) reject(err);
            else resolve({ message: 'Customer soft deleted' });
        });
    });
};

exports.permanentDeleteCustomer = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM customers WHERE id = ?';
        db.run(sql, id, function(err) {
            if (err) reject(err);
            else resolve({ message: 'Customer permanently deleted' });
        });
    });
}

exports.undeleteCustomer = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE customers SET deleted = 0 WHERE id = ?';
        db.run(sql, id, function(err) {
            if (err) reject(err);
            else resolve({ message: 'Customer restored' });
        });
    });
};
