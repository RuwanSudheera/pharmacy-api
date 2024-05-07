const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationController');
const verifyToken = require('../middlewares/auth');

router.post('/', verifyToken, medicationController.createMedication);
router.get('/:id', verifyToken, medicationController.getMedication);
router.get('/', verifyToken, medicationController.getAllMedications);
router.put('/:id', verifyToken, medicationController.updateMedication);
router.delete('/:id', verifyToken, medicationController.deleteMedication);
router.post('/:id/undelete', verifyToken, medicationController.undeleteMedication);

module.exports = router;
