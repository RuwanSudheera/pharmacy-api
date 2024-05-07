const db = require('../database');

exports.createMedicine = (medicineData) => {
    return new Promise((resolve, reject) => {
        const { name, description, quantity, expireDate } = medicineData;
        const sql = `INSERT INTO medicines (name, description, quantity, price) VALUES (?, ?, ?, ?)`;
        db.run(sql, [name, description, quantity, expireDate], function(err) {
            if (err) reject(err);
            else resolve({ id: this.lastID, ...medicineData });
        });
    });
};

exports.getMedicine = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM medicines WHERE id = ?";
        db.get(sql, [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

exports.getAllMedicines = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM medicines";
        db.all(sql, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

exports.updateMedicine = (id, medicineData) => {
    return new Promise((resolve, reject) => {
        const { name, description, quantity, expireDate } = medicineData;
        const sql = `UPDATE medicines SET name = ?, description = ?, quantity = ?, price = ? WHERE id = ?`;
        db.run(sql, [name, description, quantity, expireDate, id], function(err) {
            if (err) reject(err);
            else resolve(medicineData);
        });
    });
};

exports.deleteMedicine = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM medicines WHERE id = ?';
        db.run(sql, id, function(err) {
            if (err) reject(err);
            else resolve(true);
        });
    });
};
