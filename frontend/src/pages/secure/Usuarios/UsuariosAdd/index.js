import React from "react";
import { Alert, Button, Col, Container, Form } from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import UsuariosService from "../../../../services/usuarios";
import Footer from "../../../../shared/Footer";
import Header from "../../../../shared/Header";
import { PageContent } from "../../../../shared/styles";

class UsuariosAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: "",
      email: "",
      senha: "",
      confirmaSenha: "",
      error: "",
    };
  }

  renderError = () => {
    return (
      <Alert
        variant="danger"
        dismissible
        onClose={() => {
          this.setState({ error: "" });
        }}
      >
        {this.state.error}
      </Alert>
    );
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { nome, email, senha, confirmaSenha } = this.state;

    if (!nome || !email || !senha || !confirmaSenha) {
      this.setState({ error: "Informe todos os campos obrigatórios!" });
    } else if (senha !== confirmaSenha) {
      this.setState({ error: "As senhas informadas são incompatíveis" });
    } else {
      try {
        const service = new UsuariosService();
        await service.add({ nome, email, senha });
        this.props.history.push("/usuarios");
      } catch (error) {
        if (error.data === "SequelizeUniqueConstraintError") {
          this.setState({ error: "O email informado já foi cadastrado." });
        } else {
          this.setState({ error: "Ocorreu um erro!" });
        }
      }
    }
  };

  render() {
    const { error } = this.state;

    return (
      <>
        <Header />
        <PageContent>
          <Container>
            {error && this.renderError()}
            <Form onSubmit={this.handleSubmit}>
              <Form.Row>
                <Col>
                  <Form.Group>
                    <Form.Label>NOME:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Informe um nome de usuário"
                      onChange={(e) => this.setState({ nome: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>EMAIL:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Informe um nome de email"
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group>
                    <Form.Label>SENHA:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Informe uma senha"
                      onChange={(e) => this.setState({ senha: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>CONFIRME A SENHA:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirme sua senha"
                      onChange={(e) =>
                        this.setState({ confirmaSenha: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Button className="button-login" type="submit">
                  SALVAR
                </Button>
                <Link className="btn button-cancel" to="/usuarios">
                  CANCELAR
                </Link>
              </Form.Row>
            </Form>
          </Container>
        </PageContent>
        <Footer />
      </>
    );
  }
}

export default withRouter(UsuariosAdd);
