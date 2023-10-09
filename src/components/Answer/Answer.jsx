import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setDeleteAnswerActive, setEditAnswerActive } from '../../reduxSlice/answersSlice'
import { addAnswer } from '../../reduxSlice/answersSlice'

const Answer = ({ answer }) => {
  const { _id, answer: title, createdAt, posted_by: postedBy } = answer
  dayjs.extend(relativeTime)
  const dispatch = useDispatch()

  const handleClick = (action) => {
    if (action === 'edit') {
        dispatch(addAnswer({ answer }))
        dispatch(setEditAnswerActive())
    } else if (action === 'delete') {
        dispatch(addAnswer({ answer }))
        dispatch(setDeleteAnswerActive())
    }
  }

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
            onClick={() => handleClick('edit')}
          ></i>
        </div>
        <div
          className="control__container delete"
          onClick={() => {
            dispatch(() => handleClick('delete'))
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
