import { configureStore } from "@reduxjs/toolkit";
import questionsReducer from '../reduxSlice/questionsSlice'
import answersReducer from "../reduxSlice/answersSlice";

export default configureStore({
    reducer: {
        questions: questionsReducer,
        answers: answersReducer
    }
})