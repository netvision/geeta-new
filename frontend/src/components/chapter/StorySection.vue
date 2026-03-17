<template>
  <div class="my-6 bg-gradient-to-br from-gold-50 to-ivory-100 rounded-2xl border border-gold-200 p-6">
    <div class="flex items-center gap-2 mb-4">
      <span class="text-2xl">📜</span>
      <h3
        class="text-lg font-bold text-earth-800"
        style="font-family: var(--font-devanagari)"
      >
        {{ block.title || 'कहानी' }}
      </h3>
    </div>
    <div
      class="text-earth-700 leading-relaxed whitespace-pre-line"
      style="font-family: var(--font-devanagari)"
    >
      {{ block.content }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ContentBlock } from '@/stores/chapters'
defineProps<{ block: ContentBlock }>()
</script>
