# Tasks — Polish foundation

> Marque os checkboxes ao executar via `/build-specs`. Não pule fases.

## Fase 1 — Setup base (var de easing + reduced motion + chaves i18n)
- [x] Adicionar `--ease-premium: cubic-bezier(0.22, 1, 0.36, 1);` no bloco `:root` de `src/css/style.css`
- [x] Adicionar bloco `@media (prefers-reduced-motion: reduce)` em `src/css/style.css` neutralizando animations/transitions globalmente (duração 0.01ms)
- [x] Adicionar chaves i18n em `messages/pt.json`, `messages/en.json`, `messages/es.json`:
  - `team.dotLabel` → "Ir para slide {n}" (PT) / "Go to slide {n}" (EN) / "Ir al slide {n}" (ES)

## Fase 2 — Hook useInView e wrapper RevealOnScroll
- [x] Criar `src/hooks/useInView.ts` (Client) exportando hook genérico `useInView<T>` com IntersectionObserver, threshold default 0.15, opção `once: true` por default, cleanup no unmount, fallback se `IntersectionObserver` não suportado (sempre `inView: true`)
- [x] Criar `src/components/revealOnScroll.tsx` (`'use client'`) que usa `useInView`, renderiza `<div>` (default) com classe combinada base + `.in_view` quando visível
- [x] Criar `src/css/css_components/revealOnScroll.module.css` com `.wrapper` (opacity 0, translateY 12px, transition opacity+transform 400ms `var(--ease-premium)`, will-change opacity transform) e `.in_view` (opacity 1, translateY 0)

## Fase 3 — Aplicar RevealOnScroll nas sections
- [x] Em `src/app/[locale]/page.tsx`: importar `<RevealOnScroll>` e envolver cada uma das 5 sections (Hero, About, Project, Team, Contact). **Footer fica sem reveal.**
- [x] Verificar visualmente em build que cada section anima entrada uma vez ao scroll *(verificação visual pelo owner)*

## Fase 4 — Hero: fade-in do vídeo
- [x] Em `src/css/css_components/heroSection.module.css`, adicionar `animation: video_fadein 600ms var(--ease-premium) forwards; opacity: 0;` no `.video_background`
- [x] Adicionar `@keyframes video_fadein { to { opacity: 1; } }` no mesmo arquivo

## Fase 5 — Linha sob kicker do About
- [x] Em `src/css/css_components/aboutSection.module.css`, adicionar `.title_layout h3` com `position: relative; padding-bottom: 8px`
- [x] Adicionar pseudo-element `.title_layout h3::after` com width 0, height 1px, background `var(--Primary-Color, #EE9E3F)`, transition width 350ms `var(--ease-premium)` com delay 200ms
- [x] Implementar prop `inViewClassName` em `src/components/revealOnScroll.tsx`
- [x] Em `aboutSection.module.css`, adicionar regra `.in_view` exportável e seletor `.in_view .title_layout h3::after { width: 64px; }`
- [x] Em `src/components/aboutSection.tsx`, NÃO mudar o JSX — a classe vem do wrapper RevealOnScroll. Em `src/app/[locale]/page.tsx`, passar `inViewClassName={AboutStyles.in_view}` no `<RevealOnScroll>` que envolve `<AboutSection />`.

## Fase 6 — Hovers (Navbar anchor + Team cards + Project tags)

### Navbar anchor (linha)
- [x] Em `src/css/css_components/navbar.module.css`, adicionar `position: relative` ao `.anchor` (se não tiver)
- [x] Adicionar pseudo-element `.anchor::after` com `bottom: -4px; left: 0; right: 0; height: 1px; background: var(--Primary-Color, #EE9E3F); transform: scaleX(0); transform-origin: left; transition: transform 220ms var(--ease-premium)`
- [x] Adicionar regras `.anchor:hover::after` e `.anchor:focus-visible::after` com `transform: scaleX(1)`

### Team cards (lift)
- [x] Em `src/css/css_components/teamSection.module.css`, adicionar `.cards > * { transition: transform 200ms var(--ease-premium), box-shadow 200ms var(--ease-premium); }`
- [x] Adicionar `.cards > *:hover { transform: translateY(-4px); box-shadow: 0 8px 16px rgba(0,0,0,0.15); }`

### Project tags (borda animada)
- [x] Em `src/css/css_components/projectSection.module.css`, atualizar `.topic` adicionando `border: 1px solid transparent; transition: border-color 200ms var(--ease-premium), background 200ms var(--ease-premium)`
- [x] Adicionar `.topic:hover { border-color: var(--Primary-Color, #EE9E3F); }`

