import api from './client'

export const chaptersApi = {
  // ── Public ──────────────────────────────────────────────────────────────────
  getAll() {
    return api.get('/chapters')
  },

  getByNumber(number: number | string) {
    return api.get(`/chapters/${number}`)
  },

  // ── Superadmin ──────────────────────────────────────────────────────────────
  adminGetAll() {
    return api.get('/chapters/admin/all')
  },

  adminGetById(id: string) {
    return api.get(`/chapters/admin/${id}`)
  },

  adminCreate(payload: Record<string, unknown>) {
    return api.post('/chapters', payload)
  },

  adminUpdate(id: string, payload: Record<string, unknown>) {
    return api.patch(`/chapters/${id}`, payload)
  },

  adminPublish(id: string) {
    return api.patch(`/chapters/${id}/publish`)
  },

  adminUnpublish(id: string) {
    return api.patch(`/chapters/${id}/unpublish`)
  },

  adminDelete(id: string) {
    return api.delete(`/chapters/${id}`)
  },

  // ── Content Blocks ───────────────────────────────────────────────────────────
  adminGetBlocks(chapterId: string) {
    return api.get(`/chapters/${chapterId}/blocks`)
  },

  adminAddBlock(chapterId: string, payload: Record<string, unknown>) {
    return api.post(`/chapters/${chapterId}/blocks`, payload)
  },

  adminUpdateBlock(chapterId: string, blockId: string, payload: Record<string, unknown>) {
    return api.patch(`/chapters/${chapterId}/blocks/${blockId}`, payload)
  },

  adminDeleteBlock(chapterId: string, blockId: string) {
    return api.delete(`/chapters/${chapterId}/blocks/${blockId}`)
  },

  adminReorderBlocks(chapterId: string, blockOrders: { id: string; order: number }[]) {
    return api.post(`/chapters/${chapterId}/blocks/reorder`, { blockOrders })
  },
}
