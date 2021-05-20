import database from "sc-commons/data/db";
import Sequelize, { Model, Optional } from "sequelize";

import { IPessoa } from "./pessoa";

interface IPessoaCreationAttributes extends Optional<IPessoa, "id"> {}

export interface IPessoaModel
  extends Model<IPessoa, IPessoaCreationAttributes>,
    IPessoa {}

const Pessoa = database.define<IPessoaModel>("pessoa", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome: {
    type: Sequelize.STRING(150),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(150),
  },
  ativo: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  logradouro: {
    type: Sequelize.STRING(150),
    allowNull: false,
  },
  numero: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  complemento: {
    type: Sequelize.STRING(150),
  },
  bairro: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  cep: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  cidade: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  uf: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
});

Pessoa.sync();

export default Pessoa;
