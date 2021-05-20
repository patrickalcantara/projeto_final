import usuarioRepository, { IUsuarioModel } from "./usuarioModel";
import { IUsuario } from "./usuario";

function findAll() {
  return usuarioRepository.findAll<IUsuarioModel>({
    attributes: { exclude: ["senha"] },
  });
}

function findById(id: number) {
  return usuarioRepository.findByPk<IUsuarioModel>(id, {
    attributes: { exclude: ["senha"] },
  });
}

function add(usuario: IUsuario) {
  return usuarioRepository.create(usuario);
}

async function set(id: number, usuario: IUsuario) {
  const originalUsuario = await usuarioRepository.findByPk<IUsuarioModel>(id);
  if (originalUsuario !== null) {
    if (usuario.nome) originalUsuario.nome = usuario.nome;
    if (usuario.senha) originalUsuario.senha = usuario.senha;
    //if (usuario.permissao) originalUsuario.permissao = usuario.permissao;
    await originalUsuario.save();
    return originalUsuario;
  }
  return null;
}

function deleteUsuario(id: number) {
  return usuarioRepository.destroy({
    where: {
      id: id,
    },
    cascade: true,
  });
}

function deleteUsuarioByEmail(email: string) {
  return usuarioRepository.destroy({
    where: {
      email: email,
    },
    cascade: true,
  });
}

function findByEmail(email: string) {
  return usuarioRepository.findOne<IUsuarioModel>({
    where: {
      email: email,
    },
  });
}

export default {
  findAll,
  findById,
  add,
  set,
  deleteUsuario,
  findByEmail,
  deleteUsuarioByEmail,
};
