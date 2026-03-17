import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'
import { authApi } from '@/api/auth'

export const useLangStore = defineStore('lang', () => {
  const _lang = ref<'hi' | 'en'>(
    (localStorage.getItem('lang') as 'hi' | 'en') || 'hi'
  )

  const lang = computed(() => _lang.value)
  const isHindi = computed(() => _lang.value === 'hi')

  async function setLang(newLang: 'hi' | 'en') {
    _lang.value = newLang
    localStorage.setItem('lang', newLang)

    // Persist to user profile if logged in
    const authStore = useAuthStore()
    if (authStore.isLoggedIn) {
      try {
        await authApi.updateMe({ language_preference: newLang })
      } catch {
        // Non-critical
      }
    }
  }

  return { lang, isHindi, setLang }
})
