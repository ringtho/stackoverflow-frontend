import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getSingleQuestion } from "../../api"
import { useDispatch, useSelector } from "react-redux"
import { addAnswers, addQuestion, setDeleteActive, setEditActive } from "../../reduxSlice/questionsSlice"
import './QuestionDetail.scss'
import EditQuestion from "../../components/EditQuestion/EditQuestion"
import DeleteQuestion from "../../components/DeleteQuestion/DeleteQuestion"
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Answer from "../../components/Answer/Answer"
import AddAnswer from "../../components/AddAnswer/AddAnswer"

const QuestionDetail = () => {
  const { isEditActive, question, isDeleteActive } = useSelector(
    (state) => state.questions
  )
  console.log(question)
  dayjs.extend(relativeTime)
  const { title, description, createdAt, posted_by: postedBy, answers } = question
  const { id } = useParams()
  const dispatch = useDispatch()

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

  const handleClick = (action) => {
    if (action === 'edit') {
      dispatch(setEditActive())
    } else if (action === 'delete') {
      dispatch(setDeleteActive())
    }
  }

  console.log(answers)

  return (
    <div className="details__container">
      <div className="details__wrapper">
        <div className="details">
          <h3>{title}</h3>
          <p>{description}</p>
          <div className="details-controls">
            <button
              className="submit-button"
              onClick={() => handleClick('edit')}
            >
              Edit
            </button>
            <button
              className="cancel-button"
              onClick={() => handleClick('delete')}
            >
              Delete
            </button>
          </div>
        </div>
        <div className="username_details">
          <small>asked {dayjs(createdAt).fromNow()}</small>
          <div className="userdetails_container">
            <div className="initials___container">SR</div>
            <p>{postedBy?.name}</p>
          </div>
        </div>
        <div className="answers__container">
          {answers && answers.map((answer) => {
            return (
              <Answer key={answer._id} answer={answer} />
            )
          })}
        </div>
        <AddAnswer />
      </div>
      {isEditActive && <EditQuestion />}
      {isDeleteActive && <DeleteQuestion />}
    </div>
  )
}

export default QuestionDetail
