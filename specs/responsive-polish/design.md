# Design — Polimento responsivo

## Visão geral
Mudança 100% em CSS — nenhuma alteração de TSX. Introduzimos duas variáveis globais (`--container-max`, `--container-padding`) em `style.css` e aplicamos um padrão de "outer full-bleed / inner contained" em todas as sections: o background continua ocupando 100% da viewport, e o conteúdo interno fica limitado a 1440px com padding lateral responsivo. O Hero ganha `min-height: 100vh` com flex-center vertical, eliminando colisões com a navbar fixa. O carrossel do Team é corrigido removendo o hack de `padding-left: calc(50vw - ...)` e centralizando via `justify-content: center` quando os cards cabem.

## Arquivos afetados

**Modificados:**
- `src/css/style.css` — adicionar variáveis CSS globais `--container-max` e `--container-padding`
- `src/css/css_components/heroSection.module.css` — adicionar regra `.section` com `min-height: 100vh; display: flex; align-items: center`; ajustar `.text_layout` (remove `padding-top: 100px`, usa container central, `width: 100%`, `box-sizing: border-box`)
- `src/css/css_components/aboutSection.module.css` — `.about_section` mantém fundo branco full-bleed; `.content` ganha `max-width: var(--container-max); margin: 0 auto; padding-inline: var(--container-padding)`
- `src/css/css_components/projectSection.module.css` — `.project_section` mantém vídeo full-bleed; conteúdo `.game` ganha container central; substituir `top: 400px` por posicionamento via padding/flex respeitando o container
- `src/css/css_components/teamSection.module.css` — `.teamSection` mantém fundo laranja full-bleed; `.text` (título/subtítulo) ganha container central; `.cards` perde `padding-left: calc(50vw - 200px - 32px)`, ganha `justify-content: center` e cards filhos ganham `flex-shrink: 0` para manter tamanho durante scroll
- `src/css/css_components/contactSection.module.css` — `.contactSection` ganha container central; `.image` (Phantom) ajustada para acompanhar o limite do container em widescreen
- `src/css/css_components/footer.module.css` — `.footer` ganha `padding-inline: var(--container-padding)` para alinhar com as demais sections

**Não modificados:**
- Nenhum `.tsx` — toda a feature é CSS
- Nenhum asset
- `src/components/navbar.module.css` — a navbar já é fixed e tem max-width próprio (1200px); não muda nesta feature

## Estrutura de componentes
Sem mudanças. Toda a árvore de componentes permanece igual.

Padrão visual aplicado em CSS:
```
section (full-bleed, background)
  └── inner container (max-width: 1440px, margin: 0 auto, padding-inline: clamp)
        └── conteúdo da section
```

## Dados
N/A — feature puramente visual/CSS.

## Estilos

### Variáveis CSS globais em `src/css/style.css`
```css
:root {
    --container-max: 1440px;
    --container-padding: clamp(24px, 4vw, 80px);
}
```

### Padrão de container central
Aplicado no elemento "wrapper de conteúdo" de cada section (não no elemento que pinta o background):
```css
max-width: var(--container-max);
margin: 0 auto;
padding-inline: var(--container-padding);
width: 100%;
box-sizing: border-box;
```

### Hero — centralização vertical
```css
.section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
}
.text_layout {
    /* remover padding-top: 100px */
    padding-top: 0;
    /* aplicar container central */
    max-width: var(--container-max);
    width: 100%;
    margin: 0 auto;
    padding-inline: var(--container-padding);
    box-sizing: border-box;
    /* manter max-width interno do bloco de texto via .text_layout existente */
}
```

O `.text_layout` original tinha `max-width: 550px` para o texto. Esse limite passa a um wrapper interno (ou usamos uma classe nova `.text_inner`), enquanto o `.text_layout` exterior cuida do container central. Alternativa mais simples: manter `max-width: 550px` no `.text_layout` e adicionar margem auto + padding lateral, sem wrapper extra. **Decisão:** ir com a alternativa simples (manter 550px e centralizar com `margin-inline: auto` + `padding-inline`), porque o conteúdo do Hero é texto à esquerda — não precisa esticar até 1440px.

→ **Refinamento:** O `.section` do Hero é o que vai ser o flex container. O `.text_layout` mantém seu `max-width: 550px` para o texto e ganha `margin-left: var(--container-padding)` (alinhar com o resto do site). Em ultra-wide, ainda fica à esquerda dentro de um container de 1440px central.

### Team — carrossel centralizado
```css
.cards {
    display: flex;
    justify-content: center;  /* centraliza quando cabem */
    gap: 64px;
    align-items: center;
    overflow-x: auto;
    scroll-behavior: smooth;
    /* REMOVER: padding-left: calc(50vw - 200px - 32px) */
    padding-inline: var(--container-padding);
    scroll-padding-inline: var(--container-padding);
}
.cards > * {
    flex-shrink: 0;  /* mantém tamanho durante scroll */
}
```

