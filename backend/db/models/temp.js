const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const Account = require('./account');
const Category = require('./category');
const dbConnector = require('./../dbconnector');

// Define your fields
const fields = {
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  account_id: {
    type: DataTypes.INTEGER, allowNull: false, references: {
      model: Account,
      key: 'id',
    }
  },
  transaction_type: { type: DataTypes.ENUM('income', 'expense'), allowNull: false },
  amount: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  category_id: {
    type: DataTypes.INTEGER, allowNull: false, references: {
      model: Category,
      key: 'id'
    }
  },
  created_on: { type: DataTypes.DATE(6), allowNull: true, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
  modified_on: { type: DataTypes.DATE(6), allowNull: true }
};

// Define your indexes
const indexes = [
  { fields: ['account_id'] },
  { fields: ['category_id'] }
];

// Function to map Sequelize types to SQL types
function mapSequelizeTypeToSQLType(field) {
  switch (field.type.key) {
    case 'INTEGER':
      return 'INTEGER';
    case 'DECIMAL':
      return `DECIMAL(${field.type._length}, ${field.type._decimals})`;
    case 'ENUM':
      return `ENUM('${field.type.values.join("', '")}')`;
    case 'TEXT':
      return 'TEXT';
    case 'DATE':
      return `DATETIME(${field.type.options.precision || 6})`;
    default:
      return '';
  }
}

// Function to generate the CREATE TABLE query
function generateCreateTableQuery(tableName, fields, indexes) {
  let query = `CREATE TABLE ${tableName} (\n`;

  const fieldLines = [];
  for (const [fieldName, fieldOptions] of Object.entries(fields)) {
    let line = `  ${fieldName} ${mapSequelizeTypeToSQLType(fieldOptions)}`;
    if (fieldOptions.allowNull === false) line += ' NOT NULL';
    if (fieldOptions.primaryKey) line += ' PRIMARY KEY';
    if (fieldOptions.autoIncrement) line += ' AUTO_INCREMENT';
    if (fieldOptions.defaultValue !== undefined) {
      if (fieldOptions.defaultValue === Sequelize.literal('CURRENT_TIMESTAMP')) {
        line += ' DEFAULT CURRENT_TIMESTAMP';
      } else {
        line += ` DEFAULT ${fieldOptions.defaultValue}`;
      }
    }
    fieldLines.push(line);
  }

  // Add foreign key constraints
  for (const [fieldName, fieldOptions] of Object.entries(fields)) {
    if (fieldOptions.references) {
      const { model, key } = fieldOptions.references;
      const refTableName = model.getTableName ? model.getTableName() : model; // Handle both Sequelize model instances and plain table names
      fieldLines.push(`  FOREIGN KEY (${fieldName}) REFERENCES ${refTableName}(${key})`);
    }
  }

  query += fieldLines.join(',\n');
  query += '\n);';

  // Add indexes
  if (indexes.length > 0) {
    indexes.forEach((index) => {
      query += `\nCREATE INDEX ${index.fields.join('_')}_idx ON ${tableName}(${index.fields.join(', ')});`;
    });
  }

  return query;
}

// Generate and print the CREATE TABLE query
const tableName = 'transaction';
const createTableQuery = generateCreateTableQuery(tableName, fields, indexes);
console.log(createTableQuery);
