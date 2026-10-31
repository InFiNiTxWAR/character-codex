// ==========================================
// CHARACTER CODEX — GALERIA GERAL
// ==========================================

// Todos os arquivos de imagem de assets/

const imagensGaleria = [
    // PERSONAGENS
    {
        nome: "Retrato de Vaerik",
        arquivo: "facial.png",
        caminho: "assets/personagens/facial.png",
        categoria: "Personagens"
    },

    // ITENS
    {
        nome: "Adaga",
        arquivo: "adaga.png",
        caminho: "assets/itens/adaga.png",
        categoria: "Equipamentos"
    },
    {
        nome: "Bolsa",
        arquivo: "bolsa.png",
        caminho: "assets/itens/bolsa.png",
        categoria: "Equipamentos"
    },
    {
        nome: "Botas",
        arquivo: "botas.png",
        caminho: "assets/itens/botas.png",
        categoria: "Equipamentos"
    },
    {
        nome: "Bracelete",
        arquivo: "bracelete.png",
        caminho: "assets/itens/bracelete.png",
        categoria: "Equipamentos"
    },
    {
        nome: "Calça",
        arquivo: "calça.png",
        caminho: "assets/itens/calça.png",
        categoria: "Equipamentos"
    },
    {
        nome: "Camisa",
        arquivo: "camisa.png",
        caminho: "assets/itens/camisa.png",
        categoria: "Equipamentos"
    },
    {
        nome: "Cantil",
        arquivo: "cantil.png",
        caminho: "assets/itens/cantil.png",
        categoria: "Equipamentos"
    },
    {
        nome: "Capa",
        arquivo: "capa.png",
        caminho: "assets/itens/capa.png",
        categoria: "Equipamentos"
    },
    {
        nome: "Carta",
        arquivo: "carta.png",
        caminho: "assets/itens/carta.png",
        categoria: "Equipamentos"
    },
    {
        nome: "Cinto",
        arquivo: "cinto.png",
        caminho: "assets/itens/cinto.png",
        categoria: "Equipamentos"
    },
    {
        nome: "Colete",
        arquivo: "colete.png",
        caminho: "assets/itens/colete.png",
        categoria: "Equipamentos"
    },
    {
        nome: "Corda",
        arquivo: "corda.png",
        caminho: "assets/itens/corda.png",
        categoria: "Equipamentos"
    },
    {
        nome: "Luvas",
        arquivo: "luva.png",
        caminho: "assets/itens/luva.png",
        categoria: "Equipamentos"
    },
    {
        nome: "Bolsa de Dinheiro",
        arquivo: "monei.png",
        caminho: "assets/itens/monei.png",
        categoria: "Equipamentos"
    },
    
  {
        nome: "Brasão do Clã",
        arquivo: "brasao.png",
        caminho: "assets/itens/brasao.png",
        categoria: "Equipamentos"
    },
    // TOKENS
    ...Array.from({ length: 7 }, (_, i) => ({
        nome: `Token ${i + 1}`,
        arquivo: `token  (${i + 1}).png`,
        caminho: `assets/tokens/token%20%20(${i + 1}).png`,
        categoria: "Tokens"
    }))
];

// ==========================================
// RENDERIZAR GALERIA
// ==========================================

function renderGaleria(filtro = "Todos") {
    const grid = document.getElementById("gallery-grid");

    if (!grid) return;

    const imagens = filtro === "Todos"
        ? imagensGaleria
        : imagensGaleria.filter(img => img.categoria === filtro);

    grid.innerHTML = imagens.map(img => `
        <article class="gallery-card">

            <div class="gallery-card-image"
                onclick="abrirImagemGaleria('${img.caminho}', '${img.nome}')">

                <img
                    src="${img.caminho}"
                    alt="${img.nome}"
                    loading="lazy"
                    onerror="this.parentElement.innerHTML='<span>Imagem não encontrada</span>'"
                >

                <span class="gallery-zoom">⌕</span>
            </div>

            <div class="gallery-card-info">
                <div>
                    <small>${img.categoria}</small>
                    <h4>${img.nome}</h4>
                    <p>${img.arquivo}</p>
                </div>

                <a
                    href="${img.caminho}"
                    download="${img.arquivo}"
                    class="gallery-download"
                    title="Baixar imagem"
                >
                    ↓
                </a>
            </div>

        </article>
    `).join("");
}

// ==========================================
// FILTROS
// ==========================================

function filtrarGaleria(categoria, botao) {
    document.querySelectorAll(".gallery-filter").forEach(item => {
        item.classList.remove("active");
    });

    botao.classList.add("active");

    renderGaleria(categoria);
}

// ==========================================
// VISUALIZAR IMAGEM
// ==========================================

function abrirImagemGaleria(caminho, nome) {
    fecharImagemGaleria();

    const modal = document.createElement("div");

    modal.className = "gallery-modal";
    modal.id = "gallery-modal";

    modal.innerHTML = `
        <div class="gallery-modal-content">

            <button class="gallery-modal-close">×</button>

            <img src="${caminho}" alt="${nome}">

            <h3>${nome}</h3>

            <a href="${caminho}" download>
                ↓ Baixar imagem original
            </a>

        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector(".gallery-modal-close").onclick =
        fecharImagemGaleria;

    modal.addEventListener("click", evento => {
        if (evento.target === modal) {
            fecharImagemGaleria();
        }
    });

    document.addEventListener("keydown", fecharGaleriaEsc);
}

// ==========================================
// FECHAR VISUALIZAÇÃO
// ==========================================

function fecharImagemGaleria() {
    const modal = document.getElementById("gallery-modal");

    if (modal) modal.remove();

    document.removeEventListener("keydown", fecharGaleriaEsc);
}

function fecharGaleriaEsc(evento) {
    if (evento.key === "Escape") {
        fecharImagemGaleria();
    }
}

// ==========================================
// INICIALIZAÇÃO
// ==========================================

renderGaleria();