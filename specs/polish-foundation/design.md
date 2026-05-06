# Design — Polish foundation

## Visão geral
A maior parte da feature é CSS (animations, transitions, keyframes) com pequenos pedaços JS para coisas que CSS sozinho não resolve: detectar entrada na viewport (Intersection Observer), auto-play do carrossel (setInterval), e fade entre rotas (manipulação de classe no `<body>` ao trocar locale). Introduzimos um hook `useInView` reutilizável e um wrapper Client `<RevealOnScroll>` que envolve cada section. Animações respeitam `prefers-reduced-motion` em todos os pontos.

## Arquivos afetados

**Novos:**
- `src/hooks/useInView.ts` (Client) — hook genérico que retorna `[ref, inView]` usando IntersectionObserver
- `src/components/revealOnScroll.tsx` (Client) — wrapper que aplica classe `.in-view` quando entra na viewport
- `src/css/css_components/revealOnScroll.module.css` — keyframe fade+slide e classes base/in-view

**Modificados:**
- `src/app/[locale]/page.tsx` — envolver cada section com `<RevealOnScroll>`
- `src/app/[locale]/layout.tsx` — adicionar `<main>` wrapper para receber a classe de fade entre rotas
- `src/components/heroSection.tsx` — vídeo recebe className `.video_fadein`
- `src/components/aboutSection.tsx` — adicionar wrapper/classe na div do kicker para a linha animada
- `src/components/contactSection.tsx` — Phantom recebe classe `.phantom_floating`
- `src/components/teamSection.tsx` — adicionar auto-play via `useEffect` com `setInterval`, indicadores (dots), pause on hover
- `src/components/navbar.tsx` — ajustar timing/duração da transition (CSS); ancho ganha pseudo-element via CSS
- `src/components/languageSwitcher.tsx` — gerenciar classe `.locale-leaving` / `.locale-entering` no `document.body` via `useEffect` em mudança de pathname
- `src/css/css_components/heroSection.module.css` — keyframe para fade-in do vídeo
- `src/css/css_components/aboutSection.module.css` — pseudo-element `::after` no kicker para a linha
- `src/css/css_components/projectSection.module.css` — hover state nas tags
- `src/css/css_components/teamSection.module.css` — hover lift nos cards, estilos dos dots
- `src/css/css_components/contactSection.module.css` — keyframe da Phantom flutuante
- `src/css/css_components/navbar.module.css` — ajuste de transition + pseudo-element no anchor
- `src/css/style.css` — classes globais `.locale-leaving`/`.locale-entering`, regra global `prefers-reduced-motion`, var de easing

**Não modificados:**
- Footer, ProjectSection title (sem hover) — sem mudanças

## Estrutura de componentes

```
LocaleLayout (Server)
  └── <html lang>
       └── <body>
            └── NextIntlClientProvider
                 ├── <NavBar /> (Client, já existia)
                 └── <main className="locale-content">  ← wrapper novo para fade entre rotas
                       └── LocalePage (Server)
                             ├── <RevealOnScroll><HeroSection /></RevealOnScroll>
                             ├── <RevealOnScroll><AboutSection /></RevealOnScroll>
                             ├── <RevealOnScroll><ProjectSection /></RevealOnScroll>
                             ├── <RevealOnScroll><TeamSection /></RevealOnScroll>
                             ├── <RevealOnScroll><ContactSection /></RevealOnScroll>
                             └── <Footer />  ← sem reveal (footer não precisa de animação)
```

**`useInView` (hook):**
```ts
function useInView<T extends HTMLElement>(options?: { threshold?: number; once?: boolean }): [RefObject<T>, boolean]
```
- Cria `ref`, observa via IntersectionObserver, retorna `inView: boolean`
- Cleanup do observer no unmount
- Se `once: true` (default), desconecta após primeira entrada

**`<RevealOnScroll>` (Client):**
- Usa `useInView` e adiciona classe `Styles.in_view` ao seu div quando true
- Default: `display: contents` para não criar wrapper visual extra
- Props: `children`, `as?` (default `'div'`), `delay?` (ms para stagger entre sections)
- **No SSR:** renderiza com a classe inicial (escondido). No client mount, observer roda. Para evitar flash de conteúdo escondido se JS demora, fallback: após 100ms force `inView = true` se observer ainda não disparou? **Decisão:** confiar no observer. Em conexões muito lentas, o conteúdo aparece quando o JS carrega (aceitável para um site marketing).

