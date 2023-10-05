import { useEffect } from "react"
import Questions from "../../components/Questions/Questions"
import { getQuestions } from "../../api"
import { useDispatch } from "react-redux"
import { addQuestions } from "../../reduxSlice/questionsSlice"
import './Home.scss'
import { useNavigate } from "react-router-dom"

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
        <button onClick={() => navigate('/questions/ask')}>Ask Questions</button>
      </div>
      <Questions />
    </section>
  )
}

export default Home
