import { Router } from "express";
import middlewareCommons from "sc-commons/api/routes/middlewares";
import pessoasController from "../controllers/pessoasController";
import { validatePessoaSchema, validateUpdateSchema } from "./middlewares";

const router = Router();

//Rota para todas as pessoas
router.get(
  "/pessoas/",
  middlewareCommons.validateAuth,
  pessoasController.getPessoas
);

//Rota para uma pessoa
router.get(
  "/pessoas/:id",
  middlewareCommons.validateAuth,
  pessoasController.getPessoa
);

router.post(
  "/pessoas/",
  middlewareCommons.validateAuth,
  validatePessoaSchema,
  pessoasController.addPessoa
);

router.patch(
  "/pessoas/:id",
  middlewareCommons.validateAuth,
  validateUpdateSchema,
  pessoasController.updatePessoa
);

export default router;
