const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(process.env.DB_PATH, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error when connecting to the database', err.message);
    } else {
        console.log('Database connected.');

        // Create the users table if it does not exist
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error("Error creating users table", err.message);
            }
        });

        // Create the medications table if it does not exist
        db.run(`CREATE TABLE IF NOT EXISTS medications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            quantity INTEGER NOT NULL,
            expireDate DATE,
            deleted BOOLEAN DEFAULT 0
        )`, (err) => {
            if (err) {
                console.error("Error creating medications table", err.message);
            }
        });

        // Create the Medicine table if it does not exist
        db.run(`CREATE TABLE IF NOT EXISTS medicines (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            quantity INTEGER,
            price INTEGER
        )`, (err) => {
            if (err) {
                console.error("Error creating medicines table", err.message);
            }
        });

        // Create the Customer table if it does not exist
        db.run(`CREATE TABLE IF NOT EXISTS customers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT NOT NULL,
            age INTEGER,
            deleted BOOLEAN DEFAULT 0
        )`, (err) => {
            if (err) {
                console.error("Error creating customers table", err.message);
            }
        });
    }
});

module.exports = db;
