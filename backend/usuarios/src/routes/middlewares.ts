import {
  usuarioSchema,
  loginSchema,
  updateSchema,
} from "../models/usuarioSchemas";
import { Response, Request } from "express";
import commonsMiddlewares from "sc-commons/api/routes/middlewares";
import commonsController from "sc-commons/api/controllers/controllers";
import { Token } from "sc-commons/api/auth";

function validateUsuarioSchema(req: Request, res: Response, next: any) {
  return commonsMiddlewares.validateSchema(usuarioSchema, req, res, next);
}

function validateLoginSchema(req: Request, res: Response, next: any) {
  return commonsMiddlewares.validateSchema(loginSchema, req, res, next);
}

function validateUpdateSchema(req: Request, res: Response, next: any) {
  return commonsMiddlewares.validateSchema(updateSchema, req, res, next);
}

async function validateAuth(req: Request, res: Response, next: any) {
  return commonsMiddlewares.validateAuth(req, res, next);
}

function validadeAutorization(req: Request, res: Response, next: any) {
  const id = parseInt(req.params.id);
  if (!id) return res.status(400).end();

  const token = commonsController.getToken(res) as Token;
  if (id !== token.usuarioId) res.status(403).end();

  next();
}

export {
  validateUsuarioSchema,
  validateLoginSchema,
  validateUpdateSchema,
  validateAuth,
  validadeAutorization,
};
