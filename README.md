# 🛒 TechStore - Projeto de E-commerce

> **Atividade 3: Adicionando JavaScript ao Projeto de E-commerce**  
> **Disciplina:** Modern Web  
> **Curso:** Análise e Desenvolvimento de Sistemas (2º Período)  
> **Instituição:** Faculdade Unyleya  
> **Aluno:** Flaviano Marcos da Silva  

---

## 📖 Sobre o Projeto
Este projeto consiste em uma loja virtual (TechStore) desenvolvida com foco em interatividade, dinamismo e experiência do usuário (**UX**), utilizando **HTML5**, **CSS3** e **JavaScript Puro (Vanilla JS)**, sem o uso de bibliotecas ou frameworks externos.

---

## 🚀 Funcionalidades Dinâmicas Implementadas

O projeto atende a todos os requisitos do enunciado e implementa as seguintes funcionalidades:

1. **🌓 Alternância de Tema (Modo Claro / Modo Escuro):**
   * Botão interativo no cabeçalho que alterna dinamicamente classes CSS no `body`.
   * Atualização em tempo real das cores de fundo, cards, textos e modais.
   * Alternância automática do ícone e rótulo do botão (`🌙 Modo Escuro` / `🌞 Modo Claro`).

2. **🕒 Data e Hora em Tempo Real:**
   * Relógio dinâmico no rodapé atualizado a cada segundo via `setInterval`.
   * Formatação no padrão brasileiro (`pt-BR`) utilizando a API nativa `Intl` / `toLocaleString`.

3. **🔍 Busca Inteligente de Produtos:**
   * Validação de campo vazio e obrigatoriedade de no mínimo 3 caracteres.
   * Suporte a busca via clique no botão da lupa ou tecla `Enter`.
   * **Botão "✕" de Limpeza Instantânea:** Limpa a busca e restaura todos os produtos com um único clique (ou pela tecla `Escape`).
   * **Layout Proporcional:** Ao filtrar um único produto, o grid e as imagens mantêm proporção e tamanho adequados através de `object-fit: contain` e limitação de largura no CSS, evitando que a imagem fique esticada ou gigante na tela.

4. **📄 Exibição Dinâmica de Detalhes:**
   * Botão "Ver Detalhes" em cada card que expande ou recolhe a lista de especificações técnicas do produto.
   * Rótulo do botão alterna contextualmente entre "Ver Detalhes" e "Ocultar Detalhes".

5. **🛒 Carrinho de Compras Interativo (Otimizado para UX):**
   * **Adição de Produtos:** Clique em "Comprar" adiciona o produto a um array de itens, emite alerta de confirmação e atualiza o contador do cabeçalho.
   * **Modal Completo:** Exibe a lista dos itens selecionados com miniaturas, quantidade, valores unitários e o total da compra em reais (`R$`).
   * **Remoção de Itens:** Botão individual `🗑️ Remover` para decrementar unidades ou excluir o produto do carrinho.
   * **Limpeza com Auto-Fechamento:** Ao clicar em `🗑️ Limpar Carrinho`, após a confirmação, o carrinho é esvaziado e o modal fecha automaticamente, eliminando retrabalho de cliques para o usuário.
   * **Empty State com CTA:** Caso o carrinho fique vazio (ou ao abrir vazio), o sistema exibe um estado visual elegante com o botão **`🛍️ Continuar Comprando`**, que fecha o modal e rola suavemente para a vitrine.
   * **Finalização de Pedido:** Processa o pedido com feedback de sucesso e retorno à vitrine.

---

## 🛠️ Tecnologias Utilizadas
* **HTML5:** Semântica estruturada e acessibilidade básica (`aria-label`, tags semânticas).
* **CSS3:** Flexbox, CSS Grid responsivo, variáveis de cor para modo escuro, transições suaves e modais animados.
* **JavaScript (ES6+):** Manipulação da DOM, escuta de eventos (`click`, `keydown`, `input`), métodos de array (`reduce`, `find`, `findIndex`, `splice`), temporizador (`setInterval`) e gerenciamento de estado em memória.

---

## 📂 Estrutura de Arquivos
```text
Atividade3_Ecommerce/
│
├── index.html       # Estrutura semântica da página e do modal do carrinho
├── style.css        # Estilos, temas (claro/escuro), grid responsivo e modais
├── script.js        # Toda a lógica de dinamismo em JavaScript puro
├── monitor.jpg      # Imagem do Monitor Portátil Arzopa
├── teclado.jpg      # Imagem do Teclado Mecânico RGB
├── mouse.jpg        # Imagem do Mouse Ergonômico
└── README.md        # Documentação completa do projeto
```

---

## 💻 Como Executar o Projeto Localmente
1. Clone ou baixe este repositório:
   ```bash
   git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   ```
2. Abra a pasta do projeto no seu explorador de arquivos.
3. Dê um duplo clique no arquivo `index.html` para abrir diretamente em qualquer navegador moderno (Chrome, Edge, Firefox, etc.).

---

## 🎥 Vídeo de Apresentação
* **Link no YouTube (Não Listado):** [Assista à apresentação do projeto no YouTube](https://youtu.be/80YeSykfDYE)
