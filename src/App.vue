<script setup lang="ts">
// App.vue — Componente raiz (thin shell)
//
// Responsabilidade: apenas montar o layout e o RouterView.
// Toda lógica de UI fica em DefaultLayout e nos componentes filhos.
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>

<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
</template>
