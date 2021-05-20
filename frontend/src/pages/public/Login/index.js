import React from "react";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";

import { BoxForm, PageContent, PageHeader } from "../../../shared/styles/index";
import Logo from "../../../assets/logo.png";
import UsuariosService from "../../../services/usuarios";
import { login } from "../../../services/auth";
import Footer from "../../../shared/Footer/index";

class Login extends React.Component {
  state = {
    email: "",
    senha: "",
    erro: "",
    show: true,
  };

  handleLogin = async (event) => {
    event.preventDefault();
    const { email, senha } = this.state;

    if (!email || !senha) {
      this.setState({
        erro: "Informe todos os campos para acessar o sistema.",
      });
    } else {
      try {
        const service = new UsuariosService();
        const response = await service.login(email, senha);
        login(response.data.token);
        this.props.history.push("/");
      } catch (error) {
        console.log(error);
        this.setState({ erro: "Ocorreu um erro no login!" });
      }
    }
  };

  renderError = () => {
    return (
      <Alert
        variant="danger"
        dismissible
        onClose={() => {
          this.setState({ erro: "" });
        }}
      >
        {this.state.erro}
      </Alert>
    );
  };

  render() {
    return (
      <>
        <PageHeader></PageHeader>
        <PageContent>
          <Container>
            <Row className="justify-content-center">
              <Col xl={4} lg={5} md={6} sm={8} xs={8}>
                <BoxForm>
                  <Row className="justify-content-center">
                    <div>
                      <img
                        alt="Sis Contábil"
                        src={Logo}
                        className="logo-login"
                      />
                    </div>
                  </Row>
                  <Form onSubmit={this.handleLogin}>
                    {this.state.erro && this.renderError()}
                    <Form.Group controlId="frmLoginEmail">
                      <Form.Label style={{ color: "#DB6400" }}>
                        EMAIL:
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Informe seu email"
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="frmLoginSenha">
                      <Form.Label style={{ color: "#DB6400" }}>
                        SENHA:
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Informe sua senha"
                        onChange={(e) =>
                          this.setState({ senha: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Row className="justify-content-center">
                      <Button
                        type="submit"
                        variant="warning"
                        className="button-login"
                      >
                        LOGIN
                      </Button>
                    </Row>
                  </Form>
                  <Row className="justify-content-center">
                    <Link className="link" to="/Login">
                      Esqueceu a senha?
                    </Link>
                  </Row>
                </BoxForm>
              </Col>
            </Row>
          </Container>
        </PageContent>

        <Footer />
      </>
    );
  }
}

export default withRouter(Login);
