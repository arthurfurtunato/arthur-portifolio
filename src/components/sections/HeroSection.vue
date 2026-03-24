<script setup lang="ts">
// HeroSection.vue — Seção fullscreen de abertura
//
// Conceitos:
// - Importar e usar componentes filhos
// - Passar arrays como props (:texts="[...]")
// - v-bind com : — diferença entre :prop="valor" e prop="texto literal"
//   :texts="array"  → passa o array JavaScript
//    texts="array"  → passaria a string "array"

import { storeToRefs } from 'pinia'
import TerminalText from '@/components/ui/TerminalText.vue'
import NeonButton from '@/components/ui/NeonButton.vue'
import { useLocaleStore } from '@/stores/locale'

const { locale } = storeToRefs(useLocaleStore())
</script>

<template>
  <section
    id="inicio"
    class="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
  >
    <!-- Grid de fundo decorativo -->
    <div
      class="absolute inset-0 bg-[linear-gradient(rgba(0,255,135,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,135,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"
    ></div>

    <!-- Conteúdo principal -->
    <div class="relative z-10 text-center max-w-3xl">
      <!-- Linha terminal acima do nome -->
      <p class="font-mono text-neon-green text-sm mb-6 opacity-80 animate-slide-up">
        ~/arthurfurtunato <span class="text-dark-muted">$</span> cat sobre.txt
      </p>

      <!-- Nome -->
      <h1
        class="text-5xl md:text-7xl font-bold text-dark-text mb-4 tracking-tight animate-slide-up delay-anim-100"
      >
        Arthur Furtunato
      </h1>

      <!-- Typewriter com roles — atualiza quando o idioma muda -->
      <div class="text-xl md:text-2xl mb-8 h-8 animate-slide-up delay-anim-200">
        <TerminalText :texts="locale.hero.roles" />
      </div>

      <!-- Descrição curta -->
      <p
        class="text-dark-muted text-lg mb-10 max-w-xl mx-auto leading-relaxed animate-slide-up delay-anim-300"
      >
        {{ locale.hero.description }}
      </p>

      <!-- CTAs -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-anim-400">
        <NeonButton href="#projetos" variant="primary">{{ locale.hero.cta.projects }}</NeonButton>
        <NeonButton href="https://github.com/arthurfurtunato" variant="ghost" target="_blank">
          {{ locale.hero.cta.github }}
        </NeonButton>
      </div>
    </div>

    <!-- Seta scroll indicador -->
    <div
      class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-1"
    >
      <div class="w-3 h-3 border-r-2 border-b-2 border-neon-green rotate-45"></div>
      <div class="w-3 h-3 border-r-2 border-b-2 border-neon-green rotate-45 opacity-40"></div>
    </div>
  </section>
</template>
