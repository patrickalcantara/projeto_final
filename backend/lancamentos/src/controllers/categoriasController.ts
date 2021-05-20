import { Request, Response } from "express";
import { ICategoria } from "../models/categoria";
import repository from "../models/categoriaRepository";

async function getCategorias(req: Request, res: Response, next: any) {
  const categorias: ICategoria[] = await repository.findAll();
  return res.status(200).json(categorias);
}

async function getCategoria(req: Request, res: Response, next: any) {
  try {
    const categoriaId = parseInt(req.params.id);
    if (!categoriaId) return res.status(400).end();

    const categoria = await repository.findById(categoriaId);
    if (categoria === null) res.status(404).end();

    res.status(200).json(categoria);
  } catch (error) {
    res.status(400).end();
  }
}

async function addCategoria(req: Request, res: Response, next: any) {
  try {
    const categoria = req.body as ICategoria;
    const newCategoria = await repository.add(categoria);

    res.status(201).json(newCategoria);
  } catch (error) {
    res.status(400).end();
  }
}

async function updateCategoria(req: Request, res: Response, next: any) {
  try {
    const id = parseInt(req.params.id);
    if (!id) return res.status(400).end();
    const newCategoria = req.body as ICategoria;

    const originalCategoria = await repository.set(id, newCategoria);
    if (!originalCategoria) return res.status(404).end();

    return res.status(200).json(originalCategoria);
  } catch (error) {
    res.status(400).end();
  }
}

export default {
  getCategorias,
  getCategoria,
  addCategoria,
  updateCategoria,
};
