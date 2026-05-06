# i18n + Navbar sticky + Rebrand Calcifer→Calcifire

## Objetivo
Tornar o site acessível em três idiomas (PT, EN, ES) com detecção automática e seletor manual, melhorar a usabilidade da navbar (sticky com hide-on-scroll + menu hambúrguer mobile) e aplicar o rebrand visual de "Calcifer" para "Calcifire" em todo o conteúdo textual. O público principal hoje é brasileiro, então PT é o fallback prioritário.

## Escopo

**Dentro:**
- Estrutura `[locale]` no App Router com rotas `/pt`, `/en`, `/es`
- Biblioteca `next-intl` para gerenciar dicionários e contexto de idioma
- Dicionários `messages/{pt,en,es}.json` cobrindo: textos das 6 sections, metadata SEO (`title`, `description`), atributos `alt` de imagens
- Middleware com detecção via `Accept-Language` e fallback para PT
- Cookie `NEXT_LOCALE` para persistir escolha do usuário
- Atributo `<html lang>` dinâmico conforme o locale ativo
- Seletor de idioma na navbar: dropdown estilizado com bandeira (emoji) + iniciais (`🇧🇷 PT`, `🇺🇸 EN`, `🇪🇸 ES`)
- Promover `<NavBar />` para o layout `[locale]/layout.tsx` (hoje é renderizada dentro do `HeroSection`)
- Navbar **sticky com hide-on-scroll-down / reveal-on-scroll-up**, fundo translúcido + sombra em degradê leve quando ativada
- **Menu hambúrguer mobile** (não existe hoje) com painel contendo links das sections + seletor de idioma
- Substituir "Calcifer" → "Calcifire" em todo conteúdo textual visível, metadata e `alt` text
- Padronizar cargos do time em inglês (alguns estão em PT hoje)

**Fora:**
- Logo SVG (proprietário substitui o asset fora do código; filename `/CalciferLogo.svg` permanece)
- Renomeação de domínio e do repositório (proprietário cuida fora)
- Email `calcifer.studios.ofc@gmail.com` (endereço real, não é texto de marca)
- Tradução de nomes próprios e cargos do time
- `hreflang` no sitemap / SEO multi-idioma avançado
- Pluralização e formatação de datas/números (não há conteúdo dinâmico)
- Painel admin / CMS para gerenciar traduções
- Atualizar ano do copyright no footer (`© 2024`) — fica como está

## Critério de sucesso
- Acessar a raiz `/` em browser configurado em PT, EN ou ES redireciona para `/pt`, `/en` ou `/es` respectivamente; idiomas não suportados caem em `/pt`
- Trocar idioma pelo seletor muda a URL, todos os textos visíveis e o atributo `<html lang>`
- Recarregar a página mantém o idioma escolhido (cookie persistente)
- Navbar fica fixa no topo, some ao scrollar para baixo e reaparece ao scrollar para cima, com transição suave e fundo com sombra em degradê
- Em viewport mobile, links das sections viram menu hambúrguer funcional com seletor de idioma incluído
- Nenhuma string "Calcifer" sobra no conteúdo textual (exceto filename do logo, email, e nome do repositório/pasta)
- `npm run build` passa sem erros de TypeScript

## Suposições
- next-intl v3.x (App Router pattern oficial)
- Bandeiras dos idiomas como emoji nativo (🇧🇷🇺🇸🇪🇸) — sem assets extras em `public/flags/`
- Threshold do hide-on-scroll: 80px de scroll a partir do topo (evita sumir já no Hero)
- Animação de hide/reveal: `transform: translateY(-100%)` com transição de ~200ms
- next-intl em modo "soft fallback" — chave faltando mostra a chave, não quebra a página
- Email permanece como `calcifer.studios.ofc@gmail.com`
- Filename do logo permanece `/CalciferLogo.svg` até o proprietário trocar o asset
- Tradução inicial dos textos é rascunho do Claude; usuário revisa antes de produção

## Referências
- next-intl App Router docs: https://next-intl-docs.vercel.app/docs/getting-started/app-router
- Conversa de planejamento: `/feature-planning` na sessão de 2026-05-05
