const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: 'scraper_development',
    host: process.env.DATABASE_URL,
    dialect: 'mysql',
    logging: false
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: 'scraper_test',
    host: process.env.DATABASE_URL,
    dialect: 'mysql',
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: 'scraper_production',
    host: process.env.DATABASE_URL,
    dialect: 'mysql',
  },
};