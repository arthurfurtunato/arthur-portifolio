// ============================================================
// Store de Locale — Pinia
//
// Guarda qual idioma está ativo e expõe o objeto de traduções
// correspondente como um computed reativo.
//
// Uso nos componentes:
//   const { locale, currentLocale, toggleLocale } = useLocaleStore()
//   // ou com storeToRefs para reatividade:
//   const { locale, currentLocale } = storeToRefs(useLocaleStore())
//   const { toggleLocale } = useLocaleStore()
// ============================================================

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import pt from '@/locales/pt'
import en from '@/locales/en'

export type LocaleCode = 'pt' | 'en'

export const useLocaleStore = defineStore('locale', () => {
  // Idioma ativo — começa em PT
  const currentLocale = ref<LocaleCode>('pt')

  // computed: retorna o objeto de tradução correto.
  // Quando currentLocale muda, todos os componentes que
  // dependem de `locale` re-renderizam automaticamente.
  const locale = computed(() => (currentLocale.value === 'pt' ? pt : en))

  function toggleLocale() {
    currentLocale.value = currentLocale.value === 'pt' ? 'en' : 'pt'
  }

  return { currentLocale, locale, toggleLocale }
})
