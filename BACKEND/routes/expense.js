const express = require('express');

const expenseController = require('../controllers/expense');
const userAuthentication = require('../middleware/auth');

const router = express.Router();

router.post('/addExpense', userAuthentication, expenseController.addExpense);

router.get('/getList', userAuthentication, expenseController.getList);

router.delete('/delList/:expId', userAuthentication, expenseController.delList);

module.exports = router;