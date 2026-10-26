/**
 * ARQUIVO: script.js
 * DESCRIÇÃO: Implementação das funcionalidades dinâmicas utilizando JavaScript puro (Vanilla JS).
 * REQUISITOS ATENDIDOS: A, B, C, D, E, F (todas as sugestões da Atividade 3 com melhorias de UX).
 */

// =======================================================================
// FUNCIONALIDADE C: Alternar entre modo claro e escuro (Tema)
// =======================================================================
const themeButton = document.getElementById('theme-toggle');

themeButton.addEventListener('click', () => {
    const body = document.body;
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeButton.textContent = '🌞 Modo Claro';
    } else {
        themeButton.textContent = '🌙 Modo Escuro';
    }
});


// =======================================================================
// FUNCIONALIDADES A e E: Carrinho de Compras Dinâmico (Adicionar, Contar, Remover e Limpar)
// =======================================================================
const botoesComprar = document.querySelectorAll('.btn-comprar');
const cartCountElement = document.getElementById('cart-count');
const menuCarrinho = document.getElementById('menu-carrinho');
const modalCarrinho = document.getElementById('modal-carrinho');
const btnFecharCarrinho = document.getElementById('btn-fechar-carrinho');
const listaCarrinhoElement = document.getElementById('lista-carrinho');
const valorTotalCarrinhoElement = document.getElementById('valor-total-carrinho');
const btnLimparCarrinho = document.getElementById('btn-limpar-carrinho');
const btnFinalizarCompra = document.getElementById('btn-finalizar-compra');

// Array de itens do carrinho
let itensCarrinho = [];

// Atualiza a interface gráfica do carrinho e contadores
function atualizarCarrinhoUI() {
    // Calcula quantidade total e valor total
    const totalItens = itensCarrinho.reduce((acumulador, item) => acumulador + item.quantidade, 0);
    const valorTotal = itensCarrinho.reduce((acumulador, item) => acumulador + (item.preco * item.quantidade), 0);
    
    // Atualiza o contador na barra de navegação
    cartCountElement.textContent = totalItens;
    
    // Atualiza o valor formatado em moeda brasileira
    valorTotalCarrinhoElement.textContent = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    const rodapeModal = document.querySelector('.modal-footer');

    // Renderiza a lista de itens ou o estado vazio com CTA
    if (itensCarrinho.length === 0) {
        listaCarrinhoElement.innerHTML = `
            <div class="carrinho-vazio-container">
                <span class="carrinho-vazio-icone">🛒</span>
                <p class="carrinho-vazio-titulo">Seu carrinho está vazio</p>
                <p class="carrinho-vazio-sub">Nenhum item adicionado por enquanto.</p>
                <button type="button" id="btn-continuar-comprando" class="btn-continuar-comprando">🛍️ Continuar Comprando</button>
            </div>
        `;
        
        // Oculta a área de total e botões de compra quando não há itens
        if (rodapeModal) rodapeModal.style.display = 'none';
        
        // Ação do botão "Continuar Comprando": fecha o modal e rola para a vitrine
        const btnContinuar = listaCarrinhoElement.querySelector('#btn-continuar-comprando');
        if (btnContinuar) {
            btnContinuar.addEventListener('click', () => {
                modalCarrinho.style.display = 'none';
                document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
            });
        }
    } else {
        if (rodapeModal) rodapeModal.style.display = 'flex';
        btnLimparCarrinho.disabled = false;
        btnFinalizarCompra.disabled = false;
        
        listaCarrinhoElement.innerHTML = '';
        itensCarrinho.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item-carrinho';
            
            const subtotal = item.preco * item.quantidade;
            const subtotalFormatado = subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            
            itemElement.innerHTML = `
                <img src="${item.imagem}" alt="${item.nome}">
                <div class="item-carrinho-info">
                    <strong>${item.nome}</strong>
                    <span>${item.quantidade}x ${item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} = ${subtotalFormatado}</span>
                </div>
                <button type="button" class="btn-remover-item" data-id="${item.id}" title="Remover item do carrinho">🗑️ Remover</button>
            `;
            
            // Adiciona o evento de remoção individual do item
            const btnRemover = itemElement.querySelector('.btn-remover-item');
            btnRemover.addEventListener('click', () => {
                removerItemDoCarrinho(item.id);
            });
            
            listaCarrinhoElement.appendChild(itemElement);
        });
    }
}

// Adiciona produto ao carrinho
botoesComprar.forEach(botao => {
    botao.addEventListener('click', () => {
        const cardProduto = botao.closest('.produto');
        if (!cardProduto) return;
        
        const id = cardProduto.dataset.id;
        const nome = cardProduto.querySelector('h3').textContent;
        const preco = parseFloat(cardProduto.dataset.preco) || 0;
        const imagem = cardProduto.querySelector('img').getAttribute('src');
        
        // Verifica se o produto já existe no carrinho
        const itemExistente = itensCarrinho.find(item => item.id === id);
        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            itensCarrinho.push({ id, nome, preco, imagem, quantidade: 1 });
        }
        
        atualizarCarrinhoUI();
        
        // Alerta de confirmação solicitado no requisito A
        alert(`Sucesso! "${nome}" foi adicionado ao seu carrinho.`);
    });
});

// Remove item do carrinho (reduz quantidade ou remove completamente)
function removerItemDoCarrinho(id) {
    const itemIndex = itensCarrinho.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        const item = itensCarrinho[itemIndex];
        if (item.quantidade > 1) {
            item.quantidade--;
        } else {
            itensCarrinho.splice(itemIndex, 1);
        }
        atualizarCarrinhoUI();
    }
}

