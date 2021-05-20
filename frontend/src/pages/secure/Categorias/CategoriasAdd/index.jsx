import { useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import Footer from "../../../../shared/Footer";
import Header from "../../../../shared/Header";
import { PageContent } from "../../../../shared/styles";

export default function CategoriasAdd() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("Erro");

  const RenderError = () => {
    return (
      <Alert variant="danger" dismissible onClose={() => setErro("")}>
        {erro}
      </Alert>
    );
  };

  return (
    <>
      <Header />
      <PageContent>
        <Container>
          {erro && <RenderError />}
          <Form>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>NOME:</Form.Label>
                </Form.Group>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </PageContent>
      <Footer />
    </>
  );
}
