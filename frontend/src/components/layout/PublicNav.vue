<template>
  <nav class="sticky top-0 z-50 bg-ivory-50/95 backdrop-blur border-b border-gold-200 shadow-sm">
    <div class="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2 group">
        <span class="text-3xl text-saffron-600 leading-none" style="font-family: var(--font-devanagari)">गीता</span>
        <div class="flex flex-col leading-tight">
          <span class="text-sm font-bold text-indigo-deep-700 tracking-wide">पाठ</span>
          <span class="text-[10px] text-earth-700 uppercase tracking-widest">Portal</span>
        </div>
      </RouterLink>

      <!-- Desktop nav -->
      <div class="hidden md:flex items-center gap-6">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-earth-800 hover:text-saffron-600 transition-colors text-sm font-medium"
          active-class="text-saffron-600"
        >
          {{ link.label }}
        </RouterLink>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3">
        <!-- Language toggle -->
        <button
          @click="toggleLang"
          class="text-xs border border-gold-300 rounded-full px-3 py-1 text-earth-700 hover:bg-gold-50 transition-colors"
        >
          {{ langStore.isHindi ? 'EN' : 'हि' }}
        </button>

        <template v-if="!authStore.isLoggedIn">
          <RouterLink
            to="/login"
            class="text-sm text-indigo-deep-700 hover:text-indigo-deep-900 font-medium transition-colors"
          >
            लॉगिन
          </RouterLink>
          <RouterLink
            to="/register"
            class="text-sm bg-saffron-500 hover:bg-saffron-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            शुरू करें
          </RouterLink>
        </template>
        <template v-else>
          <RouterLink
            to="/dashboard"
            class="text-sm bg-saffron-500 hover:bg-saffron-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            डैशबोर्ड
          </RouterLink>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useLangStore } from '@/stores/lang'

const authStore = useAuthStore()
const langStore = useLangStore()

const navLinks = [
  { to: '/chapters', label: 'पाठ सूची' },
  { to: '/pricing', label: 'योजनाएँ' },
  { to: '/about', label: 'हमारे बारे में' },
]

function toggleLang() {
  langStore.setLang(langStore.isHindi ? 'en' : 'hi')
}
</script>
