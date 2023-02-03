import ApiService from "../apiservice";
import ErroValidacao from "../exception/ErroValidacao";

class UsuarioService extends ApiService {

    constructor() {
        super('/api/usuarios');
    }

    autenticar(credenciais) {
        return this.post('/autenticar', credenciais);
    }

    obterSaldoPorUsuario(id) {
        return this.get(`/${id}/saldo`);
    }
    
    salvar(usuario) {
        return this.post('', usuario);
    }

    validar(usuario) {
        const erros = [];
        
        if(!usuario.nome) {
            erros.push('O campo nome eh obrigatorio.');
        }

        if(!usuario.email) {
            erros.push('O campo email eh obrigatorio');
        }else if( !usuario.email.match(/^[a-z0-9]+@[a-z0-9]+\.[a-z]/)) {
            erros.push('Informe um email valido!');
        }

        if(!usuario.senha || !usuario.senhaRepeticao) {
            erros.push('Insira a senha 2x.');
        }else if( usuario.senha !== usuario.senhaRepeticao) {
            erros.push('As senhas nao batem.');
        }

        if(erros && erros.length > 0) {
            throw new ErroValidacao(erros);
        }
    }
}

export default UsuarioService;