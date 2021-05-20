import { Request, Response } from "express";
import { IPessoa } from "../models/pessoa";
import repository from "../models/pessoaRepository";

async function getPessoas(req: Request, res: Response, next: any) {
  const pessoas: IPessoa[] = await repository.findAll();
  return res.status(200).json(pessoas);
}

async function getPessoa(req: Request, res: Response, next: any) {
  try {
    const pessoaId = parseInt(req.params.id);
    if (!pessoaId) return res.status(400).end();

    const pessoa = await repository.findById(pessoaId);
    if (pessoa === null) res.status(404).end();

    res.status(200).json(pessoa);
  } catch (error) {
    res.status(400).end();
  }
}

async function addPessoa(req: Request, res: Response, next: any) {
  try {
    const pessoa = req.body as IPessoa;
    const newPessoa = await repository.add(pessoa);

    res.status(201).json(newPessoa);
  } catch (error) {
    res.status(400).end();
  }
}

async function updatePessoa(req: Request, res: Response, next: any) {
  try {
    const id = parseInt(req.params.id);
    if (!id) return res.status(400).end();
    const newPessoa = req.body as IPessoa;

    const originalPessoa = await repository.set(id, newPessoa);
    if (!originalPessoa) return res.status(404).end();

    return res.status(200).json(originalPessoa);
  } catch (error) {
    res.status(400).end();
  }
}

export default { getPessoas, getPessoa, addPessoa, updatePessoa };
