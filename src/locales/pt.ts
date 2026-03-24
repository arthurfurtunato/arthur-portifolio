// ============================================================
// Traduções em Português (PT-BR) — locale padrão
//
// Conceito: objeto JS simples com toda a UI text do site.
// O tipo `Locale` é inferido daqui e serve de contrato
// para os outros arquivos de idioma (ex: en.ts).
// ============================================================

const pt = {
  nav: {
    about: 'Sobre',
    projects: 'Projetos',
    experience: 'Experiência',
  },

  hero: {
    roles: [
      'Backend Developer',
      'Aprendendo Vue 3',
      'Amante de Código Limpo',
      'Entusiasta de IA',
    ],
    description:
      'Desenvolvedor backend apaixonado por código limpo, sistemas escaláveis, inteligência artificial e agora explorando o mundo do frontend.',
    cta: {
      projects: 'ver projetos',
      github: 'github',
    },
  },

  about: {
    title: 'Sobre',
    subtitle: 'Um pouco sobre quem eu sou e o que faço.',
    bio: {
      greeting: 'Olá! Sou Arthur, desenvolvedor backend com',
      greetingAfter: 'de experiência construindo sistemas robustos e escaláveis.',
      p2: 'Trabalho principalmente com NestJS e NodeJS, e tenho experiência com Python usando Django e FastAPI, mas tenho explorado o ecossistema frontend — atualmente aprendendo Vue 3 na prática, construindo este portfólio.',
      p3: 'Acredito que bons sistemas nascem de código limpo, testes bem escritos e uma dose saudável de curiosidade.',
      p4: 'Atualmente estou animado com a IA, e sempre tentando entender como integrar essas novas tecnologias de forma ética e eficaz nos projetos que construo.',
    },
    stats: {
      experience: 'anos de experiência',
      projects: 'projetos entregues',
    },
    skills: [
      { category: 'Backend', items: ['Python', 'FastAPI', 'Node.js', 'NestJS', 'REST APIs'] },
      { category: 'Banco de Dados', items: ['PostgreSQL', 'Redis', 'MongoDB', 'Firestore'] },
      { category: 'DevOps & Cloud', items: ['Docker', 'AWS', 'CI/CD', 'Linux'] },
      { category: 'Aprendendo', items: ['Vue 3', 'Tailwind CSS'] },
    ],
  },

  projects: {
    label: '> projetos',
    title: 'O que eu construí',
    subtitle:
      'Principais projetos pessoais e profissionais que mostram minha evolução como desenvolvedor.',
    filterAll: 'todos',
    empty: {
      title: '> nenhum projeto encontrado',
      hint: 'tente outro filtro.',
    },
  },

  experience: {
    label: '> experiência',
    title: 'Trajetória profissional',
    subtitle: 'Empresas e projetos onde coloquei a mão na massa.',
  },

  footer: {
    madeWith: 'feito com Vue 3 + Tailwind CSS',
  },
}

export default pt

// O tipo é inferido do objeto acima e exportado para que
// outros arquivos de locale possam implementar o mesmo contrato.
export type Locale = typeof pt
