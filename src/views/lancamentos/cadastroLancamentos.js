import React from "react";
import { withRouter } from "react-router-dom";
import FormGroup from "../../components/form-group";
import Card from "../../components/card";
import SelectMenu from "../../components/selectMenu";
import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localstorageService";

class CadastroLancamentos extends React.Component {

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    componentDidMount() {
        const params = this.props.match.params;
        if(params.id) {
            this.service.obterPorId(params.id)
                .then(response => {
                    this.setState({...response.data, atualizando:true})
                })
                .catch(error => {
                    console.log(error.response.data);
                })
        }
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name] : value});
    }

    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        const { descricao, valor, mes, ano, tipo } = this.state;
        const lancamento = { descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id}

        try {
            this.service.validar(lancamento);

        } catch(erro) {
            //const mensagens = erro.mensagens;
            console.log(erro.mensagens);
            erro.mensagens.forEach(msg => {
                console.log(msg);
            });
            return false;
        }

        this.service
            .salvar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos');
                console.log("Lancamento cadastrado com sucesso!");
            }).catch( error => {
                console.log(error.response.data);
            })
    }

    atualizar = () => {
        const { descricao, valor, mes, ano, tipo, status, usuario, id } = this.state;
        const lancamento = { descricao, valor, mes, ano, tipo, usuario, status, id }; 
        
        this.service
            .salvar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos');
                console.log("Lancamento cadastrado com sucesso!");
            }).catch( error => {
                console.log(error.response.data);
            })
    }

    render() {
      
        const tipos = this.service.obterTipos();
        const meses = this.service.obterListaMeses();

        return(
            <Card title={this.state.atualizando ? 'Atualizacao de Lancamento' : 'Cadastro de Lancamento'}>
                <div className="row">
                    <FormGroup  id="inputDescricao"
                                label="Descricao: *">
                        <input  id="inputDescricao" 
                                type="text"
                                value={this.state.descricao} 
                                name="descricao"
                                className="form-control" 
                                onChange={this.handleChange}/>
                    </FormGroup>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input  id="inputAno" 
                                    name="ano"
                                    value={this.state.ano} 
                                    onChange={this.handleChange}
                                    type="text" 
                                    className="form-control"/>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mes: *" >
                            <SelectMenu id="inputMes" 
                                        lista={meses} 
                                        name="mes"
                                        onChange={this.handleChange}
                                        className="form-control"/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input  id="inputValor" 
                                    name="valor"
                                    value={this.state.valor} 
                                    onChange={this.handleChange}
                                    type="text" 
                                    className="form-control"/>
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo" 
                                        lista={tipos} 
                                        name="tipo"
                                        value={this.state.tipo} 
                                        onChange={this.handleChange}
                                        className="form-control"/>
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: *">
                            <input  type="text" 
                                    name="status"
                                    onChange={this.handleChange}
                                    className="form-control" 
                                    disabled/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row" style={{marginTop: '1em', }}>
                    <div className="col-md-6">
                        {this.state.atualizando ? 
                            (
                                <button className="btn btn-success" 
                                        onClick={this.atualizar}>
                                        <i className="pi pi-refresh"></i> Atualizar
                                </button>
                            ) 
                            : 
                            (
                                <button className="btn btn-success" 
                                        onClick={this.submit}>
                                        <i className="pi pi-save"></i> Salvar
                                </button>
                            )
                        }
                        <button className="btn btn-danger" 
                                onClick={e => this.props.history.push('/consulta-lancamentos')} 
                                style={{marginLeft: '1em'}}>
                                <i className="pi pi-times"></i> Cancelar
                        </button>
                    </div>
                </div>
            </Card>
        )
    }

}

export default withRouter(CadastroLancamentos);