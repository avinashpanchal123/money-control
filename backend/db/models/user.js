const Sequelize  = require('sequelize');
const DataTypes = Sequelize.DataTypes;

const fields = {}
fields['id'] = {type : DataTypes.BIGINT, allowNull : false, primarykey: true, autoincreament: true};
fields['username'] = {type : DataTypes.STRING, length: 100, allowNull: false};
fields['email'] = {type: DataTypes.STRING,  length: 100, allowNull: false};
fields['mobile_number'] = {type: DataTypes.BIGINT, allowNull: true};
fields['password_hash'] = {type: DataTypes.STRING, allowNull: false};
fields['created_on'] = {type: DataTypes.DATE(6), allowNull: true, default: DataTypes.CURRENT_TIMESTAMP};
fields['modified_on'] = {type: DataTypes.DATE(6), allowNull: true}

const indexes = [];
indexes.push({fields: 'username'});
indexes.push({fields: 'email'})

const user = Sequelize.define('user', fields);

module.exports = user;

// CREATE TABLE `user` (
//     `id` bigint NOT NULL AUTO_INCREMENT,
//     `username` varchar(100) NOT NULL,
//     `email` varchar(100) NOT NULL,
//     `mobile_number` bigint DEFAULT NULL,
//     `password_hash` varchar(255) DEFAULT NULL,
//     `created_on` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
//     `modified_on` timestamp(6) NULL DEFAULT NULL,
//     PRIMARY KEY (`id`),
//     UNIQUE KEY `username` (`username`),
//     UNIQUE KEY `email` (`email`)
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  