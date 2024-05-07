const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3500;

app.use(express.json());

// Import routes
const userRoutes = require('./routes/users');
const medicationRoutes = require('./routes/medications');
const medicineRoutes = require('./routes/medicine');
const customerRoutes = require('./routes/customers');

// Use routes
app.use('/users', userRoutes);
app.use('/medications', medicationRoutes);
app.use('/medicines', medicineRoutes);
app.use('/customers', customerRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Pharmacy Management System');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
