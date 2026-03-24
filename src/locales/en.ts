// ============================================================
// Traduções em Inglês (EN)
//
// O tipo `Locale` importado de pt.ts garante que este objeto
// tenha exatamente a mesma estrutura que o PT. Se faltar
// alguma chave, o TypeScript vai reclamar na hora.
// ============================================================

import type { Locale } from './pt'

const en: Locale = {
  nav: {
    about: 'About',
    projects: 'Projects',
    experience: 'Experience',
  },

  hero: {
    roles: [
      'Backend Developer',
      'Learning Vue 3',
      'Clean Code Lover',
      'AI Enthusiast',
    ],
    description:
      'Backend developer passionate about clean code, scalable systems, artificial intelligence, and now exploring the world of frontend.',
    cta: {
      projects: 'view projects',
      github: 'github',
    },
  },

  about: {
    title: 'About',
    subtitle: 'A little about who I am and what I do.',
    bio: {
      greeting: "Hi! I'm Arthur, a backend developer with",
      greetingAfter: 'years of experience building robust and scalable systems.',
      p2: 'I mainly work with NestJS and Node.js, and have experience with Python using Django and FastAPI, but have been exploring the frontend ecosystem — currently learning Vue 3 in practice by building this portfolio.',
      p3: 'I believe great systems are born from clean code, well-written tests, and a healthy dose of curiosity.',
      p4: "I'm currently excited about AI, and always trying to understand how to integrate these new technologies ethically and effectively into the projects I build.",
    },
    stats: {
      experience: 'years of experience',
      projects: 'projects delivered',
    },
    skills: [
      { category: 'Backend', items: ['Python', 'FastAPI', 'Node.js', 'NestJS', 'REST APIs'] },
      { category: 'Database', items: ['PostgreSQL', 'Redis', 'MongoDB', 'Firestore'] },
      { category: 'DevOps & Cloud', items: ['Docker', 'AWS', 'CI/CD', 'Linux'] },
      { category: 'Learning', items: ['Vue 3', 'Tailwind CSS'] },
    ],
  },

  projects: {
    label: '> projects',
    title: 'What I built',
    subtitle: 'Key personal and professional projects that showcase my growth as a developer.',
    filterAll: 'all',
    empty: {
      title: '> no projects found',
      hint: 'try another filter.',
    },
  },

  experience: {
    label: '> experience',
    title: 'Professional journey',
    subtitle: 'Companies and projects where I got my hands dirty.',
  },

  footer: {
    madeWith: 'made with Vue 3 + Tailwind CSS',
  },
}

export default en
