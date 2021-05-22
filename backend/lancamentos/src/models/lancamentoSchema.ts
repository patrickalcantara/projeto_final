import Joi from "joi";

const lancamentoSchema = Joi.object({
  id: Joi.number().integer().min(1),
  tipo: Joi.number().integer().min(100).max(200).required(),
  pessoaId: Joi.number().integer().required(),
  categoriaId: Joi.number().integer().required(),
  descricao: Joi.string().min(5).max(100).required(),
  dataPagamento: Joi.date().required(),
  dataVencimento: Joi.date().required(),
  valor: Joi.number().required(),
  observacoes: Joi.string().allow(null, ""),
});

export { lancamentoSchema };