**Carrossel Team auto-play:**
- Estado novo `isPaused: boolean` (já tem `useRef` carrousel)
- `useEffect` com `setInterval(() => avançar, 5000)` enquanto `!isPaused`
- `onMouseEnter` na `.teamSection` → `setIsPaused(true)`; `onMouseLeave` → `setIsPaused(false)`
- Função `avançar()` calcula `cardWidth + gap`, aplica `scrollLeft += cardWidth + gap`, ou `scrollTo(0)` se chegou no fim
- **Indicadores (dots):** estado `currentIndex`, atualizado via listener `scroll` no `.cards` (debounced) que calcula `Math.round(scrollLeft / cardWidthGap)`
- Cada dot é `<button>` clicável que faz `scrollTo(index * cardWidthGap)`

## Dados
- N/A — feature 100% client-side, sem dados externos

## Estilos

### Variável de easing global
Em `src/css/style.css`:
```css
:root {
    --ease-premium: cubic-bezier(0.22, 1, 0.36, 1);
}
```

### Reveal on scroll
```css
/* revealOnScroll.module.css */
.wrapper {
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 400ms var(--ease-premium), transform 400ms var(--ease-premium);
    will-change: opacity, transform;
}

.wrapper.in_view {
    opacity: 1;
    transform: translateY(0);
}
```

### Linha sob kicker (AboutSection)
```css
/* aboutSection.module.css */
.title_layout h3 {
    position: relative;
    padding-bottom: 8px;
}

.title_layout h3::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--Primary-Color, #EE9E3F);
    transition: width 350ms var(--ease-premium);
    transition-delay: 200ms; /* aparece depois do fade da section */
}

/* Aplicado quando a section está in-view (via class do RevealOnScroll wrapper) */
.in_view .title_layout h3::after {
    width: 64px;
}
```
**Nota:** A classe `.in_view` chega via `<RevealOnScroll>`. A regra `.in_view .title_layout h3::after` usa o seletor descendente.

### Hero — fade-in do vídeo
```css
.video_background {
    animation: video_fadein 600ms var(--ease-premium) forwards;
    opacity: 0;
}

@keyframes video_fadein {
    to { opacity: 1; }
}
```

### Navbar anchor — linha no hover
```css
.anchor {
    position: relative;
}
.anchor::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--Primary-Color, #EE9E3F);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 220ms var(--ease-premium);
}
.anchor:hover::after,
.anchor:focus-visible::after {
    transform: scaleX(1);
}
```

### Team — hover lift + dots
```css
.cards > * {
    transition: transform 200ms var(--ease-premium), box-shadow 200ms var(--ease-premium);
    cursor: default;
}
.cards > *:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.dots {
    display: flex;
    gap: 8px;
    padding-top: 12px;
    justify-content: center;
}
.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.25);
    border: none;
    padding: 0;
    cursor: pointer;
    transition: background 200ms var(--ease-premium), transform 200ms var(--ease-premium);
}
.dotActive {
    background: rgba(0, 0, 0, 0.85);
    transform: scale(1.2);
}
```

### Project tags — borda animada no hover
```css
.topic {
    position: relative;
    transition: background 200ms var(--ease-premium);
    border: 1px solid transparent;
}
.topic:hover {
    border-color: var(--Primary-Color, #EE9E3F);
}
```

### Phantom flutuando
```css
.image {
    animation: phantom_float 4s ease-in-out infinite;
}

@keyframes phantom_float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
}

@media (max-width: 768px) {
    .image {
        animation: none;  /* já é display: none, redundante mas explícito */
    }
}
```

### Navbar hide/reveal mais smooth
Atual: `transition: transform 220ms ease, ...`. Mudar para:
```css
.navbar {
    transition:
        transform 400ms var(--ease-premium),
        opacity 400ms var(--ease-premium),
        background 220ms ease,
        backdrop-filter 220ms ease;
}
.navbar.hidden {
    transform: translateY(-100%);
    opacity: 0;
}
```

### Fade entre rotas
Em `src/css/style.css` (global):
```css
main.locale-content {
    animation: locale_enter 250ms var(--ease-premium);
}

@keyframes locale_enter {
    from { opacity: 0; }
    to { opacity: 1; }
}

body.locale-leaving main.locale-content {
    opacity: 0;
    transition: opacity 150ms var(--ease-premium);
    animation: none;
}
```
A classe `locale-leaving` é setada pelo LanguageSwitcher via `document.body.classList.add('locale-leaving')` antes de chamar `router.replace`. Após a transição (re-mount no novo locale), a classe `locale-leaving` é removida (cleanup) e o `<main>` re-monta com `animation: locale_enter`.

### Reduced motion (global em style.css)
```css
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
```

## Estados & comportamento

