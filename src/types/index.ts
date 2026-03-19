// ============================================
// Interfaces TypeScript do Portfólio
// Sempre defina os tipos ANTES de criar
// componentes ou stores que os usam.
// ============================================

export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  repoUrl?: string
  liveUrl?: string
  featured: boolean
  imageUrl?: string
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string        // ex: "Jan 2023 – Presente"
  description: string[] // bullets de responsabilidades
  techStack: string[]
}

export interface SocialLink {
  label: string
  url: string
  icon: string
}
