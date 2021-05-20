import { Response, Request } from "express";
import { IUsuario } from "../models/usuario";
import repository from "../models/usuarioRepository";
import auth from "../auth";

//Lista todos os usuários
async function getUsuarios(req: Request, res: Response, next: any) {
  const usuarios: IUsuario[] = await repository.findAll();
  res.status(200).json(usuarios);
}

//Busca e retorna apenas um usuário
async function getUsuario(req: Request, res: Response, next: any) {
  try {
    const id = parseInt(req.params.id);
    if (!id) return res.status(400).end();
    const usuario = await repository.findById(id);

    if (usuario == null) {
      res.status(404).end();
    } else {
      res.status(200).json(usuario);
    }
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

//Busca e retorna apenas um usuário
async function getUsuarioPorEmail(req: Request, res: Response, next: any) {
  try {
    const email = req.params.email;
    if (!email) return res.status(400).end();
    const usuario = await repository.findByEmail(email);

    if (usuario == null) {
      res.status(404).end();
    } else {
      res.status(200).json(usuario);
    }
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

//Testa logado
function getLogin(req: Request, res: Response, next: any) {
  try {
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

//Adciona um usuário
async function addUsuario(req: Request, res: Response, next: any) {
  try {
    const newUsuario = req.body as IUsuario;
    newUsuario.senha = auth.hashPassword(newUsuario.senha!);
    const usuarioCreated = await repository.add(newUsuario);
    newUsuario.id = usuarioCreated.id;
    delete newUsuario.senha;
    res.status(201).json(newUsuario);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.name);
  }
}

//Atualiza um usuário
async function updateUsuario(req: Request, res: Response, next: any) {
  try {
    const id = parseInt(req.params.id);
    if (!id) return res.status(400).end();
    const usuarioParams = req.body as IUsuario;
    if (usuarioParams.senha)
      usuarioParams.senha = auth.hashPassword(usuarioParams.senha);
    const originalUsuario = await repository.set(id, usuarioParams);
    if (originalUsuario !== null) {
      originalUsuario.senha = "";
      res.status(200).json(originalUsuario);
    } else res.status(404).end();
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

async function deleteUsuario(req: Request, res: Response, next: any) {
  try {
    const id = parseInt(req.params.id);
    if (!id) return res.status(400).end();

    const ususario = await repository.findById(id);
    if (ususario === null) res.status(404).end();
    await repository.deleteUsuario(id);
    return res.status(204).end();
  } catch (error) {
    res.status(400).end();
  }
}

async function loginUsuario(req: Request, res: Response, next: any) {
  try {
    const loginParams = req.body as IUsuario;
    const usuario = await repository.findByEmail(loginParams.email);
    if (usuario !== null) {
      if (auth.comparePassword(loginParams.senha!, usuario.senha!)) {
        //resposta após validação
        const token = await auth.sign(usuario.id!);
        return res.json({ auth: true, token });
      }
    }
    return res.status(401).end();
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

function logoutUsuario(req: Request, res: Response, next: any) {
  res.json({ auth: false, token: null });
}

export default {
  getUsuarios,
  addUsuario,
  getUsuario,
  getUsuarioPorEmail,
  updateUsuario,
  loginUsuario,
  logoutUsuario,
  deleteUsuario,
  getLogin,
};
