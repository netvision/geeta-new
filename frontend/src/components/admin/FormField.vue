<template>
  <div>
    <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
      {{ label }}
    </label>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string }>()
</script>
