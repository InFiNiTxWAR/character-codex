
// ==========================================
// CHARACTER CODEX — VAERIK VHARZETH
// ==========================================

// DADOS PRINCIPAIS
let personagem = carregar();

const nomesAtributos = {
    FOR: "Força",
    AGI: "Agilidade",
    CON: "Constituição",
    INT: "Intelecto",
    CAR: "Carisma"
};

const $ = id => document.getElementById(id);


// ==========================================
// SALVAMENTO
// ==========================================

function carregar() {
    try {
        return JSON.parse(localStorage.getItem("characterCodexVaerik"))
            || structuredClone(DADOS_INICIAIS);
    } catch (e) {
        return structuredClone(DADOS_INICIAIS);
    }
}

function salvar() {
    localStorage.setItem(
        "characterCodexVaerik",
        JSON.stringify(personagem)
    );

    atualizarDashboard();
    atualizarInventario();
}

function aviso(msg) {
    const t = $("toast");

    if (!t) return;

    t.textContent = msg;
    t.classList.add("show");

    setTimeout(() => {
        t.classList.remove("show");
    }, 2200);
}


// ==========================================
// CÁLCULO DE PERÍCIAS
// ==========================================

function chance(pericia) {
    const [nome, atributo, pontos] = pericia;

    const chave = atributo === "CAR/CON"
        ? "CAR"
        : atributo;

    return (personagem.atributos[chave] || 0) * 4 + pontos * 3;
}


// ==========================================
// DASHBOARD
// ==========================================

function atualizarDashboard() {
    $("hero-level").textContent = personagem.nivel;

    [
        ["pv", "pv"],
        ["pm", "pm"],
        ["sanidade", "san"]
    ].forEach(([key, id]) => {
        const r = personagem.recursos;

        const atual = r[key];
        const max = r[key + "Max"];

        const el = $("dash-" + id);

        if (el) el.textContent = atual;

        const caption = $(`${id}-caption`);
        const meter = $(`${id}-meter`);

        if (caption) {
            caption.textContent = `${atual} / ${max}`;
        }

        if (meter) {
            const porcentagem = max > 0
                ? Math.max(0, Math.min(100, atual / max * 100))
                : 0;

            meter.style.width = porcentagem + "%";
        }
    });

    $("dash-fate").textContent = personagem.recursos.destino;

    $("dashboard-attributes").innerHTML =
        Object.entries(personagem.atributos).map(([k, v]) => `
            <div class="attribute">
                <b>${v * 4}%</b>
                <span>${nomesAtributos[k]}</span>
                <small>${v} ponto(s)</small>
            </div>
        `).join("");
}


// ==========================================
// FICHA TÉCNICA
// ==========================================

