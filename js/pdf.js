
const PDFCodex = {
    cores: {
        vinho: "#8B414D",
        escuro: "#29232B",
        cinza: "#777078",
        claro: "#F5F1ED",
        linha: "#DED7D1"
    },

    nomesAtributos: {
        FOR: "Força",
        AGI: "Agilidade",
        CON: "Constituição",
        INT: "Intelecto",
        CAR: "Carisma"
    },

    titulo(texto) {
        return {
            text: texto.toUpperCase(),
            style: "secao",
            margin: [0, 15, 0, 8],
            keepWithNext: true
        };
    },

    tabela(colunas, linhas, larguras) {
        return {
            table: {
                headerRows: 1,
                dontBreakRows: true,
                widths: larguras || colunas.map(() => "*"),
                body: [
                    colunas.map(texto => ({
                        text: texto,
                        style: "cabecalho"
                    })),
                    ...linhas.map(linha =>
                        linha.map(valor => ({
                            text: String(valor ?? "—"),
                            style: "celula"
                        }))
                    )
                ]
            },
            layout: {
                hLineColor: () => this.cores.linha,
                vLineColor: () => this.cores.linha,
                fillColor: linha =>
                    linha === 0
                        ? this.cores.escuro
                        : linha % 2 === 0
                            ? "#F8F5F2"
                            : null,
                paddingLeft: () => 6,
                paddingRight: () => 6,
                paddingTop: () => 5,
                paddingBottom: () => 5
            }
        };
    },

    tabelaInformacoes(linhas) {
        return {
            table: {
                widths: ["35%", "*"],
                body: linhas.map(linha => [
                    {
                        text: linha[0],
                        style: "rotulo"
                    },
                    {
                        text: String(linha[1] ?? "—"),
                        style: "valor"
                    }
                ])
            },
            layout: {
                hLineColor: () => this.cores.linha,
                vLineColor: () => this.cores.linha,
                paddingLeft: () => 8,
                paddingRight: () => 8,
                paddingTop: () => 5,
                paddingBottom: () => 5
            }
        };
    },

    estilos() {
        return {
            marca: {
                fontSize: 11,
                bold: true,
                color: this.cores.vinho,
                characterSpacing: 4,
                alignment: "center"
            },

            capaTitulo: {
                fontSize: 34,
                bold: true,
                color: this.cores.escuro,
                alignment: "center",
                margin: [0, 20, 0, 10]
            },

            capaApelido: {
                fontSize: 13,
                color: this.cores.vinho,
                alignment: "center",
                characterSpacing: 3
            },

            capaDetalhe: {
                fontSize: 10,
                alignment: "center",
                color: this.cores.cinza,
                margin: [0, 10, 0, 0]
            },

            capaRodape: {
                fontSize: 9,
                alignment: "center",
                color: this.cores.cinza,
                characterSpacing: 2
            },

            numeroCapitulo: {
                fontSize: 9,
                bold: true,
                color: this.cores.vinho,
                characterSpacing: 3
            },

            tituloPagina: {
                fontSize: 25,
                bold: true,
                color: this.cores.escuro,
                margin: [0, 5, 0, 12]
            },

            secao: {
                fontSize: 11,
                bold: true,
                color: this.cores.vinho,
                characterSpacing: 1
            },

            rotulo: {
                fontSize: 8,
                color: this.cores.cinza
            },

            valor: {
                fontSize: 8,
                bold: true,
                color: this.cores.escuro
            },

            cabecalho: {
                fontSize: 7.5,
                bold: true,
                color: "#FFFFFF"
            },

            celula: {
                fontSize: 7.5,
                color: this.cores.escuro
            },

            habilidadeTitulo: {
                fontSize: 11,
                bold: true,
                color: this.cores.escuro
            },

            texto: {
                fontSize: 9,
                color: this.cores.escuro,
                lineHeight: 1.4
            },

            observacao: {
                fontSize: 8,
                color: this.cores.cinza,
                italics: true
            },

            loreTitulo: {
                fontSize: 15,
                bold: true,
                color: this.cores.vinho,
                margin: [0, 12, 0, 8],
                keepWithNext: true
            }
        };
    },

    criarCapa(p, completo) {
        return [
            {
                text: "CHARACTER CODEX",
                style: "marca",
                margin: [0, 85, 0, 35]
            },
            {
                text: "REGISTRO DE PERSONAGEM",
                style: "observacao",
                alignment: "center"
            },
            {
                text: (p.nome || "Personagem").toUpperCase(),
                style: "capaTitulo"
            },
            {
                text: p.apelido || "",
                style: "capaApelido"
            },
            {
                canvas: [{
                    type: "line",
                    x1: 0,
                    y1: 0,
                    x2: 220,
                    y2: 0,
                    lineWidth: 2,
                    lineColor: this.cores.vinho
                }],
                alignment: "center",
                margin: [0, 25, 0, 25]
            },
            {
                text: "GUARDIÕES DO DESTINO",
                bold: true,
                fontSize: 12,
                alignment: "center"
            },
            {
                text: `${p.raca} • ${p.classe} • Nível ${p.nivel}`,
                style: "capaDetalhe"
            },
            {
                text: completo ? "ARQUIVO COMPLETO" : "DOCUMENTO TÉCNICO",
                style: "capaRodape",
                margin: [0, 120, 0, 0]
            },
            {
                text: "CHARACTER CODEX / ARQUIVO PESSOAL",
                style: "observacao",
                alignment: "center",
                margin: [0, 10, 0, 0]
            },
            {
                text: "",
                pageBreak: "after"
            }
        ];
    },

    criarVisaoGeral(p) {
        const r = p.recursos;
        const a = p.atributos;

        return [
            { text: "01", style: "numeroCapitulo" },
            { text: "Visão geral", style: "tituloPagina" },

            this.titulo("Identificação"),

            this.tabelaInformacoes([
                ["Nome completo", p.nome],
                ["Apelido", p.apelido],
                ["Raça", p.raca],
                ["Classe", p.classe],
                ["Nível", p.nivel],
                ["Experiência", p.experiencia],
                ["Origem", p.origem],
                ["Local atual", p.local],
                ["Idade aparente", p.idade],
                ["Altura", p.altura]
            ]),

            this.titulo("Recursos atuais"),

            this.tabela(
                ["Recurso", "Atual", "Máximo"],
                [
                    ["Pontos de Vida", r.pv, r.pvMax],
                    ["Pontos de Mana", r.pm, r.pmMax],
                    ["Sanidade", r.sanidade, r.sanidadeMax],
                    ["Pontos do Destino", r.destino, "—"]
                ],
                ["*", "25%", "25%"]
            ),

            this.titulo("Resumo dos atributos"),

            this.tabela(
                ["Atributo", "Pontos", "Valor base"],
                Object.entries(a).map(([sigla, valor]) => [
                    this.nomesAtributos[sigla] || sigla,
                    valor,
                    `${valor * 4}%`
                ]),
                ["*", "25%", "30%"]
            ),

            {
                text: "Os valores refletem o estado da ficha no momento da exportação.",
                style: "observacao",
                margin: [0, 10, 0, 0]
            }
        ];
    },

    criarFichaTecnica(p) {
        const atributos = p.atributos;

        const pericias = p.pericias.map(pericia => {
            const [nome, atributo, pontos] = pericia;

            const chave = atributo === "CAR/CON"
                ? "CAR"
                : atributo;

            const chance =
                (atributos[chave] || 0) * 4 +
                pontos * 3;

            return [
                nome,
                atributo,
                pontos,
                `${chance}%`
            ];
        });

        const pontosDistribuidos = p.pericias.reduce(
            (total, pericia) => total + Number(pericia[2] || 0),
            0
        );

        const habilidades = [];

        p.habilidades.forEach(h => {
            habilidades.push(
                {
                    text: h.nome,
                    style: "habilidadeTitulo",
                    margin: [0, 10, 0, 3],
                    keepWithNext: true
                },
                {
                    text: h.descricao,
                    style: "texto"
                },
                {
                    text: h.tipo,
                    style: "observacao",
                    margin: [0, 3, 0, 5]
                }
            );
        });

        return [
            {
                text: "02",
                style: "numeroCapitulo",
                pageBreak: "before"
            },
            {
                text: "Ficha técnica",
                style: "tituloPagina"
            },

            this.titulo("Atributos"),

            this.tabela(
                ["Atributo", "Sigla", "Pontos", "Base"],
                Object.entries(atributos).map(([sigla, valor]) => [
                    this.nomesAtributos[sigla] || sigla,
                    sigla,
                    valor,
                    `${valor * 4}%`
                ]),
                ["*", "15%", "20%", "25%"]
            ),

            this.titulo("Perícias"),

            {
                text: `Pontos distribuídos: ${pontosDistribuidos} / 6`,
                style: "observacao",
                margin: [0, 0, 0, 8]
            },

            this.tabela(
                ["Perícia", "Atributo", "Pontos", "Chance"],
                pericias,
                ["*", "22%", "18%", "22%"]
            ),

            {
                text: "02 — Combate e habilidades",
                style: "numeroCapitulo",
                pageBreak: "before",
                margin: [0, 0, 0, 5]
            },

            {
                text: "Combate e habilidades",
                style: "tituloPagina"
            },

            this.titulo("Valores de combate"),

            this.tabela(
                ["Indicador", "Valor", "Observação"],
                [
                    ["Defesa passiva", "38%", "Valor de referência"],
                    ["Defesa ativa", "19%", "Antes de modificadores"],
                    [
                        "Capacidade de carga",
                        `${atributos.FOR * 5} kg`,
                        "Força × 5"
                    ]
                ],
                ["*", "20%", "*"]
            ),

            this.titulo("Habilidades especiais"),

            ...(habilidades.length
                ? habilidades
                : [{
                    text: "Nenhuma habilidade cadastrada.",
                    style: "texto"
                }])
        ];
    },

    criarInventario(p) {
        const itens = p.inventario || [];

        const pesoTotal = itens.reduce(
            (total, item) =>
                total +
                Number(item.peso || 0) *
                Number(item.quantidade || 0),
            0
        );

        const capacidade = p.atributos.FOR * 5;

        const linhas = itens.map(item => [
            item.nome,
            item.quantidade,
            `${Number(item.peso || 0).toFixed(1)} kg`,
            `${(
                Number(item.peso || 0) *
                Number(item.quantidade || 0)
            ).toFixed(1)} kg`,
            item.descricao || "—"
        ]);

        return [
            {
                text: "03",
                style: "numeroCapitulo",
                pageBreak: "before"
            },
            {
                text: "Inventário",
                style: "tituloPagina"
            },

            this.titulo("Capacidade de carga"),

            this.tabela(
                ["Capacidade", "Peso carregado", "Disponível"],
                [[
                    `${capacidade} kg`,
                    `${pesoTotal.toFixed(1)} kg`,
                    `${(capacidade - pesoTotal).toFixed(1)} kg`
                ]],
                ["*", "*", "*"]
            ),

            this.titulo("Equipamentos e objetos"),

            ...(itens.length
                ? [
                    this.tabela(
                        ["Item", "Qtd.", "Peso/un.", "Peso total", "Descrição"],
                        linhas,
                        ["*", "9%", "15%", "17%", "*"]
                    )
                ]
                : [{
                    text: "Nenhum item cadastrado.",
                    style: "texto"
                }]),

            {
                text: "Os pesos e quantidades refletem os dados cadastrados na ficha.",
                style: "observacao",
                margin: [0, 12, 0, 0]
            }
        ];
    },

    criarLore(lore) {
        const conteudo = [
            {
                text: "04",
                style: "numeroCapitulo",
                pageBreak: "before"
            },
            {
                text: lore.titulo || "História do personagem",
                style: "tituloPagina"
            }
        ];

        if (lore.subtitulo) {
            conteudo.push({
                text: lore.subtitulo,
                style: "observacao",
                margin: [0, 0, 0, 15]
            });
        }

        (lore.capitulos || []).forEach(capitulo => {
            conteudo.push({
                text: capitulo.titulo,
                style: "loreTitulo"
            });

            (capitulo.conteudo || []).forEach(paragrafo => {
                conteudo.push({
                    text: paragrafo,
                    style: "texto",
                    margin: [0, 0, 0, 9]
                });
            });
        });

        return conteudo;
    },

    criarCuriosidades(dados) {
        const conteudo = [
            {
                text: "05",
                style: "numeroCapitulo",
                pageBreak: "before"
            },
            {
                text: dados.titulo || "Curiosidades",
                style: "tituloPagina"
            }
        ];

        (dados.curiosidades || []).forEach(item => {
            conteudo.push(
                {
                    text: item.titulo,
                    style: "habilidadeTitulo",
                    margin: [0, 12, 0, 4],
                    keepWithNext: true
                },
                {
                    text: item.categoria || "",
                    style: "observacao",
                    margin: [0, 0, 0, 5]
                },
                {
                    text: item.descricao,
                    style: "texto",
                    margin: [0, 0, 0, 8]
                }
            );
        });

        return conteudo;
    },

    criarDiario(p) {
        if (!p.diario || !p.diario.trim()) {
            return [];
        }

        return [
            {
                text: "06",
                style: "numeroCapitulo",
                pageBreak: "before"
            },
            {
                text: "Diário pessoal",
                style: "tituloPagina"
            },
            {
                text: p.diario,
                style: "texto",
                margin: [0, 10, 0, 0]
            }
        ];
    },

    async carregarImagem(caminho) {
        try {
            const resposta = await fetch(caminho);

            if (!resposta.ok) return null;

            const blob = await resposta.blob();

            return await new Promise(resolve => {
                const leitor = new FileReader();

                leitor.onload = () => resolve(leitor.result);
                leitor.onerror = () => resolve(null);

                leitor.readAsDataURL(blob);
            });
        } catch (erro) {
            console.warn("Imagem não encontrada:", caminho);
            return null;
        }
    },

    async criarGaleria() {
        const imagens = [];

        const retrato = await this.carregarImagem(
            "assets/personagens/facial.png"
        );

        if (retrato) {
            imagens.push({
                image: retrato,
                fit: [230, 230],
                alignment: "center",
                margin: [0, 10, 0, 15]
            });
        }

        for (let i = 1; i <= 7; i++) {
            const caminho = `assets/tokens/token  (${i}).png`;
            const imagem = await this.carregarImagem(caminho);

            if (imagem) {
                imagens.push({
                    stack: [
                        {
                            image: imagem,
                            fit: [180, 180],
                            alignment: "center"
                        },
                        {
                            text: `Token ${i}`,
                            style: "observacao",
                            alignment: "center",
                            margin: [0, 5, 0, 12]
                        }
                    ],
                    width: "50%"
                });
            }
        }

        if (!imagens.length) return [];

        return [
            {
                text: "07",
                style: "numeroCapitulo",
                pageBreak: "before"
            },
            {
                text: "Galeria de tokens",
                style: "tituloPagina"
            },
            ...imagens
        ];
    },

    montarDocumento(p, completo, lore, curiosidades, galeria) {
        const conteudo = [
            ...this.criarCapa(p, completo),
            ...this.criarVisaoGeral(p),
            ...this.criarFichaTecnica(p),
            ...this.criarInventario(p)
        ];

        if (completo) {
            conteudo.push(
                ...this.criarLore(lore),
                ...this.criarCuriosidades(curiosidades),
                ...this.criarDiario(p),
                ...galeria
            );
        }

        return {
            pageSize: "A4",
            pageMargins: [45, 48, 45, 48],

            content: conteudo,

            styles: this.estilos(),

            defaultStyle: {
                font: "Roboto",
                fontSize: 9,
                color: this.cores.escuro,
                lineHeight: 1.3
            },

            footer: (pagina, total) => ({
                margin: [45, 15, 45, 0],
                columns: [
                    {
                        text: "CHARACTER CODEX",
                        alignment: "left",
                        fontSize: 8,
                        color: "#999999"
                    },
                    {
                        text: `${pagina} / ${total}`,
                        alignment: "right",
                        fontSize: 8,
                        color: "#999999"
                    }
                ]
            })
        };
    },

    async exportar(tipo) {
        if (typeof pdfMake === "undefined") {
            alert("A biblioteca pdfmake não foi carregada.");
            return;
        }

        if (typeof personagem === "undefined") {
            alert("Os dados do personagem não foram encontrados.");
            return;
        }

        const p = personagem;
        const completo = tipo === "completa";

        try {
            let lore = {};
            let curiosidades = {};
            let galeria = [];

            if (completo) {
                const [respostaLore, respostaCuriosidades] =
                    await Promise.all([
                        fetch("data/lore.json"),
                        fetch("data/curiosidades.json")
                    ]);

                if (!respostaLore.ok || !respostaCuriosidades.ok) {
                    throw new Error(
                        "Não foi possível carregar lore.json ou curiosidades.json."
                    );
                }

                [lore, curiosidades] = await Promise.all([
                    respostaLore.json(),
                    respostaCuriosidades.json()
                ]);

                galeria = await this.criarGaleria();
            }

            const documento = this.montarDocumento(
                p,
                completo,
                lore,
                curiosidades,
                galeria
            );

            const nome = (p.nome || "personagem")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-zA-Z0-9]+/g, "-")
                .replace(/^-|-$/g, "");

            const sufixo = completo
                ? "Completo"
                : "Ficha-Tecnica";

            pdfMake.createPdf(documento).download(
                `${nome}-${sufixo}.pdf`
            );

        } catch (erro) {
            console.error("Erro ao exportar PDF:", erro);
            alert(
                "Não foi possível gerar o PDF. Confira os arquivos JSON e o Live Server."
            );
        }
    },

    abrirSeletor() {
        if (document.getElementById("pdf-export-modal")) return;

        const modal = document.createElement("div");
        modal.id = "pdf-export-modal";

        modal.style.cssText = `
            position: fixed;
            inset: 0;
            z-index: 99999;
            background: rgba(15, 12, 16, 0.78);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        `;

        modal.innerHTML = `
            <div style="
                width: 100%;
                max-width: 430px;
                background: #29232B;
                border: 1px solid #51434B;
                border-radius: 14px;
                padding: 28px;
                color: #F5F1ED;
                font-family: Inter, sans-serif;
                box-shadow: 0 20px 60px rgba(0,0,0,.4);
            ">
                <div style="
                    color: #C18A91;
                    font-size: 11px;
                    letter-spacing: 3px;
                    margin-bottom: 8px;
                ">CHARACTER CODEX</div>

                <h2 style="
                    font-family: Cinzel, serif;
                    font-size: 23px;
                    margin: 0 0 8px;
                ">Exportar personagem</h2>

                <p style="
                    color: #B9AFB5;
                    font-size: 13px;
                    line-height: 1.6;
                    margin-bottom: 22px;
                ">
                    Escolha o tipo de documento que deseja gerar.
                </p>

                <button id="pdf-technical" style="
                    display: block;
                    width: 100%;
                    padding: 15px;
                    margin-bottom: 12px;
                    border: 1px solid #8B414D;
                    border-radius: 8px;
                    background: #8B414D;
                    color: white;
                    text-align: left;
                    cursor: pointer;
                ">
                    <strong style="display:block; font-size:14px;">
                        Ficha técnica
                    </strong>
                    <small style="display:block; margin-top:5px; opacity:.85;">
                        Atributos, perícias, combate, habilidades e inventário.
                    </small>
                </button>

                <button id="pdf-complete" style="
                    display: block;
                    width: 100%;
                    padding: 15px;
                    margin-bottom: 18px;
                    border: 1px solid #695A64;
                    border-radius: 8px;
                    background: #3A323D;
                    color: white;
                    text-align: left;
                    cursor: pointer;
                ">
                    <strong style="display:block; font-size:14px;">
                        Arquivo completo
                    </strong>
                    <small style="display:block; margin-top:5px; opacity:.85;">
                        Tudo da ficha técnica, história, curiosidades, diário e galeria.
                    </small>
                </button>

                <button id="pdf-cancel" style="
                    width: 100%;
                    padding: 10px;
                    border: 0;
                    background: transparent;
                    color: #B9AFB5;
                    cursor: pointer;
                ">Cancelar</button>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector("#pdf-technical").onclick = () => {
            modal.remove();
            this.exportar("tecnica");
        };

        modal.querySelector("#pdf-complete").onclick = () => {
            modal.remove();
            this.exportar("completa");
        };

        modal.querySelector("#pdf-cancel").onclick = () => {
            modal.remove();
        };

        modal.addEventListener("click", e => {
            if (e.target === modal) modal.remove();
        });
    }
};


// Conectar ao botão existente e remover o antigo window.print()

document.addEventListener("DOMContentLoaded", () => {
    const botaoAntigo = document.getElementById("print-sheet");

    if (!botaoAntigo) {
        console.warn("Botão de exportação não encontrado.");
        return;
    }

    const botao = botaoAntigo.cloneNode(true);

    botaoAntigo.replaceWith(botao);

    botao.addEventListener("click", () => {
        PDFCodex.abrirSeletor();
    });
});
