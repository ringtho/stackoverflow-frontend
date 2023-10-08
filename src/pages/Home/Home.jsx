import { useEffect } from "react"
import Questions from "../../components/Questions/Questions"
import { getQuestions } from "../../api"
import { useDispatch, useSelector } from "react-redux"
import { addQuestions, setAskActive } from "../../reduxSlice/questionsSlice"
import './Home.scss'
import EditQuestion from "../../components/EditQuestion/EditQuestion"
import AskQuestion from "../../components/AskQuestion/AskQuestion"
import DeleteQuestion from "../../components/DeleteQuestion/DeleteQuestion"

const Home = () => {
  const dispatch = useDispatch()
  const { isEditActive, isAskActive, isDeleteActive } = useSelector(state => state.questions)

  useEffect (() => {
    const questions = async () => {
      try {
        const { data : { questions } } = await getQuestions()
        dispatch(addQuestions(questions))
      } catch (error) {
        console.log(error)
      }
    }
    questions()
  }, [])

  return (
    <section className="home__container">
      <div className="home__controls">
        <h1>Questions</h1>
        <button
          className="submit-button"
          onClick={() => dispatch(setAskActive())}
        >
          Ask Question
        </button>
      </div>
      <Questions />
      {isEditActive && <EditQuestion />}
      {isAskActive && <AskQuestion />}
      {isDeleteActive && <DeleteQuestion />}
    </section>
  )
}

export default Home
