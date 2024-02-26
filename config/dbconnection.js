const { Sequelize,DataTypes } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  logging: false,
  dialect: DB_DIALECT,
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/userModel')(sequelize,DataTypes);
db.question = require('../models/questionsModel')(sequelize,DataTypes);
db.userProgress = require('../models/userProgressModel')(sequelize,DataTypes);

db.user.hasMany(db.userProgress, { foreignKey: 'user_id' });
db.question.hasMany(db.userProgress, { foreignKey: 'question_id' });
db.userProgress.belongsTo(db.user, { foreignKey: 'user_id' });
db.userProgress.belongsTo(db.question, { foreignKey: 'question_id' });


db.sequelize.sync({force:false});

module.exports = db;
