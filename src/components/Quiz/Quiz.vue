<script setup lang="ts">
import { computed, Ref, ref } from 'vue'
import { Answer } from '@/models/questions.models'
import { useQuizStore } from '@/stores/quiz'

import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

const quizStore = useQuizStore()

const a: Ref<number> = ref(0)
const b: Ref<number> = ref(1)
const score: Ref<number> = ref(0)
const quiz: Ref<boolean> = ref(true)
const select: Ref<boolean> = ref(false)
const resultsShow: Ref<boolean> = ref(false)
const resultsClickedAn: Ref<string[]> = ref([])

const selectAnswer = (awr: Answer): void => {
  select.value = true
  resultsClickedAn.value.push(quizStore.questions[a.value].question)
  resultsClickedAn.value.push(awr.text)

  if (awr.correct) {
    score.value++
    resultsClickedAn.value.push('Correct')
  } else {
    resultsClickedAn.value.push('Incorrect')
  }
}

const checkAnswer = (status: Answer): string => {
  if (status.correct) {
    return 'correct'
  } else {
    return 'wrong'
  }
}

const nextQuestion = (): void => {
  if (quizStore.questions.length - 1 == a.value) {
    quiz.value = false
  } else {
    a.value++
    b.value++
    select.value = false
  }
}

const restartQuiz = (): void => {
  resultsClickedAn.value = []
  quiz.value = true
  select.value = false
  a.value = 0
  b.value = 1
  score.value = 0
}

const showAnswers = (): void => {
  resultsShow.value = !resultsShow.value
}

const btnAnswers = computed(() => {
  if (resultsShow.value) {
    return 'Скрыть ответы'
  }

  return 'Показать ответы'
})
</script>

<template>
  <clip-loader
    :class="$style.loading"
    :loading="quizStore.loading"
  ></clip-loader>
  <div v-if="!quizStore.loading">
    <div :class="$style.quiz">
      <div v-if="quiz">
        <div :class="$style.numQuestion">
          Задания: <span>{{ b }}</span> |
          {{ quizStore.questions.length }}
        </div>
        <div
          v-for="(question, index) in quizStore.questions.slice(a, b)"
          :key="`question-${index}`"
        >
          <div :class="$style.question">{{ question.question }}</div>
          <ul>
            <li
              v-for="(answer, index) in question.answers"
              :key="`answer-${index}`"
              :class="[
                $style.answers,
                select ? $style[checkAnswer(answer)] : '',
              ]"
              @click="selectAnswer(answer)"
            >
              {{ answer.text }}
            </li>
          </ul>
        </div>
      </div>

      <div v-if="!quiz">
        <div :class="$style.score">
          <div>Результат</div>
          <div>{{ score }}/{{ quizStore.questions.length }}</div>
        </div>

        <div :class="$style.center">
          <button :class="$style.quizBtn" @click="showAnswers">
            {{ btnAnswers }}
          </button>
          <button :class="[$style.quizBtn, $style.ml]" @click="restartQuiz">
            Начать заново
          </button>
        </div>
        <div
          v-for="(question, index) in quizStore.questions"
          :key="`question-${index}`"
          v-if="resultsShow"
        >
          <div :class="$style.question">{{ question.question }}</div>
          <div>
            <ul>
              <li
                v-for="(answer, index) in question.answers"
                :key="`answer-${index}`"
                :class="[
                  $style.answers,
                  select ? $style[checkAnswer(answer)] : '',
                ]"
              >
                {{ answer.text }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div v-if="quiz" :class="$style.center">
        <button
          :class="$style.quizBtn"
          @click="nextQuestion"
          :disabled="!select"
        >
          Следующий вопрос
        </button>
      </div>
    </div>
  </div>
</template>

<style module>
@import './quiz.module.scss';
</style>
