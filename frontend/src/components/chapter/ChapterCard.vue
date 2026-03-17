<template>
  <RouterLink
    :to="`/chapters/${chapter.number}`"
    class="group block rounded-2xl overflow-hidden border border-white/10 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
  >
    <!-- Illustration panel -->
    <div
      class="relative h-44 overflow-hidden"
      :style="{ background: theme.gradient }"
    >
      <!-- SVG illustration -->
      <div
        class="absolute inset-0 w-full h-full"
        v-html="theme.illustration"
      />

      <!-- Chapter number badge -->
      <div class="absolute top-3 left-3 z-10">
        <span
          class="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold shadow-sm"
          :style="{ background: 'rgba(0,0,0,0.35)', color: theme.accentHex, border: `1px solid ${theme.accentHex}40` }"
        >
          {{ chapter.number }}
        </span>
      </div>

      <!-- Hover overlay -->
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
    </div>

    <!-- Card body -->
    <div class="bg-ivory-50 px-5 py-4 border-t-2" :style="{ borderColor: theme.accentHex + '80' }">
      <p class="text-[11px] text-earth-400 uppercase tracking-widest mb-1">पाठ {{ chapter.number }}</p>
      <h3
        class="font-bold text-earth-800 leading-snug text-base group-hover:text-saffron-700 transition-colors"
        style="font-family: var(--font-devanagari)"
      >
        {{ chapter.title }}
      </h3>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { getTheme } from '@/utils/chapterThemes'

const props = defineProps<{
  chapter: { id: string; number: number; title: string; order: number }
}>()

const theme = computed(() => getTheme(props.chapter.number))
</script>
