<template>
  <div ref="el">
    <div class="design__header">
      <span class="panel__dock-intro" style="margin: 0;">Visual identity</span>
      <span class="design__header-line" />
    </div>

    <p class="design__text fade-in" style="text-align: left;">
      Designing visual languages that speak — from brand identities to user interfaces.
      Every project is an exercise in clarity and purpose.
    </p>

    <div class="design-grid">
      <div v-for="(d, i) in designs" :key="d.label" class="design-cell fade-in-blur" :style="{ transitionDelay: i * 0.1 + 's' }"
        @click="zoomImg = d.src">
        <img v-if="d.src" :src="d.src" :alt="d.label" class="design-cell__img" />
        <div class="photo-overlay" style="flex-direction: column; gap: 0.3rem;">
          <strong style="font-size: 0.85rem;">{{ d.label }}</strong>
          <span style="font-size: 0.65rem; font-family: var(--font-mono); color: var(--muted);">{{ d.meta }}</span>
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
import { ref, onMounted, onUnmounted } from 'vue'

const el = ref(null)
const zoomImg = ref(null)

const onKey = (e) => { if (e.key === 'Escape') zoomImg.value = null }
onMounted(() => document.addEventListener('keydown', onKey))
onUnmounted(() => document.removeEventListener('keydown', onKey))

const designs = [
  { label: 'Elyx Studio', meta: 'Brand Identity', src: '/brand.png' },
  { label: 'UI/UX Design', meta: 'Website Design', src: '/uiux.png' },
  { label: 'Typography', meta: 'Menu Design', src: '/menu.png' },
  { label: 'Packaging', meta: 'Product Design', src: '/photo4.png' },
  { label: 'Poster Series', meta: 'Print Design', src: '/photo5.png' },
  { label: 'Social Media', meta: 'Digital Graphics', src: '/photo6.png' },
]

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.fade-in, .fade-in-blur').forEach((el, i) => {
          setTimeout(() => el.classList.add('visible'), i * 100)
        })
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.2 })
  if (el.value) observer.observe(el.value)
})
</script>