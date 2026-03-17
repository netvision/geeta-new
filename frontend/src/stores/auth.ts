import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '@/api/auth'

interface User {
  id: string
  name: string
  email: string
  role: 'superadmin' | 'school_admin' | 'teacher' | 'student'
  school?: { _id: string; name: string; join_code: string }
  language_preference: 'hi' | 'en'
  avatar?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isLoggedIn = computed(() => !!user.value)
  const isAdmin = computed(() =>
    ['superadmin', 'school_admin'].includes(user.value?.role ?? '')
  )
  const isSuperadmin = computed(() => user.value?.role === 'superadmin')

  async function login(email: string, password: string) {
    loading.value = true
    error.value = null
    try {
      const { data } = await authApi.login(email, password)
      localStorage.setItem('access_token', data.data.accessToken)
      localStorage.setItem('refresh_token', data.data.refreshToken)
      user.value = data.data.user
      return data.data.user
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Login failed.'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function register(payload: Parameters<typeof authApi.register>[0]) {
    loading.value = true
    error.value = null
    try {
      const { data } = await authApi.register(payload)
      localStorage.setItem('access_token', data.data.accessToken)
      localStorage.setItem('refresh_token', data.data.refreshToken)
      user.value = data.data.user
      return data.data.user
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Registration failed.'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      await authApi.logout()
    } finally {
      user.value = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    }
  }

  async function fetchMe() {
    if (!localStorage.getItem('access_token')) return
    try {
      const { data } = await authApi.getMe()
      user.value = data.data.user
    } catch {
      user.value = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    }
  }

  return { user, loading, error, isLoggedIn, isAdmin, isSuperadmin, login, register, logout, fetchMe }
})