## Fase 7 — Phantom flutuando
- [x] Em `src/css/css_components/contactSection.module.css`, adicionar `animation: phantom_float 4s ease-in-out infinite` no `.image`
- [x] Adicionar `@keyframes phantom_float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }` no mesmo arquivo

## Fase 8 — Navbar hide/reveal mais smooth
- [x] Em `src/css/css_components/navbar.module.css`, atualizar `.navbar` `transition` para `transform 400ms var(--ease-premium), opacity 400ms var(--ease-premium), background 220ms ease, backdrop-filter 220ms ease`
- [x] Atualizar `.navbar.hidden` adicionando `opacity: 0` (já tem `transform: translateY(-100%)`)

## Fase 9 — Fade entre rotas (i18n)
- [x] Em `src/app/[locale]/layout.tsx`, envolver `{children}` com `<main className="locale-content">` (substituir o renderização atual). Garantir que continua passando children corretamente.
- [x] Em `src/css/style.css` (global), adicionar:
  - `main.locale-content { animation: locale_enter 250ms var(--ease-premium); }`
  - `@keyframes locale_enter { from { opacity: 0; } to { opacity: 1; } }`
  - `body.locale-leaving main.locale-content { opacity: 0; transition: opacity 150ms var(--ease-premium); animation: none; }`
- [x] Em `src/components/languageSwitcher.tsx`, no `handleSelect`: antes de chamar `router.replace`, executar `document.body.classList.add('locale-leaving')`; usar `setTimeout(() => router.replace(...), 150)`
- [x] Adicionar `useEffect` em `languageSwitcher.tsx` que escuta mudança de `pathname`/`locale`: ao mudar, executar `document.body.classList.remove('locale-leaving')` (re-mount já dispara o keyframe `locale_enter`)

## Fase 10 — Carrossel auto-play + dots

### Auto-play
- [x] Em `src/components/teamSection.tsx`, adicionar estado `isPaused` (init `false`)
- [x] Adicionar `useEffect` que cria `setInterval` a cada 5000ms enquanto `!isPaused`. O interval chama uma função `goNext()` que avança scrollLeft em `cardWidth + 64`; se `scrollLeft + viewport >= scrollWidth` (chegou no fim), faz `scrollTo(0)`. Cleanup limpa o interval.
- [x] Adicionar `useEffect` que checa `window.matchMedia('(prefers-reduced-motion: reduce)').matches` e, se true, força `setIsPaused(true)` (e o interval nunca dispara)
- [x] Adicionar `onMouseEnter={() => setIsPaused(true)}` e `onMouseLeave={() => setIsPaused(false)}` no `<section>` ou `.teamSection` div
- [x] Quando user clica chevron (handleLeftClick/handleRightClick), o auto-play já é pausado pelo `onMouseEnter` no container *(reset explícito do timer não é necessário porque mouse está dentro = pausado)*

### Dots (indicadores)
- [x] Adicionar estado `currentIndex` (init 0) em `teamSection.tsx`
- [x] Adicionar listener de scroll no ref do `.cards` (useEffect com cleanup) que calcula `Math.round(scrollLeft / (cardWidth + 64))` e atualiza `currentIndex`
- [x] Renderizar uma `<div className={Styles.dots}>` com `teamMembers.length` `<button>` filhos. Cada botão tem `className` que inclui `Styles.dot` e (se ativo) `Styles.dotActive`, `aria-label={t("dotLabel", { n: index + 1 })}`, `aria-current={isActive ? "true" : undefined}`, `onClick` que faz `scrollTo(index * (cardWidth + 64))`
- [x] Posicionar a `.dots` div entre `.cards` e `.chevrons` no JSX
- [x] Em `teamSection.module.css`, adicionar estilos `.dots`, `.dot`, `.dotActive` conforme [design.md](design.md)

## Fase 11 — Verificação
- [x] `npm run lint` passa sem novos warnings/erros
- [x] `npm run build` passa (typecheck inclusive); rotas `/pt`, `/en`, `/es` continuam SSG
- [x] Conferir critério de sucesso completo de [summary.md](summary.md) *(checks visuais ficam para o owner via `npm run dev`)*

> **Pra dev local:** owner roda `npm run dev` no terminal próprio (não subimos dev em background). Itens visuais (animação real, hovers, auto-play, transição entre locales) precisam ser confirmados manualmente.
