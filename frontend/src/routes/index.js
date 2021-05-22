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

import CategoriasListPage from "./../pages/secure/Categorias/CategoriasList/index";
import CategoriasAddPage from "./../pages/secure/Categorias/CategoriasAdd/index";
import CategoriasEditPage from "./../pages/secure/Categorias/CategoriasEdit/index";

import LancamentosListPage from "./../pages/secure/Lancamentos/LancamentosList/index";
import LancamentosAddPage from "./../pages/secure/Lancamentos/LancamentosAdd/index";
import LancamentosEditPage from "./../pages/secure/Lancamentos/LancamentosEdit/index";
import LancamentosDetailsPage from "./../pages/secure/Lancamentos/LancamentosDetails/index";

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

        <RoutePrivate exact path="/categorias" component={CategoriasListPage} />
        <RoutePrivate
          exact
          path="/categorias/add"
          component={CategoriasAddPage}
        />
        <RoutePrivate
          exact
          path="/categorias/edit/:categoriaId"
          component={CategoriasEditPage}
        />

        <RoutePrivate
          exact
          path="/lancamentos"
          component={LancamentosListPage}
        />
        <RoutePrivate
          exact
          path="/lancamentos/add"
          component={LancamentosAddPage}
        />
        <RoutePrivate
          exact
          path="/lancamentos/edit/:lancamentoId"
          component={LancamentosEditPage}
        />
        <RoutePrivate
          exact
          path="/lancamentos/details/:lancamentoId"
          component={LancamentosDetailsPage}
        />

        <Route exact path="/Login" component={Login} />
      </Switch>
    </Router>
  );
}
