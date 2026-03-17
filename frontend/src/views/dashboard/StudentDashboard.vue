<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-earth-800" style="font-family: var(--font-devanagari)">
        नमस्ते, {{ authStore.user?.name?.split(' ')[0] }} जी!
      </h1>
      <p class="text-earth-700 mt-1 text-sm">आपकी गीता पाठ यात्रा</p>
    </div>

    <!-- Quick actions -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
      <RouterLink
        to="/chapters"
        class="bg-gradient-to-br from-saffron-500 to-saffron-600 text-white rounded-2xl p-6 hover:shadow-lg transition-shadow"
      >
        <div class="text-3xl mb-2">📖</div>
        <h3 class="font-bold text-lg" style="font-family: var(--font-devanagari)">पाठ पढ़ें</h3>
        <p class="text-saffron-100 text-sm mt-1">सभी पाठ देखें और पढ़ें</p>
      </RouterLink>

      <div class="bg-ivory-50 border border-ivory-300 rounded-2xl p-6">
        <div class="text-3xl mb-2">🏫</div>
        <h3 class="font-bold text-lg text-earth-800" style="font-family: var(--font-devanagari)">
          {{ authStore.user?.school?.name || 'विद्यालय' }}
        </h3>
        <p class="text-earth-600 text-sm mt-1">
          कोड: <span class="font-mono font-bold tracking-widest">{{ authStore.user?.school?.join_code || '—' }}</span>
        </p>
      </div>
    </div>

    <!-- Language preference -->
    <div class="bg-ivory-50 border border-ivory-300 rounded-xl p-5">
      <h3 class="font-semibold text-earth-800 mb-3 text-sm" style="font-family: var(--font-devanagari)">
        भाषा प्राथमिकता
      </h3>
      <div class="flex gap-3">
        <button
          @click="langStore.setLang('hi')"
          class="px-5 py-2 rounded-lg text-sm font-medium transition-colors border"
          :class="langStore.isHindi
            ? 'bg-saffron-500 border-saffron-500 text-white'
            : 'border-ivory-400 text-earth-700'"
        >
          हिन्दी
        </button>
        <button
          @click="langStore.setLang('en')"
          class="px-5 py-2 rounded-lg text-sm font-medium transition-colors border"
          :class="!langStore.isHindi
            ? 'bg-saffron-500 border-saffron-500 text-white'
            : 'border-ivory-400 text-earth-700'"
        >
          English
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useLangStore } from '@/stores/lang'

const authStore = useAuthStore()
const langStore = useLangStore()
</script>
