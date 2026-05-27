<template>
  <div ref="el">
    <span class="panel__dock-intro fade-in">How I work</span>
    <p class="approach__lede fade-in" style="transitionDelay: 0.08s">
      Clean design, careful engineering. Every detail is chosen on purpose —
      whether in code, composition, or color.
    </p>
    <div class="approach__steps">
      <div v-for="(s, i) in steps" :key="s.num" class="approach__step fade-in" :style="{ transitionDelay: 0.16 + i * 0.1 + 's' }">
        <span class="approach__num">{{ s.num }}</span>
        <h3 class="approach__name">{{ s.name }}</h3>
        <p class="approach__copy">{{ s.copy }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

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

const steps = [
  {
    num: '01', name: 'Listen',
    copy: 'Every project starts with understanding — the goal, the audience, the story. Whether it is code, a photograph, or a brand identity, I listen first.'
  },
  {
    num: '02', name: 'Create',
    copy: 'Ideas take shape through sketching, prototyping, and experimentation. Low-fidelity first, then refined until every element has a purpose.'
  },
  {
    num: '03', name: 'Deliver',
    copy: 'Craft meets execution. Clean code, composed frames, and cohesive visuals — delivered with care and attention to every detail.'
  }
]
</script>
