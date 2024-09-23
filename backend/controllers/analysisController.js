const dbConnector = require('./../db/dbconnector');
const sequelize = require('sequelize');
const Category = require('./../db/models/category');

const getThisMonthAnalysis = async (req, res) => {
    let query = `SELECT * FROM TRANSACTION WHERE MONTH(createdAt) = MONTH(CURDATE()) AND YEAR(createdAt) = YEAR(CURDATE()) AND transaction_type = 'expense';`;
    let categoryObj = {};

    try {
        let categories = await Category.findAll({
            where :{
                category_type : 'expense'
            }
        });
        if (!categories || categories.length === 0) {
            return res.send("No Categories Found");
        }

        categories.forEach(el => {
            el = el.dataValues;
            categoryObj[el.id] = { name: el.category_name, totalSpent: 0 }; 
        });

        let thisMonthTransactions = await dbConnector.query(query, {
            type: sequelize.QueryTypes.SELECT
        });

        if (!thisMonthTransactions || thisMonthTransactions.length === 0) {
            return res.send("No Transactions found for this month");
        }

        thisMonthTransactions.forEach(transaction => {
            let categoryId = transaction.category_id;
            let amount = transaction.amount;

            if (categoryObj[categoryId]) {
                categoryObj[categoryId].totalSpent += (+amount);
            }
        });

        let result = [];
        for (let id in categoryObj) {
            result.push({
                category: categoryObj[id].name,
                totalSpent: categoryObj[id].totalSpent
            });
        }

        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error in fetching data");
    }
};

module.exports = {
    getThisMonthAnalysis
};
