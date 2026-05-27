<template>
  <div ref="el">
    <span class="panel__dock-intro">Professional Background</span>
    <p class="about__lede">
      I am a multi-disciplinary creative professional with experience in web development,
      photography, and graphic design — specializing in building digital experiences
      that are as functional as they are beautiful.
    </p>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;">
      <div v-for="(card, i) in cards" :key="card.num"
        class="about__card fade-in"
        :style="{ transitionDelay: i * 0.12 + 's' }"
      >
        <span class="about__card-num">{{ card.num }}</span>
        <h3 class="about__card-title">{{ card.title }}</h3>
        <p class="about__card-copy">{{ card.copy }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const el = ref(null)

const cards = [
  {
    num: '01', title: 'Experience',
    copy: 'I work across web development, photography, and graphic design — building applications, capturing visual stories, and crafting brand identities for clients across different industries. Every project is approached with the same dedication to quality and detail.'
  },
  {
    num: '02', title: 'Education & Certifications',
    copy: 'BSIT Graduate with a passion for continuous learning. Certified in Computer Systems Servicing NC II, Creative Web Design. Currently expanding skills in advanced photography techniques and design systems.'
  },
  {
    num: '03', title: 'Focus Areas',
    copy: 'Web development with modern JavaScript frameworks, portrait and landscape photography, and brand identity design. I love the intersection of technology and art — where clean code meets visual storytelling.'
  }
]

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.fade-in').forEach((el, i) => {
          setTimeout(() => el.classList.add('visible'), i * 120)
        })
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.2 })
  if (el.value) observer.observe(el.value)
})
</script>
