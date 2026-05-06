# Signature radicals — efeitos premium e marcantes

## Objetivo
Adicionar uma camada de efeitos visuais "marcantes" sobre a base da `polish-foundation`: parallax, glitch, cuts angulares, smooth scroll e destaque do carrossel. São os elementos que vão diferenciar o site de um site de marketing genérico — assinatura visual. Pretende dar identidade ao Calcifire Studios alinhada com o universo "Inferno de Dante" do flagship.

## Escopo

**Dentro:**

*Hero*
- **Parallax leve no vídeo de fundo** — vídeo desliza 30% mais devagar que o scroll (fator 0.3), criando sensação de profundidade

*Logo*
- **Glitch sutil no logo da navbar** (desktop only) — dispara aleatoriamente a cada 8-15s, duração ~200ms, efeito split-color/desync (RGB shift) feito 100% em CSS

*Estrutura*
- **Cuts angulares entre sections** — borda em diagonal de 3° entre cada par de sections consecutivas, alternando direção (uma pra cima, próxima pra baixo). Transições: Hero→About, About→Project, Project→Team, Team→Contact, Contact→Footer. Implementação via `clip-path` na section seguinte.

*Scroll*
- **Smooth scroll com Lenis** — wrapper Client `<SmoothScroll>` no `[locale]/layout.tsx`; valores default (duration ~1.2s, easing premium); compatível com `scroll-behavior: smooth` que já existe (Lenis substitui o nativo)

*Carrossel*
- **Card central destacado** — no Team carousel, o card mais próximo do centro do viewport ganha `scale(1.05)`; cards laterais ficam com `scale(0.92)` e `opacity: 0.85`. Funciona em conjunto com o auto-play da spec anterior.

**Fora:**
- Cursor custom (rejeitado pelo owner)
- Letter-by-letter / wipe horizontal no Hero
- Curtain effect entre rotas
- Dust/embers no Hero
- Glitch em outros logos (mobile Hero ficou de fora)
- Cuts angulares mais agressivos (>5°) ou com formas irregulares
- Parallax em texto, imagens ou outros elementos além do vídeo Hero
- Lenis com configurações customizadas avançadas (orientation, gestureOrientation)
- ScrollTrigger / GSAP — fica fora do escopo desta feature

## Critério de sucesso
- Ao scrollar a página com o vídeo do Hero visível, o vídeo desliza visivelmente mais devagar do que o resto do conteúdo (parallax perceptível mas não exagerado)
- Em qualquer momento aleatório a cada 8-15s, o logo da navbar tem um "glitch" sutil de ~200ms (não é constante, surpreende)
- Cada transição entre sections tem um corte diagonal sutil (3°), perceptível ao olhar mas não chamativo
- O scroll do site (mouse wheel, trackpad, link âncora) é visivelmente mais suave que o nativo — ainda responsivo, sem lag, mas com "easing"
- No carrossel do Team, o card central é maior que os laterais; ao scrollar/auto-play, a "lupa" se move
- Com `prefers-reduced-motion: reduce` ativo: parallax, glitch e Lenis ficam desligados (cuts permanecem porque são estáticos)
- `npm run lint` e `npm run build` passam
- Lenis carregado como dependência adicional (~5KB) sem impactar significativamente o LCP

## Suposições
- Parallax fator: **0.3** (vídeo se move 30% do que o scroll real); implementado via `transform: translate3d(0, var(--scroll-y) * 0.3, 0)` ou similar com `requestAnimationFrame`
- Glitch frequência: random entre **8000ms e 15000ms**; duração: **200ms**
- Glitch técnica: keyframe CSS com `text-shadow` / `filter: hue-rotate` / pequenos translates em microframes; trigger via classe adicionada/removida via `setTimeout` em loop
- Cuts angulares: **3°**, alternando: 1ª transição corta pra cima na próxima section, 2ª corta pra baixo, etc. Implementação: `clip-path: polygon(...)` na section que está abaixo na ordem visual
- Cuts não aplicam em mobile ≤ 768px (deixar reto pra não quebrar legibilidade)
- Lenis versão `^1.x` (atual estável); modo wheel + touch
- Card central destacado: detecta o card cujo centro está mais próximo do centro do `.cards`; aplica classe `.card_active`
- A ordem das specs assume que `polish-foundation` foi mergeada — esta spec depende dela (auto-play do carrossel, RevealOnScroll, easing premium)
- Glitch só roda em desktop (mobile não tem navbar visível, então não tem logo pra glitchar)

## Referências
- Conversa de planejamento: `/feature-planning` na sessão de 2026-05-06 (mesma do `polish-foundation`)
- Spec irmã (pré-requisito): `polish-foundation`
- Lenis: https://github.com/darkroomengineering/lenis
- Parallax pattern: `transform: translate3d` em rAF para evitar layout thrashing
