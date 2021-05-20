import Joi from "joi";

const pessoaSchema = Joi.object({
  id: Joi.number().integer().min(1),
  nome: Joi.string().min(5).max(150).required(),
  email: Joi.string().email(),
  ativo: Joi.boolean().default(true),
  logradouro: Joi.string().min(5).max(150).required(),
  numero: Joi.string().min(1).max(20).required(),
  complemento: Joi.string().max(150).allow(null, ""),
  bairro: Joi.string().min(5).max(100).required(),
  cep: Joi.string().min(5).max(10).required(),
  cidade: Joi.string().min(5).max(100).required(),
  uf: Joi.string().min(2).max(5),
});

const pessoaUpdateSchema = Joi.object({
  nome: Joi.string().min(5).max(150),
  email: Joi.string().email(),
  ativo: Joi.boolean(),
  logradouro: Joi.string().min(5).max(150),
  numero: Joi.string().min(1).max(20),
  complemento: Joi.string().max(150).allow(null, ""),
  bairro: Joi.string().min(5).max(100),
  cep: Joi.string().min(5).max(10),
  cidade: Joi.string().min(5).max(100),
  uf: Joi.string().min(2).max(5),
});

export { pessoaSchema, pessoaUpdateSchema };
