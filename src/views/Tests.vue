<script setup lang="ts">
import Quiz from '@/components/Quiz/Quiz.vue'
import { useQuizStore } from '@/stores/quiz'
import { onMounted } from 'vue'

const quizStore = useQuizStore()

onMounted(() => {
  quizStore.getQuestions()
})
</script>

<template>
  <h1>Тест на знание основ Vue JS</h1>
  <Quiz />
</template>

<style scoped></style>
