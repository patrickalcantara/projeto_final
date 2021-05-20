import { Router } from "express";
import usuariosController from "../controllers/usuariosController";
import {
  validateLoginSchema,
  validateUsuarioSchema,
  validateUpdateSchema,
  validateAuth,
  validadeAutorization,
} from "./middlewares";

const router = Router();

//Lista todos os usuários
router.get("/usuarios", validateAuth, usuariosController.getUsuarios);

//adiciona um novo usuário
router.post(
  "/usuarios",
  validateAuth,
  validateUsuarioSchema,
  usuariosController.addUsuario
);

//Lista um usuário
router.get(
  "/usuarios/:id",
  validateAuth,
  validadeAutorization,
  usuariosController.getUsuario
);

//Verifica Login
router.get("/verificaLogin", validateAuth, usuariosController.getLogin);

//Atualiza um usuário
router.patch(
  "/usuarios/:id",
  validateAuth,
  validadeAutorization,
  validateUpdateSchema,
  usuariosController.updateUsuario
);

//Faz login
router.post(
  "/usuarios/login",
  validateLoginSchema,
  usuariosController.loginUsuario
);

//Faz Logout
router.post("/usuarios/logout", validateAuth, usuariosController.logoutUsuario);

//Deleta um usuário
router.delete(
  "/usuarios/:id",
  validateAuth,
  validadeAutorization,
  usuariosController.deleteUsuario
);

export default router;
