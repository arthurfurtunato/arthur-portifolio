<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="min-h-screen flex items-center justify-center">
    <div class="bg-dark-bg rounded-lg shadow-lg p-12 w-full max-w-md">
      <div class="text-center">
        <p class="font-mono text-neon-green text-sm mb-2">&gt; erro 404</p>
        <h1 class="text-6xl font-bold text-dark-text mb-4">404</h1>
        <p class="text-dark-muted mb-5">Página não encontrada.</p>
        <RouterLink
          to="/"
          class="inline-block font-mono text-neon-green border border-neon-green px-8 py-3 hover:bg-neon-green hover:text-dark-bg transition-colors duration-300 rounded-lg"
        >
          &lt; voltar ao início
        </RouterLink>
      </div>
    </div>
  </section>
</template>
