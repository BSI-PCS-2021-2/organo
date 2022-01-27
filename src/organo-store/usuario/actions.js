import router from '../../router'
import Axios from 'axios';
import Swal from 'sweetalert2'

export function login({ commit }, user) {
    const usuario = {
        email: user.email,
        senha: user.senha
    }
    let url = `http://localhost:8082/organo/${user.type}/autenticar`
    Axios.post(url, usuario).then(function (response) {
        let userData = null;
        if (user.type === 'comprador') {
            userData = {
                nome: response.data.nome,
                sobrenome: response.data.sobrenome,
                email: response.data.email,
                cpf: response.data.cpf,
                id: response.data.id,
                enderecos: response.data.enderecos,
                pedidos: response.data.pedidos,
                celular: response.data.celular
            }
            commit("setComprador", userData)
            Swal.fire({
                title: 'Login efetuado com sucesso!',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            router.push('/')
        } else if (user.type === 'fornecedor') {
            userData = {
                nomeFantasia: response.data.nomeFantasia,
                email: response.data.email,
                cnpj: response.data.cnpj,
                id: response.data.id,
                foto: response.data.foto,
                telefoneMovel: response.data.telefoneMovel,
                horarios: response.data.horarios,
                enderecos: response.data.enderecos
            }
            commit("setFornecedor", userData)
            Swal.fire({
                title: 'Login efetuado com sucesso!',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            router.push('/fornecedor')
        }
    })
        .catch(function (error) {
            Swal.fire({
                title: 'Login com erro',
                text: 'Tente novamente.',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            console.log(error)
        });
}

export function cadastrarComprador({ commit, getters }, compradorCadastro) {
    let url = "http://localhost:8082/organo/comprador/cadastrar"
    Axios.post(url, compradorCadastro).then(function (response) {
        if (response.status === 201) {
            Swal.fire({
                title: 'Comprador cadastrado com sucesso!',
                text: 'Você já pode se logar.',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            const comprador = getters.comprador
            commit('setComprador', comprador)
            setTimeout(() => router.push('/loginComprador'), 1500)
        }
    })
        .catch(function (error) {
            Swal.fire({
                title: 'Cadastro com erro',
                text: 'Tente novamente.',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            console.log(error)
        });
}

export function finalizarCompra({ commit, getters }, payload) {
    let comprador = getters.comprador
    if (Object.keys(comprador).length === 0) {
        Swal.fire({
            title: 'Não foi possível finalizar a compra',
            text: 'Por favor, se autentique primeiro.',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        return
    }
    let fornecedor = payload.carrinho[0].fornecedor
    let carrinhoFormatado = []
    payload.carrinho.forEach((i) => {
        const item = {
            produto: {
                validade: i.validade,
                nome: i.nome,
                preco: i.preco,
                fotoUrl: i.foto_url,
                fornecedor: i.fornecedor
            },
            quantidade: i.quantidade
        }
        carrinhoFormatado.push(item)
    })
    let pedido = {
        itens: carrinhoFormatado,
        valor: payload.precoTotal,
        metodoPagamento: payload.metodoPagamento,
        endereco: (payload.formaEntrega === 'ENTREGA') ? payload.endereco : fornecedor.enderecos[0],
        status: 'EM_ABERTO',
        dataEntrega: payload.dataEntrega,
        comprador: comprador,
        horarioEntrega: payload.horarioEntrega,
        formaEntrega: payload.formaEntrega
    }
    let url = `http://localhost:8082/organo/pedido/${fornecedor.cnpj}/registrar/${comprador.cpf}`
    Axios.post(url, pedido).then(function (response) {
        if (response.status === 201) {
            Swal.fire({
                title: 'Pedido registrado com sucesso!',
                text: 'Você já pode acompanhar o status do seu pedido.',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            let fPedidos = getters.fornecedorPedidos
            let cPedidos = getters.compradorPedidos
            fPedidos.push(pedido)
            commit('setFornecedorPedidos', fPedidos)
            cPedidos.push(pedido)
            commit('setCompradorPedidos', cPedidos)
            commit('produto/setCarrinho', [], { root: true })
            router.push('/comprador')
        }
    })
        .catch(function (error) {
            Swal.fire({
                title: 'Erro na criação do pedido',
                text: 'Por favor, tente novamente.',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            console.log(error)
        });
}

export function cadastrarFornecedor({ commit, getters }, fornecedorCadastro) {
    let url = "http://localhost:8082/organo/fornecedor/cadastrar"
    Axios.post(url, fornecedorCadastro).then(function (response) {
        if (response.status === 201) {
            Swal.fire({
                title: 'Fornecedor cadastrado com sucesso!',
                text: 'Você já pode se logar.',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            const fornecedor = getters.fornecedor
            commit('setFornecedor', fornecedor)
            setTimeout(() => router.push('/loginFornecedor'), 1500)
        }
    })
        .catch(function (error) {
            Swal.fire({
                title: 'Cadastro com erro',
                text: 'Tente novamente.',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            console.log(error)
        });
}

export function atualizarComprador({ commit, getters }, compradorCadastro) {
    console.log(compradorCadastro);
    let url = "http://localhost:8082/organo/comprador/atualizar"
    Axios.put(url, compradorCadastro).then(function (response) {
        if (response.status === 200) {
            Swal.fire({
                title: 'Atualização feita com sucesso!',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            const comprador = getters.comprador
            commit('setComprador', comprador)
            setTimeout(() => router.push('/comprador/'), 1500)
        }
    })
        .catch(function (error) {
            Swal.fire({
                title: 'Cadastro com erro',
                text: 'Tente novamente.',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            console.log(error)
        });
}

export function retornaFornecedores({ commit }) {
    let url = `http://localhost:8082/organo/fornecedor/listar`;
    Axios.get(url).then(function (response) {
        commit("setFornecedores", response.data)
    })
        .catch(function (error) {
            console.log(error)
        });
}

export function retornarPedidos({ commit }, fornecedorCnpj) {
    let url = `http://localhost:8082/organo/fornecedor/${fornecedorCnpj}/listarPedidos`;
    Axios.get(url).then(function (response) {
        commit("setFornecedorPedidos", response.data)
    })
        .catch(function (error) {
            console.log(error)
        });
}

export function retornarDadosRelatorioDeVendas({ commit }, fornecedorCnpj) {
    let url = `http://localhost:8082/organo/fornecedor/${fornecedorCnpj}/relatorioDeVendas`;
    Axios.get(url).then(function (response) {
        response.data.ganhoTotalDePedidos = String(response.data.ganhoTotalDePedidos.toFixed(2));
        commit("setRelatorioDeVendas", response.data)
    })
        .catch(function (error) {
            console.log(error)
        });
}

export function retornarCompradorPedidos({ commit }, compradorCpf) {
    let url = `http://localhost:8082/organo/comprador/${compradorCpf}/listarPedidos`;
    Axios.get(url).then(function (response) {
        commit("setCompradorPedidos", response.data)
    })
        .catch(function (error) {
            console.log(error)
        });
}

export function verificaCEP({ commit }, info) {
    let url = `http://localhost:8082/organo/cep/verificaCep/${info.cep}`;
    Axios.get(url).then(function (response) {
        if(response.status === 200 && response.data !== 'Cep não existe.') {
            commit("setCepVerificado" + info.type, true);
        } else {
            commit("setCepVerificado" + info.type, false);
        }
    })
        .catch(function (error) {
            console.log(error)
        });
}

export function sair({ commit }, user) {
    let usuario = {}
    if (user.id) {
        if (user.type === 'fornecedor') {
            commit("setFornecedor", usuario)
        } else if (user.type === 'comprador') {
            commit("setComprador", usuario)
        }
    }

    router.push('/')
}

export function estabelecerPedido({ commit, getters }, pedidoId) {
    if (pedidoId) {
        let pedido = {}
        const pedidos = getters.compradorPedidos
        pedidos.forEach((p) => {
            if (p.id == pedidoId) {
                pedido = p
            }
        })
        commit("setCompradorPedido", pedido)
    }
}

export function estabelecerPedidoFornecedor({ commit, getters }, pedidoId) {
    if (pedidoId) {
        let pedido = {}
        const pedidos = getters.fornecedorPedidos
        pedidos.forEach((p) => {
            if (p.id == pedidoId) {
                pedido = p
            }
        })
        commit("setFornecedorPedido", pedido)
    }
}

export function cadastrarProduto({ getters }, payload) {
    const fornecedor = getters.fornecedor
    const cnpjFornecedor = payload.cnpjFornecedor
    if (fornecedor.cnpj == cnpjFornecedor) {
        let todayDate = new Date();
        let valDate = new Date(payload.produto.validade);
        if (todayDate > valDate) {
            Swal.fire({
                title: 'Cadastro com erro.',
                text: 'Produto fora da validade.',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            return
        }
        const produto = payload.produto
        let url = `http://localhost:8082/organo/produto/${cnpjFornecedor}/cadastrar`;
        Axios.post(url, produto).then(function (response) {
            if (response.status === 201) {
                Swal.fire({
                    title: 'Produto cadastrado com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                setTimeout(() => router.push('/fornecedor'), 1500)
            }
        })
            .catch(function (error) {
                Swal.fire({
                    title: 'Cadastro com erro',
                    text: 'Tente novamente.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
                console.log(error)
            });
    }
}
