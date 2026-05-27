<template>
  <div ref="el">
    <span class="panel__dock-intro fade-in">Through the lens</span>
    <p class="fade-in" style="color: var(--muted); font-size: 0.9rem; line-height: 1.8; max-width: 500px; margin-bottom: 0.5rem; transitionDelay: 0.08s">
      Capturing moments that tell stories — from sweeping landscapes to intimate
      portraits. Every frame is an exercise in composition, light, and emotion.
    </p>

    <div class="photo-grid">
      <div v-for="(p, i) in photos" :key="p.id" class="photo-cell fade-in-blur" :style="{ transitionDelay: i * 0.06 + 's', background: i % 2 === 0 ? 'var(--surface)' : '#0f0f0f' }"
        @click="p.src && (zoomImg = p.src)">
        <img v-if="p.src" :src="p.src" :alt="p.label" style="width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0;" />
        <svg v-else width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--border)" stroke-width="1">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <circle cx="9" cy="11" r="3" />
          <path d="M21 15l-5-5L5 19" />
        </svg>
        <div class="photo-overlay" style="flex-direction: column; gap: 0.3rem;">
          <strong style="font-size: 0.8rem;">{{ p.label }}</strong>
          <span style="font-size: 0.6rem; font-family: var(--font-mono); color: var(--muted);">{{ p.meta }}</span>
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

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.fade-in, .fade-in-blur').forEach((el, i) => {
          setTimeout(() => el.classList.add('visible'), i * 80)
        })
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.2 })
  if (el.value) observer.observe(el.value)
})

const photos = [
  { id: 1, label: 'Mountain Light', meta: 'Landscape', src: '/photo1.png' },
  { id: 2, label: 'Urban Frames', meta: 'Street', src: '/photo2.png' },
  { id: 3, label: 'Portrait Study', meta: 'Portrait', src: '/photo3.png' },
  { id: 4, label: 'Street Wear', meta: 'Vivid', src: '/photo4.png' },
  { id: 5, label: 'Minimalist Streetwear', meta: 'Shadow', src: '/photo5.png' },
  { id: 6, label: 'Hoodie Product', meta: 'Depth', src: '/photo6.png' },
  { id: 7, label: 'Nature Landscape', meta: 'Motion', src: '/photo7.png' },
  { id: 8, label: 'Rock Texture', meta: 'Texture', src: '/photo8.png' },
  { id: 9, label: 'Green House', meta: 'Mood', src: '/photo9.png' },
  { id: 10, label: 'Rock with Sea', meta: 'Grain', src: '/photo10.png' },
]
</script>