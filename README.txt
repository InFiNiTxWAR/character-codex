# ⚔️ Character Codex

**Uma ficha de RPG digital para criar, organizar e acompanhar personagens em suas aventuras.**

Character Codex é uma aplicação web desenvolvida para centralizar as informações de personagens de RPG em um único lugar. Com uma interface inspirada em fantasia medieval e dark fantasy, o projeto reúne atributos, recursos, inventário, história e referências visuais em uma experiência organizada e intuitiva.

---

## 🧙 Sobre o projeto

O Character Codex foi desenvolvido para tornar o gerenciamento de personagens de RPG mais prático, visual e organizado.

A aplicação utiliza **Vaerik Vharzeth, O Corvo**, como personagem inicial, permitindo visualizar suas informações, equipamentos, história e representações visuais.

## ✨ Funcionalidades

- **Dashboard:** visão geral das informações do personagem.
- **Ficha técnica:** atributos, características e recursos.
- **Inventário:** gerenciamento de equipamentos e objetos.
- **Cards de itens:** visualização individual dos equipamentos e seus detalhes.
- **Lore:** consulta à história e ao passado do personagem.
- **Curiosidades:** informações adicionais sobre o personagem.
- **Galeria de imagens:** organização de retratos, equipamentos e tokens.
- **Exportação em PDF:** geração de documentos com informações do personagem.
- **Persistência local:** armazenamento de informações no navegador.
- **Backup:** possibilidade de exportar e importar os dados da ficha.

## 🛠️ Tecnologias utilizadas

| Tecnologia | Utilização |
|---|---|
| HTML5 | Estrutura da aplicação |
| CSS3 | Estilização e interface |
| JavaScript | Lógica e funcionalidades |
| JSON | Organização de dados |
| pdfmake | Geração de documentos PDF |
| LocalStorage | Persistência de informações |

## 📁 Estrutura do projeto

```text
character-codex/
│
├── index.html
│
├── assets/
│   ├── personagens/
│   ├── itens/
│   └── tokens/
│
├── css/
│   ├── style.css
│   ├── card.css
│   └── galeria.css
│
├── js/
│   ├── app.js
│   ├── dados.js
│   ├── abrir-card.js
│   ├── galeria.js
│   └── pdf.js
│
└── data/
    ├── curiosidades.json
    └── lore.json
```

## 🚀 Como executar

1. Clone o repositório:

```bash
git clone https://github.com/InFiNiTxWAR/character-codex.git
```

2. Entre na pasta:

```bash
cd character-codex
```

3. Abra o projeto no Visual Studio Code.

4. Execute o arquivo `index.html` utilizando a extensão **Live Server**.

> O projeto utiliza arquivos JSON locais. Por isso, recomenda-se executar a aplicação por meio de um servidor local, como o Live Server, em vez de abrir o HTML diretamente pelo navegador.

## 🎨 Identidade visual

A interface segue uma estética inspirada em universos de fantasia medieval, com:

- Paleta de cores escuras.
- Elementos em tons dourados e terrosos.
- Componentes visuais inspirados em fichas de RPG.
- Organização modular e navegação por seções.

## 📌 Projeto

**Nome:** Character Codex  
**Versão:** 0.1  
**Status:** Em desenvolvimento  
**Desenvolvedor:** InFiNiTxWAR

---

*Uma aventura começa com uma história. Uma história começa com um personagem.*
