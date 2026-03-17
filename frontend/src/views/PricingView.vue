<template>
  <div class="py-16 px-4">
    <div class="container mx-auto max-w-4xl">
      <h1 class="text-3xl font-bold text-center text-earth-800 mb-3" style="font-family: var(--font-devanagari)">
        सदस्यता योजनाएँ
      </h1>
      <p class="text-center text-earth-700 mb-12">
        अपने विद्यालय के लिए उपयुक्त योजना चुनें
      </p>

      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="n in 3" :key="n" class="h-64 bg-ivory-200 rounded-2xl animate-pulse" />
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="plan in plans"
          :key="plan.id"
          class="rounded-2xl border-2 p-6 flex flex-col"
          :class="plan.id === 'premium'
            ? 'border-saffron-400 bg-gradient-to-b from-saffron-50 to-ivory-50 shadow-lg'
            : 'border-ivory-300 bg-ivory-50'"
        >
          <div v-if="plan.id === 'premium'" class="text-xs font-bold text-saffron-600 uppercase tracking-widest mb-2">
            सर्वोत्तम
          </div>
          <h3 class="text-xl font-bold text-earth-800 mb-1" style="font-family: var(--font-devanagari)">
            {{ plan.name }}
          </h3>
          <div class="text-2xl font-bold text-earth-800 mb-1">
            {{ plan.price === 0 ? 'निःशुल्क' : plan.display_price }}
          </div>
          <p class="text-xs text-earth-600 mb-6">
            {{ plan.price === 0 ? 'हमेशा के लिए' : 'प्रति वर्ष' }}
          </p>

          <ul class="space-y-2 flex-1 mb-6">
            <li class="flex gap-2 text-sm text-earth-700">
              <span class="text-green-500">✓</span>
              {{ plan.features.chapters_limit === -1 ? 'सभी ३० पाठ' : `पहले ${plan.features.chapters_limit} पाठ` }}
            </li>
            <li class="flex gap-2 text-sm text-earth-700">
              <span class="text-green-500">✓</span>
              {{ plan.features.max_students === -1 ? 'असीमित विद्यार्थी' : `${plan.features.max_students} विद्यार्थी` }}
            </li>
            <li class="flex gap-2 text-sm" :class="plan.features.discussions ? 'text-earth-700' : 'text-earth-400 line-through'">
              <span>{{ plan.features.discussions ? '✓' : '✗' }}</span>
              चर्चा प्रश्न
            </li>
            <li class="flex gap-2 text-sm" :class="plan.features.analytics ? 'text-earth-700' : 'text-earth-400 line-through'">
              <span>{{ plan.features.analytics ? '✓' : '✗' }}</span>
              विश्लेषण डैशबोर्ड
            </li>
            <li class="flex gap-2 text-sm" :class="plan.features.hd_illustrations ? 'text-earth-700' : 'text-earth-400 line-through'">
              <span>{{ plan.features.hd_illustrations ? '✓' : '✗' }}</span>
              HD चित्रण
            </li>
          </ul>

          <RouterLink
            :to="plan.price === 0 ? '/register' : '/register'"
            class="block text-center py-2.5 rounded-xl font-semibold text-sm transition-colors"
            :class="plan.id === 'premium'
              ? 'bg-saffron-500 hover:bg-saffron-600 text-white'
              : 'border border-saffron-400 text-saffron-600 hover:bg-saffron-50'"
          >
            {{ plan.price === 0 ? 'निःशुल्क शुरू करें' : 'अभी लें' }}
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { subscriptionsApi } from '@/api/subscriptions'

const plans = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await subscriptionsApi.getPlans()
    plans.value = data.data.plans
  } finally {
    loading.value = false
  }
})
</script>
