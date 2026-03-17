<template>
  <div class="min-h-screen flex flex-col bg-ivory-100">
    <PublicNav />
    <main class="flex-1">
      <slot />
    </main>
    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
import PublicNav from '@/components/layout/PublicNav.vue'
import PublicFooter from '@/components/layout/PublicFooter.vue'
</script>
