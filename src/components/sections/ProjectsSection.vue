<!--
  ProjectsSection — seção de projetos com filtro por tecnologia

  Conceito: aqui usamos a store pela primeira vez em um componente.
  storeToRefs() é obrigatório para manter a reatividade ao desestruturar.

  Sem storeToRefs:
    const { filteredProjects } = store  ← perde reatividade, valor congela

  Com storeToRefs:
    const { filteredProjects } = storeToRefs(store)  ← reativo, atualiza na tela
-->
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProjectsStore } from '@/stores/projects'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const store = useProjectsStore()
const { el, isVisible } = useScrollReveal({ delay: 100 })

// storeToRefs: extrai refs reativas do estado e computed
const { filteredProjects, allTechs, activeFilter } = storeToRefs(store)

// Actions são funções normais — não precisam de storeToRefs
const { setFilter, clearFilter } = store
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
        label="> projetos"
        title="O que eu construí"
        subtitle="Principais projetos pessoais e profissionais que mostram minha evolução como desenvolvedor."
      />

      <!-- Filtros por tecnologia -->
      <div class="flex flex-wrap gap-2 mb-10">
        <!-- Botão "Todos" -->
        <button
          @click="clearFilter"
          :class="[
            'font-mono text-xs px-3 py-1 border rounded transition-colors duration-200',
            !activeFilter
              ? 'border-neon-green text-neon-green bg-neon-green/10'
              : 'border-dark-border text-dark-muted hover:border-dark-text hover:text-dark-text',
          ]"
        >
          todos
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
      <!--
        Transição de lista com <TransitionGroup>:
        - name="projects" gera as classes CSS: projects-enter-active, projects-leave-active etc.
        - tag="div" define o elemento wrapper do grupo
        - cada item precisa de :key único para o Vue rastrear as mudanças
      -->
      <TransitionGroup
        name="projects"
        tag="div"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <ProjectCard v-for="project in filteredProjects" :key="project.id" :project="project" />
      </TransitionGroup>

      <!-- Estado vazio -->
      <div v-if="filteredProjects.length === 0" class="text-center py-16 text-dark-muted font-mono">
        <p class="text-neon-green mb-2">> nenhum projeto encontrado</p>
        <p class="text-sm">tente outro filtro.</p>
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
