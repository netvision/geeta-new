<template>
  <nav class="sticky top-0 z-50 bg-indigo-deep-800 text-white shadow-md">
    <div class="container mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-2">
        <span class="text-2xl text-saffron-300" style="font-family: var(--font-devanagari)">गीता पाठ</span>
      </RouterLink>

      <div class="flex items-center gap-4">
        <RouterLink
          to="/chapters"
          class="text-sm text-indigo-deep-200 hover:text-white transition-colors"
          active-class="text-white"
        >
          पाठ सूची
        </RouterLink>

        <template v-if="authStore.isAdmin">
          <RouterLink
            to="/dashboard/admin"
            class="text-sm text-indigo-deep-200 hover:text-white transition-colors"
          >
            प्रबंधन
          </RouterLink>
        </template>

        <template v-if="authStore.isSuperadmin">
          <RouterLink
            to="/admin/chapters"
            class="text-sm text-saffron-300 hover:text-saffron-200 transition-colors"
            active-class="text-saffron-100"
          >
            अध्याय संपादक
          </RouterLink>
        </template>

        <RouterLink
          to="/dashboard"
          class="text-sm text-indigo-deep-200 hover:text-white transition-colors"
        >
          {{ authStore.user?.name?.split(' ')[0] }}
        </RouterLink>

        <button
          @click="langStore.setLang(langStore.isHindi ? 'en' : 'hi')"
          class="text-xs border border-indigo-deep-500 rounded-full px-2 py-0.5 hover:bg-indigo-deep-700 transition-colors"
        >
          {{ langStore.isHindi ? 'EN' : 'हि' }}
        </button>

        <button
          @click="handleLogout"
          class="text-xs text-indigo-deep-300 hover:text-white transition-colors"
        >
          लॉगआउट
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useLangStore } from '@/stores/lang'

const authStore = useAuthStore()
const langStore = useLangStore()
const router = useRouter()

async function handleLogout() {
  await authStore.logout()
  router.push('/login')
}
</script>
