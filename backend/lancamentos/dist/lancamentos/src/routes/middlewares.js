"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCategoriaSchema = exports.validateLancamentoSchema = void 0;
const lancamentoSchema_1 = require("../models/lancamentoSchema");
const categoriaSchema_1 = require("../models/categoriaSchema");
const middlewares_1 = __importDefault(require("sc-commons/api/routes/middlewares"));
function validateLancamentoSchema(req, res, next) {
    return middlewares_1.default.validateSchema(lancamentoSchema_1.lancamentoSchema, req, res, next);
}
exports.validateLancamentoSchema = validateLancamentoSchema;
function validateCategoriaSchema(req, res, next) {
    return middlewares_1.default.validateSchema(categoriaSchema_1.categoriaSchema, req, res, next);
}
exports.validateCategoriaSchema = validateCategoriaSchema;
