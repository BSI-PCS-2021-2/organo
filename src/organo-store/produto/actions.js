import axios from "axios"
import router from '../../router'
import Swal from 'sweetalert2'

export function retornarProdutos({ commit, getters }, fornecedorCnpj) {
    let url = `http://localhost:8082/organo/fornecedor/${fornecedorCnpj}/listarProdutos`;
    let produtos = getters.produtos
    axios.get(url).then((response) => {
        if(Object.keys(response.data).length !== 0) {
            produtos.push(response.data)
        }
        commit("setProdutos", produtos);
    }).catch(error => {
        console.log(error);
    });
}

export function detalhesProduto({ commit }, id, fornecedorCnpj) {
    let url = `http://localhost:8082/organo/produto/${fornecedorCnpj}/${id}`;
    axios.get(url).then((response) => {
        const produtoData = {
            nome: response.data.nome,
            id: response.data.id,
            preco: response.data.preco,
            validade: response.data.validade,
            foto_url: response.data.fotoUrl,
            fornecedor: response.data.fornecedor
        }
        commit("setProduto", produtoData);
    }).catch(function (error) {
        console.log(error);
    });
}

export function adicionarNoCarrinho({ commit, getters }, payload) {
    let carrinho = getters.carrinho
    let data = payload.produto
    if(carrinho.length > 0) {
        let fornecedor = payload.produto.fornecedor
        let fornecedorExistente = carrinho[0].fornecedor
        if(fornecedor.nomeFantasia !== fornecedorExistente.nomeFantasia) {
            Swal.fire({
                title: 'Não foi possível adicionar este produto no carrinho',
                text: 'Por favor remova os itens de outro fornecedor antes de inserir novos itens.',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
              return
        }
    }
    let encontrado = false;
    carrinho.forEach((item) => {
        if(item.id === data.id) {
            encontrado = true;
            item.quantidade = item.quantidade + payload.quantidade
        }
    })
    if(encontrado) {
        commit("setCarrinho", carrinho)
        router.push('/carrinho')
        return
    }
    data["quantidade"] = payload.quantidade
    carrinho.push(data)
    commit("setCarrinho", carrinho)
    //router.push('/carrinho')
}

export function removerDoCarrinho({ commit, getters }, id) {
    let carrinho = []
    if (id) {
        for (let index = 0; index < getters.carrinho.length; index++) {
            const elemento = getters.carrinho[index];
            if(elemento.id === id) {
                if(elemento.quantidade > 1) {
                    elemento.quantidade = elemento.quantidade - 1;
                    carrinho.push(elemento);
                }
            }
            if (elemento.id !== id) {
                carrinho.push(elemento)
            }
        }
    }
    commit("setCarrinho", carrinho)
}

export function esvaziarProdutos({commit, getters}) {
    let produtos = getters.produtos
    produtos = []
    commit("setProdutos", produtos)
}