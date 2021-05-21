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

export default {
  getLancamentos,
  getLancamento,
  addLancamento,
  updateLancamento,
};
