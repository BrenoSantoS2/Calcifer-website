# Design — Signature radicals

## Visão geral
Cinco efeitos independentes mas tematicamente alinhados (premium, marcante, "edgy"): parallax no Hero, glitch no logo da navbar, cuts angulares entre sections via `clip-path`, smooth scroll com Lenis, e card central destacado no carrossel do Team. Cada um é implementado de forma que possa ser desligado individualmente (via `prefers-reduced-motion` ou flag) sem quebrar o resto. Lenis é a única dependência nova; os outros são CSS + JS de baixo volume.

## Arquivos afetados

**Novos:**
- `src/components/smoothScroll.tsx` (Client) — wrapper Lenis no layout
- `src/components/glitchLogo.tsx` (Client) — wrapper que aplica classe `.glitching` ao logo da navbar em loop random
- `src/hooks/useParallax.ts` (Client) — hook que retorna offset Y baseado no scroll
- `src/css/css_components/glitch.module.css` — keyframes do glitch (RGB shift sutil)

**Modificados:**
- `src/app/[locale]/layout.tsx` — envolver `{children}` com `<SmoothScroll>`
- `src/components/heroSection.tsx` — vídeo passa pra Client Component pequeno (ou usa novo wrapper) com parallax aplicado
- `src/components/navbar.tsx` — substituir `<Image src="/CalciferLogo.svg" ...>` por `<GlitchLogo />` que envolve o Image
- `src/components/teamSection.tsx` — adicionar lógica de "card mais próximo do centro" → aplica classe `.card_active`
- `src/css/css_components/heroSection.module.css` — `.video_background` recebe `will-change: transform` e perde `position: absolute` fixo (continua mas com transform aplicado via inline style do hook)
- `src/css/css_components/teamSection.module.css` — adicionar `.card_active` (scale + opacity), inactive default (`scale(0.92); opacity: 0.85`); active reverte
- `src/css/css_components/navbar.module.css` — possíveis ajustes para receber o glitch container
- `src/css/style.css` — adicionar `body { overflow: hidden auto; }` se necessário pro Lenis; vars novas se preciso
- `package.json` — adicionar `lenis`

## Estrutura de componentes

```
LocaleLayout (Server)
  └── <html lang>
       └── <body>
            └── NextIntlClientProvider
                 ├── <SmoothScroll>          ← novo Client wrapper (Lenis)
                 │     ├── <NavBar />
                 │     │     └── <GlitchLogo>    ← novo Client envolve Image
                 │     │           └── <Image src="/CalciferLogo.svg" />
                 │     └── <main className="locale-content">
                 │           └── LocalePage (Server)
                 │                 ├── <RevealOnScroll><HeroSection /></RevealOnScroll>
                 │                 │     └── <HeroVideoParallax />  ← Client wrapper só do video
                 │                 ├── <RevealOnScroll><AboutSection /></RevealOnScroll>
                 │                 ├── ...
                 │                 └── <Footer />
```

**`<SmoothScroll>`:**
- `'use client'`
- `useEffect` cria instância `new Lenis({ duration: 1.2, easing: cubic-bezier matched ao `--ease-premium` })`
- `requestAnimationFrame` loop chama `lenis.raf(time)`
- Cleanup destrói no unmount
- Detecta `prefers-reduced-motion: reduce` no mount; se true, não inicializa Lenis (scroll volta ao nativo)

**`<GlitchLogo>`:**
- `'use client'`
- Estado `isGlitching: boolean`
- `useEffect` cria loop com `setTimeout` random entre 8-15s; quando dispara, `setIsGlitching(true)` por 200ms, depois `false`, e agenda próximo
- Renderiza `<div className={isGlitching ? Styles.glitching : ''}>{children}</div>`
- Detecta `prefers-reduced-motion` e não inicia o loop
- Em mobile (≤768px) não inicia (CSS já esconde a navbar nesse breakpoint, mas o efeito não precisa rodar)

**`useParallax(factor)`:**
- `'use client'`, hook que retorna `offsetY: number`
- Internamente usa `useEffect` com listener de scroll (passive); aplica `requestAnimationFrame` para limitar atualizações
- Retorna `window.scrollY * factor` (negativo invertido se quiser direção oposta)
- Detecta `prefers-reduced-motion` e retorna 0 sempre

