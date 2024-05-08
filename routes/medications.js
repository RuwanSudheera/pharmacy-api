const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationController');
const verifyToken = require('../middlewares/auth');

router.post('/', verifyToken, medicationController.createMedication);  // new medication create
router.get('/:id', verifyToken, medicationController.getMedication);
router.get('/', verifyToken, medicationController.getAllMedications);
router.put('/:id', verifyToken, medicationController.updateMedication);
router.delete('/:id', verifyToken, medicationController.deleteMedication); // soft delete
router.delete('/permanent/:id', verifyToken, medicationController.permanentDeleteMedication); // permanent delete
router.post('/:id/undelete', verifyToken, medicationController.undeleteMedication); // un-delete soft deleted medication

module.exports = router;
