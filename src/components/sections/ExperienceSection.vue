<!--
  ExperienceSection — linha do tempo de experiências profissionais

  Aqui também usamos a store, mas só acessamos `experiences`
  que é dados estáticos (não tem filtro), então poderíamos até
  passar via props. Mas usar a store é mais simples e consistente.
-->
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProjectsStore } from '@/stores/projects'
import TechBadge from '@/components/ui/TechBadge.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const store = useProjectsStore()
const { experiences } = storeToRefs(store)
const { el, isVisible } = useScrollReveal({ delay: 100 })
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
        label="> experiência"
        title="Trajetória profissional"
        subtitle="Empresas e projetos onde coloquei a mão na massa."
      />

      <!-- Linha do tempo -->
      <div class="relative">
        <!-- Linha vertical -->
        <div class="absolute left-4 top-0 bottom-0 w-px bg-dark-border"></div>

        <div class="flex flex-col gap-10">
          <article v-for="exp in experiences" :key="exp.id" class="pl-12 relative">
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
                <!-- Seta terminal antes de cada bullet -->
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
