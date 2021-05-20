import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";

import Login from "./pages/public/Login/index";

function Home() {
  return (
    <div>
      <Menu />
      <h2>Início</h2>
    </div>
  );
}

function Usuarios() {
  let { path, url } = useRouteMatch();
  return (
    <div>
      <Menu />
      <h2>Usuarios</h2>
      <ul>
        <li>
          <Link to={`${url}/1`}>Usuário A</Link>
        </li>
        <li>
          <Link to={`${url}/2`}>Usuário B</Link>
        </li>
        <li>
          <Link to={`${url}/3`}>Usuário C</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={path} />
        <Route path={`${path}/:usuarioId`}>
          <Usuario />
        </Route>
      </Switch>
    </div>
  );
}

function Usuario() {
  let { usuarioId } = useParams();

  return (
    <div>
      <h3>Usuario: {usuarioId}</h3>
    </div>
  );
}

function Pessoas() {
  let { path, url } = useRouteMatch();
  return (
    <div>
      <Menu />
      <h2>Pessoas</h2>
      <ul>
        <li>
          <Link to={`${url}/1`}>Pessoa A</Link>
        </li>
        <li>
          <Link to={`${url}/2`}>Pessoa B</Link>
        </li>
        <li>
          <Link to={`${url}/3`}>Pessoa C</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={path} />
        <Route path={`${path}/:pessoaId`}>
          <Pessoa />
        </Route>
      </Switch>
    </div>
  );
}

function Pessoa() {
  let { pessoaId } = useParams();

  return (
    <div>
      <h3>Pessoa: {pessoaId}</h3>
    </div>
  );
}

function Menu() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/Usuarios">Usuários</Link>
        </li>
        <li>
          <Link to="/Pessoas">Pessoas</Link>
        </li>
        <li>
          <Link to="/Login">Sair</Link>
        </li>
      </ul>
    </div>
  );
}

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/Usuarios">
          <Usuarios />
        </Route>
        <Route path="/Pessoas">
          <Pessoas />
        </Route>
      </Switch>
    </Router>
  );
}
