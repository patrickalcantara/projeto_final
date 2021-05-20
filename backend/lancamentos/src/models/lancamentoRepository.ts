import lancamentoRepository, { ILancamentoModel } from "./lancamentoModel";
import { ILancamento } from "./lancamento";

function findAll() {
  return lancamentoRepository.findAll<ILancamentoModel>();
}

function findById(id: number) {
  return lancamentoRepository.findByPk<ILancamentoModel>(id);
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
  if (lancamento.observacoes)
    originalLancamento.observacoes = lancamento.observacoes;

  await originalLancamento.save();
  return originalLancamento;
}

export default { findAll, add, deleteById, findById, set };
