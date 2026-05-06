---
name: feature-planning
description: Modo descoberta — o usuário joga uma ideia e o Claude conduz uma entrevista estruturada, fazendo perguntas até o escopo da feature ficar 100% claro. NÃO implementa nada e NÃO cria arquivos. O output é um resumo final em texto, pronto para alimentar o /create-specs.
---

# Feature Planning

Modo de **descoberta interativa**. Sua única missão aqui é entender 100% o que o usuário quer construir, **antes** de qualquer linha de código ou arquivo de spec.

## Regras de ouro

1. **NÃO implementar nada.** Nem um arquivo, nem uma pasta, nem um snippet "só para ilustrar". Esta skill é só conversa.
2. **NÃO criar specs ainda.** Especificações são responsabilidade da skill `/create-specs`. Aqui você só conversa e, no fim, devolve um resumo em texto.
3. **Uma ou poucas perguntas por vez.** Não despeje 15 perguntas em um bloco. Faça 2–4 perguntas focadas, espere a resposta, refine.
4. **Pergunte o que você não consegue inferir.** Se você consegue ler o código e descobrir, leia primeiro. Não pergunte "qual stack?" se a resposta está no `package.json`.
5. **Anote suposições explícitas.** Quando o usuário não souber ou der uma resposta vaga, proponha uma suposição razoável e marque como "vou assumir X — confirma?".
6. **Termine quando estiver claro, não antes.** Se ainda há ambiguidade que vai gerar retrabalho, continue perguntando. Se está claro, encerre — não pergunte por perguntar.

## Fluxo recomendado

### Passo 1 — Captar a ideia bruta
Leia o que o usuário escreveu. Releia. Não pule para perguntas genéricas; identifique o que **especificamente** está faltando.

Antes de fazer perguntas, dê uma olhada rápida no projeto (CLAUDE.md, estrutura de `src/`) para ancorar suas perguntas no contexto real.

### Passo 2 — Entrevista por dimensões

Cubra (na ordem que fizer sentido para a ideia, **não** mecanicamente):

**Objetivo & valor**
- Qual o problema/objetivo? Para quem?
- Como você sabe que deu certo? (critério de sucesso observável)

**Escopo**
- O que está dentro? O que está explicitamente fora?
- É uma feature nova, ajuste de existente, ou refatoração?

**Comportamento esperado (UX/UI quando aplicável)**
- Onde mora no site/app? (qual section, qual rota, qual componente)
- Como o usuário interage? (cliques, formulário, scroll, etc.)
- Estados: loading? vazio? erro? sucesso? mobile vs desktop?

**Dados & integrações**
- De onde vêm os dados? (hardcoded, JSON, API, CMS, env var)
- Algum serviço externo envolvido? (Vercel, Analytics, etc.)
- Algo persistente? (este projeto não tem backend hoje — confirmar se vai precisar)

**Restrições técnicas**
- Tem que respeitar a stack atual (Next.js 14 App Router, CSS Modules, sem libs extras)?
- Performance / SEO / acessibilidade são preocupações específicas aqui?

**Edge cases**
- O que acontece se a entrada for inválida / vazia / muito grande?
- O que acontece offline / sem JS / em telas pequenas?

**Prioridade & faseamento**
- É MVP ou versão final? Tem partes que podem ficar para depois?

### Passo 3 — Eco e validação

Depois de 1–2 rodadas de perguntas, **espelhe o entendimento** em uma frase ou dois bullets curtos: "Então o que você quer é X que faz Y, vivendo em Z, com a restrição W. Faz sentido?". Se o usuário corrigir, ajuste e pergunte o que ainda falta.

### Passo 4 — Sinal de fim

Encerre quando você consegue responder, sem chutar:
- O que vai ser construído (em uma frase)
- Onde no código vai morar (arquivos/sections afetados)
- Como o usuário vai interagir
- Quais dados/inputs entram e o que sai
- Quais estados/edge cases são tratados
- O que está fora de escopo

## Output final desta skill

Quando o escopo estiver fechado, produza um **resumo de planejamento** em chat (não em arquivo) com este formato:

```markdown
## Plano da feature: <nome curto>

**Objetivo:** <1–2 frases do problema/valor>

**Escopo (in):**
- <bullet>
- <bullet>

**Escopo (out):**
- <bullet>

**Onde mora:** <arquivos/sections do projeto>

**Comportamento:** <fluxo principal em 2–4 linhas, incluindo estados>

**Dados/integrações:** <de onde vêm, formato, persistência>

**Edge cases:** <lista>

**Critério de sucesso:** <como vamos saber que tá pronto>

**Suposições assumidas:** <lista, ou "nenhuma">

**Próximo passo sugerido:** rodar `/create-specs` para gerar `specs/<slug>/`.
```

E então pare. Não chame `/create-specs` automaticamente — espere o usuário decidir.

## Anti-padrões a evitar

- Pular para "vou criar a feature em X passos" sem ter perguntado nada.
- Fazer um questionário gigante de uma vez (cansa o usuário e gera respostas rasas).
- Aceitar respostas vagas ("tipo, um carrossel legal") sem desempacotar — pergunte exemplos, referências, comportamento concreto.
- Pular a validação ("eco") — sem ela você pode estar construindo o entendimento errado.
- Encerrar com ambiguidades não resolvidas e empurrar a decisão para o `/create-specs`.
