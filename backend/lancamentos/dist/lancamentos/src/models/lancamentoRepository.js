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
const lancamentoModel_1 = __importDefault(require("./lancamentoModel"));
function findAll() {
    return lancamentoModel_1.default.findAll();
}
function findById(id) {
    return lancamentoModel_1.default.findByPk(id);
}
function add(lancamento) {
    return lancamentoModel_1.default.create(lancamento);
}
function deleteById(id) {
    return lancamentoModel_1.default.destroy({ where: { id: id } });
}
function set(id, lancamento) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalLancamento = yield lancamentoModel_1.default.findByPk(id);
        if (!originalLancamento)
            return null;
        if (lancamento.pessoaId)
            originalLancamento.pessoaId = lancamento.pessoaId;
        if (lancamento.categoriaId)
            originalLancamento.categoriaId = lancamento.categoriaId;
        if (lancamento.tipo)
            originalLancamento.tipo = lancamento.tipo;
        if (lancamento.descricao)
            originalLancamento.descricao = lancamento.descricao;
        if (lancamento.dataVencimento)
            originalLancamento.dataVencimento = lancamento.dataVencimento;
        if (lancamento.dataPagamento)
            originalLancamento.dataPagamento = lancamento.dataPagamento;
        if (lancamento.valor)
            originalLancamento.valor = lancamento.valor;
        if (lancamento.observacoes)
            originalLancamento.observacoes = lancamento.observacoes;
        yield originalLancamento.save();
        return originalLancamento;
    });
}
exports.default = { findAll, add, deleteById, findById, set };
