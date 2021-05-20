import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./../pages/public/Login/index";

import Dashboard from "./../pages/secure/Dashboard/index";

import PessoasListPage from "./../pages/secure/Pessoas/PessoasList/index";
import PessoasAddPage from "./../pages/secure/Pessoas/PessoasAdd/index";
import PessoasEditPage from "./../pages/secure/Pessoas/PessoasEdit/index";
import PessoasDetailsPage from "./../pages/secure/Pessoas/PessoasDetails/index";

import UsuariosListPage from "./../pages/secure/Usuarios/UsuariosList/index";
import UsuariosAddPage from "./../pages/secure/Usuarios/UsuariosAdd/index";
import UsuariosEditPage from "./../pages/secure/Usuarios/UsuariosEdit/index";

import RoutePrivate from "./route-wrapper";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <RoutePrivate exact path="/" component={Dashboard} />

        <RoutePrivate exact path="/pessoas" component={PessoasListPage} />
        <RoutePrivate exact path="/pessoas/add" component={PessoasAddPage} />
        <RoutePrivate
          exact
          path="/pessoas/edit/:pessoasId"
          component={PessoasEditPage}
        />
        <RoutePrivate
          exact
          path="/pessoas/details/:pessoasId"
          component={PessoasDetailsPage}
        />

        <RoutePrivate exact path="/usuarios" component={UsuariosListPage} />
        <RoutePrivate exact path="/usuarios/add" component={UsuariosAddPage} />
        <RoutePrivate
          exact
          path="/usuarios/edit/:usuarioId"
          component={UsuariosEditPage}
        />

        <Route exact path="/Login" component={Login} />
      </Switch>
    </Router>
  );
}
