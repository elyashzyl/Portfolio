<template>
  <div ref="el">
    <div class="hero">
      <div class="hero__text">
        <p class="hero__eyebrow fade-in" style="transitionDelay: 0s"><span class="hero__eyebrow-dash">&mdash;</span> Designer &amp; Developer</p>
        <h2 class="hero__name fade-in" style="transitionDelay: 0.08s">Ely</h2>
        <p class="hero__desc fade-in" style="transitionDelay: 0.16s">
          A multidisciplinary creator working across web development, photography,
          and graphic design. Every project is an opportunity to tell a story.
        </p>
      </div>

      <div class="hero__portrait-col fade-in" :style="{ transitionDelay: '0.24s' }">
        <div class="hero__portrait-frame" style="padding: 0">
          <span class="hero__frame-corner hero__frame-corner--tl" />
          <span class="hero__frame-corner hero__frame-corner--tr" />
          <span class="hero__frame-corner hero__frame-corner--bl" />
          <span class="hero__frame-corner hero__frame-corner--br" />
          <img src="/profile.png" alt="Ely portrait" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
        <div class="hero__caption">
          <span>Ely — Portrait</span>
          <span>2026</span>
        </div>
      </div>

      <ul class="hero__meta fade-in" style="transitionDelay: 0.32s">
        <li v-for="m in meta" :key="m.label">
          <span>{{ m.label }}</span>
          <em><span v-if="m.label === 'Status'" class="hero__dot" />{{ m.value }}</em>
        </li>
      </ul>
    </div>

    <div class="disc-grid">
      <div v-for="(d, i) in disciplines" :key="d.title" class="disc-card fade-in" :style="{ transitionDelay: 0.4 + i * 0.08 + 's' }">
        <div class="disc-icon" v-html="iconSvgs[d.icon]"></div>
        <h3 class="disc-title">{{ d.title }}</h3>
        <p class="disc-desc">{{ d.desc }}</p>
        <div class="disc-tags">
          <span v-for="t in d.tags" :key="t" class="disc-tag">{{ t }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const el = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.fade-in').forEach((el, i) => {
          setTimeout(() => el.classList.add('visible'), i * 80)
        })
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.2 })
  if (el.value) observer.observe(el.value)
})

const localTime = ref(new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', hour12: true }))

onMounted(() => {
  setInterval(() => {
    localTime.value = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', hour12: true })
  }, 60000)
})

const meta = computed(() => [
  { label: 'Based', value: 'Philippines' },
  { label: 'PH Time', value: localTime.value },
  { label: 'Status', value: 'Open to work' },
  { label: 'Email', value: 'ely.ashzyl@gmail.com' },
])

const disciplines = [
  {
    icon: 'dev', title: 'Web Developer',
    desc: 'Building robust, scalable applications with modern frameworks and clean architecture.',
    tags: ['React', 'Vue', 'Node.js', 'Laravel', 'MySQL']
  },
  {
    icon: 'photo', title: 'Photographer',
    desc: 'Capturing stories through the lens — portraits, landscapes, and visual storytelling.',
    tags: ['Portrait', 'Landscape', 'Street', 'Event', 'Editorial']
  },
  {
    icon: 'design', title: 'Graphic Designer',
    desc: 'Crafting brand identities, visual assets, and design systems that communicate clearly.',
    tags: ['Branding', 'UI/UX', 'Print', 'Typography', 'Illustration']
  }
]

const iconSvgs = {
  dev: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>',
  photo: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>',
  design: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>',
}
</script>
