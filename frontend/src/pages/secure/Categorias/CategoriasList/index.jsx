import { Col, Container, Row, Table } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import Footer from "../../../../shared/Footer";
import Header from "../../../../shared/Header/index";
import { PageContent } from "../../../../shared/styles";

import iconAdd from "../../../../assets/icon-plus-circle.png";
import iconEdit from "../../../../assets/icon-edit.png";
import iconDetails from "../../../../assets/icon-details.png";
import { useEffect, useState } from "react";

import CategoriaService from "../../../../services/categorias";

function RenderTable({ registros }) {
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>NOME</th>
          <th>DESCRIÇÃO</th>
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

function RenderLine({ registro }) {
  const { url } = useRouteMatch();

  return (
    <tr key={registro.id}>
      <td>{registro.nome}</td>
      <td>{registro.descricao}</td>
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

function RenderEmptyLine() {
  return (
    <tr>
      <td colSpan="3">Nenhum registro encontrado.</td>
    </tr>
  );
}

export default function CategoriasList() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getItens() {
      const service = new CategoriaService();
      const result = await service.getAll();

      setCategorias(result);
      setLoading(false);
    }
    getItens();
  }, []);

  return (
    <>
      <Header />
      <PageContent>
        <Container>
          <Row>
            <Col>
              <Link className="btn btn-warning button-add" to="categorias/add">
                <img src={iconAdd} alt="Adicionar" className="icon-button" />
                NOVO
              </Link>
            </Col>
          </Row>
          <Row>{!loading && <RenderTable registros={categorias} />}</Row>
        </Container>
      </PageContent>
      <Footer />
    </>
  );
}
