import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import Footer from "../../../../shared/Footer";
import Header from "../../../../shared/Header";
import { PageContent } from "../../../../shared/styles";

import iconAdd from "../../../../assets/icon-plus-circle.png";
import iconEdit from "../../../../assets/icon-edit.png";
import iconDelete from "../../../../assets/icon-delete.png";
import iconDetails from "../../../../assets/icon-details.png";

import { useRef, useState } from "react";
import { useEffect } from "react";
import LancamentosService from "../../../../services/lancamentos";
import PessoasService from "../../../../services/pessoas";

export default function LancamentosList() {
  const [lancamentos, setLancamentos] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [lancamento, setLancamento] = useState("");
  const [pessoa, setPessoa] = useState("");
  const [exibeModal, setExibeModal] = useState(false);

  useEffect(() => {
    async function getLancamentos() {
      const service = new LancamentosService();
      const result = await service.getAll();

      setLancamentos(result);
      setLoading(false);
    }
    getLancamentos();
  }, []);

  function RenderTable({ registros }) {
    return (
      <Table bordered hover>
        <thead>
          <tr>
            <th>RESPONSÁVEL</th>
            <th style={{ textAlign: "center", width: "15%" }}>
              DATA PAGAMENTO
            </th>
            <th style={{ textAlign: "center", width: "15%" }}>VALOR</th>
            <th style={{ textAlign: "center", width: "15%" }}>
              TIPO LANÇAMENTO
            </th>
            <th style={{ textAlign: "center", width: "12%" }}>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {registros.length !== 0 ? (
            registros.map((item) => (
              <RenderLine key={item.id} registro={item} />
            ))
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

    const valorFormatado = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(registro.valor);

    const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "UTC",
    }).format(new Date(registro.dataPagamento));

    return (
      <tr key={registro.id}>
        <td>{registro.pessoa_nome}</td>
        <td style={{ textAlign: "center" }}>{dataFormatada}</td>
        <td style={{ textAlign: "center" }}>{valorFormatado}</td>
        <td style={{ textAlign: "center" }}>
          <RenderHighLight tipo={registro.tipo} />
        </td>
        <td style={{ textAlign: "center" }}>
          <Link
            to={`${url}/edit/${registro.id}`}
            alt="Editar categoria"
            title="Editar"
          >
            <img src={iconEdit} alt="Editar" className="icon-comands" />
          </Link>

          <img
            src={iconDetails}
            alt="Detalhes"
            className="icon-comands"
            onClick={() => preencherDetalhes(registro.id)}
          />

          <img
            title="Deletar"
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

  async function preencherDetalhes(id) {
    const lancamentoService = new LancamentosService();
    const resultLancamento = await lancamentoService.getOne(id);

    const pessoaSevice = new PessoasService();
    const resultPessoa = await pessoaSevice.getOne(resultLancamento.pessoaId);

    setLancamento(resultLancamento);
    setPessoa(resultPessoa);

    setExibeModal(true);
  }

  function RenderBodyDetails({ lancamento, pessoa }) {
    return (
      <>
        <Row>
          <Col>
            <p>
              <b>TIPO DE LANÇAMENTO: </b>
              {lancamento.tipo === 100 ? (
                <label className="tipoLancamento receita">RECEITA</label>
              ) : (
                <label className="tipoLancamento despesa">DESPESA</label>
              )}
            </p>
          </Col>
        </Row>

        <Row>
          <Col>
            <p>
              <b>RESPONSÁVEL: </b>
              {pessoa.nome}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              <b>CATEGORIA: </b>
              {lancamento.categorium.nome}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              <b>DESCRIÇÃO: </b>
              {lancamento.descricao}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              <b>DATA VENCIMENTO: </b>
              {new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(
                new Date(lancamento.dataVencimento)
              )}
            </p>
          </Col>
          <Col>
            <p>
              <b>DATA PAGAMENTO: </b>
              {new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(
                new Date(lancamento.dataPagamento)
              )}
            </p>
          </Col>
          <Col>
            <p>
              <b>VALOR: </b>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
              }).format(lancamento.valor)}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              <b>OBSERVAÇÕES: </b>
              {lancamento.observacoes}
            </p>
          </Col>
        </Row>
      </>
    );
  }

  function RenderHighLight({ tipo }) {
    return tipo === 100 ? (
      <label className="tipoLancamento receita">RECEITA</label>
    ) : (
      <label className="tipoLancamento despesa">DESPESA</label>
    );
  }

  //TODO: Implementar o delete de lancamentos
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

  return (
    <>
      <Header />
      <PageContent>
        <Container>
          <Row>
            <Col>
              <Link className="btn btn-warning button-add" to="lancamentos/add">
                <img src={iconAdd} alt="Adicionar" className="icon-button" />
                NOVO
              </Link>
            </Col>
          </Row>
          <Row>{!isLoading && <RenderTable registros={lancamentos} />}</Row>
          <Modal
            show={exibeModal}
            animation={false}
            size="lg"
            onHide={() => setExibeModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Detalhes do lançamento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <RenderBodyDetails lancamento={lancamento} pessoa={pessoa} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setExibeModal(false)}>
                Fechar
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </PageContent>
      <Footer />
    </>
  );
}
