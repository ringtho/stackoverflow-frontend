import { useState } from 'react'
import './AddAnswer.scss'
import { useSelector } from 'react-redux'
import { addAnswer } from '../../api'

const AddAnswer = () => {
  const [answer, setAnswer] = useState('')
  const { question } = useSelector(state => state.questions)

  const handleOnchange = (e) => {
    setAnswer(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const res = await addAnswer({id: question._id, answer})
        console.log(res)
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div>
      <form className="add__answer" onSubmit={handleSubmit}>
        <label htmlFor="answer">Add Answer</label>
        <textarea
          id="answer"
          placeholder="eg React or JS"
          onChange={handleOnchange}
          value={answer}
          required
        />
        <button className="submit-button">Submit</button>
      </form>
    </div>
  )
}

export default AddAnswer
