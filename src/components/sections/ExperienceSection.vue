<!--
  ExperienceSection — linha do tempo de experiências profissionais

  Mesma estratégia da ProjectsSection: a store guarda ExperienceData[]
  (com LocalizedString), e o computed `resolvedExperiences` converte para
  Experience[] (strings planas) antes de renderizar.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useProjectsStore } from '@/stores/projects'
import { useLocaleStore } from '@/stores/locale'
import TechBadge from '@/components/ui/TechBadge.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import type { Experience } from '@/types'

const store = useProjectsStore()
const { experiences } = storeToRefs(store)
const { el, isVisible } = useScrollReveal({ delay: 100 })

const { locale, currentLocale } = storeToRefs(useLocaleStore())

// Resolve LocalizedString → string com base no idioma ativo
const resolvedExperiences = computed<Experience[]>(() =>
  experiences.value.map((exp) => ({
    ...exp,
    role: exp.role[currentLocale.value],
    description: exp.description.map((d) => d[currentLocale.value]),
  })),
)
</script>

<template>
  <section
    id="experiencia"
    ref="el"
    :class="[
      'py-24 px-6 bg-dark-surface/30 transition-all duration-700',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
    ]"
  >
    <div class="max-w-3xl mx-auto">
      <SectionTitle
        :label="locale.experience.label"
        :title="locale.experience.title"
        :subtitle="locale.experience.subtitle"
      />

      <!-- Linha do tempo -->
      <div class="relative">
        <!-- Linha vertical -->
        <div class="absolute left-4 top-0 bottom-0 w-px bg-dark-border"></div>

        <div class="flex flex-col gap-10">
          <article v-for="exp in resolvedExperiences" :key="exp.id" class="pl-12 relative">
            <!-- Ponto na linha -->
            <div
              class="absolute left-0 top-1 w-8 h-8 rounded-full bg-dark-surface border-2 border-neon-green flex items-center justify-center"
            >
              <div class="w-2 h-2 rounded-full bg-neon-green"></div>
            </div>

            <!-- Período -->
            <p class="font-mono text-neon-green text-xs mb-1">{{ exp.period }}</p>

            <!-- Empresa e cargo -->
            <h3 class="text-dark-text font-semibold text-lg">{{ exp.role }}</h3>
            <p class="text-dark-muted text-sm mb-4">{{ exp.company }}</p>

            <!-- Responsabilidades -->
            <ul class="flex flex-col gap-2 mb-4">
              <li
                v-for="item in exp.description"
                :key="item"
                class="text-dark-muted text-sm flex gap-2"
              >
                <span class="text-neon-green font-mono shrink-0">›</span>
                <span>{{ item }}</span>
              </li>
            </ul>

            <!-- Tech stack -->
            <div class="flex flex-wrap gap-2">
              <TechBadge v-for="tech in exp.techStack" :key="tech" :label="tech" />
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
