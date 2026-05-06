# Tasks — Signature radicals

> Marque os checkboxes ao executar via `/build-specs`. Não pule fases.
> **Pré-requisito:** `polish-foundation` deve estar mergeada antes desta spec (depende do `--ease-premium`, `<RevealOnScroll>`, e auto-play do carrossel).

## Fase 1 — Setup (instalar Lenis)
- [x] Instalar `lenis` em `package.json` via `npm install lenis --legacy-peer-deps`
- [x] Confirmar que `lenis` aparece em `dependencies`

## Fase 2 — Smooth scroll com Lenis
- [x] Criar `src/components/smoothScroll.tsx` (`'use client'`):
  - [x] `useEffect` com `new Lenis({ duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 5) /* ease-out-quint */ })`
  - [x] `requestAnimationFrame` loop chamando `lenis.raf(time)`; cleanup destrói lenis no unmount
  - [x] Detectar `window.matchMedia('(prefers-reduced-motion: reduce)').matches` no mount; se true, **não inicializar Lenis** (retorna `<>{children}</>` direto)
  - [x] Renderiza `<>{children}</>` sempre (não cria wrapper DOM)
- [x] Em `src/app/[locale]/layout.tsx`, envolver `<NavBar />` + `<main>` com `<SmoothScroll>`

## Fase 3 — Glitch logo
- [x] Criar `src/css/css_components/glitch.module.css`
- [x] Criar `src/components/glitchLogo.tsx` (`'use client'`) com loop random + reduced-motion guard
- [x] Em `src/components/navbar.tsx`, envolver o `<Image src="/CalciferLogo.svg" ...>` com `<GlitchLogo>`
- [x] Verificar no build que o glitch não roda em SSR (componente é Client)

## Fase 4 — Parallax do vídeo Hero
- [x] Criar `src/hooks/useParallax.ts` (Client) com factor + reduced-motion guard + rAF throttling
- [x] Criar `src/components/heroVideoParallax.tsx` que renderiza `<video>` internamente com transform aplicado
- [x] Em `src/components/heroSection.tsx`, substituir o bloco `<video>` pelo `<HeroVideoParallax />`
- [x] Em `src/css/css_components/heroSection.module.css`, criar `.video_parallax` com `height: 110%` e `will-change: transform`

## Fase 5 — Cuts angulares entre sections
- [x] Em `src/css/css_components/aboutSection.module.css`: clip-path up-right + `margin-top: -3vh` em `min-width: 769px`
- [x] Em `src/css/css_components/projectSection.module.css`: clip-path up-left + `margin-top: -3vh`
- [x] Em `src/css/css_components/teamSection.module.css`: clip-path up-right + `margin-top: -3vh`
- [x] Em `src/css/css_components/contactSection.module.css`: criada classe nova `.outer` (full-bleed wrapper com background branco) com clip-path up-left + margin-top; aplicada no `<section id="contact">` em `contactSection.tsx`
- [x] Em `src/css/css_components/footer.module.css`: clip-path up-right + `margin-top: -3vh`
- [x] Verificar visualmente em `npm run dev` (owner) que cuts ficam visíveis e consistentes em desktop, e ausentes em mobile *(verificação visual pelo owner)*

## Fase 6 — Card central destacado no Team
- [x] Em `src/css/css_components/teamSection.module.css`: cards default `scale(0.92); opacity: 0.85`; `.card_active` reverte (`scale(1.05); opacity: 1; z-index: 1`); hover compostos preservados
- [x] Em `src/components/teamSection.tsx`: estado `centerIndex`; useEffect com listener de scroll + resize; calcula `getBoundingClientRect` de cada card e seleciona o mais próximo do `viewportCenter`
- [x] ProfileCard recebe prop `isActive?: boolean` e aplica `className={isActive ? Styles.card_active : ''}` na div root
- [x] Verificar com auto-play da spec anterior: o card ativo muda automaticamente conforme avança *(verificação visual pelo owner)*

## Fase 7 — Verificação
- [x] `npm run lint` passa sem novos warnings/erros
- [x] `npm run build` passa (typecheck inclusive); rotas `/pt`, `/en`, `/es` continuam SSG
- [x] `npm install lenis --legacy-peer-deps` funcionou e não introduziu vulnerabilidades críticas
- [x] Conferir critério de sucesso completo de [summary.md](summary.md) *(checks visuais ficam para o owner via `npm run dev`)*

> **Pra dev local:** owner roda `npm run dev` no terminal próprio. Itens visuais que precisam ser confirmados manualmente:
> - Parallax do vídeo Hero (scrollar e ver vídeo deslizando devagar)
> - Glitch do logo (esperar 8-15s na navbar e ver pulse)
> - Cuts angulares (visualizar transições entre sections em desktop)
> - Smooth scroll (rodar mouse wheel/trackpad e perceber suavização)
> - Card central destacado (carrossel do Team com card maior no centro)
> - `prefers-reduced-motion: reduce` ativado: parallax, glitch e smooth scroll desligados; cuts permanecem
