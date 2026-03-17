<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">पाठ प्रबंधन</h1>
        <p class="text-sm text-gray-500 mt-1">{{ chapters.length }} पाठ कुल</p>
      </div>
      <RouterLink
        to="/admin/chapters/new"
        class="px-4 py-2 bg-saffron-600 text-white rounded-lg text-sm font-medium hover:bg-saffron-700 transition-colors"
      >
        + नया पाठ
      </RouterLink>
    </div>

    <!-- Error -->
    <div v-if="error" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
      {{ error }}
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-16">
      <div class="w-8 h-8 border-4 border-saffron-400 border-t-transparent rounded-full animate-spin" />
    </div>

    <!-- Table -->
    <div v-else class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <th class="px-4 py-3 w-12">#</th>
            <th class="px-4 py-3">शीर्षक</th>
            <th class="px-4 py-3 w-28 text-center">प्रकाशित</th>
            <th class="px-4 py-3 w-40 text-right">क्रियाएं</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr
            v-for="ch in chapters"
            :key="ch._id"
            class="hover:bg-gray-50 transition-colors"
          >
            <td class="px-4 py-3 text-lg font-bold text-saffron-700">
              {{ ch.number }}
            </td>
            <td class="px-4 py-3">
              <div class="font-medium text-gray-900" style="font-family: var(--font-devanagari)">{{ ch.title.hi }}</div>
              <div v-if="ch.title.en" class="text-xs text-gray-400 mt-0.5">{{ ch.title.en }}</div>
            </td>
            <td class="px-4 py-3 text-center">
              <button
                @click="togglePublished(ch)"
                :class="ch.is_published ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'"
                class="px-3 py-1 rounded-full text-xs font-medium transition-colors"
              >
                {{ ch.is_published ? '✓ प्रकाशित' : 'अप्रकाशित' }}
              </button>
            </td>
            <td class="px-4 py-3 text-right">
              <div class="flex items-center justify-end gap-2">
                <RouterLink
                  :to="`/admin/chapters/${ch._id}`"
                  class="px-3 py-1 text-xs font-medium text-indigo-600 hover:text-indigo-800 border border-indigo-200 rounded-md hover:bg-indigo-50 transition-colors"
                >
                  संपादित करें
                </RouterLink>
                <button
                  @click="confirmDelete(ch)"
                  class="px-3 py-1 text-xs font-medium text-red-500 hover:text-red-700 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
                >
                  हटाएं
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="chapters.length === 0" class="text-center py-12 text-gray-400 text-sm">
        कोई पाठ नहीं मिला।
      </div>
    </div>

    <!-- Delete confirmation modal -->
    <div
      v-if="deleteTarget"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      @click.self="deleteTarget = null"
    >
      <div class="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">पाठ हटाएं?</h3>
        <p class="text-sm text-gray-600 mb-4">
          <strong>{{ deleteTarget.title.hi }}</strong> और उसके सभी खंड स्थायी रूप से हटाए जाएंगे।
        </p>
        <div class="flex gap-3 justify-end">
          <button @click="deleteTarget = null" class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
            रद्द करें
          </button>
          <button
            @click="doDelete"
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            हाँ, हटाएं
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { chaptersApi } from '@/api/chapters'

interface ChapterRow {
  _id: string
  number: number
  title: { hi: string; en: string }
  order: number
  is_published: boolean
}

const chapters = ref<ChapterRow[]>([])
const loading = ref(true)
const error = ref('')
const deleteTarget = ref<ChapterRow | null>(null)

async function load() {
  loading.value = true
  error.value = ''
  try {
    const { data } = await chaptersApi.adminGetAll()
    chapters.value = data.data.chapters
  } catch (e: any) {
    error.value = e.response?.data?.message || 'डेटा लोड नहीं हो सका।'
  } finally {
    loading.value = false
  }
}

async function togglePublished(ch: ChapterRow) {
  error.value = ''
  try {
    if (ch.is_published) {
      await chaptersApi.adminUnpublish(ch._id)
      ch.is_published = false
    } else {
      await chaptersApi.adminPublish(ch._id)
      ch.is_published = true
    }
  } catch {
    error.value = 'अपडेट विफल।'
  }
}

function confirmDelete(ch: ChapterRow) {
  deleteTarget.value = ch
}

async function doDelete() {
  if (!deleteTarget.value) return
  try {
    await chaptersApi.adminDelete(deleteTarget.value._id)
    chapters.value = chapters.value.filter(c => c._id !== deleteTarget.value!._id)
    deleteTarget.value = null
  } catch {
    error.value = 'हटाना विफल।'
    deleteTarget.value = null
  }
}

onMounted(load)
</script>
