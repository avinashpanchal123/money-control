const dbConnector = require('./../db/dbconnector');
const sequelize = require('sequelize');
const Category = require('./../db/models/category')


const getThisMonthAnalysis = async(req, res)=>{
    let query = 'SELECT * FROM TRANSACTION WHERE MONTH(createdAt) = MONTH(CURDATE()) AND YEAR(createdAt) = YEAR(CURDATE());'
    let categoryObj = {};
    let transactionObj = {};
    try{
        let categories = await Category.findAll();
        // categories = categories.map((category)=> category.dataValues)
        categories.forEach(el => {
            el = el.dataValues;
            categoryObj[el.id] = el;
        });
        if(!categories){
            return res.send("No Category Found")
        }
        let thisMonthTransactions = await  dbConnector.query(query, {
            type : sequelize.QueryTypes.SELECT
        });
        if(!thisMonthTransactions){
           return  res.send("No Transactions found for this month")
        }
        thisMonthTransactions.forEach(()=>{
            
        })
    }catch(err){
        console.error(err);
    }
}


module.exports = {
    getThisMonthAnalysis
}