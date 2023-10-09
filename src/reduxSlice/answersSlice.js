import { createSlice } from "@reduxjs/toolkit";


export const answersSlice = createSlice({
    name: 'answers',
    initialState: {
        isEditAnswerActive: false,
        isDeleteAnswerActive: false,
        answer: {}
    },
    reducers: {
        addAnswer: (state, action) => {
            state.answer = action.payload
        },
        setEditAnswerActive: (state) => {
            state.isEditAnswerActive= !state.isEditAnswerActive
        },
        setDeleteAnswerActive: (state) => {
            state.isDeleteAnswerActive = !state.isDeleteAnswerActive
        }
    }
})

export const {
    setDeleteAnswerActive,
    setEditAnswerActive,
    addAnswer
} = answersSlice.actions

export default answersSlice.reducer