"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriaSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const categoriaSchema = joi_1.default.object({
    id: joi_1.default.number().integer().min(1),
    nome: joi_1.default.string().min(5).max(100).required(),
    descricao: joi_1.default.string().min(5).max(100).required(),
});
exports.categoriaSchema = categoriaSchema;
