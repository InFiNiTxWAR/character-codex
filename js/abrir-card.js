// ==========================================
// CHARACTER CODEX — CARDS DO INVENTÁRIO
// ==========================================

const detalhesItens = {
    "Camisa escura de manga longa": {
        categoria: "Vestimenta",
        icone: "👕",
        imagem: "assets/itens/camisa.png"
    },

    "Colete de couro gasto": {
        categoria: "Vestimenta",
        icone: "🦺",
        imagem: "assets/itens/colete.png"
    },

    "Calça escura flexível": {
        categoria: "Vestimenta",
        icone: "👖",
        imagem: "assets/itens/calça.png"
    },

    "Botas de couro": {
        categoria: "Vestimenta",
        icone: "🥾",
        imagem: "assets/itens/botas.png"
    },

    "Braceletes de couro": {
        categoria: "Vestimenta",
        icone: "🛡️",
        imagem: "assets/itens/bracelete.png"
    },

    "Luvas sem dedos": {
        categoria: "Vestimenta",
        icone: "🧤",
        imagem: "assets/itens/luva.png"
    },

    "Cinto com compartimentos": {
        categoria: "Equipamento",
        icone: "🪢",
        imagem:  "assets/itens/cinto.png"
    },

    "Capa de viagem": {
        categoria: "Vestimenta",
        icone: "🧥",
        imagem: "assets/itens/capa.png"
    },

    "Adaga": {
        categoria: "Arma",
        icone: "🗡️",
        imagem: "assets/itens/adaga.png"
    },

    "Mochila de viagem": {
        categoria: "Armazenamento",
        icone: "🎒",
        imagem: "assets/itens/bolsa.png"
    },

    "Cantil para água": {
        categoria: "Suprimento",
        icone: "🍶",
        imagem: "assets/itens/cantil.png"
    },

    "Corda resistente": {
        categoria: "Equipamento",
        icone: "🪢",
        imagem: "assets/itens/corda.png"
    },

    "Carta misteriosa": {
        categoria: "Objeto pessoal",
        icone: "✉️",
        imagem: "assets/itens/carta.png"
    },

    "Bolsa de dinheiro": {
        categoria: "Objeto pessoal",
        icone: "💰",
        imagem: "assets/itens/monei.png"
    }
};

// ==========================================
// CONTEÚDO ESPECIAL DOS ITENS
// ==========================================

const conteudoMochila = [
    "Cantil para água",
    "Corda resistente",
    "Trocas de roupa",
    "Terno escuro",
    "Camisa adicional",
    "Calça adicional",
    "Roupas íntimas e meias",
    "Conjunto de higiene pessoal",
    "Pano de manutenção"
];

// ==========================================
// FUNÇÃO PARA EVITAR HTML INDESEJADO
// ==========================================

function escaparHTML(texto) {
    return String(texto ?? "").replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[caractere]);
}

// ==========================================
// ABRIR CARD DO ITEM
// ==========================================

function abrirCard(indice) {
    const item = personagem.inventario[indice];

    if (!item) return;

    const detalhe = detalhesItens[item.nome] || {
        categoria: "Equipamento",
        icone: "📦",
        imagem: null
    };

    fecharCard();

    // Conteúdo especial da mochila e da bolsa
    const conteudoEspecial = item.nome === "Mochila de viagem"
        ? `
            <div class="card-subtitulo">CONTEÚDO DA MOCHILA</div>

            <div class="card-conteudo-lista">
                ${conteudoMochila.map(nome => `
                    <div class="card-conteudo-item">
                        <span>📦</span>
                        <span>${escaparHTML(nome)}</span>
                    </div>
                `).join("")}
            </div>
        `
        : item.nome === "Bolsa de dinheiro"
        ? `
            <div class="card-subtitulo">CONTEÚDO</div>

            <div class="card-conteudo-item">
                <span>🪙</span>
                <span>Moedas — quantidade a definir pelo Mestre.</span>
            </div>
        `
        : "";

    // Criar modal
    const modal = document.createElement("div");

    modal.className = "card-overlay";
    modal.id = "inventory-card";

    modal.innerHTML = `
        <div class="inventory-card">

            <button class="card-fechar" aria-label="Fechar">×</button>

            <div class="card-imagem">
                ${
                    detalhe.imagem
                        ? `
                            <img
                                src="${detalhe.imagem}"
                                alt="${escaparHTML(item.nome)}"
                                onerror="this.remove(); this.parentElement.innerHTML='<span>${detalhe.icone}</span>';"
                            >
                        `
                        : `<span>${detalhe.icone}</span>`
                }
            </div>

            <div class="card-categoria">
                ${escaparHTML(detalhe.categoria)}
            </div>

            <h2>${escaparHTML(item.nome)}</h2>

            <p class="card-descricao">
                ${escaparHTML(item.descricao)}
            </p>

            <div class="card-informacoes">
                <div>
                    <small>QUANTIDADE</small>
                    <strong>${item.quantidade}</strong>
                </div>

                <div>
                    <small>PESO UNITÁRIO</small>
                    <strong>${Number(item.peso || 0).toFixed(1)} kg</strong>
                </div>
            </div>

            ${conteudoEspecial}

            <div class="card-rodape">
                CHARACTER CODEX · O CORVO
            </div>

        </div>
    `;

    document.body.appendChild(modal);

    // Fechar pelo botão
    modal.querySelector(".card-fechar").onclick = fecharCard;

    // Fechar clicando fora do card
    modal.addEventListener("click", evento => {
        if (evento.target === modal) {
            fecharCard();
        }
    });

    // Fechar com ESC
    document.addEventListener("keydown", fecharComEsc);
}

// ==========================================
// FECHAR CARD
// ==========================================

function fecharCard() {
    const modal = document.getElementById("inventory-card");

    if (modal) {
        modal.remove();
    }

    document.removeEventListener("keydown", fecharComEsc);
}

// ==========================================
// FECHAR COM ESC
// ==========================================

function fecharComEsc(evento) {
    if (evento.key === "Escape") {
        fecharCard();
    }
}

// ==========================================
// CLIQUE NOS ITENS DO INVENTÁRIO
// ==========================================

document.addEventListener("click", evento => {
    const item = evento.target.closest("[data-card]");

    if (!item) return;

    // Não abrir o card ao clicar em Remover
    if (evento.target.closest("[data-remove]")) return;

    abrirCard(Number(item.dataset.card));
});