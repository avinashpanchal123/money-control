const sequelize = require('sequelize');
const async = require('async');
const DataTypes = sequelize.DataTypes;

function mapSequelizeToSQL(dataType) {
    switch (dataType.constructor.key) {
        case DataTypes.STRING:
            return `VARCHAR(${dataType._length || 255})`;
        case DataTypes.INTEGER:
            return `INT${dataType._length ? `(${dataType._length})` : ''}`;
        case DataTypes.FLOAT:
            return `FLOAT${dataType._length ? `(${dataType._length.join(', ')})` : ''}`;
        case DataTypes.DOUBLE:
            return `DOUBLE${dataType._length ? `(${dataType._length.join(', ')})` : ''}`;
        case DataTypes.BOOLEAN:
            return 'TINYINT(1)';
        case DataTypes.DATE:
            return 'DATETIME';
        case DataTypes.TEXT:
            return 'TEXT';
        case DataTypes.BLOB:
            return 'BLOB';
        case DataTypes.DECIMAL:
            return `DECIMAL${dataType._length ? `(${dataType._length.join(', ')})` : ''}`;
        case DataTypes.UUID:
            return 'CHAR(36)';
        case DataTypes.ENUM:
            return `ENUM(${dataType.values.map(value => `'${value}'`).join(', ')})`;
        case DataTypes.DATEONLY:
            return 'DATE';
        case DataTypes.TIME:
            return 'TIME';
        default:
            return dataType.key; // Fallback for any types not explicitly handled
    }
}

function generateCreateTableSQL(tableName, schema) {
    let sql = `CREATE TABLE IF NOT EXISTS \`${tableName}\` (`;
    const columns = [];

    for (const [key, attributes] of Object.entries(schema.tableAttributes)) {
        let column = `\`${key}\` ${(attributes.type)}`;

        if (attributes.primaryKey) column += ' PRIMARY KEY';
        if (attributes.autoIncrement) column += ' AUTO_INCREMENT';
        if (attributes.allowNull === false) column += ' NOT NULL';
        if (attributes.unique) column += ' UNIQUE';

        columns.push(column);
    }

    sql += columns.join(', ');
    sql += ');';
    return sql;
}

function syncSchema(dbConnector, dbName, tableName, modelsList, callback) {
    async.series([(callback) => {
        const query = `
        SELECT COUNT(*) AS table_exists 
        FROM INFORMATION_SCHEMA.TABLES 
        WHERE TABLE_SCHEMA = "${dbName}" 
        AND TABLE_NAME = "${tableName}";
      `;
        dbConnector.query(query, {
            replacements: { dbName, tableName },
            type: sequelize.QueryTypes.SELECT
        }).then((res) => {
            console.log(res);
            if (!!res) {
                let isExists = res[0].table_exists;
                if (!!isExists)
                    process.nextTick(callback, null);
                else {
                    let query1 = generateCreateTableSQL(tableName, modelsList[tableName]);
                    dbConnector.query(query1, {
                        replacements: { dbName, tableName },
                       // type: sequelize.QueryTypes.CREATE
                    }).then((res) => {
                        process.nextTick(callback, null)
                    }).catch((err) => {
                        process.nextTick(callback, err)
                    })
                }
            }
            else{
                process.nextTick(callback, new Error("something went wrong"))
            }
        }).catch((err) => {
            // if(!!err && err.message)
            console.log(err)
        })
    }], (err) => {
        process.nextTick(callback, err);
    })
}

module.exports = syncSchema
