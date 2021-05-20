import React from "react";
import {
  Container,
  Col,
  Form,
  ToggleButton,
  ButtonGroup,
  Button,
  Alert,
} from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import PessoasService from "../../../../services/pessoas";
import Footer from "../../../../shared/Footer";
import Header from "../../../../shared/Header";
import { PageContent } from "../../../../shared/styles";

class PessoasAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: "",
      email: "",
      ativo: true,
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cep: "",
      cidade: "",
      uf: "",
      error: "",
      isLoading: false,
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

    const campo = this.state;
    delete campo.isLoading;
    delete campo.error;

    if (
      !campo.nome ||
      !campo.logradouro ||
      !campo.numero ||
      !campo.bairro ||
      !campo.cep ||
      !campo.cidade ||
      !campo.uf
    ) {
      this.setState({
        error: "Preencha todos os campos obrigatórios!",
      });
    } else {
      try {
        const service = new PessoasService();
        await service.add(campo);
        this.props.history.push("/pessoas");
      } catch (error) {
        this.setState({ error: "Ocorreu um erro!" });
      }
    }
  };

  render() {
    const { ativo, error } = this.state;

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
                    <Form.Label>STATUS:</Form.Label>
                    <br></br>
                    <ButtonGroup toggle>
                      <ToggleButton
                        type="radio"
                        checked={ativo}
                        onChange={() => this.setState({ ativo: true })}
                      >
                        Ativo
                      </ToggleButton>
                      <ToggleButton
                        type="radio"
                        checked={!ativo}
                        onChange={() => this.setState({ ativo: false })}
                      >
                        Inativo
                      </ToggleButton>
                    </ButtonGroup>
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col>
                  <Form.Group>
                    <Form.Label>NOME:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Informe um nome"
                      onChange={(e) => this.setState({ nome: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>EMAIL:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Informe um email"
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col>
                  <Form.Group>
                    <Form.Label>LOGRADOURO:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Informe um logradouro"
                      onChange={(e) =>
                        this.setState({ logradouro: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col xs lg="3">
                  <Form.Group>
                    <Form.Label>BAIRRO:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Informe um bairro"
                      onChange={(e) =>
                        this.setState({ bairro: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col xs lg="2">
                  <Form.Group>
                    <Form.Label>NÚMERO:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Informe um número"
                      onChange={(e) =>
                        this.setState({ numero: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>COMPLEMENTO:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Informe um compemento"
                      onChange={(e) =>
                        this.setState({ complemento: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col xs lg="3">
                  <Form.Group>
                    <Form.Label>CEP:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Informe um cep"
                      onChange={(e) => this.setState({ cep: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>MUNICÍPIO:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Informe um município"
                      onChange={(e) =>
                        this.setState({ cidade: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col xs lg="3">
                  <Form.Group>
                    <Form.Label>UF:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Informe um UF"
                      onChange={(e) => this.setState({ uf: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Button className="button-login" type="submit">
                  SALVAR
                </Button>
                <Link className="btn button-cancel" to="/pessoas">
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

export default withRouter(PessoasAdd);