function renderFicha() {

    // ATRIBUTOS

    $("attribute-editor").innerHTML =
        Object.entries(personagem.atributos).map(([k, v]) => `
            <div class="attr-input">
                <label>${nomesAtributos[k]}</label>

                <input
                    type="number"
                    min="0"
                    max="10"
                    data-attr="${k}"
                    value="${v}"
                >

                <strong>${v * 4}% base</strong>
            </div>
        `).join("");


    // RECURSOS

    $("resource-editor").innerHTML = [
        ["pv", "PV"],
        ["pvMax", "PV máximo"],
        ["pm", "PM"],
        ["pmMax", "PM máximo"],
        ["sanidade", "Sanidade"],
        ["sanidadeMax", "Sanidade máxima"],
        ["destino", "Pontos de destino"]
    ].map(([k, n]) => `
        <div class="resource-input">
            <label>${n}</label>

            <input
                type="number"
                min="0"
                data-resource="${k}"
                value="${personagem.recursos[k]}"
            >
        </div>
    `).join("");


    // PERÍCIAS

    $("skills-table").innerHTML =
        personagem.pericias.map((p, i) => `
            <tr>
                <td>${p[0]}</td>
                <td>${p[1]}</td>

                <td>
                    <input
                        type="number"
                        min="0"
                        max="6"
                        value="${p[2]}"
                        data-skill="${i}"
                    >
                </td>

                <td>${chance(p)}%</td>
            </tr>
        `).join("");

    const usados = personagem.pericias.reduce(
        (s, p) => s + p[2],
        0
    );

    $("skill-points-label").textContent =
        `${usados} / 6 pontos distribuídos`;


    // COMBATE

    const a = personagem.atributos;

    $("combat-values").innerHTML = [
        [
            "Defesa passiva",
            "38%",
            "Valor de referência; revisar bônus de equipamento."
        ],
        [
            "Defesa ativa",
            "19%",
            "Antes de modificadores situacionais."
        ],
        [
            "Capacidade de carga",
            `${a.FOR * 5} kg`,
            "Força × 5."
        ]
    ].map(x => `
        <div class="combat-card">
            <small>${x[0]}</small>
            <strong>${x[1]}</strong>
            <small>${x[2]}</small>
        </div>
    `).join("");


    // HABILIDADES

    $("abilities-list").innerHTML =
        personagem.habilidades.map(h => `
            <div class="panel">
                <span class="eyebrow">${h.tipo}</span>
                <h3>${h.nome}</h3>
                <p>${h.descricao}</p>
            </div>
        `).join("");


    // EVENTOS DOS ATRIBUTOS

    document.querySelectorAll("[data-attr]").forEach(el => {
        el.addEventListener("change", () => {
            personagem.atributos[el.dataset.attr] =
                Number(el.value) || 0;

            salvar();
            renderFicha();
        });
    });


    // EVENTOS DOS RECURSOS

    document.querySelectorAll("[data-resource]").forEach(el => {
        el.addEventListener("change", () => {
            personagem.recursos[el.dataset.resource] =
                Number(el.value) || 0;

            salvar();
        });
    });


    // EVENTOS DAS PERÍCIAS

    document.querySelectorAll("[data-skill]").forEach(el => {
        el.addEventListener("change", () => {
            personagem.pericias[Number(el.dataset.skill)][2] =
                Number(el.value) || 0;

            salvar();
            renderFicha();
        });
    });
}


// ==========================================
// INVENTÁRIO
// ==========================================

function atualizarInventario() {

    const capacidade = personagem.atributos.FOR * 5;

    const peso = personagem.inventario.reduce(
        (s, i) => s + i.peso * i.quantidade,
        0
    );

    $("capacity").textContent = capacidade + " kg";
    $("carried").textContent = peso.toFixed(1) + " kg";

    $("remaining").textContent =
        (capacidade - peso).toFixed(1) + " kg";


    $("inventory-list").innerHTML =
        personagem.inventario.map((i, n) => `
<div class="item-row" data-card="${n}" style="cursor:pointer;">                <div>
                    <b>${i.nome} ×${i.quantidade}</b>

                    <small>
                        ${i.descricao} · ${i.peso} kg/un.
                    </small>
                </div>

                <button data-remove="${n}">
                    Remover
                </button>
            </div>
        `).join("");


    document.querySelectorAll("[data-remove]").forEach(b => {
        b.onclick = () => {
            personagem.inventario.splice(
                Number(b.dataset.remove),
                1
            );

            salvar();
        };
    });
}


// ==========================================
// GALERIA DE TOKENS
// ==========================================

