<template>
  <div ref="el">
    <span class="panel__dock-intro fade-in">Let&rsquo;s Talk</span>

    <h2 class="contact__title fade-in" style="transitionDelay: 0.08s">
      Let&rsquo;s build<br />
      <em>something beautiful</em><br />
      together.
    </h2>

    <a class="contact__email fade-in" style="transitionDelay: 0.16s" href="mailto:ely.ashzyl@gmail.com">
      <span class="contact__email-label">Email me</span>
      <span class="contact__email-value">ely.ashzyl@gmail.com</span>
      <span class="contact__email-arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3">
          <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    </a>

    <div class="contact__aside fade-in" style="transitionDelay: 0.24s">
      <div class="contact__block">
        <p class="contact__block-label">Elsewhere</p>
        <ul class="contact__links">
          <li v-for="l in links" :key="l.label">
            <a :href="l.url" class="contact__link">{{ l.label }} <span>&rarr;</span></a>
          </li>
        </ul>
      </div>
      <div class="contact__block">
        <p class="contact__block-label">Availability</p>
        <p class="contact__avail"><span class="contact__dot" /> Open to work — 2026</p>
        <p class="contact__where">Based in the Philippines · Working remotely worldwide</p>
      </div>
    </div>

    <div class="contact__footer fade-in" style="transitionDelay: 0.32s">
      <span>&copy; Dumsang, Angelika Gernade.</span>
      <span>Designed &amp; built with care</span>
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

defineProps({ time: String })

const links = [
  { label: 'GitHub', url: 'https://github.com/elyashzyl' },
  { label: 'Instagram', url: 'https://www.instagram.com/axhzyx/' },
]
</script>
