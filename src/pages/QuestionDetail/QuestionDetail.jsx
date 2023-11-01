import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getSingleQuestion } from "../../api"
import { useDispatch, useSelector } from "react-redux"
import { addAnswers, addQuestion, setDeleteActive, setEditActive, setLoading, setReload } from "../../reduxSlice/questionsSlice"
import './QuestionDetail.scss'
import EditQuestion from "../../components/EditQuestion/EditQuestion"
import DeleteQuestion from "../../components/DeleteQuestion/DeleteQuestion"
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Answer from "../../components/Answer/Answer"
import AddAnswer from "../../components/AddAnswer/AddAnswer"
import EditAnswer from "../../components/EditAnswer/EditAnswer"
import DeleteAnswer from "../../components/DeleteAnswer/DeleteAnswer"
import Loading from '../../components/Loading/Loading'

const QuestionDetail = () => {
  const { isEditActive, question, isDeleteActive, isLoading, reload } = useSelector(
    (state) => state.questions
  )
  const { 
    isEditAnswerActive, 
    isDeleteAnswerActive 
  } = useSelector((state) => state.answers)
  const { user } = useSelector((state) => state.user)
  dayjs.extend(relativeTime)
  const { title, description, createdAt, posted_by: postedBy, answers, createdBy } = question
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    const getQuestion = async () => {
      dispatch(addQuestion({}))
      dispatch(addAnswers([]))
      dispatch(setLoading(true))
      dispatch(setReload(false))
      try {
        const { data } = await getSingleQuestion(id)
        dispatch(addQuestion(data.question))
        dispatch(addAnswers(data.answers))
        dispatch(setLoading(false))
      } catch (error) {
        console.log(error)
      }
    }
    getQuestion()
  }, [dispatch, id, reload])

  const handleClick = (action) => {
    if (action === 'edit') {
      dispatch(setEditActive())
    } else if (action === 'delete') {
      dispatch(setDeleteActive())
    }
  }

  return (
    <div className="details__container">
      {isLoading && !reload ? <Loading />
      : <div className="details__wrapper">
        <div className="details">
          <h3>{title}</h3>
          <p>{description}</p>
          { user._id === createdBy && <div className="details-controls">
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
          </div>}
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
      </div>}
      {isEditActive && <EditQuestion />}
      {isDeleteActive && <DeleteQuestion />}
      {isEditAnswerActive && <EditAnswer />}
      {isDeleteAnswerActive && <DeleteAnswer />}
    </div>
  )
}

export default QuestionDetail
