import { Request, Response } from "express";
import { ILancamento } from "../models/lancamento";
import repository from "../models/lancamentoRepository";

async function getLancamentos(req: Request, res: Response, next: any) {
  const lancamentos = await repository.findAll();
  return res.status(200).json(lancamentos);
}

async function getLancamento(req: Request, res: Response, next: any) {
  try {
    const lancamentoId = parseInt(req.params.id);
    if (!lancamentoId) return res.status(400).end();

    const lancamento = await repository.findById(lancamentoId);
    if (lancamento === null) res.status(404).end();

    res.status(200).json(lancamento);
  } catch (error) {
    res.status(400).end();
  }
}

async function addLancamento(req: Request, res: Response, next: any) {
  try {
    const lancamento = req.body as ILancamento;
    const newLancamento = await repository.add(lancamento);

    res.status(201).json(newLancamento);
  } catch (error) {
    res.status(400).end();
  }
}

async function updateLancamento(req: Request, res: Response, next: any) {
  try {
    const id = parseInt(req.params.id);
    if (!id) return res.status(400).end();
    const newLancamento = req.body as ILancamento;

    const originalLancamento = await repository.set(id, newLancamento);
    if (!originalLancamento) return res.status(404).end();

    return res.status(200).json(originalLancamento);
  } catch (error) {
    res.status(400).end();
  }
}

async function populaGrafico(req: Request, res: Response, next: any) {
  const ano = parseInt(req.params.ano);
  if (!ano) return res.status(400).end();
  const dadosGrafico: Array<any> = await repository.populaGrafico(ano);

  let dadosGraficoPronto: Array<any> = [];

  dadosGrafico.forEach((value) => {
    const indice = dadosGraficoPronto.findIndex(
      (dado) => dado.Mes === value.Mes
    );
    if (indice >= 0) {
      if (value.Tipo === 100) {
        dadosGraficoPronto[indice].Receitas = value.Soma;
      } else {
        dadosGraficoPronto[indice].Despesas = value.Soma;
      }
    } else {
      if (value.Tipo === 100)
        dadosGraficoPronto.push({
          Mes: value.Mes,
          Receitas: value.Soma,
          Despesas: "",
        });
      else
        dadosGraficoPronto.push({
          Mes: value.Mes,
          Receitas: "",
          Despesas: value.Soma,
        });
    }
  });

  dadosGraficoPronto = dadosGraficoPronto.map((valor) => {
    const formatter = new Intl.DateTimeFormat("pt-BR", { month: "long" });

    valor.Mes = formatter
      .format(new Date().setMonth(valor.Mes - 1))
      .toUpperCase();

    return valor;
  });

  return res.json(dadosGraficoPronto);
}

export default {
  getLancamentos,
  getLancamento,
  addLancamento,
  updateLancamento,
  populaGrafico,
};
