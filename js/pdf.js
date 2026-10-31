
// ==========================================
// CHARACTER CODEX — SISTEMA DE EXPORTAÇÃO PDF
// Personagem: Vaerik Vharzeth
// ==========================================

const PDFCodex = {

    nomeArquivo: "Vaerik_Vharzeth",

    cores: {
        fundo: "#171717",
        dourado: "#A4865D",
        texto: "#333333",
        cinza: "#777777",
        claro: "#EEEEEE"
    },


    // ==========================================
    // FORMATAÇÃO
    // ==========================================

    texto(valor, padrao = "Não informado") {

        if (valor === undefined || valor === null || valor === "") {
            return padrao;
        }

        return String(valor);
    },


    titulo(texto) {

        return {
            text: texto.toUpperCase(),
            fontSize: 14,
            bold: true,
            color: this.cores.dourado,
            margin: [0, 20, 0, 10]
        };
    },


    linha() {

        return {
            canvas: [{
                type: "line",
                x1: 0,
                y1: 0,
                x2: 515,
                y2: 0,
                lineWidth: 1,
                lineColor: "#D0C4B0"
            }],
            margin: [0, 5, 0, 10]
        };
    },


    // ==========================================
    // CAPA
    // ==========================================

    criarCapa(p) {

        return [

            { text: "\n\n\n\n\n" },

            {
                text: "CHARACTER CODEX",
                alignment: "center",
                fontSize: 16,
                bold: true,
                color: this.cores.dourado,
                characterSpacing: 4
            },

            { text: "\n" },

            {
                text: this.texto(p.nome),
                alignment: "center",
                fontSize: 30,
                bold: true,
                color: "#222222",
                margin: [0, 20, 0, 5]
            },

            {
                text: this.texto(p.apelido, ""),
                alignment: "center",
                fontSize: 15,
                italics: true,
                color: this.cores.cinza
            },

            { text: "\n\n" },

            {
                text: `${this.texto(p.raca)} • ${this.texto(p.classe)} • Nível ${this.texto(p.nivel, "1")}`,
                alignment: "center",
                fontSize: 12,
                color: this.cores.texto
            },

            { text: "\n\n\n\n\n\n" },

            {
                text: "GUARDIÕES DO DESTINO",
                alignment: "center",
                fontSize: 11,
                bold: true,
                color: this.cores.dourado,
                characterSpacing: 2
            },

            {
                text: "ARQUIVO DE PERSONAGEM",
                alignment: "center",
                fontSize: 9,
                color: this.cores.cinza,
                margin: [0, 5, 0, 0]
            },

            { text: "\n\n\n\n" },

            {
                text: "Documento gerado pelo Character Codex",
                alignment: "center",
                fontSize: 8,
                color: this.cores.cinza
            },

            {
                text: "",
                pageBreak: "after"
            }

        ];
    },


    // ==========================================
    // VISÃO GERAL
    // ==========================================

    criarVisaoGeral(p) {

        return [

            this.titulo("Identificação"),

            {
                table: {
                    widths: ["35%", "65%"],
                    body: [
                        ["Nome", this.texto(p.nome)],
                        ["Apelido", this.texto(p.apelido)],
                        ["Raça", this.texto(p.raca)],
                        ["Classe", this.texto(p.classe)],
                        ["Nível", this.texto(p.nivel)],
                        ["Experiência", this.texto(p.experiencia, "0")],
                        ["Origem", this.texto(p.origem)],
                        ["Local de início", this.texto(p.local)],
                        ["Idade", this.texto(p.idade)],
                        ["Altura", this.texto(p.altura)]
                    ]
                },
                layout: "lightHorizontalLines",
                fontSize: 10
            },

            this.titulo("Atributos"),

            {
                table: {
                    widths: ["*", "*", "*", "*", "*"],
                    body: [

                        [
                            { text: "FOR", bold: true },
                            { text: "AGI", bold: true },
                            { text: "CON", bold: true },
                            { text: "INT", bold: true },
                            { text: "CAR", bold: true }
                        ],

                        [
                            this.texto(p.atributos?.FOR, "0"),
                            this.texto(p.atributos?.AGI, "0"),
                            this.texto(p.atributos?.CON, "0"),
                            this.texto(p.atributos?.INT, "0"),
                            this.texto(p.atributos?.CAR, "0")
                        ]

                    ]
                },
                alignment: "center",
                layout: "lightHorizontalLines",
                fontSize: 11
            },

            this.titulo("Recursos"),

            {
                table: {
                    widths: ["*", "*", "*", "*"],
                    body: [

                        [
                            { text: "Pontos de Vida", bold: true },
                            { text: "Pontos de Mana", bold: true },
                            { text: "Sanidade", bold: true },
                            { text: "Destino", bold: true }
                        ],

                        [
                            `${this.texto(p.recursos?.pv, "0")} / ${this.texto(p.recursos?.pvMax, "0")}`,
                            `${this.texto(p.recursos?.pm, "0")} / ${this.texto(p.recursos?.pmMax, "0")}`,
                            `${this.texto(p.recursos?.sanidade, "0")} / ${this.texto(p.recursos?.sanidadeMax, "0")}`,
                            this.texto(p.recursos?.destino, "0")
                        ]

                    ]
                },
                alignment: "center",
                layout: "lightHorizontalLines",
                fontSize: 9
            }

        ];
    },


    // ==========================================
    // FICHA TÉCNICA
    // ==========================================

    criarFichaTecnica(p) {

        const conteudo = [];

        conteudo.push(this.titulo("Atributos"));

        const atributos = p.atributos || {};

        conteudo.push({

            table: {
                widths: ["*", "*", "*", "*", "*"],
                body: [

                    [
                        "Força",
                        "Agilidade",
                        "Constituição",
                        "Intelecto",
                        "Carisma"
                    ],

                    [
                        this.texto(atributos.FOR, "0"),
                        this.texto(atributos.AGI, "0"),
                        this.texto(atributos.CON, "0"),
                        this.texto(atributos.INT, "0"),
                        this.texto(atributos.CAR, "0")
                    ]

                ]
            },

            alignment: "center",
            layout: "lightHorizontalLines",
            fontSize: 9

        });


        // VALORES DE COMBATE

        conteudo.push(this.titulo("Valores de combate"));

        conteudo.push({

            table: {
                widths: ["35%", "20%", "45%"],
                body: [

                    [
                        { text: "Característica", bold: true },
                        { text: "Valor", bold: true },
                        { text: "Descrição", bold: true }
                    ],

                    [
                        "Pontos de Vida",
                        `${this.texto(p.recursos?.pv, "0")} / ${this.texto(p.recursos?.pvMax, "0")}`,
                        "Capacidade de resistência do personagem."
                    ],

                    [
                        "Pontos de Mana",
                        `${this.texto(p.recursos?.pm, "0")} / ${this.texto(p.recursos?.pmMax, "0")}`,
                        "Recurso utilizado para habilidades e poderes."
                    ],

                    [
                        "Sanidade",
                        `${this.texto(p.recursos?.sanidade, "0")} / ${this.texto(p.recursos?.sanidadeMax, "0")}`,
                        "Representa a estabilidade mental."
                    ],

                    [
                        "Pontos de Destino",
                        this.texto(p.recursos?.destino, "0"),
                        "Recurso especial do personagem."
                    ],

                    [
                        "Astúcia — Talento inicial",
                        "+10%",
                        "Bônus em Enganação, Manipulação e truques sociais."
                    ]

                ]
            },

            layout: "lightHorizontalLines",
            fontSize: 9

        });


        // PERÍCIAS

        conteudo.push(this.titulo("Perícias"));

        if (p.pericias && p.pericias.length > 0) {

            const linhas = [

                [
                    { text: "Perícia", bold: true },
                    { text: "Atributo", bold: true },
                    { text: "Pontos", bold: true }
                ]

            ];

            p.pericias.forEach(pericia => {

                linhas.push([

                    this.texto(pericia[0]),
                    this.texto(pericia[1]),
                    this.texto(pericia[2], "0")

                ]);

            });

            conteudo.push({

                table: {
                    widths: ["50%", "25%", "25%"],
                    body: linhas
                },

                layout: "lightHorizontalLines",
                fontSize: 9

            });

        } else {

            conteudo.push({

                text: "Nenhuma perícia cadastrada.",
                color: this.cores.cinza,
                fontSize: 9

            });

        }


        // HABILIDADES

        conteudo.push(this.titulo("Habilidades"));

        if (p.habilidades && p.habilidades.length > 0) {

            p.habilidades.forEach(habilidade => {

                conteudo.push({

                    stack: [

                        {
                            text: this.texto(habilidade.nome),
                            bold: true,
                            color: this.cores.dourado,
                            fontSize: 10
                        },

                        {
                            text: this.texto(habilidade.tipo, ""),
                            italics: true,
                            color: this.cores.cinza,
                            fontSize: 8
                        },

                        {
                            text: this.texto(habilidade.descricao),
                            fontSize: 9,
                            margin: [0, 3, 0, 8]
                        }

                    ]

                });

            });

        } else {

            conteudo.push({

                text: "Nenhuma habilidade cadastrada.",
                color: this.cores.cinza,
                fontSize: 9

            });

        }

        return conteudo;
    },


    // ==========================================
    // INVENTÁRIO
    // ==========================================

    criarInventario(p) {

        const conteudo = [];

        conteudo.push(this.titulo("Inventário"));

        if (!p.inventario || p.inventario.length === 0) {

            conteudo.push({

                text: "Nenhum item cadastrado.",
                color: this.cores.cinza

            });

            return conteudo;
        }

        const linhas = [

            [
                { text: "Item", bold: true },
                { text: "Quantidade", bold: true },
                { text: "Peso", bold: true },
                { text: "Descrição", bold: true }
            ]

        ];

        p.inventario.forEach(item => {

            linhas.push([

                this.texto(item.nome),
                this.texto(item.quantidade, "1"),
                this.texto(item.peso, "0"),
                this.texto(item.descricao, "")

            ]);

        });

        conteudo.push({

            table: {
                headerRows: 1,
                widths: ["25%", "15%", "15%", "45%"],
                body: linhas
            },

            layout: "lightHorizontalLines",
            fontSize: 8

        });

        return conteudo;
    },


    // ==========================================
    // LORE — FORMATAÇÃO NARRATIVA
    // ==========================================

    criarLore(dados) {

        const conteudo = [];

        // TÍTULO DA SEÇÃO

        conteudo.push({

            text: "O LEGADO DAS CINZAS",
            fontSize: 23,
            bold: true,
            color: this.cores.dourado,
            alignment: "center",
            characterSpacing: 1.5,
            margin: [0, 25, 0, 10]

        });


        // VERIFICA SE EXISTE LORE

        if (!dados) {

            conteudo.push({

                text: "Nenhuma informação de lore encontrada.",
                color: this.cores.cinza

            });

            return conteudo;
        }


        // ------------------------------------------
        // FUNÇÃO PARA FORMATAR PARÁGRAFOS
        // ------------------------------------------

        const formatarParagrafos = (texto) => {

            if (texto === undefined || texto === null || texto === "") {
                return [];
            }

            let paragrafos = [];

            if (Array.isArray(texto)) {

                paragrafos = texto;

            } else {

                paragrafos = String(texto)
                    .replace(/\r\n/g, "\n")
                    .split(/\n\s*\n|\n/)
                    .map(paragrafo => paragrafo.trim());

            }

            return paragrafos

                .filter(paragrafo => {

                    return paragrafo !== "" &&
                        paragrafo !== null &&
                        paragrafo !== undefined;

                })

                .map(paragrafo => ({

                    text: String(paragrafo).trim(),
                    fontSize: 9.5,
                    color: this.cores.texto,
                    alignment: "justify",
                    lineHeight: 1.45,
                    margin: [0, 0, 0, 10]

                }));

        };


        // ------------------------------------------
        // FUNÇÃO PARA EXTRAIR O TEXTO DO CAPÍTULO
        // ------------------------------------------

        const obterTexto = (item) => {

            if (typeof item === "string") {
                return item;
            }

            if (Array.isArray(item)) {
                return item;
            }

            if (!item || typeof item !== "object") {
                return "";
            }

            return item.paragrafos
                || item.conteudo
                || item.descricao
                || item.texto
                || item.corpo
                || "";

        };


        // ------------------------------------------
        // TÍTULO E SUBTÍTULO
        // ------------------------------------------

        if (dados.titulo) {

            conteudo[0].text = String(dados.titulo).toUpperCase();

        }

        conteudo.push({

            canvas: [{
                type: "line",
                x1: 100,
                y1: 0,
                x2: 375,
                y2: 0,
                lineWidth: 1.5,
                lineColor: this.cores.dourado
            }],

            margin: [0, 5, 0, 18]

        });


        if (dados.subtitulo) {

            conteudo.push({

                text: dados.subtitulo,
                fontSize: 10,
                italics: true,
                color: this.cores.cinza,
                alignment: "center",
                lineHeight: 1.4,
                margin: [15, 0, 15, 25]

            });

        }


        // ------------------------------------------
        // ESTRUTURA EM LISTA
        // ------------------------------------------

        if (Array.isArray(dados)) {

            dados.forEach((item, indice) => {

                const titulo = typeof item === "object" && item !== null
                    ? item.titulo || item.nome || `Capítulo ${indice + 1}`
                    : `Capítulo ${indice + 1}`;

                conteudo.push({

                    text: titulo,
                    fontSize: 14,
                    bold: true,
                    color: this.cores.dourado,
                    margin: [0, 22, 0, 10],
                    keepWithNext: true

                });

                conteudo.push(...formatarParagrafos(obterTexto(item)));

            });

            return conteudo;
        }


        // ------------------------------------------
        // CAPÍTULOS
        // ------------------------------------------

        if (Array.isArray(dados.capitulos)) {

            dados.capitulos.forEach((capitulo, indice) => {

                const titulo = typeof capitulo === "object" && capitulo !== null
                    ? capitulo.titulo || capitulo.nome || `Capítulo ${indice + 1}`
                    : `Capítulo ${indice + 1}`;

                const texto = obterTexto(capitulo);


                // SEPARADOR DO CAPÍTULO

                conteudo.push({

                    canvas: [{
                        type: "line",
                        x1: 0,
                        y1: 0,
                        x2: 515,
                        y2: 0,
                        lineWidth: 0.7,
                        lineColor: "#D8CBB8"
                    }],

                    margin: [0, 16, 0, 10]

                });


                // TÍTULO DO CAPÍTULO

                conteudo.push({

                    text: titulo,
                    fontSize: 13,
                    bold: true,
                    color: this.cores.dourado,
                    margin: [0, 5, 0, 12],
                    keepWithNext: true

                });


                // TEXTO DO CAPÍTULO

                conteudo.push(...formatarParagrafos(texto));

            });

        } else {

            // COMPATIBILIDADE COM OUTROS FORMATOS DE JSON

            Object.entries(dados).forEach(([chave, valor]) => {

                if (["titulo", "subtitulo"].includes(chave)) {
                    return;
                }

                if (chave === "capitulos") {
                    return;
                }

                if (typeof valor === "string" || Array.isArray(valor)) {

                    conteudo.push({

                        text: chave,
                        fontSize: 13,
                        bold: true,
                        color: this.cores.dourado,
                        margin: [0, 18, 0, 8],
                        keepWithNext: true

                    });

                    conteudo.push(...formatarParagrafos(valor));

                } else if (typeof valor === "object" && valor !== null) {

                    conteudo.push({

                        text: valor.titulo || valor.nome || chave,
                        fontSize: 13,
                        bold: true,
                        color: this.cores.dourado,
                        margin: [0, 18, 0, 8],
                        keepWithNext: true

                    });

                    conteudo.push(...formatarParagrafos(obterTexto(valor)));

                }

            });

        }

        return conteudo;
    },


    // ==========================================
    // CURIOSIDADES
    // ==========================================

    criarCuriosidades(dados) {

        const conteudo = [];

        conteudo.push({

            text: "CURIOSIDADES",
            fontSize: 18,
            bold: true,
            color: this.cores.dourado,
            margin: [0, 20, 0, 15]

        });

        let lista = [];

        if (Array.isArray(dados)) {

            lista = dados;

        } else if (dados && Array.isArray(dados.curiosidades)) {

            lista = dados.curiosidades;

        }

        if (lista.length === 0) {

            conteudo.push({

                text: "Nenhuma curiosidade cadastrada.",
                color: this.cores.cinza

            });

            return conteudo;
        }

        lista.forEach((item, indice) => {

            if (typeof item === "string") {

                conteudo.push({

                    text: `${indice + 1}. ${item}`,
                    fontSize: 9,
                    margin: [0, 0, 0, 8]

                });

            } else {

                conteudo.push({

                    text: this.texto(item.titulo || item.nome, `Curiosidade ${indice + 1}`),
                    bold: true,
                    fontSize: 10,
                    margin: [0, 5, 0, 3]

                });

                conteudo.push({

                    text: this.texto(item.descricao || item.texto || item.conteudo),
                    fontSize: 9,
                    margin: [0, 0, 0, 8]

                });

            }

        });

        return conteudo;
    },


    // ==========================================
    // DIÁRIO
    // ==========================================

    criarDiario(p) {

        const conteudo = [];

        conteudo.push({

            text: "DIÁRIO PESSOAL",
            fontSize: 18,
            bold: true,
            color: this.cores.dourado,
            margin: [0, 20, 0, 15]

        });

        conteudo.push({

            text: this.texto(p.diario, "Nenhuma anotação registrada."),
            fontSize: 10,
            lineHeight: 1.5

        });

        return conteudo;
    },


    // ==========================================
    // CRONOLOGIA
    // ==========================================

    criarCronologia(dados) {

        const conteudo = [];

        conteudo.push({

            text: "CRONOLOGIA",
            fontSize: 18,
            bold: true,
            color: this.cores.dourado,
            margin: [0, 20, 0, 15]

        });

        if (!dados) {

            conteudo.push({

                text: "Nenhuma cronologia encontrada.",
                color: this.cores.cinza

            });

            return conteudo;
        }

        const capitulos = Array.isArray(dados)
            ? dados
            : dados.capitulos || [];

        if (capitulos.length === 0) {

            conteudo.push({

                text: "Nenhum evento cronológico cadastrado.",
                color: this.cores.cinza

            });

            return conteudo;
        }

        capitulos.forEach(capitulo => {

            conteudo.push({

                text: this.texto(capitulo.titulo || capitulo.nome || capitulo.id),
                fontSize: 13,
                bold: true,
                color: this.cores.dourado,
                margin: [0, 15, 0, 8],
                keepWithNext: true

            });

            if (!capitulo.eventos || capitulo.eventos.length === 0) {
                return;
            }

            capitulo.eventos.forEach(evento => {

                conteudo.push({

                    stack: [

                        {
                            text: `${this.texto(evento.ano, "Ano desconhecido")} — ${this.texto(evento.titulo)}`,
                            bold: true,
                            fontSize: 10,
                            color: this.cores.texto
                        },

                        {
                            text: `Idade: ${this.texto(evento.idade, "Não informada")}`,
                            fontSize: 8,
                            color: this.cores.cinza,
                            margin: [0, 2, 0, 2]
                        },

                        {
                            text: `Local: ${this.texto(evento.local, "Não informado")}`,
                            fontSize: 8,
                            color: this.cores.cinza,
                            margin: [0, 0, 0, 4]
                        },

                        {
                            text: this.texto(evento.descricao),
                            fontSize: 9,
                            lineHeight: 1.3,
                            margin: [0, 0, 0, 8]
                        }

                    ],

                    margin: [0, 0, 0, 5]

                });

            });

        });

        return conteudo;
    },


    // ==========================================
    // CARREGAR IMAGEM
    // ==========================================

    carregarImagem(caminho) {

        return new Promise(resolve => {

            const imagem = new Image();

            imagem.onload = function () {

                const canvas = document.createElement("canvas");

                canvas.width = imagem.width;
                canvas.height = imagem.height;

                const contexto = canvas.getContext("2d");

                contexto.drawImage(imagem, 0, 0);

                resolve(canvas.toDataURL("image/png"));

            };

            imagem.onerror = function () {

                resolve(null);

            };

            imagem.src = caminho;

        });

    },


    // ==========================================
    // GALERIA DE IMAGENS
    // ==========================================

    async criarGaleria() {

        const imagens = [

            { nome: "Retrato de Vaerik", caminho: "assets/personagens/facial.png" },

            { nome: "Adaga", caminho: "assets/itens/adaga.png" },
            { nome: "Bolsa", caminho: "assets/itens/bolsa.png" },
            { nome: "Botas", caminho: "assets/itens/botas.png" },
            { nome: "Bracelete", caminho: "assets/itens/bracelete.png" },
            { nome: "Calça", caminho: "assets/itens/calça.png" },
            { nome: "Camisa", caminho: "assets/itens/camisa.png" },
            { nome: "Cantil", caminho: "assets/itens/cantil.png" },
            { nome: "Capa", caminho: "assets/itens/capa.png" },
            { nome: "Carta", caminho: "assets/itens/carta.png" },
            { nome: "Cinto", caminho: "assets/itens/cinto.png" },
            { nome: "Colete", caminho: "assets/itens/colete.png" },
            { nome: "Corda", caminho: "assets/itens/corda.png" },
            { nome: "Luva", caminho: "assets/itens/luva.png" },
            { nome: "Bolsa de moedas", caminho: "assets/itens/monei.png" },
            { nome: "Brasão", caminho: "assets/itens/brasao.png" }

        ];


        // ADICIONA OS SETE TOKENS

        for (let i = 1; i <= 7; i++) {

            imagens.push({

                nome: `Token ${i}`,
                caminho: `assets/tokens/token%20%20(${i}).png`

            });

        }


        const conteudo = [];

        conteudo.push({

            text: "GALERIA DE IMAGENS",
            fontSize: 18,
            bold: true,
            color: this.cores.dourado,
            margin: [0, 20, 0, 15]

        });


        const imagensPDF = [];

        for (const item of imagens) {

            const imagem = await this.carregarImagem(item.caminho);

            if (imagem) {

                imagensPDF.push({

                    stack: [

                        {
                            image: imagem,
                            fit: [130, 130],
                            alignment: "center"
                        },

                        {
                            text: item.nome,
                            alignment: "center",
                            fontSize: 8,
                            color: this.cores.cinza,
                            margin: [0, 5, 0, 15]
                        }

                    ],

                    width: 160

                });

            }

        }


        if (imagensPDF.length === 0) {

            conteudo.push({

                text: "Não foi possível carregar as imagens da galeria.",
                color: this.cores.cinza

            });

            return conteudo;
        }


        // ORGANIZA AS IMAGENS EM DUAS COLUNAS

        for (let i = 0; i < imagensPDF.length; i += 2) {

            conteudo.push({

                columns: [

                    imagensPDF[i],

                    imagensPDF[i + 1] || { text: "" }

                ],

                columnGap: 15,
                margin: [0, 5, 0, 5]

            });

        }

        return conteudo;
    },


    // ==========================================
    // MONTAR DOCUMENTO
    // ==========================================

    montarDocumento(p, completo, lore, curiosidades, cronologia, galeria) {

        const conteudo = [];

        conteudo.push(...this.criarCapa(p));

        conteudo.push(...this.criarVisaoGeral(p));

        conteudo.push(...this.criarFichaTecnica(p));

        conteudo.push(...this.criarInventario(p));


        if (completo) {

            // LORE

            conteudo.push({

                text: "",
                pageBreak: "before"

            });

            conteudo.push(...this.criarLore(lore));


            // CURIOSIDADES

            conteudo.push({

                text: "",
                pageBreak: "before"

            });

            conteudo.push(...this.criarCuriosidades(curiosidades));


            // DIÁRIO

            conteudo.push({

                text: "",
                pageBreak: "before"

            });

            conteudo.push(...this.criarDiario(p));


            // CRONOLOGIA

            conteudo.push({

                text: "",
                pageBreak: "before"

            });

            conteudo.push(...this.criarCronologia(cronologia));


            // GALERIA

            conteudo.push({

                text: "",
                pageBreak: "before"

            });

            conteudo.push(...galeria);

        }


        return {

            pageSize: "A4",

            pageMargins: [40, 55, 40, 55],

            content: conteudo,

            defaultStyle: {

                font: "Roboto",
                fontSize: 10,
                color: this.cores.texto

            },

            footer: function (pagina, total) {

                return {

                    columns: [

                        {
                            text: "CHARACTER CODEX",
                            alignment: "left",
                            fontSize: 8,
                            color: "#999999",
                            margin: [40, 15, 0, 0]
                        },

                        {
                            text: `${pagina} / ${total}`,
                            alignment: "right",
                            fontSize: 8,
                            color: "#999999",
                            margin: [0, 15, 40, 0]
                        }

                    ]

                };

            }

        };

    },


    // ==========================================
    // ABRIR SELETOR VISUAL
    // ==========================================

    abrirSeletor() {

        const modal = document.getElementById("pdf-modal");

        if (!modal) {

            alert("Janela de exportação não encontrada. Confira o modal no index.html.");

            return;
        }

        modal.classList.add("active");

    },


    // ==========================================
    // FECHAR SELETOR VISUAL
    // ==========================================

    fecharSeletor() {

        const modal = document.getElementById("pdf-modal");

        if (modal) {

            modal.classList.remove("active");

        }

    },


    // ==========================================
    // EXPORTAR PDF
    // ==========================================

    async exportar(tipo) {

        // FECHA A JANELA DE SELEÇÃO

        this.fecharSeletor();

        try {

            if (typeof pdfMake === "undefined") {

                alert("A biblioteca pdfMake não foi carregada. Verifique o index.html.");

                return;
            }


            const personagem = carregar();

            if (!personagem) {

                alert("Não foi possível carregar os dados do personagem.");

                return;
            }


            const completo = tipo === "completo";

            let lore = null;
            let curiosidades = null;
            let cronologia = null;
            let galeria = [];


            // BUSCA OS ARQUIVOS ADICIONAIS SOMENTE NO PDF COMPLETO

            if (completo) {

                const respostaLore = await fetch("data/lore.json");

                const respostaCuriosidades = await fetch("data/curiosidades.json");

                const respostaCronologia = await fetch("data/cronologia.json");


                if (respostaLore.ok) {

                    lore = await respostaLore.json();

                }

                if (respostaCuriosidades.ok) {

                    curiosidades = await respostaCuriosidades.json();

                }

                if (respostaCronologia.ok) {

                    cronologia = await respostaCronologia.json();

                }


                galeria = await this.criarGaleria();

            }


            // MONTA O DOCUMENTO

            const documento = this.montarDocumento(

                personagem,
                completo,
                lore,
                curiosidades,
                cronologia,
                galeria

            );


            // DEFINE O NOME DO ARQUIVO

            const nome = completo

                ? `${this.nomeArquivo}_Completo.pdf`

                : `${this.nomeArquivo}_Tecnico.pdf`;


            // GERA E BAIXA O PDF

            pdfMake.createPdf(documento).download(nome);


        } catch (erro) {

            console.error("Erro ao exportar PDF:", erro);

            alert("Ocorreu um erro ao gerar o PDF. Verifique o Console do navegador.");

        }

    }

};


// ==========================================
// DISPONIBILIZAR PARA O HTML
// ==========================================

window.PDFCodex = PDFCodex;


// ==========================================
// LIGAÇÃO DO BOTÃO DE EXPORTAÇÃO
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const botaoPDF = document.getElementById("print-sheet");

    if (botaoPDF) {

        botaoPDF.addEventListener("click", function () {

            PDFCodex.abrirSeletor();

        });

    }

});
