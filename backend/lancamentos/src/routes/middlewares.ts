import { lancamentoSchema } from "../models/lancamentoSchema";
import { categoriaSchema } from "../models/categoriaSchema";
import { Response, Request } from "express";
import commonsMiddlewares from "sc-commons/api/routes/middlewares";

function validateLancamentoSchema(req: Request, res: Response, next: any) {
  return commonsMiddlewares.validateSchema(lancamentoSchema, req, res, next);
}

function validateCategoriaSchema(req: Request, res: Response, next: any) {
  return commonsMiddlewares.validateSchema(categoriaSchema, req, res, next);
}

export { validateLancamentoSchema, validateCategoriaSchema };
