const category = require('../db/models/category');
const Category = require('../db/models/category');
const Transaction = require('./../db/models/transation');
const async = require('async')

const getAllTransactions = async (req, res) => {
    let allCategories = {

    }
    try {
        const categoryList = await Category.findAll({
            where: {
                user_id: 1
            }
        })

        if (!categoryList)
            return res.status(404).json({
                message: "Error in fetching categories"
            })
        categoryList.forEach((el) => {
            allCategories[el.dataValues.id] = {
                id: el.dataValues.id,
                category_name: el.dataValues.category_name,
                category_type: el.dataValues.category_type,
            }
        })
        console.log(allCategories)
        const transactionList = await Transaction.findAll({
            where: {
            }
        });
        console.log(transactionList);

        res.status(200).json({
            success: true,
            data: transactionList.map((tran) => {
                let obj = {
                    id : tran.dataValues.id,
                    amount : tran.dataValues.amount,
                    transaction_type: tran.dataValues.transaction_type,
                    description : tran.dataValues.description
                }
                return { ...obj, category: allCategories[tran.category_id] }
            })
        })
    } catch (err) {
        console.error('Error fetching Transactions:', err);
        res.status(500).json({ message: 'Error fetching Transacions' });
    }
}

const addTransaction = async (req, res) => {

    try {
        const { type, amount, category_id } = req.body;

        const category = await Category.findOne({
            where: {
                id: category_id
            }
        })

        if (!category)
            return res.status(404).json({ error: "category Not Found" })


        const newTransaction = await Transaction.create({
            account_id: 1,
            category_id: 1,
            transaction_type: type,
            amount: amount
        })
        console.log(newTransaction, 'transaction_print');
        return res.status(200).json({ success: true, data: { ...newTransaction.dataValues, category: category.dataValues } });
    } catch (err) {
        console.error('Error adding Transaction:', err);
        res.status(500).json({ message: 'Error adding Transaction' });
    }
}


const editTransaction = async (req, res) => {
    try {
        const { id, amount, type, category_id } = req.body;

        const transaction = await Transaction.findOne({
            where: {
                id: id
            }
        })

        if (!transaction)
            return res.send("Transaction not found")

        const updatedTransaction = await Transaction.update({
            what: {
                amount: amount,
                transaction_type: type,
                category_id: category_id
            }
        })

        console.log(updatedTransaction);

        res.status(200).json({
            updatedTransaction
        })

    } catch (err) {
        console.error(err)
        res.send("Error in Updating Transaction")
    }
}

const deleteTransaction = async () => {
    try {

    } catch (err) {

    }
}

module.exports = {
    getAllTransactions,
    addTransaction,
    editTransaction,
    deleteTransaction
}