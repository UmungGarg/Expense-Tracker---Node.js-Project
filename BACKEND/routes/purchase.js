const express = require('express');

const purchaseController = require('../controllers/purchase');
const userAuthentication = require('../middleware/auth');

const router = express.Router();

router.get('/premiummembership', userAuthentication, purchaseController.premiumMembership);

router.post('/updatetransactionstatus', userAuthentication, purchaseController.updateTransactionStatus);

module.exports = router;