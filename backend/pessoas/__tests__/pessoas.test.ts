import supertest from "supertest";
import app from "../src/app";
import usuariosApp from "../../usuarios/src/app";
import { IPessoa } from "../src/models/pessoa";
import repository from "../src/models/pessoaRepository";

const testEmail = "jest@usuarios.com";
const testSenha = "123456";
let jwt: string = "";
let testUsuarioId: number = 0;
let testPessoaId: number = 0;
let testPessoaId2: number = 0;

beforeAll(async () => {
  const usuarioTesteLogado = {
    email: "patrickalcantara214@gmail.com",
    senha: "123456",
  };

  const usuarioLogin = await supertest(usuariosApp)
    .post("/usuarios/login")
    .send(usuarioTesteLogado);

  const testUsuario = {
    nome: "jest2",
    email: testEmail,
    senha: testSenha,
  };

  const usuario = await supertest(usuariosApp)
    .post("/usuarios/")
    .send(testUsuario)
    .set("x-access-token", usuarioLogin.body.token);

  testUsuarioId = usuario.body.id;

  const result = await supertest(usuariosApp).post("/usuarios/login").send({
    email: testEmail,
    senha: testSenha,
  });

  jwt = result.body.token;

  const pessoa: IPessoa = {
    nome: "Patrick Anderson",
    email: "patrick@gmail.com",
    logradouro: "Rua Rui Barbosa",
    numero: "1151",
    bairro: "São Vicente",
    cep: "63640-000",
    cidade: "Independencia",
    uf: "CE",
    ativo: true,
  };

  const testPessoa = await repository.add(pessoa);

  testPessoaId = testPessoa.id!;
});

afterAll(async () => {
  await supertest(usuariosApp)
    .delete("/usuarios/" + testUsuarioId)
    .set("x-access-token", jwt);
  await supertest(usuariosApp).post("/usuarios/logout");

  repository.deletePessoaById(testPessoaId);

  repository.deletePessoaById(testPessoaId2);
});

describe("Testando rotas de pessoas", () => {
  //Teste da função GET retornando todas as pessoas
  it("GET /pessoas/ - Deve retornar um statusCode 200", async () => {
    const resultado = await supertest(app)
      .get("/pessoas/")
      .set("x-access-token", jwt);

    expect(resultado.status).toEqual(200);
    expect(Array.isArray(resultado.body)).toBeTruthy();
  });

  it("GET /pessoas/ - Deve retornar um statusCode 401", async () => {
    const resultado = await supertest(app).get("/pessoas/");

    expect(resultado.status).toEqual(401);
  });

  //Teste da função GET retornando apenas uma pessoa
  it("GET /pessoas/:id - Deve retornar um statusCode 200", async () => {
    const resultado = await supertest(app)
      .get("/pessoas/" + testPessoaId)
      .set("x-access-token", jwt);

    expect(resultado.status).toEqual(200);
    expect(resultado.body.id).toEqual(testPessoaId);
  });

  //Teste da função GET retornando apenas uma pessoa
  it("GET /pessoas/:id - Deve retornar um statusCode 404", async () => {
    const resultado = await supertest(app)
      .get("/pessoas/-1")
      .set("x-access-token", jwt);

    expect(resultado.status).toEqual(404);
  });

  //Teste da função GET retornando apenas uma pessoa
  it("GET /pessoas/:id - Deve retornar um statusCode 400", async () => {
    const resultado = await supertest(app)
      .get("/pessoas/abc")
      .set("x-access-token", jwt);

    expect(resultado.status).toEqual(400);
  });

  //Teste da função GET retornando apenas uma pessoa
  it("GET /pessoas/:id - Deve retornar um statusCode 401", async () => {
    const resultado = await supertest(app).get("/pessoas/abc");

    expect(resultado.status).toEqual(401);
  });

  //Teste da função POST adicionando uma pessoa
  it("POST /pessoas/ - Deve retornar um statusCode 201", async () => {
    const pessoa: IPessoa = {
      nome: "Katiane Aguiar",
      email: "katiane@gmail.com",
      logradouro: "Rua Rui Barbosa",
      numero: "1151",
      bairro: "São Vicente",
      cep: "63640-000",
      cidade: "Independencia",
      uf: "CE",
      ativo: true,
    };

    const resultado = await supertest(app)
      .post("/pessoas/")
      .set("x-access-token", jwt)
      .send(pessoa);

    testPessoaId2 = parseInt(resultado.body.id);

    expect(resultado.status).toEqual(201);
    expect(resultado.body.id).toBeTruthy();
  });

  //Teste da função POST adicionando uma pessoa
  it("POST /pessoas/ - Deve retornar um statusCode 422", async () => {
    const payload = {
      nome: "Katiane Aguiar",
      email: "katiane@gmail.com",
      logradouro: "Rua Rui Barbosa",
      numero: "1151",
    };

    const resultado = await supertest(app)
      .post("/pessoas/")
      .set("x-access-token", jwt)
      .send(payload);

    expect(resultado.status).toEqual(422);
  });

  //Teste da função POST adicionando uma pessoa
  it("POST /pessoas/ - Deve retornar um statusCode 401", async () => {
    const pessoa: IPessoa = {
      nome: "Katiane Dimas",
      email: "katiane@gmail.com",
      logradouro: "Rua Rui Barbosa",
      numero: "1151",
      bairro: "São Vicente",
      cep: "63640-000",
      cidade: "Independencia",
      uf: "CE",
      ativo: true,
    };

    const resultado = await supertest(app).post("/pessoas/").send(pessoa);

    expect(resultado.status).toEqual(401);
  });

  //Teste da função PATCH atualizando uma pessoa
  it("PATCH /pessoas/ - Deve retornar um statusCode 200", async () => {
    const pessoa = {
      nome: "Katiane Aguiar",
      email: "katiane@gmail.com",
    };

    const resultado = await supertest(app)
      .patch("/pessoas/" + testPessoaId)
      .set("x-access-token", jwt)
      .send(pessoa);

    expect(resultado.status).toEqual(200);
    expect(resultado.body.nome).toEqual("Katiane Aguiar");
    expect(resultado.body.email).toEqual("katiane@gmail.com");
  });

  //Teste da função PATCH atualizando uma pessoa
  it("PATCH /pessoas/ - Deve retornar um statusCode 400", async () => {
    const pessoa = {
      nome: "Katiane Aguiar",
      email: "katiane@gmail.com",
    };

    const resultado = await supertest(app)
      .patch("/pessoas/abc")
      .set("x-access-token", jwt)
      .send(pessoa);

    expect(resultado.status).toEqual(400);
  });

  //Teste da função PATCH atualizando uma pessoa
  it("PATCH /pessoas/ - Deve retornar um statusCode 404", async () => {
    const pessoa = {
      nome: "Katiane Aguiar",
      email: "katiane@gmail.com",
    };

    const resultado = await supertest(app)
      .patch("/pessoas/-1")
      .set("x-access-token", jwt)
      .send(pessoa);

    expect(resultado.status).toEqual(404);
  });

  //Teste da função PATCH atualizando uma pessoa
  it("PATCH /pessoas/ - Deve retornar um statusCode 401", async () => {
    const pessoa = {
      nome: "Katiane Aguiar",
      email: "katiane@gmail.com",
    };

    const resultado = await supertest(app)
      .patch("/pessoas/" + testPessoaId)
      .send(pessoa);

    expect(resultado.status).toEqual(401);
  });
});
