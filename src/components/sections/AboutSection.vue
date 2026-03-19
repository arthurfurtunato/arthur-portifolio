<script setup lang="ts">
import { computed } from 'vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import TechBadge from '@/components/ui/TechBadge.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

// el → referência ao elemento DOM da seção
// isVisible → true quando 15% do elemento está na viewport
const { el, isVisible } = useScrollReveal({ delay: 100 })

// computed(): cria um valor derivado reativo.
// Só recalcula quando as dependências mudam.
// Aqui: calcula anos de experiência a partir de uma data fixa.
// Analogia backend: como uma @Transient + getter calculado.

const startYear = 2021
const yearsOfExperience = computed(() => new Date().getFullYear() - startYear)

// Dados das skills por categoria.
// Objeto literal diretamente no script — sem store porque
// esses dados nunca mudam e só são usados aqui.
const skills = [
  {
    category: 'Backend',
    items: ['Python', 'FastAPI', 'Node.js', 'NestJS', 'REST APIs'],
  },
  {
    category: 'Banco de Dados',
    items: ['PostgreSQL', 'Redis', 'MongoDB', 'Firestore'],
  },
  {
    category: 'DevOps & Cloud',
    items: ['Docker', 'AWS', 'CI/CD', 'Linux'],
  },
  {
    category: 'Aprendendo',
    items: ['Vue 3', 'Tailwind CSS'],
  },
]
</script>

<template>
  <section
    id="sobre"
    ref="el"
    :class="[
      'py-24 px-6 max-w-5xl mx-auto transition-all duration-700',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
    ]"
  >
    <SectionTitle title="Sobre" subtitle="Um pouco sobre quem eu sou e o que faço." />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <!-- Coluna esquerda: bio -->
      <div class="space-y-4 text-dark-muted leading-relaxed">
        <p>
          Olá! Sou Arthur, desenvolvedor backend com
          <span class="text-neon-green font-mono">{{ yearsOfExperience }}+ anos</span>
          de experiência construindo sistemas robustos e escaláveis.
        </p>
        <p>
          Trabalho principalmente com NestJS e NodeJS, e tenho experiência com Python usando Django
          e FastAPI, mas tenho explorado o ecossistema frontend — atualmente aprendendo Vue 3 na
          prática, construindo este portfólio.
        </p>
        <p>
          Acredito que bons sistemas nascem de código limpo, testes bem escritos e uma dose saudável
          de curiosidade.
        </p>
        <p>
          Atualmente estou animado com a IA, e sempre tentando entender como integrar essas novas
          tecnologias de forma ética e eficaz nos projetos que construo.
        </p>

        <!-- Stats rápidos -->
        <div class="grid grid-cols-2 gap-4 pt-4">
          <div class="border border-dark-border rounded-lg p-4">
            <p class="text-neon-green font-mono text-2xl font-bold">{{ yearsOfExperience }}+</p>
            <p class="text-dark-muted text-sm mt-1">anos de experiência</p>
          </div>
          <div class="border border-dark-border rounded-lg p-4">
            <p class="text-neon-green font-mono text-2xl font-bold">10+</p>
            <p class="text-dark-muted text-sm mt-1">projetos entregues</p>
          </div>
        </div>
      </div>

      <!-- Coluna direita: skills por categoria -->
      <!-- v-for com objeto: (valor, índice) ou (item, index) -->
      <div class="space-y-5">
        <div
          v-for="skillGroup in skills"
          :key="skillGroup.category"
          class="border border-dark-border rounded-lg p-4 bg-dark-surface"
        >
          <p class="font-mono text-xs text-neon-cyan mb-3">// {{ skillGroup.category }}</p>
          <!-- v-for aninhado: itera sobre os items de cada grupo -->
          <div class="flex flex-wrap gap-2">
            <TechBadge v-for="item in skillGroup.items" :key="item" :label="item" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
