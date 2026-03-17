<template>
  <div class="min-h-screen flex flex-col bg-ivory-100">
    <AppNav />
    <main class="flex-1 container mx-auto max-w-6xl px-4 py-8">
      <slot />
    </main>
    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
import AppNav from '@/components/layout/AppNav.vue'
import PublicFooter from '@/components/layout/PublicFooter.vue'
</script>
