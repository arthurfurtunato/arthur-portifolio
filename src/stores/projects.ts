// ============================================================
// Store de Projetos e Experiências — Pinia
//
// Conceito-chave: Pinia é o "repositório/service" do frontend.
// Em vez de passar dados via props por vários níveis de
// componentes (props drilling), qualquer componente pode
// importar esta store e acessar os dados diretamente.
//
// defineStore(id, setup) → usamos a sintaxe "Setup Store",
// que é idêntica ao <script setup> dos componentes.
// ============================================================

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Project, Experience } from '@/types'

export const useProjectsStore = defineStore('projects', () => {
  // ----------------------------------------------------------
  // Estado
  // ref() para primitivos, reactive() para objetos complexos.
  // Aqui usamos ref() com arrays pois o array inteiro é
  // substituído/lido como unidade, não campo a campo.
  // ----------------------------------------------------------

  const projects = ref<Project[]>([
    {
      id: 'agendamento-saude',
      title: 'Sistema de Agendamento',
      description:
        'Sistema de agendamento para instituição de saúde com autenticação, gestão de pacientes e controle de horários. Desenvolvido com foco no backend usando Django e suas views nativas com templates HTML para renderização server-side.',
      techStack: ['Python', 'Django', 'PostgreSQL', 'HTML'],
      repoUrl: 'https://github.com/arthurfurtunato/agenda_covid',
      featured: true,
    },
    {
      id: 'crud-provas',
      title: 'CRUD de Provas',
      description:
        'Plataforma completa de avaliações com cadastro de provas, questões e alternativas. Permite que usuários realizem as provas e vejam os resultados. Arquitetura REST com NestJS e banco PostgreSQL containerizado com Docker.',
      techStack: ['NestJS', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
      repoUrl: 'https://github.com/arthurfurtunato/crud-prova',
      featured: true,
    },
    {
      id: 'arlo-erp',
      title: 'Arlo (ERP)',
      description:
        'Sistema ERP para gestão de projetos de fundações, cobrindo fluxos financeiros, operacionais e de conformidade. Arquitetura orientada a eventos com processamento assíncrono via Celery para tarefas de longa duração.',
      techStack: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Celery'],
      featured: true,
    },
    {
      id: 'vertice-fisio',
      title: 'Clínica Vértice — Landing Page',
      description:
        'Landing page para clínica de fisioterapia em Natal/RN. Apresentação de serviços, equipe e contato, com design responsivo e foco em conversão.',
      techStack: ['HTML', 'CSS', 'JavaScript'],
      repoUrl: 'https://github.com/arthurfurtunato/verticefisio.github.io',
      liveUrl: 'https://verticefisio.com.br',
      featured: true,
    },
  ])

  const experiences = ref<Experience[]>([
    {
      id: 'somos-educacao',
      company: 'Somos Educação',
      role: 'Desenvolvedor Backend',
      period: 'Jul 2022 – Presente',
      description: [
        'Squad de avaliações: manutenção e evolução do sistema de aplicação de provas online',
        'Desenvolvimento de APIs para gestão de eventos, resultados e correção automática',
        'Experiência com infraestrutura AWS (EC2, S3, SQS) integrada aos serviços backend',
        'Contribuições pontuais em projetos internos com Ruby on Rails',
      ],
      techStack: [
        'NestJS',
        'Node.js',
        'TypeScript',
        'PostgreSQL',
        'AWS',
        'Ruby on Rails',
        'RabbitMQ',
        'Redis',
      ],
    },
    {
      id: 'lais',
      company: 'LAIS — Laboratório de Inovação e Saúde (UFRN)',
      role: 'Bolsista / Estagiário Backend',
      period: 'Nov 2021 – Jun 2022',
      description: [
        'Manutenção do backend de sistemas de regulação de leitos e atendimento ambulatorial do RN',
        'Correção de vulnerabilidades de SQL Injection em filtros de querys existentes',
        'Criação e otimização de queries complexas em PostgreSQL para relatórios de saúde',
        'Desenvolvimento de novos endpoints REST e refatoração de código legado',
      ],
      techStack: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    },
  ])

  // Filtro ativo — string vazia significa "todos"
  const activeFilter = ref<string>('')

  // ----------------------------------------------------------
  // Computed (derivados reativos)
  //
  // computed() é como uma propriedade calculada que se
  // atualiza automaticamente quando suas dependências mudam.
  // Aqui: sempre que `activeFilter` ou `projects` mudar,
  // `filteredProjects` recalcula sozinho.
  // ----------------------------------------------------------

  const filteredProjects = computed(() => {
    if (!activeFilter.value) return projects.value
    return projects.value.filter((p) =>
      p.techStack.some((tech) => tech.toLowerCase() === activeFilter.value.toLowerCase()),
    )
  })

  // Lista de todas as tecnologias únicas para montar os botões de filtro
  const allTechs = computed(() => {
    const techs = projects.value.flatMap((p) => p.techStack)
    return [...new Set(techs)].sort()
  })

  // ----------------------------------------------------------
  // Actions
  //
  // Funções que modificam o estado. Em Pinia com Setup Store,
  // são funções normais — sem mutations, sem commits.
  // ----------------------------------------------------------

  function setFilter(tech: string) {
    // Toggle: clicar no filtro ativo limpa o filtro
    activeFilter.value = activeFilter.value === tech ? '' : tech
  }

  function clearFilter() {
    activeFilter.value = ''
  }

  return {
    projects,
    experiences,
    activeFilter,
    filteredProjects,
    allTechs,
    setFilter,
    clearFilter,
  }
})
