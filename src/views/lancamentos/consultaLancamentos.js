import React from "react";
import { withRouter } from "react-router-dom";
import FormGroup from "../../components/form-group";
import Card from "../../components/card";
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";
import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localstorageService";

class ConsultaLancamentos extends React.Component {


    constructor() {
        super();
        this.service = new LancamentoService();
    }

    state = {
        ano: '',
        mes: '', 
        tipo: '',
        descricao: '',
        lancamentos: []
    }

    buscar = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service
            .consultar(lancamentoFiltro)
            .then( resposta => {
                if(resposta.data) {
                    this.setState( {lancamentos: [] } )
                }
                this.setState({ lancamentos: resposta.data })
            })
            .catch(error => {
                console.log(error);
            })

        this.setState( {ano: '', mes: '', tipo: ''} );
    }

    render() {
        const lista = this.service.obterListaMeses();

        const tipos = this.service.obterTipos();

        return(
            <Card title="Consulta Lancamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup
                            htmlFor="inputAno"
                            label="Ano: *">
                                <input  type="text"
                                        className="form-control"
                                        id="inputAno"
                                        value={this.state.ano}
                                        onChange={e => this.setState({ano: e.target.value})}
                                        placeholder="Digite o Ano"/>
                            </FormGroup>

                            <FormGroup htmlFor="inputMes" label="Mes">
                                <SelectMenu id="inputMes"
                                value={this.state.mes}
                                onChange={ e => this.setState({mes: e.target.value})}
                                className="form-control" 
                                lista={lista}/>
                            </FormGroup>

                            <FormGroup htmlFor="inputDescricao" label="Descricao">
                                <input  type="text"
                                        className="form-control"
                                        id="inputDesc"
                                        value={this.state.descricao}
                                        onChange={e => this.setState({descricao: e.target.value})}
                                        placeholder="Digite a descricao"/>
                            </FormGroup>

                            <FormGroup htmlFor="inputTipo" label="Tipo: ">
                                <SelectMenu id="inputTipo" 
                                value={this.state.tipo}
                                onChange={ e => this.setState({tipo: e.target.value})}
                                className="form-control" 
                                lista={tipos}/>
                            </FormGroup>

                            <div style={{marginTop:'1em'}}>
                                <button onClick={this.buscar} type="button" className="btn btn-success">Buscar</button>
                                <button type="button" className="btn btn-danger" style={ {marginLeft: '1em'} }>Cadastrar</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="bs-component">
                                <LancamentosTable lancamentos={this.state.lancamentos}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            
        )
    }

}

export default withRouter(ConsultaLancamentos);