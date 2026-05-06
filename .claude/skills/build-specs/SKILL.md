---
name: build-specs
description: Implementa uma feature lendo specs/<slug>/{summary,design,tasks}.md como contrato. Executa as tasks em ordem, marca os checkboxes do tasks.md conforme avança, e roda lint/build no final. Não improvisa fora do que está nas specs sem perguntar.
---

# Build Specs

Pega uma feature já especificada (gerada via `/create-specs` ou escrita à mão dentro de `specs/<slug>/`) e a **implementa de verdade**, seguindo o contrato dos três arquivos: `summary.md`, `design.md`, `tasks.md`.

## Regras de ouro

1. **As specs são o contrato.** Se algo no código sugerir um caminho diferente do `design.md`, **pare e pergunte** antes de divergir. Não decida sozinho.
2. **Tasks em ordem.** Execute `tasks.md` de cima para baixo. Não pule fases — Setup antes de Implementação, Implementação antes de Estilos, Verificação por último.
3. **Marque os checkboxes em tempo real.** Ao terminar uma task, edite `tasks.md` trocando `- [ ]` por `- [x]`. **Imediatamente** após concluir, não no final.
4. **Não invente escopo novo.** Se aparece algo que não está nas specs (refatoração tentadora, "while I'm here"), anote para depois — não implemente.
5. **Siga as convenções do projeto.** Releia [CLAUDE.md](../../../CLAUDE.md) antes de codar. CSS Modules, Server Components por padrão, sem libs novas, etc.
6. **Verifique antes de declarar pronto.** A última fase do `tasks.md` é Verificação — `npm run lint`, `npm run build`, teste manual com `npm run dev`. Nada de "deve funcionar".

## Fluxo

### 1. Selecionar a spec
- Se o usuário disse o slug, use `specs/<slug>/`.
- Se não disse, liste `specs/` e pergunte qual.
- Se a pasta não tem os três arquivos, **pare** e sugira rodar `/create-specs` antes.

### 2. Ler tudo antes de codar
Leia, **na ordem**:
1. `summary.md` — para entender objetivo e critério de sucesso.
2. `design.md` — para saber arquivos afetados, componentes, dados, estados.
3. `tasks.md` — para saber o passo a passo.

Também releia o [CLAUDE.md](../../../CLAUDE.md) e dê uma olhada nos arquivos que o `design.md` indica afetar (para confirmar que ainda existem e o estado atual deles).

### 3. Plano de execução
Antes da primeira edição, faça um TodoWrite refletindo as tarefas do `tasks.md` (uma task = um todo, agrupados por fase). Isso garante que você execute em ordem e não esqueça nada.

### 4. Executar fase a fase

Para cada checkbox:
1. **Marcar o todo correspondente como `in_progress`.**
2. **Implementar** a mudança (Edit/Write nos arquivos certos).
3. **Verificar** localmente que não quebrou nada óbvio (re-leia o arquivo se necessário, confira imports).
4. **Marcar o checkbox** no `tasks.md` (`- [ ]` → `- [x]`).
5. **Marcar o todo como `completed`.**

Se uma task se revelar inviável como descrita (ex.: arquivo que o design assumia existir não existe), **pare** e mostre ao usuário o conflito antes de improvisar.

### 5. Verificação final

A fase de Verificação do `tasks.md` é obrigatória:
- `npm run lint` — não introduzir novos warnings/erros.
- `npm run build` — passar (faz typecheck também).
- `npm run dev` — abrir o navegador, exercitar o caminho feliz e os edge cases listados no `design.md`. Se for UI, testar **desktop e mobile** (DevTools > responsive).
- Conferir item por item os critérios de sucesso do `summary.md`.

Se algum check falhar, **conserte antes** de declarar a feature pronta. Não passe build com erro.

### 6. Resumo final
Quando todos os checkboxes estiverem marcados e a verificação passar, responda ao usuário com:
- Lista curta dos arquivos criados/alterados.
- Confirmação de que `lint` e `build` passaram.
- O que foi testado manualmente (e o que **não** foi, se houver — ex.: "não testei em Safari").
- Se sobrou algo do "fora de escopo" do `summary.md` que valeria virar próxima spec.

**Não** rode `git commit` automaticamente — espere o usuário decidir.

## Quando parar e perguntar

Pare e pergunte ao usuário (não improvise) quando:
- O `design.md` está em conflito com o estado real do código.
- Uma task depende de algo (decisão de UX, asset, credencial, dado) que não está nas specs.
- Você descobre um bug pré-existente no caminho da feature — pergunte se conserta agora ou se vira spec separada.
- Surge uma decisão técnica que muda a abordagem (ex.: precisaria virar Client Component algo que o design dizia ser Server).
- Lint/build quebra por motivo não trivial e a correção mudaria escopo.

## Anti-padrões a evitar

- Implementar tudo de uma vez e marcar todos os checkboxes no final.
- Adicionar features "que ficariam legais" mas não estão nas specs.
- Pular a verificação manual ("o build passou, deve estar ok") em mudanças visuais.
- Editar `summary.md` ou `design.md` durante a implementação para "encaixar" o que você fez. Se o design precisa mudar, **pare, atualize a spec explicitamente, e siga**.
- Marcar checkbox de tarefa que não foi 100% concluída ("ah, falta só um detalhe").
- Criar testes/CI/abstrações que não estão no `tasks.md` por iniciativa própria.
- Rodar `git commit` ou `git push` sem o usuário pedir.

## Dica de eficiência

Para cada arquivo que vai editar, faça `Read` uma vez no início da fase relevante e mantenha o conteúdo em mente — evita re-ler entre micro-edições. Use Edit (não Write) quando o arquivo já existe.
