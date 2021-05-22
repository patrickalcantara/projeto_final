import pessoaRepository, { IPessoaModel } from "./pessoaModel";
import { IPessoa } from "./pessoa";

function findAll() {
  return pessoaRepository.findAll<IPessoaModel>();
}

function findById(id: number) {
  return pessoaRepository.findByPk<IPessoaModel>(id);
}

function add(pessoa: IPessoa) {
  return pessoaRepository.create(pessoa);
}

function deletePessoaById(id: number) {
  return pessoaRepository.destroy({ where: { id: id } });
}

async function set(id: number, pessoa: IPessoa) {
  const originalPessoa = await pessoaRepository.findByPk<IPessoaModel>(id);
  if (!originalPessoa) return null;
  if (pessoa.nome) originalPessoa.nome = pessoa.nome;
  if (pessoa.email) originalPessoa.email = pessoa.email;
  originalPessoa.ativo = pessoa.ativo;
  if (pessoa.logradouro) originalPessoa.logradouro = pessoa.logradouro;
  if (pessoa.numero) originalPessoa.numero = pessoa.numero;
  originalPessoa.complemento = pessoa.complemento;
  if (pessoa.bairro) originalPessoa.bairro = pessoa.bairro;
  if (pessoa.cep) originalPessoa.cep = pessoa.cep;
  if (pessoa.cidade) originalPessoa.cidade = pessoa.cidade;
  if (pessoa.uf) originalPessoa.uf = pessoa.uf;

  await originalPessoa.save();
  return originalPessoa;
}

export default { findAll, add, deletePessoaById, findById, set };
