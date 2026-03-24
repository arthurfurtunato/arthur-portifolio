<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useLocaleStore } from '@/stores/locale'

const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 60)
const mobileMenuOpen = ref(false)

function toggleMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function closeMenu() {
  mobileMenuOpen.value = false
}

// Locale: storeToRefs para reatividade, toggleLocale direto da store
const localeStore = useLocaleStore()
const { locale, currentLocale } = storeToRefs(localeStore)
const { toggleLocale } = localeStore

// navLinks como computed: atualiza automaticamente quando o idioma muda
const navLinks = computed(() => [
  { label: locale.value.nav.about, href: '#sobre' },
  { label: locale.value.nav.projects, href: '#projetos' },
  { label: locale.value.nav.experience, href: '#experiencia' },
])
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

      <!-- Nav desktop -->
      <nav class="hidden md:flex items-center gap-8">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="font-mono text-sm text-dark-muted hover:text-neon-green transition-colors duration-200"
        >
          {{ link.label }}
        </a>

        <!-- Toggle de idioma PT | EN -->
        <button
          class="font-mono text-xs border border-dark-border rounded px-2 py-1 hover:border-neon-green transition-colors duration-200"
          :aria-label="currentLocale === 'pt' ? 'Switch to English' : 'Mudar para Português'"
          @click="toggleLocale"
        >
          <span :class="currentLocale === 'pt' ? 'text-neon-green' : 'text-dark-muted'">PT</span>
          <span class="text-dark-muted mx-1">|</span>
          <span :class="currentLocale === 'en' ? 'text-neon-green' : 'text-dark-muted'">EN</span>
        </button>

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
      <button
        class="md:hidden flex flex-col gap-1.5 p-2 text-dark-muted hover:text-neon-green transition-colors"
        aria-label="Menu"
        @click="toggleMenu"
      >
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

    <!-- Menu mobile -->
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

        <!-- Toggle de idioma no menu mobile -->
        <button
          class="font-mono text-xs border border-dark-border rounded px-2 py-1.5 w-fit hover:border-neon-green transition-colors duration-200"
          @click="toggleLocale"
        >
          <span :class="currentLocale === 'pt' ? 'text-neon-green' : 'text-dark-muted'">PT</span>
          <span class="text-dark-muted mx-1">|</span>
          <span :class="currentLocale === 'en' ? 'text-neon-green' : 'text-dark-muted'">EN</span>
        </button>
      </nav>
    </div>
  </header>
</template>
