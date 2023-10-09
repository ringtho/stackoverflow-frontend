import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getSingleQuestion } from "../../api"
import { useDispatch, useSelector } from "react-redux"
import { addAnswers, addQuestion } from "../../reduxSlice/questionsSlice"
import './QuestionDetail.scss'

const QuestionDetail = () => {
  const { question, answers } = useSelector((state) => state.questions)
  const { title, description } = question
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const getQuestion = async () => {
      dispatch(addQuestion({}))
      dispatch(addAnswers([]))
      try {
        const { data } = await getSingleQuestion(id)
        dispatch(addQuestion(data.question))
        dispatch(addAnswers(data.answers))
      } catch (error) {
        console.log(error)
      }
    }
    getQuestion()
  }, [])

  const handleClick = () => {
    navigate(`edit`)
  }

  return (
    <div className="details__container">
      <div className="details__wrapper">
        <h4>{title}</h4>
        <p>{description}</p>
        <div className="details-controls">
          <button className="submit-button" onClick={handleClick}>Edit</button>
          <button className="cancel-button" onClick={handleClick}>Delete</button>
        </div>
      </div>
      {answers.length > 0 && (
        <div className="answers__container">
          {answers.map((answer, idx) => {
            return (
              <div key={idx} className="answer__wrapper">
                <p>{answer.answer}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default QuestionDetail
