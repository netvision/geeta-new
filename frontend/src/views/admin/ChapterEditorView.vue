<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <RouterLink to="/admin/chapters" class="text-sm text-gray-500 hover:text-gray-700">← वापस</RouterLink>
      <h1 class="text-2xl font-bold text-gray-900">
        {{ isNew ? 'नया पाठ' : `पाठ ${meta.number} — ${meta.title_hi}` }}
      </h1>
    </div>

    <!-- Page loading -->
    <div v-if="loading" class="flex justify-center py-16">
      <div class="w-8 h-8 border-4 border-saffron-400 border-t-transparent rounded-full animate-spin" />
    </div>

    <template v-else>
      <!-- Toast -->
      <div
        v-if="toast"
        :class="toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'"
        class="fixed top-4 right-4 z-50 px-4 py-2 text-white text-sm rounded-lg shadow-lg"
      >
        {{ toast.msg }}
      </div>

      <!-- Tabs -->
      <div class="flex border-b border-gray-200 mb-6 gap-1">
        <button
          v-for="tab in TABS"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="activeTab === tab.key
            ? 'border-b-2 border-saffron-500 text-saffron-700 font-semibold'
            : 'text-gray-500 hover:text-gray-700'"
          class="px-4 py-2 text-sm transition-colors"
        >
          {{ tab.label }}
          <span v-if="tab.key === 'blocks' && !isNew" class="ml-1 text-xs text-gray-400">({{ blocks.length }})</span>
        </button>
      </div>

      <!-- ── TAB: Metadata ────────────────────────────────────────────────── -->
      <div v-show="activeTab === 'meta'" class="space-y-5">
        <div class="grid grid-cols-2 gap-4">
          <Field label="पाठ संख्या *">
            <input v-model.number="meta.number" type="number" min="1" class="field-input" />
          </Field>
          <Field label="क्रम (Order)">
            <input v-model.number="meta.order" type="number" min="1" class="field-input" />
          </Field>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <Field label="शीर्षक (हिन्दी) *">
            <input v-model="meta.title_hi" class="field-input" placeholder="मोह" />
          </Field>
          <Field label="Title (English)">
            <input v-model="meta.title_en" class="field-input" placeholder="optional" />
          </Field>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <Field label="सारांश (हिन्दी)">
            <textarea v-model="meta.summary_hi" rows="3" class="field-input resize-none" />
          </Field>
          <Field label="Summary (English)">
            <textarea v-model="meta.summary_en" rows="3" class="field-input resize-none" placeholder="optional" />
          </Field>
        </div>

        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="meta.is_published" class="w-4 h-4 accent-green-600" />
          <span class="text-sm font-medium text-gray-700">प्रकाशित करें</span>
        </label>

        <div class="flex items-center gap-4 pt-2 border-t border-gray-100">
          <button
            @click="saveMeta"
            :disabled="saving"
            class="px-6 py-2.5 bg-saffron-600 text-white font-medium text-sm rounded-lg hover:bg-saffron-700 disabled:opacity-50 transition-colors"
          >
            {{ saving ? 'सहेज रहे हैं...' : (isNew ? 'पाठ बनाएं' : 'परिवर्तन सहेजें') }}
          </button>
          <RouterLink to="/admin/chapters" class="text-sm text-gray-500 hover:text-gray-700">
            रद्द करें
          </RouterLink>
          <span v-if="lastSaved" class="text-xs text-gray-400 ml-auto">{{ lastSaved }}</span>
        </div>
      </div>

      <!-- ── TAB: Content Blocks ──────────────────────────────────────────── -->
      <div v-show="activeTab === 'blocks'">
        <div v-if="isNew" class="text-center py-12 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-xl">
          पहले "मेटाडेटा" टैब में पाठ सहेजें, फिर खंड जोड़ें।
        </div>

        <template v-else>
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm text-gray-500">{{ blocks.length }} खंड</span>
            <button
              @click="openAddForm"
              class="px-3 py-1.5 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              + खंड जोड़ें
            </button>
          </div>

          <!-- Add block inline form -->
          <div v-if="showAddForm" class="mb-4 border-2 border-dashed border-indigo-200 rounded-xl bg-indigo-50/50 p-4">
            <p class="text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-3">नया खंड</p>
            <BlockForm
              :form="addForm"
              :saving="addingSaving"
              save-label="खंड जोड़ें"
              @save="addBlock"
              @cancel="showAddForm = false"
            />
          </div>

          <!-- Block list -->
          <div class="space-y-3">
            <div
              v-for="(block, idx) in blocks"
              :key="block._id"
              class="border border-gray-200 rounded-xl bg-white overflow-hidden"
            >
              <!-- Header row -->
              <div
                class="flex items-center gap-3 px-4 py-2.5 cursor-pointer select-none"
                :class="block._open ? 'bg-gray-50 border-b border-gray-100' : 'hover:bg-gray-50'"
                @click="block._open = !block._open"
              >
                <span :class="typeColor(block.type)" class="px-2 py-0.5 rounded text-xs font-semibold shrink-0">
                  {{ typeLabel(block.type) }}
                </span>
                <span class="text-sm text-gray-700 truncate flex-1">{{ blockPreview(block) }}</span>
                <div class="flex items-center gap-1 shrink-0" @click.stop>
                  <button @click="moveBlock(idx, -1)" :disabled="idx === 0" class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 text-xs">↑</button>
                  <button @click="moveBlock(idx, 1)" :disabled="idx === blocks.length - 1" class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 text-xs">↓</button>
                  <button @click="deleteBlock(block._id)" class="p-1 text-red-400 hover:text-red-600 ml-1 text-xs">✕</button>
                  <span class="text-gray-400 ml-1 text-xs">{{ block._open ? '▲' : '▼' }}</span>
                </div>
              </div>

              <!-- Edit form (expanded) -->
              <div v-if="block._open" class="px-4 pb-4 pt-3">
                <BlockForm
                  :form="block._form"
                  :saving="block._saving"
                  save-label="सहेजें"
                  @save="updateBlock(block)"
                  @cancel="block._open = false"
                />
              </div>
            </div>
          </div>

          <div v-if="blocks.length === 0 && !showAddForm" class="text-center py-12 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-xl mt-2">
            कोई खंड नहीं। ऊपर "+ खंड जोड़ें" पर क्लिक करें।
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { chaptersApi } from '@/api/chapters'
import Field from '@/components/admin/FormField.vue'
import BlockForm from '@/components/admin/BlockForm.vue'

