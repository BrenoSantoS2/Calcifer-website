# AGENT.md

Guia para o Agente de IA (Trae/Gemini) trabalhar de forma eficiente neste repositório.

## Visão geral

**Calcifer Studios Website** — site institucional/marketing do estúdio de jogos Calcifer Studios.
- **Tipo:** Site estático/marketing (Next.js App Router).
- **Agente:** Este projeto usa o Trae IDE com Gemini-3-Flash-Preview.
- **Pasta .trae-agent:** Contém "Skills" (Build Specs, Create Specs, Feature Planning) que devem ser seguidas rigorosamente.

## Comandos Principais

```bash
npm run dev     # dev server em http://localhost:3000
npm run build   # build de produção (inclui typecheck e lint)
npm run start   # servir build
npm run lint    # next lint (ESLint)
```

## Stack & Convenções

- **Next.js 14.2.3**, React 18, TypeScript, CSS Modules.
- **Server Components por padrão.** `'use client'` apenas se necessário.
- **Estilos:** Apenas CSS Modules (`*.module.css`). Classes em `snake_case`.
- **Imagens:** Sempre `next/image` com `alt`.
- **Mídia:** Vídeos em `/public/videos/` via tag `<video>`. Preferencialmente `.webm` para performance.

## Estrutura

```
src/
├── app/
│   ├── layout.tsx        # RootLayout, metadata global
│   ├── page.tsx          # Página única (compõe as sections)
│   └── favicon.ico
├── components/           # Uma section por arquivo (PascalCase no nome da função, camelCase no arquivo)
│   ├── navbar.tsx
│   ├── heroSection.tsx
│   ├── aboutSection.tsx
│   ├── projectSection.tsx
│   ├── teamSection.tsx   # único 'use client' (carrossel com useRef)
│   ├── contactSection.tsx
│   └── footer.tsx
└── css/
    ├── style.css         # estilos globais (h1, h2, h3, p, body, scrollbar)
    ├── fonts.css         # @font-face do Inter
    └── css_components/
        └── *.module.css  # um módulo por section

public/
├── CalciferLogo.svg, Email.svg, Telephone.svg, Linkedin.svg, Instagram.svg, chevron.svg
├── Phanthom.png
├── time/                 # fotos do time (.png, mesmo nome do membro)
└── videos/               # bg_video.mp4, bg2_video.mp4 (backgrounds das sections)
```

## Convenções

### Componentes
- **Server Components por padrão.** Use `'use client'` apenas quando precisar de hooks/eventos do navegador (ex.: [src/components/teamSection.tsx](src/components/teamSection.tsx) usa `useRef` para o carrossel).
- Cada section exporta uma função nomeada (`export function HeroSection()`), não default export.
- Arquivos em `camelCase.tsx`, função em `PascalCase`.
- Não criar `index.ts` de barrel — importe direto do arquivo.

### Estilos
- **Sempre CSS Modules** para estilos de componente: `import Styles from "../css/css_components/X.module.css"` e `className={Styles.foo}`.
- Não usar Tailwind, styled-components, ou inline-styles para coisas estruturais.
- Cores/tipografia base ficam em [src/css/style.css](src/css/style.css). Variáveis CSS quando fizer sentido (ex.: `var(--Base, #393838)`).
- Convenção dos nomes de classe: `snake_case` (ex.: `video_filter`, `text_layout`). Mantenha por consistência.

### Imagens e mídia
- Usar `next/image` (`Image` de `'next/image'`) com `width`/`height` explícitos.
- Vídeos de background são `<video autoPlay muted loop>` apontando para `/videos/*.mp4` em `public/`.
- SVGs ficam em `public/` e são consumidos via `<Image src="/X.svg" />`.

### TypeScript
- `strict: true`. Tipar props com `type FooProps = { ... }` (ver [src/components/teamSection.tsx:109](src/components/teamSection.tsx#L109)).
- Path alias `@/*` → `./src/*` está configurado mas atualmente os componentes usam imports relativos (`../`); mantenha o estilo do arquivo que está editando.

### Acessibilidade
- Sempre `alt` em `<Image>`. Strings vazias só quando a imagem é decorativa (ex.: [src/components/contactSection.tsx:8](src/components/contactSection.tsx#L8)).
- Links externos: `target="_blank" rel="noopener noreferrer"`.

## Como editar conteúdo comum

**Adicionar membro do time:** editar o array `teamMembers` em [src/components/teamSection.tsx:28](src/components/teamSection.tsx#L28). Colocar a foto em `public/time/<Nome>.png` (200x200, mesmo padrão dos demais).

**Trocar copy do Hero / About / Project:** editar diretamente o JSX da section correspondente em `src/components/`. Não há CMS.

**Trocar contatos:** [src/components/contactSection.tsx](src/components/contactSection.tsx) (e-mail e telefone hardcoded).

**Trocar vídeos de background:** substituir `/public/videos/bg_video.mp4` (Hero) ou `/public/videos/bg2_video.mp4` (Projects).

**Alterar metadata/SEO:** [src/app/layout.tsx](src/app/layout.tsx).

## Skills disponíveis neste projeto

Workflow recomendado para features novas:

1. **`/feature-planning`** — joga uma ideia, o Claude faz perguntas até o escopo ficar 100% claro.
2. **`/create-specs`** — gera `specs/<feature>/{summary.md, design.md, tasks.md}` a partir da conversa.
3. **`/build-specs`** — implementa seguindo `tasks.md`, marcando os checkboxes conforme avança.

Skills ficam em [.claude/skills/](.claude/skills/) e são versionadas com o repo.

## Coisas para evitar

- Adicionar dependências sem necessidade (o projeto é leve de propósito).
- Criar um framework de design system / abstrações genéricas — o site tem 6 sections, edite direto.
- Tornar Server Components em Client Components sem necessidade.
- Misturar CSS global e CSS Module para a mesma propriedade de um componente (preferir o módulo).
- Quebrar a responsividade ao mexer em uma section sem checar mobile (testar visualmente em `npm run dev`).
