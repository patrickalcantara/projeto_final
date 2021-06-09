import React from "react";
import { withRouter } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

import Header from "../../../shared/Header/index";
import Footer from "../../../shared/Footer";
import { PageContentDashboard } from "../../../shared/styles/index";

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

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.setState({
      data: [
        {
          name: "Janeiro",
          Entradas: 4000,
          Saidas: 2400,
        },
        {
          name: "Fevereiro",
          Entradas: 3000,
          Saidas: 1398,
        },
        {
          name: "Março",
          Entradas: 2000,
          Saidas: 9800,
        },
        {
          name: "Abril",
          Entradas: 2780,
          Saidas: 3908,
        },
        {
          name: "Maio",
          Entradas: 1890,
          Saidas: 4800,
        },
        {
          name: "Junho",
          Entradas: 2390,
          Saidas: 3800,
        },
        {
          name: "Julho",
          Entradas: 3490,
          Saidas: 4300,
        },
      ],
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
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => formatter.format(value)} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
                    <Tooltip formatter={(value) => formatter.format(value)} />
                    <Legend style={{ top: 5 }} />
                    <Line type="monotone" dataKey="Saidas" stroke="#FFA62B" />
                    <Line type="monotone" dataKey="Entradas" stroke="#16697A" />
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
