<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// TerminalText.vue — Efeito typewriter que cicla por um array de textos
//
// Conceitos introduzidos aqui:
//
// ref(): cria uma variável reativa. Quando o valor muda,
//   o Vue atualiza o template automaticamente.
//   Em <script> acessa via .value. No <template>, o Vue
//   faz o unwrap automático (não precisa de .value).
//
// onMounted(): callback executado quando o componente
//   é inserido no DOM. Equivalente ao @PostConstruct do Spring.
//
// onUnmounted(): callback executado quando o componente
//   é removido do DOM. Usado para limpar timers e evitar
//   memory leaks — equivalente ao @PreDestroy.

const props = withDefaults(
  defineProps<{
    texts: string[]
    speed?: number    // ms por caractere ao digitar
    eraseSpeed?: number // ms por caractere ao apagar
    pauseDuration?: number // ms de pausa entre textos
  }>(),
  {
    speed: 80,
    eraseSpeed: 40,
    pauseDuration: 2000,
  }
)

const displayed = ref('')   // texto visível no momento
const showCursor = ref(true) // controla o piscar do cursor

let timeoutId: ReturnType<typeof setTimeout> | null = null
let cursorIntervalId: ReturnType<typeof setInterval> | null = null
let textIndex = 0
let charIndex = 0
let isErasing = false

function type() {
  const currentText = props.texts[textIndex] ?? ''

  if (!isErasing) {
    // Ainda digitando: adiciona o próximo caractere
    if (charIndex < currentText.length) {
      displayed.value = currentText.slice(0, charIndex + 1)
      charIndex++
      timeoutId = setTimeout(type, props.speed)
    } else {
      // Texto completo: pausa antes de começar a apagar
      isErasing = true
      timeoutId = setTimeout(type, props.pauseDuration)
    }
  } else {
    // Apagando: remove o último caractere
    if (charIndex > 0) {
      charIndex--
      displayed.value = currentText.slice(0, charIndex)
      timeoutId = setTimeout(type, props.eraseSpeed)
    } else {
      // Texto apagado: passa para o próximo
      isErasing = false
      textIndex = (textIndex + 1) % props.texts.length
      timeoutId = setTimeout(type, props.speed)
    }
  }
}

onMounted(() => {
  // Inicia o efeito quando o componente aparece no DOM
  timeoutId = setTimeout(type, props.speed)

  // Cursor piscando independente do typewriter
  cursorIntervalId = setInterval(() => {
    showCursor.value = !showCursor.value
  }, 530)
})

onUnmounted(() => {
  // Limpa os timers para evitar memory leak
  // (o componente pode ser desmontado enquanto o timer ainda roda)
  if (timeoutId) clearTimeout(timeoutId)
  if (cursorIntervalId) clearInterval(cursorIntervalId)
})
</script>

<template>
  <span class="font-mono">
    <span class="text-neon-green">{{ displayed }}</span>
    <span
      class="inline-block w-0.5 h-5 bg-neon-green ml-0.5 align-middle"
      :class="{ 'opacity-0': !showCursor }"
    ></span>
  </span>
</template>
