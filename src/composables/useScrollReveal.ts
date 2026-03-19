// ============================================================
// useScrollReveal — revela elementos ao entrar na viewport
//
// Conceito: composables são funções que encapsulam lógica
// reativa reutilizável. O prefixo "use" é uma convenção
// (igual ao React hooks). Podem usar qualquer coisa do
// Composition API: ref, computed, watch, lifecycle hooks...
//
// IntersectionObserver é uma API do browser que dispara um
// callback quando um elemento entra ou sai da viewport.
// É muito mais eficiente que ouvir o evento "scroll".
//
// templateRef: quando você faz ref="el" no template, o Vue
// preenche aquele ref com o elemento DOM após o mount.
// ============================================================

import { ref, onMounted, onUnmounted } from 'vue'

interface ScrollRevealOptions {
  threshold?: number // 0–1: quanto do elemento precisa estar visível (default 0.15)
  delay?: number // ms de delay antes de iniciar a animação (default 0)
  once?: boolean // animar só uma vez ou toda vez que entrar (default true)
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const { threshold = 0.15, delay = 0, once = true } = options

  // ref de template: começa null, preenchida pelo Vue após mount
  const el = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  let observer: IntersectionObserver | null = null
  let delayTimeout: ReturnType<typeof setTimeout> | null = null

  onMounted(() => {
    if (!el.value) return

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return

        if (entry.isIntersecting) {
          // Elemento entrou na viewport
          if (delay > 0) {
            delayTimeout = setTimeout(() => {
              isVisible.value = true
            }, delay)
          } else {
            isVisible.value = true
          }

          // Se once=true, para de observar após a primeira vez
          if (once) observer?.disconnect()
        } else if (!once) {
          // Se once=false, "desaparece" ao sair da viewport
          isVisible.value = false
        }
      },
      { threshold },
    )

    observer.observe(el.value)
  })

  onUnmounted(() => {
    // Limpeza obrigatória: evita memory leak e callbacks em
    // elementos que já saíram do DOM
    observer?.disconnect()
    if (delayTimeout) clearTimeout(delayTimeout)
  })

  return { el, isVisible }
}
