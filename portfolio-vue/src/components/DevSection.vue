<template>
  <div ref="el">
    <span class="panel__dock-intro">The stack I reach for</span>

    <div class="skills-list">
      <div v-for="(s, i) in skills" :key="s.name" class="skill-row fade-in" :style="{ transitionDelay: i * 0.04 + 's' }">
        <span class="skill-num">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="skill-name">{{ s.name }}</span>
        <span class="skill-tag">{{ s.tag }}</span>
      </div>
    </div>

    <div style="margin-top: 3rem;">
      <span class="panel__dock-intro" style="color: rgba(245,158,11,0.3);">Recent Projects</span>
      <div class="project-grid">
        <div v-for="(p, i) in projects" :key="p.id"
          class="project-cell fade-in"
          :style="{ transitionDelay: i * 0.1 + 's' }"
          @mouseenter="e => e.currentTarget.querySelector('.photo-overlay').style.opacity = '1'"
          @mouseleave="e => e.currentTarget.querySelector('.photo-overlay').style.opacity = '0'"
          @click="p.live && p.live !== '#' && window.open(p.live, '_blank')"
        >
          <template v-if="p.preview">
            <img :src="p.preview" :alt="p.title" class="project-cell__img" />
          </template>
          <template v-else>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--border)" stroke-width="1" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <circle cx="9" cy="9" r="2.5" />
              <path d="M22 15l-5-5-4 4-3-3-5 5" />
            </svg>
            <span style="position: absolute; top: 0.5rem; left: 0.5rem; font-family: var(--font-mono); font-size: 0.6rem; color: var(--muted);">{{ p.id }}</span>
          </template>
          <div class="photo-overlay" style="flex-direction: column; gap: 0.3rem;">
            <strong style="font-size: 0.85rem;">{{ p.title }}</strong>
            <span style="font-size: 0.65rem; font-family: var(--font-mono); color: var(--muted);">{{ p.meta }} — {{ p.year }}</span>
            <a :href="p.live" target="_blank" rel="noopener noreferrer" class="live-demo-btn" @click.stop>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div class="lightbox" v-if="zoomImg" @click="zoomImg = null">
        <img :src="zoomImg" alt="" />
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const el = ref(null)

const skills = [
  { name: 'HTML', tag: 'Markup' },
  { name: 'CSS / Tailwind', tag: 'Styling' },
  { name: 'JavaScript', tag: 'Language' },
  { name: 'React', tag: 'Framework' },
  { name: 'Vue', tag: 'Framework' },
  { name: 'Node.js', tag: 'Runtime' },
  { name: 'Laravel', tag: 'Backend' },
  { name: 'MySQL', tag: 'Database' },
  { name: 'Figma', tag: 'Design' },
]

const projects = [
  { id: '01', title: 'POS System', year: '2026', meta: 'Kamog Sablan Multipurpose Cooperative', preview: '/KSMPC.png', live: '#' },
  { id: '02', title: 'School System', year: '2025', meta: "San Luis King's Kids Christian Academy", preview: '/SLKKCA.png', live: '#' },
  { id: '03', title: 'Birthing Home System', year: '2026', meta: 'Bani Birthing Home', preview: '/Bani-Birthing-System.png', live: '#' },
]

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.fade-in').forEach((el, i) => {
          setTimeout(() => el.classList.add('visible'), i * 40)
        })
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.2 })
  if (el.value) observer.observe(el.value)
})
</script>
