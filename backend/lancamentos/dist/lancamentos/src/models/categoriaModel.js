"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("sc-commons/data/db"));
const sequelize_1 = __importDefault(require("sequelize"));
const lancamentoModel_1 = __importDefault(require("./lancamentoModel"));
const Categoria = db_1.default.define("categoria", {
    id: {
        type: sequelize_1.default.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nome: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    descricao: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
});
Categoria.hasMany(lancamentoModel_1.default, {
    constraints: true,
    foreignKey: "categoriaId",
});
lancamentoModel_1.default.belongsTo(Categoria, {
    constraints: true,
    foreignKey: "categoriaId",
});
exports.default = Categoria;
