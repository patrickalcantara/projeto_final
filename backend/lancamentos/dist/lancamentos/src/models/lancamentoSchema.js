"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lancamentoSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const lancamentoSchema = joi_1.default.object({
    id: joi_1.default.number().integer().min(1),
    tipo: joi_1.default.number().integer().min(100).max(200).required(),
    pessoaId: joi_1.default.number().integer().required(),
    categoriaId: joi_1.default.number().integer().required(),
    descricao: joi_1.default.string().min(5).max(100).required(),
    dataPagamento: joi_1.default.date().required(),
    dataVencimento: joi_1.default.date().required(),
    valor: joi_1.default.number().required(),
    observacoes: joi_1.default.string(),
});
exports.lancamentoSchema = lancamentoSchema;
