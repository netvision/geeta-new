import api from './client'

export const authApi = {
  register(payload: {
    name: string
    email: string
    password: string
    role?: string
    join_code?: string
  }) {
    return api.post('/auth/register', payload)
  },

  login(email: string, password: string) {
    return api.post('/auth/login', { email, password })
  },

  logout() {
    return api.post('/auth/logout')
  },

  getMe() {
    return api.get('/auth/me')
  },

  updateMe(payload: { name?: string; language_preference?: string }) {
    return api.patch('/auth/me', payload)
  },

  refreshToken(refreshToken: string) {
    return api.post('/auth/refresh-token', { refreshToken })
  },

  forgotPassword(email: string) {
    return api.post('/auth/forgot-password', { email })
  },

  resetPassword(token: string, password: string) {
    return api.post(`/auth/reset-password/${token}`, { password })
  },
}
