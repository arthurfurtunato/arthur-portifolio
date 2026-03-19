# Arthur Furtunato Portfolio — Convenções do Projeto

## Stack
Vue 3 + Vite + TypeScript + Tailwind CSS v4 + Pinia + Vue Router 4
Deploy: Vercel | Domínio: arthurfurtunato.dev

## Objetivo de Aprendizado
Projeto de aprendizado de frontend para desenvolvedor backend.
Conceitos-chave a reforçar: Composition API, reatividade, design de componentes, state management.

---

## Organização de Componentes

```
src/
├── components/
│   ├── ui/       — Primitivos reutilizáveis (sem acesso a stores)
│   ├── layout/   — AppHeader, AppFooter (estruturais)
│   └── sections/ — Seções completas da página (podem usar stores)
├── composables/  — Lógica reutilizável (padrão useXxx)
├── layouts/      — DefaultLayout.vue (casca da página)
├── stores/       — Pinia stores (um arquivo por domínio)
├── types/        — Interfaces TypeScript (sempre criar aqui primeiro!)
└── views/        — Componentes de rota (montam seções)
```

---

## Regras de Código

- **SEMPRE** usar `<script setup lang="ts">` — nunca Options API (`export default { data() {} }`)
- Props: `defineProps<{ prop: Tipo }>()` com generic TypeScript
- Emits: `defineEmits<{ nomeEvento: [payload: Tipo] }>()` com generic TypeScript
- Usar `ref()` para primitivos e `reactive()` para objetos complexos
- Composables começam com `use` (ex: `useIntersectionObserver`)
- **Proibido** usar `any` — usar `unknown` ou definir uma interface

## Tailwind v4

A configuração do tema fica em `src/assets/main.css` dentro do bloco `@theme`:
```css
@theme {
  --color-neon-green: #00FF87;
  /* adicionar novas cores aqui, não em outros lugares */
}
```
Uso nas classes: `text-neon-green`, `bg-dark-bg`, `border-neon-cyan`, etc.

**Atenção**: Não usar classes com valores dinâmicos em template strings:
```ts
// ❌ Errado — a classe será removida no build de produção
const cls = `text-${color}-500`

// ✅ Correto — usar classes completas
const cls = color === 'green' ? 'text-neon-green' : 'text-neon-cyan'
```

---

## Armadilhas Comuns (para quem vem do Backend)

| Armadilha | Problema | Solução |
|-----------|----------|---------|
| Options API | Vue 2. Evitar. | Sempre `<script setup>` |
| `const { x } = store` | Perde reatividade | Usar `storeToRefs(store)` |
| `.value` em template | Não necessário | Vue auto-unwrap em `<template>` |
| Mutação direta de estado Pinia | Bypassa reatividade | Sempre via actions |
| CSS sem `@layer` no main.css | Sobrescreve utilitários Tailwind (ex: `mb-*` para de funcionar) | Sempre colocar resets dentro de `@layer base` |
| `ref="el"` gera aviso TS "never read" | Falso positivo — TS não enxerga uso via template | Ignorar, é comportamento esperado do Vue com template refs |
| Classes dinâmicas com template string | Tailwind remove no build | Usar objetos/ternários com classes completas |

---

## Comandos

```bash
npm run dev          # Dev server (localhost:5173)
npm run build        # Build produção → dist/
npm run preview      # Preview do build de produção
npm run type-check   # Verificar TypeScript sem compilar
npm run lint         # ESLint
npm run format       # Prettier
npm run test:unit    # Vitest
```

---

## Fases de Desenvolvimento

- **Fase 1** ✅ Setup: Scaffold, Tailwind v4, Router, Layout, vercel.json
- **Fase 2** ✅ Componentes Base: Hero, About, AppHeader, AppFooter, primitivos UI (TechBadge, NeonButton, SectionTitle, TerminalText)
- **Fase 3** ✅ Projetos + Pinia: Store com projetos/experiências reais, ProjectCard, filtro por tech, ExperienceSection (linha do tempo)
- **Fase 4** ✅ Animações: useScrollReveal composable, stagger no Hero, TransitionGroup nos cards
- **Fase 5** ⏳ Deploy: Git, Vercel, DNS, domínio customizado

---

## Arquivos Críticos

| Arquivo | Propósito |
|---------|-----------|
| `src/types/index.ts` | Interfaces TypeScript — **editar aqui antes de criar componentes** |
| `src/assets/main.css` | Paleta de cores e animações (Tailwind v4 `@theme`) |
| `src/stores/projects.ts` | Source of truth dos projetos (Pinia) |
| `src/router/index.ts` | Rotas e scrollBehavior |
| `vercel.json` | SPA rewrites — obrigatório para routing funcionar em produção |

---

## Convenções Git

```
tipo: descrição curta em minúsculas

Exemplos:
feat: add hero section with typewriter animation
fix: mobile menu not closing on route change
chore: update dependencies
style: adjust neon glow intensity
refactor: extract scroll logic to composable
docs: update CLAUDE.md with phase 2 progress
```

---

## Componentes e Composables Criados

| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| `src/components/ui/TechBadge.vue` | Primitivo | Pill de tecnologia |
| `src/components/ui/NeonButton.vue` | Primitivo | Botão com variantes primary/ghost |
| `src/components/ui/SectionTitle.vue` | Primitivo | Título de seção com label terminal |
| `src/components/ui/TerminalText.vue` | Primitivo | Efeito typewriter com ciclo de textos |
| `src/components/ui/ProjectCard.vue` | Primitivo | Card de projeto (recebe `Project` via props) |
| `src/components/layout/AppHeader.vue` | Layout | Header com navegação e menu mobile |
| `src/components/layout/AppFooter.vue` | Layout | Rodapé |
| `src/components/sections/HeroSection.vue` | Seção | Fullscreen com typewriter e stagger animation |
| `src/components/sections/AboutSection.vue` | Seção | Bio, stats e skills por categoria |
| `src/components/sections/ProjectsSection.vue` | Seção | Grid de projetos com filtro por tech |
| `src/components/sections/ExperienceSection.vue` | Seção | Linha do tempo profissional |
| `src/composables/useScrollReveal.ts` | Composable | IntersectionObserver — revela elemento ao entrar na viewport |
| `src/stores/projects.ts` | Store | Source of truth de projetos e experiências + filtro |

---

## Notas de Aprendizado

- `computed()` é como uma propriedade derivada — só recalcula quando as dependências mudam. Equivale a um getter calculado no backend.
- `storeToRefs()` é obrigatório ao desestruturar estado/computed de uma store Pinia — sem ele, a reatividade é perdida. Actions podem ser desestruturadas direto.
- CSS layers (`@layer base/components/utilities`) definem prioridade de cascata. CSS sem layer tem prioridade sobre todos os layers — por isso resets devem ficar em `@layer base`.
- `onUnmounted()` é o lugar certo para limpar timers e observers — equivale ao `@PreDestroy` do Spring.
- `<TransitionGroup>` anima listas quando itens entram/saem. Precisa de `:key` único em cada item.
- Template refs (`ref="el"`) são preenchidos pelo Vue após o mount. O aviso "never read" do TS é um falso positivo conhecido.
