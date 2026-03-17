<template>
  <div class="bg-ivory-50 rounded-2xl shadow-xl border border-ivory-300 p-8">
    <h2 class="text-2xl font-bold text-earth-800 mb-1" style="font-family: var(--font-devanagari)">
      लॉगिन करें
    </h2>
    <p class="text-sm text-earth-700 mb-6">अपने खाते में प्रवेश करें</p>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-earth-800 mb-1">ईमेल</label>
        <input
          v-model="form.email"
          type="email"
          required
          placeholder="name@school.edu"
          class="w-full border border-ivory-400 rounded-lg px-4 py-2.5 text-earth-800 bg-white focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-earth-800 mb-1">पासवर्ड</label>
        <input
          v-model="form.password"
          type="password"
          required
          placeholder="••••••••"
          class="w-full border border-ivory-400 rounded-lg px-4 py-2.5 text-earth-800 bg-white focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition"
        />
      </div>

      <div class="flex justify-end">
        <RouterLink to="/forgot-password" class="text-xs text-saffron-600 hover:underline">
          पासवर्ड भूल गए?
        </RouterLink>
      </div>

      <div v-if="authStore.error" class="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
        {{ authStore.error }}
      </div>

      <button
        type="submit"
        :disabled="authStore.loading"
        class="w-full bg-saffron-500 hover:bg-saffron-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        {{ authStore.loading ? 'लॉगिन हो रहा है...' : 'लॉगिन करें' }}
      </button>
    </form>

    <p class="text-center text-sm text-earth-700 mt-6">
      खाता नहीं है?
      <RouterLink to="/register" class="text-saffron-600 font-medium hover:underline">
        पंजीकरण करें
      </RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const form = reactive({ email: '', password: '' })

async function handleLogin() {
  try {
    await authStore.login(form.email, form.password)
    const redirect = (route.query.redirect as string) || '/dashboard'
    router.push(redirect)
  } catch {
    // error shown via authStore.error
  }
}
</script>
