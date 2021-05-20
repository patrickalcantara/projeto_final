"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = __importDefault(require("sc-commons/api/routes/middlewares"));
const lancamentosController_1 = __importDefault(require("../controllers/lancamentosController"));
const categoriasController_1 = __importDefault(require("../controllers/categoriasController"));
const middlewares_2 = require("./middlewares");
const router = express_1.Router();
//Rotas de lancamentos
router.get("/lancamentos/", middlewares_1.default.validateAuth, lancamentosController_1.default.getLancamentos);
router.get("/lancamentos/:id", middlewares_1.default.validateAuth, lancamentosController_1.default.getLancamento);
router.post("/lancamentos/", middlewares_1.default.validateAuth, middlewares_2.validateLancamentoSchema, lancamentosController_1.default.addLancamento);
router.patch("/lancamentos/:id", middlewares_1.default.validateAuth, middlewares_2.validateLancamentoSchema, lancamentosController_1.default.updateLancamento);
//Rotas de categorias
router.get("/categorias/", middlewares_1.default.validateAuth, categoriasController_1.default.getCategorias);
router.get("/categorias/:id", middlewares_1.default.validateAuth, categoriasController_1.default.getCategoria);
router.post("/categorias/", middlewares_1.default.validateAuth, middlewares_2.validateCategoriaSchema, categoriasController_1.default.addCategoria);
router.patch("/categorias/:id", middlewares_1.default.validateAuth, middlewares_2.validateCategoriaSchema, categoriasController_1.default.updateCategoria);
exports.default = router;
