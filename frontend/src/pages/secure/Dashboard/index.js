import React from "react";
import { withRouter } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

import Header from "../../../shared/Header/index";
import Footer from "../../../shared/Footer";
import { PageContentDashboard } from "../../../shared/styles/index";

import LancametosService from "../../../services/lancamentos";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    const service = new LancametosService();
    const result = await service.getGrafico(moment().utc().year().toString());
    this.setState({
      data: result,
    });
  }

  render() {
    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const { data } = this.state;
    return (
      <>
        <Header />
        <PageContentDashboard>
          <Container>
            <Row>
              <Col>
                <h2 className="tituloDashboard">MOVIMENTAÇÃO ANUAL</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart
                    data={data}
                    margin={{ top: 20, right: 40, left: 40, bottom: 20 }}
                    style={{ margin: "auto" }}
                  >
                    <XAxis dataKey="Mes" />
                    <YAxis tickFormatter={(value) => formatter.format(value)} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
                    <Tooltip formatter={(value) => formatter.format(value)} />
                    <Legend style={{ top: 5 }} />
                    <Line type="monotone" dataKey="Receitas" stroke="#16697A" />
                    <Line type="monotone" dataKey="Despesas" stroke="#FFA62B" />
                  </LineChart>
                </ResponsiveContainer>
              </Col>
            </Row>
          </Container>
        </PageContentDashboard>
        <Footer />
      </>
    );
  }
}

export default withRouter(Dashboard);
