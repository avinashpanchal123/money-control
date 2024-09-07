const sequelize = require('sequelize');
const async = require('async');
const DataTypes = sequelize.DataTypes;

function mapSequelizeToSQL(dataType, options) {
    switch (dataType) {
        case 'STRING':
            return !!options ? `VARCHAR(${options.length || 255})` : 'VARCHAR(255)';
        case 'INTEGER':
            return `INT${options.length ? `(${options.length})` : ''}`;
        case 'BIGINT':
            return 'BIGINT';    
        // case 'FLOAT':
        //     return `FLOAT${options.length ? `(${options.length.join(', ')})` : ''}`;
        // case 'DOUBLE':
        //     return `DOUBLE${dataType._length ? `(${dataType._length.join(', ')})` : ''}`;
        case 'DECIMAL':
            return `DECIMAL(${options.precision}, ${options.scale})`;
        case 'TEXT':
            return `TEXT`;    
        case 'BOOLEAN':
            return 'TINYINT(1)';
        case 'DATE':
            return 'DATETIME';
        case 'ENUM':
            return `ENUM(${options.values.map(value => `'${value}'`).join(', ')})`;
        case 'DATEONLY':
            return 'DATE';
        case 'TIME':
            return 'TIME';
        default:
            return dataType.key; // Fallback for any types not explicitly handled
    }
}

function generateCreateTableSQL(tableName, schema) {
    let sql = `CREATE TABLE IF NOT EXISTS \`${tableName}\` (\n`;
    const columns = [];

    for (const [key, attributes] of Object.entries(schema.tableAttributes)) {
        console.log(typeof attributes.type.key)
        let column = `\`${key}\` ${(mapSequelizeToSQL(attributes.type.key, attributes.type.options))}`;
        if (attributes.allowNull === false) column += ' NOT NULL';
        if (attributes.primaryKey) column += ' PRIMARY KEY';
        if (attributes.autoIncrement) column += ' AUTO_INCREMENT';
        if (attributes.unique) column += ' UNIQUE';

        columns.push(column);
    }

    for (const [fieldName, fieldOptions] of Object.entries(schema.tableAttributes)) {
        if (fieldOptions.references) {
          const { model, key } = fieldOptions.references;
          const refTableName = model.getTableName ? model.getTableName() : model; // Handle both Sequelize model instances and plain table names
          columns.push(`  FOREIGN KEY (${"`"+fieldName+"`"}) REFERENCES ${"`"+refTableName+"`"}(${"`"+key+"`"})`);
        }
      }

    sql += columns.join(',\n');
    sql += '\n);';
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
            else {
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
