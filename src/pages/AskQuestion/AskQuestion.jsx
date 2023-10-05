import { useState } from 'react'
import './AskQuestion.scss'
import { addQuestion } from '../../api'

const AskQuestion = () => {
  const [question, setQuestion] = useState({
    title: '',
    description: '',
    tag: []
  })
  const handleChange = (e) => {
    const value = e.target.value
    // name === 'tag'? [...question.tag, value]
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
    <section className="ask__container">
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
          name='tag'
        />
        <button>Submit</button>
      </form>
    </section>
  )
}

export default AskQuestion
