<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import TechBadge from '@/components/ui/TechBadge.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useLocaleStore } from '@/stores/locale'

// el → referência ao elemento DOM da seção
// isVisible → true quando 15% do elemento está na viewport
const { el, isVisible } = useScrollReveal({ delay: 100 })

// computed(): cria um valor derivado reativo.
// Só recalcula quando as dependências mudam.
// Aqui: calcula anos de experiência a partir de uma data fixa.
// Analogia backend: como uma @Transient + getter calculado.

const startYear = 2021
const yearsOfExperience = computed(() => new Date().getFullYear() - startYear)

// Locale: skills vêm do objeto de tradução (categorias variam por idioma)
const { locale } = storeToRefs(useLocaleStore())
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
    <SectionTitle :title="locale.about.title" :subtitle="locale.about.subtitle" />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <!-- Coluna esquerda: bio -->
      <div class="space-y-4 text-dark-muted leading-relaxed">
        <!-- Primeiro parágrafo tem o yearsOfExperience em destaque -->
        <p>
          {{ locale.about.bio.greeting }}
          <span class="text-neon-green font-mono">{{ yearsOfExperience }}+ anos</span>
          {{ locale.about.bio.greetingAfter }}
        </p>
        <p>{{ locale.about.bio.p2 }}</p>
        <p>{{ locale.about.bio.p3 }}</p>
        <p>{{ locale.about.bio.p4 }}</p>

        <!-- Stats rápidos -->
        <div class="grid grid-cols-2 gap-4 pt-4">
          <div class="border border-dark-border rounded-lg p-4">
            <p class="text-neon-green font-mono text-2xl font-bold">{{ yearsOfExperience }}+</p>
            <p class="text-dark-muted text-sm mt-1">{{ locale.about.stats.experience }}</p>
          </div>
          <div class="border border-dark-border rounded-lg p-4">
            <p class="text-neon-green font-mono text-2xl font-bold">10+</p>
            <p class="text-dark-muted text-sm mt-1">{{ locale.about.stats.projects }}</p>
          </div>
        </div>
      </div>

      <!-- Coluna direita: skills por categoria -->
      <div class="space-y-5">
        <div
          v-for="skillGroup in locale.about.skills"
          :key="skillGroup.category"
          class="border border-dark-border rounded-lg p-4 bg-dark-surface"
        >
          <p class="font-mono text-xs text-neon-cyan mb-3">// {{ skillGroup.category }}</p>
          <div class="flex flex-wrap gap-2">
            <TechBadge v-for="item in skillGroup.items" :key="item" :label="item" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
