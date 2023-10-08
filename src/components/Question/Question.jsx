import './Question.scss'
import { useNavigate } from 'react-router-dom'
import { addQuestion, setDeleteActive, setEditActive } from '../../reduxSlice/questionsSlice'
import { useDispatch } from 'react-redux'

const Question = (question) => {
  const {_id: id, title, description } = question
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`${id}`)
  }
  return (
    <section className="question__container">
      <h3 onClick={handleClick}>{title}</h3>
      <p>{description}</p>
      <div className="question__controls">
        <div className="control__container edit">
          <i
            className="fa-solid fa-pen-to-square"
            onClick={() => {
              dispatch(setEditActive())
              dispatch(addQuestion(question))
            }}
          ></i>
        </div>
        <div
          className="control__container delete"
          onClick={() => {
            dispatch(setDeleteActive())
            dispatch(addQuestion(question))
          }}
        >
          <i className="fa-solid fa-trash"></i>
        </div>
      </div>
    </section>
  )
}

export default Question
