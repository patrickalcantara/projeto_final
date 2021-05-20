"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("sc-commons/data/db"));
const sequelize_1 = __importDefault(require("sequelize"));
const Lancamento = db_1.default.define("lancamento", {
    id: {
        type: sequelize_1.default.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    tipo: {
        type: sequelize_1.default.SMALLINT.UNSIGNED,
        allowNull: false,
    },
    pessoaId: {
        type: sequelize_1.default.INTEGER.UNSIGNED,
        allowNull: false,
    },
    categoriaId: {
        type: sequelize_1.default.INTEGER.UNSIGNED,
        allowNull: false,
    },
    descricao: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    dataPagamento: {
        type: sequelize_1.default.DATEONLY,
        allowNull: false,
    },
    dataVencimento: {
        type: sequelize_1.default.DATEONLY,
        allowNull: false,
    },
    valor: {
        type: sequelize_1.default.FLOAT,
        allowNull: false,
    },
    observacoes: {
        type: sequelize_1.default.STRING,
        allowNull: true,
    },
});
exports.default = Lancamento;
