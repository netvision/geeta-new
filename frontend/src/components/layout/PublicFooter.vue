<template>
  <footer class="bg-earth-800 text-ivory-300 py-10 mt-16">
    <div class="container mx-auto max-w-6xl px-4">
      <div class="flex flex-col md:flex-row justify-between gap-8">
        <!-- Brand -->
        <div>
          <div class="text-2xl text-saffron-300 mb-2" style="font-family: var(--font-devanagari)">
            गीता पाठ
          </div>
          <p class="text-sm text-ivory-400 max-w-xs">
            भगवद्गीता के ३० पाठों की संरचित यात्रा, विद्यालयों के लिए।
          </p>
        </div>

        <!-- Links -->
        <div class="flex gap-12">
          <div>
            <h4 class="text-ivory-200 font-semibold mb-3 text-sm uppercase tracking-wider">पोर्टल</h4>
            <ul class="space-y-2">
              <li><RouterLink to="/chapters" class="text-sm hover:text-saffron-300 transition-colors">पाठ सूची</RouterLink></li>
              <li><RouterLink to="/pricing" class="text-sm hover:text-saffron-300 transition-colors">योजनाएँ</RouterLink></li>
              <li><RouterLink to="/about" class="text-sm hover:text-saffron-300 transition-colors">हमारे बारे में</RouterLink></li>
            </ul>
          </div>
          <div>
            <h4 class="text-ivory-200 font-semibold mb-3 text-sm uppercase tracking-wider">खाता</h4>
            <ul class="space-y-2">
              <li><RouterLink to="/login" class="text-sm hover:text-saffron-300 transition-colors">लॉगिन</RouterLink></li>
              <li><RouterLink to="/register" class="text-sm hover:text-saffron-300 transition-colors">पंजीकरण</RouterLink></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-8 pt-6 border-t border-earth-700 text-center text-xs text-ivory-400">
        <p>॥ सर्वे भवन्तु सुखिनः ॥ &nbsp;·&nbsp; © {{ year }} गीता पाठ पोर्टल</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
const year = new Date().getFullYear()
</script>
