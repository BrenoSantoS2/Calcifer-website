# Design — UI Polish

## Visão geral
Ajustes finos de CSS para melhorar a percepção de qualidade (polish) do site. Focado em transições e limpeza de artefatos visuais.

## Arquivos afetados
- `src/css/css_components/heroSection.module.css` — Estilos do Chevron.
- `src/css/css_components/navbar.module.css` — Estilos de transição e background da Navbar.

## Detalhes Técnicos

### 1. Chevron do Hero
- **Problema:** Quadrado branco e "bug" de tamanho/piscado.
- **Causa Provável:** O `border` no pseudo-elemento ou no span está interagindo mal com a animação de `transform`. O quadrado branco pode ser um `outline` ou `background` não definido.
- **Solução:** 
    - Garantir `background: transparent` e `outline: none`.
    - Usar `will-change: transform, opacity` para suavizar a animação.
    - Ajustar o `border` para garantir que as pontas se encontrem sem criar artefatos.

### 2. Navbar - Saída Suave
- **Problema:** Navbar some/aparece rápido demais.
- **Solução:** 
    - Aumentar o `transition-duration` do `transform` de 400ms para ~600ms ou 800ms.
    - Ajustar o `transform: translateY(-100%)` para algo levemente maior como `-110%` para garantir que sombras não apareçam.
    - Usar uma curva de easing mais elegante (ex: `cubic-bezier(0.4, 0, 0.2, 1)`).

### 3. Navbar - Fade Out do Background
- **Problema:** Background some instantaneamente no topo.
- **Solução:** 
    - Aumentar o `transition-duration` das propriedades `background` e `backdrop-filter` na classe `.navbar` base.
    - Garantir que a transição ocorra tanto ao entrar quanto ao sair da classe `.scrolled`.

## Estados & comportamento
- **Chevron:** Animação contínua (bounce) sem interrupções visuais.
- **Navbar Scrolled:** Background gradiente aparece suavemente.
- **Navbar Top:** Background desaparece suavemente (fade out).
- **Navbar Hidden:** Move-se para cima suavemente ao detectar scroll para baixo.
