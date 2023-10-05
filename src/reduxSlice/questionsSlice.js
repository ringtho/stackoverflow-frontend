import { createSlice } from "@reduxjs/toolkit";

export const questionsSlice = createSlice({
    name: 'questions',
    initialState: {
        questions: []
    },
    reducers: {
        addQuestions: (state, action) => {
            state.questions = action.payload
        }
    }
})

export const { addQuestions } = questionsSlice.actions
export default questionsSlice.reducer