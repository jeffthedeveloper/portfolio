# Portfólio de Jefferson Firmino - Desenvolvedor Full Stack, Cientista de Dados e Engenheiro de IA

Este é o código-fonte do meu portfólio pessoal, uma página única (SPA - Single Page Application) desenvolvida para apresentar minhas habilidades, projetos, formação, experiência profissional e certificações.

**Link para o Portfólio:**
[https://jeffthedeveloper.github.io/portfolio/](https://jeffthedeveloper.github.io/portfolio/)

## 🚀 Visão Geral

O portfólio foi construído com foco em um design limpo, responsivo e com uma estética que remete a elementos de jogos clássicos, utilizando HTML5 semântico, CSS3 moderno (com variáveis, Flexbox e Grid) e JavaScript para interatividade.

## ✨ Funcionalidades Implementadas

* **Design Responsivo:** Adaptável a diversos tamanhos de tela, desde dispositivos móveis até desktops.
* **Navegação Fixa (Sticky):** Barra de navegação que permanece no topo da página durante o scroll.
* **Menu Mobile (Hamburger):** Menu de navegação funcional para dispositivos móveis.
* **Dropdown Desktop:** Menu "Mais" para links adicionais na navegação desktop.
* **Seções Detalhadas:**
    * **Sobre:** Apresentação pessoal e profissional, com uma seção "Minha Jornada & Foco Atual" estilizada como um menu de jogo.
    * **Projetos em Destaque:** Cards apresentando projetos com links para o GitHub.
    * **Formação Acadêmica:** Timeline horizontal rolável exibindo a trajetória educacional.
    * **Experiência Profissional:** Timeline horizontal rolável com o histórico de trabalho.
    * **Certificações Selecionadas:** Grid de cards com as principais certificações.
    * **Ferramentas & Tecnologias Chave:** Grid de ícones clicáveis que levam à documentação oficial das tecnologias.
    * **Habilidades Técnicas (Skills):**
        * Categorizadas (Back-end, Front-end, IA & Data Science, DevOps & Cloud).
        * Barras de proficiência animadas ao entrarem no viewport.
        * **Tooltips interativos** que exibem a porcentagem de proficiência ao passar o mouse sobre cada skill.
    * **Contato:** Formulário de contato que gera um link `mailto:` e links para redes sociais.
* **Interatividade com JavaScript:**
    * Animação das barras de skills ao rolar a página.
    * Lógica para o menu mobile.
    * Geração do link `mailto:` para o formulário de contato.
    * Implementação de tooltips para as barras de skills.
    * Atualização dinâmica do ano no rodapé.
* **Estilização Avançada:**
    * Uso extensivo de variáveis CSS para fácil customização do tema.
    * Efeitos de hover e transições suaves.
    * Fontes personalizadas (`Press Start 2P` para títulos e elementos com tema de jogo).
* **Contador de Visitantes:** Imagem de badge no rodapé para contagem de visitas (serviço externo).
* **Otimizações:**
    * Uso de `passive: true` em event listeners de scroll.
    * Implementação de `debounce` para otimizar a execução de funções em eventos de scroll e resize.
    * Atributos `rel="noopener noreferrer"` em links `target="_blank"` por segurança.

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura semântica do conteúdo.
* **CSS3:** Estilização, layout responsivo (Flexbox, Grid), animações e transições.
* **JavaScript (ES6+):** Interatividade, manipulação do DOM, animações e funcionalidades dinâmicas.
* **Google Fonts:** Para a fonte "Press Start 2P".
* **Devicon & Outras Fontes de Ícones SVG/PNG:** Para ícones de tecnologias e outros elementos visuais.
* **GitHub Pages:** Para hospedagem do site estático.
* **GitHub Actions:** Para deploy automatizado do site no GitHub Pages (configurado no arquivo `.github/workflows/static.yml`).

## 🔧 Estrutura do Projeto

```plaintext
|-- assets/
|   |-- images/
|       |-- ghibli_character.png (favicon e imagem de perfil)
|       |-- icon_ai_flask.webp
|       |-- ... (outros ícones de projetos, certificações, etc.)
|-- .github/
|   |-- workflows/
|       |-- static.yml      (Workflow do GitHub Actions para deploy)
|-- index.html              (Arquivo HTML principal)
|-- style.css               (Arquivo CSS principal com todos os estilos)
|-- script.js               (Arquivo JavaScript principal com todas as interatividades)
|-- README.md               (Este arquivo)
```

## ⚙️ Configuração e Deploy (GitHub Pages)

O projeto está configurado para ser automaticamente implantado no GitHub Pages sempre que houver um push para o branch `main`. Isso é gerenciado pelo workflow definido em `.github/workflows/static.yml`.

**Permissões do GITHUB_TOKEN no Workflow:**
* `contents: read`
* `pages: write`
* `id-token: write`

**Concorrência de Deploy:**
* Apenas um deploy concorrente é permitido para o grupo "pages".
* Runs em fila são cancelados se um novo run for iniciado, mas os runs em progresso não são cancelados.

## 🚀 Como Visualizar Localmente

1.  Clone o repositório:
    ```bash
    git clone https://github.com/jeffthedeveloper/portfolio.git
    ```
2.  Navegue até o diretório do projeto:
    ```bash
    cd portfolio
    ```
3.  Abra o arquivo `index.html` em seu navegador de preferência.

## 🤝 Contribuições

Este é um projeto pessoal, mas feedbacks e sugestões de melhoria são sempre bem-vindos! Sinta-se à vontade para abrir uma *Issue* ou um *Pull Request*.

## 📜 Licença

```plaintext
Este projeto está licenciado sob a Licença MIT.

Copyright (c) 2025 Jefferson Firmino Mendes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
---

**Jefferson Firmino Mendes**
*Desenvolvedor Full Stack | Cientista de Dados | Engenheiro de IA*
