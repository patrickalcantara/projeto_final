import Joi from "joi";

const usuarioSchema = Joi.object({
  id: Joi.number().integer().min(1),
  nome: Joi.string().min(5).max(150).required(),
  email: Joi.string().email().required().min(10).max(150),
  senha: Joi.string().min(6).max(50).required(),
  permissao: Joi.number().integer().min(100).max(400),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().min(10).max(150),
  senha: Joi.string().min(6).max(50).required(),
});

const updateSchema = Joi.object({
  nome: Joi.string().min(5).max(150),
  senha: Joi.string().min(6).max(50),
});

export { usuarioSchema, loginSchema, updateSchema };