function renderTokens() {

    const grid = $("token-grid");

    if (!grid) return;

    grid.innerHTML = Array.from({ length: 7 }, (_, i) => {

        // Dois espaços entre token e parênteses
        const nome = `token  (${i + 1}).png`;

        const caminho = `assets/tokens/${nome}`;

        return `
            <div class="token-slot">

                <img
                    src="${caminho}"
                    alt="Token ${i + 1} de Vaerik"
                    data-token="${caminho}"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='block'"
                >

                <span style="display:none">
                    ${nome}<br>
                    <small>Imagem não encontrada</small>
                </span>

            </div>
        `;

    }).join("");


    // CRIAR MODAL

    let modal = document.querySelector(".token-modal");

    if (!modal) {

        modal = document.createElement("div");

        modal.className = "token-modal";

        modal.innerHTML = `
            <button class="token-modal-close" aria-label="Fechar">
                ×
            </button>

            <div class="token-modal-content">

                <img
                    id="token-modal-image"
                    src=""
                    alt="Token ampliado"
                >

                <div class="token-modal-actions">

                    <a id="token-download" href="" download>
                        ↓ Baixar imagem
                    </a>

                    <button id="token-close">
                        Fechar
                    </button>

                </div>

            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector(".token-modal-close").onclick =
            fecharToken;

        modal.querySelector("#token-close").onclick =
            fecharToken;

        modal.addEventListener("click", e => {
            if (e.target === modal) {
                fecharToken();
            }
        });
    }


    // ABRIR TOKEN AMPLIADO

    grid.querySelectorAll("[data-token]").forEach(img => {

        img.addEventListener("click", () => {

            const caminho = img.dataset.token;

            $("token-modal-image").src = caminho;

            $("token-download").href = caminho;

            $("token-download").download =
                caminho.split("/").pop();

            modal.classList.add("open");
        });

    });


    function fecharToken() {

        modal.classList.remove("open");

        $("token-modal-image").src = "";
    }


    // FECHAR COM ESC

    document.addEventListener("keydown", e => {

        if (e.key === "Escape") {
            fecharToken();
        }

    });
}


// ==========================================
// LORE E CURIOSIDADES — JSON
// ==========================================

async function carregarArquivoPessoal() {

    try {

        // BUSCAR OS ARQUIVOS JSON

        const respostaLore = await fetch("data/lore.json");

        const respostaCuriosidades =
            await fetch("data/curiosidades.json");


        if (!respostaLore.ok || !respostaCuriosidades.ok) {
            throw new Error("Não foi possível carregar os arquivos JSON.");
        }


        const lore = await respostaLore.json();

        const curiosidades = await respostaCuriosidades.json();


        // TÍTULO DA LORE

        $("lore-title").textContent = lore.titulo;

        $("lore-subtitle").textContent = lore.subtitulo;


        // CAPÍTULOS DA HISTÓRIA

        $("lore-container").innerHTML =
            lore.capitulos.map(capitulo => `
                <article class="panel lore-chapter">

                    <span class="eyebrow">
                        REGISTRO HISTÓRICO
                    </span>

                    <h3>${capitulo.titulo}</h3>

                    ${capitulo.conteudo.map(paragrafo => `
                        <p>${paragrafo}</p>
                    `).join("")}

                </article>
            `).join("");


        // CURIOSIDADES

        $("curiosities-title").textContent =
            curiosidades.titulo;


        $("curiosities-container").innerHTML =
            curiosidades.curiosidades.map(item => `
                <article class="panel curiosity-card">

                    <span class="eyebrow">
                        ${item.categoria}
                    </span>

                    <h3>${item.titulo}</h3>

                    <p>${item.descricao}</p>

                </article>
            `).join("");


    } catch (erro) {

        console.error("Erro ao carregar arquivo pessoal:", erro);

        if ($("lore-container")) {
            $("lore-container").innerHTML =
                "<p>Não foi possível carregar a história. Confira os arquivos JSON e o Live Server.</p>";
        }

        if ($("curiosities-container")) {
            $("curiosities-container").innerHTML =
                "<p>Não foi possível carregar as curiosidades.</p>";
        }
    }
}


// ==========================================
// NAVEGAÇÃO
// ==========================================

function irPagina(nome) {

    document.querySelectorAll(".page").forEach(p => {
        p.classList.toggle(
            "active",
            p.id === "page-" + nome
        );
    });

    document.querySelectorAll(".nav-link").forEach(b => {
        b.classList.toggle(
            "active",
            b.dataset.page === nome
        );
    });


    const titulos = {
        dashboard: "Visão geral",
        ficha: "Ficha técnica",
        inventario: "Inventário",
        arquivo: "Arquivo pessoal",
        curiosidades: "Curiosidades",
        galeria: "Galeria de tokens"
    };

    $("page-title").textContent =
        titulos[nome] || "Character Codex";


    if (nome === "ficha") {
        renderFicha();
    }

    if (nome === "inventario") {
        atualizarInventario();
    }
}


document.querySelectorAll(".nav-link").forEach(b => {
    b.onclick = () => irPagina(b.dataset.page);
});

document.querySelectorAll("[data-goto]").forEach(b => {
    b.onclick = () => irPagina(b.dataset.goto);
});


// ==========================================
// EXPORTAÇÃO DO INVENTÁRIO PARA PDF
// ==========================================

function montarInventarioPDF() {

    const container = $("print-inventory-content");

    if (!container) {
        console.warn(
            "Elemento print-inventory-content não encontrado no HTML."
        );
        return;
    }

    const rows = personagem.inventario.map(i => `
        <tr>
            <td>${i.nome}</td>
            <td>${i.quantidade}</td>
            <td>${Number(i.peso).toFixed(1)} kg</td>
            <td>${i.descricao}</td>
        </tr>
    `).join("");


    const peso = personagem.inventario.reduce(
        (s, i) => s + i.peso * i.quantidade,
        0
    );


    container.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Qtd.</th>
                    <th>Peso/un.</th>
                    <th>Descrição</th>
                </tr>
            </thead>

            <tbody>
                ${rows}
            </tbody>
        </table>

        <p>
            <strong>Capacidade:</strong>
            ${personagem.atributos.FOR * 5} kg

            ·

            <strong>Peso cadastrado:</strong>
            ${peso.toFixed(1)} kg
        </p>
    `;
}


// ==========================================
// BOTÃO DE PDF
// ==========================================

$("print-sheet").onclick = () => {

    renderFicha();

    montarInventarioPDF();

    document.body.classList.add("printing-codex");

    window.print();
};


window.addEventListener("afterprint", () => {
    document.body.classList.remove("printing-codex");
});


// ==========================================
// EXPORTAR BACKUP JSON
// ==========================================

$("export-json").onclick = () => {

    const blob = new Blob(
        [JSON.stringify(personagem, null, 2)],
        { type: "application/json" }
    );

    const a = document.createElement("a");

    a.href = URL.createObjectURL(blob);

    a.download = "vaerik-vharzeth-backup.json";

    a.click();

    URL.revokeObjectURL(a.href);
};


// ==========================================
// IMPORTAR BACKUP JSON
// ==========================================

$("import-json").onchange = async e => {

    const f = e.target.files[0];

    if (!f) return;

    try {

        personagem = JSON.parse(await f.text());

        salvar();

        renderFicha();

        renderTokens();

        aviso("Backup importado.");

    } catch (err) {

        aviso("Arquivo JSON inválido.");

    }

    e.target.value = "";
};


// ==========================================
// ADICIONAR ITEM AO INVENTÁRIO
// ==========================================

$("add-item").onclick = () => {

    const nome = prompt("Nome do item:");

    if (!nome) return;

    const quantidade =
        Number(prompt("Quantidade:", "1")) || 1;

    const peso =
        Number(prompt("Peso por unidade em kg:", "0")) || 0;

    const descricao =
        prompt("Descrição:") || "Item";


    personagem.inventario.push({
        nome,
        quantidade,
        peso,
        descricao
    });

    salvar();

    aviso("Item adicionado.");
};


// ==========================================
// DIÁRIO
// ==========================================

if ($("journal")) {

    $("journal").value = personagem.diario || "";

    $("journal").addEventListener("input", e => {

        personagem.diario = e.target.value;

        salvar();

    });
}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

atualizarDashboard();

atualizarInventario();

renderTokens();

carregarArquivoPessoal();
