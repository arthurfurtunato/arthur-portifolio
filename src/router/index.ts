import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

// ==========================================================
// Vue Router — Configuração de rotas do portfólio
//
// Conceitos de aprendizado:
// - createWebHistory: URLs limpas sem o # (ex: /404)
// - Lazy loading: import() carrega o componente só quando
//   o usuário navega para aquela rota (melhor performance)
// - scrollBehavior: controla o scroll ao navegar entre páginas
// ==========================================================

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      // Rota catch-all: qualquer URL não encontrada cai aqui
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
  // scrollBehavior: controla o comportamento de scroll ao navegar
  scrollBehavior(to, _from, savedPosition) {
    // Ao clicar no botão voltar, volta para a posição anterior
    if (savedPosition) return savedPosition
    // Links com âncora (#sobre, #projetos) fazem scroll suave
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    // Por padrão, vai para o topo da página
    return { top: 0 }
  },
})

export default router
