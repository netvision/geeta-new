<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PublicLayout from '@/layouts/PublicLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import AppLayout from '@/layouts/AppLayout.vue'

const route = useRoute()

const LAYOUTS: Record<string, any> = {
  public: PublicLayout,
  auth: AuthLayout,
  app: AppLayout,
}

const layout = computed(() => LAYOUTS[route.meta.layout as string] ?? PublicLayout)
</script>
