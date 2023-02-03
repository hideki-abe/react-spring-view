import React from "react";
import { withRouter } from "react-router-dom";
import FormGroup from "../../components/form-group";
import Card from "../../components/card";
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";
import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localstorageService";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

class ConsultaLancamentos extends React.Component {


    constructor() {
        super();
        this.service = new LancamentoService();
    }

    state = {
        id: null,
        ano: '',
        mes: '', 
        tipo: '',
        descricao: '',
        lancamentos: [],
        showConfirmDialog: false,
        lancamentoDeletar: {}
    }

    buscar = () => {

        if(!this.state.ano) {
            console.log("O campo ano eh obrigatorio!");
            return false;
        }

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
                const lista = resposta.data;
                if(lista.length < 1) {
                    console.log("Nenhum resultado encontrado!");
                }
                this.setState({ lancamentos: lista })
            })
            .catch(error => {
                console.log(error);
            })
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-lancamentos/${id}`);
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({ showConfirmDialog: true, lancamentoDeletar: lancamento })
    }

    cancelarDelecao = () => {
        this.setState({showConfirmDialog: false, lancamentoDeletar: {}})
    }

    deletar = () => {
        this.service
            .deletar(this.state.lancamentoDeletar.id)
            .then( response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(this.state.lancamentoDeletar);
                lancamentos.splice(index, 1);
                this.setState({lancamentos: lancamentos, showConfirmDialog: false});
                console.log("Lancamento  deletado com sucesso!");
            })
            .catch(error => {
                console.log(error);
            })
    }

    preparaFormularioCadastro = () => {
        this.props.history.push('/cadastro-lancamentos');
    }

    alterarStatus = (lancamento, status) => {
        this.service   
            .alterarStatus(lancamento, status)
            .then( response => {
                const lancamentos = this.state.lancamentos;
                console.log("teste" + lancamentos.id);
                const index = lancamentos.indexOf(lancamento);
                if(index !== -1) {
                    lancamento['status'] = status;
                    lancamentos[index] = lancamento;
                    this.setState( {lancamento} );
                }
                console.log("Status atualizado com sucesso!");
            })
    }

    render() {
        const lista = this.service.obterListaMeses();
        const tipos = this.service.obterTipos();

        const confirmDialogFooter = (
            <div>
                <Button label="Confirma" icon="pi pi-check" onClick={this.deletar}/>
                <Button label="Cancela" icon="pi pi-times" onClick={this.cancelarDelecao} className="p-button-secondary"/>
            </div>
        );

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
                                <button onClick={this.buscar} 
                                        type="button" 
                                        className="btn btn-success">
                                        <i className="pi pi-search"></i> Buscar
                                </button>
                                <button onClick={this.preparaFormularioCadastro} 
                                        type="button" 
                                        className="btn btn-danger" >
                                        <i className="pi pi-money-bill"></i> Cadastrar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="bs-component">
                                <LancamentosTable   lancamentos={this.state.lancamentos} 
                                                    deleteAction={this.abrirConfirmacao} 
                                                    editar={this.editar}
                                                    alterarStatus={this.alterarStatus}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                <Dialog header="Confirmacao" 
                        visible={this.state.showConfirmDialog} 
                        style={{ width: '50vw' }} 
                        footer={confirmDialogFooter}
                        onHide={() => this.setState( {showConfirmDialog: false} )}>
                        Confirma a exclusao deste lancamento?
                </Dialog>
                </div>
            </Card>
            
        )
    }

}

export default withRouter(ConsultaLancamentos);