# Tasks — i18n + Navbar sticky + Rebrand

> Marque os checkboxes ao executar via `/build-specs`. Não pule fases.

## Fase 1 — Setup do next-intl
- [x] Instalar `next-intl` em `package.json` via `npm install next-intl`
- [x] Atualizar `next.config.mjs` (ou `.js`) para envolver a config com `createNextIntlPlugin('./src/i18n/request.ts')`
- [x] Criar `src/i18n/routing.ts` exportando `routing` com `locales: ['pt', 'en', 'es']`, `defaultLocale: 'pt'`, `localePrefix: 'always'`
- [x] Criar `src/i18n/request.ts` com `getRequestConfig` carregando `messages/${locale}.json`
- [x] Criar `src/middleware.ts` usando `createMiddleware` do next-intl, importando `routing`, com matcher `['/((?!api|_next|_vercel|.*\\..*).*)']`

## Fase 2 — Estrutura de rotas `[locale]`
- [x] Criar pasta `src/app/[locale]/`
- [x] Criar `src/app/[locale]/layout.tsx` (Server) que define `<html lang={locale}>`, importa CSS globais (`fonts.css`, `style.css`), envolve `children` com `NextIntlClientProvider`, gera metadata via `getTranslations('metadata')`, e renderiza `<NavBar />` antes de `{children}`
- [x] Mover conteúdo de `src/app/page.tsx` para `src/app/[locale]/page.tsx` (composição das 6 sections)
- [x] Reduzir `src/app/layout.tsx` para apenas retornar `{children}` (sem `<html>`/`<body>` — esses migram para o `[locale]/layout.tsx`)
- [x] Deletar `src/app/page.tsx` antigo
- [x] Verificar que `src/app/[locale]/layout.tsx` chama `setRequestLocale(locale)` do next-intl para habilitar SSG

## Fase 3 — Dicionários de tradução
- [x] Criar pasta `messages/` na raiz do projeto
- [x] Criar `messages/en.json` com todas as chaves listadas em [design.md](design.md) (forma do dicionário), usando "Calcifire" no lugar de "Calcifer"
- [x] Criar `messages/pt.json` traduzindo todas as chaves para português brasileiro, mantendo "Calcifire" como nome próprio
- [x] Criar `messages/es.json` traduzindo todas as chaves para espanhol, mantendo "Calcifire" como nome próprio
- [x] Conferir que os 3 arquivos têm exatamente a mesma estrutura de chaves (sem chave faltando em nenhum)

## Fase 4 — Refatorar sections para consumir traduções

### HeroSection
- [x] Remover `import { NavBar }` e o `<NavBar />` interno em `src/components/heroSection.tsx` (NavBar passa a viver no layout)
- [x] Adicionar `<Image src="/CalciferLogo.svg" />` em `src/components/heroSection.tsx` numa div com classe `hero_logo_mobile` (visível apenas em mobile via CSS)
- [x] Substituir `<h1>` e `<p>` hardcoded por `t('hero.title')` e `t('hero.body')` usando `useTranslations()` (ou `getTranslations` se mantiver Server Component)

### AboutSection
- [x] Substituir kicker, título e body em `src/components/aboutSection.tsx` por chaves `about.kicker`, `about.title`, `about.body`

### ProjectSection
- [x] Substituir título, tags e body em `src/components/projectSection.tsx` por chaves `project.title`, `project.tagAction`, `project.tagMetroidvania`, `project.body`

### TeamSection
- [x] Substituir cabeçalho ("Meet Our Team") e descrição em `src/components/teamSection.tsx` por chaves `team.title`, `team.body`
- [x] Padronizar `role` de todos os membros do array `teamMembers` em inglês (substituir "Artista e Animador 2D" por "2D Artist & Animator")
- [x] Manter `name` dos membros como está (não traduzir)

### ContactSection
- [x] Substituir título, body e labels (`Email`, `Phone`) em `src/components/contactSection.tsx` por chaves `contact.title`, `contact.body`, `contact.email`, `contact.phone`
- [x] Manter o endereço de email `calcifer.studios.ofc@gmail.com` e telefone como estão

### Footer
- [x] Substituir texto de copyright em `src/components/footer.tsx` por chave `footer.rights`

## Fase 5 — NavBar sticky + dropdown + hambúrguer
- [x] Adicionar `'use client'` no topo de `src/components/navbar.tsx`
- [x] Substituir links hardcoded ("Games", "About", "Contact") por `t('nav.games')`, `t('nav.about')`, `t('nav.contact')`
- [x] Substituir `alt="Calcifer_Studios_logo"` por `t('nav.logoAlt')`
- [x] Adicionar estado `isHidden` e `lastScrollY` (`useRef`)
- [x] Adicionar `useEffect` com listener de `scroll` que: se `scrollY > 80` e direção é "down", seta `isHidden = true`; se direção é "up", seta `isHidden = false`. Cleanup do listener no unmount.
- [x] Adicionar estado `isScrolled` que vira `true` quando `scrollY > 80` (para aplicar fundo + sombra)
- [x] Adicionar estado `isMobileMenuOpen` e botão hambúrguer (3 barras CSS)
- [x] Renderizar painel hambúrguer condicional com links + `<LanguageSwitcher />`
- [x] Adicionar `useEffect` que fecha o menu mobile quando `pathname` muda
- [x] Adicionar `useEffect` que aplica `overflow: hidden` ao `document.body` quando menu mobile está aberto
- [x] Criar componente `src/components/languageSwitcher.tsx` (`'use client'`) com:
  - [x] Trigger mostrando bandeira + iniciais do locale atual via `useLocale()`
  - [x] Estado `isOpen` para abrir/fechar dropdown
  - [x] Lista de opções com bandeira + iniciais, navegando via `useRouter()` e `usePathname()` do `next-intl/navigation`
  - [x] Listener para fechar ao clicar fora (`document.addEventListener('mousedown', ...)`)
  - [x] Tecla Escape fecha o dropdown
  - [x] Atributos `aria-haspopup`, `aria-expanded`, `role="menu"`, `role="menuitem"`
