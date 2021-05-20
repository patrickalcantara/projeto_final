import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Footer from "../../../../shared/Footer";
import Header from "../../../../shared/Header";
import PessoasService from "../../../../services/pessoas";

import { PageContent } from "../../../../shared/styles";

class PessoasDetails extends React.Component {
  service;
  pessoaId;

  constructor(props) {
    super(props);

    this.pessoaId = this.props.match.params.pessoasId;
    this.service = new PessoasService();

    this.state = {
      pessoa: null,
      isLoading: true,
    };
  }

  async componentDidMount() {
    const result = await this.service.getOne(this.pessoaId);

    this.setState({
      pessoa: result,
      isLoading: false,
    });
  }

  render() {
    const { pessoa, isLoading } = this.state;

    return (
      <>
        <Header />
        <PageContent>
          {!isLoading && (
            <Container>
              <Row>
                <Col>
                  <p>
                    <b>STATUS: </b>
                    {pessoa.ativo ? "ATIVO" : "INATIVO"}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col>
                  <p>
                    <b>NOME:</b>
                  </p>
                  <p>{pessoa.nome}</p>
                </Col>
                <Col>
                  <p>
                    <b>EMAIL:</b>
                  </p>
                  <p>{pessoa.email}</p>
                </Col>
              </Row>

              <Row>
                <Col>
                  <p>
                    <b>LOGRADOURO:</b>
                  </p>
                  <p>{pessoa.logradouro}</p>
                </Col>
                <Col xs lg="3">
                  <p>
                    <b>BAIRRO:</b>
                  </p>
                  <p>{pessoa.bairro}</p>
                </Col>
                <Col xs lg="2">
                  <p>
                    <b>NÚMERO:</b>
                  </p>
                  <p>{pessoa.numero}</p>
                </Col>
                <Col>
                  <p>
                    <b>COMPLEMENTO:</b>
                  </p>
                  <p>
                    {pessoa.complemento
                      ? pessoa.complemento
                      : "Sem Complemento"}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col xs lg="3">
                  <p>
                    <b>CEP:</b>
                  </p>
                  <p>{pessoa.cep}</p>
                </Col>
                <Col>
                  <p>
                    <b>MUNICÍPIO:</b>
                  </p>
                  <p>{pessoa.cidade}</p>
                </Col>
                <Col xs lg="3">
                  <p>
                    <b>UF:</b>
                  </p>
                  <p>{pessoa.uf}</p>
                </Col>
              </Row>
              <Row>
                <Link className="btn button-cancel" to="/pessoas">
                  VOLTAR
                </Link>
              </Row>
            </Container>
          )}
        </PageContent>
        <Footer />
      </>
    );
  }
}

export default withRouter(PessoasDetails);
