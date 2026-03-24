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
//
// Nota sobre i18n:
// Os campos `title`, `description` e `role` são do tipo
// LocalizedString — têm versão PT e EN.
// Os componentes de seção resolvem o idioma antes de
// passar os dados para os componentes UI (ProjectCard, etc.).
// ============================================================

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ProjectData, ExperienceData } from '@/types'

export const useProjectsStore = defineStore('projects', () => {
  // ----------------------------------------------------------
  // Estado
  // ----------------------------------------------------------

  const projects = ref<ProjectData[]>([
    {
      id: 'agendamento-saude',
      title: {
        pt: 'Sistema de Agendamento',
        en: 'Scheduling System',
      },
      description: {
        pt: 'Sistema de agendamento para instituição de saúde com autenticação, gestão de pacientes e controle de horários. Desenvolvido com foco no backend usando Django e suas views nativas com templates HTML para renderização server-side.',
        en: 'Scheduling system for a healthcare institution with authentication, patient management, and appointment control. Built with a backend focus using Django native views and HTML templates for server-side rendering.',
      },
      techStack: ['Python', 'Django', 'PostgreSQL', 'HTML'],
      repoUrl: 'https://github.com/arthurfurtunato/agenda_covid',
      featured: true,
    },
    {
      id: 'crud-provas',
      title: {
        pt: 'CRUD de Provas',
        en: 'Exam Management CRUD',
      },
      description: {
        pt: 'Plataforma completa de avaliações com cadastro de provas, questões e alternativas. Permite que usuários realizem as provas e vejam os resultados. Arquitetura REST com NestJS e banco PostgreSQL containerizado com Docker.',
        en: 'Full-featured exam platform with registration of tests, questions, and answer choices. Users can take exams and view their results. REST architecture with NestJS and a Dockerized PostgreSQL database.',
      },
      techStack: ['NestJS', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
      repoUrl: 'https://github.com/arthurfurtunato/crud-prova',
      featured: true,
    },
    {
      id: 'arlo-erp',
      title: {
        pt: 'Arlo (ERP)',
        en: 'Arlo (ERP)',
      },
      description: {
        pt: 'Sistema ERP para gestão de projetos de fundações, cobrindo fluxos financeiros, operacionais e de conformidade. Arquitetura orientada a eventos com processamento assíncrono via Celery para tarefas de longa duração.',
        en: 'ERP system for managing foundation projects, covering financial, operational, and compliance workflows. Event-driven architecture with asynchronous processing via Celery for long-running tasks.',
      },
      techStack: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Celery'],
      featured: true,
    },
    {
      id: 'vertice-fisio',
      title: {
        pt: 'Clínica Vértice — Landing Page',
        en: 'Vértice Clinic — Landing Page',
      },
      description: {
        pt: 'Landing page para clínica de fisioterapia em Natal/RN. Apresentação de serviços, equipe e contato, com design responsivo e foco em conversão.',
        en: 'Landing page for a physiotherapy clinic in Natal, Brazil. Presents services, team, and contact info with a responsive design focused on conversion.',
      },
      techStack: ['HTML', 'CSS', 'JavaScript'],
      repoUrl: 'https://github.com/arthurfurtunato/verticefisio.github.io',
      liveUrl: 'https://verticefisio.com.br',
      featured: true,
    },
  ])

  const experiences = ref<ExperienceData[]>([
    {
      id: 'somos-educacao',
      company: 'Somos Educação',
      role: {
        pt: 'Desenvolvedor Backend',
        en: 'Backend Developer',
      },
      period: 'Jul 2022 – Presente',
      description: [
        {
          pt: 'Squad de avaliações: manutenção e evolução do sistema de aplicação de provas online',
          en: 'Assessment squad: maintenance and evolution of the online exam application system',
        },
        {
          pt: 'Desenvolvimento de APIs para gestão de eventos, resultados e correção automática',
          en: 'Development of APIs for event management, results, and automated grading',
        },
        {
          pt: 'Experiência com infraestrutura AWS (EC2, S3, SQS) integrada aos serviços backend',
          en: 'Experience with AWS infrastructure (EC2, S3, SQS) integrated with backend services',
        },
        {
          pt: 'Contribuições pontuais em projetos internos com Ruby on Rails',
          en: 'Occasional contributions to internal projects using Ruby on Rails',
        },
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
      role: {
        pt: 'Bolsista / Estagiário Backend',
        en: 'Backend Intern',
      },
      period: 'Nov 2021 – Jun 2022',
      description: [
        {
          pt: 'Manutenção do backend de sistemas de regulação de leitos e atendimento ambulatorial do RN',
          en: 'Maintenance of backend systems for bed regulation and outpatient care in Rio Grande do Norte',
        },
        {
          pt: 'Correção de vulnerabilidades de SQL Injection em filtros de querys existentes',
          en: 'Fixed SQL Injection vulnerabilities in existing query filters',
        },
        {
          pt: 'Criação e otimização de queries complexas em PostgreSQL para relatórios de saúde',
          en: 'Created and optimized complex PostgreSQL queries for health reports',
        },
        {
          pt: 'Desenvolvimento de novos endpoints REST e refatoração de código legado',
          en: 'Developed new REST endpoints and refactored legacy code',
        },
      ],
      techStack: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    },
  ])

  // Filtro ativo — string vazia significa "todos"
  const activeFilter = ref<string>('')

  // ----------------------------------------------------------
  // Computed
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
  // ----------------------------------------------------------

  function setFilter(tech: string) {
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
