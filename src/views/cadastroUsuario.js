import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import { withRouter } from "react-router-dom";
import UsuarioService from "../app/service/usuarioService";

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    validar() {
        const msgs = [];
        
        if(!this.state.nome) {
            msgs.push('O campo nome eh obrigatorio.');
        }

        if(!this.state.email) {
            msgs.push('O campo email eh obrigatorio');
        }else if( !this.state.email.match(/^[a-z0-9]+@[a-z0-9]+\.[a-z]/)) {
            msgs.push('Informe um email valido!');
        }

        if(!this.state.senha || !this.state.senhaRepeticao) {
            msgs.push('Insira a senha 2x.');
        }else if( this.state.senha !== this.state.senhaRepeticao) {
            msgs.push('As senhas nao batem.');
        }

        return msgs;
    }

    cadastrar = () => {
        const msgs = this.validar();

        if(msgs && msgs.length > 0) {
            msgs.forEach( (msg, index) => {
                console.log(msg);
            } );
            return false;
        }

        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }

        this.service.salvar(usuario)
            .then( response => {
                console.log("Usuario cadastrado com sucesso! Faca o login para acessar o sistema!");
                this.props.history.push('/login');
            }).catch(error => {
                console.log(error.response.data);
            })
    }

    cancelar = () => {
        this.props.history.push('/login');
    }

    render() {
        return (
                <Card title="Cadastro de Usuario">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <FormGroup label="Nome: *"
                                    htmlFor="inputNome">
                                        <input type="text"
                                            className="form-control"
                                            id="inputNome"
                                            name="nome"
                                            onChange={ e => this.setState({nome: e.target.value})}>
                                        </input>
                                </FormGroup>
                                <FormGroup label="Email: *"
                                    htmlFor="inputEmail">
                                        <input type="email"
                                            className="form-control"
                                            id="inputEmail"
                                            name="email"
                                            onChange={ e => this.setState({email: e.target.value})}>
                                        </input>
                                </FormGroup>
                                <FormGroup label="Senha: *"
                                    htmlFor="inputSenha">
                                        <input type="password"
                                            className="form-control"
                                            id="inputSenha"
                                            name="senha"
                                            onChange={ e => this.setState({senha: e.target.value})}>
                                        </input>
                                </FormGroup>
                                <FormGroup label="Repita a Senha: *"
                                    htmlFor="inputRepitaSenha">
                                        <input type="password"
                                            className="form-control"
                                            id="inputRepitaSenha"
                                            name="senha"
                                            onChange={ e => this.setState({senhaRepeticao: e.target.value})}>
                                        </input>
                                </FormGroup>
                                <div style={ {marginTop: '1em'} }>
                                    <button onClick={ this.cadastrar } type="button" className="btn btn-success">Salvar</button>
                                    <button onClick={ this.cancelar} type="button" className="btn btn-danger" style={ {marginLeft: '1em'} }>Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
        )
    }


}

export default withRouter(CadastroUsuario);