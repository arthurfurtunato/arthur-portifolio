<script setup lang="ts">
// TechBadge.vue — Pill para exibir uma tecnologia
//
// Conceito: defineProps<T>() com TypeScript generic.
// O tipo da prop é verificado em tempo de compilação —
// se você passar um número onde espera string, o TS avisa.

defineProps<{
  label: string
}>()
</script>

<template>
  <span class="inline-block font-mono text-xs px-3 py-1 border border-dark-border text-dark-muted rounded-full hover:border-neon-green hover:text-neon-green transition-colors duration-200">
    {{ label }}
  </span>
</template>
