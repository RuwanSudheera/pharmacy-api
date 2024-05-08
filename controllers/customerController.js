const customerService = require('../services/customerService');

exports.createCustomer = async (req, res) => {
    try {
        const userRole = req.user.role;
        if(userRole !== 'admin') {
            return res.status(500).json({ success: false, message: 'Only admin allowed creation new customers' });
        }
        const customer = await customerService.createCustomer(req.body);
        res.status(201).json({ success: true, data: customer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getCustomer = async (req, res) => {
    try {
        const customer = await customerService.getCustomer(req.params.id);
        res.status(200).json({success: true, data: customer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await customerService.getAllCustomers();
        res.status(200).json({success: true, data: customers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateCustomer = async (req, res) => {
    try {
        const updated = await customerService.updateCustomer(req.params.id, req.body);
        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        const userRole = req.user.role; 
        if(userRole !== 'admin' && userRole !== 'manager') {
            return res.status(500).json({ success: false, message: 'Only admin/manager can soft delete customers' });
        }
        const response = await customerService.deleteCustomer(req.params.id);
        res.status(200).json({success: true, data: response});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.permanentDeleteCustomer = async (req, res) => {
    try {
        const userRole = req.user.role; 
        if(userRole !== 'admin') {
            return res.status(500).json({ success: false, message: 'Only admin can permanent delete customers' });
        }
        const response = await customerService.permanentDeleteCustomer(req.params.id);
        res.status(200).json({success: true, data: response});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.undeleteCustomer = async (req, res) => {
    try {
        const userRole = req.user.role;
        if(userRole !== 'admin') {
            return res.status(500).json({ success: false, message: 'Only admin allowed un-delete customers' });
        }
        const response = await customerService.undeleteCustomer(req.params.id);
        res.status(200).json({success: true, data: response});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
