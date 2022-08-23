import { defineStore } from 'pinia'
import { Questions, Response } from '@/models/questions.models'
import { db, doc, getDoc } from '@/configs/firebase'

interface QuizState {
  questions: Questions[]
  loading: boolean
}

export const useQuizStore = defineStore('quiz', {
  state: (): QuizState => ({
    questions: [],
    loading: false,
  }),
  actions: {
    async getQuestions(): Promise<void> {
      try {
        this.loading = true

        const docRef = doc(db, 'vuniverse/questions')
        const docSnap = await getDoc(docRef)
        const datas = docSnap.data() as Response | undefined

        this.questions = datas ? Object.values(datas) : []

        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
  },
})
