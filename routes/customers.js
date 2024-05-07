const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const verifyToken = require('../middlewares/auth');

router.post('/', verifyToken, customerController.createCustomer);
router.get('/:id', verifyToken, customerController.getCustomer);
router.get('/', verifyToken, customerController.getAllCustomers);
router.put('/:id', verifyToken, customerController.updateCustomer);
router.delete('/:id', verifyToken, customerController.deleteCustomer);
router.post('/:id/undelete', verifyToken, customerController.undeleteCustomer);

module.exports = router;
