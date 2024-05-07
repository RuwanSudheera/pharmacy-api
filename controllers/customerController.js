const customerService = require('../services/customerService');

exports.createCustomer = async (req, res) => {
    try {
        const customer = await customerService.createCustomer(req.body);
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCustomer = async (req, res) => {
    try {
        const customer = await customerService.getCustomer(req.params.id);
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await customerService.getAllCustomers();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCustomer = async (req, res) => {
    try {
        const updated = await customerService.updateCustomer(req.params.id, req.body);
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        const userRole = req.user.role; 
        const response = await customerService.deleteCustomer(req.params.id, userRole);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.undeleteCustomer = async (req, res) => {
    try {
        const response = await customerService.undeleteCustomer(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
