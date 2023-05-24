import { config } from 'dotenv';

config();

export default {
  "development": {
    "username": process.env.DB_DEV_USER,
    "password": process.env.DB_DEV_PASSWORD,
    "database": process.env.DB_DEV_NAME,
    "host": process.env.DB_DEV_HOST,
    "dialect": process.env.DB_DEV_DIALECT
  },
  "test": {
    "username": process.env.DB_TEST_USER,
    "password": process.env.DB_TEST_PASSWORD,
    "database": process.env.DB_TEST_NAME,
    "host": process.env.DB_TEST_HOST,
    "dialect": process.env.DB_TEST_DIALECT
  },
  "stage": {
    "username": process.env.DB_STAGE_USER,
    "password": process.env.DB_STAGE_PASSWORD,
    "database": process.env.DB_STAGE_NAME,
    "host": process.env.DB_STAGE_HOST,
    "dialect": process.env.DB_STAGE_DIALECT
  },
  "production": {
    "username": process.env.DB_PROD_USER,
    "password": process.env.DB_PROD_PASSWORD,
    "database": process.env.DB_PROD_NAME,
    "host": process.env.DB_PROD_HOST,
    "dialect": process.env.DB_PROD_DIALECT
  }
}