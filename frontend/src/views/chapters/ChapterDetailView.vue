<template>
  <div>
    <!-- Loading skeleton -->
    <div v-if="store.loading" class="animate-pulse space-y-6">
      <div class="h-64 bg-ivory-300 rounded-2xl" />
      <div class="h-6 bg-ivory-300 rounded w-1/2" />
      <div class="h-4 bg-ivory-200 rounded w-3/4" />
    </div>

    <!-- Error -->
    <div v-else-if="store.error" class="text-center py-16">
      <p class="text-red-600">{{ store.error }}</p>
      <RouterLink to="/chapters" class="text-saffron-600 hover:underline mt-4 inline-block">
        ← पाठ सूची
      </RouterLink>
    </div>

    <!-- Chapter content -->
    <template v-else-if="chapter">
      <!-- Illustrated banner -->
      <div
        class="relative rounded-2xl overflow-hidden mb-10 shadow-lg"
        :style="{ background: theme.gradient }"
      >
        <!-- SVG illustration (fills background) -->
        <div
          class="absolute inset-0 w-full h-full opacity-70"
          v-html="theme.illustration"
        />

        <!-- Gradient overlay for text legibility -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <!-- Banner content -->
        <div class="relative z-10 px-8 pt-48 pb-8 md:pt-56 md:pb-10">
          <!-- Chapter number badge -->
          <span
            class="inline-flex items-center justify-center w-9 h-9 rounded-full text-xs font-bold mb-4 shadow"
            :style="{ background: 'rgba(0,0,0,0.45)', color: theme.accentHex, border: `1.5px solid ${theme.accentHex}60` }"
          >
            {{ chapter.number }}
          </span>

          <p class="text-white/60 text-xs uppercase tracking-widest mb-2">पाठ {{ chapter.number }}</p>
          <h1
            class="text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow"
            style="font-family: var(--font-devanagari)"
          >
            {{ chapter.title }}
          </h1>
          <p
            v-if="chapter.summary"
            class="text-white/80 text-base leading-relaxed mt-3 max-w-2xl italic"
          >
            {{ chapter.summary }}
          </p>
        </div>
      </div>

      <!-- Content blocks -->
      <div class="space-y-0">
        <template v-for="block in chapter.contentBlocks" :key="block.id">
          <!-- Section title -->
          <h2
            v-if="block.section_title"
            class="text-lg font-bold text-earth-700 mt-10 mb-4 pb-2 border-b border-saffron-200"
            style="font-family: var(--font-devanagari)"
          >
            {{ block.section_title }}
          </h2>

          <component
            :is="blockComponent(block.type)"
            :block="block"
          />
        </template>
      </div>

      <!-- Navigation -->
      <div class="mt-12 pt-8 border-t border-ivory-300 flex justify-between items-center">
        <RouterLink
          v-if="chapter.number > 1"
          :to="`/chapters/${chapter.number - 1}`"
          class="text-saffron-600 hover:text-saffron-700 font-medium transition-colors"
        >
          ← पिछला पाठ
        </RouterLink>
        <div v-else />

        <RouterLink to="/chapters" class="text-earth-600 hover:text-earth-800 text-sm transition-colors">
          पाठ सूची
        </RouterLink>

        <RouterLink
          :to="`/chapters/${chapter.number + 1}`"
          class="text-saffron-600 hover:text-saffron-700 font-medium transition-colors"
        >
          अगला पाठ →
        </RouterLink>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useChaptersStore } from '@/stores/chapters'
import { getTheme } from '@/utils/chapterThemes'

import ShlokaSection from '@/components/chapter/ShlokaSection.vue'
import TextSection from '@/components/chapter/TextSection.vue'
import StorySection from '@/components/chapter/StorySection.vue'
import DiscussionSection from '@/components/chapter/DiscussionSection.vue'

const store = useChaptersStore()
const route = useRoute()

const chapter = computed(() => store.current)
const theme = computed(() => getTheme(chapter.value?.number ?? 0))

function blockComponent(type: string) {
  switch (type) {
    case 'shloka_group': return ShlokaSection
    case 'story': return StorySection
    case 'discussion': return DiscussionSection
    default: return TextSection  // prasang, tatparya, explanation
  }
}

async function load() {
  try {
    await store.fetchByNumber(route.params.number as string)
  } catch {
    // error is already in store.error
  }
}

onMounted(load)
watch(() => route.params.number, load)
</script>
