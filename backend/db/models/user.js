const Sequelize  = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const dbConnector = require('./../dbconnector')

const fields = {}
fields['id'] = {type : DataTypes.BIGINT, allowNull : false, primaryKey: true, autoIncrement: true};
fields['username'] = {type : DataTypes.STRING(100), allowNull: false};
fields['email'] = {type: DataTypes.STRING(100), allowNull: false};
fields['mobile_number'] = {type: DataTypes.BIGINT, allowNull: true};
fields['password_hash'] = {type: DataTypes.STRING(100), allowNull: false};
fields['created_on'] = {type: DataTypes.DATE(6), allowNull: true, default: DataTypes.CURRENT_TIMESTAMP};
fields['modified_on'] = {type: DataTypes.DATE(6), allowNull: true}

const indexes = [];
indexes.push({fields: 'username'});
indexes.push({fields: 'email'})

const user = dbConnector.define('user', fields);

module.exports = user;

  