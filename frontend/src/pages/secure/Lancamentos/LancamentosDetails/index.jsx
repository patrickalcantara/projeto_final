import { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import LancamentosService from "../../../../services/lancamentos";
import PessoaService from "../../../../services/pessoas";
import Footer from "../../../../shared/Footer";
import Header from "../../../../shared/Header";
import { PageContent } from "../../../../shared/styles";

export default function LancamentosDetails(props) {
  const [lancamento, setLancamento] = useState("");
  const [pessoa, setPessoa] = useState("");
  const [isLoading, setLoading] = useState(true);
  const lancamentoId = props.match.params.lancamentoId;

  useEffect(() => {
    async function getDetails() {
      try {
        const serviceLancamento = new LancamentosService();
        const servicePessoa = new PessoaService();

        const registroLancamento = await serviceLancamento.getOne(lancamentoId);
        setLancamento(registroLancamento);

        const registroPessoa = await servicePessoa.getOne(
          registroLancamento.pessoaId
        );
        setPessoa(registroPessoa);
        setLoading(false);
        console.log(registroLancamento);
      } catch (error) {
        console.log(error);
      }
    }
    getDetails();
  }, [props, lancamentoId]);

  return (
    <>
      <Header />
      <PageContent>
        {!isLoading && (
          <Container>
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
            <Row>
              <Link className="btn button-cancel" to="/lancamentos">
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
