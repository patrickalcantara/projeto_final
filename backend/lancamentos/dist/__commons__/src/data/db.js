"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;
const loggin = process.env.SQL_LOG ? true : false;
const sequelize = new sequelize_1.Sequelize(dbName, dbUser, dbPass, {
    dialect: "mysql",
    host: dbHost,
    logging: loggin,
});
exports.default = sequelize;