// Limpa todos os itens do carrinho e fecha o modal automaticamente
btnLimparCarrinho.addEventListener('click', () => {
    if (itensCarrinho.length === 0) return;
    
    if (confirm('Deseja realmente esvaziar todos os itens do carrinho?')) {
        itensCarrinho = [];
        atualizarCarrinhoUI();
        modalCarrinho.style.display = 'none'; // Fecha o modal automaticamente
        alert('Carrinho esvaziado com sucesso! Retornando à loja.');
    }
});

// Finaliza a compra
btnFinalizarCompra.addEventListener('click', () => {
    if (itensCarrinho.length === 0) return;
    
    const totalFormatado = valorTotalCarrinhoElement.textContent;
    alert(`Compra finalizada com sucesso no valor de ${totalFormatado}!\nObrigado por comprar na TechStore.`);
    itensCarrinho = [];
    atualizarCarrinhoUI();
    modalCarrinho.style.display = 'none';
});

// Abertura e fechamento do modal do carrinho
menuCarrinho.addEventListener('click', (evento) => {
    evento.preventDefault();
    modalCarrinho.style.display = 'flex';
});

btnFecharCarrinho.addEventListener('click', () => {
    modalCarrinho.style.display = 'none';
});

// Fecha o modal ao clicar fora da janela de conteúdo
window.addEventListener('click', (evento) => {
    if (evento.target === modalCarrinho) {
        modalCarrinho.style.display = 'none';
    }
});


// =======================================================================
// FUNCIONALIDADE B: Mostrar a data e hora atual no rodapé
// =======================================================================
const dataHoraElement = document.getElementById('data-hora');

function atualizarRelogio() {
    const agora = new Date();
    const formatado = agora.toLocaleString('pt-BR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    dataHoraElement.textContent = `Acesso em: ${formatado}`;
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();


// =======================================================================
// FUNCIONALIDADE F: Validar campo de pesquisa, botão "X" de limpar e filtro
// =======================================================================
const btnBusca = document.getElementById('btn-busca');
const campoBusca = document.getElementById('campo-busca');
const btnLimparBusca = document.getElementById('btn-limpar-busca');

// Restaura todos os produtos e limpa a pesquisa
function limparBusca() {
    campoBusca.value = '';
    btnLimparBusca.style.display = 'none';
    const produtos = document.querySelectorAll('.produto');
    produtos.forEach(produto => produto.style.display = '');
    campoBusca.focus();
}

btnLimparBusca.addEventListener('click', limparBusca);

// Monitora digitação: exibe ou oculta o botão "X" e restaura ao apagar
campoBusca.addEventListener('input', () => {
    if (campoBusca.value.trim().length > 0) {
        btnLimparBusca.style.display = 'block';
    } else {
        btnLimparBusca.style.display = 'none';
        const produtos = document.querySelectorAll('.produto');
        produtos.forEach(produto => produto.style.display = '');
    }
});

function realizarBusca() {
    const termoBusca = campoBusca.value.trim().toLowerCase(); 
    const produtos = document.querySelectorAll('.produto');
    
    if (termoBusca === '') {
        limparBusca();
        alert('Busca limpa. Exibindo todos os produtos.');
        return;
    }
    
    btnLimparBusca.style.display = 'block';
    
    if (termoBusca.length < 3) {
        alert('Atenção: Digite pelo menos 3 caracteres para realizar a pesquisa.');
        return;
    }
    
    let encontrou = false;
    
    // Percorre cada produto na tela
    produtos.forEach(produto => {
        const nomeProduto = produto.querySelector('h3').textContent.toLowerCase();
        
        // Verifica se o nome do produto inclui o que foi digitado
        if (nomeProduto.includes(termoBusca)) {
            produto.style.display = ''; // Exibe o produto no tamanho original e proporcional
            encontrou = true;
        } else {
            produto.style.display = 'none'; // Oculta o produto não correspondente
        }
    });
    
    // Alerta caso pesquise algo que não existe na loja
    if (!encontrou) {
        alert(`Nenhum produto encontrado com o termo "${campoBusca.value}".`);
        limparBusca();
    }
}

// Executa a busca ao clicar no botão da lupa
btnBusca.addEventListener('click', realizarBusca);

// Teclado: Enter busca, Escape limpa busca ou fecha modal
campoBusca.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') {
        realizarBusca();
    } else if (evento.key === 'Escape') {
        limparBusca();
    }
});

window.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && modalCarrinho.style.display === 'flex') {
        modalCarrinho.style.display = 'none';
    }
});


// =======================================================================
// FUNCIONALIDADE D: Mostrar/esconder uma seção de detalhes do produto
// =======================================================================
const botoesDetalhes = document.querySelectorAll('.btn-detalhes');

botoesDetalhes.forEach(botao => {
    botao.addEventListener('click', () => {
        const listaDetalhes = botao.nextElementSibling;
        const estaOculto = window.getComputedStyle(listaDetalhes).display === 'none';
        
        if (estaOculto) {
            listaDetalhes.style.display = 'block';
            botao.textContent = 'Ocultar Detalhes';
        } else {
            listaDetalhes.style.display = 'none';
            botao.textContent = 'Ver Detalhes';
        }
    });
});

// Inicialização da interface do carrinho ao carregar a página
atualizarCarrinhoUI();
