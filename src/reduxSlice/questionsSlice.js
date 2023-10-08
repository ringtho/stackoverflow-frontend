import { createSlice } from "@reduxjs/toolkit";

export const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: [],
    question: {},
    answers: []
  },
  reducers: {
    addQuestions: (state, action) => {
      state.questions = action.payload
    },
    addQuestion: (state, action) => {
      state.question = action.payload
    },
    addAnswers: (state, action) => {
      state.answers = action.payload
    },
  },
})

export const { addQuestions, addQuestion, addAnswers } = questionsSlice.actions
export default questionsSlice.reducer