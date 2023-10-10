import { configureStore } from "@reduxjs/toolkit";
import questionsReducer from '../reduxSlice/questionsSlice'
import answersReducer from "../reduxSlice/answersSlice";
import usersReducer from "../reduxSlice/usersSlice";

export default configureStore({
    reducer: {
        questions: questionsReducer,
        answers: answersReducer,
        user: usersReducer
    }
})