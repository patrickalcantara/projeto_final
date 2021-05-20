import baseAPI from "./api";
import baseURLs from "../configs/baseURLs";

class PessoasService {
  constructor() {
    this.api = baseAPI(baseURLs.API_PESSOAS);
  }

  async getAll() {
    const result = await this.api.get("pessoas");
    return result.data;
  }

  async getOne(pessoaId) {
    const result = await this.api.get(`pessoas/${pessoaId}`);

    return result.data;
  }

  async add(pessoaModel) {
    const result = await this.api.post("pessoas", pessoaModel);

    return result;
  }

  async update(pessoaId, pessoaModel) {
    const result = await this.api.patch(`pessoas/${pessoaId}`, pessoaModel);

    return result;
  }
}

export default PessoasService;
