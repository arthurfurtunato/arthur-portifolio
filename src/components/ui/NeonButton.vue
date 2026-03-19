<script setup lang="ts">
// NeonButton.vue — Botão neon reutilizável
//
// Conceitos:
// - withDefaults(): define valor padrão para props opcionais
// - :class com objeto: aplica classe condicionalmente
//   { 'classe': condicao } — a classe é aplicada se condicao for true
// - <component :is="tag">: renderiza tags HTML dinamicamente
//   Se href for passado, renderiza <a>. Senão, renderiza <button>.

const props = withDefaults(
  defineProps<{
    href?: string
    variant?: 'primary' | 'ghost'
    target?: string
  }>(),
  {
    variant: 'primary',
  },
)

const tag = props.href ? 'a' : 'button'
</script>

<template>
  <component
    :is="tag"
    :href="href"
    :target="target"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    class="inline-block font-mono text-sm px-6 py-3 rounded transition-all duration-300 cursor-pointer"
    :class="{
      'bg-neon-green text-dark-bg hover:shadow-lg hover:brightness-110': variant === 'primary',
      'border border-neon-green text-neon-green hover:bg-neon-green hover:text-dark-bg':
        variant === 'ghost',
    }"
  >
    <slot />
  </component>
</template>
