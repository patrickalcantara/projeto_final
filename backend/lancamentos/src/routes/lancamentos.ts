import { Router } from "express";
import middlewareCommons from "sc-commons/api/routes/middlewares";
import lancamentosController from "../controllers/lancamentosController";
import categoriasController from "../controllers/categoriasController";
import {
  validateLancamentoSchema,
  validateCategoriaSchema,
} from "./middlewares";

const router = Router();

//Rotas de lancamentos
router.get(
  "/lancamentos/",
  middlewareCommons.validateAuth,
  lancamentosController.getLancamentos
);

router.get(
  "/lancamentos/:id",
  middlewareCommons.validateAuth,
  lancamentosController.getLancamento
);

router.post(
  "/lancamentos/",
  middlewareCommons.validateAuth,
  validateLancamentoSchema,
  lancamentosController.addLancamento
);

router.patch(
  "/lancamentos/:id",
  middlewareCommons.validateAuth,
  validateLancamentoSchema,
  lancamentosController.updateLancamento
);

//Rotas de categorias
router.get(
  "/categorias/",
  middlewareCommons.validateAuth,
  categoriasController.getCategorias
);

router.get(
  "/categorias/:id",
  middlewareCommons.validateAuth,
  categoriasController.getCategoria
);

router.post(
  "/categorias/",
  middlewareCommons.validateAuth,
  validateCategoriaSchema,
  categoriasController.addCategoria
);

router.patch(
  "/categorias/:id",
  middlewareCommons.validateAuth,
  validateCategoriaSchema,
  categoriasController.updateCategoria
);

export default router;
