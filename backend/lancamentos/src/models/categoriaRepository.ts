import categoriaRepository, { ICategoriaModel } from "./categoriaModel";
import { ICategoria } from "./categoria";

function findAll() {
  return categoriaRepository.findAll<ICategoriaModel>();
}

function findById(id: number) {
  return categoriaRepository.findByPk<ICategoriaModel>(id);
}

function add(categoria: ICategoria) {
  return categoriaRepository.create(categoria);
}

function deleteById(id: number) {
  return categoriaRepository.destroy({ where: { id: id } });
}

async function softDeleteById(id: number) {
  const originalCategoria = await categoriaRepository.findByPk<ICategoriaModel>(
    id
  );
  if (!originalCategoria) return null;
  originalCategoria.ativo = false;

  await originalCategoria.save();
  return originalCategoria;
}

async function set(id: number, categoria: ICategoria) {
  const originalCategoria = await categoriaRepository.findByPk<ICategoriaModel>(
    id
  );
  if (!originalCategoria) return null;
  if (categoria.descricao) originalCategoria.descricao = categoria.descricao;
  if (categoria.nome) originalCategoria.nome = categoria.nome;

  await originalCategoria.save();
  return originalCategoria;
}

export default { findAll, add, deleteById, findById, set, softDeleteById };