**`<HeroVideoParallax>`:** wrapper Client só pro vídeo do Hero. Recebe a tag `<video>` como children e aplica `style={{ transform: 'translate3d(0, ${offsetY}px, 0)' }}` no wrapper; o pai mantém `position: absolute` no container do vídeo.

**Card central no Team:**
- Já tem `useRef` no `.cards`
- Adicionar listener de scroll (debounced via rAF) que mede o `getBoundingClientRect` de cada card
- Calcula distância entre `card.x + card.width/2` e `viewport.width/2`
- Card com menor distância recebe classe `Styles.card_active`
- Tipo de cálculo: rodar dentro de `requestAnimationFrame` para perf

## Dados
- N/A — feature 100% client-side, sem dados externos

## Estilos

### Glitch
```css
/* glitch.module.css */
.container {
    position: relative;
    display: inline-block;
}

.glitching {
    animation: glitch_main 200ms steps(2, end);
}

.glitching::before,
.glitching::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: inherit;
    /* technique: replicate logo with channel offsets */
}

@keyframes glitch_main {
    0%   { transform: translate(0, 0); filter: none; }
    20%  { transform: translate(-2px, 1px); filter: hue-rotate(15deg); }
    40%  { transform: translate(2px, -1px); filter: hue-rotate(-15deg); }
    60%  { transform: translate(-1px, 0); filter: none; }
    80%  { transform: translate(1px, 0); filter: hue-rotate(8deg); }
    100% { transform: translate(0, 0); filter: none; }
}
```

**Nota:** o efeito de "RGB shift" tradicional usa duplicação do conteúdo via pseudo-elements. Como o logo é uma `<Image>` SVG, alternativa mais simples é só translate + hue-rotate como acima. Visualmente OK pra um efeito sutil. Se quiser mais agressivo, futuro: usar `<img>` puro com mask ou recriar o logo em SVG inline.

### Parallax do vídeo (Hero)
```css
/* heroSection.module.css */
.video_parallax {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 110%;  /* extra altura compensa o offset máximo */
    will-change: transform;
}
.video_parallax video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```
Style inline no `.video_parallax` recebe `transform: translate3d(0, ${offsetY}px, 0)`.

### Cuts angulares entre sections
Cada section "abaixo" recebe `clip-path` cortado:
```css
/* aboutSection.module.css */
@media (min-width: 769px) {
    .about_section {
        clip-path: polygon(0 3%, 100% 0, 100% 100%, 0 100%);
        margin-top: -3vh;  /* compensa o vazio criado pelo clip */
    }
}
```
Próxima section corta na direção oposta:
```css
/* projectSection.module.css */
@media (min-width: 769px) {
    .project_section {
        clip-path: polygon(0 0, 100% 3%, 100% 100%, 0 100%);
        margin-top: -3vh;
    }
}
```
Alternar a cada section: about (down-right), project (down-left), team (down-right), contact (down-left), footer (down-right).

**Em mobile (≤ 768px):** sem clip-path para não quebrar leitura.

### Card central no Team
```css
/* teamSection.module.css */
.cards > * {
    transition: transform 350ms var(--ease-premium), opacity 350ms var(--ease-premium);
    transform: scale(0.92);
    opacity: 0.85;
}
.cards > .card_active {
    transform: scale(1.05);
    opacity: 1;
    z-index: 1;
}
```

**Nota:** combina com o hover da spec anterior (`translateY(-4px)`). Hover sobre um card central já ativo: ambos aplicam, transform combina (`scale(1.05) translateY(-4px)`).

### Reduced motion (extensão da regra global da Spec A)
A regra `@media (prefers-reduced-motion: reduce)` do `style.css` já neutraliza animations e transitions. Para o glitch e parallax que dependem de JS:
- Glitch: hook não inicia o loop
- Parallax: hook retorna 0
- Lenis: não inicializa
- Card central: continua aplicando classe (transição já fica em 0.01ms pela media query global)

