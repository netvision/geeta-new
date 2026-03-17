<template>
  <div class="shloka-block my-8">
    <div
      v-for="verse in block.metadata?.sanskrit_verses"
      :key="verse.ref"
      class="mb-6 last:mb-0"
    >
      <p class="text-xs text-earth-400 text-center mb-2 tracking-wide">॥ {{ verse.ref }} ॥</p>
      <p class="shloka whitespace-pre-line" style="font-family: 'Noto Sans Devanagari', sans-serif">{{ verse.verse }}</p>
    </div>
    <!-- Optional translation / content -->
    <p v-if="block.content" class="text-sm text-earth-600 mt-5 text-center italic leading-relaxed">
      {{ block.content }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { ContentBlock } from '@/stores/chapters'
defineProps<{ block: ContentBlock }>()
</script>
