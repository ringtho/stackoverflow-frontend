import { useDispatch, useSelector } from "react-redux"
import { setDeleteAnswerActive } from "../../reduxSlice/answersSlice"
import { deleteAnswer } from "../../api"

const DeleteAnswer = () => {
  const dispatch = useDispatch()
  const {
    answers: {
      answer: { answer },
    },
    questions: { question },
  } = useSelector((state) => state)

  console.log(answer)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const res = await deleteAnswer({ 
            answerId: answer._id, 
            questionId: question._id
        })
        console.log(res)
    } catch(error) {
        console.log(error)
    }
  }
  return (
    <section className="form__container">
      <div className="ask__wrapper">
        <h4>Delete Question</h4>
        <p className="delete-text">
          Are you sure you want to delete this Answer? This action cannot be
          reversed
        </p>
        <button
          className="cancel-button"
          onClick={() => dispatch(setDeleteAnswerActive())}
        >
          Cancel
        </button>
        <button className="submit-button" onClick={handleSubmit}>
          Delete
        </button>
      </div>
    </section>
  )
}

export default DeleteAnswer