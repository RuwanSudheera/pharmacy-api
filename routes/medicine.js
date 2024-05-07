const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');
const verifyToken = require('../middlewares/auth');

router.post('/', verifyToken, medicineController.createMedicine);
router.get('/:id', verifyToken, medicineController.getMedicine);
router.get('/', verifyToken, medicineController.getAllMedicines);
router.put('/:id', verifyToken, medicineController.updateMedicine);
router.delete('/:id', verifyToken, medicineController.deleteMedicine);

module.exports = router;
