<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'

// useWindowScroll() — composable do @vueuse/core
// Retorna refs reativas com a posição atual do scroll.
// Quando o usuário scrolla, y.value atualiza automaticamente
// e o Vue re-renderiza os bindings que dependem de y.

const { y } = useWindowScroll()

// computed() que depende de y: recalcula cada vez que y muda.
// Se y > 60, o header ganha backdrop-blur (efeito frosted glass).
const isScrolled = computed(() => y.value > 60)

// ref(false): estado local do menu mobile.
// Quando muda, o Vue atualiza o v-show no template.
const mobileMenuOpen = ref(false)

function toggleMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function closeMenu() {
  mobileMenuOpen.value = false
}

const navLinks = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Experiência', href: '#experiencia' },
]
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isScrolled
      ? 'bg-dark-bg/90 backdrop-blur-md border-b border-dark-border'
      : 'bg-transparent'"
  >
    <div class="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo / nome -->
      <a href="#inicio" class="font-mono text-neon-green text-sm hover:opacity-80 transition-opacity">
        arthurfurtunato<span class="animate-blink">_</span>
      </a>

      <!-- Nav desktop — hidden em mobile, flex em md+ -->
      <nav class="hidden md:flex items-center gap-8">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="font-mono text-sm text-dark-muted hover:text-neon-green transition-colors duration-200"
        >
          {{ link.label }}
        </a>
        <a
          href="https://github.com/arthurfurtunato"
          target="_blank"
          rel="noopener noreferrer"
          class="font-mono text-sm border border-neon-green text-neon-green px-4 py-1.5 rounded hover:bg-neon-green hover:text-dark-bg transition-all duration-200"
        >
          GitHub
        </a>
      </nav>

      <!-- Botão hamburger — visível apenas em mobile -->
      <!-- @click: escuta o evento de clique e chama a função -->
      <button
        class="md:hidden flex flex-col gap-1.5 p-2 text-dark-muted hover:text-neon-green transition-colors"
        aria-label="Menu"
        @click="toggleMenu"
      >
        <!-- As três linhas do hamburger, com animação de X quando aberto -->
        <span
          class="block w-5 h-0.5 bg-current transition-all duration-300"
          :class="mobileMenuOpen ? 'rotate-45 translate-y-2' : ''"
        ></span>
        <span
          class="block w-5 h-0.5 bg-current transition-all duration-300"
          :class="mobileMenuOpen ? 'opacity-0' : ''"
        ></span>
        <span
          class="block w-5 h-0.5 bg-current transition-all duration-300"
          :class="mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''"
        ></span>
      </button>
    </div>

    <!-- Menu mobile — v-show: mantém o elemento no DOM mas controla
         display com CSS. Melhor que v-if para animações. -->
    <div
      v-show="mobileMenuOpen"
      class="md:hidden border-t border-dark-border bg-dark-bg/95 backdrop-blur-md"
    >
      <nav class="flex flex-col px-6 py-4 gap-4">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="font-mono text-sm text-dark-muted hover:text-neon-green transition-colors py-2"
          @click="closeMenu"
        >
          {{ link.label }}
        </a>
      </nav>
    </div>
  </header>
</template>
