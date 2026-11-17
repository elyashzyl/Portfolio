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

    <div class="projects-section">
      <div class="projects-intro fade-in">
        <div>
          <span class="panel__dock-intro" style="color: rgba(245,158,11,0.3);">Selected work</span>
          <h2 class="projects-intro__title">Useful systems,<br /><em>carefully made.</em></h2>
        </div>
        <p class="projects-intro__copy">A selection of digital products and operational tools designed to make complex work feel clearer.</p>
      </div>

      <div class="projects-summary fade-in">
        <div><strong>06</strong><span>selected projects</span></div>
        <div><strong>03</strong><span>live products</span></div>
        <div><strong>03</strong><span>focus areas</span></div>
      </div>

      <div class="projects-toolbar fade-in">
        <span class="projects-toolbar__label">Browse by type</span>
        <div class="project-filters" role="group" aria-label="Filter projects">
          <button v-for="filter in filters" :key="filter.id" type="button" class="project-filter" :class="{ active: activeFilter === filter.id }" :aria-pressed="activeFilter === filter.id" @click="activeFilter = filter.id">{{ filter.label }}</button>
        </div>
      </div>

      <div class="project-grid">
        <div v-for="(p, i) in visibleProjects" :key="p.id"
          class="project-cell fade-in"
          :class="{ 'project-cell--live': p.category === 'live' }"
          :style="{ transitionDelay: i * 0.1 + 's' }"
          role="button"
          tabindex="0"
          :aria-label="`View ${p.title} case study`"
          @click="openCaseStudy(p)"
          @keydown.enter.prevent="openCaseStudy(p)"
          @keydown.space.prevent="openCaseStudy(p)"
        >
          <template v-if="p.preview">
            <img :src="p.preview" :alt="`${p.title} preview`" class="project-cell__img" />
          </template>
          <template v-else>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--border)" stroke-width="1" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <circle cx="9" cy="9" r="2.5" />
              <path d="M22 15l-5-5-4 4-3-3-5 5" />
            </svg>
            <span style="position: absolute; top: 0.5rem; left: 0.5rem; font-family: var(--font-mono); font-size: 0.6rem; color: var(--muted);">{{ p.id }}</span>
          </template>
          <span class="project-cell__status">{{ p.status }}</span>
          <div class="project-cell__caption">
            <strong>{{ p.title }}</strong>
            <span>{{ p.meta }}</span>
          </div>
          <div class="photo-overlay" style="flex-direction: column; gap: 0.3rem;">
            <strong style="font-size: 0.85rem;">{{ p.title }}</strong>
            <span style="font-size: 0.65rem; font-family: var(--font-mono); color: var(--muted);">{{ p.meta }}</span>
            <span class="case-study-trigger">View case study</span>
            <a v-if="p.live && p.live !== '#'" :href="p.live" target="_blank" rel="noopener noreferrer" class="live-demo-btn" @click.stop>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="selectedProject" class="case-study" @click.self="closeCaseStudy">
        <article
          ref="dialog"
          class="case-study__dialog"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="`case-study-title-${selectedProject.id}`"
          tabindex="-1"
          @keydown="handleDialogKeydown"
        >
          <button ref="closeButton" class="case-study__close" type="button" aria-label="Close case study" @click="closeCaseStudy">×</button>
          <div class="case-study__preview">
            <img v-if="selectedProject.preview" :src="selectedProject.preview" :alt="`${selectedProject.title} project preview`" />
          </div>
          <div class="case-study__content">
            <header class="case-study__header">
              <span class="case-study__eyebrow">{{ selectedProject.id }} / {{ selectedProject.status }}</span>
              <h2 :id="`case-study-title-${selectedProject.id}`">{{ selectedProject.title }}</h2>
              <p>{{ selectedProject.meta }}</p>
            </header>
            <div class="case-study__body">
              <div>
                <span class="case-study__label">What it is</span>
                <p>{{ selectedProject.description }}</p>
              </div>
              <div>
                <span class="case-study__label">Public capabilities</span>
                <ul>
                  <li v-for="feature in selectedProject.features" :key="feature">{{ feature }}</li>
                </ul>
              </div>
              <div>
                <span class="case-study__label">Verified details</span>
                <p>{{ selectedProject.sourceNote }}</p>
              </div>
            </div>
            <div class="case-study__footer">
              <span class="case-study__source">{{ selectedProject.sourceLabel }}</span>
              <a v-if="selectedProject.live && selectedProject.live !== '#'" :href="selectedProject.live" target="_blank" rel="noopener noreferrer" class="live-demo-btn">Open live site ↗</a>
            </div>
          </div>
        </article>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const el = ref(null)
const dialog = ref(null)
const closeButton = ref(null)
const selectedProject = ref(null)
const previousFocus = ref(null)
const activeFilter = ref('all')

