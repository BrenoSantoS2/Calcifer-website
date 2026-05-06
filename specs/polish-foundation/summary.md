# Polish foundation — animações e hovers

## Objetivo
Adicionar uma camada de animações sutis e hover states que tornam o site "vivo" sem cair em playful, alinhado com o tom premium/radical do estúdio. Foco em micro-detalhes que recompensam atenção sem gritar por ela. Pretende ser invisível para o usuário casual e gratificante para quem percebe.

## Escopo

**Dentro:**

*Scroll-driven (Intersection Observer)*
- Sections entram com **fade + slide-up sutil** (8-12px, 400ms, easing premium) — uma vez por section, na primeira vez que entra na viewport
- **Linha fina laranja** crescendo abaixo do kicker (`<h3>` "About Us") quando a AboutSection entra na viewport — width 0 → 64px

*Hero*
- **Vídeo de fundo com fade-in** ao carregar (opacity 0 → 1 em 600ms)

*Hover states*
- **Anchor da navbar:** linha laranja fina aparecendo abaixo no hover (transform-origin esquerda, scaleX 0 → 1)
- **Cards do Team:** elevar sutil (translateY -4px) + box-shadow no hover, 200ms
- **Tags do Project** ("Action", "MetroidVania"): borda laranja crescendo no hover
- **Phantom no Contact:** flutuação contínua suave (translateY ±8px, 4s ease-in-out infinite)

*Navbar*
- **Hide/reveal mais smooth** quando scrolla: aumentar duração (220ms → 400ms), combinar `transform` + `opacity`

*Rotas (i18n switcher)*
- **Fade entre locales:** ao trocar idioma, `<main>` faz fade-out 150ms → troca → fade-in 250ms

*Carrossel do Team*
- **Auto-play** (5s por avanço) com pause on hover
- **Indicadores (dots)** abaixo dos chevrons mostrando posição atual

**Fora (vai pra Spec B "signature-radicals"):**
- Parallax leve no vídeo do Hero
- Glitch sutil no logo
- Cuts angulares entre sections
- Smooth scroll com Lenis
- Card central destacado no carrossel
- Cursor custom (rejeitado pelo owner)
- Letter-by-letter / wipe horizontal no Hero
- Curtain effect entre rotas
- Botões sociais invert/glow (rejeitado)
- Dust/embers no Hero (rejeitado)

## Critério de sucesso
- Scrollar a página: cada section aparece com fade+slide perceptivelmente suave (não "snap")
- Linha laranja embaixo do "About Us" cresce ao entrar na viewport
- Hover em anchor da navbar: linha laranja aparece abaixo (200-300ms)
- Hover em card do Team: card eleva sutilmente
- Hover em tag do Project: borda anima
- Phantom no Contact se move continuamente, lentamente
- Trocar idioma no dropdown: conteúdo faz fade-out → fade-in (sem flash branco perceptível)
- Navbar ao scrollar: aparece/some com transição visivelmente mais suave (~400ms)
- Carrossel avança sozinho a cada 5s; para no hover; dots refletem posição e são clicáveis
- Com `prefers-reduced-motion: reduce` ativo, todas as animações ficam estáticas/instantâneas
- `npm run lint` e `npm run build` passam

## Suposições
- Easing principal: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quint, sensação premium)
- Fade+slide das sections: 12px de translate, 400ms
- Linha sob kicker: 1px de altura, cor `var(--Primary-Color, #EE9E3F)`, width final 64px, animação 350ms
- Phantom flutuação: amplitude 8px, ciclo 4s
- Carrossel auto-play: 5s entre avanços; usa mesmo `scrollLeft` que chevrons
- Fade entre rotas: 150ms out + 250ms in (300ms perceptíveis)
- Navbar hide/reveal: 400ms com easing premium em transform e opacity
- IntersectionObserver com threshold 0.15 e dispara uma vez por section
- A "linha sob kicker" só se aplica ao `<AboutSection>` (única section que tem `<h3>` kicker hoje)
- Sem libs novas — Intersection Observer é nativo do browser; tudo CSS + hooks pequenos
- Estado de transição entre rotas é mantido via classe no `<body>` controlada por DOM API direta (não Context/Redux)

## Referências
- Conversa de planejamento: `/feature-planning` na sessão de 2026-05-06
- Spec irmã planejada: `signature-radicals` (parallax, glitch, cuts, Lenis) — pendente
- Easing reference: https://easings.net/#easeOutQuint