const route = useRoute()
const router = useRouter()

const isNew = computed(() => route.name === 'admin-chapter-new')
const chapterId = ref<string | null>(null)

const loading = ref(true)
const saving = ref(false)
const addingSaving = ref(false)
const lastSaved = ref('')
const toast = ref<{ type: 'success' | 'error'; msg: string } | null>(null)
const activeTab = ref<'meta' | 'blocks'>('meta')
const showAddForm = ref(false)

const TABS = [
  { key: 'meta' as const, label: 'मेटाडेटा' },
  { key: 'blocks' as const, label: 'खंड' },
]

// ── Metadata form ────────────────────────────────────────────────────────────
const meta = ref({
  number: 1,
  title_hi: '',
  title_en: '',
  summary_hi: '',
  summary_en: '',
  order: 1,
  is_published: false,
})

// ── Block state types ────────────────────────────────────────────────────────
export interface BlockFormData {
  type: string
  section_title_hi: string
  section_title_en: string
  title_hi: string
  title_en: string
  content_hi: string
  content_en: string
  sanskrit_verses_raw: string
  questions: { hi: string; en: string }[]
  is_parable: boolean
}

interface BlockState {
  _id: string
  _open: boolean
  _saving: boolean
  type: string
  order: number
  _form: BlockFormData
}

const blocks = ref<BlockState[]>([])

// ── Empty form factory ────────────────────────────────────────────────────────
function emptyForm(): BlockFormData {
  return {
    type: 'explanation',
    section_title_hi: '',
    section_title_en: '',
    title_hi: '',
    title_en: '',
    content_hi: '',
    content_en: '',
    sanskrit_verses_raw: '',
    questions: [],
    is_parable: false,
  }
}

const addForm = ref<BlockFormData>(emptyForm())

function openAddForm() {
  addForm.value = emptyForm()
  showAddForm.value = true
}

