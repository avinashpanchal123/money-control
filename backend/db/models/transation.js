const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const Account = require('./account');
const Category = require('./category');
const dbConnector = require('./../dbconnector')

const fields = {};
fields['id'] = { type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true };
fields['account_id'] = {
    type: DataTypes.BIGINT, allowNull: false, references: {
        model: Account,
        key: 'id',
    }
};
fields['transaction_type'] = {type : DataTypes.ENUM('income', 'expense'), allowNull: false};
fields['amount'] = {type: DataTypes.DECIMAL(15, 2),  allowNull: false};
fields['description'] = {type: DataTypes.TEXT, allowNull: true};
// fields['transaction_date'] = {type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.CURRENT_TIMESTAMP}
fields['category_id'] = {type: DataTypes.BIGINT,  allowNull: false, references: {
    model : Category,
    key : 'id'
}};
const indexes = [
    {fields: ['account_id']},
    {fields: ['category_id']}
]

module.exports = dbConnector.define('transaction', fields, {indexes, freezeTableName: true });