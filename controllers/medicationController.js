const medicationService = require('../services/medicationService');

exports.createMedication = async (req, res) => {
    try {
        const userRole = req.user.role;
        if(userRole !== 'admin') {
            return res.status(500).json({ success: false, message: 'Only admin allowed adding customers' });
        }
        const medication = await medicationService.createMedication(req.body);
        res.status(201).json({success: true, data: medication});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getMedication = async (req, res) => {
    try {
        const medication = await medicationService.getMedication(req.params.id);
        res.status(200).json({success: true, data: medication});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllMedications = async (req, res) => {
    try {
        const medications = await medicationService.getAllMedications();
        res.status(200).json({success: true, data: medications});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateMedication = async (req, res) => {
    try {
        const updated = await medicationService.updateMedication(req.params.id, req.body);
        res.status(200).json({success: true, data: updated});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteMedication = async (req, res) => {
    try {
        const userRole = req.user.role;
        if(userRole !== 'admin' && userRole !== 'manager') {
            return res.status(500).json({ success: false, message: 'Only admin/manager can soft delete medication' });
        }
        const response = await medicationService.deleteMedication(req.params.id);
        res.status(200).json({success: true, data: response});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.permanentDeleteMedication = async (req, res) => {
    try {
        const userRole = req.user.role;  
        if(userRole !== 'admin') {
            return res.status(500).json({ success: false, message: 'Only admin allowed permanent delete medication' });
        }
        const response = await medicationService.permanentDeleteMedication(req.params.id);
        res.status(200).json({success: true, data: response});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.undeleteMedication = async (req, res) => {
    try {
        const userRole = req.user.role;
        if(userRole !== 'admin') {
            return res.status(500).json({ message: 'Only admin allowed un-delete customers' });
        }
        const response = await medicationService.undeleteMedication(req.params.id);
        res.status(200).json({success: true, data: response});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