// ── Convert API block → state ─────────────────────────────────────────────────
function toState(b: any): BlockState {
  const versesRaw = (b.metadata?.sanskrit_verses || [])
    .sort((a: any, c: any) => a.order - c.order)
    .map((v: any) => `${v.ref}|||${v.verse}`)
    .join('\n')

  return {
    _id: b._id,
    _open: false,
    _saving: false,
    type: b.type,
    order: b.order,
    _form: {
      type: b.type,
      section_title_hi: b.section_title?.hi || '',
      section_title_en: b.section_title?.en || '',
      title_hi: b.title?.hi || '',
      title_en: b.title?.en || '',
      content_hi: b.content?.hi || '',
      content_en: b.content?.en || '',
      sanskrit_verses_raw: versesRaw,
      questions: (b.metadata?.questions || []).map((q: any) => ({ hi: q.hi || '', en: q.en || '' })),
      is_parable: b.metadata?.is_parable || false,
    },
  }
}

// ── Convert form → API payload ────────────────────────────────────────────────
function toPayload(form: BlockFormData, order: number): Record<string, unknown> {
  const sanskrit_verses = form.type === 'shloka_group'
    ? form.sanskrit_verses_raw.split('\n').flatMap((line, i) => {
        const sep = line.indexOf('|||')
        if (sep < 0) return []
        const ref = line.slice(0, sep).trim()
        const verse = line.slice(sep + 3).trim()
        if (!ref || !verse) return []
        return [{ ref, verse, order: i + 1 }]
      })
    : []

  const questions = form.type === 'discussion'
    ? form.questions.filter(q => q.hi.trim()).map((q, i) => ({ ...q, order: i + 1 }))
    : []

  return {
    type: form.type,
    order,
    section_title: { hi: form.section_title_hi, en: form.section_title_en },
    title: { hi: form.title_hi, en: form.title_en },
    content: { hi: form.content_hi, en: form.content_en },
    metadata: {
      sanskrit_verses,
      shloka_refs: sanskrit_verses.map(v => v.ref),
      questions,
      is_parable: form.is_parable,
    },
  }
}

// ── Load chapter ──────────────────────────────────────────────────────────────
onMounted(async () => {
  if (isNew.value) {
    loading.value = false
    return
  }
  chapterId.value = route.params.id as string
  try {
    const { data } = await chaptersApi.adminGetById(chapterId.value)
    const ch = data.data.chapter
    meta.value = {
      number: ch.number,
      title_hi: ch.title?.hi || '',
      title_en: ch.title?.en || '',
      summary_hi: ch.summary?.hi || '',
      summary_en: ch.summary?.en || '',
      order: ch.order,
      is_published: ch.is_published,
    }
    blocks.value = (data.data.contentBlocks || []).map(toState)
  } catch (e: any) {
    showToast('error', e.response?.data?.message || 'पाठ लोड नहीं हो सका।')
  } finally {
    loading.value = false
  }
})

// ── Save metadata ─────────────────────────────────────────────────────────────
async function saveMeta() {
  saving.value = true
  try {
    const payload = {
      number: meta.value.number,
      title: { hi: meta.value.title_hi, en: meta.value.title_en },
      summary: { hi: meta.value.summary_hi, en: meta.value.summary_en },
      order: meta.value.order,
      is_published: meta.value.is_published,
    }
    if (isNew.value) {
      const { data } = await chaptersApi.adminCreate(payload)
      chapterId.value = data.data.chapter._id
      showToast('success', 'पाठ बनाया गया!')
      await router.replace({ name: 'admin-chapter-edit', params: { id: chapterId.value } })
    } else {
      await chaptersApi.adminUpdate(chapterId.value!, payload)
      lastSaved.value = `सहेजा: ${new Date().toLocaleTimeString('hi-IN')}`
      showToast('success', 'परिवर्तन सहेजे गए!')
    }
  } catch (e: any) {
    showToast('error', e.response?.data?.message || 'सहेजना विफल।')
  } finally {
    saving.value = false
  }
}

