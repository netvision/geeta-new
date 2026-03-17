<template>
  <div class="overflow-x-hidden">

    <!-- ── Hero ──────────────────────────────────────────────────────────────── -->
    <section class="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-deep-900 via-[#1a1560] to-earth-800 text-white px-4">

      <!-- Floating decorative orbs -->
      <div class="absolute top-16 left-[8%] w-72 h-72 rounded-full bg-saffron-500/10 blur-3xl pointer-events-none animate-pulse" style="animation-duration:5s"/>
      <div class="absolute bottom-20 right-[6%] w-96 h-96 rounded-full bg-gold-500/8 blur-3xl pointer-events-none animate-pulse" style="animation-duration:7s"/>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-indigo-deep-600/5 blur-3xl pointer-events-none"/>

      <!-- Large Sanskrit OM watermark -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span class="text-[28rem] font-bold text-white/[0.025]" style="font-family:var(--font-devanagari)">ॐ</span>
      </div>

      <!-- Subtle grid pattern -->
      <div class="absolute inset-0 pointer-events-none" style="background-image:radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px); background-size:40px 40px;"/>

      <div class="relative container mx-auto max-w-4xl text-center z-10 py-24">

        <!-- Eyebrow -->
        <div class="inline-flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
          <span class="w-1.5 h-1.5 rounded-full bg-saffron-400 animate-pulse"/>
          <p class="text-saffron-300 text-sm tracking-widest" style="font-family:var(--font-devanagari)">
            ॥ श्रीमद्भगवद्गीता ॥
          </p>
        </div>

        <!-- Main headline -->
        <h1 class="text-6xl md:text-8xl font-bold mb-4 leading-none tracking-tight" style="font-family:var(--font-devanagari)">
          गीता पाठ
        </h1>
        <p class="text-indigo-deep-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          भगवद्गीता पर आधारित संरचित यात्रा — संस्कार, विवेक और जीवन-दर्शन
        </p>

        <!-- Featured shloka card -->
        <div class="relative max-w-xl mx-auto mb-12 group">
          <div class="absolute -inset-0.5 bg-gradient-to-r from-saffron-500 to-gold-400 rounded-2xl opacity-30 group-hover:opacity-50 blur-sm transition-opacity"/>
          <div class="relative bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl px-8 py-7">
            <div class="text-saffron-300/60 text-3xl leading-none mb-3" style="font-family:var(--font-devanagari)">॥</div>
            <template v-if="chaptersLoading">
              <div class="animate-pulse space-y-2">
                <div class="h-5 bg-white/10 rounded w-4/5 mx-auto"/>
                <div class="h-5 bg-white/10 rounded w-3/4 mx-auto"/>
              </div>
            </template>
            <template v-else>
              <p class="shloka whitespace-pre-line" style="font-family: 'Noto Sans Devanagari', sans-serif; color: rgba(253,253,248,0.95)">
                {{ featuredShloka?.verse || 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि।।' }}
              </p>
              <p class="text-xs text-saffron-300/80 mt-3 tracking-wider">
                — गीता {{ featuredShloka?.ref || '२.४७' }}
              </p>
            </template>
          </div>
        </div>

        <!-- CTAs -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink
            to="/chapters"
            class="inline-flex items-center gap-2 bg-saffron-500 hover:bg-saffron-400 text-white px-8 py-3.5 rounded-xl font-bold text-base transition-all hover:shadow-xl hover:shadow-saffron-500/30 hover:-translate-y-0.5"
          >
            पाठ शुरू करें
            <span class="text-lg">→</span>
          </RouterLink>
          <RouterLink
            to="/register"
            class="inline-flex items-center gap-2 border border-white/25 text-white hover:bg-white/10 px-8 py-3.5 rounded-xl font-semibold text-base transition-all backdrop-blur-sm hover:-translate-y-0.5"
          >
            निःशुल्क जुड़ें
          </RouterLink>
        </div>

        <!-- Scroll hint -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 text-xs">
          <span style="font-family:var(--font-devanagari)">नीचे देखें</span>
          <span class="text-lg animate-bounce">↓</span>
        </div>
      </div>
    </section>

    <!-- ── Stats strip ────────────────────────────────────────────────────────── -->
    <section class="bg-earth-800 text-ivory-200 py-4">
      <div class="container mx-auto max-w-4xl px-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-sm">
        <span class="flex items-center gap-2">
          <span class="text-saffron-400 font-bold text-lg">∞</span>
          <span class="text-ivory-400">जीवन में उपयोग</span>
        </span>
      </div>
    </section>

    <!-- ── Chapter showcase ───────────────────────────────────────────────────── -->
    <section class="py-24 px-4 bg-ivory-100">
      <div class="container mx-auto max-w-6xl">

        <!-- Section header -->
        <div class="text-center mb-14">
          <p class="text-saffron-600 text-xs font-bold uppercase tracking-widest mb-3">पाठ-यात्रा</p>
          <h2 class="text-4xl md:text-5xl font-bold text-earth-800 mb-4" style="font-family:var(--font-devanagari)">
            पाठ-यात्रा
          </h2>
          <p class="text-earth-600 max-w-xl mx-auto text-base leading-relaxed">
            प्रत्येक पाठ एक दार्शनिक अवधारणा — शत्रु के रूप में मन से समता तक की यात्रा
          </p>
        </div>

        <!-- Loading skeleton -->
        <div v-if="chaptersLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="n in 5" :key="n" class="h-64 bg-ivory-300 rounded-2xl animate-pulse"/>
        </div>

        <!-- Illustrated chapter cards -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ChapterCard
            v-for="chapter in chapters"
            :key="chapter.id"
            :chapter="chapter"
          />
        </div>

        <div class="text-center mt-12">
          <RouterLink
            to="/chapters"
            class="inline-flex items-center gap-2 bg-white border border-saffron-300 text-saffron-700 hover:bg-saffron-50 px-7 py-3 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md transition-all"
          >
            सभी पाठ देखें →
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ── Features ───────────────────────────────────────────────────────────── -->
    <section class="py-24 px-4 bg-ivory-200">
      <div class="container mx-auto max-w-5xl">
        <div class="text-center mb-14">
          <p class="text-saffron-600 text-xs font-bold uppercase tracking-widest mb-3">क्या मिलेगा?</p>
          <h2 class="text-4xl font-bold text-earth-800" style="font-family:var(--font-devanagari)">
            इस पाठ्यक्रम में
          </h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="f in features"
            :key="f.title"
            class="bg-white rounded-2xl p-7 shadow-sm hover:shadow-lg border border-ivory-300 hover:border-saffron-200 transition-all group"
          >
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform"
                 :style="{ background: f.bg }">
              {{ f.icon }}
            </div>
            <h3 class="font-bold text-earth-800 mb-2 text-lg" style="font-family:var(--font-devanagari)">{{ f.title }}</h3>
            <p class="text-sm text-earth-600 leading-relaxed">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Insight quote (dynamic from DB) ───────────────────────────────────── -->
    <section v-if="featuredInsight" class="relative py-20 px-4 overflow-hidden" style="background:linear-gradient(135deg,#1e1b72 0%,#3e3014 100%)">
      <div class="absolute inset-0 pointer-events-none" style="background-image:radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px);background-size:32px 32px;"/>
      <div class="absolute top-0 right-0 w-96 h-96 rounded-full bg-saffron-500/8 blur-3xl pointer-events-none"/>
      <div class="relative container mx-auto max-w-3xl text-center z-10">
        <p class="text-saffron-400/70 text-3xl mb-4" style="font-family:var(--font-devanagari)">॥</p>
        <blockquote
          class="text-xl md:text-2xl font-semibold leading-relaxed text-ivory-100"
          style="font-family:var(--font-devanagari)"
        >
          "{{ featuredInsight }}"
        </blockquote>
        <p class="text-indigo-deep-300 text-sm mt-5">— पाठ {{ insightChapter }}</p>
      </div>
    </section>

    <!-- ── CTA ────────────────────────────────────────────────────────────────── -->
    <section class="py-24 px-4 bg-gradient-to-br from-saffron-50 to-gold-50">
      <div class="container mx-auto max-w-2xl text-center">
        <p class="text-saffron-600 text-xs font-bold uppercase tracking-widest mb-4">आज ही शुरू करें</p>
        <h2 class="text-4xl md:text-5xl font-bold text-earth-800 mb-5" style="font-family:var(--font-devanagari)">
          यात्रा में जुड़ें
        </h2>
        <p class="text-earth-700 mb-10 text-base max-w-lg mx-auto leading-relaxed">
          इस यात्रा में जुड़ें और जीवन की हर परिस्थिति में समता बनाए रखना सीखें।
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink
            to="/register"
            class="inline-flex items-center justify-center gap-2 bg-saffron-500 hover:bg-saffron-600 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-xl hover:shadow-saffron-500/25 hover:-translate-y-0.5"
          >
            निःशुल्क शुरू करें →
          </RouterLink>
          <RouterLink
            to="/chapters"
            class="inline-flex items-center justify-center gap-2 bg-white border border-earth-300 text-earth-700 hover:border-saffron-300 hover:text-saffron-700 px-10 py-4 rounded-xl font-semibold text-base transition-all hover:-translate-y-0.5 shadow-sm"
          >
            पाठ देखें
          </RouterLink>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { chaptersApi } from '@/api/chapters'
import ChapterCard from '@/components/chapter/ChapterCard.vue'

interface ChapterItem {
  id: string
  number: number
  title: string
  order: number
}

const chapters = ref<ChapterItem[]>([])
const chaptersLoading = ref(true)
const featuredShloka = ref<{ verse: string; ref: string } | null>(null)
const featuredInsight = ref<string | null>(null)
const insightChapter = ref<number>(1)


onMounted(async () => {
  try {
    const { data } = await chaptersApi.getAll()
    chapters.value = data.data.chapters
  } catch { /* silent — fallback shown */ } finally {
    chaptersLoading.value = false
  }

  // Pull featured shloka + tatparya from Ch 5 (Karma Yoga), fallback to Ch 1
  try {
    const target = chapters.value.find(c => c.number === 5)?.number
      ?? chapters.value[0]?.number
    if (!target) return
    const { data } = await chaptersApi.getByNumber(target)
    const blocks: any[] = data.data.contentBlocks || []

    const shlokaBlock = blocks.find(b => b.type === 'shloka_group')
    if (shlokaBlock?.metadata?.sanskrit_verses?.length) {
      const v = shlokaBlock.metadata.sanskrit_verses[0]
      featuredShloka.value = { verse: v.verse, ref: v.ref }
    }

    const tatparya = blocks.find(b => b.type === 'tatparya' && b.content?.trim())
    if (tatparya) {
      const full: string = tatparya.content.trim()
      const sentence = full.split(/[।\n]/)[0]?.trim() || ''
      featuredInsight.value = sentence.length > 10 ? sentence : full.slice(0, 130)
      insightChapter.value = target
    }
  } catch { /* silent */ }
})

const features = [
  {
    icon: '📖',
    title: 'संरचित पाठ्यक्रम',
    desc: 'प्रत्येक पाठ में श्लोक, प्रसंग, कहानी और चर्चा प्रश्न — एक पूर्ण अनुभव।',
    bg: '#fff8ee',
  },
  {
    icon: '🧘',
    title: 'जीवन-दर्शन',
    desc: 'हर पाठ का सीधा सम्बन्ध आपके जीवन की परिस्थितियों से — सिद्धान्त नहीं, अनुभव।',
    bg: '#f0fdf4',
  },
  {
    icon: '💬',
    title: 'चर्चा और अभ्यास',
    desc: 'प्रत्येक पाठ के अंत में चर्चा-प्रश्न — अपने जीवन से जोड़कर सोचने का अवसर।',
    bg: '#eef2ff',
  },
]
</script>
