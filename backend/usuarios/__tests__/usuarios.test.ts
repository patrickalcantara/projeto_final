import supertest from "supertest";
import app from "../src/app";
import repository from "../src/models/usuarioRepository";
import { IUsuario } from "../src/models/usuario";
import auth from "../src/auth";

const testEmail = "jest@usuarios.com";
const hashSenha =
  "$2a$10$CKC4oeQ9sZ1rVW6VHII.feRNvfb/GzbHFwWCnUeepgmwESsc/Dliy"; //123456
const testNome = "jest";

let testId: number = 0;
let jwt: string = "";

beforeAll(async () => {
  const testUsuario: IUsuario = {
    nome: testNome,
    email: testEmail,
    senha: hashSenha,
  };

  const result = await repository.add(testUsuario);

  testId = result.id!;
  jwt = auth.sign(result.id!);
});

afterAll(async () => {
  await repository.deleteUsuarioByEmail(testEmail);
  await repository.deleteUsuarioByEmail("jest2k@jest.com");
});

describe("Testando rotas do usuarios", () => {
  //Teste da função GET retornando todos os usuários
  it("GET /usuarios/ - Deve retornar um statusCode 200", async () => {
    const resultado = await supertest(app)
      .get("/usuarios/")
      .set("x-access-token", jwt);

    expect(resultado.status).toEqual(200);
    expect(Array.isArray(resultado.body)).toBeTruthy();
  });

  //Teste da função POST
  it("POST /usuarios/ - Deve retornar statusCode 201", async () => {
    const payload = {
      nome: "jest2",
      email: "jest2k@jest.com",
      senha: "123456",
    };

    const resultado = await supertest(app)
      .post("/usuarios/")
      .set("x-access-token", jwt)
      .send(payload);

    expect(resultado.status).toEqual(201);
    expect(resultado.body.id).toBeTruthy();
  });

  //Teste da função POST
  it("POST /usuarios/ - Deve retornar statusCode 400", async () => {
    const payload = {
      endereco: "Rui Barbosa",
      cidade: "independencia",
      estado: "CE",
    };

    const resultado = await supertest(app)
      .post("/usuarios/")
      .set("x-access-token", jwt)
      .send(payload);

    expect(resultado.status).toEqual(422);
  });

  //Teste da função GET retornando apenas um usuário
  it("GET /usuarios/:id - Deve retornar um statusCode 200", async () => {
    const resultado = await supertest(app)
      .get("/usuarios/" + testId)
      .set("x-access-token", jwt);

    expect(resultado.status).toEqual(200);
    expect(resultado.body.id).toEqual(testId);
  });

  //Teste da função GET retornando apenas um usuário
  it("GET /usuarios/:id - Deve retornar um statusCode 400", async () => {
    const resultado = await supertest(app)
      .get("/usuarios/abc")
      .set("x-access-token", jwt);

    expect(resultado.status).toEqual(400);
  });

  //Teste da função GET retornando apenas um usuário
  it("GET /usuarios/:id - Deve retornar um statusCode 403", async () => {
    const resultado = await supertest(app)
      .get("/usuarios/-1")
      .set("x-access-token", jwt);

    expect(resultado.status).toEqual(403);
  });

  //Testando a função de Atualização da conta PATCH
  it("PATCH /usuarios/:id - Deve retornar statusCode 200", async () => {
    const payload = {
      nome: "Patrick Anderson",
    };

    const resultado = await supertest(app)
      .patch("/usuarios/" + testId)
      .set("x-access-token", jwt)
      .send(payload);

    expect(resultado.status).toEqual(200);
    expect(resultado.body.id).toEqual(testId);
    expect(resultado.body.nome).toEqual(payload.nome);
  });

  //Testando a função de Atualização da conta PATCH
  it("PATCH /usuarios/:id - Deve retornar statusCode 400", async () => {
    const payload = {
      nome: "Patrick Anderson",
    };

    const resultado = await supertest(app)
      .patch("/usuarios/abc")
      .set("x-access-token", jwt)
      .send(payload);

    expect(resultado.status).toEqual(400);
  });

  //Testando a função de Atualização da conta PATCH
  it("PATCH /usuarios/:id - Deve retornar statusCode 403", async () => {
    const payload = {
      nome: "Patrick Anderson",
    };

    const resultado = await supertest(app)
      .patch("/usuarios/-1")
      .set("x-access-token", jwt)
      .send(payload);

    expect(resultado.status).toEqual(403);
  });

  //Testando a função de Delete da conta DELETE
  it("DELETE /usuarios/:id - Deve retornar statusCode 204", async () => {
    const resultado = await supertest(app)
      .delete("/usuarios/" + testId)
      .set("x-access-token", jwt);

    expect(resultado.status).toEqual(204);
  });

  //Testando a função de Delete da conta DELETE
  it("DELETE /usuarios/:id - Deve retornar statusCode 403", async () => {
    const resultado = await supertest(app)
      .delete("/usuarios/-1")
      .set("x-access-token", jwt);

    expect(resultado.status).toEqual(403);
  });
});
