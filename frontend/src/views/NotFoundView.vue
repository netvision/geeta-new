<template>
  <div class="py-24 px-4 text-center">
    <p class="text-8xl font-bold text-ivory-300 mb-4" style="font-family: var(--font-devanagari)">४०४</p>
    <h1 class="text-2xl font-bold text-earth-800 mb-3" style="font-family: var(--font-devanagari)">
      पृष्ठ नहीं मिला
    </h1>
    <p class="text-earth-700 mb-8">आप जो पृष्ठ ढूँढ रहे हैं वह यहाँ नहीं है।</p>
    <RouterLink
      to="/"
      class="inline-block bg-saffron-500 hover:bg-saffron-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors"
    >
      होम पर जाएँ
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
