<template>
  <div>
    <!-- Header -->
    <div class="mb-10 text-center">
      <p class="text-xs tracking-[0.2em] uppercase text-saffron-600 font-semibold mb-3">गीतापाठ पाठ्यक्रम</p>
      <h1
        class="text-3xl md:text-4xl font-bold text-earth-800 mb-3"
        style="font-family: var(--font-devanagari)"
      >
        पाठ सूची
      </h1>
      <p class="text-earth-600 max-w-xl mx-auto">
        भगवद्गीता के आधार पर जीवन-दर्शन की पाँच-चरण यात्रा
      </p>
    </div>

    <!-- Loading -->
    <div v-if="store.loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="n in 5" :key="n" class="rounded-2xl overflow-hidden border border-white/10">
        <div class="h-44 bg-ivory-200 animate-pulse" />
        <div class="bg-ivory-50 px-5 py-4 space-y-2">
          <div class="h-3 w-16 bg-ivory-300 rounded animate-pulse" />
          <div class="h-4 w-3/4 bg-ivory-300 rounded animate-pulse" />
        </div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="store.error" class="text-center text-red-600 py-12">
      {{ store.error }}
    </div>

    <!-- Chapter grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ChapterCard
        v-for="chapter in store.list"
        :key="chapter.id"
        :chapter="chapter"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useChaptersStore } from '@/stores/chapters'
import ChapterCard from '@/components/chapter/ChapterCard.vue'

const store = useChaptersStore()

onMounted(() => store.fetchAll())
</script>
