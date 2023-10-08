
import './DeleteQuestion.scss'
import { setDeleteActive } from '../../reduxSlice/questionsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { deleteQuestion } from '../../api'

const DeleteQuestion = () => {
  const dispatch = useDispatch()
  const { question } = useSelector(state => state.questions)

  const handleSubmit = async () => {
    try {
        const res = await deleteQuestion(question)
        console.log(res)
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <section className="form__container">
      <div className="ask__wrapper">
        <h4>Delete Question</h4>
        <p className='delete-text'>
          Are you sure you want to delete this question? This action cannot be
          reversed
        </p>
        <button 
          className="cancel-button" 
          onClick={() => dispatch(setDeleteActive())}
        >Cancel</button>
        <button className="submit-button" onClick={handleSubmit}>Delete</button>
      </div>
    </section>
  )
}

export default DeleteQuestion
