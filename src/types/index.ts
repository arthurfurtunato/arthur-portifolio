// ============================================
// Interfaces TypeScript do Portfólio
// Sempre defina os tipos ANTES de criar
// componentes ou stores que os usam.
// ============================================

// Texto localizado: tem versão PT e EN.
// Usado nas stores para campos que precisam de tradução.
export interface LocalizedString {
  pt: string
  en: string
}

// --------------------------------------------------
// Project — versão "resolvida" (strings planas)
// Usada pelos componentes de UI (ex: ProjectCard).
// --------------------------------------------------
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

// --------------------------------------------------
// ProjectData — versão "localizada" (LocalizedString)
// Usada pela store. As seções resolvem para Project
// antes de passar para os componentes UI.
// --------------------------------------------------
export interface ProjectData extends Omit<Project, 'title' | 'description'> {
  title: LocalizedString
  description: LocalizedString
}

// --------------------------------------------------
// Experience — versão "resolvida" (strings planas)
// Usada pelo ExperienceSection para renderizar.
// --------------------------------------------------
export interface Experience {
  id: string
  company: string          // nome próprio — não muda entre idiomas
  role: string
  period: string           // datas — não traduzidas
  description: string[]   // bullets de responsabilidades
  techStack: string[]
}

// --------------------------------------------------
// ExperienceData — versão "localizada"
// Usada pela store.
// --------------------------------------------------
export interface ExperienceData extends Omit<Experience, 'role' | 'description'> {
  role: LocalizedString
  description: LocalizedString[]
}

export interface SocialLink {
  label: string
  url: string
  icon: string
}
