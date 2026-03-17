import { defineStore } from 'pinia'
import { ref } from 'vue'
import { chaptersApi } from '@/api/chapters'

export interface ChapterSummary {
  id: string
  number: number
  title: string
  order: number
}

export interface SanskritVerse {
  verse: string
  ref: string
  order: number
}

export interface DiscussionQuestion {
  hi: string
  en: string
  order: number
}

export interface ContentBlock {
  id: string
  type: 'shloka_group' | 'prasang' | 'tatparya' | 'story' | 'explanation' | 'discussion'
  order: number
  section_title: string
  title: string
  content: string
  metadata: {
    shloka_refs: string[]
    sanskrit_verses: SanskritVerse[]
    questions: DiscussionQuestion[]
    source?: string
    is_parable?: boolean
  }
}

export interface ChapterDetail {
  id: string
  number: number
  title: string
  summary: string
  contentBlocks: ContentBlock[]
}

export const useChaptersStore = defineStore('chapters', () => {
  const list = ref<ChapterSummary[]>([])
  const current = ref<ChapterDetail | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchAll() {
    loading.value = true
    error.value = null
    try {
      const { data } = await chaptersApi.getAll()
      list.value = data.data.chapters
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to load chapters.'
    } finally {
      loading.value = false
    }
  }

  async function fetchByNumber(number: number | string) {
    loading.value = true
    error.value = null
    current.value = null
    try {
      const { data } = await chaptersApi.getByNumber(number)
      current.value = {
        ...data.data.chapter,
        contentBlocks: data.data.contentBlocks,
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Chapter not found.'
      throw err
    } finally {
      loading.value = false
    }
  }

  return { list, current, loading, error, fetchAll, fetchByNumber }
})
