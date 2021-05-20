import React from "react";
import { withRouter } from "react-router-dom";
import { Container } from "react-bootstrap";

import Header from "../../../shared/Header/index";
import Footer from "../../../shared/Footer";
import { PageContentDashboard } from "../../../shared/styles/index";

class Dashboard extends React.Component {
  render() {
    return (
      <>
        <Header />
        <PageContentDashboard>
          <Container>
            <h2 className="tituloDashboard">MOVIMENTAÇÃO ANUAL</h2>
            <p>Aqui aparecerá os gráficos da nossa página</p>
          </Container>
        </PageContentDashboard>
        <Footer />
      </>
    );
  }
}

export default withRouter(Dashboard);
