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
          <div class="photo-overlay" style="flex-direction: column; gap: 0.3rem;">
            <strong style="font-size: 0.85rem;">{{ p.title }}</strong>
            <span style="font-size: 0.65rem; font-family: var(--font-mono); color: var(--muted);">{{ p.meta }} — {{ p.year }}</span>
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
              <span class="case-study__eyebrow">{{ selectedProject.id }} / {{ selectedProject.year }}</span>
              <h2 :id="`case-study-title-${selectedProject.id}`">{{ selectedProject.title }}</h2>
              <p>{{ selectedProject.meta }}</p>
            </header>
            <div class="case-study__body">
              <div>
                <span class="case-study__label">The challenge</span>
                <p>{{ selectedProject.challenge }}</p>
              </div>
              <div>
                <span class="case-study__label">My role</span>
                <p>{{ selectedProject.role }}</p>
              </div>
              <div>
                <span class="case-study__label">Key features</span>
                <ul>
                  <li v-for="feature in selectedProject.features" :key="feature">{{ feature }}</li>
                </ul>
              </div>
              <div>
                <span class="case-study__label">Outcome</span>
                <p>{{ selectedProject.outcome }}</p>
              </div>
            </div>
            <div class="case-study__footer">
              <div class="case-study__stack">
                <span class="case-study__label">Built with</span>
                <div class="case-study__tags">
                  <span v-for="technology in selectedProject.technologies" :key="technology">{{ technology }}</span>
                </div>
              </div>
              <a v-if="selectedProject.live && selectedProject.live !== '#'" :href="selectedProject.live" target="_blank" rel="noopener noreferrer" class="live-demo-btn">Open live site ↗</a>
            </div>
          </div>
        </article>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const el = ref(null)
const dialog = ref(null)
const closeButton = ref(null)
const selectedProject = ref(null)
const previousFocus = ref(null)

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
    id: '01', title: 'POS System', year: '2026', meta: 'Kamog Sablan Multipurpose Cooperative', preview: '/KSMPC.png', live: '#',
    challenge: 'Give a cooperative team a dependable way to manage daily sales, inventory, and customer transactions.',
    role: 'End-to-end web development, interface design, and database integration.',
    technologies: ['Vue', 'Laravel', 'MySQL'],
    features: ['Fast point-of-sale workflow', 'Inventory and stock monitoring', 'Transaction records for reporting'],
    outcome: 'A single workspace for daily operations that reduces manual tracking and keeps sales data organized.',
  },
  {
    id: '02', title: 'School System', year: '2025', meta: "San Luis King's Kids Christian Academy", preview: '/SLKKCA.png', live: '#',
    challenge: 'Bring student, class, and school administration workflows into one clear system.',
    role: 'Product design and full-stack implementation for school operations.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Laravel'],
    features: ['Student information management', 'Academic record organization', 'Role-based administrative workflows'],
    outcome: 'A more structured foundation for managing school information and reducing fragmented paperwork.',
  },
  {
    id: '03', title: 'Birthing Home System', year: '2026', meta: 'Bani Birthing Home', preview: '/Bani-Birthing-System.png', live: '#',
    challenge: 'Make patient and birthing-home records easier to access while keeping sensitive information structured.',
    role: 'Application design, workflow planning, and backend development.',
    technologies: ['Vue', 'Laravel', 'MySQL'],
    features: ['Patient record management', 'Organized visit and care details', 'Searchable operational records'],
    outcome: 'A purpose-built system that gives staff a clearer view of patient information and daily care workflows.',
  },
  {
    id: '04', title: 'EduPulse', year: '2026', meta: 'Learning management platform', preview: '/edupulse-preview.svg', live: 'https://edupulse.koamishin.com',
    challenge: 'Make learning progress and course activity easy to understand at a glance.',
    role: 'Product design and web development focused on dashboard hierarchy and engagement.',
    technologies: ['Vue', 'JavaScript', 'CSS'],
    features: ['Course progress tracking', 'Weekly learning activity', 'Lesson and study streak overview'],
    outcome: 'A motivating learning dashboard that turns scattered activity into a focused, actionable overview.',
  },
  {
    id: '05', title: 'ElyTrack', year: '2026', meta: 'Delivery tracking dashboard', preview: '/elytrack-preview.svg', live: 'https://elytrack.elyxstudio.org',
    challenge: 'Give operations teams a clear view of shipments, routes, and delivery status.',
    role: 'Product design and web development for a real-time operations overview.',
    technologies: ['Vue', 'JavaScript', 'CSS'],
    features: ['Live route visibility', 'Shipment status tracking', 'Delivery performance metrics'],
    outcome: 'A control center that helps teams understand what is moving, what is delayed, and what needs attention.',
  },
  {
    id: '06', title: 'ELWrite', year: '2026', meta: 'Writing and publishing workspace', preview: '/elwrite-preview.svg', live: 'https://elwrite.elyxstudio.org',
    challenge: 'Create a calm writing workspace that keeps attention on the content instead of the interface.',
    role: 'Product design and frontend development for the editor and publishing flow.',
    technologies: ['Vue', 'JavaScript', 'CSS'],
    features: ['Focused document editor', 'Personal document library', 'Simple publishing workflow'],
    outcome: 'A quiet, approachable writing environment designed to help ideas move from draft to finished work.',
  },
]

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
