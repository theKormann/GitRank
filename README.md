# 🚀 GitRank

**O teu GitHub é o teu principal portfólio. Mas qual é o nível dele?**

O [GitRank](https://gitrank.tech) é uma ferramenta de análise que audita o perfil de um programador no GitHub e gera um "Score de Qualidade" (de 0 a 100) com base em métricas reais. Mais do que um simples avaliador de código, foi concebido como um produto digital para gerar insights úteis e cartões visuais partilháveis para redes sociais como o LinkedIn.

---

## ✨ Funcionalidades

- **Análise Profunda:** Consome a API GraphQL do GitHub para avaliar repositórios públicos com alta precisão.
- **Score de Qualidade:** Algoritmo que pontua o perfil com base na consistência, documentação (presença de ficheiros README) e diversidade de linguagens de programação.
- **Insights Inteligentes:** Feedback acionável sobre o que pode ser melhorado (ex: alertas sobre baixa frequência de commits ou falta de documentação em projetos).
- **Altamente Partilhável:** Geração dinâmica de imagens para que os utilizadores possam exibir o seu desempenho e métricas em publicações e comunidades.

---

## 🛠️ Tecnologias Utilizadas

O projeto adota uma stack moderna, separando claramente as responsabilidades entre o motor de análise no backend e a interface visual.

### Backend (Motor de Análise)
- **Java 17+**
- **Spring Boot**
- Integração com a **API GraphQL do GitHub**
- Arquitetura estruturada com base em princípios de Clean Architecture e Domain-Driven Design (separação entre domain, application e infrastructure).

### Frontend (Interface e Produto)
- **Next.js & React**
- Geração de imagens dinâmicas do lado do servidor para partilha.
- Estilização moderna para garantir uma interface intuitiva e responsiva.

---

## 🏗️ Estrutura do Sistema

O motor backend foi desenhado para ser eficiente e extensível:
- `domain/`: Contém as entidades de negócio (ex: DeveloperProfile, GitRankResult, Badge) e a lógica central de pontuação.
- `application/`: Orquestra as regras de negócio e os fluxos da aplicação.
- `infrastructure/`: Trata dos detalhes técnicos, expõe os controladores REST e comunica com serviços externos.

---

## 🚀 Como executar o projeto localmente

### Pré-requisitos
- Java 17 ou superior
- Node.js (versão 18+)
- Um Personal Access Token do GitHub para efetuar chamadas à API GraphQL.

### Iniciar o Backend
1. Aceda ao diretório `backend`:
   ```bash
   cd backend
   ```
2. Configure as suas credenciais (Token do GitHub) no ficheiro `application.properties`.

3. Execute a aplicação Spring Boot utilizando o wrapper do Maven:
   ```bash
   ./mvnw spring-boot:run
   ```

### Iniciar o Frontend
1. Aceda ao diretório `frontend`:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Abra http://localhost:3000 no seu navegador.

---

## 💡 Evolução Futura (Roadmap)
- **Sistema de Cache:** Integração com Caffeine ou Redis para otimizar as chamadas à API do GitHub e contornar os limites de taxa (rate limit).
- **Ranking Global:** Um ecrã de leaderboard para comparar pontuações com outros programadores da comunidade.
- **Autenticação:** Login via OAuth do GitHub para permitir a análise de repositórios privados com a permissão do utilizador.
- **Histórico de Evolução:** Acompanhamento temporal do crescimento do Score.

---

## 👨‍💻 Autor
Criado e mantido por Matheus Kormann.

Se esta ferramenta lhe foi útil ou se lhe deu bons insights, não se esqueça de deixar uma estrela (⭐) no repositório e de partilhar o seu Score no LinkedIn!
