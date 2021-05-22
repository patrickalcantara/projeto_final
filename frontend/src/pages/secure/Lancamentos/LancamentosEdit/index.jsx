import { useEffect } from "react";
import { useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  InputGroup,
  ToggleButton,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import PessoasService from "../../../../services/pessoas";
import CategoriasService from "../../../../services/categorias";
import Footer from "../../../../shared/Footer";
import Header from "../../../../shared/Header";
import { PageContent } from "../../../../shared/styles";

import DatePicker from "react-date-picker";
import LancamentosService from "../../../../services/lancamentos";
import moment from "moment";

export default function LancamentosEdit(props) {
  const [lancamento, setLancamento] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const [pessoas, setPessoas] = useState([]);
  const [ativo, setAtivo] = useState(true);
  const [dataVencimento, setDataVencimento] = useState("");
  const [dataPagamento, setDataPagamento] = useState("");
  const [erro, setErro] = useState("");
  const history = useHistory();
  const lancamentoId = props.match.params.lancamentoId;

  useEffect(() => {
    async function getItens() {
      try {
        const pessoasService = new PessoasService();
        const categoriasService = new CategoriasService();

        const resultPessoas = await pessoasService.getAll();
        setPessoas(resultPessoas);

        const resultCategorias = await categoriasService.getAll();
        setCategorias(resultCategorias);

        setLoading(false);

        if (!resultPessoas || !resultCategorias)
          setErro("Não foi encontrado registros!");
      } catch (error) {
        setErro("Ocorreu um erro!");
      }
    }
    getItens();
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    async function getLancamento() {
      try {
        const service = new LancamentosService();
        const result = await service.getOne(lancamentoId);

        if (result.observacoes === null) result.observacoes = "";

        setLancamento(result);
        setDataVencimento(moment(result.dataVencimento).utc().toDate());
        setDataPagamento(moment(result.dataPagamento).utc().toDate());

        if (result.tipo === 100) {
          setAtivo(true);
        } else {
          setAtivo(false);
        }
      } catch (error) {
        console.log(error);
        props.history.push("/lancamentos");
      }
    }
    getLancamento();
    return () => {
      abortController.abort();
    };
  }, [props, lancamentoId]);

  const handleChange = (event) => {
    const auxValue = { ...lancamento };
    auxValue[event.target.name] = event.target.value;
    setLancamento(auxValue);
  };

  const handleChangeTipo = (event) => {
    const auxValue = { ...lancamento };
    auxValue["tipo"] = event.target.value;
    setLancamento(auxValue);
  };

  const handleChangeVencimento = (event) => {
    const auxValue = { ...lancamento };
    auxValue["dataVencimento"] = event;
    setLancamento(auxValue);
    setDataVencimento(event);
  };

  const handleChangePagamento = (event) => {
    const auxValue = { ...lancamento };
    auxValue["dataPagamento"] = event;
    setLancamento(auxValue);
    setDataPagamento(event);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !lancamento.categoriaId ||
      !lancamento.dataPagamento ||
      !lancamento.dataVencimento ||
      !lancamento.descricao ||
      !lancamento.pessoaId ||
      !lancamento.tipo ||
      !lancamento.valor
    ) {
      setErro("Preencha todos os campos obrigatórios!");
    } else {
      delete lancamento.categorium;
      delete lancamento.createdAt;
      delete lancamento.updatedAt;
      console.log(lancamento);
      try {
        const service = new LancamentosService();
        await service.update(lancamentoId, lancamento);
        history.push("/lancamentos");
      } catch (error) {
        setErro("Ocorreu um erro!");
        console.log(error);
      }
    }
  };

  const RenderError = () => {
    return (
      <Alert variant="danger" dismissible onClose={() => setErro("")}>
        {erro}
      </Alert>
    );
  };

  return (
    <>
      <Header />
      <PageContent>
        {!isLoading && (
          <Container>
            {erro && <RenderError />}

            {erro !== "Não foi encontrado registros!" && (
              <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>TIPO DE LANÇAMENTO:</Form.Label>
                      <br></br>
                      <ButtonGroup
                        onChange={(e) => handleChangeTipo(e)}
                        className="botaoReceita"
                        toggle
                      >
                        <ToggleButton
                          type="radio"
                          checked={ativo}
                          onChange={() => setAtivo(true)}
                          value="100"
                        >
                          RECEITA
                        </ToggleButton>
                        <ToggleButton
                          type="radio"
                          checked={!ativo}
                          onChange={() => setAtivo(false)}
                          value="200"
                        >
                          DESPESA
                        </ToggleButton>
                      </ButtonGroup>
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>RESPONSÁVEL:</Form.Label>
                      <Form.Control
                        as="select"
                        onChange={(e) => handleChange(e)}
                        name="pessoaId"
                        value={lancamento.pessoaId}
                      >
                        <option value="">Selecione uma pessoa</option>
                        {pessoas.map((item) => {
                          return (
                            <option key={item.id} value={item.id}>
                              {item.nome}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>CATEGORIA:</Form.Label>
                      <Form.Control
                        as="select"
                        onChange={(e) => handleChange(e)}
                        name="categoriaId"
                        value={lancamento.categoriaId}
                      >
                        <option value="">Selecione uma categoria</option>
                        {categorias.map((item) => {
                          return (
                            <option key={item.id} value={item.id}>
                              {item.nome}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>DESCRIÇÃO:</Form.Label>
                      <Form.Control
                        type="text"
                        name="descricao"
                        value={lancamento.descricao}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>DATA VENCIMENTO:</Form.Label>
                      <br></br>
                      <DatePicker
                        value={dataVencimento}
                        onChange={(e) => {
                          handleChangeVencimento(e);
                        }}
                        className="calendario"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>DATA PAGAMENTO:</Form.Label>
                      <br></br>
                      <DatePicker
                        value={dataPagamento}
                        onChange={(e) => {
                          handleChangePagamento(e);
                        }}
                        className="calendario"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>VALOR:</Form.Label>
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text>R$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          name="valor"
                          type="number"
                          value={lancamento.valor}
                          step="0.01"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>OBSERVAÇÕES:</Form.Label>
                      <Form.Control
                        type="text"
                        name="observacoes"
                        value={lancamento.observacoes}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col>
                    <Button className="button-login" type="submit">
                      SALVAR
                    </Button>
                    <Link className="btn button-cancel" to="/lancamentos">
                      CANCELAR
                    </Link>
                  </Col>
                </Form.Row>
              </Form>
            )}
          </Container>
        )}
      </PageContent>
      <Footer />
    </>
  );
}
