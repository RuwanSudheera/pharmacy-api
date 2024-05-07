const db = require('../database');

exports.createMedication = (medicationData) => {
    return new Promise((resolve, reject) => {
        const { name, description, quantity, expireDate } = medicationData;
        const sql = `INSERT INTO medications (name, description, quantity, expireDate) VALUES (?, ?, ?, ?)`;
        db.run(sql, [name, description, quantity, expireDate], function(err) {
            if (err) reject(err);
            else resolve({ id: this.lastID, ...medicationData });
        });
    });
};

exports.getMedication = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM medications WHERE id = ?";
        db.get(sql, [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

exports.getAllMedications = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM medications";
        db.all(sql, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

exports.updateMedication = (id, medicationData) => {
    return new Promise((resolve, reject) => {
        const { name, description, quantity, expireDate } = medicationData;
        const sql = `UPDATE medications SET name = ?, description = ?, quantity = ?, expireDate = ? WHERE id = ?`;
        db.run(sql, [name, description, quantity, expireDate, id], function(err) {
            if (err) reject(err);
            else resolve(medicationData);
        });
    });
};

exports.deleteMedication = (id, userRole) => {
    if (userRole === "admin") {
        // Permanent delete for Owner
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM medications WHERE id = ?';
            db.run(sql, id, function(err) {
                if (err) reject(err);
                else resolve({ message: 'Medication permanently deleted' });
            });
        });
    } else {
        // Soft delete for other roles
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE medications SET deleted = 1 WHERE id = ?';
            db.run(sql, id, function(err) {
                if (err) reject(err);
                else resolve({ message: 'Medication soft deleted' });
            });
        });
    }
};

exports.undeleteMedication = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE medications SET deleted = 0 WHERE id = ?';
        db.run(sql, id, function(err) {
            if (err) reject(err);
            else resolve({ message: 'Medication restored' });
        });
    });
};
