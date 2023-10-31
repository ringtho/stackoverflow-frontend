import './Question.scss'
import { useNavigate } from 'react-router-dom'
import { addQuestion, setDeleteActive, setEditActive } from '../../reduxSlice/questionsSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'


const Question = ({ question, user }) => {
  const {_id: id, title, description, posted_by: postedBy, createdAt, answers, createdBy } = question
  const dispatch = useDispatch()
  const navigate = useNavigate()
  dayjs.extend(relativeTime)

  const handleClick = () => {
    navigate(`${id}`)
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
          <p>{answers.length} {answers.length === 1 ? 'answer' : 'answers'}</p>
        </div>
        <div className="question__username">
          <small>
            <Link to={`/profile/${postedBy?._id}`}>
              <p>{postedBy?.name}</p>
            </Link>
          </small>
          <span>||</span>
          <small>asked {dayjs(createdAt).fromNow()}</small>
        </div>
      </div>
      { (user._id === createdBy) && (
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
      </div>)}
    </section>
  )
}

Question.propTypes = {
  question: PropTypes.object,
  user: PropTypes.object
}

export default Question
