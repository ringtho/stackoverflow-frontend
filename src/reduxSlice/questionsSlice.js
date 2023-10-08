import { createSlice } from "@reduxjs/toolkit";

export const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: [],
    question: {},
    answers: [],
    isAskActive: false,
    isEditActive: false,
    isDeleteActive: false,
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
    setEditActive: (state) => {
      state.isEditActive = !state.isEditActive
    },
    setAskActive: (state) => {
      state.isAskActive = !state.isAskActive
    },
    setDeleteActive: (state) => {
      state.isDeleteActive = !state.isDeleteActive
    },
  },
})

export const { 
  addQuestions, 
  addQuestion, 
  addAnswers, 
  setDeleteActive, 
  setEditActive ,
  setAskActive
} = questionsSlice.actions
export default questionsSlice.reducer