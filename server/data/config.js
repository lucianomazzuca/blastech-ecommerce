require('dotenv').config();

module.exports = {
  development: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    database: 'blustech',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
};
