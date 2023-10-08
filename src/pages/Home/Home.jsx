import { useEffect } from "react"
import Questions from "../../components/Questions/Questions"
import { getQuestions } from "../../api"
import { useDispatch, useSelector } from "react-redux"
import { addQuestions, setAskActive } from "../../reduxSlice/questionsSlice"
import './Home.scss'
// import { useNavigate } from "react-router-dom"
import EditQuestion from "../../components/EditQuestion/EditQuestion"
import AskQuestion from "../AskQuestion/AskQuestion"

const Home = () => {
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const { isEditActive, isAskActive } = useSelector(state => state.questions)

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
    </section>
  )
}

export default Home
