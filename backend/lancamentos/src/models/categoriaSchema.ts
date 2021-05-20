import Joi from "joi";

const categoriaSchema = Joi.object({
  id: Joi.number().integer().min(1),
  nome: Joi.string().min(5).max(100).required(),
  descricao: Joi.string().min(5).max(100).required(),
});

export { categoriaSchema };
