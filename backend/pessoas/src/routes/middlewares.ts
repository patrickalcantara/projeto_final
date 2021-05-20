import { pessoaSchema, pessoaUpdateSchema } from "../models/pessoaSchema";
import { Response, Request } from "express";
import commonsMiddlewares from "sc-commons/api/routes/middlewares";

function validatePessoaSchema(req: Request, res: Response, next: any) {
  return commonsMiddlewares.validateSchema(pessoaSchema, req, res, next);
}

function validateUpdateSchema(req: Request, res: Response, next: any) {
  return commonsMiddlewares.validateSchema(pessoaUpdateSchema, req, res, next);
}

export { validatePessoaSchema, validateUpdateSchema };
