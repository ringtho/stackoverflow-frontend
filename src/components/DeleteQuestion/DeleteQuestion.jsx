import { useState } from 'react'
import './DeleteQuestion.scss'
import { setDeleteActive, setReload } from '../../reduxSlice/questionsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { deleteQuestion } from '../../api'

const DeleteQuestion = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useDispatch()
  const { question } = useSelector(state => state.questions)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
        await deleteQuestion(question)
        setIsSubmitting(false)
        dispatch(setDeleteActive())
        dispatch(setReload(true))
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <section className="form__container">
      <div className="ask__wrapper">
        <h4>Delete Question</h4>
        <p className="delete-text">
          Are you sure you want to delete this question? This action cannot be
          reversed
        </p>
        <button
          className="cancel-button"
          onClick={() => dispatch(setDeleteActive())}
        >
          Cancel
        </button>
        <button className="submit-button" onClick={handleSubmit}>
          {isSubmitting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </section>
  )
}

export default DeleteQuestion