// ── Add block ─────────────────────────────────────────────────────────────────
async function addBlock() {
  if (!chapterId.value) return
  addingSaving.value = true
  try {
    const payload = toPayload(addForm.value, blocks.value.length + 1)
    const { data } = await chaptersApi.adminAddBlock(chapterId.value, payload)
    blocks.value.push(toState(data.data.block))
    showAddForm.value = false
    showToast('success', 'खंड जोड़ा गया!')
  } catch (e: any) {
    showToast('error', e.response?.data?.message || 'खंड जोड़ना विफल।')
  } finally {
    addingSaving.value = false
  }
}

// ── Update block ──────────────────────────────────────────────────────────────
async function updateBlock(block: BlockState) {
  if (!chapterId.value) return
  block._saving = true
  try {
    const payload = toPayload(block._form, block.order)
    const { data } = await chaptersApi.adminUpdateBlock(chapterId.value, block._id, payload)
    const refreshed = toState(data.data.block)
    block.type = refreshed.type
    block._form = refreshed._form
    block._open = false
    showToast('success', 'खंड सहेजा गया!')
  } catch (e: any) {
    showToast('error', e.response?.data?.message || 'सहेजना विफल।')
  } finally {
    block._saving = false
  }
}

// ── Delete block ──────────────────────────────────────────────────────────────
async function deleteBlock(blockId: string) {
  if (!chapterId.value || !confirm('इस खंड को हटाएं?')) return
  try {
    await chaptersApi.adminDeleteBlock(chapterId.value, blockId)
    blocks.value = blocks.value.filter(b => b._id !== blockId)
    blocks.value.forEach((b, i) => { b.order = i + 1 })
    showToast('success', 'खंड हटाया गया!')
  } catch (e: any) {
    showToast('error', e.response?.data?.message || 'हटाना विफल।')
  }
}

// ── Reorder block ─────────────────────────────────────────────────────────────
async function moveBlock(idx: number, dir: -1 | 1) {
  const swapIdx = idx + dir
  if (swapIdx < 0 || swapIdx >= blocks.value.length) return
  ;[blocks.value[idx], blocks.value[swapIdx]] = [blocks.value[swapIdx]!, blocks.value[idx]!]
  blocks.value.forEach((b, i) => { b.order = i + 1 })
  if (!chapterId.value) return
  try {
    await chaptersApi.adminReorderBlocks(chapterId.value, blocks.value.map((b, i) => ({ id: b._id, order: i + 1 })))
  } catch {
    showToast('error', 'क्रम परिवर्तन विफल।')
  }
}

// ── UI helpers ────────────────────────────────────────────────────────────────
function blockPreview(block: BlockState): string {
  if (block._form.section_title_hi) return `[${block._form.section_title_hi}]`
  if (block._form.title_hi) return block._form.title_hi
  if (block._form.content_hi) return block._form.content_hi.slice(0, 70)
  if (block._form.sanskrit_verses_raw) {
    const first = block._form.sanskrit_verses_raw.split('\n')[0] || ''
    return first.split('|||')[1]?.slice(0, 60) || first.slice(0, 60)
  }
  return '(रिक्त)'
}

const TYPE_LABELS: Record<string, string> = {
  shloka_group: 'श्लोक', prasang: 'प्रसंग', tatparya: 'तात्पर्य',
  explanation: 'विवरण', story: 'कथा', discussion: 'चर्चा',
}
const TYPE_COLORS: Record<string, string> = {
  shloka_group: 'bg-saffron-100 text-saffron-800',
  prasang: 'bg-blue-100 text-blue-800',
  tatparya: 'bg-purple-100 text-purple-800',
  explanation: 'bg-gray-100 text-gray-700',
  story: 'bg-green-100 text-green-800',
  discussion: 'bg-orange-100 text-orange-800',
}
function typeLabel(t: string) { return TYPE_LABELS[t] || t }
function typeColor(t: string) { return TYPE_COLORS[t] || 'bg-gray-100 text-gray-600' }

function showToast(type: 'success' | 'error', msg: string) {
  toast.value = { type, msg }
  setTimeout(() => { toast.value = null }, 3000)
}
</script>

<style scoped>
@reference "tailwindcss";
.field-input {
  @apply w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white
    focus:outline-none focus:ring-2 focus:border-transparent transition-shadow;
}
</style>
