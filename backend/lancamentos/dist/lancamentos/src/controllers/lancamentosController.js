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
const lancamentoRepository_1 = __importDefault(require("../models/lancamentoRepository"));
function getLancamentos(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const lancamentos = yield lancamentoRepository_1.default.findAll();
        return res.status(200).json(lancamentos);
    });
}
function getLancamento(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const lancamentoId = parseInt(req.params.id);
            if (!lancamentoId)
                return res.status(400).end();
            const lancamento = yield lancamentoRepository_1.default.findById(lancamentoId);
            if (lancamento === null)
                res.status(404).end();
            res.status(200).json(lancamento);
        }
        catch (error) {
            res.status(400).end();
        }
    });
}
function addLancamento(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const lancamento = req.body;
            const newLancamento = yield lancamentoRepository_1.default.add(lancamento);
            res.status(201).json(newLancamento);
        }
        catch (error) {
            res.status(400).end();
        }
    });
}
function updateLancamento(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            if (!id)
                return res.status(400).end();
            const newLancamento = req.body;
            const originalLancamento = yield lancamentoRepository_1.default.set(id, newLancamento);
            if (!originalLancamento)
                return res.status(404).end();
            return res.status(200).json(originalLancamento);
        }
        catch (error) {
            res.status(400).end();
        }
    });
}
exports.default = {
    getLancamentos,
    getLancamento,
    addLancamento,
    updateLancamento,
};
