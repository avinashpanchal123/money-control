const express = require('express');
const router =  express.Router();
const transactionController = require('./../controllers/transactionController');

router.get('/', transactionController.getAllTransactions);
router.post('/add', transactionController.addTransaction);
router.post('/edit', transactionController.editTransaction);
router.post('/delete', transactionController.deleteTransaction)

module.exports = router