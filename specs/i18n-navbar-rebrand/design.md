# Design — i18n + Navbar sticky + Rebrand

## Visão geral
Adotar `next-intl` v3 com o pattern de App Router: segmento dinâmico `[locale]`, middleware para detecção/redirect, dicionários JSON em `messages/`. A `<NavBar />` é promovida para o layout do segmento `[locale]`, vira Client Component (precisa de `useRef`/`useEffect` para hide-on-scroll, `useState` para dropdown e hambúrguer, `usePathname`/`useRouter` para troca de idioma). O rebrand é uma substituição textual aplicada nos dicionários — o código fonte deixa de ter "Calcifer" hardcoded em qualquer lugar visível.

## Arquivos afetados

**Novos:**
- `src/middleware.ts` — middleware do next-intl (detecção `Accept-Language`, redirect, cookie)
- `src/i18n/routing.ts` — config de locales suportados e fallback
- `src/i18n/request.ts` — loader de mensagens por request
- `src/app/[locale]/layout.tsx` — layout do segmento, define `<html lang>`, envolve com `NextIntlClientProvider`, renderiza `<NavBar />`
- `src/app/[locale]/page.tsx` — page composta das 6 sections (substitui o `src/app/page.tsx` atual)
- `messages/pt.json`, `messages/en.json`, `messages/es.json` — dicionários
- `src/components/languageSwitcher.tsx` — Client Component do dropdown de idiomas
- `src/css/css_components/languageSwitcher.module.css`

**Modificados:**
- `src/app/layout.tsx` — root layout fica minimal (só `{children}`); `<html>` migra para o `[locale]/layout.tsx`. Metadata estática removida.
- `src/app/page.tsx` — **deletado** (conteúdo move para `[locale]/page.tsx`)
- `src/components/navbar.tsx` — vira `'use client'`, recebe lógica de hide-on-scroll, dropdown, hambúrguer; consome `useTranslations`
- `src/components/heroSection.tsx` — **remover** o `<NavBar />` interno; consumir traduções
- `src/components/aboutSection.tsx` — consumir traduções
- `src/components/projectSection.tsx` — consumir traduções
- `src/components/teamSection.tsx` — consumir traduções (cabeçalho "Meet Our Team" e descrição); padronizar `role` dos membros em inglês
- `src/components/contactSection.tsx` — consumir traduções
- `src/components/footer.tsx` — consumir traduções
- `src/css/css_components/navbar.module.css` — adicionar estados sticky/hidden, dropdown e hambúrguer
- `package.json` — adicionar `next-intl`
- `next.config.mjs` (ou `.js`) — adicionar plugin do next-intl

## Estrutura de componentes

```
RootLayout (Server)             — src/app/layout.tsx, fica vazio só com {children}
  └── LocaleLayout (Server)     — src/app/[locale]/layout.tsx
        ├── <html lang={locale}>
        ├── NextIntlClientProvider
        ├── NavBar (Client)     — sticky, hide-on-scroll, hambúrguer
        │     └── LanguageSwitcher (Client) — dropdown
        └── LocalePage (Server) — src/app/[locale]/page.tsx
              ├── HeroSection (Server)         — sem NavBar interna
              ├── AboutSection (Server)
              ├── ProjectSection (Server)
              ├── TeamSection (Client, já era) — só troca textos do header
              ├── ContactSection (Server)
              └── Footer (Server)
```

**NavBar props:** nenhuma. Lê locale via `useLocale()` e textos via `useTranslations('nav')`.

**LanguageSwitcher props:** nenhuma. Usa `usePathname()` e `useRouter()` do `next-intl/navigation` para trocar locale preservando o path.

**Estado interno da NavBar:**
- `isHidden: boolean` — controla `translateY(-100%)`
- `isMobileMenuOpen: boolean` — controla painel hambúrguer
- `isDropdownOpen: boolean` (dentro do LanguageSwitcher) — controla visibilidade do menu de idiomas
- `lastScrollY: useRef<number>` — para comparar direção do scroll

## Dados

