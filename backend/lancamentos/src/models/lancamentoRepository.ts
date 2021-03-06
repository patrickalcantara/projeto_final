import lancamentoRepository, { ILancamentoModel } from "./lancamentoModel";
import { QueryTypes } from "sequelize";
import { ILancamento } from "./lancamento";
import Categoria from "./categoriaModel";
import sequelize from "sc-commons/data/db";

function findAll() {
  const lancamentos = sequelize.query(
    `SELECT lancamentos.*, categoria.nome AS categoria_nome, pessoas.nome AS pessoa_nome  
    FROM lancamentos  
    JOIN pessoas ON lancamentos.pessoaId = pessoas.id
    JOIN categoria ON lancamentos.categoriaId = categoria.id
    ORDER BY lancamentos.dataPagamento DESC;`,
    { type: QueryTypes.SELECT }
  );
  return lancamentos;

  // return lancamentoRepository.findAll<ILancamentoModel>({
  //   include: Categoria,
  // });
}

function populaGrafico(ano: number) {
  const dadosGrafico = sequelize.query(
    `SELECT MONTH(dataPagamento) as Mes, SUM(valor) as Soma, tipo as Tipo
    FROM lancamentos
    WHERE YEAR(dataPagamento) = '${ano}'
    GROUP BY  MONTH(dataPagamento), tipo
    ORDER BY MONTH(dataPagamento);`,
    { type: QueryTypes.SELECT }
  );

  return dadosGrafico;
}

function findById(id: number) {
  return lancamentoRepository.findByPk<ILancamentoModel>(id, {
    include: Categoria,
  });
}

function add(lancamento: ILancamento) {
  return lancamentoRepository.create(lancamento);
}

function deleteById(id: number) {
  return lancamentoRepository.destroy({ where: { id: id } });
}

async function set(id: number, lancamento: ILancamento) {
  const originalLancamento =
    await lancamentoRepository.findByPk<ILancamentoModel>(id);
  if (!originalLancamento) return null;
  if (lancamento.pessoaId) originalLancamento.pessoaId = lancamento.pessoaId;
  if (lancamento.categoriaId)
    originalLancamento.categoriaId = lancamento.categoriaId;
  if (lancamento.tipo) originalLancamento.tipo = lancamento.tipo;
  if (lancamento.descricao) originalLancamento.descricao = lancamento.descricao;
  if (lancamento.dataVencimento)
    originalLancamento.dataVencimento = lancamento.dataVencimento;
  if (lancamento.dataPagamento)
    originalLancamento.dataPagamento = lancamento.dataPagamento;
  if (lancamento.valor) originalLancamento.valor = lancamento.valor;

  originalLancamento.observacoes = lancamento.observacoes;

  await originalLancamento.save();
  return originalLancamento;
}

export default { findAll, add, deleteById, findById, set, populaGrafico };
