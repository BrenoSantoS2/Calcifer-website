# Design — Games Carousel

## Visão geral
O componente `ProjectSection` será convertido em um 'use client' component para gerenciar o estado do jogo selecionado. A interface será composta por camadas: vídeos de fundo, filtro, conteúdo textual e controles.

## Arquivos afetados
- `src/components/projectSection.tsx` — Transformação em Client Component e adição de lógica de carrossel.
- `src/css/css_components/projectSection.module.css` — Novos estilos para transições, controles e layout responsivo.

## Detalhes Técnicos

### 1. Estrutura de Dados
Os jogos serão definidos em um array de objetos:
```typescript
{
  id: string;
  video: string;
  title: string;
  tags: string[];
  description: string;
}
```

### 2. Transições
- **Vídeos:** Dois elementos `<video>` sobrepostos. Um exibe o vídeo atual e o outro o próximo/anterior, alternando opacidade para o efeito de cross-fade.
- **Texto:** Uso de `framer-motion` (se disponível) ou classes CSS com `keyframe` para fazer o texto deslizar (`translateX`) e mudar de opacidade.

### 3. Controles
- **Dots:** Posicionados na parte inferior central da seção.
- **Chevrons:** Posicionados nas laterais ou integrados ao layout (seguindo o estilo da Team Section).

### 4. Responsividade
- **Desktop:** Título à esquerda, tags abaixo do título, descrição à direita (mantendo o layout de "space-between").
- **Mobile:** Layout em coluna, ocultando a descrição longa e focando no Título + Tags.

### 5. Acessibilidade
- Botões com `aria-label`.
- Gerenciamento de foco ao navegar pelos jogos.
