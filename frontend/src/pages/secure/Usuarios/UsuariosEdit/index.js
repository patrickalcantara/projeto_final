import React from "react";
import { Alert, Button, Col, Container, Form } from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import UsuariosService from "../../../../services/usuarios";
import Footer from "../../../../shared/Footer";
import Header from "../../../../shared/Header";
import { PageContent } from "../../../../shared/styles";

class UsuariosEdit extends React.Component {
  service;
  usuarioId;

  constructor(props) {
    super(props);

    this.service = new UsuariosService();
    this.usuarioId = this.props.match.params.usuarioId;

    this.state = {
      nome: "",
      senha: "",
      confirmaSenha: "",
      error: "",
      isLoading: true,
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

    const { nome, senha, confirmaSenha } = this.state;

    if (!nome || !senha || !confirmaSenha) {
      this.setState({ error: "Informe todos os campos obrigatórios!" });
    } else if (senha !== confirmaSenha) {
      this.setState({ error: "As senhas informadas são incompatíveis" });
    } else {
      try {
        await this.service.update(this.usuarioId, { nome, senha });
        this.props.history.push("/usuarios");
      } catch (error) {
        this.setState({ error: "Ocorreu um erro!" });
      }
    }
  };

  async componentDidMount() {
    try {
      const result = await this.service.getOne(this.usuarioId);
      this.setState({
        nome: result.nome,
        isLoading: false,
      });
    } catch (error) {
      if (error.status === 403) {
        this.props.history.push("/usuarios");
      }
    }
  }

  render() {
    const { error, isLoading } = this.state;

    return (
      <>
        <Header />
        <PageContent>
          <Container>
            {error && this.renderError()}
            {!isLoading && (
              <Form onSubmit={this.handleSubmit}>
                <Form.Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>NOME:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Informe um nome de usuário"
                        onChange={(e) =>
                          this.setState({ nome: e.target.value })
                        }
                        value={this.state.nome}
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
                        onChange={(e) =>
                          this.setState({ senha: e.target.value })
                        }
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
            )}
          </Container>
        </PageContent>
        <Footer />
      </>
    );
  }
}

export default withRouter(UsuariosEdit);
