const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const dbConnector = require('./../dbconnector');
const User = require('./user')

const fields = {};
fields['id'] = {type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true};
fields['user_id'] = {type: DataTypes.BIGINT, allowNull: false, references: {
    model: User,
    key : 'id'
}}
fields['category_name'] = {type: DataTypes.STRING(100), allowNull: false };
fields['category_type'] = {type : DataTypes.ENUM('income', 'expense'), allowNull: false};

const indexes = [
    {fields : ['user_id']},
    {fields : ['category_name']}
];

module.exports = dbConnector.define('category', fields, {
    indexes,
    freezeTableName: true 
})