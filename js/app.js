
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
    if ($("hero-level")) {
        $("hero-level").textContent = personagem.nivel;
    }

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

    if ($("dash-fate")) {
        $("dash-fate").textContent = personagem.recursos.destino;
    }

    if ($("dashboard-attributes")) {
        $("dashboard-attributes").innerHTML =
            Object.entries(personagem.atributos).map(([k, v]) => `
                <div class="attribute">
                    <b>${v * 4}%</b>
                    <span>${nomesAtributos[k]}</span>
                    <small>${v} ponto(s)</small>
                </div>
            `).join("");
    }
}


// ==========================================
// FICHA TÉCNICA
// ==========================================

function renderFicha() {

    // ATRIBUTOS

    if ($("attribute-editor")) {
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
    }


    // RECURSOS

    if ($("resource-editor")) {
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
    }


    // PERÍCIAS

    if ($("skills-table")) {
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
    }

    const usados = personagem.pericias.reduce(
        (s, p) => s + p[2],
        0
    );

    if ($("skill-points-label")) {
        $("skill-points-label").textContent =
            `${usados} / 6 pontos distribuídos`;
    }


    // COMBATE E TALENTOS

    const a = personagem.atributos;

    if ($("combat-values")) {
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
            ],
            [
                "Astúcia — Talento inicial",
                "+10%",
                "Bônus em Enganação, Manipulação e truques sociais."
            ]
        ].map(x => `
            <div class="combat-card">
                <small>${x[0]}</small>
                <strong>${x[1]}</strong>
                <small>${x[2]}</small>
            </div>
        `).join("");
    }


    // HABILIDADES

    if ($("abilities-list")) {
        $("abilities-list").innerHTML =
            (personagem.habilidades || []).map(h => `
                <div class="panel">
                    <span class="eyebrow">${h.tipo}</span>
                    <h3>${h.nome}</h3>
                    <p>${h.descricao}</p>
                </div>
            `).join("");
    }


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

    if (!$("inventory-list")) return;

    const capacidade = personagem.atributos.FOR * 5;

    const peso = personagem.inventario.reduce(
        (s, i) => s + i.peso * i.quantidade,
        0
    );

    if ($("capacity")) {
        $("capacity").textContent = capacidade + " kg";
    }

    if ($("carried")) {
        $("carried").textContent = peso.toFixed(1) + " kg";
    }

    if ($("remaining")) {
        $("remaining").textContent =
            (capacidade - peso).toFixed(1) + " kg";
    }


    $("inventory-list").innerHTML =
        personagem.inventario.map((i, n) => `
            <div class="item-row item-row-clicavel" data-card="${n}">

                <div class="item-row-info">
                    <b>${i.nome} ×${i.quantidade}</b>

                    <small>
                        ${i.descricao} · ${i.peso} kg/un.
                    </small>
                </div>

                <span class="item-card-hint">
                    ⓘ Ver detalhes
                </span>

                <button data-remove="${n}">
                    Remover
                </button>

            </div>
        `).join("");


    // REMOVER ITEM

    document.querySelectorAll("[data-remove]").forEach(b => {
        b.onclick = e => {
            e.stopPropagation();

            personagem.inventario.splice(
                Number(b.dataset.remove),
                1
            );

            salvar();
        };
    });
}


// ==========================================
// LORE E CURIOSIDADES — JSON
// ==========================================

async function carregarArquivoPessoal() {

    try {

        const respostaLore = await fetch("data/lore.json");

        const respostaCuriosidades =
            await fetch("data/curiosidades.json");


        if (!respostaLore.ok || !respostaCuriosidades.ok) {
            throw new Error("Não foi possível carregar os arquivos JSON.");
        }


        const lore = await respostaLore.json();

        const curiosidades = await respostaCuriosidades.json();


        // TÍTULO DA LORE

        if ($("lore-title")) {
            $("lore-title").textContent = lore.titulo;
        }

        if ($("lore-subtitle")) {
            $("lore-subtitle").textContent = lore.subtitulo;
        }


        // CAPÍTULOS DA HISTÓRIA

        if ($("lore-container")) {
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
        }


        // CURIOSIDADES

        if ($("curiosities-title")) {
            $("curiosities-title").textContent =
                curiosidades.titulo;
        }

        if ($("curiosities-container")) {
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
        }


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
        galeria: "Galeria de imagens",
        cronologia: "Memórias & Cronologia"
    };

    if ($("page-title")) {
        $("page-title").textContent =
            titulos[nome] || "Character Codex";
    }


    // CARREGAR FICHA

    if (nome === "ficha") {
        renderFicha();
    }


    // CARREGAR INVENTÁRIO

    if (nome === "inventario") {
        atualizarInventario();
    }


    // CARREGAR GALERIA

    if (nome === "galeria") {
        if (typeof renderGaleria === "function") {
            renderGaleria();
        }
    }


    // CARREGAR CRONOLOGIA

    if (nome === "cronologia") {
        if (typeof carregarCronologia === "function") {
            carregarCronologia();
        }
    }
}


// ==========================================
// EVENTOS DE NAVEGAÇÃO
// ==========================================

document.querySelectorAll(".nav-link").forEach(b => {
    b.onclick = () => irPagina(b.dataset.page);
});

document.querySelectorAll("[data-goto]").forEach(b => {
    b.onclick = () => irPagina(b.dataset.goto);
});


// ==========================================
// EXPORTAR BACKUP JSON
// ==========================================

if ($("export-json")) {
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
}


// ==========================================
// IMPORTAR BACKUP JSON
// ==========================================

if ($("import-json")) {
    $("import-json").onchange = async e => {

        const f = e.target.files[0];

        if (!f) return;

        try {

            const dadosImportados = JSON.parse(await f.text());

            if (
                !dadosImportados.atributos ||
                !dadosImportados.recursos ||
                !Array.isArray(dadosImportados.pericias) ||
                !Array.isArray(dadosImportados.inventario)
            ) {
                throw new Error("Estrutura de personagem inválida.");
            }

            personagem = dadosImportados;

            salvar();

            renderFicha();

            aviso("Backup importado.");

        } catch (err) {

            console.error(err);

            aviso("Arquivo JSON inválido.");

        }

        e.target.value = "";
    };
}


// ==========================================
// ADICIONAR ITEM AO INVENTÁRIO
// ==========================================

if ($("add-item")) {
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
}


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
// BOTÃO DE EXPORTAR PDF
// ==========================================

const botaoPDF = document.getElementById("print-sheet");

if (botaoPDF) {
    botaoPDF.addEventListener("click", function () {
        PDFCodex.abrirSeletor();
    });
}

// ==========================================
// INICIALIZAÇÃO
// ==========================================

atualizarDashboard();

atualizarInventario();

carregarArquivoPessoal();
