import { useState } from 'react'
import './AskQuestion.scss'
import { addQuestion } from '../../api'
import { useDispatch } from 'react-redux'
import { setAskActive } from '../../reduxSlice/questionsSlice'

const AskQuestion = () => {
  const [question, setQuestion] = useState({
    title: '',
    description: '',
    tag: []
  })

  const dispatch = useDispatch()
  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setQuestion({...question, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const res = await addQuestion(question)
        console.log(res)
    } catch(error) {
        console.log(error)
    }
  }

  console.log(question)
  return (
    <section className="ask__container form__container">
      <form className="ask__wrapper" onSubmit={handleSubmit}>
        <h4>Ask Question</h4>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={question.title}
          onChange={handleChange}
          id="title"
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={question.description}
          onChange={handleChange}
          id="description"
        />
        <label htmlFor="tag">Tag</label>
        <input
          type="text"
          value={question.tag}
          onChange={handleChange}
          id="tag"
          name="tag"
        />
        <button
          type="button"
          className="cancel-button"
          onClick={() => dispatch(setAskActive())}
        >
          Cancel
        </button>
        <button className="submit-button">Submit</button>
      </form>
    </section>
  )
}

export default AskQuestion
