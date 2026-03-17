import api from './client'

export const subscriptionsApi = {
  getPlans() {
    return api.get('/subscriptions/plans')
  },

  createOrder(plan: string, school_id: string) {
    return api.post('/subscriptions/order', { plan, school_id })
  },

  verifyPayment(payload: {
    razorpay_order_id: string
    razorpay_payment_id: string
    razorpay_signature: string
    school_id: string
    plan: string
  }) {
    return api.post('/subscriptions/verify', payload)
  },

  getSubscription(school_id: string) {
    return api.get(`/subscriptions/${school_id}`)
  },
}