const filters = [
  { id: 'all', label: 'All work' },
  { id: 'live', label: 'Live products' },
  { id: 'systems', label: 'Systems' },
]

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
  {
    id: '01', category: 'systems', title: 'POS System', status: 'Portfolio project', meta: 'Kamog Sablan Multipurpose Cooperative', preview: '/KSMPC.png', live: '#',
    description: 'A POS system project for Kamog Sablan Multipurpose Cooperative.',
    sourceLabel: 'Portfolio information',
    features: ['Point-of-sale interface', 'Cooperative project preview'],
    sourceNote: 'This project does not currently have a public website linked from the portfolio. Detailed claims are intentionally limited until a public case study is available.',
  },
  {
    id: '02', category: 'systems', title: 'School System', status: 'Portfolio project', meta: "San Luis King's Kids Christian Academy", preview: '/SLKKCA.png', live: '#',
    description: "A school system project for San Luis King's Kids Christian Academy.",
    sourceLabel: 'Portfolio information',
    features: ['School system interface', 'Education project preview'],
    sourceNote: 'This project does not currently have a public website linked from the portfolio. Detailed claims are intentionally limited until a public case study is available.',
  },
  {
    id: '03', category: 'systems', title: 'Birthing Home System', status: 'Portfolio project', meta: 'Bani Birthing Home', preview: '/Bani-Birthing-System.png', live: '#',
    description: 'A birthing home system project for Bani Birthing Home.',
    sourceLabel: 'Portfolio information',
    features: ['Birthing-home system interface', 'Healthcare project preview'],
    sourceNote: 'This project does not currently have a public website linked from the portfolio. Detailed claims are intentionally limited until a public case study is available.',
  },
  {
    id: '04', category: 'live', title: 'EduPulse', status: 'Live product', meta: 'Gamified learning management system', preview: '/edupulse-live-preview.png', live: 'https://edupulse.koamishin.com',
    sourceLabel: 'Verified from live website',
    description: 'A gamified learning platform where students learn, play, and achieve through lessons, missions, XP, rewards, and leaderboards.',
    features: ['XP and level system', 'Achievement badges', 'Interactive quizzes', 'Daily streaks and leaderboards', 'Built-in messenger', 'Analytics dashboard and teacher tools'],
    sourceNote: 'The public website describes EduPulse as a gamified learning management system for students and teachers, with 50 visual themes and workflows for quizzes, exams, practicals, and achievements.',
  },
  {
    id: '05', category: 'live', title: 'ElyTrack', status: 'Live product', meta: 'School attendance and operations platform', preview: '/elytrack-live-preview.png', live: 'https://elytrack.elyxstudio.org',
    sourceLabel: 'Verified from live website',
    description: 'A school attendance and operations platform for Philippine schools that replaces paper registers and fragile spreadsheets with standardized workflows.',
    features: ['Under-90-second daily roll call', 'Automated DepEd Form 2 calculations', 'SARDO early dropout alerts', '48-hour cutoff locks and audit logs', 'CSV learner masterlist ingestion', 'Isolated campus workspaces'],
    sourceNote: 'The public website identifies ElyTrack with DepEd Order No. 8, s. 2015 workflows, Philippine Data Privacy Act positioning, certified Excel SF2 export, and role-isolated school data.',
  },
  {
    id: '06', category: 'live', title: 'ElWrite', status: 'Live product', meta: 'Digital identity and NFC profile platform', preview: '/elwrite-live-preview.png', live: 'https://elwrite.elyxstudio.org',
    sourceLabel: 'Verified from live website',
    description: 'A digital identity platform for creating polished personal profiles and NFC destinations for modern teams.',
    features: ['19 profile formats', 'Contactless web NFC sharing', 'iOS and Android support', 'Over-the-air profile updates', 'vCard 3.0 address book integration', 'NFC card pairing'],
    sourceNote: 'The public website describes ElWrite as a digital profile and NFC destination product with customizable formats, one reusable URL, and NTAG215 / 13.56 MHz NFC support.',
  },
]

const visibleProjects = computed(() => activeFilter.value === 'all'
  ? projects
  : projects.filter(project => project.category === activeFilter.value))

function openCaseStudy(project) {
  previousFocus.value = document.activeElement
  selectedProject.value = project
}

function closeCaseStudy() {
  selectedProject.value = null
}

function handleDialogKeydown(event) {
  if (event.key !== 'Tab') return
  const focusable = [...dialog.value.querySelectorAll('button, a[href]')]
  if (!focusable.length) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(selectedProject, async (project) => {
  document.body.style.overflow = project ? 'hidden' : ''
  if (project) {
    await nextTick()
    closeButton.value?.focus()
  } else {
    previousFocus.value?.focus?.()
  }
})

function handleEscape(event) {
  if (event.key === 'Escape' && selectedProject.value) closeCaseStudy()
}

onMounted(() => {
  window.addEventListener('keydown', handleEscape)

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

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>
