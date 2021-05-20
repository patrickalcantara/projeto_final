import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import Footer from "../../../../shared/Footer";
import Header from "../../../../shared/Header";
import { PageContent } from "../../../../shared/styles";

import iconAdd from "../../../../assets/icon-plus-circle.png";
import iconEdit from "../../../../assets/icon-edit.png";
import iconDetails from "../../../../assets/icon-details.png";
import UsuariosService from "../../../../services/usuarios";

class UsuariosList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usuarios: [],
      isLoading: true,
      show: false,
    };
  }

  RenderTable(registros) {
    return (
      <Table bordered hover>
        <thead>
          <tr>
            <th>NOME</th>
            <th>E-MAIL</th>
            <th style={{ textAlign: "center", width: "12%" }}>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {registros.length !== 0
            ? registros.map((item) => this.RenderLine(item))
            : this.RenderEmptyLine()}
        </tbody>
      </Table>
    );
  }

  RenderLine(registro) {
    const { url } = this.props.match;

    return (
      <tr key={registro.id}>
        <td>{registro.nome}</td>
        <td>{registro.email}</td>
        <td style={{ textAlign: "center" }}>
          <Link to={`${url}/edit/${registro.id}`}>
            <img src={iconEdit} alt="Editar" className="icon-comands" />
          </Link>
          <Link to={`${url}/details/${registro.id}`}>
            <img src={iconDetails} alt="Detalhes" className="icon-comands" />
          </Link>
        </td>
      </tr>
    );
  }

  RenderEmptyLine() {
    return (
      <tr>
        <td colSpan="3">Nenhum registro encontrado.</td>
      </tr>
    );
  }

  async componentDidMount() {
    const service = new UsuariosService();
    const result = await service.getAll();

    this.setState({
      isLoading: false,
      usuarios: result,
    });
  }

  render() {
    const { usuarios, isLoading } = this.state;

    return (
      <>
        <Header />
        <PageContent>
          <Container>
            <Row>
              <Col>
                <Link className="btn btn-warning button-add" to="usuarios/add">
                  <img src={iconAdd} alt="Adicionar" className="icon-button" />
                  NOVO
                </Link>
              </Col>
            </Row>
            <Row>{!isLoading && this.RenderTable(usuarios)}</Row>
          </Container>
        </PageContent>
        <Footer />
      </>
    );
  }
}

export default withRouter(UsuariosList);
