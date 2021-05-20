import baseAPI from "./api";
import baseURLs from "../configs/baseURLs";

class UsuariosService {
  constructor() {
    this.api = baseAPI(baseURLs.API_USUARIOS);
  }

  async login(email, senha) {
    const result = await this.api.post("usuarios/login", { email, senha });
    return result;
  }

  async getLogin() {
    const result = await this.api.get("/verificaLogin");
    return result.data;
  }

  async getAll() {
    const result = await this.api.get("/usuarios");
    return result.data;
  }

  async add(usuario) {
    const result = await this.api.post("/usuarios", usuario);
    return result;
  }

  async getOne(id) {
    const result = await this.api.get(`/usuarios/${id}`);
    return result.data;
  }

  async update(id, usuario) {
    const result = await this.api.patch(`/usuarios/${id}`, usuario);
    return result;
  }
}

export default UsuariosService;
