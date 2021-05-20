import React, { useEffect } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { logout } from "../../services/auth";

import { PageHeader, LogoHeader } from "../styles/index";
import Icone from "../../assets/logo.png";
import UsuariosService from "../../services/usuarios";

function MainMenu({ history }) {
  async function handleLogout() {
    await logout();

    history.push("/");
  }

  useEffect(() => {
    async function verificaLogin() {
      const service = new UsuariosService();
      await service.getLogin();
    }
    verificaLogin();
  });

  return (
    <PageHeader>
      <Navbar>
        <Container>
          <Navbar.Brand href="/">
            <LogoHeader src={Icone} alt="SiSContabil" />
          </Navbar.Brand>
          <Nav className="top-menu">
            <Nav.Link href="/">INÍCIO</Nav.Link>
            <p>|</p>
            <NavDropdown title="CADASTROS">
              <Nav.Link href="/pessoas">PESSOAS</Nav.Link>
              <Nav.Link href="/usuarios">USUÁRIOS</Nav.Link>
              <Nav.Link>CATEGORIAS</Nav.Link>
            </NavDropdown>{" "}
            <p>|</p>
            <Nav.Link>LANÇAMENTOS</Nav.Link>
            <p>|</p>
            <Nav.Link>RELATÓRIOS</Nav.Link>
            <p>|</p>
            <Nav.Link onClick={handleLogout}>SAIR</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </PageHeader>
  );
}

export default withRouter(MainMenu);