- **Default scroll:** sections fora da viewport ficam com `opacity: 0; transform: translateY(12px)`. Ao entrar (threshold 0.15), recebem `.in_view` e animam para opacity 1 + Y0. AboutSection ganha extra: linha sob kicker cresce 0→64px com delay 200ms.
- **Hover em anchor da navbar:** linha laranja escala 0→1 da esquerda pra direita
- **Hover em card do Team:** elevação suave + sombra
- **Hover em tag do Project:** borda muda de transparente para laranja
- **Phantom no Contact:** flutua continuamente em desktop
- **Scroll para baixo (>80px) com hide-on-scroll:** navbar `transform: translateY(-100%) + opacity 0` em 400ms
- **Auto-play do carrossel:** avança a cada 5s; pausa quando mouse entra na `.teamSection` ou quando user toca/usa chevrons; retoma quando mouse sai
- **Carrossel chega no fim:** volta ao primeiro card (loop)
- **Dots:** clique navega direto pro card; dot ativo destaca via `scale(1.2)` e cor mais escura
- **Trocar idioma:** main fade-out (150ms) → router.replace → main fade-in (250ms)
- **prefers-reduced-motion: reduce:** todas as animations e transitions caem para 0.01ms (efetivamente instantâneas)

## Acessibilidade
- `prefers-reduced-motion: reduce` desliga todas as animações e auto-play do carrossel (parar `setInterval` quando `window.matchMedia('(prefers-reduced-motion: reduce)').matches` for true)
- Anchor com `:focus-visible` também dispara a linha (não só hover)
- Cards do Team com `:focus-within` ganham a elevação (em foco de teclado nos botões internos)
- Dots do carrossel são `<button>` com `aria-label="Ir para slide N"` (i18n) e `aria-current="true"` quando ativo
- Auto-play do carrossel **não interfere** com leitores de tela (sem ARIA live)
- Fade entre rotas não rouba foco; foco mantém-se onde estava (no LanguageSwitcher após selecionar)
- Navbar hide-on-scroll: enquanto hidden, anchor não recebe foco (`pointer-events: none` opcional)

## Edge cases tratados
- IntersectionObserver não disparando em sections já visíveis no mount: o observer dispara para elementos parcialmente visíveis ao mount com `threshold: 0.15` se uma fração estiver na viewport
- Section muito alta que excede a viewport (Hero com 100svh): funciona normalmente — quando o topo entra (`isIntersecting: true`), dispara
- Auto-play do carrossel + user clica chevron: handler dos chevrons já avança, mas é importante reset do timer pra não avançar 2x em sequência (chamar `clearInterval` + `setInterval` novamente)
- Trocar idioma duas vezes em sequência rápida: a segunda troca cancela a anterior (cleanup do timeout)
- `prefers-reduced-motion` ativado: setInterval do carrossel não inicia
- IntersectionObserver não suportado (browsers muito antigos): fallback fica com tudo visível (sem fade), via classe estática quando `IntersectionObserver === undefined`
- Hover lift no Team com Cards de tamanhos diferentes: o `translateY(-4px)` é uniforme
- Phantom em mobile: já tem `display: none`, animação não roda

## Decisões e trade-offs
- **`<RevealOnScroll>` com `display: contents` por padrão:** evita criar div extra que poderia interferir com layouts flex/grid. Trade-off: alguns browsers antigos têm bugs com `display: contents` em a11y (fixados em browsers modernos).
- **Hook `useInView` próprio em vez de lib (react-intersection-observer):** o hook é ~30 linhas, evita dep nova, e damos controle total sobre cleanup.
- **Fade entre rotas via classe no `<body>`:** alternativa seria CSS View Transitions API (`view-transition-name`) mais moderno, mas suporte é Chrome/Safari recentes; Firefox atrás de flag. Manter cross-browser com classe.
- **Dots refletem `currentIndex` derivado de `scrollLeft`:** alternativa seria gerenciar índice como state primário e o scroll seguir. Trade-off: derivar de scroll funciona com user scroll manual também.
- **Auto-play 5s:** padrão da indústria (3-7s). 5s é confortável pra ler nome+role.
- **Hover lift e box-shadow soft:** evita "flat" sem cair em material design exagerado
- **Linha sob kicker apenas em About:** outras sections não têm `<h3>` hoje. Quando tiverem, regra é facilmente replicável.
- **Não animar Footer:** texto único de copyright não precisa
- **`will-change` no wrapper do Reveal:** otimização para GPU; só aplicar antes da animação para não desperdiçar memória sempre

## Fora de escopo (não implementar agora)
- Parallax leve no vídeo do Hero
- Glitch sutil no logo
- Cuts angulares entre sections (clip-path)
- Smooth scroll com Lenis (lib)
- Card central destacado no carrossel (escala maior no card visível)
- Cursor custom
- Letter-by-letter no Hero h1
- Curtain effect entre rotas
- View Transitions API
- ARIA live region pro carrossel auto-play
- Indicador de loading entre rotas (skeleton)
