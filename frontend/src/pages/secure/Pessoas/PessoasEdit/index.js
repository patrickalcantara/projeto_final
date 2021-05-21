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
import Footer from "../../../../shared/Footer";
import Header from "../../../../shared/Header";
import PessoasService from "../../../../services/pessoas";

import { PageContent } from "../../../../shared/styles";

class PessoasEdit extends React.Component {
  service;
  pessoaId;

  constructor(props) {
    super(props);

    this.pessoaId = this.props.match.params.pessoasId;
    this.service = new PessoasService();

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
      isLoading: true,
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
      this.setState({ error: "Preencha todos os campos obrigatórios!" });
    } else {
      try {
        await this.service.update(this.pessoaId, campo);
        this.props.history.push("/pessoas");
      } catch (error) {
        this.setState({ error: "Ocorreu um erro!" });
      }
    }
  };

  async componentDidMount() {
    try {
      const result = await this.service.getOne(this.pessoaId);

      this.setState({
        nome: result.nome,
        email: result.email,
        ativo: result.ativo,
        logradouro: result.logradouro,
        numero: result.numero,
        complemento: result.complemento,
        bairro: result.bairro,
        cep: result.cep,
        cidade: result.cidade,
        uf: result.uf,
        isLoading: false,
      });
    } catch (error) {
      this.props.history.push("/pessoas");
    }
  }

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
                      value={this.state.nome}
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
                      value={this.state.email}
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
                      value={this.state.logradouro}
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
                      value={this.state.bairro}
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
                      value={this.state.numero}
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
                      value={this.state.complemento}
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
                      value={this.state.cep}
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
                      value={this.state.cidade}
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
                      value={this.state.uf}
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

export default withRouter(PessoasEdit);
