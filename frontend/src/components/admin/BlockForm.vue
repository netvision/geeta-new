<template>
  <div class="space-y-3">
    <!-- Type selector -->
    <Field label="प्रकार">
      <select v-model="form.type" class="field-input">
        <option value="shloka_group">श्लोक-समूह (Shloka Group)</option>
        <option value="prasang">प्रसंग (Context)</option>
        <option value="tatparya">तात्पर्य (Essence)</option>
        <option value="explanation">विवरण (Explanation)</option>
        <option value="story">कथा (Story)</option>
        <option value="discussion">चर्चा (Discussion)</option>
      </select>
    </Field>

    <!-- Section title -->
    <div class="grid grid-cols-2 gap-3">
      <Field label="अनुभाग शीर्षक (हिन्दी)">
        <input v-model="form.section_title_hi" class="field-input" placeholder="वैकल्पिक — नया अनुभाग शुरू करता है" />
      </Field>
      <Field label="Section Title (English)">
        <input v-model="form.section_title_en" class="field-input" placeholder="optional" />
      </Field>
    </div>

    <!-- Title (for non-shloka, non-discussion types) -->
    <div class="grid grid-cols-2 gap-3">
      <Field label="शीर्षक (हिन्दी)">
        <input v-model="form.title_hi" class="field-input" />
      </Field>
      <Field label="Title (English)">
        <input v-model="form.title_en" class="field-input" placeholder="optional" />
      </Field>
    </div>

    <!-- Shloka group: raw verse entry -->
    <template v-if="form.type === 'shloka_group'">
      <Field label="संस्कृत श्लोक — प्रत्येक पंक्ति: सन्दर्भ|||श्लोक">
        <div class="text-xs text-gray-400 mb-1">उदाहरण: 2.47|||कर्मण्येवाधिकारस्ते…</div>
        <textarea
          v-model="form.sanskrit_verses_raw"
          rows="8"
          class="field-input resize-y font-mono text-xs leading-loose"
          placeholder="2.47|||कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\n2.48|||योगस्थः कुरु कर्माणि…"
        />
      </Field>
    </template>

    <!-- Content (all types except discussion) -->
    <template v-if="form.type !== 'discussion'">
      <div class="grid grid-cols-2 gap-3">
        <Field label="सामग्री (हिन्दी)">
          <textarea v-model="form.content_hi" rows="5" class="field-input resize-y" style="font-family: var(--font-devanagari)" />
        </Field>
        <Field label="Content (English)">
          <textarea v-model="form.content_en" rows="5" class="field-input resize-y" placeholder="optional" />
        </Field>
      </div>
      <div v-if="form.type === 'story'" class="flex items-center gap-2">
        <input type="checkbox" v-model="form.is_parable" id="is_parable" class="w-4 h-4 accent-saffron-600" />
        <label for="is_parable" class="text-sm text-gray-600 cursor-pointer">यह दृष्टान्त-कथा है (Parable)</label>
      </div>
    </template>

    <!-- Discussion questions -->
    <template v-if="form.type === 'discussion'">
      <Field label="चर्चा प्रश्न">
        <div class="space-y-2">
          <div v-for="(q, qi) in form.questions" :key="qi" class="flex gap-2">
            <div class="flex-1 space-y-1">
              <input
                v-model="form.questions[qi].hi"
                class="field-input"
                :placeholder="`प्रश्न ${qi + 1} (हिन्दी)`"
              />
              <input
                v-model="form.questions[qi].en"
                class="field-input text-xs"
                :placeholder="`Question ${qi + 1} (English, optional)`"
              />
            </div>
            <button @click="form.questions.splice(qi, 1)" class="text-red-400 hover:text-red-600 px-1 self-start mt-1">✕</button>
          </div>
          <button
            @click="form.questions.push({ hi: '', en: '' })"
            class="text-xs text-indigo-600 hover:text-indigo-800 mt-1"
          >
            + प्रश्न जोड़ें
          </button>
        </div>
      </Field>
    </template>

    <!-- Actions -->
    <div class="flex items-center gap-3 pt-2 border-t border-gray-100">
      <button
        @click="$emit('save')"
        :disabled="saving"
        class="px-4 py-2 bg-saffron-600 text-white text-sm font-medium rounded-lg hover:bg-saffron-700 disabled:opacity-50 transition-colors"
      >
        {{ saving ? 'सहेज रहे हैं...' : saveLabel }}
      </button>
      <button @click="$emit('cancel')" class="text-sm text-gray-500 hover:text-gray-700">
        रद्द करें
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Field from './FormField.vue'

defineProps<{
  form: any
  saving: boolean
  saveLabel?: string
}>()

defineEmits<{
  save: []
  cancel: []
}>()
</script>

<style scoped>
@reference "tailwindcss";
.field-input {
  @apply w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white
    focus:outline-none focus:ring-2 focus:border-transparent transition-shadow;
}
</style>
