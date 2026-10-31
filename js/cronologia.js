// ========================================
// MEMÓRIAS & CRONOLOGIA
// ========================================

let dadosCronologia = null;

async function carregarCronologia() {
    const container = document.getElementById("timeline-container");

    if (!container) return;

    container.innerHTML = `
        <div class="timeline-loading">
            Carregando registros históricos...
        </div>
    `;

    try {
        const resposta = await fetch("data/cronologia.json");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar a cronologia.");
        }

        dadosCronologia = await resposta.json();

        renderCronologia();
    } catch (erro) {
        console.error(erro);

        container.innerHTML = `
            <div class="timeline-error">
                Não foi possível carregar a cronologia.
                Verifique se o arquivo data/cronologia.json existe.
            </div>
        `;
    }
}

function renderCronologia() {
    const container = document.getElementById("timeline-container");

    if (!container || !dadosCronologia) return;

    let html = `
        <div class="timeline-intro">
            <span class="eyebrow">REGISTROS DE UMA VIDA</span>
            <h3>${dadosCronologia.personagem}</h3>
            <p>
                Uma jornada que atravessa mais de um século,
                entre conspirações, um longo silêncio e um novo começo.
            </p>
        </div>

        <div class="timeline-stats">
            <div class="timeline-stat">
                <span>Idade cronológica</span>
                <strong>128</strong>
            </div>

            <div class="timeline-stat">
                <span>Aparência física</span>
                <strong>18</strong>
            </div>

            <div class="timeline-stat">
                <span>Tempo selado</span>
                <strong>100</strong>
            </div>

            <div class="timeline-stat">
                <span>Tempo vivido</span>
                <strong>28</strong>
            </div>
        </div>
    `;

    dadosCronologia.capitulos.forEach(capitulo => {
        html += `
            <section class="timeline-chapter">

                <div class="timeline-chapter-heading">
                    <span>${capitulo.periodo}</span>
                    <h3>${capitulo.titulo}</h3>
                    <p>${capitulo.descricao}</p>
                </div>

                <div class="timeline-list">
        `;

        capitulo.eventos.forEach((evento, indice) => {
            html += `
                <button
                    class="timeline-event ${evento.tipo || ""}"
                    onclick="abrirEventoCronologia('${capitulo.id}', ${indice})"
                    type="button"
                >
                    <div class="timeline-event-date">
                        <strong>${evento.ano}</strong>
                        <small>${evento.idade}</small>
                    </div>

                    <div class="timeline-event-content">
                        <h4>${evento.titulo}</h4>
                        <p>${evento.descricao}</p>

                        ${
                            evento.tipo === "importante"
                                ? `<span class="timeline-event-label">Acontecimento importante</span>`
                                : ""
                        }
                    </div>

                    <span class="timeline-event-action">↗</span>
                </button>
            `;
        });

        html += `
                </div>
            </section>
        `;
    });

    container.innerHTML = html;
}

function abrirEventoCronologia(idCapitulo, indice) {
    const capitulo = dadosCronologia.capitulos.find(
        item => item.id === idCapitulo
    );

    if (!capitulo) return;

    const evento = capitulo.eventos[indice];

    if (!evento) return;

    const modal = document.getElementById("timeline-modal");
    const imagem = document.getElementById("timeline-modal-image");

    document.getElementById("timeline-modal-year").textContent =
        `${evento.ano} · ${evento.idade}`;

    document.getElementById("timeline-modal-title").textContent =
        evento.titulo;

    document.getElementById("timeline-modal-description").textContent =
        evento.descricao;

    document.getElementById("timeline-modal-location").textContent =
        evento.local || "Local não registrado";

    document.getElementById("timeline-modal-chapter").textContent =
        capitulo.titulo;

    if (evento.imagem) {
        imagem.src = evento.imagem;
        imagem.alt = evento.titulo;
        imagem.classList.add("visivel");
    } else {
        imagem.removeAttribute("src");
        imagem.classList.remove("visivel");
    }

    modal.classList.add("aberto");
    modal.setAttribute("aria-hidden", "false");
}

function fecharEventoCronologia() {
    const modal = document.getElementById("timeline-modal");

    if (!modal) return;

    modal.classList.remove("aberto");
    modal.setAttribute("aria-hidden", "true");
}

document.addEventListener("keydown", function(evento) {
    if (evento.key === "Escape") {
        fecharEventoCronologia();
    }
});

document.addEventListener("click", function(evento) {
    if (evento.target.id === "timeline-modal") {
        fecharEventoCronologia();
    }
});