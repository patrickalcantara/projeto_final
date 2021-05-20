import database from "sc-commons/data/db";

import Sequelize, { Model, Optional } from "sequelize";
import { ICategoria } from "./categoria";
import Lancamento from "./lancamentoModel";

//const sequelize = new Sequelize("mysql://root:asd123@localhost:3306/mydb");
interface ICategoriaCreationAttributes extends Optional<ICategoria, "id"> {}

export interface ICategoriaModel
  extends Model<ICategoria, ICategoriaCreationAttributes>,
    ICategoria {}

const Categoria = database.define<ICategoriaModel>("categoria", {
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
  descricao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Categoria.hasMany(Lancamento, {
  constraints: true,
  foreignKey: "categoriaId",
});

Lancamento.belongsTo(Categoria, {
  constraints: true,
  foreignKey: "categoriaId",
});

export default Categoria;
