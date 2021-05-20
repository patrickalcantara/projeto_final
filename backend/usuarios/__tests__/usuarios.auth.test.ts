import supertest from "supertest";
import app from "../src/app";
import repository from "../src/models/usuarioRepository";
import { IUsuario } from "../src/models/usuario";
import auth from "../src/auth";

const testEmail = "jest@auth.com";
const testSenha = "123456";
const hashSenha =
  "$2a$10$CKC4oeQ9sZ1rVW6VHII.feRNvfb/GzbHFwWCnUeepgmwESsc/Dliy"; //123456
const testNome = "jest";
let jwt = "";

beforeAll(async () => {
  const testUsuario: IUsuario = {
    nome: testNome,
    email: testEmail,
    senha: hashSenha,
  };

  const result = await repository.add(testUsuario);
  jwt = auth.sign(result.id!);
});

afterAll(async () => {
  //await repository.deleteUsuarioByEmail(testEmail);
});

describe("Testando rotas da autenticação", () => {
  //Testando o login com credenciais válidas
  it("POST /usuarios/login - 200 OK", async () => {
    //testando
    const payload = {
      email: testEmail,
      senha: testSenha,
    };

    const resultado = await supertest(app)
      .post("/usuarios/login")
      .send(payload);

    expect(resultado.status).toEqual(200);
    expect(resultado.body.auth).toBeTruthy();
    expect(resultado.body.token).toBeTruthy();
  });

  //Testando o Login com payload inválidas
  it("POST /usuarios/login - 422", async () => {
    const payload = {
      email: testEmail,
    };

    const resultado = await supertest(app)
      .post("/usuarios/login")
      .send(payload);

    expect(resultado.status).toEqual(422);
  });

  //Testando o Login com credeciais inválidas
  it("POST /usuarios/login - 401", async () => {
    const payload = {
      email: testEmail,
      senha: testSenha + 1,
    };

    const resultado = await supertest(app)
      .post("/usuarios/login")
      .send(payload);

    expect(resultado.status).toEqual(401);
  });

  it("POST /usuarios/logout - 200 OK", async () => {
    const resultado = await supertest(app)
      .post("/usuarios/logout")
      .set("x-access-token", jwt);

    expect(resultado.status).toEqual(200);
  });
});
