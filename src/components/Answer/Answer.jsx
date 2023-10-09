import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setDeleteActive, setEditActive } from '../../reduxSlice/questionsSlice'

const Answer = ({ answer }) => {
  const { _id, answer: title, createdAt, posted_by: postedBy } = answer
  dayjs.extend(relativeTime)
  const dispatch = useDispatch()
  console.log(answer)
  return (
    <div key={_id} className="answer__detail">
      <div className="userdetails_container answer__user">
        <div className="initials___container answer__initials">
          <small id="initials">SR</small>
        </div>
        <p>{postedBy?.name}</p>
        <small>answered {dayjs(createdAt).fromNow()}</small>
      </div>
      <p>{title}</p>
      <div className="question__controls">
        <div className="control__container edit">
          <i
            className="fa-solid fa-pen-to-square"
            onClick={() => {
              dispatch(setEditActive())
            }}
          ></i>
        </div>
        <div
          className="control__container delete"
          onClick={() => {
            dispatch(setDeleteActive())
          }}
        >
          <i className="fa-solid fa-trash"></i>
        </div>
      </div>
    </div>
  )
}

Answer.propTypes = {
    answer: PropTypes.object
}

export default Answer
