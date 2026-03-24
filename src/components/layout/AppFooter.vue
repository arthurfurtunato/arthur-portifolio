<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLocaleStore } from '@/stores/locale'

const year = new Date().getFullYear()
const { locale } = storeToRefs(useLocaleStore())
</script>

<template>
  <footer class="border-t border-dark-border py-8 px-6">
    <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="font-mono text-dark-muted text-sm">
        <span class="text-neon-green">©{{ year }}</span> Arthur Furtunato
      </p>
      <p class="font-mono text-dark-muted text-xs">
        {{ locale.footer.madeWith }}
      </p>
    </div>
  </footer>
</template>
