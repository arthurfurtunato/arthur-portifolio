<script setup lang="ts">
// HomeView.vue — Página principal
// Monta todas as seções em sequência.

import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
</script>

<template>
  <div>
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
    <ExperienceSection />
  </div>
</template>
