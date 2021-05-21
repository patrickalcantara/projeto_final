import { Col, Container, Row, Table } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import Footer from "../../../../shared/Footer";
import Header from "../../../../shared/Header/index";
import { PageContent } from "../../../../shared/styles";

import iconAdd from "../../../../assets/icon-plus-circle.png";
import iconEdit from "../../../../assets/icon-edit.png";
import iconDelete from "../../../../assets/icon-delete.png";
import { useEffect, useState } from "react";

import CategoriaService from "../../../../services/categorias";

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

function RenderTable({ registros }) {
  const ativos = registros.filter((item) => {
    return item.ativo === true;
  });

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
        {ativos.length !== 0 ? (
          ativos.map((item) => <RenderLine key={item.id} registro={item} />)
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
        <Link to={`${url}/edit/${registro.id}`} alt="Editar categoria">
          <img src={iconEdit} alt="Editar" className="icon-comands" />
        </Link>

        <img
          src={iconDelete}
          alt="Detalhes"
          className="icon-comands"
          onClick={() => {
            deleteRegistro(registro);
          }}
        />
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

async function deleteRegistro(registro) {
  const resposta = window.confirm("Deseja desativar este registro?");
  if (resposta) {
    try {
      const service = new CategoriaService();
      await service.delete(registro.id);
      document.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
}
