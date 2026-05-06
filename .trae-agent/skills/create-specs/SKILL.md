---
name: create-specs
description: Materializa a discussão da /feature-planning em arquivos de spec. Cria specs/<slug>/ com summary.md (o quê e por quê), design.md (como), e tasks.md (checklist executável). NÃO implementa código — só gera os arquivos de spec.
---

# Create Specs

Transforma o entendimento já fechado da feature (idealmente vindo de `/feature-planning`) em **três arquivos de spec** que servem de contrato para o `/build-specs`.

## Regras de ouro

1. **Não escreva código de produção.** Esta skill só cria arquivos dentro de `specs/`.
2. **Não recomece a entrevista.** Se o escopo ainda está vago, **pare e peça** para o usuário rodar `/feature-planning` antes. Faça no máximo 1–2 perguntas pontuais para fechar lacunas críticas; não conduza uma entrevista completa aqui.
3. **Um diretório por feature.** Slug em `kebab-case`, curto e descritivo: `specs/team-carousel-autoplay/`, `specs/contact-form/`, `specs/blog-mvp/`.
4. **Sempre os três arquivos**, mesmo que pequenos: `summary.md`, `design.md`, `tasks.md`.
5. **Tasks granulares e verificáveis.** Cada checkbox tem que ter um critério claro de "feito" — sem "implementar a feature".
6. **Ancore no projeto real.** Cite arquivos existentes (`src/components/...`), siga as convenções do [AGENT.md](../../../AGENT.md) (CSS Modules, Server Components por padrão, sem libs extras, etc.).

## Pré-requisitos

Antes de gerar arquivos, certifique-se de que você consegue responder, sem chutar:

- Qual o objetivo e o critério de sucesso?
- Onde mora no código? (rotas/componentes/arquivos afetados)
- Quais dados/integrações?
- Quais estados/edge cases?
- O que está fora de escopo?

Se faltar alguma resposta, peça **uma rodada curta** de esclarecimento ou redirecione para `/feature-planning`.

## Fluxo

### 1. Definir o slug
Escolha um slug curto, em `kebab-case`, único dentro de `specs/`. Verifique se a pasta já existe — se existir, pergunte se é para sobrescrever, complementar ou usar outro nome.

### 2. Criar `specs/<slug>/summary.md`
O "o quê" e o "por quê". Curto, leitura de 1 minuto.

```markdown
# <Nome da feature>

## Objetivo
<1–3 frases: problema, usuário, valor.>

## Escopo
**Dentro:**
- <bullet>
- <bullet>

**Fora:**
- <bullet>

## Critério de sucesso
- <observável e verificável; ex.: "ao clicar em Enviar, formulário valida e chama mailto:">
- <bullet>

## Suposições
- <lista, ou "nenhuma">

## Referências
- <links, mocks, issues, PRs, conversas — ou "nenhuma">
```

### 3. Criar `specs/<slug>/design.md`
O "como". Detalhado o suficiente para outra pessoa (ou outro Claude) implementar sem chutar.

```markdown
# Design — <Nome da feature>

## Visão geral
<2–4 frases descrevendo a abordagem técnica.>

## Arquivos afetados
- `src/components/foo.tsx` — <o que muda / é criado>
- `src/css/css_components/foo.module.css` — <o que muda / é criado>
- `public/...` — <assets adicionados>
- <etc>

## Estrutura de componentes
<árvore ou descrição: quem renderiza quem, server vs client component, props, estado.>

## Dados
- **Origem:** <hardcoded array / JSON em /public / API externa / env var>
- **Forma:** <interface TypeScript ou exemplo>
- **Quando carrega:** <build time / request time / client-side>

## Estilos
- Classes principais: <lista>
- Tokens/variáveis CSS reutilizadas: <lista>
- Breakpoints relevantes: <lista>

## Estados & comportamento
- **Default:** <descrição>
- **Loading:** <ou "n/a">
- **Vazio:** <ou "n/a">
- **Erro:** <ou "n/a">
- **Mobile:** <ajustes específicos>

## Acessibilidade
- <alts, foco, aria, contraste, navegação por teclado>

## Edge cases tratados
- <lista>

## Decisões e trade-offs
- <decisão> — <por quê> — <alternativas descartadas>

## Fora de escopo (não implementar agora)
- <lista>
```

### 4. Criar `specs/<slug>/tasks.md`
A checklist executável. **Cada item é um checkbox `[ ]`**, granular o suficiente para ser verificado em isolamento. Agrupe em fases lógicas.

```markdown
# Tasks — <Nome da feature>

> Marque os checkboxes ao executar via `/build-specs`. Não pule fases.

## Fase 1 — Setup
- [ ] <tarefa concreta, ex.: "Criar arquivo `src/components/contactForm.tsx` com componente vazio exportado">
- [ ] <tarefa>

## Fase 2 — Implementação
- [ ] <tarefa>
- [ ] <tarefa>
- [ ] <tarefa>

## Fase 3 — Estilos
- [ ] <tarefa>

## Fase 4 — Estados & edge cases
- [ ] <tarefa>

## Fase 5 — Integração na página
- [ ] <tarefa, ex.: "Importar e renderizar `<ContactForm />` em `src/app/page.tsx` após `<ContactSection />`">

## Fase 6 — Verificação
- [ ] `npm run lint` passa sem novos warnings
- [ ] `npm run build` passa (typecheck inclusive)
- [ ] Testar manualmente em `npm run dev` no desktop
- [ ] Testar manualmente em `npm run dev` em viewport mobile
- [ ] Conferir critério de sucesso do `summary.md`
```

Boas práticas para tasks:
- Comece cada item com um verbo (Criar, Adicionar, Atualizar, Mover, Remover, Testar).
- Cite o caminho do arquivo quando aplicável.
- Tarefa não é "implementar feature X"; é "adicionar handler `onSubmit` em `contactForm.tsx` que valida e chama `mailto:`".
- A última fase é **sempre** Verificação (lint, build, manual, critério).

### 5. Confirmar com o usuário
Após criar os três arquivos, mostre os caminhos e um resumo de 1–2 linhas de cada. Pergunte se quer ajustar algo antes de partir para `/build-specs`. **Não chame `/build-specs` automaticamente.**

## Anti-padrões a evitar

- Encher `summary.md` com detalhes técnicos — esses vão no `design.md`.
- `tasks.md` com 4 itens vagos ("implementar UI", "implementar lógica") — granularize.
- Esquecer a fase de verificação no final do `tasks.md`.
- Inventar arquivos/componentes que não existem sem checar a estrutura real do projeto.
- Conflitar com convenções do [CLAUDE.md](../../../CLAUDE.md) (ex.: propor styled-components quando o projeto usa CSS Modules).
- Criar a pasta dentro de `src/specs/` ou outro lugar — é sempre `specs/<slug>/` na raiz do projeto.
