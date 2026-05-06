# Polimento responsivo: Hero respiro + container central + carrossel

## Objetivo
Eliminar três problemas visuais que aparecem em viewports não-padrão: (1) navbar/logo encostando no Hero ao dar zoom-out ou no mobile; (2) conteúdo se esticando excessivamente em telas widescreen e quebrando hierarquia visual; (3) cards do team desalinhados em relação ao título centralizado por causa de um hack de `padding-left: calc(50vw - ...)`.

## Escopo

**Dentro:**
- Hero centralizado verticalmente (`min-height: 100vh; display: flex; align-items: center`) — resolve simultaneamente zoom-out e mobile (texto nunca cola na navbar)
- Container central padronizado para todas as sections com `max-width: 1440px` + padding lateral `clamp(24px, 4vw, 80px)`
- Backgrounds (vídeos do Hero/Project, cor laranja do Team, branco do Contact) **continuam full-bleed**; só o conteúdo interno é contido
- Variáveis CSS globais em `src/css/style.css`: `--container-max` e `--container-padding` para reuso
- Aplicação em todas as sections: HeroSection, AboutSection, ProjectSection, TeamSection, ContactSection, Footer
- Correção do alinhamento dos cards no Team: remover o `padding-left: calc(50vw - 200px - 32px)` e usar `justify-content: center` puro; cards mantêm `flex-shrink: 0` e overflow-x scroll para viewports menores

**Fora:**
- Mudanças de layout estrutural (reordenar elementos, mudar grid de duas colunas pra uma)
- Tipografia/cores (só ajusto se algo quebrar com o container novo)
- Animações novas
- Substituição de assets (vídeos, Phantom, logo)
- Mudanças no comportamento dos chevrons do carrossel
- Atualizar o copyright `© 2024` no Footer

## Critério de sucesso
- Em zoom-out de 50% ou em viewport mobile (375px), a logo (desktop NavBar ou `hero_logo_mobile`) não toca o `<h1>` do Hero
- Em viewport ≥ 1920px (widescreen), o conteúdo do About não tem mais um vão grande entre kicker/título e body — eles ficam dentro do max-width de 1440px
- Em viewport ≥ 1920px, a imagem da Phantom no Contact não fica perdida no canto direito longe do texto
- Os cards do Team aparecem centralizados embaixo do título quando cabem (≥ 6 cards × 232px + gaps caberem no max-width); quando não cabem, fluem com scroll horizontal e os chevrons continuam funcionais
- Em viewport mobile (375px), nenhum padding incomoda o usuário; conteúdo legível
- Sem regressões em viewports padrão (1280-1440px) — o site visualmente é o mesmo
- `npm run build` continua passando

## Suposições
- `max-width: 1440px` para o container central
- `padding-inline: clamp(24px, 4vw, 80px)` para padding lateral responsivo
- Hero usa `min-height: 100vh` com flex center vertical
- Variáveis CSS reutilizáveis em `style.css`: `--container-max: 1440px;` e `--container-padding: clamp(24px, 4vw, 80px);`
- O `padding-top: 100px` atual do `.text_layout` no Hero passa a `0` (o flex center vai posicionar verticalmente)
- O `top: 400px` do `.game` no ProjectSection vira posicionamento via flex/padding (não absolute hack)
- A imagem da Phantom continua `position: absolute` mas com `right: clamp(0px, calc((100vw - var(--container-max))/2 + 75px), ...)` ou equivalente para acompanhar o container

## Referências
- Conversa de planejamento: `/feature-planning` na sessão de 2026-05-05
- Prints fornecidos pelo owner mostrando: (1) About em widescreen com vão entre colunas, (2) Team com cards desalinhados e Phantom no canto, (3) Mobile com logo grudada no h1
