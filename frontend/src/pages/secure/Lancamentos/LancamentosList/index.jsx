import { Col, Container, Row, Table } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import Footer from "../../../../shared/Footer";
import Header from "../../../../shared/Header";
import { PageContent } from "../../../../shared/styles";

import iconAdd from "../../../../assets/icon-plus-circle.png";
import iconEdit from "../../../../assets/icon-edit.png";
import iconDelete from "../../../../assets/icon-delete.png";
import iconDetails from "../../../../assets/icon-details.png";

import { useState } from "react";
import { useEffect } from "react";
import LancamentosService from "../../../../services/lancamentos";

export default function LancamentosList() {
  const [lancamentos, setLancamentos] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function getLancamentos() {
      const service = new LancamentosService();
      const result = await service.getAll();

      setLancamentos(result);
      setLoading(false);
    }
    getLancamentos();
  }, []);

  return (
    <>
      <Header />
      <PageContent>
        <Container>
          <Row>
            <Col>
              <Link className="btn btn-warning button-add" to="">
                <img src={iconAdd} alt="Adicionar" className="icon-button" />
                NOVO
              </Link>
            </Col>
          </Row>
          <Row>{!isLoading && <RenderTable registros={lancamentos} />}</Row>
        </Container>
      </PageContent>
      <Footer />
    </>
  );
}

function RenderTable({ registros }) {
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>RESPONSÁVEL</th>
          <th>DATA PAGAMENTO</th>
          <th>VALOR</th>
          <th>TIPO LANÇAMENTO</th>
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

function RenderEmptyLine() {
  return (
    <tr>
      <td colSpan="3">Nenhum registro encontrado.</td>
    </tr>
  );
}

function RenderLine({ registro }) {
  const { url } = useRouteMatch();

  return (
    <tr key={registro.id}>
      <td>{registro.pessoa_nome}</td>
      <td>{registro.dataPagamento}</td>
      <td>{registro.valor}</td>
      <td>{registro.tipo}</td>
      <td style={{ textAlign: "center" }}>
        <Link to={`${url}/edit/${registro.id}`} alt="Editar categoria">
          <img src={iconEdit} alt="Editar" className="icon-comands" />
        </Link>

        <Link to={`${url}/details/${registro.id}`}>
          <img src={iconDetails} alt="Detalhes" className="icon-comands" />
        </Link>

        <img
          src={iconDelete}
          alt="Deletar"
          className="icon-comands"
          onClick={() => {
            deleteRegistro(registro);
          }}
        />
      </td>
    </tr>
  );
}

async function deleteRegistro(registro) {
  // const resposta = window.confirm("Deseja desativar este registro?");
  // if (resposta) {
  //   try {
  //     const service = new CategoriaService();
  //     await service.delete(registro.id);
  //     document.location.reload();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
