"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoriaRepository_1 = __importDefault(require("../models/categoriaRepository"));
function getCategorias(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const categorias = yield categoriaRepository_1.default.findAll();
        return res.status(200).json(categorias);
    });
}
function getCategoria(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categoriaId = parseInt(req.params.id);
            if (!categoriaId)
                return res.status(400).end();
            const categoria = yield categoriaRepository_1.default.findById(categoriaId);
            if (categoria === null)
                res.status(404).end();
            res.status(200).json(categoria);
        }
        catch (error) {
            res.status(400).end();
        }
    });
}
function addCategoria(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categoria = req.body;
            const newCategoria = yield categoriaRepository_1.default.add(categoria);
            res.status(201).json(newCategoria);
        }
        catch (error) {
            res.status(400).end();
        }
    });
}
function updateCategoria(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            if (!id)
                return res.status(400).end();
            const newCategoria = req.body;
            const originalCategoria = yield categoriaRepository_1.default.set(id, newCategoria);
            if (!originalCategoria)
                return res.status(404).end();
            return res.status(200).json(originalCategoria);
        }
        catch (error) {
            res.status(400).end();
        }
    });
}
exports.default = {
    getCategorias,
    getCategoria,
    addCategoria,
    updateCategoria,
};
