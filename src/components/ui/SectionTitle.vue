<script setup lang="ts">
// SectionTitle.vue — Título padrão de seção
//
// Conceito: prop opcional com ?
// Se subtitle não for passado, o v-if esconde o elemento.

defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="mb-12">
    <p class="font-mono text-neon-green text-sm mb-2">&gt; {{ title.toLowerCase() }}</p>
    <h2 class="text-3xl md:text-4xl font-bold text-dark-text">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="text-dark-muted mt-3 max-w-xl">
      {{ subtitle }}
    </p>
    <div class="mt-4 w-16 h-0.5 bg-neon-green"></div>
  </div>
</template>
