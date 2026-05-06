# Tasks — UI Polish

## Fase 1 — Limpeza do Chevron (Hero)
- [x] Em `src/css/css_components/heroSection.module.css`, remover possíveis fundos ou bordas indesejadas do `.scroll_indicator` e `.scroll_chevron`.
- [x] Ajustar a animação `scroll_bounce` para evitar saltos visuais.
- [x] Adicionar `will-change` para melhorar performance da animação.

## Fase 2 — Suavização da Navbar
- [x] Em `src/css/css_components/navbar.module.css`, aumentar a duração da transição de `transform` e `opacity`.
- [x] Atualizar a classe `.navbar.hidden` para uma saída mais lenta e natural.
- [x] Aumentar a duração da transição de `background` e `backdrop-filter` para criar o efeito de fade out suave ao voltar ao topo.

## Fase 3 — Verificação
- [x] Rodar `npm run dev` e verificar visualmente o Chevron.
- [x] Testar o scroll para baixo/cima e observar a fluidez da Navbar.
- [x] Verificar se o background da Navbar faz o fade out corretamente ao encostar no topo.
- [x] Rodar `npm run lint` e `npm run build` para garantir integridade.
