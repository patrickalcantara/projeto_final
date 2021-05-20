import database from "sc-commons/data/db";

import Sequelize, { Model, Optional } from "sequelize";
import { ILancamento } from "./lancamento";

//const sequelize = new Sequelize("mysql://root:asd123@localhost:3306/mydb");
interface ILancamentoCreationAttributes extends Optional<ILancamento, "id"> {}

export interface ILancamentoModel
  extends Model<ILancamento, ILancamentoCreationAttributes>,
    ILancamento {}

const Lancamento = database.define<ILancamentoModel>("lancamento", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  tipo: {
    type: Sequelize.SMALLINT.UNSIGNED,
    allowNull: false,
  },
  pessoaId: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },
  categoriaId: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dataPagamento: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  dataVencimento: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  valor: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  observacoes: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

export default Lancamento;