**Origem:** dicionários JSON em `messages/`, importados pelo `next-intl` em request time (Server Components) ou via `useTranslations` (Client Components).

**Forma do dicionário:**
```json
{
  "metadata": {
    "title": "Calcifire Studios",
    "description": "Unleashing creativity and passion in every project"
  },
  "nav": {
    "games": "Games",
    "about": "About",
    "contact": "Contact",
    "logoAlt": "Calcifire Studios logo"
  },
  "hero": {
    "title": "Unleashing creativity and passion in every project",
    "body": "Welcome to the immersive world of Calcifire Studios..."
  },
  "about": {
    "kicker": "About Us",
    "title": "Creating Games That Inspire and Entertain",
    "body": "Calcifire Studios is a game studio..."
  },
  "project": {
    "title": "Falling in Abyss",
    "tagAction": "Action",
    "tagMetroidvania": "MetroidVania",
    "body": "Falling in Abyss brings Dante's Inferno to life..."
  },
  "team": {
    "title": "Meet Our Team",
    "body": "Get to know the talented university students behind Calcifire Studios."
  },
  "contact": {
    "title": "Contact Us",
    "body": "We'd love to hear from you. Contact us for any inquiries.",
    "email": "Email",
    "phone": "Phone"
  },
  "footer": {
    "rights": "© 2024 Calcifire Studios. All rights reserved."
  }
}
```

**Quando carrega:** server-side por request, via `getRequestConfig` do next-intl. Client Components recebem por contexto (`NextIntlClientProvider`).

**Cookie:** `NEXT_LOCALE` gerenciado automaticamente pelo middleware do next-intl. Sem código manual.

## Estilos

### Navbar
- **Container fixed**: `position: fixed; top: 0; left: 0; right: 0; z-index: 100`
- **Estado sticky com fundo:** background gradiente translúcido + `backdrop-filter: blur(8px)` + sombra `0 4px 16px rgba(0,0,0,0.4)` em degradê (sombra concentrada na parte de baixo)
- **Estado hidden:** `transform: translateY(-100%); transition: transform 200ms ease`
- **Estado revealed:** `transform: translateY(0)`
- Aplicar estados via classes condicionais (`.hidden`, `.scrolled`)

### Language Switcher (dropdown)
- Trigger: botão pequeno mostrando bandeira + iniciais do locale atual (ex.: `🇧🇷 PT ▾`)
- Menu: posicionado absoluto abaixo do trigger, com 3 itens (PT, EN, ES), fundo escuro consistente com a paleta
- Item ativo destacado (background ou opacity)
- Fecha ao clicar fora (listener no `document`) e ao selecionar opção

### Hambúrguer mobile
- Breakpoint: `@media (max-width: 768px)`
- Em mobile **a navbar inteira fica oculta** (logo + links + dropdown da desktop). No lugar, aparece **apenas um ícone hambúrguer flutuante** posicionado `fixed` no canto superior direito da viewport.
- O hambúrguer fica sempre visível em mobile (sem hide-on-scroll). O comportamento de hide-on-scroll é exclusivo do desktop.
- A logo permanece visível **dentro do `<HeroSection />`** no mobile (renderizada no Hero, escondida via CSS no desktop). Isso garante que o usuário veja a marca antes de abrir o menu.
- Painel aberto: full-width, slide-in de cima, lista vertical dos links + LanguageSwitcher embaixo. **Sem logo dentro do painel** (apenas opções).
- Fecha ao clicar em um link, no ícone (que vira X) ou em qualquer área fora dos itens.
- Trava scroll do body enquanto aberto (`overflow: hidden` no body)

### Tokens reutilizados
- Variável `--Base` se já existir em [src/css/style.css](src/css/style.css)
- Inter (já carregado em [src/css/fonts.css](src/css/fonts.css))

## Estados & comportamento

**Default (desktop, topo da página):**
- Navbar visível, fundo transparente, sem sombra
- Links visíveis, switcher visível

**Após 80px de scroll para baixo:**
- Navbar ganha fundo translúcido + sombra
- Continua visível enquanto direção do scroll for "para cima" ou estável
- Some (translateY -100%) quando direção é "para baixo" e `scrollY > 80`

