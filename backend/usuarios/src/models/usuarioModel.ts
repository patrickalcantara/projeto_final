import database from "sc-commons/data/db";

import Sequelize, { Model, Optional } from "sequelize";
import { IUsuario } from "./usuario";

//const sequelize = new Sequelize("mysql://root:asd123@localhost:3306/mydb");
interface IUsuarioCreationAttributes extends Optional<IUsuario, "id"> {}

export interface IUsuarioModel
  extends Model<IUsuario, IUsuarioCreationAttributes>,
    IUsuario {}

export default database.define<IUsuarioModel>("usuario", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  permissao: {
    type: Sequelize.SMALLINT.UNSIGNED,
    allowNull: false,
    defaultValue: 100,
  },
});
