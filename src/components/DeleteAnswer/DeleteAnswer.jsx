import { useDispatch } from "react-redux"
import { setDeleteAnswerActive } from "../../reduxSlice/answersSlice"

const DeleteAnswer = () => {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
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