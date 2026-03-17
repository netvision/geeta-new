<template>
  <div class="min-h-screen flex items-center justify-center bg-ivory-100 py-12 px-4">
    <!-- Decorative background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-saffron-100 opacity-40 blur-3xl" />
      <div class="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-deep-100 opacity-30 blur-3xl" />
    </div>

    <div class="relative z-10 w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <RouterLink to="/" class="inline-block">
          <span class="text-4xl font-bold text-saffron-600" style="font-family: var(--font-devanagari)">गीता</span>
          <span class="text-xl text-indigo-deep-700 ml-1 font-semibold">पाठ</span>
        </RouterLink>
        <p class="text-earth-700 mt-1 text-sm">भगवद्गीता का ज्ञान, हर विद्यार्थी के लिए</p>
      </div>

      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
