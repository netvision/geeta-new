import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    // ── Public ──────────────────────────────────────────────────────────────
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { layout: 'public' },
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: () => import('@/views/PricingView.vue'),
      meta: { layout: 'public' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
      meta: { layout: 'public' },
    },

    // ── Auth ─────────────────────────────────────────────────────────────────
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: { layout: 'auth', guestOnly: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue'),
      meta: { layout: 'auth', guestOnly: true },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/auth/ForgotPasswordView.vue'),
      meta: { layout: 'auth' },
    },
    {
      path: '/reset-password/:token',
      name: 'reset-password',
      component: () => import('@/views/auth/ResetPasswordView.vue'),
      meta: { layout: 'auth' },
    },

    // ── Chapters (public list, paywall on detail) ─────────────────────────
    {
      path: '/chapters',
      name: 'chapters',
      component: () => import('@/views/chapters/ChapterListView.vue'),
      meta: { layout: 'app' },
    },
    {
      path: '/chapters/:number',
      name: 'chapter-detail',
      component: () => import('@/views/chapters/ChapterDetailView.vue'),
      meta: { layout: 'app' },
    },

    // ── Protected: student dashboard ─────────────────────────────────────
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/StudentDashboard.vue'),
      meta: { layout: 'app', requiresAuth: true },
    },
    {
      path: '/dashboard/admin',
      name: 'admin-dashboard',
      component: () => import('@/views/dashboard/AdminDashboard.vue'),
      meta: { layout: 'app', requiresAuth: true, roles: ['school_admin', 'superadmin'] },
    },

    // ── Superadmin: chapter management ──────────────────────────────────────
    {
      path: '/admin/chapters',
      name: 'admin-chapters',
      component: () => import('@/views/admin/ChapterListAdmin.vue'),
      meta: { layout: 'app', requiresAuth: true, roles: ['superadmin'] },
    },
    {
      path: '/admin/chapters/new',
      name: 'admin-chapter-new',
      component: () => import('@/views/admin/ChapterEditorView.vue'),
      meta: { layout: 'app', requiresAuth: true, roles: ['superadmin'] },
    },
    {
      path: '/admin/chapters/:id',
      name: 'admin-chapter-edit',
      component: () => import('@/views/admin/ChapterEditorView.vue'),
      meta: { layout: 'app', requiresAuth: true, roles: ['superadmin'] },
    },

    // ── 404 ──────────────────────────────────────────────────────────────────
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { layout: 'public' },
    },
  ],
})

// ── Navigation guards ─────────────────────────────────────────────────────────
router.beforeEach(async (to) => {
  const auth = useAuthStore()

  // Attempt to restore session on first load
  if (!auth.user && localStorage.getItem('access_token')) {
    await auth.fetchMe()
  }

  // Redirect logged-in users away from auth pages
  if (to.meta.guestOnly && auth.isLoggedIn) {
    return { name: 'dashboard' }
  }

  // Require authentication
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  // Role-based access
  if (to.meta.roles && auth.user) {
    const allowedRoles = to.meta.roles as string[]
    if (!allowedRoles.includes(auth.user.role)) {
      return { name: 'dashboard' }
    }
  }
})

export default router
