import { useState } from "react";
import { Alert, Button, Col, Container, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import CategoriaService from "../../../../services/categorias";
import Footer from "../../../../shared/Footer";
import Header from "../../../../shared/Header";
import { PageContent } from "../../../../shared/styles";

export default function CategoriasAdd() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("");
  const history = useHistory();

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
      setErro("Preencha todos os campos obrigatórios.");
    } else {
      try {
        const service = new CategoriaService();
        await service.add({ nome, descricao });
        history.push("/categorias");
        // console.log({ nome, descricao });
      } catch (error) {
        setErro("Ocorreu um erro!");
      }
    }
  }

  return (
    <>
      <Header />
      <PageContent>
        <Container>
          {erro && <RenderError />}
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>NOME:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Informe o nome da categoria."
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
        </Container>
      </PageContent>
      <Footer />
    </>
  );
}
