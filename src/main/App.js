import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.min.css';
import '../custom.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from '../views/login';
import CadastroUsuario from '../views/cadastroUsuario';
import Home from '../views/home';

class App extends React.Component{
 render() {
  return(
    <>
      <Router>
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
          <div className="container">
            <a href="home.html"className="navbar-brand">
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
              <li className='nav-item'>
                <Link className='nav-link' to="/">Home</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to="/cadastro-usuarios">Usuarios</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to="/lancamentos">Lancamentos</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
        </div>
        <div className='container'>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/cadastro-usuarios">
              <CadastroUsuario />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  )
 }
}


export default App;