Quando os cards somados (6 × ~200px + 5 × 64px gap = ~1520px) **não cabem** no container, o flex passa a alinhar do início (porque `justify-content: center` se torna inefetivo em overflow). Aceitável: o usuário usa os chevrons. Quando **cabem** (telas ≥ 1600px aproximadamente), ficam centralizados embaixo do título.

### Contact — Phantom acompanhando container
```css
.image {
    position: absolute;
    right: max(0px, calc((100vw - var(--container-max)) / 2 + 75px));
    z-index: -1;
}
```
A fórmula garante que em telas ≤ 1440px o `right: 75px` original é preservado (porque a parte negativa do `max` é descartada → 0 + 75 efetivos via outro mecanismo... reformular). Solução final mais simples:
```css
.image {
    position: absolute;
    right: 75px;
    z-index: -1;
}
@media (min-width: 1440px) {
    .image {
        right: calc((100vw - var(--container-max)) / 2 + 75px);
    }
}
```

### Project — substituir `top: 400px`
O `.game` hoje é posicionado por `position: relative; top: 400px` para empurrar o conteúdo pra baixo do vídeo. Substituir por:
- `.project_section` ganha `display: flex; flex-direction: column; justify-content: flex-end` ou `padding-top: 400px` (mais previsível)
- `.game` perde o `top: 400px` e ganha o container central

**Decisão:** padding-top no `.project_section` é menos cirúrgico, mantém o offset visual. Substituir o hack de `top` por `padding-top` no parent.

### Footer
```css
.footer {
    padding: 20px var(--container-padding);
}
```

## Estados & comportamento

- **Default (1280-1440px):** comportamento idêntico ao atual; container ocupa quase 100% com padding mínimo de `clamp` (~52-58px)
- **Mobile (≤ 768px):** padding lateral aperta para 24-32px (`clamp` mínimo); Hero centralizado verticalmente; logo do `hero_logo_mobile` continua absolute no canto superior esquerdo, agora não colide com h1 porque o flex-center afasta o texto
- **Widescreen (≥ 1600px):** container limita a 1440px; backgrounds full-bleed continuam preenchendo toda a tela; sobra padding lateral colorido (laranja no Team, branco no Contact, vídeo no Hero/Project)
- **Zoom-out (50-75%):** Hero ainda mantém o texto centralizado verticalmente; outras sections ficam mais "comprimidas" mas sem cola no topo

## Acessibilidade
- Sem mudanças de semântica
- Foco visível e contraste já estabelecidos pela feature anterior — não regredir
- O scroll horizontal do Team continua acessível (chevrons como botões com `aria-label`?). **Observação para o futuro:** os chevrons hoje não têm aria-label, mas isso é fora do escopo desta spec

## Edge cases tratados
- Tela < 1440px: container ocupa 100% com padding mínimo
- Tela exatamente em 1440px: padding lateral mínimo de 24px (`clamp` mínimo)
- Tela > 1440px (widescreen): conteúdo limitado, fundos full-bleed
- Hero em viewport baixo (smartphone landscape): `min-height: 100vh` pode forçar mais altura que o ideal — aceitável, o usuário pode rolar
- Team com 6 cards em tela 1280px: não cabe inteiro (1520px > 1280px) → scroll horizontal com chevrons
- Team com 6 cards em tela 1920px: cabe inteiro → centralizados
- Phantom em tela < 768px: já está com `display: none` (mantém)
- AboutSection em viewport ≤ 1000px: já vira coluna (mantém)

## Decisões e trade-offs
- **CSS vars vs hardcode:** vars permitem reuso e ajuste em um único ponto. Trade-off: leve aumento de complexidade. Aceito porque temos 6 sections aplicando o mesmo padrão.
- **Container central vs grid global:** poderia criar um componente `<Container />` em React para encapsular, mas o projeto evita abstrações. Decisão: aplicar via CSS direto em cada section, mantendo os módulos.
- **Hero `min-height: 100vh`:** trade-off conhecido de 100vh em mobile (barra de URL do Safari iOS oscila a altura). Aceitável para um site marketing; se virar problema, trocar por `100svh` (small viewport height) numa fase futura.
- **Team scroll quando não cabe:** quando `justify-content: center` é aplicado em flex container com overflow, ele alinha do início se o conteúdo for maior que o container. Esse é o comportamento desejado — o usuário usa chevrons. Sem fallback adicional necessário.
- **Phantom com fórmula `calc`:** alternativa seria mover Phantom para dentro do container `.contactSection` com `position: absolute; right: 0;`. Trade-off: mudaria o fluxo visual atual. Decisão: manter `position: absolute` no body global e usar media query para ajustar `right` em widescreen.
- **`top: 400px` do Project:** o hack atual depende de altura fixa da section (`height: 600px`). Substituir por `padding-top` no parent é equivalente visual e mais maleável.

## Fora de escopo (não implementar agora)
- Atualizar `© 2024` no Footer para ano corrente
- Adicionar `aria-label` aos chevrons do Team
- Trocar `100vh` por `100svh` no Hero (só se virar problema visível em iOS Safari)
- Refatorar o `.about_section` para grid moderno (em vez de flex two-column)
- Animar a Phantom no Contact
- Criar componente `<Container />` reutilizável em React