**Mobile:**
- Navbar (logo, anchors e switcher do desktop) totalmente escondida via CSS
- Aparece apenas o **ícone hambúrguer flutuante** no canto superior direito (fixed), sempre visível, sem hide-on-scroll
- Logo aparece dentro do `<HeroSection />` (visível só no mobile)
- Painel hambúrguer aberto: full-width, fundo opaco, lista vertical de links + LanguageSwitcher embaixo, sem logo

**Loading:** n/a (conteúdo estático)

**Vazio:** n/a

**Erro:** chave de tradução faltando → next-intl exibe a chave literal e loga warning no console (modo soft fallback)

**Locale inválido na URL** (ex.: `/fr/...`): middleware redireciona para `/pt` (fallback)

## Acessibilidade
- Atributo `<html lang>` reflete o locale ativo (importante para screen readers)
- Botão hambúrguer com `aria-label="Open menu"` / `aria-expanded`
- Dropdown do switcher com `role="menu"` e itens `role="menuitem"`; trigger com `aria-haspopup="true"` / `aria-expanded`
- Foco visível em todos os interativos (não remover `outline`)
- Navegação por teclado: Tab cicla pelos links, Enter ativa, Escape fecha dropdowns/menu mobile
- Painel hambúrguer aberto: foco vai pro primeiro item; ao fechar, volta ao botão hambúrguer
- Contrastes preservados sobre o fundo translúcido (testar visualmente)

## Edge cases tratados
- URL com locale inválido → redirect para `/pt`
- Cookie aponta PT mas usuário acessa `/en` direto → URL ganha, cookie é atualizado
- Hambúrguer aberto + usuário troca de rota → fecha automaticamente (efeito no `pathname`)
- Hide-on-scroll só dispara após 80px (não some no Hero)
- Dropdown de idioma fecha ao clicar fora ou pressionar Escape
- Resize de desktop → mobile com painel aberto: painel fecha
- Build sem `messages/<locale>.json` correspondente: erro de build claro (validar no spec dos imports)

## Decisões e trade-offs
- **next-intl em vez de DIY:** lib madura, suporta App Router nativamente, decisão alinhada com expansão futura (formulários, datas). Custo ~50KB aceitável.
- **Promover NavBar para layout:** sticky exige container fora do fluxo do `<HeroSection>`. Trade-off: HeroSection perde o ownership da navbar, mas ganhamos navbar global em todas as futuras rotas.
- **Bandeiras como emoji:** zero asset, render rápido, suporte universal. Trade-off: aparência depende do SO/browser do usuário (em alguns Windows aparecem como letras). Aceitável para MVP; trocar por SVGs se virar problema visual.
- **Cookie via middleware do next-intl:** o lib gerencia, não escrevemos código de cookie manual.
- **Fallback PT (não EN):** público principal é brasileiro hoje. Quando audiência mudar, troca uma constante em `routing.ts`.
- **Hambúrguer só em mobile (≤768px):** ponto de quebra padrão; hoje a navbar não tem versão mobile, então qualquer escolha aqui é nova.
- **Mobile sem barra sticky, só hambúrguer flutuante + logo no Hero:** decisão explícita do owner. Mobile não compartilha o comportamento de hide-on-scroll do desktop — o ícone fica sempre visível. Logo "vive" no Hero apenas em mobile (esconde no desktop), evitando duplicar marca quando a navbar do desktop já mostra o logo.
- **Padronizar cargos em inglês:** já que decisão é não traduzir cargos, padronizamos a fonte; evita inconsistência visual.
- **Texto de copyright "© 2024":** não atualizar ano nesta feature — mudança ortogonal.

## Fora de escopo (não implementar agora)
- `hreflang` em metadata para SEO multi-idioma
- Sitemap multi-idioma
- Bandeiras como SVG custom
- Pluralização / formatação de datas / números via next-intl
- Detecção mais sofisticada (ex.: GeoIP)
- Painel/CMS para gerenciar traduções
- Atualização do logo SVG e renomeação de filename
- Atualização do ano no copyright
