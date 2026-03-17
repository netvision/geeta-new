<template>
  <div class="bg-ivory-50 rounded-2xl shadow-xl border border-ivory-300 p-8">
    <h2 class="text-2xl font-bold text-earth-800 mb-1" style="font-family: var(--font-devanagari)">
      नया पासवर्ड
    </h2>

    <form v-if="!done" @submit.prevent="handleSubmit" class="space-y-4 mt-6">
      <div>
        <label class="block text-sm font-medium text-earth-800 mb-1">नया पासवर्ड</label>
        <input
          v-model="password"
          type="password"
          required
          minlength="8"
          placeholder="कम से कम ८ अक्षर"
          class="w-full border border-ivory-400 rounded-lg px-4 py-2.5 text-earth-800 bg-white focus:outline-none focus:ring-2 focus:ring-saffron-400 transition"
        />
      </div>
      <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
        {{ error }}
      </div>
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-saffron-500 hover:bg-saffron-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        {{ loading ? 'सहेज रहे हैं...' : 'पासवर्ड बदलें' }}
      </button>
    </form>

    <div v-else class="text-center py-4">
      <div class="text-4xl mb-3">✅</div>
      <p class="text-earth-800 font-medium mb-4">पासवर्ड बदल दिया गया!</p>
      <RouterLink to="/login" class="bg-saffron-500 text-white px-6 py-2 rounded-lg text-sm font-medium">
        लॉगिन करें
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { authApi } from '@/api/auth'

const route = useRoute()
const password = ref('')
const loading = ref(false)
const error = ref('')
const done = ref(false)

async function handleSubmit() {
  loading.value = true
  error.value = ''
  try {
    await authApi.resetPassword(route.params.token as string, password.value)
    done.value = true
  } catch (err: any) {
    error.value = err.response?.data?.message || 'रीसेट विफल। लिंक समाप्त हो गया होगा।'
  } finally {
    loading.value = false
  }
}
</script>
