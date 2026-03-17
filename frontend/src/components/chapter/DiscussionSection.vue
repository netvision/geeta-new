<template>
  <div class="my-6 bg-indigo-deep-50 rounded-2xl border border-indigo-deep-200 p-6">
    <div class="flex items-center gap-2 mb-4">
      <span class="text-2xl">💬</span>
      <h3
        class="text-xl font-bold text-indigo-deep-800"
        style="font-family: var(--font-devanagari)"
      >
        {{ block.title || 'चर्चा का विषय' }}
      </h3>
    </div>
    <ol class="space-y-3 list-none">
      <li
        v-for="(q, i) in block.metadata?.questions"
        :key="i"
        class="flex gap-3"
      >
        <span class="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-deep-200 text-indigo-deep-800 text-xs font-bold flex items-center justify-center mt-0.5">
          {{ i + 1 }}
        </span>
        <span class="text-earth-700 leading-relaxed" style="font-family: var(--font-devanagari)">
          {{ q.hi }}
        </span>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import type { ContentBlock } from '@/stores/chapters'
defineProps<{ block: ContentBlock }>()
</script>
