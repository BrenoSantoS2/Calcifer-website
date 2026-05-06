# Tasks — Polimento responsivo

> Marque os checkboxes ao executar via `/build-specs`. Não pule fases.

## Fase 1 — Variáveis CSS globais
- [x] Adicionar bloco `:root` no topo de `src/css/style.css` com `--container-max: 1440px;` e `--container-padding: clamp(24px, 4vw, 80px);`

## Fase 2 — Hero (centralização vertical + container)
- [x] Em `src/css/css_components/heroSection.module.css`, criar regra `.section` com `min-height: 100vh; display: flex; align-items: center; position: relative;`
- [x] Atualizar `.text_layout` em `heroSection.module.css`: remover `padding-top: 100px`; adicionar `margin-inline-start: var(--container-padding);` para alinhar com container; manter `max-width: 550px` do texto
- [x] Atualizar a media query `@media (max-width: 768px)` do `.text_layout`: remover `padding-top: 50px`, ajustar `margin: 0; margin-inline: var(--container-padding);` mantendo `max-width: 400px`
- [x] Atualizar a media query `@media (min-width: 1600px)` do `.text_layout`: remover `margin: 80px auto` e `padding: 0 100px`; centralizar via container (manter `max-width: 700px !important` se desejado)
- [x] Verificar visualmente que `.hero_logo_mobile` continua posicionada corretamente (não foi tocada, deve manter o comportamento atual)

## Fase 3 — AboutSection (container central)
- [x] Em `src/css/css_components/aboutSection.module.css`, manter `.about_section` com fundo branco e padding existente (full-bleed)
- [x] Atualizar `.content`: trocar `min-width: 100%` por `max-width: var(--container-max); width: 100%; margin: 0 auto; padding-inline: var(--container-padding); box-sizing: border-box;`
- [x] Remover `padding: 64px` do `.about_section` (já que o conteúdo agora cuida do padding lateral); manter `padding-block` razoável (ex.: `padding: 64px 0;`)
- [x] Ajustar a media query `@media (max-width: 768px)` para reduzir `padding-block` (ex.: `padding: 48px 0`); o lateral já é cuidado pelo `clamp`
- [x] Remover overrides redundantes em `@media (min-width: 1600px)` que duplicam o que o container central já faz

## Fase 4 — ProjectSection (container central + remover top hack)
- [x] Em `src/css/css_components/projectSection.module.css`, manter `.project_section` com altura e vídeo full-bleed
- [x] Substituir `top: 400px` em `.game` por: remover a linha; adicionar `padding-top: 400px` no `.project_section`
- [x] Atualizar `.game`: aplicar container central (`max-width: var(--container-max); margin: 0 auto; padding-inline: var(--container-padding); width: 100%; box-sizing: border-box`); remover `padding: 0 64px` do `.project_section` (substituído pelo padding-inline do `.game`)
- [x] Ajustar as media queries existentes (`@media (max-width: 768px)`, `425px`, etc.) para remover paddings horizontais agora redundantes (`padding: 0 32px`, `padding: 0 16px`) — eles já são cobertos por `var(--container-padding)`
- [x] Ajustar `@media (max-width: 768px)` para reduzir o `padding-top` do `.project_section` (ex.: 250px) compatível com a `.height: 400px` que existe nesse breakpoint
- [x] Ajustar `@media (max-width: 425px)` analogamente (ex.: `padding-top: 190px`)

## Fase 5 — TeamSection (carrossel centralizado)
- [x] Em `src/css/css_components/teamSection.module.css`, manter `.teamSection` com fundo laranja full-bleed
- [x] Aplicar container central em `.text` (título e subtítulo): adicionar `max-width: var(--container-max); margin: 0 auto; padding-inline: var(--container-padding); width: 100%; box-sizing: border-box`
- [x] **Remover** a linha `padding-left: calc(50vw - 200px - 32px);` em `.cards`
- [x] Adicionar `padding-inline: var(--container-padding); scroll-padding-inline: var(--container-padding);` em `.cards`
- [x] Adicionar regra `.cards > * { flex-shrink: 0; }` para manter tamanho dos cards durante scroll
- [x] Reduzir `padding: 64px` no `.teamSection` para `padding: 64px 0` (lateral cuidado pelos filhos)
- [x] Verificar que `.chevrons` continua centralizado (já tem `display: flex` no parent `.teamSection` com `align-items: center`)

## Fase 6 — ContactSection (container central + Phantom acompanhando)
- [x] Em `src/css/css_components/contactSection.module.css`, aplicar container central em `.contactSection`: adicionar `max-width: var(--container-max); margin: 0 auto; padding-inline: var(--container-padding); width: 100%; box-sizing: border-box`
- [x] Substituir `padding: 64px` por `padding: 64px 0` no `.contactSection` (lateral pelo container)
- [x] Manter `.image` com `position: absolute; right: 75px; z-index: -1;` (default)
- [x] Adicionar nova media query `@media (min-width: 1440px) { .image { right: calc((100vw - var(--container-max)) / 2 + 75px); } }` para Phantom acompanhar a borda direita do container em widescreen
- [x] Manter `@media (max-width: 768px)` com `padding: 48px 0` e `display: none` na imagem

## Fase 7 — Footer (padding lateral consistente)
- [x] Em `src/css/css_components/footer.module.css`, atualizar `.footer`: trocar `padding: 20px` por `padding: 20px var(--container-padding)`

## Fase 8 — Verificação
- [x] `npm run build` passa (typecheck inclusive) — rotas `/pt`, `/en`, `/es` geradas como SSG
- [x] Iniciar `npm run dev` e validar HTTP 200 nas três rotas (porta 3001 — 3000 estava ocupada)
- [ ] Testar em viewport desktop padrão (1440px DevTools): nenhum visual quebrado em relação ao estado anterior *(verificação visual pelo owner)*
- [ ] Testar em viewport widescreen (1920px DevTools): About sem vão grande; Phantom no Contact próxima do conteúdo; Team com cards centralizados embaixo do título *(verificação visual pelo owner)*
- [ ] Testar em viewport mobile (375px DevTools): logo do Hero não colide com h1; padding lateral confortável em todas as sections *(verificação visual pelo owner)*
- [ ] Testar zoom-out (Ctrl+− até ~50%): Hero text continua centralizado verticalmente, não cola no topo *(verificação visual pelo owner)*
- [ ] Testar carrossel do Team: usar chevrons quando cards excedem viewport; ver centralização quando cabem (≥ 1600px) *(verificação visual pelo owner)*
- [x] Conferir critério de sucesso completo de [summary.md](summary.md) *(itens automatizáveis confirmados; checks visuais ficam para o owner)*
