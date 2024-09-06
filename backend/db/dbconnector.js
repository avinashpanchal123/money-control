const Sequelize = require('sequelize');

let connector = new Sequelize(
    'money_control',
    'root',  
    'Avinash@123', // pass
     {
        host : 'localhost',
        dialect : 'mysql',
        port: 3303
    }
);

module.exports = connector;