# Design — Team Cards Redesign

## Visão geral
Uma mistura de estilos para criar um card com personalidade. A base será um retângulo sólido com bordas retas, onde a imagem do membro flutua acima e para fora dele.

## Arquivos afetados
- `src/components/teamSection.tsx` — Reestruturação do JSX do `ProfileCard`.
- `src/css/css_components/teamSection.module.css` — Novos estilos para camadas, filtros e tipografia.

## Detalhes Técnicos

### 1. Estrutura de Camadas (Overlap)
- O `ProfileCard` terá um container principal (`.card`) com `position: relative` e `padding-top`.
- O fundo visível do card será um elemento interno (`.card_background`) com as bordas retas e sombra.
- A `Image` terá um `transform: translateY(-Xpx)` para vazar para cima do fundo.

### 2. Efeito Visual (Hover)
- **Normal:** Imagem com `filter: grayscale(100%) opacity(0.8)`.
- **Hover:** Imagem com `filter: grayscale(0%) opacity(1)` e leve `scale`.
- **Transição:** 400ms para suavidade.

### 3. Tipografia
- **Nome (h2):** Mantido, mas garantindo contraste.
- **Cargo (p):** Fonte reduzida (ex: 12px), cor cinza escuro, `text-transform: uppercase` e `letter-spacing: 0.1em`.

### 4. Cores & Bordas
- Bordas retas (`border-radius: 0`).
- Fundo do card: Branco ou cinza muito claro para destacar da seção laranja.
- Ícones sociais: Exibidos com uma animação de entrada suave no hover ou mantidos fixos com opacidade reduzida.
