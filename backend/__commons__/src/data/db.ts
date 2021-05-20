import { Sequelize } from "sequelize";

const dbName = process.env.DB_NAME!;
const dbUser = process.env.DB_USER!;
const dbPass = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;
const loggin = process.env.SQL_LOG ? true : false;

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  dialect: "mysql",
  host: dbHost,
  logging: loggin,
});

export default sequelize;
