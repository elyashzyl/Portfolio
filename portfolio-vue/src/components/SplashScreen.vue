<template>
  <div class="splash">
    <div class="splash__noise" />
    <div class="splash__light" />
    <div class="splash__beam splash__beam--2" />

    <div class="splash__top">
      <span class="splash__brand">Ely<span class="splash__brand-dot">.</span></span>
      <span class="splash__meta">PORTFOLIO — 2026</span>
    </div>

    <div class="splash__center">
      <h1 class="splash__title">
        <span class="line">Hi, I&rsquo;m <em>Ely</em>.</span>
        <span class="line">A multi-disciplinary creator</span>
        <span class="line">building across code, lens &amp; design.</span>
      </h1>

      <p class="splash__sub">
        Web developer · Photographer · Graphic designer — crafting visual and digital
        experiences that speak. Welcome to my portfolio.
      </p>

      <div class="splash__hold-btn" :class="{ holding }"
        @mousedown="holding = true"
        @mouseup="holding = false"
        @mouseleave="holding = false"
        @touchstart.prevent="holding = true"
        @touchend="holding = false"
      >
        <div class="splash__hold-track">
          <div class="splash__hold-fill" @transitionend="onTransitionEnd" />
        </div>
        <span class="splash__hold-text">Hold to Enter</span>
      </div>
    </div>

    <div class="splash__bottom">
      <span class="splash__frame-counter">[ {{ time }} ]</span>
      <span>EST. PH — 2026</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['enter'])
defineProps({ time: String })

const holding = ref(false)

function onTransitionEnd() {
  if (holding.value) emit('enter')
}
</script>
