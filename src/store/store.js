import { configureStore } from "@reduxjs/toolkit";
import questionsReducer from '../reduxSlice/questionsSlice'

export default configureStore({
    reducer: {
        questions: questionsReducer
    }
})