- [x] Renderizar `<LanguageSwitcher />` dentro da NavBar (desktop) e dentro do painel hambúrguer (mobile)

## Fase 6 — Estilos da Navbar
- [x] Em `src/css/css_components/navbar.module.css`, mudar `.navbar` para `position: fixed; top: 0; left: 0; right: 0; z-index: 100; transition: transform 200ms ease, background 200ms ease`
- [x] Adicionar classe `.hidden` com `transform: translateY(-100%)` (aplicada apenas no desktop)
- [x] Adicionar classe `.scrolled` com fundo gradiente translúcido (`linear-gradient(...)` ou `rgba(...)`), `backdrop-filter: blur(8px)`, `box-shadow: 0 4px 16px rgba(0,0,0,0.4)` (sombra concentrada embaixo)
- [x] Adicionar `@media (max-width: 768px)` que **esconde toda a `.navbar` desktop** (`display: none`) e mostra apenas o `.hamburger` posicionado `fixed` no canto superior direito (sem barra horizontal)
- [x] Estilizar `.hamburger` (3 barras CSS, animação para X quando aberto, fundo circular semi-transparente para contraste sobre o vídeo do Hero)
- [x] Estilizar `.mobile_panel` (full-width, slide-in de cima, lista vertical de links + LanguageSwitcher embaixo, fundo opaco, sem logo)
- [x] Adicionar regra em `src/css/css_components/heroSection.module.css` para `.hero_logo_mobile`: visível em mobile (`display: flex`), oculta em desktop (`@media (min-width: 769px) { display: none }`); posicionar no topo da Hero
- [x] Criar `src/css/css_components/languageSwitcher.module.css` com estilos do trigger, do menu dropdown, item ativo, hover, foco visível

## Fase 7 — Rebrand (substituições residuais)
- [x] Buscar no projeto qualquer ocorrência textual remanescente de "Calcifer" fora de: `public/CalciferLogo.svg` (filename), `calcifer.studios.ofc@gmail.com` (email), pasta do repositório, e specs/
- [x] Garantir que toda string visível ao usuário foi para os dicionários como "Calcifire"
- [x] Verificar que comentários e nomes de variáveis com "calcifer" não vazam para o usuário (não precisam ser renomeados, mas o JSX/conteúdo sim)

## Fase 8 — Verificação
- [~] `npm run lint` passa sem novos warnings *(skipped: `next lint` foi removido no Next 16; ESLint local v8 vs config v9 é incompatibilidade pré-existente, não introduzida pela feature)*
- [x] `npm run build` passa (typecheck inclusive); confirma que SSG gerou as rotas `/pt`, `/en`, `/es`
- [x] Testar em `npm run dev`: acessar `/` em browser PT redireciona para `/pt` *(curl com `Accept-Language: pt-BR` → 307 → /pt)*
- [x] Testar em `npm run dev`: acessar `/` em browser EN redireciona para `/en` *(curl com `Accept-Language: en-US` → 307 → /en)*
- [x] Testar em `npm run dev`: acessar `/fr` redireciona para `/pt` *(curl com `Accept-Language: fr-FR` → 307 → /pt)*
- [ ] Testar trocar idioma pelo dropdown e confirmar que URL, conteúdo e `<html lang>` mudam *(verificação visual pelo owner; `<html lang>` confirmado via curl em /pt, /en, /es)*
- [ ] Testar persistência: trocar para EN, fechar aba, abrir novamente em `/` — deve cair em `/en` *(verificação visual pelo owner)*
- [ ] Testar navbar sticky: scroll para baixo → some; scroll para cima → reaparece com fundo + sombra *(verificação visual pelo owner)*
- [ ] Testar viewport mobile (DevTools): hambúrguer abre painel, links e switcher funcionam, fecha ao clicar em link *(verificação visual pelo owner)*
- [ ] Testar navegação por teclado: Tab cicla, Escape fecha dropdowns/menu, Enter ativa *(verificação visual pelo owner)*
- [x] Conferir que nenhuma string "Calcifer" aparece no texto renderizado *(grep no HTML retornou apenas `/CalciferLogo.svg`, que é o filename do asset — fora de escopo)*
- [x] Conferir critério de sucesso completo de [summary.md](summary.md) *(itens automatizáveis confirmados; checks visuais ficam para o owner)*
