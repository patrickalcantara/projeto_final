import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { Link, useRouteMatch, withRouter } from "react-router-dom";
import Footer from "../../../../shared/Footer";
import Header from "../../../../shared/Header";
import { PageContent } from "../../../../shared/styles";
import iconAdd from "../../../../assets/icon-plus-circle.png";
import iconEdit from "../../../../assets/icon-edit.png";
import iconDelete from "../../../../assets/icon-delete.png";
import iconDetails from "../../../../assets/icon-details.png";
import PessoasService from "../../../../services/pessoas";

function RenderLine({ registro }) {
  const { url } = useRouteMatch();

  return (
    <tr key={registro.id}>
      <td>{registro.nome}</td>
      <td>{registro.email}</td>
      <td style={{ textAlign: "center" }}>
        {registro.ativo ? "ATIVO" : "INATIVO"}
      </td>
      <td style={{ textAlign: "center" }}>
        <Link to={`${url}/edit/${registro.id}`}>
          <img src={iconEdit} alt="Editar" className="icon-comands" />
        </Link>
        {registro.ativo && (
          <img
            src={iconDelete}
            alt="Deletar"
            className="icon-comands"
            onClick={() => deleteRegistro(registro)}
          />
        )}

        <Link to={`${url}/details/${registro.id}`}>
          <img src={iconDetails} alt="Detalhes" className="icon-comands" />
        </Link>
      </td>
    </tr>
  );
}

async function deleteRegistro(registro) {
  let resposta = window.confirm("Deseja desativar este registro?");
  if (resposta) {
    try {
      registro.ativo = false;
      const id = registro.id;
      delete registro.id;
      delete registro.createdAt;
      delete registro.updatedAt;
      const service = new PessoasService();
      await service.update(id, registro);

      document.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
}

function RenderEmptyLine() {
  return (
    <tr>
      <td colSpan="4">Nenhum registro encontrado.</td>
    </tr>
  );
}

function RenderTable({ registros }) {
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>NOME</th>
          <th>E-MAIL</th>
          <th style={{ textAlign: "center" }}>STATUS</th>
          <th style={{ textAlign: "center", width: "12%" }}>AÇÕES</th>
        </tr>
      </thead>
      <tbody>
        {registros.length !== 0 ? (
          registros.map((item) => <RenderLine key={item.id} registro={item} />)
        ) : (
          <RenderEmptyLine />
        )}
      </tbody>
    </Table>
  );
}

class Pessoas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      pessoas: [],
      modal: false,
    };
  }

  async componentDidMount() {
    const service = new PessoasService();
    const result = await service.getAll();

    this.setState({
      isLoading: false,
      pessoas: result,
    });
  }

  render() {
    const { isLoading, pessoas } = this.state;
    return (
      <>
        <Header />
        <PageContent>
          <Container>
            <Row>
              <Col>
                <Link className="btn btn-warning button-add" to="pessoas/add">
                  <img src={iconAdd} alt="Adicionar" className="icon-button" />
                  NOVO
                </Link>
              </Col>
            </Row>
            <Row>{!isLoading && <RenderTable registros={pessoas} />}</Row>
          </Container>
        </PageContent>
        <Footer />
      </>
    );
  }
}

export default withRouter(Pessoas);
