<template>
  <div>
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-earth-800" style="font-family: var(--font-devanagari)">
          प्रबंधन डैशबोर्ड
        </h1>
        <p class="text-earth-700 text-sm mt-1">{{ authStore.user?.school?.name }}</p>
      </div>
      <span class="text-xs bg-indigo-deep-100 text-indigo-deep-700 border border-indigo-deep-200 px-3 py-1 rounded-full font-medium">
        {{ authStore.isSuperadmin ? 'सुपर एडमिन' : 'विद्यालय एडमिन' }}
      </span>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
      <RouterLink
        to="/chapters"
        class="bg-ivory-50 border border-ivory-300 rounded-xl p-5 hover:border-saffron-300 transition-colors"
      >
        <div class="text-2xl mb-2">📖</div>
        <div class="font-bold text-earth-800" style="font-family: var(--font-devanagari)">पाठ प्रबंधन</div>
        <div class="text-xs text-earth-600 mt-1">सभी पाठ देखें</div>
      </RouterLink>

      <div class="bg-ivory-50 border border-ivory-300 rounded-xl p-5">
        <div class="text-2xl mb-2">👨‍🎓</div>
        <div class="font-bold text-earth-800" style="font-family: var(--font-devanagari)">विद्यार्थी</div>
        <div class="text-xs text-earth-600 mt-1">जल्द आ रहा है</div>
      </div>

      <div class="bg-ivory-50 border border-ivory-300 rounded-xl p-5">
        <div class="text-2xl mb-2">📊</div>
        <div class="font-bold text-earth-800" style="font-family: var(--font-devanagari)">विश्लेषण</div>
        <div class="text-xs text-earth-600 mt-1">जल्द आ रहा है</div>
      </div>
    </div>

    <!-- Subscription info -->
    <div class="bg-gradient-to-r from-indigo-deep-50 to-ivory-50 border border-indigo-deep-200 rounded-xl p-5">
      <h3 class="font-semibold text-indigo-deep-800 mb-2" style="font-family: var(--font-devanagari)">
        सदस्यता स्थिति
      </h3>
      <RouterLink to="/pricing" class="text-sm text-saffron-600 hover:underline">
        सदस्यता अपग्रेड करें →
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>