## Estados & comportamento

- **Parallax Hero:** scroll → vídeo desliza visualmente menos que conteúdo. Em viewport mobile (≤768px) o efeito ainda funciona; trade-off de performance é aceitável (vídeo de fundo + transform GPU = ok)
- **Glitch logo:** ciclo random 8-15s; cada glitch dura 200ms; sem padrão previsível
- **Cuts:** estáticos, sempre presentes em desktop
- **Smooth scroll:** ativo em desktop e mobile com Lenis; respeitando reduced-motion
- **Card central:** muda conforme scrollLeft do `.cards`; auto-play da Spec A move continuamente, então o card central muda automaticamente

## Acessibilidade
- `prefers-reduced-motion: reduce` desliga parallax, glitch, smooth scroll
- Glitch é puramente visual, sem mudança de conteúdo (texto do logo continua acessível)
- Cuts angulares não afetam ordem do DOM nem foco
- Lenis: garantir que `tabindex`/foco continua funcionando para navegação por teclado; Lenis suporta isso por default
- Card central: classe `.card_active` é puramente visual; não usa `aria-current` (não há semântica de "selecionado") — é só destaque

## Edge cases tratados
- Lenis em conjunto com `scroll-behavior: smooth` global: Lenis controla, o nativo fica como fallback (Lenis remove a propriedade enquanto está ativo)
- Lenis e âncoras (`#about`, `#games`, `#contact`): Lenis intercepta `<a href="#...">` automaticamente
- Parallax overflow: vídeo tem `height: 110%` pra cobrir o offset máximo sem deixar gap embaixo
- Glitch durante scroll: sem problema; transform local não interfere
- Card central com viewport muito estreita (1 card visível): só esse card é "active"; OK
- Cuts em telas pequenas: desligados via media query (mantém leitura limpa)
- Lenis em iframe ou view embutida: Lenis cuida do escopo correto
- Build SSG: SmoothScroll é Client Component, não interfere com geração estática

## Decisões e trade-offs
- **Lenis (lib) vs DIY:** Lenis é battle-tested, ~5KB, tem suporte a touch + wheel + keyboard, integração simples. DIY com rAF dá ~50% do polish e demanda manutenção.
- **Cuts via `clip-path` em vez de SVG ou pseudo-elements:** clip-path tem suporte amplo, animável (não usaremos animação), mais simples que pseudo-elements com `transform: skew`.
- **Glitch sutil em vez de "datamosh"/heavy:** o tom é premium, não trash. Hue-rotate + translate é suficiente.
- **Parallax fator 0.3:** valor conservador. Maior (0.5+) começa a atrapalhar leitura; menor (0.1) é imperceptível.
- **Card central detectado via scrollLeft em vez de IntersectionObserver:** scroll é mais responsivo e preciso pra cards horizontais.
- **Glitch só na navbar desktop:** decisão do owner; mobile fica como tá.
- **Cuts angulares de 3° em vez de mais:** maiores (5°+) ficam "shoutado" e podem cortar conteúdo importante em viewports estreitas.
- **Não usar GSAP/ScrollTrigger:** Lenis cobre o smooth scroll; outras animações já têm CSS+rAF custom; GSAP seria overkill (~50KB).
- **Sequência da implementação importa:** Parallax + Lenis precisam ser testados juntos pra garantir que o offset do parallax considera o scroll real (não o scroll virtual do Lenis). Lenis emite event `scroll` com o `scroll` virtual, que é o que o `useParallax` deve escutar.

## Fora de escopo (não implementar agora)
- Cursor custom (rejeitado pelo owner)
- Letter-by-letter / wipe horizontal no Hero
- Curtain effect entre rotas
- Glitch em outros elementos (logo mobile, h1 do Hero, etc.)
- Parallax em texto, imagens da Phantom, ou outros elementos
- Cuts angulares com formas mais complexas (S-curves, ondas)
- ScrollTrigger / GSAP
- Lenis com configurações customizadas avançadas
- Animações 3D (Three.js, Spline)
- Sticky elements no scroll
- Reveal vibrant para o card central (efeito de "lampejo" ao virar central)
