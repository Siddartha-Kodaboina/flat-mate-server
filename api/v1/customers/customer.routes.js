const express = require('express');
const router = express.Router();
const customerController = require('./customer.controller');

router.get('/', customerController.listCustomers);
router.post('/', customerController.createCustomer);
router.get('/uid/:uid', customerController.getCustomerByUID);
router.get('/id/:id', customerController.getCustomer);
router.put('/uid/:uid', customerController.updateCustomerByUID);
router.put('/id//:id', customerController.updateCustomer);
router.delete('/uid/:uid', customerController.deleteCustomerByUID);
router.delete('/id//:id', customerController.deleteCustomer);

module.exports = router;
