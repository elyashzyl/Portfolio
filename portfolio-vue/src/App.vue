<template>
  <div>
    <div class="cursor" ref="cursorRing" />

    <SplashScreen v-if="!entered" @enter="handleEnter" :time="time" />

    <template v-if="entered">
      <div class="bg-grid" />
      <div class="deco deco--circle" />
      <div class="deco deco--square" />
      <div class="deco deco--ring" />

      <div class="site open">

      <div class="progress">
        <div class="progress__bar" :style="{ width: ((active + 1) / sections.length) * 100 + '%' }" />
      </div>

      <div class="site__chrome">
        <span class="site__brand">Ely<span class="splash__brand-dot">.</span></span>
        <span class="site__chrome-meta">{{ time }} EST</span>
      </div>

      <div class="nav-dots">
        <button v-for="(s, i) in sections" :key="s.id"
          class="nav-dot" :class="{ active: i === active }"
          @click="scrollTo(i)" :aria-label="s.label"
        />
      </div>

      <section id="hero" class="panel">
        <div class="panel__bg">
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80" ref="bgImgs" alt="" loading="lazy" />
          <div class="overlay" />
        </div>
        <div class="panel__content">
          <header class="panel__header">
            <span class="panel__number">01</span><span class="panel__divider" /><span class="panel__category">Hello</span>
          </header>
          <HeroSection />
        </div>
        <span class="panel__big-title">Hello</span>
      </section>

      <section id="about" class="panel">
        <div class="panel__bg">
          <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80" alt="" loading="lazy" />
          <div class="overlay" />
        </div>
        <div class="panel__content">
          <header class="panel__header">
            <span class="panel__number">02</span><span class="panel__divider" /><span class="panel__category">About Me</span>
          </header>
          <AboutSection />
        </div>
        <span class="panel__big-title">About Me</span>
      </section>

      <section id="approach" class="panel">
        <div class="panel__content">
          <header class="panel__header">
            <span class="panel__number">03</span><span class="panel__divider" /><span class="panel__category">Approach</span>
          </header>
          <ApproachSection />
        </div>
        <span class="panel__big-title">Approach</span>
      </section>

      <section id="dev" class="panel">
        <div class="panel__bg">
          <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&q=80" alt="" loading="lazy" />
          <div class="overlay" />
        </div>
        <div class="panel__content">
          <header class="panel__header">
            <span class="panel__number">04</span><span class="panel__divider" /><span class="panel__category">Web Development</span>
          </header>
          <DevSection />
        </div>
        <span class="panel__big-title">Web Development</span>
      </section>

      <section id="photo" class="panel">
        <div class="panel__bg">
          <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1920&q=80" alt="" loading="lazy" />
          <div class="overlay" />
        </div>
        <div class="panel__content">
          <header class="panel__header">
            <span class="panel__number">05</span><span class="panel__divider" /><span class="panel__category">Photography</span>
          </header>
          <PhotoSection />
        </div>
        <span class="panel__big-title">Photography</span>
      </section>

      <section id="design" class="panel">
        <div class="panel__bg">
          <img src="https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1920&q=80" alt="" loading="lazy" />
          <div class="overlay" />
        </div>
        <div class="panel__content">
          <header class="panel__header">
            <span class="panel__number">06</span><span class="panel__divider" /><span class="panel__category">Graphic Design</span>
          </header>
          <DesignSection />
        </div>
        <span class="panel__big-title">Graphic Design</span>
      </section>

      <section id="principles" class="panel">
        <div class="panel__content">
          <header class="panel__header">
            <span class="panel__number">07</span><span class="panel__divider" /><span class="panel__category">Principles</span>
          </header>
          <PrinciplesSection />
        </div>
        <span class="panel__big-title">Principles</span>
      </section>

      <section id="contact" class="panel">
        <div class="panel__content">
          <header class="panel__header">
            <span class="panel__number">08</span><span class="panel__divider" /><span class="panel__category">Let's Talk</span>
          </header>
          <ContactSection :time="time" />
        </div>
        <span class="panel__big-title">Let's Talk</span>
      </section>
        </div>
      </template>

      <div class="lens-loader" :class="{ open: entered }" v-if="!splashDone">
        <div class="lens__matte lens__matte--top" />
        <div class="lens__matte lens__matte--bottom" />
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import SplashScreen from './components/SplashScreen.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ApproachSection from './components/ApproachSection.vue'
import DevSection from './components/DevSection.vue'
import PhotoSection from './components/PhotoSection.vue'
import DesignSection from './components/DesignSection.vue'
import PrinciplesSection from './components/PrinciplesSection.vue'
import ContactSection from './components/ContactSection.vue'

const entered = ref(false)
const splashDone = ref(false)
const active = ref(0)
const time = ref('00:00:00')
const cursorRing = ref(null)

const sections = [
  { id: 'hero', label: 'Hello' }, { id: 'about', label: 'About' },
  { id: 'approach', label: 'Approach' }, { id: 'dev', label: 'Dev' },
  { id: 'photo', label: 'Photo' }, { id: 'design', label: 'Design' },
  { id: 'principles', label: 'Principles' }, { id: 'contact', label: 'Contact' },
]

let timer = null
let scrollHandler = null

function updateTime() {
  const now = new Date()
  time.value = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
}

function handleEnter() {
  entered.value = true
  setTimeout(() => { splashDone.value = true }, 1400)
}

function scrollTo(idx) {
  document.querySelectorAll('.panel')[idx]?.scrollIntoView({ behavior: 'smooth' })
}

function initCursor() {
  const ring = cursorRing.value
  if (!ring) return

  const onMove = (e) => {
    ring.style.left = e.clientX + 'px'
    ring.style.top = e.clientY + 'px'
  }

  const addHover = () => ring.classList.add('hovering')
  const removeHover = () => ring.classList.remove('hovering')

  document.addEventListener('mousemove', onMove)
  const targets = document.querySelectorAll('a, button, .disc-card, .skill-row, .photo-cell, .design-cell, .principle-card, .about__card, .contact__link')
  targets.forEach(el => { el.addEventListener('mouseenter', addHover); el.addEventListener('mouseleave', removeHover) })
}

onMounted(() => {
  document.body.style.cursor = 'none'
  updateTime()
  timer = setInterval(updateTime, 1000)
  initCursor()
})

watch(entered, (val) => {
  if (!val) return
  nextTick(() => {
    const panels = document.querySelectorAll('.panel')
    scrollHandler = () => {
      let best = 0, bestRatio = 0
      panels.forEach((p, i) => {
        const rect = p.getBoundingClientRect()
        const vis = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0))
        const ratio = vis / rect.height
        if (ratio > bestRatio) { bestRatio = ratio; best = i }
        if (ratio > 0.15) p.classList.add('in-view')
      })
      active.value = best
    }
    scrollHandler()
    window.addEventListener('scroll', scrollHandler, { passive: true })
  })
})
onUnmounted(() => {
  document.body.style.cursor = ''
  clearInterval(timer)
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
})
</script>
