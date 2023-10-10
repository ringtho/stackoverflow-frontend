import './QuestionProfile.scss'
import { useNavigate } from 'react-router-dom'
import {
  addQuestion,
  setDeleteActive,
  setEditActive,
} from '../../reduxSlice/questionsSlice'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

const QuestionProfile = (question) => {

  const {
    _id: id,
    title,
    description,
    createdAt,
    answers,
  } = question
  const dispatch = useDispatch()
  const navigate = useNavigate()
  dayjs.extend(relativeTime)

  const handleClick = () => {
    navigate(`/${id}`)
  }  
  
  return (
    <section className="question__container">
      <div>
        <h3 onClick={handleClick}>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="user__details">
        <div
          className={answers.length > 0 ? 'answers answers__filled' : 'answers'}
        >
          <p>{answers.length} answers</p>
        </div>
        <div className="question__username">
          <small>asked {dayjs(createdAt).fromNow()}</small>
        </div>
      </div>
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

export default QuestionProfile