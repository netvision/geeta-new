<template>
  <div class="bg-ivory-50 rounded-2xl shadow-xl border border-ivory-300 p-8">
    <h2 class="text-2xl font-bold text-earth-800 mb-1" style="font-family: var(--font-devanagari)">
      पासवर्ड रीसेट
    </h2>
    <p class="text-sm text-earth-700 mb-6">अपना ईमेल दर्ज करें — हम रीसेट लिंक भेजेंगे।</p>

    <form v-if="!sent" @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-earth-800 mb-1">ईमेल</label>
        <input
          v-model="email"
          type="email"
          required
          placeholder="name@school.edu"
          class="w-full border border-ivory-400 rounded-lg px-4 py-2.5 text-earth-800 bg-white focus:outline-none focus:ring-2 focus:ring-saffron-400 transition"
        />
      </div>
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-saffron-500 hover:bg-saffron-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        {{ loading ? 'भेज रहे हैं...' : 'रीसेट लिंक भेजें' }}
      </button>
    </form>

    <div v-else class="text-center py-4">
      <div class="text-4xl mb-3">📧</div>
      <p class="text-earth-800 font-medium mb-1">लिंक भेज दिया गया</p>
      <p class="text-sm text-earth-700">अपना ईमेल जाँचें और रीसेट लिंक पर क्लिक करें।</p>
    </div>

    <p class="text-center text-sm text-earth-700 mt-6">
      <RouterLink to="/login" class="text-saffron-600 hover:underline">← वापस लॉगिन</RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { authApi } from '@/api/auth'

const email = ref('')
const loading = ref(false)
const sent = ref(false)

async function handleSubmit() {
  loading.value = true
  try {
    await authApi.forgotPassword(email.value)
    sent.value = true
  } finally {
    loading.value = false
  }
}
</script>
