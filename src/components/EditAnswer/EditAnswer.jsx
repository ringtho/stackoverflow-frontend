import { useState } from 'react'
import './EditAnswer.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setEditAnswerActive } from '../../reduxSlice/answersSlice'
import { editAnswer } from '../../api'

const EditAnswer = () => {
  const { question } = useSelector((state) => state.questions)
  const { answer: { answer } } = useSelector((state) => state.answers)
  const [updatedAnswer, setUpdatedAnswer] = useState(answer)
  const dispatch = useDispatch()
  
  const handleChange = (e) => {
    setUpdatedAnswer(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const res = await editAnswer({ 
            answer: updatedAnswer, 
            answerId: answer._id, 
            questionId: question._id 
        })
        console.log(res)
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <section className="ask__container form__container">
      <form className="ask__wrapper" onSubmit={handleSubmit}>
        <h4>Edit Answer</h4>
        <label htmlFor="answer">Answer</label>
        <textarea
          name="answer"
          value={updatedAnswer.answer}
          onChange={handleChange}
          id="answer"
        />
        <button
          type="button"
          className="cancel-button"
          onClick={() => dispatch(setEditAnswerActive())}
        >
          Cancel
        </button>
        <button className="submit-button">Submit</button>
      </form>
    </section>
  )
}

export default EditAnswer