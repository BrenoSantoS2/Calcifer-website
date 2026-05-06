# UI Polish — Chevron & Navbar

## Objetivo
Refinar a experiência visual do site corrigindo artefatos visuais no Chevron de scroll e tornando as transições da Navbar mais suaves e elegantes.

## Escopo
**Dentro:**
- Remoção do quadrado branco ao redor do Chevron do Hero.
- Correção de bugs visuais (piscado/tamanho) na animação do Chevron.
- Suavização da animação de saída (hide) da Navbar ao fazer scroll para baixo.
- Implementação de fade out gradual no background da Navbar ao retornar ao topo.

**Fora:**
- Mudanças estruturais no layout da Navbar ou Hero.
- Alteração de cores ou fontes.

## Critério de sucesso
- O Chevron no Hero deve aparecer sem bordas ou fundos brancos, apenas a seta animada.
- A Navbar deve sumir de forma fluida ao descer a página, com uma transição mais lenta e natural.
- Ao chegar no topo, o background escuro da Navbar deve desaparecer com um efeito de fade suave, em vez de um corte seco.

## Suposições
- O "quadrado branco" no Chevron é causado por estilos padrão de foco ou bordas no elemento `.scroll_chevron` ou no link pai.
- A Navbar utiliza `transform: translateY(-100%)` para sumir, o que será ajustado para uma transição mais suave.
