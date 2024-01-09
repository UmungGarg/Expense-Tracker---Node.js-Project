const express = require('express');

const expenseController = require('../controllers/expense');

const router = express.Router();

router.post('/addExpense', expenseController.addExpense);

router.get('/getList', expenseController.getList);

router.delete('/delList/:expId', expenseController.delList);

module.exports = router;