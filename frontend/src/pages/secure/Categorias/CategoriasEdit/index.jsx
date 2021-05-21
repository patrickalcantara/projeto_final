import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import CategoriaService from "../../../../services/categorias";
import Footer from "../../../../shared/Footer";
import Header from "../../../../shared/Header";
import { PageContent } from "../../../../shared/styles";

export default function CategoriasEdit(props) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const categoriaId = props.match.params.categoriaId;

  const RenderError = () => {
    return (
      <Alert variant="danger" dismissible onClose={() => setErro("")}>
        {erro}
      </Alert>
    );
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (!nome || !descricao) {
      setErro("Preencha todos os campos obrigatórios");
    } else {
      try {
        const service = new CategoriaService();
        await service.update(categoriaId, { nome, descricao });
        props.history.push("/categorias");
      } catch (error) {
        setErro("Ocorreu um erro.");
      }
    }
  }

  useEffect(() => {
    const abortController = new AbortController();
    async function getCategoria() {
      try {
        const service = new CategoriaService();
        const result = await service.getOne(categoriaId);

        if (!result.ativo) props.history.push("/categorias");
        setNome(result.nome);
        setDescricao(result.descricao);
        setLoading(false);
      } catch (error) {
        console.log(error);
        props.history.push("/categorias");
      }
    }
    getCategoria();

    return () => {
      abortController.abort();
    };
  }, [props, categoriaId]);

  return (
    <>
      <Header />

      <PageContent>
        <Container>
          {erro && <RenderError />}
          {!loading && (
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Form.Row>
                <Col>
                  <Form.Group>
                    <Form.Label>NOME:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Informe o nome da categoria."
                      value={nome}
                      onChange={(e) => {
                        setNome(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>DESCRIÇÃO:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Informe uma descrição da categoria."
                      value={descricao}
                      onChange={(e) => {
                        setDescricao(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Button className="button-login" type="submit">
                    SALVAR
                  </Button>
                  <Link className="btn button-cancel" to="/categorias">
                    CANCELAR
                  </Link>
                </Col>
              </Form.Row>
            </Form>
          )}
        </Container>
      </PageContent>
      <Footer />
    </>
  );
}
