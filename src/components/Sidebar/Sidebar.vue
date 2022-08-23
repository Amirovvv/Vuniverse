<script setup lang="ts">
import { ref } from 'vue'
import { Section } from '@/models/sections.models'

const sections = ref<Section[]>([
  {
    title: 'Тесты',
    items: [{ title: 'Тест на знание основ Vue JS', url: '/tests' }],
  },
  {
    title: 'Полезные ссылки',
    items: [
      { title: '--', url: '--' },
      { title: '--', url: '--' },
    ],
  },
])
</script>

<template>
  <aside :class="$style.sidebar">
    <nav class="nav">
      <section
        :class="$style.section"
        v-for="(section, index) in sections"
        :key="`section-${index}`"
      >
        <div :class="$style.sectionTitle">{{ section.title }}</div>
        <div
          :class="$style.sectionLink"
          v-for="(item, index) in section.items"
          :key="`item-${index}`"
        >
          <router-link :to="item.url" :active-class="$style.sectionLinkActive">
            {{ item.title }}
          </router-link>
        </div>
      </section>
    </nav>
  </aside>
</template>

<style module>
@import './sidebar.module.scss';
</style>
