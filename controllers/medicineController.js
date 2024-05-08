const medicineService = require('../services/medicineService');

exports.createMedicine = async (req, res) => {
    try {
        const medicine = await medicineService.createMedicine(req.body);
        res.status(201).json({success: true, data: medicine});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getMedicine = async (req, res) => {
    try {
        const medicine = await medicineService.getMedicine(req.params.id);
        res.status(200).json({success: true, data: medicine});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllMedicines = async (req, res) => {
    try {
        const medicines = await medicineService.getAllMedicines();
        res.status(200).json({success: true, data: medicines});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateMedicine = async (req, res) => {
    try {
        const updated = await medicineService.updateMedicine(req.params.id, req.body);
        res.status(200).json({success: true, data: updated});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteMedicine = async (req, res) => {
    try {
        const deleted = await medicineService.deleteMedicine(req.params.id);
        res.status(200).json({success: true, message: 'Medicine deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
