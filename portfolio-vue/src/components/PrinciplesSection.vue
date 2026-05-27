<template>
  <div ref="el">
    <span class="panel__dock-intro">What guides the work</span>

    <div class="principles-grid">
      <div v-for="(p, i) in principles" :key="i" class="principle-card fade-in" :style="{ transitionDelay: i * 0.06 + 's' }">
        <span class="principle-num">{{ String(i + 1).padStart(2, '0') }}</span>
        <p class="principle-text">{{ p }}</p>
      </div>
    </div>

    <p class="principle-sign">
      I build around clarity, usability, and careful execution — so every project feels
      polished from concept to completion.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const el = ref(null)

const principles = [
  'Structure comes before decoration.',
  'Every screen should be easy to scan.',
  'Motion should guide, never distract.',
  'Responsive design is part of the idea.',
  'Design and code should stay close.',
  'Light and composition tell the story.',
]

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.fade-in').forEach((el, i) => {
          setTimeout(() => el.classList.add('visible'), i * 60)
        })
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.2 })
  if (el.value) observer.observe(el.value)
})
</script>
