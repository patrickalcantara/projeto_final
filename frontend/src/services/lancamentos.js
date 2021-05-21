import baseAPI from "./api";
import baseURLs from "../configs/baseURLs";

class LancamentosService {
  constructor() {
    this.api = baseAPI(baseURLs.API_LANCAMENTOS);
  }

  async getAll() {
    const result = await this.api.get("lancamentos");
    return result.data;
  }

  async getOne(lancamentosId) {
    const result = await this.api.get(`lancamentos/${lancamentosId}`);

    return result.data;
  }

  async add(lancamentosModel) {
    const result = await this.api.post("lancamentos", lancamentosModel);

    return result;
  }

  async update(lancamentosId, lancamentosModel) {
    const result = await this.api.patch(
      `lancamentos/${lancamentosId}`,
      lancamentosModel
    );

    return result;
  }

  async delete(id) {
    const result = await this.api.delete(`lancamentos/${id}`);
    return result;
  }
}

export default LancamentosService;
