<template>
  <div class="my-6" :class="typeClass">
    <div v-if="block.type === 'prasang'" class="flex items-center gap-2 mb-3">
      <span class="w-1 h-5 bg-saffron-400 rounded-full shrink-0" />
      <h3 class="text-sm font-bold text-saffron-700 uppercase tracking-wider">
        {{ block.title || 'प्रसंग' }}
      </h3>
    </div>
    <div v-else-if="block.type === 'tatparya'" class="flex items-center gap-2 mb-3">
      <span class="w-1 h-5 bg-indigo-400 rounded-full shrink-0" />
      <h3 class="text-sm font-bold text-indigo-700 uppercase tracking-wider">
        {{ block.title || 'तात्पर्य' }}
      </h3>
    </div>
    <h3
      v-else-if="block.title"
      class="text-lg font-bold text-earth-800 mb-3"
      style="font-family: var(--font-devanagari)"
    >
      {{ block.title }}
    </h3>
    <div
      class="text-earth-700 leading-relaxed whitespace-pre-line"
      style="font-family: var(--font-devanagari)"
    >
      {{ block.content }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ContentBlock } from '@/stores/chapters'

const props = defineProps<{ block: ContentBlock }>()

const typeClass = computed(() => {
  if (props.block.type === 'prasang') return 'bg-saffron-50 border-l-4 border-saffron-300 rounded-r-xl pl-4 pr-4 py-4'
  if (props.block.type === 'tatparya') return 'bg-indigo-50 border-l-4 border-indigo-300 rounded-r-xl pl-4 pr-4 py-4'
  return ''
})
</script>
