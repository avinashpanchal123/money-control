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

        res.status(200).json({
            success: true,
            data: transactionList.map((tran) => {
                let obj = {
                    id : tran.dataValues.id,
                    amount : tran.dataValues.amount,
                    transactionType: tran.dataValues.transaction_type,
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
        let { transactionType, amount, categoryID, description } = req.body;
        transactionType = !!transactionType.income ? "income" : "expense";
        const category = await Category.findOne({
            where: {
                id: +categoryID
            }
        })

        if (!category)
            return res.status(404).json({ error: "category Not Found" })


        const newTransaction = await Transaction.create({
            account_id: 1,
            category_id: +categoryID,
            description: description,
            transaction_type: transactionType,
            amount: +amount
        })
        console.log(newTransaction, 'transaction_print');
        let obj = {
            id : newTransaction.dataValues.id,
            amount : newTransaction.dataValues.amount,
            transactionType: newTransaction.dataValues.transaction_type,
            description : newTransaction.dataValues.description
        }
        return res.status(200).json({ success: true, data: { ...obj, category: category.dataValues } });
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

const deleteTransaction = async (req, res) => {
    try {
        const {id} = req.body;
        const deleted = Transaction.destroy({
            where: {
                id: id
            }
        })
        if(!!deleted){
            res.status(200).json({message : "Transaction deleted Successfully"})
        }
        else{
            res.status(404).json({ message: 'Transaction not found' });
        }
    } catch (err) {
        console.error('Error deleting category:', err);
        res.status(500).json({ message: 'Error deleting Transaction' });
    }
}

module.exports = {
    getAllTransactions,
    addTransaction,
    editTransaction,
    deleteTransaction
}