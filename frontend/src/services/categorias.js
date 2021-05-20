import baseAPI from "./api";
import baseURLs from "../configs/baseURLs";

class CategoriaService {
  constructor() {
    this.api = baseAPI(baseURLs.API_LANCAMENTOS);
  }

  async getAll() {
    const result = await this.api.get("categorias");
    return result.data;
  }

  async getOne(categoriaId) {
    const result = await this.api.get(`categorias/${categoriaId}`);

    return result.data;
  }

  async add(categoriaModel) {
    const result = await this.api.post("categorias", categoriaModel);

    return result;
  }

  async update(categoriaId, categoriaModel) {
    const result = await this.api.patch(
      `categorias/${categoriaId}`,
      categoriaModel
    );

    return result;
  }
}

export default CategoriaService;
