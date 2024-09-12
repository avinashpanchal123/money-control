const Sequelize  = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const dbConnector = require('./../dbconnector')

const fields = {}
fields['id'] = {type : DataTypes.BIGINT, allowNull : false, primaryKey: true, autoIncrement: true};
fields['username'] = {type : DataTypes.STRING(100), allowNull: false};
fields['email'] = {type: DataTypes.STRING(100), allowNull: false};
fields['mobile_number'] = {type: DataTypes.BIGINT, allowNull: true};
fields['password'] = {type: DataTypes.STRING(100), allowNull: false};

const indexes = [
    { fields: ['username'] },
    { fields: ['email'] }
];

module.exports = dbConnector.define('user', fields, {indexes, freezeTableName: true });


  