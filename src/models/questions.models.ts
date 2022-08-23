export interface Answer {
  text: string
  correct?: boolean
}

export interface Questions {
  question: string
  answers: Answer[]
}

export interface Response {
  [key: string | number]: Questions
}
