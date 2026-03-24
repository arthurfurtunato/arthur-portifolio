<!--
  ProjectsSection — seção de projetos com filtro por tecnologia

  Conceito: aqui usamos a store pela primeira vez em um componente.
  storeToRefs() é obrigatório para manter a reatividade ao desestruturar.

  Sem storeToRefs:
    const { filteredProjects } = store  ← perde reatividade, valor congela

  Com storeToRefs:
    const { filteredProjects } = storeToRefs(store)  ← reativo, atualiza na tela

  Sobre i18n:
  filteredProjects retorna ProjectData[] (com LocalizedString).
  O computed `resolvedProjects` converte para Project[] (strings planas)
  com base no idioma ativo — assim ProjectCard não precisa saber nada
  sobre localização e continua sendo um primitivo UI puro.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useProjectsStore } from '@/stores/projects'
import { useLocaleStore } from '@/stores/locale'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import type { Project } from '@/types'

const store = useProjectsStore()
const { el, isVisible } = useScrollReveal({ delay: 100 })

const { filteredProjects, allTechs, activeFilter } = storeToRefs(store)
const { setFilter, clearFilter } = store

const { locale, currentLocale } = storeToRefs(useLocaleStore())

// Resolve LocalizedString → string com base no idioma ativo.
// ProjectCard recebe Project (strings planas) e não precisa mudar.
const resolvedProjects = computed<Project[]>(() =>
  filteredProjects.value.map((p) => ({
    ...p,
    title: p.title[currentLocale.value],
    description: p.description[currentLocale.value],
  })),
)
</script>

<template>
  <section
    id="projetos"
    ref="el"
    :class="[
      'py-24 px-6 transition-all duration-700',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
    ]"
  >
    <div class="max-w-5xl mx-auto">
      <SectionTitle
        :label="locale.projects.label"
        :title="locale.projects.title"
        :subtitle="locale.projects.subtitle"
      />

      <!-- Filtros por tecnologia -->
      <div class="flex flex-wrap gap-2 mb-10">
        <!-- Botão "Todos / All" -->
        <button
          @click="clearFilter"
          :class="[
            'font-mono text-xs px-3 py-1 border rounded transition-colors duration-200',
            !activeFilter
              ? 'border-neon-green text-neon-green bg-neon-green/10'
              : 'border-dark-border text-dark-muted hover:border-dark-text hover:text-dark-text',
          ]"
        >
          {{ locale.projects.filterAll }}
        </button>

        <button
          v-for="tech in allTechs"
          :key="tech"
          @click="setFilter(tech)"
          :class="[
            'font-mono text-xs px-3 py-1 border rounded transition-colors duration-200',
            activeFilter === tech
              ? 'border-neon-green text-neon-green bg-neon-green/10'
              : 'border-dark-border text-dark-muted hover:border-dark-text hover:text-dark-text',
          ]"
        >
          {{ tech.toLowerCase() }}
        </button>
      </div>

      <!-- Grid de projetos -->
      <TransitionGroup
        name="projects"
        tag="div"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <ProjectCard
          v-for="project in resolvedProjects"
          :key="project.id"
          :project="project"
        />
      </TransitionGroup>

      <!-- Estado vazio -->
      <div v-if="resolvedProjects.length === 0" class="text-center py-16 text-dark-muted font-mono">
        <p class="text-neon-green mb-2">{{ locale.projects.empty.title }}</p>
        <p class="text-sm">{{ locale.projects.empty.hint }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Animação de entrada/saída dos cards ao filtrar */
.projects-enter-active,
.projects-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.projects-enter-from,
.projects-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
