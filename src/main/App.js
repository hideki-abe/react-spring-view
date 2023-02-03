import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from '../views/login';
import CadastroUsuario from '../views/cadastroUsuario';
import Home from '../views/home';
import ConsultaLancamentos from '../views/lancamentos/consultaLancamentos';
import CadastroLancamentos from '../views/lancamentos/cadastroLancamentos';
import AuthService from '../app/service/authService';
import ProvedorAutenticacao from './provedorAutenticacao';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import 'bootswatch/dist/flatly/bootstrap.min.css';
import '../custom.css';

class App extends React.Component{

 render() {

  const deslogar = () => {
    AuthService.removerUsuarioAutenticado();
  }

  function RotaAutenticada( { component: Component, ...props }) {
    return (
      <Route {...props} render={ (componentProps) =>{
        if(AuthService.isUsuarioAutenticado) { 
          console.log("usuario autenticado");
          return (
            <Component {...componentProps} />
          )
        }else {
          console.log("usuario nao autenticado");
          return (
            <Redirect to={ {pathname : '/login', state : { from: componentProps.location } } }/>
          )
        }
      } } />
    )
  }

  function NavbarItem( {render, ...props} ) {

    if(render) {
      return (
        <li className='nav-item'>
          <a onClick={props.onClick} className="nav-link" href={props.href}>{props.label}</a>
        </li>
      )
    }else {
      return false;
    }
  }

  /*
  function Rotas() {
    return (
      <AuthConsumer>{
        (context) => (
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/cadastro-usuarios" component={CadastroUsuario}/>

          <RotaAutenticada isUsuarioAutenticado={context.isUsuarioAutenticado} path="/lancamentos" component={ConsultaLancamentos}/>
          <RotaAutenticada isUsuarioAutenticado={context.isUsuarioAutenticado} path="/cadastro-lancamentos/:id?" component={CadastroLancamentos}/>
          <RotaAutenticada isUsuarioAutenticado={context.isUsuarioAutenticado} path="/" component={Home}/>
        </Switch>
        )
      }
      </AuthConsumer>
    )
  }

  const authConsumer = () => (
    <AuthConsumer>
      { (context) => (<Rotas isUsuarioAutenticado={context.isUsuarioAutenticado} />) }
    </AuthConsumer>
  )
  */

  const isUsuarioAutenticado = () => {
    console.log(AuthService.isUsuarioAutenticado());
    return AuthService.isUsuarioAutenticado();
  }

  return(
    <ProvedorAutenticacao>
      <Router>
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
          <div className="container">
            <a href="/home"className="navbar-brand">
              Minhas Finanças
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
              <NavbarItem render={isUsuarioAutenticado()} href="/" label="Home"/>
              <NavbarItem render={isUsuarioAutenticado()} href="/cadastro-usuarios" label="Usuarios"/>
              <NavbarItem render={isUsuarioAutenticado()} href="/lancamentos" label="Lancamentos"/>
              <NavbarItem render={isUsuarioAutenticado()} onClick={deslogar} href="/login" label="Sair"/>
            </ul>
          </div>
        </div>
        </div>
        <div className='container'>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/cadastro-usuarios" component={CadastroUsuario}/>
            <RotaAutenticada path="/lancamentos" component={ConsultaLancamentos}/>
            <RotaAutenticada path="/cadastro-lancamentos/:id?" component={CadastroLancamentos}/>
            <RotaAutenticada path="/" component={Home}/>
          </Switch>
        </div>
      </Router>
    </ProvedorAutenticacao>
  )
 }
}

export default App;
