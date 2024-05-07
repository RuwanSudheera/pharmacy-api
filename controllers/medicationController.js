const medicationService = require('../services/medicationService');

exports.createMedication = async (req, res) => {
    try {
        const medication = await medicationService.createMedication(req.body);
        res.status(201).json(medication);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMedication = async (req, res) => {
    try {
        const medication = await medicationService.getMedication(req.params.id);
        res.status(200).json(medication);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllMedications = async (req, res) => {
    try {
        const medications = await medicationService.getAllMedications();
        res.status(200).json(medications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateMedication = async (req, res) => {
    try {
        const updated = await medicationService.updateMedication(req.params.id, req.body);
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteMedication = async (req, res) => {
    try {
        const userRole = req.user.role;  
        const response = await medicationService.deleteMedication(req.params.id, userRole);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.undeleteMedication = async (req, res) => {
    try {
        const response = await medicationService.undeleteMedication(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
