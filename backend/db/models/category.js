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
fields['created_on'] = {type: DataTypes.DATE(6), allowNull: true, defaultValue: DataTypes.CURRENT_TIMESTAMP};
fields['modified_on'] = {type: DataTypes.DATE(6), allowNull: true};

const indexes = [
    {fields : ['user_id']},
    {fields : ['category_name']}
];

module.exports = dbConnector.define('category', fields, {
    indexes,
    freezeTableName: true 
})