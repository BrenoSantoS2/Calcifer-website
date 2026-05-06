# Games Carousel

## Objetivo
Transformar a seção de projetos em um carrossel imersivo que permite navegar entre diferentes jogos, trocando dinamicamente o vídeo de fundo e as informações textuais.

## Escopo
**Dentro:**
- Carrossel com suporte inicial para 3 jogos (expansível).
- Troca dinâmica de vídeos de fundo com efeito de cross-fade.
- Transição de texto com efeito de slide.
- Controles de navegação: Chevrons (setas) e Dots (pontos).
- Navegação apenas manual (sem autoplay).
- Versão simplificada para mobile (apenas título e categoria).

**Fora:**
- Novos assets de vídeo reais (serão usados placeholders inicialmente).
- Integração com backend ou CMS.

## Critério de sucesso
- O usuário pode alternar entre os jogos clicando nas setas ou nos pontos.
- O vídeo de fundo transita suavemente sem cortes bruscos.
- O texto (título, tags, descrição) desliza suavemente ao mudar de jogo.
- No mobile, apenas as informações essenciais são exibidas para manter a clareza.

## Suposições
- Os vídeos placeholders virão da pasta `/public/videos/`.
- O estado do carrossel será gerenciado localmente no componente.
