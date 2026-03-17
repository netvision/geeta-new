<template>
  <div class="bg-ivory-50 rounded-2xl shadow-xl border border-ivory-300 p-8">
    <h2 class="text-2xl font-bold text-earth-800 mb-1" style="font-family: var(--font-devanagari)">
      पंजीकरण
    </h2>
    <p class="text-sm text-earth-700 mb-6">नया खाता बनाएँ</p>

    <form @submit.prevent="handleRegister" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-earth-800 mb-1">पूरा नाम</label>
        <input
          v-model="form.name"
          type="text"
          required
          placeholder="आपका नाम"
          class="w-full border border-ivory-400 rounded-lg px-4 py-2.5 text-earth-800 bg-white focus:outline-none focus:ring-2 focus:ring-saffron-400 transition"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-earth-800 mb-1">ईमेल</label>
        <input
          v-model="form.email"
          type="email"
          required
          placeholder="name@school.edu"
          class="w-full border border-ivory-400 rounded-lg px-4 py-2.5 text-earth-800 bg-white focus:outline-none focus:ring-2 focus:ring-saffron-400 transition"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-earth-800 mb-1">पासवर्ड</label>
        <input
          v-model="form.password"
          type="password"
          required
          minlength="8"
          placeholder="कम से कम ८ अक्षर"
          class="w-full border border-ivory-400 rounded-lg px-4 py-2.5 text-earth-800 bg-white focus:outline-none focus:ring-2 focus:ring-saffron-400 transition"
        />
      </div>

      <!-- Role -->
      <div>
        <label class="block text-sm font-medium text-earth-800 mb-1">भूमिका</label>
        <select
          v-model="form.role"
          class="w-full border border-ivory-400 rounded-lg px-4 py-2.5 text-earth-800 bg-white focus:outline-none focus:ring-2 focus:ring-saffron-400 transition"
        >
          <option value="student">विद्यार्थी</option>
          <option value="teacher">शिक्षक</option>
          <option value="school_admin">विद्यालय प्रशासक</option>
        </select>
      </div>

      <!-- Join code for students -->
      <div v-if="form.role === 'student'">
        <label class="block text-sm font-medium text-earth-800 mb-1">विद्यालय कोड</label>
        <input
          v-model="form.join_code"
          type="text"
          required
          maxlength="6"
          placeholder="जैसे: ABC123"
          class="w-full border border-ivory-400 rounded-lg px-4 py-2.5 text-earth-800 bg-white focus:outline-none focus:ring-2 focus:ring-saffron-400 transition uppercase tracking-widest"
          @input="form.join_code = form.join_code.toUpperCase()"
        />
        <p class="text-xs text-earth-600 mt-1">अपने शिक्षक से ६-अक्षर का विद्यालय कोड प्राप्त करें।</p>
      </div>

      <div v-if="authStore.error" class="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
        {{ authStore.error }}
      </div>

      <button
        type="submit"
        :disabled="authStore.loading"
        class="w-full bg-saffron-500 hover:bg-saffron-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        {{ authStore.loading ? 'पंजीकरण हो रहा है...' : 'खाता बनाएँ' }}
      </button>
    </form>

    <p class="text-center text-sm text-earth-700 mt-6">
      पहले से खाता है?
      <RouterLink to="/login" class="text-saffron-600 font-medium hover:underline">
        लॉगिन करें
      </RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  password: '',
  role: 'student' as string,
  join_code: '',
})

async function handleRegister() {
  try {
    const payload: any = { name: form.name, email: form.email, password: form.password, role: form.role }
    if (form.role === 'student') payload.join_code = form.join_code
    await authStore.register(payload)
    router.push('/dashboard')
  } catch {
    // error shown via authStore.error
  }
}
</script>
