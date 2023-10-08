import { useState } from 'react'
import './EditQuestion.scss'
import { useSelector } from 'react-redux'
import { editQuestion } from '../../api'

const EditQuestion = () => {
  const { question: selected } = useSelector((state) => state.questions)
  const [question, setQuestion] = useState({
    _id: selected._id,
    title: selected.title,
    description: selected.description,
    tag: selected.tag,
    createdBy: selected.createdBy
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
        console.log(question)
        const res = await editQuestion(question)
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

export default EditQuestion
